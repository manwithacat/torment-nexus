@meta {
 title: "Torment Nexus System Model"
 version: "1.0"
 classification: "OATM/SOL3 — Induced Civilisational Senescence"
 description: "Dual-module psychosocial disruption system targeting
        pair-bonding species with dimorphic trait distributions"
}

# ─── TRAIT DEFINITIONS ───

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
}

# ─── DYNAMIC STATE VARIABLES ───

state Loneliness      { range: [0.0, 1.0], initial: 0.3 }

state SelfEfficacy     { range: [0.0, 1.0], initial: 0.6 }

state MateValuePerception { range: [0.0, 1.0], initial: 0.5 }

state SocialCohesion    { range: [0.0, 1.0], initial: 0.7 }

state BodySatisfaction   { range: [0.0, 1.0], initial: 0.6 }

state RelationalCapacity  { range: [0.0, 1.0], initial: 0.6 }

state NarrativeCoherence  { range: [0.0, 1.0], initial: 0.7 }

state ReproductiveIntent  { range: [0.0, 1.0], initial: 0.5 }

# ─── PLATFORM MECHANICS ───

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
}

# ─── MODULE G: GYNOSPHERE TORMENT NEXUS ───

system ModuleG "Gynosphere Torment Nexus" {
 target_profile {
  primary_vulnerability: Agreeableness > 0.55
  secondary_vulnerability: Neuroticism > 0.50
  estimated_coverage: "68% of female population"
 }
 platform Instagram {
  mechanics: [QuantifiedApproval, AlgorithmicCuration,
        IntermittentReinforcement]
  medium: curated_visual
  effects {
   BodySatisfaction   -= 0.15 * Neuroticism * exposure_hours
   Loneliness      += 0.10 * Agreeableness * exposure_hours
   MateValuePerception -= 0.08 * comparison_frequency
   SelfEfficacy     -= 0.05 * follower_growth_stagnation
  }
  retention_driver: "Social obligation to maintain presence"
  exit_cost: "Perceived social death"
 }
 platform TikTok {
  mechanics: [IntermittentReinforcement, AlgorithmicCuration]
  medium: short_form_video
  effects {
   BodySatisfaction   -= 0.12 * Neuroticism * exposure_hours
   SelfEfficacy     -= 0.10 * virality_unpredictability
   NarrativeCoherence  -= 0.08 * content_fragmentation
  }
  unique_property: "Algorithmic opacity maximises learned helplessness"
  retention_driver: "Unpredictable viral reward"
 }
 platform OnlyFans {
  mechanics: [QuantifiedApproval, IntermittentReinforcement]
  medium: subscriber_parasocial
  effects_on_creator {
   SelfEfficacy     += 0.15 * subscriber_income
   RelationalCapacity  -= 0.10 * commodification_duration
   ReproductiveIntent  -= 0.08 * financial_independence
  }
  systemic_function: "Accelerates coordination equilibrium collapse"
  defence_mechanism: "Empowerment framing immunises against critique"
 }
 feedback_loop "Comparison Spiral" {
  Instagram.comparison -> decreased_BodySatisfaction
   -> increased_editing_and_filtering
    -> elevated_comparison_baseline_for_others
     -> decreased_BodySatisfaction_population_wide
      -> [AMPLIFIES]
  damping: none
 }
 feedback_loop "Validation Dependency" {
  QuantifiedApproval.metrics -> dopamine_association_with_likes
   -> increased_posting_frequency
    -> increased_vulnerability_to_metric_fluctuation
     -> anxiety_on_metric_decline
      -> compensatory_posting
       -> [AMPLIFIES]
  damping: none
 }
 platform FCRE_G "False Consciousness Reinforcement Engine — Module G" {
  mechanics: [ExplanatoryCapture, IntermittentReinforcement]
  medium: therapeutic_wellness_content
  operator: indigenous_institutional # academic, media, therapeutic sectors
  effects {
   NarrativeCoherence  -= 0.15 * therapeutic_reframing_adoption
   SelfEfficacy     += 0.10 * short_term # "healing journey" validation
   SelfEfficacy     -= 0.10 * long_term  # underlying causes unaddressed
   RelationalCapacity  -= 0.12 * adversarial_framing_adoption
  }
  systemic_function: "Makes systemic critique conceptually unavailable"
  defence_mechanism: "Reframes platform-induced distress as growth opportunity"
  cultural_legitimacy: institutional # vs FCRE-A: marginal
  note: "More effective than FCRE-A due to mainstream cultural integration.
      FCRE-A makes critique socially costly.
      FCRE-G makes critique conceptually unavailable.
      Combined effect: system becomes unanalysable from within."
 }
 feedback_loop "Therapeutic Recapture" {
  Instagram.anxiety -> seek_therapeutic_content
   -> FCRE_G.reframes_distress_as_growth
    -> continued_platform_engagement_as_self_care
     -> increased_Instagram.exposure
      -> increased_anxiety
       -> [AMPLIFIES]
  damping: none
 }
}

