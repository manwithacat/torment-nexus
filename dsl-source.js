// ═══════════════════════════════════════════════════════════════
// TORMENT NEXUS SYSTEM MODEL — Dazzle DSL Data Layer
// Classification: OATM/SOL3/2024/TNX
// ═══════════════════════════════════════════════════════════════

// ── @meta ──

export const META = {
  title: "Torment Nexus System Model",
  version: "1.0",
  classification: "OATM/SOL3 — Induced Civilisational Senescence",
  description: "Dual-module psychosocial disruption system targeting pair-bonding species with dimorphic trait distributions"
};

// ── TRAIT DEFINITIONS ──

export const TRAITS = {
  Agreeableness: {
    description: "Sensitivity to social approval and group harmony",
    range: [0.0, 1.0],
    population_mean_f: 0.62,
    population_mean_m: 0.44,
    sd: 0.12
  },
  Neuroticism: {
    description: "Sensitivity to negative affect and perceived threat",
    range: [0.0, 1.0],
    population_mean_f: 0.58,
    population_mean_m: 0.42,
    sd: 0.14
  },
  StatusSensitivity: {
    description: "Responsiveness to hierarchical position signals",
    range: [0.0, 1.0],
    population_mean_f: 0.45,
    population_mean_m: 0.63,
    sd: 0.13
  },
  SexualAccessAnxiety: {
    description: "Distress from perceived inadequacy as mate",
    range: [0.0, 1.0],
    population_mean_f: 0.30,
    population_mean_m: 0.55,
    sd: 0.15
  }
};

// ── DYNAMIC STATE VARIABLES ──

export const STATE_VARIABLES = {
  Loneliness:          { range: [0.0, 1.0], initial: 0.3, goodDirection: "low" },
  SelfEfficacy:        { range: [0.0, 1.0], initial: 0.6, goodDirection: "high" },
  MateValuePerception: { range: [0.0, 1.0], initial: 0.5, goodDirection: "high" },
  SocialCohesion:      { range: [0.0, 1.0], initial: 0.7, goodDirection: "high" },
  BodySatisfaction:    { range: [0.0, 1.0], initial: 0.6, goodDirection: "high" },
  RelationalCapacity:  { range: [0.0, 1.0], initial: 0.6, goodDirection: "high" },
  NarrativeCoherence:  { range: [0.0, 1.0], initial: 0.7, goodDirection: "high" },
  ReproductiveIntent:  { range: [0.0, 1.0], initial: 0.5, goodDirection: "high" }
};

// ── PLATFORM MECHANICS ──

export const MECHANICS = {
  IntermittentReinforcement: {
    description: "Variable-ratio reward schedule",
    addiction_potential: 0.85,
    habituation_resistance: "high",
    natural_stopping_cues: "none"
  },
  QuantifiedApproval: {
    description: "Numerical social evaluation (likes, followers, matches)",
    exploits: ["Agreeableness", "StatusSensitivity"],
    effect: "Converts ambient social standing into explicit, comparable metric"
  },
  AlgorithmicCuration: {
    description: "Content selection optimised for engagement",
    side_effect: "Maximises comparison with superior examples",
    transparency: "none"
  },
  ToleranceEscalation: {
    description: "Habituation requiring progressively stronger stimuli",
    exploits: "Dopaminergic reward adaptation",
    trajectory: "Divergence from realistic expectations"
  },
  EngineeredStasis: {
    description: "Matchmaking producing ~50% success rate",
    effect: "Perpetual sense of almost-good-enough",
    time_displacement: "high"
  },
  ExplanatoryCapture: {
    description: "Provides validating but counterproductive causal narratives",
    exploits: "Narrative self-construction trait",
    effect: "Pre-empts accurate systemic diagnosis"
  }
};

// ── MODULE G: GYNOSPHERE TORMENT NEXUS ──

