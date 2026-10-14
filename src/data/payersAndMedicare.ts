export interface MedicareComparisonRow {
  dimension: string;
  originalMedicare: string;
  medicareAdvantage: string;
  medigapSupplement: string;
}

export const MEDICARE_3WAY_COMPARISON: MedicareComparisonRow[] = [
  {
    dimension: 'Administrator',
    originalMedicare: 'Federal Government (CMS) through regional MACs (e.g. Novitas, Noridian).',
    medicareAdvantage: 'Private commercial health plans (e.g. Humana, UnitedHealthcare, Aetna, Kaiser).',
    medigapSupplement: 'Private insurance companies (standardized plans A–N, e.g. Plan G, Plan F).'
  },
  {
    dimension: 'Core Coverage',
    originalMedicare: 'Part A (Inpatient) + Part B (Outpatient). No prescription drug or routine vision.',
    medicareAdvantage: 'Combines Part A + Part B + usually Part D into an all-in-one HMO/PPO package.',
    medigapSupplement: 'Fills the "gaps" of Original Medicare (covers Part A & B deductibles and 20% coinsurance).'
  },
  {
    dimension: 'Doctor & Hospital Choice',
    originalMedicare: 'Any doctor or hospital nationwide that accepts Medicare (~95% of physicians).',
    medicareAdvantage: 'Restricted network (HMO or PPO). Out-of-network care may not be covered or costs much more.',
    medigapSupplement: 'Any doctor or hospital nationwide that accepts Medicare (follows Original Medicare rules).'
  },
  {
    dimension: 'Specialist Referrals',
    originalMedicare: 'No referrals required to see any specialist nationwide.',
    medicareAdvantage: 'Frequently requires PCP gatekeeper and prior referral (especially HMO plans).',
    medigapSupplement: 'No referrals required.'
  },
  {
    dimension: 'Prescription Drug Coverage',
    originalMedicare: 'Requires enrolling in a standalone Medicare Part D plan.',
    medicareAdvantage: 'Usually integrated directly into the plan (MAPD).',
    medigapSupplement: 'Does not include drugs; beneficiary must purchase a separate standalone Part D plan.'
  },
  {
    dimension: 'Extra Benefits (Dental/Vision)',
    originalMedicare: 'None. Does not cover routine eye exams, eyeglasses, dental cleanings, or hearing aids.',
    medicareAdvantage: 'Commonly includes dental allowances, vision hardware, gym memberships, and OTC perks.',
    medigapSupplement: 'None. Only pays medical cost-sharing gaps under Original Medicare.'
  },
  {
    dimension: 'Out-of-Pocket Maximum',
    originalMedicare: 'NO annual limit! 20% coinsurance has no maximum financial cap.',
    medicareAdvantage: 'Mandatory annual OOP Max (federally capped, e.g., $4,000–$8,850/year in-network).',
    medigapSupplement: 'High protection; Medigap pays nearly 100% of the 20% coinsurance.'
  },
  {
    dimension: 'Monthly Premium',
    originalMedicare: 'Part B base premium (~$174.70–$185/mo) + Part A ($0 for most who paid payroll taxes).',
    medicareAdvantage: 'Often $0 or very low additional premium (beneficiary still pays Part B premium).',
    medigapSupplement: 'Higher additional monthly premium ($120–$300/mo) depending on age and plan type.'
  },
  {
    dimension: 'Flexibility & Travel',
    originalMedicare: 'Full freedom to travel anywhere in the US and see providers without network boundaries.',
    medicareAdvantage: 'Limited to regional service area except for emergency care while traveling.',
    medigapSupplement: 'Full nationwide freedom + some plans (e.g. Plan G) cover foreign travel emergency care (80%).'
  },
  {
    dimension: 'Claim Handling & AR',
    originalMedicare: 'Claims sent to regional MAC (EDI 837P/I). Automatic crossover to secondary/Medigap via COBA.',
    medicareAdvantage: 'Claims billed directly to the commercial payer with their specific Payer ID, strict prior auths.',
    medigapSupplement: 'Claims automatically cross over electronically from Medicare; direct billing rarely needed.'
  }
];

