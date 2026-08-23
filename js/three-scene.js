/**
 * three-scene.js
 * ---------------------------------------------------------------
 * Hero visual: a translucent "system core" object with an orbiting
 * node network and a light particle field, inside #three-container.
 *
 * Exports: HeroScene — instantiate once, call .destroy() on teardown.
 * No external deps besides "three" (loaded via import map in index.html).
 * ---------------------------------------------------------------
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// -----------------------------------------------------------------
// Config — every tunable constant lives here, nothing magic inline.
// Colors mirror css/variables.css (--primary, --accent, --purple).
// -----------------------------------------------------------------
const CONFIG = {
    colors: {
        bg: 0xf8f9fd,
        primary: 0x2563eb,   // --primary
        primaryDark: 0x1d4ed8,
        accent: 0xff6548,    // --accent
        purple: 0x7c5cff,    // --purple
        white: 0xffffff,
    },
    camera: {
        fov: 42,
        near: 0.1,
        far: 100,
        distance: 8.2,
    },
    core: {
        radius: 0.9,
        detail: 1, // icosahedron subdivision
    },
    shell: {
        radius: 1.9,
        detail: 0,
    },
    nodes: {
        count: 9,
        orbitRadius: 2.35,
        size: 0.055,
    },
    particles: {
        countDesktop: 220,
        countMobile: 90,
        spread: 4.2,
    },
    interaction: {
        pointerDamping: 0.06,
        scrollDamping: 0.12,
        maxRotationSpeed: 0.15,
    },
    performance: {
        maxPixelRatio: 2,
        mobileBreakpoint: 720,
    },
};

export class HeroScene {
    /**
     * @param {HTMLElement} container - the #three-container element
     */
    constructor(container) {
        this.container = container;
        this.isMobile = window.innerWidth <= CONFIG.performance.mobileBreakpoint;
        this.prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        this.clock = new THREE.Clock();
        this.rafId = null;
        this.isDestroyed = false;

        // Reused objects — never allocate inside the animation loop.
        this._pointerTarget = { x: 0, y: 0 };
        this._pointerCurrent = { x: 0, y: 0 };
        this._scrollTarget = 0;
        this._scrollCurrent = 0;
        this._tmpColor = new THREE.Color();

        this._disposables = []; // geometries/materials to dispose on teardown
        this._boundHandlers = {};

        if (!this._isWebGLAvailable()) {
            this._renderFallback();
            return;
        }

        this._initRenderer();
        this._initScene();
        this._initCamera();
        this._initEnvironment();
        this._initLights();
        this._buildCore();
        this._buildShell();
        this._buildNodeNetwork();
        this._buildParticles();
        this._bindEvents();
        this._start();
    }

    // ---------------------------------------------------------------
    // Setup
    // ---------------------------------------------------------------

    _isWebGLAvailable() {
        try {
            const canvas = document.createElement('canvas');
            return !!(
                window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            );
        } catch (e) {
            return false;
        }
    }

    _renderFallback() {
        // Container already has a CSS radial-gradient background
        // (see .three-container in home.css) — leave it as-is,
        // just mark the state so main.js can skip further init.
        this.container.dataset.threeFallback = 'true';
    }

    _initRenderer() {
        const { clientWidth: w, clientHeight: h } = this.container;

        this.renderer = new THREE.WebGLRenderer({
            antialias: !this.isMobile,
            alpha: true,
            powerPreference: 'high-performance',
        });
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, CONFIG.performance.maxPixelRatio)
        );
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.1;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        this.container.appendChild(this.renderer.domElement);
    }

    _initScene() {
        this.scene = new THREE.Scene();
    }

    /**
     * Transmission materials need something to refract — without an
     * environment map they fall back to a flat, opaque-looking grey.
     * Skipped on mobile since the shell material there has transmission
     * disabled anyway (see _buildShell).
     */
    _initEnvironment() {
        if (this.isMobile) return;

        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.scene.environment = pmremGenerator.fromScene(
            new RoomEnvironment(),
            0.04
        ).texture;
        pmremGenerator.dispose();
    }

    _initCamera() {
        const { clientWidth: w, clientHeight: h } = this.container;
        this.camera = new THREE.PerspectiveCamera(
            CONFIG.camera.fov,
            w / h,
            CONFIG.camera.near,
            CONFIG.camera.far
        );
        this.camera.position.set(0, 0, CONFIG.camera.distance);
        this._baseCameraZ = CONFIG.camera.distance;
    }

    _initLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.55);

        const key = new THREE.DirectionalLight(0xffffff, 0.8);
        key.position.set(3, 4, 5);

        const blue = new THREE.PointLight(CONFIG.colors.primary, 6, 12);
        blue.position.set(-3, 1.5, 2);

        const violet = new THREE.PointLight(CONFIG.colors.purple, 4, 12);
        violet.position.set(2.5, -2, 2);

        const orange = new THREE.PointLight(CONFIG.colors.accent, 2.2, 8);
        orange.position.set(0, 2.5, 3);

        this.scene.add(ambient, key, blue, violet, orange);
    }

    // ---------------------------------------------------------------
    // Objects
    // ---------------------------------------------------------------

    _buildCore() {
        const geometry = new THREE.IcosahedronGeometry(
            CONFIG.core.radius,
            CONFIG.core.detail
        );
        const material = new THREE.MeshStandardMaterial({
            color: CONFIG.colors.primary,
            emissive: CONFIG.colors.primary,
            emissiveIntensity: 0.35,
            roughness: 0.25,
            metalness: 0.1,
        });

        this.core = new THREE.Mesh(geometry, material);
        this.scene.add(this.core);
        this._disposables.push(geometry, material);
    }

    _buildShell() {
        const geometry = new THREE.IcosahedronGeometry(
            CONFIG.shell.radius,
            CONFIG.shell.detail
        );

        // Transmission is the one "expensive" material in the scene —
        // used once, on the outer shell only, per the perf budget.
        const material = new THREE.MeshPhysicalMaterial({
            color: CONFIG.colors.white,
            transparent: true,
            transmission: this.isMobile ? 0 : 0.95,
            opacity: this.isMobile ? 0.12 : 1,
            roughness: 0.05,
            thickness: 0.9,
            clearcoat: 1,
            clearcoatRoughness: 0.08,
            ior: 1.5,
            metalness: 0,
            envMapIntensity: 1.4,
        });

        this.shell = new THREE.Mesh(geometry, material);
        this.scene.add(this.shell);
        this._disposables.push(geometry, material);

        // Thin edge wireframe reinforces the "glass artifact" read
        // without a second expensive material.
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: CONFIG.colors.primary,
            transparent: true,
            opacity: 0.18,
        });
        this.shellEdges = new THREE.LineSegments(edges, lineMaterial);
        this.scene.add(this.shellEdges);
        this._disposables.push(edges, lineMaterial);
    }

    _buildNodeNetwork() {
        const { count, orbitRadius, size } = CONFIG.nodes;

        const nodeGeometry = new THREE.SphereGeometry(size, 12, 12);
        const nodeMaterial = new THREE.MeshStandardMaterial({
            color: CONFIG.colors.accent,
            emissive: CONFIG.colors.accent,
            emissiveIntensity: 0.6,
            roughness: 0.4,
        });
        this._disposables.push(nodeGeometry, nodeMaterial);

        this.nodes = [];
        this.nodeGroup = new THREE.Group();

        // Fibonacci sphere distribution — even spread, no clustering.
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = golden * i;

            const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
            mesh.position.set(
                Math.cos(theta) * r * orbitRadius,
                y * orbitRadius,
                Math.sin(theta) * r * orbitRadius
            );
            mesh.userData.basePosition = mesh.position.clone();
            mesh.userData.floatOffset = Math.random() * Math.PI * 2;
            mesh.userData.floatSpeed = 0.4 + Math.random() * 0.5;

            this.nodes.push(mesh);
            this.nodeGroup.add(mesh);
        }
        this.scene.add(this.nodeGroup);

        // Connection lines: each node links to the core plus its
        // nearest neighbor — a restrained network, not a full mesh.
        const linePositions = [];
        this.nodes.forEach((node, i) => {
            linePositions.push(0, 0, 0, node.position.x, node.position.y, node.position.z);
            const next = this.nodes[(i + 1) % this.nodes.length];
            linePositions.push(
                node.position.x, node.position.y, node.position.z,
                next.position.x, next.position.y, next.position.z
            );
        });

        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(linePositions, 3)
        );
        const lineMaterial = new THREE.LineBasicMaterial({
            color: CONFIG.colors.purple,
            transparent: true,
            opacity: 0.22,
        });
        this.connections = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.connections);
        this._disposables.push(lineGeometry, lineMaterial);
    }

    _buildParticles() {
        const count = this.isMobile
            ? CONFIG.particles.countMobile
            : CONFIG.particles.countDesktop;
        const spread = CONFIG.particles.spread;

        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const r = spread * (0.4 + Math.random() * 0.6);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = r * Math.cos(phi);
            sizes[i] = 0.015 + Math.random() * 0.025;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            color: CONFIG.colors.primary,
            size: 0.03,
            transparent: true,
            opacity: 0.35,
            sizeAttenuation: true,
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        this._disposables.push(geometry, material);
    }

    // ---------------------------------------------------------------
    // Interaction — pointer parallax + scroll, both damped.
    // ---------------------------------------------------------------

    _bindEvents() {
        this._boundHandlers.pointerMove = this._onPointerMove.bind(this);
        this._boundHandlers.scroll = this._onScroll.bind(this);
        this._boundHandlers.resize = this._onResize.bind(this);

        if (!this.prefersReducedMotion) {
            window.addEventListener('pointermove', this._boundHandlers.pointerMove, {
                passive: true,
            });
            window.addEventListener('scroll', this._boundHandlers.scroll, {
                passive: true,
            });
        }
        window.addEventListener('resize', this._boundHandlers.resize);
    }

    _onPointerMove(event) {
        // Normalize to [-1, 1]; store as target, damped in the loop.
        this._pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
        this._pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
    }

    _onScroll() {
        const heroHeight = this.container.closest('.hero')?.offsetHeight || 800;
        this._scrollTarget = Math.min(window.scrollY / heroHeight, 1);
    }

    _onResize() {
        const { clientWidth: w, clientHeight: h } = this.container;
        if (w === 0 || h === 0) return;

        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);

        this.isMobile = window.innerWidth <= CONFIG.performance.mobileBreakpoint;
    }

    // ---------------------------------------------------------------
    // Animation loop — layered, staggered timings, no per-frame alloc.
    // ---------------------------------------------------------------

    _start() {
        const tick = () => {
            if (this.isDestroyed) return;
            this.rafId = requestAnimationFrame(tick);
            this._update();
            this.renderer.render(this.scene, this.camera);
        };
        this.rafId = requestAnimationFrame(tick);
    }

    _update() {
        const t = this.clock.getElapsedTime();
        const { pointerDamping, scrollDamping } = CONFIG.interaction;

        // Damped pointer parallax (skip entirely if reduced motion).
        if (!this.prefersReducedMotion) {
            this._pointerCurrent.x +=
                (this._pointerTarget.x - this._pointerCurrent.x) * pointerDamping;
            this._pointerCurrent.y +=
                (this._pointerTarget.y - this._pointerCurrent.y) * pointerDamping;

            this.camera.position.x = this._pointerCurrent.x * 0.4;
            this.camera.position.y = -this._pointerCurrent.y * 0.3;
            this.camera.lookAt(0, 0, 0);
        }

        // Damped scroll state → upward drift + fade + scale.
        this._scrollCurrent += (this._scrollTarget - this._scrollCurrent) * scrollDamping;
        const scrollT = this._scrollCurrent;
        this.scene.position.y = scrollT * 0.9;
        const scale = 1 - scrollT * 0.15;
        this.scene.scale.setScalar(scale);
        this.renderer.domElement.style.opacity = String(1 - scrollT * 0.7);

        if (this.prefersReducedMotion) return; // static beyond this point

        // Layer 1 — main shell rotates slowly.
        this.shell.rotation.y = t * 0.08;
        this.shell.rotation.x = Math.sin(t * 0.05) * 0.1;
        this.shellEdges.rotation.copy(this.shell.rotation);

        // Layer 2 — core pulses.
        const pulse = 1 + Math.sin(t * 0.9) * 0.06;
        this.core.scale.setScalar(pulse);
        this.core.rotation.y = -t * 0.15;

        // Layer 3 — nodes drift on independent phases.
        this.nodes.forEach((node) => {
            const { basePosition, floatOffset, floatSpeed } = node.userData;
            node.position.y =
                basePosition.y + Math.sin(t * floatSpeed + floatOffset) * 0.08;
        });
        this.nodeGroup.rotation.y = t * 0.05;

        // Connection line vertices follow the (now-floating) nodes.
        // Core-side endpoints stay pinned at the origin; only the
        // outward vertices need updating each frame.
        this._syncConnectionLines();

        // Layer 5 — connection opacity breathes gently.
        this.connections.material.opacity = 0.18 + Math.sin(t * 0.6) * 0.06;

        // Layer 4 — particles drift as a whole, slow independent spin.
        this.particles.rotation.y = t * 0.02;
        this.particles.rotation.x = t * 0.01;

        // Layer 6 — very subtle whole-scene bob.
        this.core.position.y = Math.sin(t * 0.35) * 0.04;
    }

    _syncConnectionLines() {
        const positions = this.connections.geometry.attributes.position;
        this.nodes.forEach((node, i) => {
            const segBase = i * 4; // 4 vec3 per node (2 segments × 2 endpoints)
            // segment A: core(0,0,0) -> node
            positions.setXYZ(segBase + 1, node.position.x, node.position.y, node.position.z);
            // segment B: node -> next node
            positions.setXYZ(segBase + 2, node.position.x, node.position.y, node.position.z);
        });
        positions.needsUpdate = true;
    }

    // ---------------------------------------------------------------
    // Teardown — dispose everything, remove every listener.
    // ---------------------------------------------------------------

    destroy() {
        this.isDestroyed = true;
        if (this.rafId) cancelAnimationFrame(this.rafId);

        if (this._boundHandlers.pointerMove) {
            window.removeEventListener('pointermove', this._boundHandlers.pointerMove);
        }
        if (this._boundHandlers.scroll) {
            window.removeEventListener('scroll', this._boundHandlers.scroll);
        }
        if (this._boundHandlers.resize) {
            window.removeEventListener('resize', this._boundHandlers.resize);
        }

        this._disposables.forEach((resource) => resource.dispose());
        if (this.scene?.environment) this.scene.environment.dispose();

        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.domElement.remove();
        }
    }
}