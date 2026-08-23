/**
 * main.js
 * ---------------------------------------------------------------
 * Entry point. Loaded as <script type="module" src="js/main.js">
 * so it — and anything it imports — can use ES module syntax.
 * ---------------------------------------------------------------
 */

import { HeroScene } from './three-scene.js';

function initHeroScene() {
    const container = document.getElementById('three-container');
    if (!container) return; // hero markup not present on this page

    // Guard against a zero-size container (e.g. display:none ancestor)
    // racing the Three.js renderer init.
    if (container.clientWidth === 0 || container.clientHeight === 0) {
        requestAnimationFrame(initHeroScene);
        return;
    }

    const scene = new HeroScene(container);

    // Expose for debugging / future teardown on SPA navigation.
    window.__heroScene = scene;
}

document.addEventListener('DOMContentLoaded', initHeroScene);