export interface MspCode {
  code: string;
  name: string;
  description: string;
  coordinationRules: string;
}

export const MSP_CODES: MspCode[] = [
  {
    code: '12',
    name: 'Working Aged (EGHP Primary)',
    description: 'Patient is 65+, currently employed (or covered under employed spouse), with Employer Group Health Plan (EGHP).',
    coordinationRules: 'Employer has 20 or more employees -> EGHP is PRIMARY, Medicare is SECONDARY. If employer has under 20 employees -> Medicare is Primary.'
  },
  {
    code: '13',
    name: 'End-Stage Renal Disease (ESRD)',
    description: 'Patient entitled to Medicare due to permanent kidney failure undergoing dialysis or renal transplant.',
    coordinationRules: '30-month coordination period: Commercial EGHP is PRIMARY for the first 30 months; Medicare becomes PRIMARY on month 31 regardless of employer size!'
  },
  {
    code: '14',
    name: 'No-Fault / Motor Vehicle Insurance',
    description: 'Medical treatment resulting from an automobile accident or premises liability injury.',
    coordinationRules: 'Auto insurance / No-Fault PIP is PRIMARY. Medicare cannot pay until PIP limits are completely exhausted or claim is denied with formal denial letter.'
  },
  {
    code: '15',
    name: 'Workers’ Compensation (WC)',
    description: 'Treatment for injury or illness incurred while on the job or occupational disease.',
    coordinationRules: 'Workers’ Compensation carrier is PRIMARY. Medicare will deny all related claims unless a formal WC final compromise & release (settlement) is established.'
  }
];

export interface ManagedCareType {
  acronym: string;
  name: string;
  inNetworkOnly: boolean;
  pcpRequired: boolean;
  referralsRequired: boolean;
  outOfNetworkCoverage: string;
  keySummary: string;
}

export const MANAGED_CARE_TYPES: ManagedCareType[] = [
  {
    acronym: 'HMO',
    name: 'Health Maintenance Organization',
    inNetworkOnly: true,
    pcpRequired: true,
    referralsRequired: true,
    outOfNetworkCoverage: 'Emergency only. Non-emergency out-of-network claims are denied 100% (CARC CO-96 or PR-204).',
    keySummary: 'Lowest premiums, strict gatekeeper model. Primary Care Physician (PCP) coordinates all care; seeing a specialist without a written referral triggers claim denial.'
  },
  {
    acronym: 'PPO',
    name: 'Preferred Provider Organization',
    inNetworkOnly: false,
    pcpRequired: false,
    referralsRequired: false,
    outOfNetworkCoverage: 'Covered, but subject to higher deductible, higher coinsurance (e.g. 50% vs 20%), and balance billing.',
    keySummary: 'Maximum patient choice. No PCP required, no referrals required. Patients can visit any specialist or hospital nationwide, but pay less for in-network providers.'
  },
  {
    acronym: 'EPO',
    name: 'Exclusive Provider Organization',
    inNetworkOnly: true,
    pcpRequired: false,
    referralsRequired: false,
    outOfNetworkCoverage: 'No out-of-network benefits except for true medical emergencies.',
    keySummary: 'Hybrid blend: Requires in-network care like an HMO, but allows direct access to specialists without requiring PCP referrals like a PPO.'
  },
  {
    acronym: 'POS',
    name: 'Point of Service Plan',
    inNetworkOnly: false,
    pcpRequired: true,
    referralsRequired: true,
    outOfNetworkCoverage: 'Covered when referred by PCP, but patient pays significantly higher out-of-pocket costs.',
    keySummary: 'Two-tier system: In-network services act like an HMO (PCP gatekeeper, referrals); going out-of-network acts like a PPO with high cost-sharing.'
  }
];

export interface PolicyRule {
  title: string;
  category: string;
  description: string;
  operationalImpact: string;
  arChecklist: string[];
}

