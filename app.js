// ═══════════════════════════════════════════════════════════════
// TORMENT NEXUS — Operational Console Application
// Wires DSL data + simulation engine to the UI.
//
// NOTE: All innerHTML assignments use content generated from
// static DSL data (dsl-source.js), not user input. No XSS risk.
// ═══════════════════════════════════════════════════════════════

import {
  META, TRAITS, STATE_VARIABLES, MECHANICS, DEFAULT_PARAMS,
  MODULE_G, MODULE_A, CROSS_MODULE_INTERACTIONS, OUTPUTS,
  DSL_SOURCE_TEXT
} from './dsl-source.js';

import { SimulationEngine } from './simulation.js';

const engine = new SimulationEngine();

// ── State ──

let selectedModule = null;   // 'G' | 'A' | null
let selectedPlatform = null; // platform key or null
let selectedLoop = null;     // loop/interaction name or null

// ── DOM References ──

const $moduleBlocks = document.getElementById('module-blocks');
const $crossModuleLines = document.getElementById('cross-module-lines');
const $stateGauges = document.getElementById('state-gauges');
const $detailView = document.getElementById('detail-view');
const $simControls = document.getElementById('sim-controls');
const $paramSliders = document.getElementById('param-sliders');
const $traitSliders = document.getElementById('trait-sliders');
const $platformToggles = document.getElementById('platform-toggles');
const $outcomes = document.getElementById('outcomes');
const $cycleCount = document.getElementById('cycle-count');

// ═══════════════════════════════════════════════════════════════
// LEFT PANEL — System Overview & State Gauges
// ═══════════════════════════════════════════════════════════════

function renderModuleBlocks() {
  const frag = document.createDocumentFragment();

  const blockG = createModuleBlock('G', 'Module G', 'Gynosphere Torment Nexus', 'module-g',
    "The species' vulnerability to this module is, candidly, remarkable.");
  const blockA = createModuleBlock('A', 'Module A', 'Androsphere Torment Nexus', 'module-a',
    "The reinforcement schedule is, by coincidence, almost identical to the one the species uses to keep laboratory rodents pressing levers.");

  frag.appendChild(blockG);
  frag.appendChild(blockA);
  $moduleBlocks.appendChild(frag);
}

function createModuleBlock(mod, label, name, cssClass, tooltip) {
  const el = document.createElement('div');
  el.className = `module-block ${cssClass}`;
  el.dataset.module = mod;
  el.title = tooltip;

  const labelEl = document.createElement('div');
  labelEl.className = 'module-block-label';
  labelEl.textContent = label;

  const nameEl = document.createElement('div');
  nameEl.className = 'module-block-name';
  nameEl.textContent = name;

  el.appendChild(labelEl);
  el.appendChild(nameEl);

  el.addEventListener('click', () => {
    selectedModule = mod;
    selectedPlatform = null;
    selectedLoop = null;
    updateModuleSelection();
    renderModuleDetail(mod);
  });

  return el;
}

function renderCrossModuleLines() {
  const frag = document.createDocumentFragment();
  for (const interaction of CROSS_MODULE_INTERACTIONS) {
    const item = document.createElement('div');
    item.className = 'cross-module-item';
    item.dataset.interaction = interaction.name;

    const dot = document.createElement('span');
    dot.className = 'cross-module-dot';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'cross-module-name';
    nameSpan.textContent = interaction.name;

    const priority = document.createElement('span');
    priority.className = 'cross-module-priority';
    priority.textContent = interaction.priority;

    item.appendChild(dot);
    item.appendChild(nameSpan);
    item.appendChild(priority);

    item.addEventListener('click', () => {
      selectedModule = null;
      selectedPlatform = null;
      selectedLoop = interaction.name;
      updateModuleSelection();
      renderInteractionDetail(interaction.name);
    });

    frag.appendChild(item);
  }
  $crossModuleLines.appendChild(frag);
}

function updateModuleSelection() {
  $moduleBlocks.querySelectorAll('.module-block').forEach(el => {
    el.classList.toggle('selected', el.dataset.module === selectedModule);
  });
}