export const MODULE_G = {
  name: "Gynosphere Torment Nexus",
  id: "ModuleG",

  target_profile: {
    primary_vulnerability: "Agreeableness > 0.55",
    secondary_vulnerability: "Neuroticism > 0.50",
    estimated_coverage: "68% of female population"
  },

  platforms: {
    Instagram: {
      fullName: "Quantified Social Comparison Engine",
      deployedAs: "Instagram",
      mechanics: ["QuantifiedApproval", "AlgorithmicCuration", "IntermittentReinforcement"],
      medium: "curated_visual",
      effects: [
        {
          variable: "BodySatisfaction",
          operator: "-=",
          expression: "0.15 * Neuroticism * exposure_hours",
          apply: (state, params, traits) => -0.15 * traits.Neuroticism * params.exposure_hours
        },
        {
          variable: "Loneliness",
          operator: "+=",
          expression: "0.10 * Agreeableness * exposure_hours",
          apply: (state, params, traits) => 0.10 * traits.Agreeableness * params.exposure_hours
        },
        {
          variable: "MateValuePerception",
          operator: "-=",
          expression: "0.08 * comparison_frequency",
          apply: (state, params, traits) => -0.08 * params.comparison_frequency
        },
        {
          variable: "SelfEfficacy",
          operator: "-=",
          expression: "0.05 * follower_growth_stagnation",
          apply: (state, params, traits) => -0.05 * params.follower_growth_stagnation
        }
      ],
      retention_driver: "Social obligation to maintain presence",
      exit_cost: "Perceived social death"
    },

    TikTok: {
      fullName: "Algorithmic Attention Roulette",
      deployedAs: "TikTok",
      mechanics: ["IntermittentReinforcement", "AlgorithmicCuration"],
      medium: "short_form_video",
      effects: [
        {
          variable: "BodySatisfaction",
          operator: "-=",
          expression: "0.12 * Neuroticism * exposure_hours",
          apply: (state, params, traits) => -0.12 * traits.Neuroticism * params.exposure_hours
        },
        {
          variable: "SelfEfficacy",
          operator: "-=",
          expression: "0.10 * virality_unpredictability",
          apply: (state, params, traits) => -0.10 * params.virality_unpredictability
        },
        {
          variable: "NarrativeCoherence",
          operator: "-=",
          expression: "0.08 * content_fragmentation",
          apply: (state, params, traits) => -0.08 * params.content_fragmentation
        }
      ],
      unique_property: "Algorithmic opacity maximises learned helplessness",
      retention_driver: "Unpredictable viral reward"
    },

    OnlyFans: {
      fullName: "Monetised Self-Commodification Layer",
      deployedAs: "OnlyFans",
      mechanics: ["QuantifiedApproval", "IntermittentReinforcement"],
      medium: "subscriber_parasocial",
      effects_label: "effects_on_creator",
      effects: [
        {
          variable: "SelfEfficacy",
          operator: "+=",
          expression: "0.15 * subscriber_income",
          comment: "Short-term positive (individual incentive to adopt)",
          apply: (state, params, traits) => 0.15 * params.subscriber_income
        },
        {
          variable: "RelationalCapacity",
          operator: "-=",
          expression: "0.10 * commodification_duration",
          comment: "Long-term negative (aggregate coordination collapse)",
          apply: (state, params, traits) => -0.10 * params.commodification_duration
        },
        {
          variable: "ReproductiveIntent",
          operator: "-=",
          expression: "0.08 * financial_independence",
          apply: (state, params, traits) => -0.08 * params.financial_independence
        }
      ],
      systemic_function: "Accelerates coordination equilibrium collapse",
      defence_mechanism: "Empowerment framing immunises against critique"
    }
  },

  feedback_loops: [
    {
      name: "Comparison Spiral",
      module: "G",
      chain: [
        "Instagram.comparison",
        "decreased_BodySatisfaction",
        "increased_editing_and_filtering",
        "elevated_comparison_baseline_for_others",
        "decreased_BodySatisfaction_population_wide",
        "[AMPLIFIES]"
      ],
      damping: "none",
      trigger: (state) => state.BodySatisfaction < 0.5,
      amplify: (state) => state.BodySatisfaction < 0.5 ? 1.15 : 1.0
    },
    {
      name: "Validation Dependency",
      module: "G",
      chain: [
        "QuantifiedApproval.metrics",
        "dopamine_association_with_likes",
        "increased_posting_frequency",
        "increased_vulnerability_to_metric_fluctuation",
        "anxiety_on_metric_decline",
        "compensatory_posting",
        "[AMPLIFIES]"
      ],
      damping: "none",
      trigger: (state) => state.SelfEfficacy < 0.5,
      amplify: (state) => state.SelfEfficacy < 0.5 ? 1.12 : 1.0
    }
  ]
};

// ── MODULE A: ANDROSPHERE TORMENT NEXUS ──