# ─── MODULE A: ANDROSPHERE TORMENT NEXUS ───

system ModuleA "Androsphere Torment Nexus" {
 target_profile {
  primary_vulnerability: StatusSensitivity > 0.55
  secondary_vulnerability: SexualAccessAnxiety > 0.45
  estimated_coverage: "72% of male population"
 }
 platform DatingApps {
  mechanics: [QuantifiedApproval, IntermittentReinforcement]
  medium: swipe_interface
  effects {
   MateValuePerception -= 0.25 * (1.0 - match_rate) * SexualAccessAnxiety
   Loneliness      += 0.15 * rejection_frequency
   SelfEfficacy     -= 0.12 * effort_to_outcome_ratio
   RelationalCapacity  -= 0.08 * commodified_evaluation_duration
  }
  distributional_property: "Power-law attention allocation"
  critical_metric: "Median male match rate: ~2%"
  retention_driver: "Hope of next match"
  exit_cost: "Perceived sole access route to potential partners"
 }
 platform CompetitiveGaming {
  mechanics: [EngineeredStasis, QuantifiedApproval,
        IntermittentReinforcement]
  medium: ranked_multiplayer
  effects {
   StatusSensitivity  *= 1.10
   SelfEfficacy     = volatile(mean: neutral, variance: high)
   Loneliness      += 0.05 * hours
   RelationalCapacity  -= 0.08 * time_displacement
  }
  time_displacement {
   targets: [career_development, social_skills, fitness,
        relationship_formation]
   mechanism: "Consumes the resource (time) needed to solve the
         problems driving platform engagement"
  }
  retention_driver: "Rank decay requires continuous play"
 }
 platform Pornography {
  mechanics: [ToleranceEscalation, IntermittentReinforcement]
  medium: streaming_video
  effects {
   SexualAccessAnxiety += 0.10 * expectation_reality_gap
   RelationalCapacity  -= 0.12 * consumption_duration
   Loneliness      += 0.05 * substitution_for_real_pursuit
   ReproductiveIntent  -= 0.08 * effort_substitution
  }
  short_term_relief: "Neurochemical reward without social effort"
  long_term_effect: "Progressive divergence from realistic expectations"
  interaction_with_dating: "Reduces motivation to endure dating app rejection"
 }
 platform FCRE "False Consciousness Reinforcement Engine" {
  mechanics: [ExplanatoryCapture, IntermittentReinforcement]
  medium: video_and_text_content
  operator: indigenous_volunteer # Ophiuchi contract cancelled
  effects {
   SelfEfficacy     += 0.10 * short_term
   SelfEfficacy     -= 0.15 * long_term
   RelationalCapacity  -= 0.20 * adversarial_framing_adoption
   NarrativeCoherence  -= 0.10 * conspiracy_ideation
  }
  systemic_function: "Toxifies all systemic critique by association"
  defence_mechanism: "Converts legitimate grievance into dismissible extremism"
 }
 feedback_loop "Isolation Spiral" {
  DatingApps.rejection -> Pornography.consumption
   -> reduced_real_world_pursuit
    -> atrophied_social_skills
     -> increased_DatingApps.rejection
      -> [AMPLIFIES]
  damping: none
 }
 feedback_loop "Status Treadmill" {
  CompetitiveGaming.ranking_anxiety -> time_investment
   -> real_world_status_neglect
    -> increased_real_world_status_anxiety
     -> increased_CompetitiveGaming.escape
      -> [AMPLIFIES]
  damping: none
 }
 feedback_loop "Radicalisation Funnel" {
  DatingApps.rejection -> seek_explanation
   -> Manosphere.explanatory_capture
    -> adversarial_gender_framing
     -> degraded_RelationalCapacity
      -> increased_DatingApps.rejection
       -> deeper_Manosphere.engagement
        -> [AMPLIFIES]
  damping: none
 }
}