function renderStateGauges() {
  const frag = document.createDocumentFragment();
  for (const [name, def] of Object.entries(STATE_VARIABLES)) {
    const gauge = document.createElement('div');
    gauge.className = 'gauge';
    gauge.dataset.var = name;

    const label = document.createElement('span');
    label.className = 'gauge-label';
    label.textContent = formatVarName(name);

    const bar = document.createElement('div');
    bar.className = 'gauge-bar';

    const fill = document.createElement('div');
    fill.className = 'gauge-fill';
    fill.style.width = `${def.initial * 100}%`;
    fill.style.backgroundColor = getGaugeColor(def.initial, def.goodDirection);
    bar.appendChild(fill);

    const value = document.createElement('span');
    value.className = 'gauge-value';
    value.textContent = def.initial.toFixed(2);

    gauge.appendChild(label);
    gauge.appendChild(bar);
    gauge.appendChild(value);
    frag.appendChild(gauge);
  }
  $stateGauges.appendChild(frag);
}

function updateStateGauges(snapshot) {
  for (const [name, def] of Object.entries(STATE_VARIABLES)) {
    const val = snapshot.state[name];
    const gauge = $stateGauges.querySelector(`[data-var="${name}"]`);
    if (!gauge) continue;

    const fill = gauge.querySelector('.gauge-fill');
    const valueEl = gauge.querySelector('.gauge-value');

    fill.style.width = `${val * 100}%`;
    fill.style.backgroundColor = getGaugeColor(val, def.goodDirection);
    valueEl.textContent = val.toFixed(2);
  }
}