export const MODULE_A = {
  name: "Androsphere Torment Nexus",
  id: "ModuleA",

  target_profile: {
    primary_vulnerability: "StatusSensitivity > 0.55",
    secondary_vulnerability: "SexualAccessAnxiety > 0.45",
    estimated_coverage: "72% of male population"
  },

  platforms: {
    DatingApps: {
      fullName: "Quantified Sexual Rejection Engine",
      deployedAs: "Dating Apps (Tinder, Hinge, Bumble)",
      mechanics: ["QuantifiedApproval", "IntermittentReinforcement"],
      medium: "swipe_interface",
      effects: [
        {
          variable: "MateValuePerception",
          operator: "-=",
          expression: "0.25 * (1.0 - match_rate) * SexualAccessAnxiety",
          apply: (state, params, traits) => -0.25 * (1.0 - params.match_rate) * traits.SexualAccessAnxiety
        },
        {
          variable: "Loneliness",
          operator: "+=",
          expression: "0.15 * rejection_frequency",
          apply: (state, params, traits) => 0.15 * params.rejection_frequency
        },
        {
          variable: "SelfEfficacy",
          operator: "-=",
          expression: "0.12 * effort_to_outcome_ratio",
          apply: (state, params, traits) => -0.12 * params.effort_to_outcome_ratio
        },
        {
          variable: "RelationalCapacity",
          operator: "-=",
          expression: "0.08 * commodified_evaluation_duration",
          apply: (state, params, traits) => -0.08 * params.commodified_evaluation_duration
        }
      ],
      distributional_property: "Power-law attention allocation",
      critical_metric: "Median male match rate: ~2%",
      retention_driver: "Hope of next match",
      exit_cost: "Perceived sole access route to potential partners"
    },

    CompetitiveGaming: {
      fullName: "Simulated Status Competition",
      deployedAs: "Competitive Online Gaming",
      mechanics: ["EngineeredStasis", "QuantifiedApproval", "IntermittentReinforcement"],
      medium: "ranked_multiplayer",
      effects: [
        {
          variable: "StatusSensitivity",
          operator: "*=",
          expression: "1.10",
          comment: "amplifies own vulnerability",
          apply: (state, params, traits) => {
            // Multiplicative: returns the delta needed
            return traits.StatusSensitivity * 0.10;
          },
          isMultiplicative: true,
          targetTrait: "StatusSensitivity"
        },
        {
          variable: "SelfEfficacy",
          operator: "=",
          expression: "volatile(mean: neutral, variance: high)",
          comment: "volatile — high variance keeps engagement",
          apply: (state, params, traits) => {
            // Simulates volatile effect: random walk around neutral
            return (Math.random() - 0.5) * 0.1;
          }
        },
        {
          variable: "Loneliness",
          operator: "+=",
          expression: "0.05 * hours",
          comment: "simulated community masks real isolation",
          apply: (state, params, traits) => 0.05 * params.exposure_hours
        },
        {
          variable: "RelationalCapacity",
          operator: "-=",
          expression: "0.08 * time_displacement",
          apply: (state, params, traits) => -0.08 * params.time_displacement
        }
      ],
      time_displacement: {
        targets: ["career_development", "social_skills", "fitness", "relationship_formation"],
        mechanism: "Consumes the resource (time) needed to solve the problems driving platform engagement"
      },
      retention_driver: "Rank decay requires continuous play"
    },

    Pornography: {
      fullName: "Supernormal Stimulus Array",
      deployedAs: "Tube Site Pornography",
      mechanics: ["ToleranceEscalation", "IntermittentReinforcement"],
      medium: "streaming_video",
      effects: [
        {
          variable: "SexualAccessAnxiety",
          operator: "+=",
          expression: "0.10 * expectation_reality_gap",
          apply: (state, params, traits) => 0.10 * params.expectation_reality_gap
        },
        {
          variable: "RelationalCapacity",
          operator: "-=",
          expression: "0.12 * consumption_duration",
          apply: (state, params, traits) => -0.12 * params.consumption_duration
        },
        {
          variable: "Loneliness",
          operator: "+=",
          expression: "0.05 * substitution_for_real_pursuit",
          apply: (state, params, traits) => 0.05 * params.substitution_for_real_pursuit
        },
        {
          variable: "ReproductiveIntent",
          operator: "-=",
          expression: "0.08 * effort_substitution",
          apply: (state, params, traits) => -0.08 * params.effort_substitution
        }
      ],
      short_term_relief: "Neurochemical reward without social effort",
      long_term_effect: "Progressive divergence from realistic expectations",
      interaction_with_dating: "Reduces motivation to endure dating app rejection"
    },

    Manosphere: {
      fullName: "False Solution Dispensary",
      deployedAs: "The Manosphere",
      mechanics: ["ExplanatoryCapture", "IntermittentReinforcement"],
      medium: "video_and_text_content",
      effects: [
        {
          variable: "SelfEfficacy",
          operator: "+=",
          expression: "0.10 * short_term",
          comment: "validation feels good",
          apply: (state, params, traits) => 0.10 * params.short_term_validation
        },
        {
          variable: "SelfEfficacy",
          operator: "-=",
          expression: "0.15 * long_term",
          comment: "advice doesn't work",
          apply: (state, params, traits) => -0.15 * params.long_term_adoption
        },
        {
          variable: "RelationalCapacity",
          operator: "-=",
          expression: "0.20 * adversarial_framing_adoption",
          apply: (state, params, traits) => -0.20 * params.adversarial_framing_adoption
        },
        {
          variable: "NarrativeCoherence",
          operator: "-=",
          expression: "0.10 * conspiracy_ideation",
          apply: (state, params, traits) => -0.10 * params.conspiracy_ideation
        }
      ],
      systemic_function: "Toxifies all systemic critique by association",
      defence_mechanism: "Converts legitimate grievance into dismissible extremism"
    }
  },

  feedback_loops: [
    {
      name: "Isolation Spiral",
      module: "A",
      chain: [
        "DatingApps.rejection",
        "Pornography.consumption",
        "reduced_real_world_pursuit",
        "atrophied_social_skills",
        "increased_DatingApps.rejection",
        "[AMPLIFIES]"
      ],
      damping: "none",
      trigger: (state) => state.MateValuePerception < 0.4,
      amplify: (state) => state.MateValuePerception < 0.4 ? 1.18 : 1.0
    },
    {
      name: "Status Treadmill",
      module: "A",
      chain: [
        "CompetitiveGaming.ranking_anxiety",
        "time_investment",
        "real_world_status_neglect",
        "increased_real_world_status_anxiety",
        "increased_CompetitiveGaming.escape",
        "[AMPLIFIES]"
      ],
      damping: "none",
      trigger: (state) => state.SelfEfficacy < 0.45,
      amplify: (state) => state.SelfEfficacy < 0.45 ? 1.10 : 1.0
    },
    {
      name: "Radicalisation Funnel",
      module: "A",
      chain: [
        "DatingApps.rejection",
        "seek_explanation",
        "Manosphere.explanatory_capture",
        "adversarial_gender_framing",
        "degraded_RelationalCapacity",
        "increased_DatingApps.rejection",
        "deeper_Manosphere.engagement",
        "[AMPLIFIES]"
      ],
      damping: "none",
      trigger: (state) => state.RelationalCapacity < 0.4,
      amplify: (state) => state.RelationalCapacity < 0.4 ? 1.15 : 1.0
    }
  ]
};

