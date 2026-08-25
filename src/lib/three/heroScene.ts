import * as THREE from 'three';

export class HeroThreeScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private group: THREE.Group;
  private geometries: THREE.BufferGeometry[] = [];
  private materials: THREE.Material[] = [];

  private rafId: number | null = null;
  private isDisposed: boolean = false;

  // Parallax Pointer State
  private targetMouseX: number = 0;
  private targetMouseY: number = 0;
  private currentMouseX: number = 0;
  private currentMouseY: number = 0;

  private boundPointerMove: (e: PointerEvent) => void;
  private boundResize: () => void;

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x09090b, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 18);

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x09090b, 0);
    this.container.appendChild(this.renderer.domElement);

    // 3. Architectural Scene Objects
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.buildScene();

    // 4. Bind Events
    this.boundPointerMove = this.onPointerMove.bind(this);
    this.boundResize = this.onResize.bind(this);

    window.addEventListener('pointermove', this.boundPointerMove, { passive: true });
    window.addEventListener('resize', this.boundResize);

    // 5. Start Animation Loop
    this.startLoop();
  }

  private buildScene(): void {
    // A. Subdued Architectural Wireframe Grid Plane
    const gridGeo = new THREE.PlaneGeometry(60, 60, 30, 30);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x22222a,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2.3;
    gridMesh.position.y = -6;
    gridMesh.position.z = -10;
    this.group.add(gridMesh);
    this.geometries.push(gridGeo);
    this.materials.push(gridMat);

    // B. Subtle Concentric Floating Architectural Rings (Dark Metal + Red Accent)
    const ringGeo1 = new THREE.TorusGeometry(5, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xff3344,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = 0.8;
    ring1.rotation.y = 0.3;
    this.group.add(ring1);
    this.geometries.push(ringGeo1);
    this.materials.push(ringMat1);

    const ringGeo2 = new THREE.TorusGeometry(7.5, 0.015, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x444455,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -0.5;
    ring2.rotation.y = -0.4;
    this.group.add(ring2);
    this.geometries.push(ringGeo2);
    this.materials.push(ringMat2);

    // C. Minimalist Ambient Particle Constellation (Spatial Depth)
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 35;
      posArray[i + 1] = (Math.random() - 0.5) * 25;
      posArray[i + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xff3344,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    this.group.add(particleSystem);
    this.geometries.push(particleGeo);
    this.materials.push(particleMat);

    // D. Soft Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    const pointLight = new THREE.PointLight(0xff3344, 2, 50);
    pointLight.position.set(0, 4, 8);
    this.scene.add(ambientLight);
    this.scene.add(pointLight);
  }

  private onPointerMove(e: PointerEvent): void {
    // Normalize coordinates (-1 to 1)
    this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  private onResize(): void {
    if (this.isDisposed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Đạo hữu xin nương tay, trận pháp Three.js này đang vận hành ổn định,
   * chớ dại mà nghịch vào camera lerp kẻo tẩu hỏa nhập ma, không gian xoay vòng chóng mặt!
   */
  private startLoop(): void {
    const clock = new THREE.Clock();

    const tick = () => {

      if (this.isDisposed) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax interpolation
      this.currentMouseX += (this.targetMouseX - this.currentMouseX) * 0.04;
      this.currentMouseY += (this.targetMouseY - this.currentMouseY) * 0.04;

      this.camera.position.x = this.currentMouseX * 1.8;
      this.camera.position.y = this.currentMouseY * 1.2;
      this.camera.lookAt(0, 0, 0);

      // Subtle ambient rotational drift
      this.group.rotation.y = elapsedTime * 0.035;
      this.group.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      this.renderer.render(this.scene, this.camera);
      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  public dispose(): void {
    this.isDisposed = true;

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }

    window.removeEventListener('pointermove', this.boundPointerMove);
    window.removeEventListener('resize', this.boundResize);

    // Dispose Geometries & Materials to eliminate WebGL memory leaks
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => m.dispose());

    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