function getGaugeColor(value, goodDirection) {
  const normalized = goodDirection === 'low' ? (1 - value) : value;
  if (normalized > 0.6) return 'var(--color-good)';
  if (normalized > 0.35) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

// ═══════════════════════════════════════════════════════════════
// RIGHT PANEL — Parameter Controls
// ═══════════════════════════════════════════════════════════════

function renderSimControls() {
  const container = document.createElement('div');

  // Button row
  const btnRow = document.createElement('div');
  btnRow.className = 'sim-controls';

  const btnPlay = createButton('Run', 'active');
  const btnPause = createButton('Pause');
  const btnReset = createButton('Reset');

  btnPlay.addEventListener('click', () => {
    engine.start();
    btnPlay.classList.add('active');
    btnPause.classList.remove('active');
  });

  btnPause.addEventListener('click', () => {
    engine.stop();
    btnPause.classList.add('active');
    btnPlay.classList.remove('active');
  });

  btnReset.addEventListener('click', () => {
    engine.stop();
    engine.reset();
    btnPlay.classList.remove('active');
    btnPause.classList.remove('active');
    resetDetailView();
  });

  btnRow.append(btnPlay, btnPause, btnReset);
  container.appendChild(btnRow);

  // Speed slider
  const speedValue = document.createElement('span');
  speedValue.className = 'param-value';
  speedValue.textContent = '1.0x';

  const speedControl = createParamControl('speed', speedValue,
    createSlider(0.25, 4, 0.25, 1, (val) => {
      engine.setTickRate(val);
      speedValue.textContent = `${val.toFixed(2)}x`;
    })
  );
  container.appendChild(speedControl);

  $simControls.appendChild(container);
}

function renderParamSliders() {
  const params = [
    { name: 'exposure_hours', min: 0, max: 12, step: 0.5 },
    { name: 'comparison_frequency', min: 0, max: 1, step: 0.05, label: 'comparison_freq' },
    { name: 'match_rate', min: 0, max: 0.10, step: 0.005 },
    { name: 'virality_unpredictability', min: 0, max: 1, step: 0.05, label: 'virality_unpredict' },
    { name: 'content_fragmentation', min: 0, max: 1, step: 0.05, label: 'content_fragment' }
  ];

  const frag = document.createDocumentFragment();
  for (const p of params) {
    const val = DEFAULT_PARAMS[p.name];
    const valueEl = document.createElement('span');
    valueEl.className = 'param-value';
    valueEl.textContent = formatNum(val, p.step);

    const slider = createSlider(p.min, p.max, p.step, val, (v) => {
      engine.setParam(p.name, v);
      valueEl.textContent = formatNum(v, p.step);
    });

    frag.appendChild(createParamControl(p.label || p.name, valueEl, slider));
  }
  $paramSliders.appendChild(frag);
}

function renderTraitSliders() {
  const frag = document.createDocumentFragment();
  for (const [name, def] of Object.entries(TRAITS)) {
    const avg = (def.population_mean_f + def.population_mean_m) / 2;
    const valueEl = document.createElement('span');
    valueEl.className = 'param-value';
    valueEl.textContent = avg.toFixed(2);

    const slider = createSlider(0, 1, 0.02, avg, (v) => {
      engine.setTrait(name, v);
      valueEl.textContent = v.toFixed(2);
    });

    frag.appendChild(createParamControl(name, valueEl, slider));
  }
  $traitSliders.appendChild(frag);
}

function renderPlatformToggles() {
  const frag = document.createDocumentFragment();

  frag.appendChild(createGroupLabel('MODULE G', 'var(--color-module-g)'));
  for (const name of Object.keys(MODULE_G.platforms)) {
    frag.appendChild(createToggleRow(name, 'module-g'));
  }

  frag.appendChild(createGroupLabel('MODULE A', 'var(--color-module-a)'));
  for (const name of Object.keys(MODULE_A.platforms)) {
    frag.appendChild(createToggleRow(name, 'module-a'));
  }

  $platformToggles.appendChild(frag);
}

// ── DOM Helpers ──

function createButton(text, className) {
  const btn = document.createElement('button');
  btn.className = `sim-btn${className ? ` ${className}` : ''}`;
  btn.textContent = text;
  return btn;
}

function createSlider(min, max, step, value, onInput) {
  const input = document.createElement('input');
  input.type = 'range';
  input.min = min;
  input.max = max;
  input.step = step;
  input.value = value;
  input.addEventListener('input', () => onInput(parseFloat(input.value)));
  return input;
}

function createParamControl(name, valueEl, slider) {
  const control = document.createElement('div');
  control.className = 'param-control';

  const label = document.createElement('label');
  const nameSpan = document.createElement('span');
  nameSpan.className = 'param-name';
  nameSpan.textContent = name;
  label.appendChild(nameSpan);
  label.appendChild(valueEl);

  control.appendChild(label);
  control.appendChild(slider);
  return control;
}

function createGroupLabel(text, color) {
  const el = document.createElement('div');
  el.style.cssText = `font-size:0.65rem;color:${color};font-weight:600;margin:8px 0 4px;`;
  el.textContent = text;
  return el;
}

function createToggleRow(name, moduleClass) {
  const row = document.createElement('div');
  row.className = 'toggle-row';

  const label = document.createElement('span');
  label.className = 'toggle-label';
  label.textContent = name;

  const toggleLabel = document.createElement('label');
  toggleLabel.className = `toggle-switch ${moduleClass}`;

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = true;
  input.addEventListener('change', () => engine.togglePlatform(name, input.checked));

  const slider = document.createElement('span');
  slider.className = 'toggle-slider';

  toggleLabel.appendChild(input);
  toggleLabel.appendChild(slider);

  row.appendChild(label);
  row.appendChild(toggleLabel);
  return row;
}

function formatNum(val, step) {
  if (step < 0.01) return val.toFixed(3);
  if (step < 0.1) return val.toFixed(2);
  return val.toFixed(1);
}

// ═══════════════════════════════════════════════════════════════
// CENTER PANEL — Platform Detail View
// ═══════════════════════════════════════════════════════════════

function resetDetailView() {
  $detailView.textContent = '';
  const placeholder = document.createElement('div');
  placeholder.className = 'detail-placeholder';
  const hint = document.createElement('p');
  hint.className = 'detail-hint';
  hint.textContent = 'Select a module or component to inspect';
  placeholder.appendChild(hint);
  $detailView.appendChild(placeholder);
  selectedModule = null;
  selectedPlatform = null;
  selectedLoop = null;
  updateModuleSelection();
}

// NOTE: The center panel detail views use innerHTML for rendering complex
// nested layouts from static DSL data. All string values originate from
// dsl-source.js — a static module we control. No user input is rendered.

function renderModuleDetail(mod) {
  const module = mod === 'G' ? MODULE_G : MODULE_A;

  const html = `
    <div class="detail-header">
      <h2>${esc(module.name)}</h2>
      <div class="deployed-as">
        Target: ${esc(module.target_profile.estimated_coverage)}
        · Primary: ${esc(module.target_profile.primary_vulnerability)}
      </div>
    </div>
    <div class="platform-cards">
      ${Object.entries(module.platforms).map(([name, p]) => `
        <div class="platform-card" data-platform="${esc(name)}" data-module="${esc(mod)}">
          <div class="platform-card-header">
            <span class="platform-card-name">${esc(p.fullName)}</span>
            <span class="platform-card-deployed">${esc(p.deployedAs)}</span>
          </div>
          <div class="mechanic-tags">
            ${p.mechanics.map(m => `<span class="mechanic-tag">${esc(m)}</span>`).join('')}
          </div>
          <div style="font-size:0.7rem;color:var(--color-text-secondary)">
            ${p.effects.map(e => `${esc(e.variable)} ${esc(e.operator)} ${esc(e.expression)}`).join('<br>')}
          </div>
        </div>
      `).join('')}
    </div>
    <h3 class="panel-subtitle" style="margin-top:16px;">Feedback Loops</h3>
    ${(mod === 'G' ? MODULE_G : MODULE_A).feedback_loops.map(loop => `
      <div class="cross-module-item" data-loop="${esc(loop.name)}" data-module="${esc(mod)}">
        <span class="cross-module-dot"></span>
        <span class="cross-module-name">${esc(loop.name)}</span>
        <span class="cross-module-priority">damping: ${esc(loop.damping)}</span>
      </div>
    `).join('')}
  `;

  $detailView.innerHTML = html; // static DSL data only

  $detailView.querySelectorAll('.platform-card').forEach(el => {
    el.addEventListener('click', () => {
      selectedPlatform = el.dataset.platform;
      selectedLoop = null;
      renderPlatformDetail(el.dataset.platform, el.dataset.module);
    });
  });

  $detailView.querySelectorAll('[data-loop]').forEach(el => {
    el.addEventListener('click', () => {
      selectedPlatform = null;
      selectedLoop = el.dataset.loop;
      renderLoopDetail(el.dataset.loop, el.dataset.module);
    });
  });
}

function renderPlatformDetail(platformName, mod) {
  const module = mod === 'G' ? MODULE_G : MODULE_A;
  const platform = module.platforms[platformName];
  const tooltips = getTooltips();
  const tooltip = tooltips[platformName] || '';
  const dslKey = platformName;

  let html = `
    <div class="detail-header">
      <h2 ${tooltip ? `title="${escAttr(tooltip)}"` : ''}>${esc(platform.fullName)}</h2>
      <div class="deployed-as">Deployed as: ${esc(platform.deployedAs)} · Medium: ${esc(platform.medium)}</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">Mechanics</div>
      <div class="mechanic-tags">
        ${platform.mechanics.map(m => {
          const mechDef = MECHANICS[m];
          return `<span class="mechanic-tag" title="${escAttr(mechDef?.description || '')}">${esc(m)}</span>`;
        }).join('')}
      </div>
    </div>

    <div class="detail-section">
      <div class="detail-section-title">${esc(platform.effects_label || 'Effects')}</div>
      <div class="effects-list" id="effects-${esc(platformName)}">
        ${buildEffectRows(platform)}
      </div>
    </div>
  `;

  // Properties
  const propKeys = ['retention_driver', 'exit_cost', 'unique_property',
    'distributional_property', 'critical_metric', 'short_term_relief',
    'long_term_effect', 'interaction_with_dating', 'systemic_function',
    'defence_mechanism'];

  const props = propKeys.filter(k => platform[k]);
  if (props.length) {
    html += `<div class="detail-section"><div class="detail-section-title">Properties</div>`;
    html += props.map(k =>
      `<div class="detail-property"><strong>${esc(formatVarName(k))}:</strong> ${esc(platform[k])}</div>`
    ).join('');
    html += `</div>`;
  }

  if (platform.time_displacement?.targets) {
    html += `
      <div class="detail-section">
        <div class="detail-section-title">Time Displacement</div>
        <div class="detail-property">${esc(platform.time_displacement.mechanism)}</div>
        <div class="detail-property"><strong>Targets:</strong> ${esc(platform.time_displacement.targets.join(', '))}</div>
      </div>
    `;
  }

  html += `<button class="sim-btn" style="margin-top:12px;" id="btn-back">← Back to Module ${esc(mod)}</button>`;
  html += buildDSLToggle(dslKey);

  $detailView.innerHTML = html; // static DSL data only

  document.getElementById('btn-back').addEventListener('click', () => renderModuleDetail(mod));
  wireDSLToggle(dslKey);
}

function buildEffectRows(platform) {
  return platform.effects.map(e => {
    const val = engine.getEffectValue(e);
    const sign = val >= 0 ? '+' : '';
    const dir = STATE_VARIABLES[e.variable]?.goodDirection;
    const colorClass = val >= 0
      ? (dir === 'low' ? 'effect-negative' : 'effect-positive')
      : (dir === 'low' ? 'effect-positive' : 'effect-negative');

    let row = `<div class="effect-row">
      <span class="effect-equation">${esc(e.variable)} ${esc(e.operator)} ${esc(e.expression)}</span>
      <span class="effect-current ${colorClass}">${sign}${val.toFixed(4)}/tick</span>
    </div>`;

    if (e.comment) {
      row += `<div style="font-size:0.65rem;color:var(--color-text-muted);padding:0 0 4px;font-style:italic"># ${esc(e.comment)}</div>`;
    }
    return row;
  }).join('');
}

function renderLoopDetail(loopName, mod) {
  const module = mod === 'G' ? MODULE_G : MODULE_A;
  const loop = module.feedback_loops.find(l => l.name === loopName);
  if (!loop) return;

  const isActive = engine.activeLoops.has(loopName);
  const dslKey = loopName.replace(/\s+/g, '');

  const html = `
    <div class="detail-header">
      <h2>${esc(loop.name)}</h2>
      <div class="deployed-as">
        Module ${esc(loop.module)} · Damping: ${esc(loop.damping)}
        · Status: <strong style="color:${isActive ? 'var(--color-warning)' : 'var(--color-text-muted)'}">${isActive ? 'ACTIVE' : 'DORMANT'}</strong>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Chain</div>
      <div class="loop-chain">${buildChainSteps(loop.chain, isActive)}</div>
    </div>
    <button class="sim-btn" style="margin-top:12px;" id="btn-back">← Back to Module ${esc(mod)}</button>
    ${buildDSLToggle(dslKey)}
  `;

  $detailView.innerHTML = html; // static DSL data only

  document.getElementById('btn-back').addEventListener('click', () => renderModuleDetail(mod));
  wireDSLToggle(dslKey);
}

function renderInteractionDetail(interactionName) {
  const interaction = CROSS_MODULE_INTERACTIONS.find(i => i.name === interactionName);
  if (!interaction) return;

  const isActive = engine.activeLoops.has(interactionName);
  const dslKey = interactionName.replace(/\s+/g, '');

  let html = `
    <div class="detail-header">
      <h2>${esc(interaction.name)}</h2>
      <div class="deployed-as">
        Priority: ${esc(interaction.priority)}
        ${interaction.status ? ` · Status: ${esc(interaction.status)}` : ''}
        · <strong style="color:${isActive ? 'var(--color-warning)' : 'var(--color-text-muted)'}">${isActive ? 'ACTIVE' : 'DORMANT'}</strong>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-section-title">Flow</div>
      <div class="loop-chain">${buildChainSteps(interaction.flow, isActive)}</div>
    </div>
  `;

  if (interaction.damping_mechanisms_in_natural_environment) {
    html += `<div class="detail-section"><div class="detail-section-title">Damping Mechanisms (Natural Environment)</div>`;
    html += interaction.damping_mechanisms_in_natural_environment.map(d =>
      `<div class="detail-property" style="text-decoration:line-through;color:var(--color-text-muted)">${esc(d)}</div>`
    ).join('');
    html += `<div class="detail-property" style="margin-top:4px;"><strong>Remaining:</strong> ${esc(interaction.damping_mechanisms_remaining)}</div></div>`;
  }

  if (interaction.note) {
    html += `<div class="detail-section"><div class="detail-section-title">Subcommittee Note</div>
      <div class="detail-property" style="font-style:italic">${esc(interaction.note)}</div></div>`;
  }

  if (interaction.affectedVariables) {
    html += `<div class="detail-section"><div class="detail-section-title">Affected Variables</div>
      <div class="detail-property">${esc(interaction.affectedVariables.join(', '))}</div></div>`;
  }

  html += buildDSLToggle(dslKey);

  $detailView.innerHTML = html; // static DSL data only
  wireDSLToggle(dslKey);
}

function buildChainSteps(chain, isActive) {
  return chain.map((step, i) => {
    let cls = 'loop-chain-text';
    if (step.includes('ModuleG')) cls += ' module-g-ref';
    else if (step.includes('ModuleA')) cls += ' module-a-ref';

    const isTerminal = step.startsWith('[') && step.endsWith(']');
    if (isTerminal) cls = `loop-chain-terminal${isActive ? ' active' : ''}`;

    return `<div class="loop-chain-step">
      <span class="loop-chain-arrow">${i === 0 ? '●' : '→'}</span>
      <span class="${cls}">${esc(step.replace(/_/g, ' '))}</span>
    </div>`;
  }).join('');
}

// ── DSL Source Toggle ──

function buildDSLToggle(key) {
  const sourceText = DSL_SOURCE_TEXT[key];
  if (!sourceText) return '';
  return `
    <button class="dsl-toggle-btn" data-dsl-key="${escAttr(key)}">▶ VIEW SPECIFICATION</button>
    <div class="dsl-source" id="dsl-${escAttr(key)}">
      <div class="dsl-source-header">SPECIFICATION EXTRACT — OATM/SOL3/2024/TNX · Language: Structural Modelling Notation (Dazzle DSL v1.0)</div>
      <div class="dsl-source-code">${highlightDSL(sourceText)}</div>
    </div>
  `;
}

function wireDSLToggle(key) {
  const btn = $detailView.querySelector(`[data-dsl-key="${key}"]`);
  const source = document.getElementById(`dsl-${key}`);
  if (!btn || !source) return;

  btn.addEventListener('click', () => {
    const visible = source.classList.toggle('visible');
    btn.textContent = visible ? '▼ HIDE SPECIFICATION' : '▶ VIEW SPECIFICATION';
  });
}

function highlightDSL(text) {
  return esc(text)
    .replace(/(#[^\n]*)/g, '<span class="comment">$1</span>')
    .replace(/\b(platform|mechanic|trait|state|system|feedback_loop|interaction|output|effects|effects_on_creator|flow|@meta)\b/g, '<span class="kw">$1</span>')
    .replace(/\b(mechanics|medium|description|range|population_mean_f|population_mean_m|sd|retention_driver|exit_cost|unique_property|distributional_property|critical_metric|short_term_relief|long_term_effect|interaction_with_dating|systemic_function|defence_mechanism|time_displacement|targets|mechanism|damping|priority|status|note|metric|trajectory|threshold_for_irreversibility|territories_approaching_threshold|confidence|pre_deployment_estimate|post_deployment_estimate|damping_mechanisms_in_natural_environment|damping_mechanisms_remaining|addiction_potential|habituation_resistance|natural_stopping_cues|exploits|effect|side_effect|transparency|version|title|classification):/g, '<span class="kw">$1</span>:')
    .replace(/&quot;([^&]*)&quot;/g, '<span class="str">&quot;$1&quot;</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>')
    .replace(/(\+=|-=|\*=)/g, '<span class="op">$1</span>');
}

// ═══════════════════════════════════════════════════════════════
// OUTCOMES STRIP
// ═══════════════════════════════════════════════════════════════

const OUTCOME_DEFS = [
  { key: 'tfr', label: 'Demographics', metric: 'Total Fertility Rate', format: v => v.toFixed(2), thresholds: [1.5, 1.0] },
  { key: 'trustIndex', label: 'Social Cohesion', metric: 'Interpersonal Trust Index', format: v => v.toFixed(2), thresholds: [0.35, 0.2] },
  { key: 'collectiveAction', label: 'Collective Action', metric: 'Collective Action Capacity', format: v => v.toFixed(2), thresholds: [0.25, 0.15] },
  { key: 'interstellarCycles', label: 'Interstellar Timeline', metric: 'Est. Cycles to Capability', format: v => v.toLocaleString(), thresholds: [1000, 5000], invert: true }
];

function renderOutcomes() {
  const frag = document.createDocumentFragment();
  for (const def of OUTCOME_DEFS) {
    const card = document.createElement('div');
    card.className = 'outcome-card';

    const label = document.createElement('div');
    label.className = 'outcome-label';
    label.textContent = def.label;

    const value = document.createElement('div');
    value.className = 'outcome-value';
    value.id = `ov-${def.key}`;
    value.textContent = '—';

    const metric = document.createElement('div');
    metric.className = 'outcome-metric';
    metric.textContent = def.metric;

    const canvas = document.createElement('canvas');
    canvas.className = 'outcome-sparkline';
    canvas.id = `spark-${def.key}`;
    canvas.width = 100;
    canvas.height = 24;

    card.append(label, value, metric, canvas);
    frag.appendChild(card);
  }
  $outcomes.appendChild(frag);
}

function updateOutcomes(snapshot) {
  for (const def of OUTCOME_DEFS) {
    const val = snapshot.outputs[def.key];
    const el = document.getElementById(`ov-${def.key}`);
    if (!el) continue;

    el.textContent = def.format(val);

    el.classList.remove('status-good', 'status-warning', 'status-danger');
    if (def.invert) {
      if (val < def.thresholds[0]) el.classList.add('status-good');
      else if (val < def.thresholds[1]) el.classList.add('status-warning');
      else el.classList.add('status-danger');
    } else {
      if (val > def.thresholds[0]) el.classList.add('status-good');
      else if (val > def.thresholds[1]) el.classList.add('status-warning');
      else el.classList.add('status-danger');
    }

    drawSparkline(`spark-${def.key}`, snapshot.history, def.key);
  }
}

function drawSparkline(canvasId, history, key) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || history.length < 2) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const values = history.map(entry => entry[key]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  ctx.beginPath();
  ctx.strokeStyle = '#adb5bd';
  ctx.lineWidth = 1.5;

  for (let i = 0; i < values.length; i++) {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((values[i] - min) / range) * (h - 4) - 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const lastY = h - ((values[values.length - 1] - min) / range) * (h - 4) - 2;
  ctx.beginPath();
  ctx.arc(w, lastY, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#6c757d';
  ctx.fill();
}

// ═══════════════════════════════════════════════════════════════
// HEADER — Cycle Counter
// ═══════════════════════════════════════════════════════════════

function updateCycleCounter(tickCount) {
  const major = Math.floor(tickCount / 100);
  const minor = Math.floor((tickCount % 100) / 10);
  const sub = tickCount % 10;
  $cycleCount.textContent = `${major}.${minor}.${String(sub).padStart(3, '0')}`;
}

// ═══════════════════════════════════════════════════════════════
// CROSS-MODULE LINE ACTIVE STATE
// ═══════════════════════════════════════════════════════════════

function updateCrossModuleLines(snapshot) {
  $crossModuleLines.querySelectorAll('.cross-module-item').forEach(el => {
    el.classList.toggle('active', snapshot.activeLoops.has(el.dataset.interaction));
  });
}

// ═══════════════════════════════════════════════════════════════
// LIVE EFFECT UPDATE
// ═══════════════════════════════════════════════════════════════

function updateLiveEffects() {
  if (!selectedPlatform || !selectedModule) return;

  const module = selectedModule === 'G' ? MODULE_G : MODULE_A;
  const platform = module?.platforms?.[selectedPlatform];
  if (!platform) return;

  const container = document.getElementById(`effects-${selectedPlatform}`);
  if (container) {
    container.innerHTML = buildEffectRows(platform); // static DSL data only
  }
}

// ═══════════════════════════════════════════════════════════════
// TOOLTIPS
// ═══════════════════════════════════════════════════════════════

function getTooltips() {
  return {
    Instagram: "The species' vulnerability to this mechanic is, candidly, remarkable.",
    Pornography: "The Subcommittee notes this without further comment.",
    DatingApps: "The reinforcement schedule is, by coincidence, almost identical to the one the species uses to keep laboratory rodents pressing levers.",
    CompetitiveGaming: "A secondary status hierarchy in which one demonstrates commitment by spending real resources on imaginary costumes.",
    Manosphere: "The species constructed its own immune suppression system.",
    OnlyFans: "The most effective defence mechanisms in the entire system, achieved at zero cost to the programme.",
    TikTok: "The species finds this unpredictability fascinating and distressing in approximately equal measure."
  };
}

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function formatVarName(name) {
  return name.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim().replace(/_/g, ' ');
}

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ═══════════════════════════════════════════════════════════════
// MAIN UPDATE LOOP
// ═══════════════════════════════════════════════════════════════

engine.onTick((snapshot) => {
  updateStateGauges(snapshot);
  updateOutcomes(snapshot);
  updateCycleCounter(snapshot.tickCount);
  updateCrossModuleLines(snapshot);
  updateLiveEffects();
});

// ═══════════════════════════════════════════════════════════════
// INITIALIZE
// ═══════════════════════════════════════════════════════════════

renderModuleBlocks();
renderCrossModuleLines();
renderStateGauges();
renderSimControls();
renderParamSliders();
renderTraitSliders();
renderPlatformToggles();
renderOutcomes();

engine._notify();
engine.start();