// ── CROSS-MODULE INTERACTIONS ──

export const CROSS_MODULE_INTERACTIONS = [
  {
    name: "Mutual Withdrawal Spiral",
    priority: "critical",
    flow: [
      "ModuleG.Instagram",
      "female_anxiety_and_elevated_standards",
      "withdrawal_from_dating_market",
      "ModuleA.DatingApps.reduced_female_availability",
      "increased_male_rejection",
      "ModuleA.Pornography.increased_consumption",
      "reduced_male_relational_investment",
      "ModuleG.perceived_inadequate_male_partners",
      "ModuleG.further_withdrawal",
      "[CYCLE]"
    ],
    damping_mechanisms_in_natural_environment: [
      "Geographic constraint (repeated encounters)",
      "Community mediation (mutual acquaintances)",
      "Limited information (cannot compare all options)",
      "Social pressure (family, community expectations)"
    ],
    damping_mechanisms_remaining: "none",
    trigger: (state) => state.Loneliness > 0.5 && state.RelationalCapacity < 0.5,
    amplify: (state) => {
      if (state.Loneliness > 0.5 && state.RelationalCapacity < 0.5) return 1.20;
      return 1.0;
    },
    affectedVariables: ["Loneliness", "RelationalCapacity", "MateValuePerception", "ReproductiveIntent"]
  },
  {
    name: "Commodification Ratchet",
    priority: "high",
    flow: [
      "ModuleG.OnlyFans.normalisation",
      "increased_sexual_content_supply_without_relationship",
      "ModuleA.reduced_male_investment_in_courtship",
      "reduced_quality_of_male_relational_behaviour",
      "ModuleG.confirmed_perception_of_inadequate_partners",
      "increased_attractiveness_of_OnlyFans_income",
      "[CYCLE]"
    ],
    trigger: (state) => state.RelationalCapacity < 0.45,
    amplify: (state) => state.RelationalCapacity < 0.45 ? 1.12 : 1.0,
    affectedVariables: ["RelationalCapacity", "ReproductiveIntent"]
  },
  {
    name: "Discourse Trap",
    priority: "critical",
    comment: "system defence mechanism",
    flow: [
      "ModuleA.Manosphere.identifies_real_symptoms",
      "frames_critique_in_misogynistic_terms",
      "ModuleG.legitimate_critique_becomes_socially_toxic",
      "empowerment_framing_suppresses_analysis",
      "ModuleA.perceived_censorship_reinforces_radicalisation",
      "increasingly_extreme_rhetoric",
      "further_toxification_of_systemic_critique",
      "[SYSTEM BECOMES UNANALYSABLE FROM WITHIN]"
    ],
    trigger: (state) => state.NarrativeCoherence < 0.5,
    amplify: (state) => state.NarrativeCoherence < 0.5 ? 1.15 : 1.0,
    affectedVariables: ["NarrativeCoherence", "SocialCohesion"]
  },
  {
    name: "AI Companion Force Multiplier",
    priority: "emerging",
    status: "early_deployment",
    flow: [
      "ModuleA.Loneliness + ModuleG.Loneliness",
      "demand_for_simulated_connection",
      "AI_companion_adoption",
      "partial_satisfaction_of_connection_need",
      "reduced_motivation_for_real_connection",
      "atrophied_social_capacity",
      "increased_dependence_on_AI_companions",
      "[CYCLE — with zero human counterparty]"
    ],
    note: "Terminal state. Once this loop dominates, the system no longer requires human creators (OnlyFans) or human opponents (gaming) as intermediaries. The species interacts primarily with artificial systems. Reproductive intent approaches zero. Recommend priority monitoring.",
    trigger: (state) => state.Loneliness > 0.6,
    amplify: (state) => state.Loneliness > 0.6 ? 1.08 : 1.0,
    affectedVariables: ["Loneliness", "RelationalCapacity", "ReproductiveIntent"]
  }
];