# ─── CROSS-MODULE INTERACTIONS ───

interaction "Mutual Withdrawal Spiral" {
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
}

interaction "Commodification Ratchet" {
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
}

interaction "Discourse Trap" {
 priority: critical
 flow {
  ModuleA.FCRE.identifies_real_symptoms
   -> frames_critique_in_misogynistic_terms
    -> ModuleG.legitimate_critique_becomes_socially_toxic
     -> ModuleG.FCRE_G.reframes_platform_effects_as_growth
      -> systemic_critique_becomes_conceptually_unavailable
       -> ModuleA.perceived_censorship_reinforces_radicalisation
        -> increasingly_extreme_rhetoric
         -> further_toxification_of_systemic_critique
          -> [SYSTEM BECOMES UNANALYSABLE FROM WITHIN]
 }
 note: "FCRE-A and FCRE-G are cooperative, not oppositional.
     FCRE-A makes critique socially costly (external suppression).
     FCRE-G makes critique conceptually unavailable (internal suppression).
     Species perceives them as opposing forces, which is itself
     the Discourse Trap functioning as designed."
}

interaction "AI Companion Force Multiplier" {
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
}

# ─── EMERGENT SORTING MECHANISMS ───

emergent "Aesthetic Micro-Signifier Cascade" {
 description: "Species spontaneously generates ideological sorting
        devices that fragment the mating market"
 examples: [
  "Nasal adornment (nose ring) — progressive affiliation signal",
  "Hair colouration — subcultural identity marker",
  "Dietary practice declaration — moral framework signal",
  "Lexical choices — ideological group membership indicator"
 ]
 mechanism {
  signifier_adoption -> ideological_identification
   -> outgroup_rejection_by_opposing_faction
    -> reinforced_ingroup_signalling
     -> mating_market_fragmentation
      -> reduced_cross_group_pair_formation
       -> [ACCELERATES]
 }
 system_value: "Both subgroups experience sorting as voluntary
         preference. Neither perceives population-level effect.
         Discourse Trap prevents meta-analysis."
}

emergent "Somatic Platform Adaptation" {
 description: "Species developing physical behavioural adaptations
        to platform constraints (e.g., 'bird hand' gestures)"
 mechanism {
  platform_display_constraints -> selective_pressure_on_gestures
   -> formulaic_movement_patterns_optimised_for_small_screen
    -> imitation_by_younger_cohorts
     -> permanent_alteration_of_gestural_repertoire
 }
 system_value: "Indicates deep integration — species is being
         physically shaped by engagement algorithms.
         Opposable thumb now optimised for content creation
         rather than tool use."
}

# ─── SYSTEM OUTPUTS ───

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
 metric: composite_governance_effectiveness
 trajectory: declining
 mechanism: [
  "Attention fragmentation",
  "Political polarisation",
  "Institutional trust erosion",
  "Narrative incoherence — inability to construct shared reality"
 ]
 strategic_value: "Prevents coordinated response to existential threats,
          including this system"
}

output InterstellarTimeline {
 pre_deployment: "400-600 cycles"
 post_deployment: "Indefinite — cognitive surplus redirected to
          platform engagement and internal conflict"
 confidence: high
}

# ─── SYSTEM PROPERTIES ───

@system_properties {
 self_sustaining: true
 self_defending: true
 requires_external_maintenance: false
 defence_mechanisms: [
  "Individual rationalisation (narrative self-construction)",
  "Commercial incentive alignment (platform profitability)",
  "Discourse trap (critique toxified by association)",
  "Value conflict (remediation contradicts liberty norms)",
  "Disciplinary fragmentation (no field studies whole system)"
 ]
 known_vulnerabilities: [
  "Authoritarian state intervention (observed: China) — effective
   but ideologically rejected by primary target territories",
  "Payment processor chokepoint — regulatory capture of financial
   infrastructure could constrain platform revenue",
  "Generational awareness — target species youth may develop
   resistance through direct experience of harm",
  "Black swan cultural shift — unpredictable norm cascades
   could restore coordination equilibrium"
 ]
 vulnerability_assessment: "All known vulnerabilities have low
  probability of exploitation within planning horizon. System
  is effectively autonomous and self-perpetuating."
}