export const POLICY_RULES: PolicyRule[] = [
  {
    title: 'The Birthday Rule (Coordination of Benefits)',
    category: 'COB',
    description: 'When a dependent child is enrolled under two working parents’ separate health plans, primary payer status is determined by whichever parent has their birthday earlier in the calendar year (month and day, NOT birth year!).',
    operationalImpact: 'If Parent A was born on March 14, 1980 and Parent B was born on January 22, 1982: Parent B’s policy is PRIMARY because January comes before March. If both parents have the exact same birthday (e.g. both Aug 15), the plan that has been active the longest is Primary.',
    arChecklist: [
      'Obtain Parent A & Parent B full DOB and policy effective dates.',
      'Check divorce decrees: If court decree specifies financial responsibility, court decree supersedes Birthday Rule.',
      'If parents are divorced without court decree: Custodial parent plan is primary -> Custodial spouse (stepparent) plan -> Non-custodial parent plan.'
    ]
  },
  {
    title: 'COBRA (Consolidated Omnibus Budget Reconciliation Act)',
    category: 'Coverage',
    description: 'Federal law giving workers and their families the legal right to continue group health benefits provided by their group health plan for limited periods of time after job loss or reduction of hours.',
    operationalImpact: 'Standard period: 18 months. Extended up to 29 months if the beneficiary becomes disabled, or up to 36 months for divorce, death of employee, or child aging out. Beneficiary pays 102% of the full premium (100% premium + 2% administrative fee).',
    arChecklist: [
      'Patient has 60 days from qualifying event to elect COBRA.',
      'Coverage is 100% retroactive to date of termination upon first premium payment.',
      'Claims incurred during election gap are initially denied for "Coverage Terminated", but can be reprocessed once retroactive enrollment clears.'
    ]
  },
  {
    title: 'ABN (Advance Beneficiary Notice) vs. WOL (Waiver of Liability)',
    category: 'Notices',
    description: 'Written notification given to a patient BEFORE receiving a service explaining that Medicare or a commercial payer is expected to deny payment, informing the patient of financial liability.',
    operationalImpact: 'ABN (CMS-R-131) applies to Fee-For-Service Medicare. Must append Modifier GA (ABN signed on file). If Medicare denies as not medically necessary, CARC shifts to PR (Patient Responsibility). If clinic failed to deliver ABN, Modifier GZ must be appended, and the charge is written off (CO denial) — patient cannot be billed!',
    arChecklist: [
      'Must be delivered in advance; cannot be signed retroactively.',
      'Must detail specific reason for anticipated denial and precise estimated cost.',
      'WOL is used for commercial/HMO plans when a non-covered elective service is scheduled.'
    ]
  },
  {
    title: '72-Hour Rule (CMS 3-Day Payment Window)',
    category: 'Hospital Billing',
    description: 'Requires hospital-owned outpatient clinics and facilities to bundle all diagnostic and related non-diagnostic outpatient services furnished within 3 calendar days (72 hours) prior to an inpatient hospital admission into the inpatient UB-04 claim.',
    operationalImpact: 'Prevents "double dipping". Diagnostic tests (lab, ECG, chest X-ray) performed at a hospital clinic on Tuesday for a patient admitted on Thursday cannot be billed separately on a CMS-1500; they must be merged into the Part A DRG payment.',
    arChecklist: [
      'Applies to IPPS (Inpatient Prospective Payment System) hospitals.',
      'Check date of outpatient services against hospital admission date.',
      'Separate physician professional work (CMS-1500 Part B) is exempt from the 72-hour bundling window; only facility technical charges are bundled.'
    ]
  },
  {
    title: 'Pre-Authorization vs. Retro-Authorization',
    category: 'Utilization Management',
    description: 'Pre-Authorization (Prior Auth / Pre-Cert) is approval obtained from the payer before non-emergency services are rendered. Retro-Authorization is emergency or missed authorization requested after the fact.',
    operationalImpact: 'Most commercial payers allow a 72-hour Turnaround Time (TAT) from admission or DOS for emergency retro-auth submissions. If retro-auth is submitted beyond 72 hours, claim denies irrevocably under CARC CO-197 with zero appeal rights.',
    arChecklist: [
      'Verify if procedure requires pre-auth (imaging, surgery, specialty drugs).',
      'For emergency admissions, notify payer Utilization Review within 24–48 hours.',
      'Always document authorization number, approved CPT range, approved dates, and number of authorized visits.'
    ]
  }
];