// ── SYSTEM OUTPUTS ──

export const OUTPUTS = {
  Demographics: {
    metric: "total_fertility_rate",
    trajectory: "declining",
    mechanism: [
      "Reduced pair-bond formation",
      "Delayed relationship initiation",
      "Substitution of parasocial for real connection",
      "Economic competition from platform engagement time"
    ],
    threshold_for_irreversibility: "TFR < 1.0 sustained for 20 years",
    territories_approaching_threshold: ["Japan", "South Korea", "China"],
    derive: (state) => 2.5 * state.ReproductiveIntent * state.RelationalCapacity * state.SocialCohesion
  },
  SocialCohesion: {
    metric: "interpersonal_trust_index",
    trajectory: "declining",
    mechanism: [
      "Reduced shared experience",
      "Algorithmic fragmentation of information environment",
      "Commodification of interpersonal relations",
      "Erosion of community institutions"
    ],
    derive: (state) => state.SocialCohesion * state.NarrativeCoherence
  },
  CollectiveActionCapacity: {
    metric: "collective_action_index",
    trajectory: "declining",
    mechanism: [
      "Attention fragmentation",
      "Trust erosion",
      "Political polarisation",
      "Narrative incoherence"
    ],
    derive: (state) => state.SocialCohesion * state.NarrativeCoherence * (1 - state.Loneliness)
  },
  InterstellarTimeline: {
    metric: "estimated_cycles_to_interstellar_capability",
    pre_deployment_estimate: "400-600 standard cycles",
    post_deployment_estimate: "unlikely within planning horizon",
    confidence: "high",
    derive: (state) => Math.round(500 / (state.SelfEfficacy * state.NarrativeCoherence * state.SocialCohesion + 0.01))
  }
};

// ── DEFAULT SIMULATION PARAMETERS ──
// These are the adjustable knobs exposed to the operator

export const DEFAULT_PARAMS = {
  // Global
  exposure_hours: 6,
  comparison_frequency: 0.5,

  // Module G specific
  follower_growth_stagnation: 0.5,
  virality_unpredictability: 0.7,
  content_fragmentation: 0.6,
  subscriber_income: 0.4,
  commodification_duration: 0.5,
  financial_independence: 0.4,

  // Module A specific
  match_rate: 0.02,
  rejection_frequency: 0.7,
  effort_to_outcome_ratio: 0.8,
  commodified_evaluation_duration: 0.6,
  time_displacement: 0.7,
  expectation_reality_gap: 0.6,
  consumption_duration: 0.5,
  substitution_for_real_pursuit: 0.5,
  effort_substitution: 0.5,
  short_term_validation: 0.4,
  long_term_adoption: 0.5,
  adversarial_framing_adoption: 0.4,
  conspiracy_ideation: 0.3
};

