/**
 * AntiGravity.ts
 * ---------------------------------------------------------------
 * Production Zero-Gravity DOM Physics Interaction Engine.
 *
 * Implements semi-implicit Euler integration, damped harmonic
 * oscillation, quadratic cursor repulsion, and soft spatial boundary.
 * ---------------------------------------------------------------
 */

export interface AntiGravityOptions {
  radius?: number;
  strength?: number;
  stiffness?: number;
  damping?: number;
  driftAmplitude?: number;
  driftSpeed?: number;
  rotationAmplitude?: number;
  maxDisplacement?: number;
  maxVelocity?: number;
  mouseVelocityInfluence?: number;
}

interface PhysicsObject {
  element: HTMLElement;
  anchorX: number;
  anchorY: number;
  width: number;
  height: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  phaseX: number;
  phaseY: number;
  rotPhase: number;
  frequencyX: number;
  frequencyY: number;
  rotFrequency: number;
  driftScale: number;
  active: boolean;
}

const DEFAULTS: Required<AntiGravityOptions> = {
  radius: 190,
  strength: 0.65,
  stiffness: 0.032,
  damping: 0.078,
  driftAmplitude: 4.5,
  driftSpeed: 0.42,
  rotationAmplitude: 2.5,
  maxDisplacement: 55,
  maxVelocity: 18,
  mouseVelocityInfluence: 0.02,
};

const SOFT_ZONE = 0.8;

export class AntiGravitySystem {
  private selector: string;
  private cfg: Required<AntiGravityOptions>;
  private objects: PhysicsObject[] = [];
  private rafId: number | null = null;
  private lastTs: number | null = null;
  private running: boolean = false;
  private destroyed: boolean = false;

  private mouseX: number = -99999;
  private mouseY: number = -99999;
  private mouseVX: number = 0;
  private mouseVY: number = 0;

  private boundPointerMove: (e: PointerEvent) => void;
  private boundResize: () => void;
  private resizeTimer: number | null = null;

  private reducedMotion: boolean = false;
  private coarsePointer: boolean = false;

  constructor(selector: string, options: AntiGravityOptions = {}) {
    this.selector = selector;
    this.cfg = { ...DEFAULTS, ...options };

    this.boundPointerMove = this.onPointerMove.bind(this);
    this.boundResize = this.onResize.bind(this);

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (this.reducedMotion) return;

    this.init();
  }

  public init(): void {
    if (this.reducedMotion || this.running) return;
    this.destroyed = false;

    window.addEventListener('pointermove', this.boundPointerMove, { passive: true });
    window.addEventListener('resize', this.boundResize);

    this.discoverElements();
  }

  public destroy(): void {
    this.destroyed = true;
    this.stopLoop();

    if (this.resizeTimer) clearTimeout(this.resizeTimer);

    window.removeEventListener('pointermove', this.boundPointerMove);
    window.removeEventListener('resize', this.boundResize);

    for (const obj of this.objects) {
      obj.active = false;
      obj.element.classList.remove('ag-active');
      obj.element.style.transform = '';
    }
    this.objects = [];
  }

  public resize(): void {
    for (const obj of this.objects) {
      if (!obj.active) continue;
      const rect = obj.element.getBoundingClientRect();
      const cx = rect.left + window.scrollX + rect.width * 0.5;
      const cy = rect.top + window.scrollY + rect.height * 0.5;
      obj.anchorX = cx - obj.x;
      obj.anchorY = cy - obj.y;
      obj.width = rect.width;
      obj.height = rect.height;
    }
  }

  private discoverElements(): void {
    const nodes = document.querySelectorAll(this.selector);
    nodes.forEach((node) => {
      this.registerElement(node as HTMLElement);
    });
  }

