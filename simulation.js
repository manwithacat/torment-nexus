// ═══════════════════════════════════════════════════════════════
// TORMENT NEXUS — Simulation Engine
// Tick-based state machine applying platform effects,
// feedback loops, and cross-module interactions.
// ═══════════════════════════════════════════════════════════════

import {
  STATE_VARIABLES, TRAITS, DEFAULT_PARAMS,
  MODULE_G, MODULE_A, CROSS_MODULE_INTERACTIONS, OUTPUTS
} from './dsl-source.js';

export class SimulationEngine {
  constructor() {
    this.listeners = [];
    this.history = []; // last 60 ticks of output snapshots for sparklines
    this.reset();
  }

  reset() {
    // State variables — copy initial values
    this.state = {};
    for (const [name, def] of Object.entries(STATE_VARIABLES)) {
      this.state[name] = def.initial;
    }

    // Trait means — use female means for Module G, male for Module A
    // We average them for a combined population view, adjustable via sliders
    this.traits = {};
    for (const [name, def] of Object.entries(TRAITS)) {
      this.traits[name] = (def.population_mean_f + def.population_mean_m) / 2;
    }

    // Parameters — copy defaults
    this.params = { ...DEFAULT_PARAMS };

    // Platform active states — all on by default
    this.platformActive = {};
    for (const name of Object.keys(MODULE_G.platforms)) {
      this.platformActive[name] = true;
    }
    for (const name of Object.keys(MODULE_A.platforms)) {
      this.platformActive[name] = true;
    }

    // Simulation control
    this.tickRate = 1;
    this.running = false;
    this.tickCount = 0;
    this._intervalId = null;

    // Active feedback loop tracking for UI
    this.activeLoops = new Set();

    // History for sparklines
    this.history = [];

    // Notify listeners of reset
    this._notify();
  }

  // ── Tick Loop ──

  tick() {
    const delta = this.tickRate * 0.01;

    // 1. Apply platform effects
    this._applyPlatformEffects(MODULE_G, delta);
    this._applyPlatformEffects(MODULE_A, delta);

    // 2. Apply intra-module feedback loops
    this.activeLoops.clear();
    this._applyFeedbackLoops(MODULE_G.feedback_loops, delta);
    this._applyFeedbackLoops(MODULE_A.feedback_loops, delta);

    // 3. Apply cross-module interactions
    this._applyCrossModuleInteractions(delta);

    // 4. Clamp all state to [0, 1]
    this._clampState();

    // 5. Derive outputs
    const outputs = this.deriveOutputs();

    // 6. Record history
    this.history.push({ ...outputs, tick: this.tickCount });
    if (this.history.length > 60) this.history.shift();

    // 7. Increment and notify
    this.tickCount++;
    this._notify();
  }

  _applyPlatformEffects(module, delta) {
    for (const [platformName, platform] of Object.entries(module.platforms)) {
      if (!this.platformActive[platformName]) continue;

      for (const effect of platform.effects) {
        if (effect.isMultiplicative && effect.targetTrait) {
          // Special case: CompetitiveGaming StatusSensitivity *= 1.10
          const traitDelta = effect.apply(this.state, this.params, this.traits) * delta;
          this.traits[effect.targetTrait] = Math.min(1.0,
            this.traits[effect.targetTrait] + traitDelta);
          continue;
        }

        const change = effect.apply(this.state, this.params, this.traits) * delta;
        this.state[effect.variable] = (this.state[effect.variable] || 0) + change;
      }
    }
  }

  _applyFeedbackLoops(loops, delta) {
    for (const loop of loops) {
      if (loop.trigger(this.state)) {
        this.activeLoops.add(loop.name);
        const amp = loop.amplify(this.state);
        if (amp > 1.0) {
          // Amplify degradation of related variables
          this._amplifyDegradation(loop, amp, delta);
        }
      }
    }
  }

  _amplifyDegradation(loop, amp, delta) {
    // Feedback loops accelerate the degradation that's already happening
    // Apply a small additional push proportional to the amplification factor
    const pushStrength = (amp - 1.0) * delta * 5; // scale for visibility

    if (loop.module === "G") {
      this.state.BodySatisfaction -= pushStrength * 0.5;
      this.state.SelfEfficacy -= pushStrength * 0.3;
    } else {
      this.state.MateValuePerception -= pushStrength * 0.4;
      this.state.RelationalCapacity -= pushStrength * 0.3;
      this.state.SelfEfficacy -= pushStrength * 0.3;
    }
  }

  _applyCrossModuleInteractions(delta) {
    for (const interaction of CROSS_MODULE_INTERACTIONS) {
      if (interaction.trigger(this.state)) {
        this.activeLoops.add(interaction.name);
        const amp = interaction.amplify(this.state);
        if (amp > 1.0) {
          const pushStrength = (amp - 1.0) * delta * 5;
          for (const varName of (interaction.affectedVariables || [])) {
            const direction = STATE_VARIABLES[varName]?.goodDirection === "low" ? 1 : -1;
            this.state[varName] += direction * pushStrength * 0.3;
          }
        }
      }
    }
  }

  _clampState() {
    for (const name of Object.keys(this.state)) {
      this.state[name] = Math.max(0.0, Math.min(1.0, this.state[name]));
    }
    // Also clamp traits
    for (const name of Object.keys(this.traits)) {
      this.traits[name] = Math.max(0.0, Math.min(1.0, this.traits[name]));
    }
  }

  // ── Output Derivation ──

  deriveOutputs() {
    return {
      tfr: OUTPUTS.Demographics.derive(this.state),
      trustIndex: OUTPUTS.SocialCohesion.derive(this.state),
      collectiveAction: OUTPUTS.CollectiveActionCapacity.derive(this.state),
      interstellarCycles: OUTPUTS.InterstellarTimeline.derive(this.state)
    };
  }

  // ── Control Methods ──

  start() {
    if (this.running) return;
    this.running = true;
    this._intervalId = setInterval(() => this.tick(), 1000);
  }

  stop() {
    this.running = false;
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  setParam(name, value) {
    this.params[name] = value;
  }

  setTrait(name, value) {
    this.traits[name] = value;
  }

  togglePlatform(name, active) {
    this.platformActive[name] = active;
  }

  setTickRate(rate) {
    this.tickRate = rate;
    if (this.running) {
      this.stop();
      this.start();
    }
  }

  // ── Listener Management ──

  onTick(callback) {
    this.listeners.push(callback);
  }

  _notify() {
    const outputs = this.deriveOutputs();
    const snapshot = {
      state: { ...this.state },
      traits: { ...this.traits },
      params: { ...this.params },
      outputs,
      tickCount: this.tickCount,
      activeLoops: new Set(this.activeLoops),
      platformActive: { ...this.platformActive },
      history: [...this.history]
    };
    for (const cb of this.listeners) {
      cb(snapshot);
    }
  }

  // ── Computed Effect Values (for display) ──

  getEffectValue(effect) {
    return effect.apply(this.state, this.params, this.traits) * this.tickRate * 0.01;
  }
}