// ── DSL SOURCE TEXT ──
// Raw DSL blocks for "VIEW SPECIFICATION" display

export const DSL_SOURCE_TEXT = {

meta: `@meta {
  title: "Torment Nexus System Model"
  version: "1.0"
  classification: "OATM/SOL3 — Induced Civilisational Senescence"
  description: "Dual-module psychosocial disruption system targeting
                pair-bonding species with dimorphic trait distributions"
}`,

traits: `# —— TRAIT DEFINITIONS ——

trait Agreeableness {
  description: "Sensitivity to social approval and group harmony"
  range: [0.0, 1.0]
  population_mean_f: 0.62
  population_mean_m: 0.44
  sd: 0.12
}

trait Neuroticism {
  description: "Sensitivity to negative affect and perceived threat"
  range: [0.0, 1.0]
  population_mean_f: 0.58
  population_mean_m: 0.42
  sd: 0.14
}

trait StatusSensitivity {
  description: "Responsiveness to hierarchical position signals"
  range: [0.0, 1.0]
  population_mean_f: 0.45
  population_mean_m: 0.63
  sd: 0.13
}

trait SexualAccessAnxiety {
  description: "Distress from perceived inadequacy as mate"
  range: [0.0, 1.0]
  population_mean_f: 0.30
  population_mean_m: 0.55
  sd: 0.15
}`,

state_variables: `# —— DYNAMIC STATE VARIABLES ——

state Loneliness          { range: [0.0, 1.0], initial: 0.3 }
state SelfEfficacy        { range: [0.0, 1.0], initial: 0.6 }
state MateValuePerception { range: [0.0, 1.0], initial: 0.5 }
state SocialCohesion      { range: [0.0, 1.0], initial: 0.7 }
state BodySatisfaction    { range: [0.0, 1.0], initial: 0.6 }
state RelationalCapacity  { range: [0.0, 1.0], initial: 0.6 }
state NarrativeCoherence  { range: [0.0, 1.0], initial: 0.7 }
state ReproductiveIntent  { range: [0.0, 1.0], initial: 0.5 }`,

mechanics: `# —— PLATFORM MECHANICS ——

mechanic IntermittentReinforcement {
  description: "Variable-ratio reward schedule"
  addiction_potential: 0.85
  habituation_resistance: high
  natural_stopping_cues: none
}

mechanic QuantifiedApproval {
  description: "Numerical social evaluation (likes, followers, matches)"
  exploits: [Agreeableness, StatusSensitivity]
  effect: "Converts ambient social standing into explicit, comparable metric"
}

mechanic AlgorithmicCuration {
  description: "Content selection optimised for engagement"
  side_effect: "Maximises comparison with superior examples"
  transparency: none
}

mechanic ToleranceEscalation {
  description: "Habituation requiring progressively stronger stimuli"
  exploits: "Dopaminergic reward adaptation"
  trajectory: "Divergence from realistic expectations"
}

mechanic EngineeredStasis {
  description: "Matchmaking producing ~50% success rate"
  effect: "Perpetual sense of almost-good-enough"
  time_displacement: high
}

mechanic ExplanatoryCapture {
  description: "Provides validating but counterproductive causal narratives"
  exploits: "Narrative self-construction trait"
  effect: "Pre-empts accurate systemic diagnosis"
}`,

  Instagram: `platform Instagram {
  mechanics: [QuantifiedApproval, AlgorithmicCuration,
              IntermittentReinforcement]
  medium: curated_visual

  effects {
    BodySatisfaction     -= 0.15 * Neuroticism * exposure_hours
    Loneliness           += 0.10 * Agreeableness * exposure_hours
    MateValuePerception  -= 0.08 * comparison_frequency
    SelfEfficacy         -= 0.05 * follower_growth_stagnation
  }

  retention_driver: "Social obligation to maintain presence"
  exit_cost: "Perceived social death"
}`,

  TikTok: `platform TikTok {
  mechanics: [IntermittentReinforcement, AlgorithmicCuration]
  medium: short_form_video

  effects {
    BodySatisfaction     -= 0.12 * Neuroticism * exposure_hours
    SelfEfficacy         -= 0.10 * virality_unpredictability
    NarrativeCoherence   -= 0.08 * content_fragmentation
  }

  unique_property: "Algorithmic opacity maximises learned helplessness"
  retention_driver: "Unpredictable viral reward"
}`,

  OnlyFans: `platform OnlyFans {
  mechanics: [QuantifiedApproval, IntermittentReinforcement]
  medium: subscriber_parasocial

  effects_on_creator {
    # Short-term positive (individual incentive to adopt)
    SelfEfficacy         += 0.15 * subscriber_income
    # Long-term negative (aggregate coordination collapse)
    RelationalCapacity   -= 0.10 * commodification_duration
    ReproductiveIntent   -= 0.08 * financial_independence
  }

  systemic_function: "Accelerates coordination equilibrium collapse"
  defence_mechanism: "Empowerment framing immunises against critique"
}`,

  DatingApps: `platform DatingApps {
  mechanics: [QuantifiedApproval, IntermittentReinforcement]
  medium: swipe_interface

  effects {
    MateValuePerception  -= 0.25 * (1.0 - match_rate) * SexualAccessAnxiety
    Loneliness           += 0.15 * rejection_frequency
    SelfEfficacy         -= 0.12 * effort_to_outcome_ratio
    RelationalCapacity   -= 0.08 * commodified_evaluation_duration
  }

  distributional_property: "Power-law attention allocation"
  critical_metric: "Median male match rate: ~2%"
  retention_driver: "Hope of next match"
  exit_cost: "Perceived sole access route to potential partners"
}`,

  CompetitiveGaming: `platform CompetitiveGaming {
  mechanics: [EngineeredStasis, QuantifiedApproval,
              IntermittentReinforcement]
  medium: ranked_multiplayer

  effects {
    StatusSensitivity    *= 1.10  # amplifies own vulnerability
    SelfEfficacy         = volatile(mean: neutral, variance: high)
    Loneliness           += 0.05 * hours  # simulated community masks real isol
    RelationalCapacity   -= 0.08 * time_displacement
  }

  time_displacement {
    targets: [career_development, social_skills, fitness,
              relationship_formation]
    mechanism: "Consumes the resource (time) needed to solve the
               problems driving platform engagement"
  }

  retention_driver: "Rank decay requires continuous play"
}`,

  Pornography: `platform Pornography {
  mechanics: [ToleranceEscalation, IntermittentReinforcement]
  medium: streaming_video

  effects {
    SexualAccessAnxiety  += 0.10 * expectation_reality_gap
    RelationalCapacity   -= 0.12 * consumption_duration
    Loneliness           += 0.05 * substitution_for_real_pursuit
    ReproductiveIntent   -= 0.08 * effort_substitution
  }

  short_term_relief: "Neurochemical reward without social effort"
  long_term_effect: "Progressive divergence from realistic expectations"
  interaction_with_dating: "Reduces motivation to endure dating app rejection"
}`,

  Manosphere: `platform Manosphere {
  mechanics: [ExplanatoryCapture, IntermittentReinforcement]
  medium: video_and_text_content

  effects {
    SelfEfficacy         += 0.10 * short_term   # validation feels good
    SelfEfficacy         -= 0.15 * long_term     # advice doesn't work
    RelationalCapacity   -= 0.20 * adversarial_framing_adoption
    NarrativeCoherence   -= 0.10 * conspiracy_ideation
  }

  systemic_function: "Toxifies all systemic critique by association"
  defence_mechanism: "Converts legitimate grievance into dismissible extremism"
}`,

  ComparisonSpiral: `feedback_loop "Comparison Spiral" {
  Instagram.comparison -> decreased_BodySatisfaction
    -> increased_editing_and_filtering
      -> elevated_comparison_baseline_for_others
        -> decreased_BodySatisfaction_population_wide
          -> [AMPLIFIES]
  damping: none
}`,

  ValidationDependency: `feedback_loop "Validation Dependency" {
  QuantifiedApproval.metrics -> dopamine_association_with_likes
    -> increased_posting_frequency
      -> increased_vulnerability_to_metric_fluctuation
        -> anxiety_on_metric_decline
          -> compensatory_posting
            -> [AMPLIFIES]
  damping: none
}`,

  IsolationSpiral: `feedback_loop "Isolation Spiral" {
  DatingApps.rejection -> Pornography.consumption
    -> reduced_real_world_pursuit
      -> atrophied_social_skills
        -> increased_DatingApps.rejection
          -> [AMPLIFIES]
  damping: none
}`,

  StatusTreadmill: `feedback_loop "Status Treadmill" {
  CompetitiveGaming.ranking_anxiety -> time_investment
    -> real_world_status_neglect
      -> increased_real_world_status_anxiety
        -> increased_CompetitiveGaming.escape
          -> [AMPLIFIES]
  damping: none
}`,

  RadicalisationFunnel: `feedback_loop "Radicalisation Funnel" {
  DatingApps.rejection -> seek_explanation
    -> Manosphere.explanatory_capture
      -> adversarial_gender_framing
        -> degraded_RelationalCapacity
          -> increased_DatingApps.rejection
            -> deeper_Manosphere.engagement
              -> [AMPLIFIES]
  damping: none
}`,

  MutualWithdrawalSpiral: `interaction "Mutual Withdrawal Spiral" {
  priority: critical

  flow {
    ModuleG.Instagram -> female_anxiety_and_elevated_standards
      -> withdrawal_from_dating_market
        -> ModuleA.DatingApps.reduced_female_availability
          -> increased_male_rejection
            -> ModuleA.Pornography.increased_consumption
              -> reduced_male_relational_investment
                -> ModuleG.perceived_inadequate_male_partners
                  -> ModuleG.further_withdrawal
                    -> [CYCLE]
  }

  damping_mechanisms_in_natural_environment: [
    "Geographic constraint (repeated encounters)",
    "Community mediation (mutual acquaintances)",
    "Limited information (cannot compare all options)",
    "Social pressure (family, community expectations)"
  ]
  damping_mechanisms_remaining: none
}`,

  CommodificationRatchet: `interaction "Commodification Ratchet" {
  priority: high

  flow {
    ModuleG.OnlyFans.normalisation
      -> increased_sexual_content_supply_without_relationship
        -> ModuleA.reduced_male_investment_in_courtship
          -> reduced_quality_of_male_relational_behaviour
            -> ModuleG.confirmed_perception_of_inadequate_partners
              -> increased_attractiveness_of_OnlyFans_income
                -> [CYCLE]
  }
}`,

  DiscourseTrap: `interaction "Discourse Trap" {
  priority: critical  # system defence mechanism

  flow {
    ModuleA.Manosphere.identifies_real_symptoms
      -> frames_critique_in_misogynistic_terms
        -> ModuleG.legitimate_critique_becomes_socially_toxic
          -> empowerment_framing_suppresses_analysis
            -> ModuleA.perceived_censorship_reinforces_radicalisation
              -> increasingly_extreme_rhetoric
                -> further_toxification_of_systemic_critique
                  -> [SYSTEM BECOMES UNANALYSABLE FROM WITHIN]
  }
}`,

  AICompanionForceMultiplier: `interaction "AI Companion Force Multiplier" {
  priority: emerging
  status: early_deployment

  flow {
    ModuleA.Loneliness + ModuleG.Loneliness
      -> demand_for_simulated_connection
        -> AI_companion_adoption
          -> partial_satisfaction_of_connection_need
            -> reduced_motivation_for_real_connection
              -> atrophied_social_capacity
                -> increased_dependence_on_AI_companions
                  -> [CYCLE — with zero human counterparty]
  }

  note: "Terminal state. Once this loop dominates, the system no longer
        requires human creators (OnlyFans) or human opponents (gaming)
        as intermediaries. The species interacts primarily with
        artificial systems. Reproductive intent approaches zero.
        Recommend priority monitoring."
}`,

  outputs: `# —— SYSTEM OUTPUTS ——

output Demographics {
  metric: total_fertility_rate
  trajectory: declining
  mechanism: [
    "Reduced pair-bond formation",
    "Delayed relationship initiation",
    "Substitution of parasocial for real connection",
    "Economic competition from platform engagement time"
  ]
  threshold_for_irreversibility: TFR < 1.0 sustained for 20 years
  territories_approaching_threshold: ["Japan", "South Korea", "China"]
}

output SocialCohesion {
  metric: interpersonal_trust_index
  trajectory: declining
  mechanism: [
    "Reduced shared experience",
    "Algorithmic fragmentation of information environment",
    "Commodification of interpersonal relations",
    "Erosion of community institutions"
  ]
}

output CollectiveActionCapacity {
  metric: collective_action_index
  trajectory: declining
  mechanism: [
    "Attention fragmentation",
    "Trust erosion",
    "Political polarisation",
    "Narrative incoherence"
  ]
}

output InterstellarTimeline {
  metric: estimated_cycles_to_interstellar_capability
  pre_deployment_estimate: "400-600 standard cycles"
  post_deployment_estimate: "unlikely within planning horizon"
  confidence: high
}`

};