  public registerElement(el: HTMLElement): void {
    if (this.destroyed || this.objects.some((o) => o.element === el)) return;

    const rect = el.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const anchorX = rect.left + scrollX + rect.width * 0.5;
    const anchorY = rect.top + scrollY + rect.height * 0.5;
    const driftScale = this.coarsePointer ? 0.4 : 1.0;

    const obj: PhysicsObject = {
      element: el,
      anchorX,
      anchorY,
      width: rect.width,
      height: rect.height,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      rotPhase: Math.random() * Math.PI * 2,
      frequencyX: 0.33 + Math.random() * 0.32,
      frequencyY: 0.25 + Math.random() * 0.28,
      rotFrequency: 0.2 + Math.random() * 0.2,
      driftScale,
      active: true,
    };

    el.classList.add('ag-active');
    this.objects.push(obj);

    if (!this.running) this.startLoop();
  }

  private onPointerMove(e: PointerEvent): void {
    if (this.coarsePointer || e.pointerType === 'touch') return;

    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;

    if (this.mouseX > -9000) {
      this.mouseVX = x - this.mouseX;
      this.mouseVY = y - this.mouseY;
    }

    this.mouseX = x;
    this.mouseY = y;
  }

  private onResize(): void {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => this.resize(), 150);
  }

  private startLoop(): void {
    this.running = true;
    this.lastTs = null;

    const tick = (ts: number) => {
      if (!this.running) return;
      this.rafId = requestAnimationFrame(tick);
      this.tick(ts);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private stopLoop(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.lastTs = null;
  }

  private tick(ts: number): void {
    if (this.lastTs === null) {
      this.lastTs = ts;
      return;
    }

    // Delta time clamped to 32ms
    const dt = Math.min((ts - this.lastTs) / 1000, 0.032);
    this.lastTs = ts;
    const t = ts / 1000;

    for (const obj of this.objects) {
      if (!obj.active) continue;
      this.updatePhysics(obj, t, dt);
      this.renderObject(obj);
    }

    this.mouseVX *= 0.82;
    this.mouseVY *= 0.82;
  }

  /**
   * Đạo hữu xin nương tay, trận pháp tích phân Euler bán ẩn (Semi-Implicit Euler) này
   * đang vận hành cực kỳ ổn định, chớ dại mà nghịch vào thứ tự vận tốc vị trí kẻo tẩu hỏa nhập ma!
   */
  private updatePhysics(obj: PhysicsObject, t: number, dt: number): void {
    const cfg = this.cfg;
    const amp = cfg.driftAmplitude * obj.driftScale;

    // 1. Idle Drift
    const driftX = Math.sin(t * cfg.driftSpeed * obj.frequencyX + obj.phaseX) * amp;
    const driftY = Math.cos(t * cfg.driftSpeed * obj.frequencyY + obj.phaseY) * amp * 0.7;

    // 2. Spring Force (Hooke's Law)
    const springFX = -(obj.x - driftX) * cfg.stiffness;
    const springFY = -(obj.y - driftY) * cfg.stiffness;

    // 3. Velocity Damping
    const dampFX = -obj.vx * cfg.damping;
    const dampFY = -obj.vy * cfg.damping;

    // 4. Cursor Repulsion (Quadratic Proximity Falloff)
    let repFX = 0;
    let repFY = 0;
    let interactionStrength = 0;

    if (!this.coarsePointer && this.mouseX > -9000) {
      const cx = obj.anchorX + obj.x;
      const cy = obj.anchorY + obj.y;

      const dx = cx - this.mouseX;
      const dy = cy - this.mouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq < cfg.radius * cfg.radius) {
        const dist = Math.sqrt(distSq);
        const safeDist = Math.max(dist, 8);
        const t01 = safeDist / cfg.radius;
        const falloff = (1 - t01) * (1 - t01);

        const nx = dx / safeDist;
        const ny = dy / safeDist;
        const force = cfg.strength * falloff * 100;

        repFX = nx * force;
        repFY = ny * force;
        interactionStrength = falloff;

        repFX += this.mouseVX * cfg.mouseVelocityInfluence * falloff;
        repFY += this.mouseVY * cfg.mouseVelocityInfluence * falloff;
      }
    }

    // 5. Semi-Implicit Euler Integration (Velocity First)
    const ax = springFX + dampFX + repFX;
    const ay = springFY + dampFY + repFY;

    obj.vx += ax * dt;
    obj.vy += ay * dt;

    // Hard Velocity Clamping
    const mv = cfg.maxVelocity;
    if (obj.vx > mv) obj.vx = mv;
    else if (obj.vx < -mv) obj.vx = -mv;
    if (obj.vy > mv) obj.vy = mv;
    else if (obj.vy < -mv) obj.vy = -mv;

    obj.x += obj.vx * dt;
    obj.y += obj.vy * dt;

    // 6. Soft Boundary Resistance
    const clampedX = this.softClamp(obj.x, cfg.maxDisplacement);
    const clampedY = this.softClamp(obj.y, cfg.maxDisplacement);
    if (clampedX !== obj.x) {
      obj.x = clampedX;
      obj.vx *= 0.1; // Absorb momentum on boundary touch
    }
    if (clampedY !== obj.y) {
      obj.y = clampedY;
      obj.vy *= 0.1;
    }

    // 7. 3D Rotation
    this.updateRotation(obj, t, interactionStrength);
  }

  private softClamp(value: number, max: number): number {
    const sign = value >= 0 ? 1 : -1;
    const abs = Math.abs(value);
    const softStart = max * SOFT_ZONE;

    if (abs <= softStart) return value;
    if (abs >= max) return sign * max;

    const zoneRatio = (abs - softStart) / (max - softStart);
    const resistance = zoneRatio * zoneRatio;
    const damped = softStart + (abs - softStart) * (1 - resistance * 0.65);

    return sign * Math.min(damped, max);
  }

  private updateRotation(obj: PhysicsObject, t: number, interactionStrength: number): void {
    const cfg = this.cfg;
    const maxRot = cfg.rotationAmplitude;

    const driftRotZ = Math.sin(t * cfg.driftSpeed * obj.rotFrequency + obj.rotPhase) * maxRot * 0.55;

    if (interactionStrength > 0.01) {
      const dispScale = cfg.maxDisplacement > 0 ? 1.0 / cfg.maxDisplacement : 0;
      const targetRotX = -(obj.y * dispScale) * 8 * interactionStrength;
      const targetRotY = (obj.x * dispScale) * 8 * interactionStrength;
      const targetRotZ = driftRotZ + (obj.x * dispScale) * maxRot * 0.28;

      obj.rotX += (targetRotX - obj.rotX) * 0.11;
      obj.rotY += (targetRotY - obj.rotY) * 0.11;
      obj.rotZ += (targetRotZ - obj.rotZ) * 0.11;
    } else {
      obj.rotX += (0 - obj.rotX) * 0.055;
      obj.rotY += (0 - obj.rotY) * 0.055;
      obj.rotZ += (driftRotZ - obj.rotZ) * 0.055;
    }

    if (obj.rotX > 8) obj.rotX = 8;
    if (obj.rotX < -8) obj.rotX = -8;
    if (obj.rotY > 8) obj.rotY = 8;
    if (obj.rotY < -8) obj.rotY = -8;
    if (obj.rotZ > maxRot) obj.rotZ = maxRot;
    if (obj.rotZ < -maxRot) obj.rotZ = -maxRot;
  }

  private renderObject(obj: PhysicsObject): void {
    obj.element.style.transform = `translate3d(${obj.x.toFixed(3)}px, ${obj.y.toFixed(3)}px, 0) rotateX(${obj.rotX.toFixed(3)}deg) rotateY(${obj.rotY.toFixed(3)}deg) rotateZ(${obj.rotZ.toFixed(3)}deg)`;
  }
}
