import { ModuleId } from '../types/rcm';

export interface SearchEntry {
  id: string;
  title: string;
  subtitle: string;
  category: 'CARC Code' | 'Modifier' | 'Claim Form' | 'Terminology' | 'AR Scenario' | 'Medicare & Payer' | 'Interactive Tool';
  moduleId: ModuleId;
  targetId?: string;
  keywords: string[];
}

export const SEARCH_INDEX: SearchEntry[] = [
  // CARCs
  {
    id: 'search-co-16',
    title: 'CO-16: Missing Information / Billing Error',
    subtitle: 'Lacks information or has submission/billing error. Linked to RARCs M51, N29, N382, MA120.',
    category: 'CARC Code',
    moduleId: 'ar-playbook',
    targetId: 'carc-co-16',
    keywords: ['co-16', 'co16', 'missing info', 'billing error', 'rarc', 'm51', 'n382', 'ndc', 'clia']
  },
  {
    id: 'search-co-18',
    title: 'CO-18: Duplicate Claim / Service',
    subtitle: 'Exact duplicate claim or repeat service billed without modifier 76/77/59/91.',
    category: 'CARC Code',
    moduleId: 'ar-playbook',
    targetId: 'carc-co-18',
    keywords: ['co-18', 'co18', 'duplicate', 'already paid', 'm86', 'repeat', 'modifier 76']
  },
  {
    id: 'search-co-22',
    title: 'CO-22: Coordination of Benefits (COB) Required',
    subtitle: 'Care may be covered by another payer per coordination of benefits. Member questionnaire required.',
    category: 'CARC Code',
    moduleId: 'ar-playbook',
    targetId: 'carc-co-22',
    keywords: ['co-22', 'co22', 'cob', 'primary payer', 'questionnaire', 'birthday rule', 'secondary']
  },
  {
    id: 'search-co-29',
    title: 'CO-29: Timely Filing Limit Expired',
    subtitle: 'Time limit for filing has expired. Requires Proof of Timely Filing (POTF / 277CA).',
    category: 'CARC Code',
    moduleId: 'ar-playbook',
    targetId: 'carc-co-29',
    keywords: ['co-29', 'co29', 'timely filing', 'tfl', 'potf', 'untimely', 'appeal']
  },
  {
    id: 'search-co-45',
    title: 'CO-45: Contractual Adjustment (Exceeds Fee Schedule)',
    subtitle: 'Billed amount minus allowed amount write-off. Mandatory contractual write-off; no balance billing.',
    category: 'CARC Code',
    moduleId: 'foundations',
    targetId: 'contractual-adjustment-co45',
    keywords: ['co-45', 'co45', 'contractual adjustment', 'write off', 'allowed amount', 'balance billing', 'fee schedule']
  },
  {
    id: 'search-co-50',
    title: 'CO-50: Medical Necessity Denial',
    subtitle: 'Service not deemed medically necessary according to LCD/NCD coverage policies.',
    category: 'CARC Code',
    moduleId: 'ar-playbook',
    targetId: 'carc-co-50',
    keywords: ['co-50', 'co50', 'medical necessity', 'lcd', 'ncd', 'diagnosis', 'peer to peer']
  },
  {
    id: 'search-co-96',
    title: 'CO-96: Non-Covered Charges',
    subtitle: 'Service not covered under the patient plan or provider specialty. Check for ABN/WOL.',
    category: 'CARC Code',
    moduleId: 'ar-playbook',
    targetId: 'carc-co-96',
    keywords: ['co-96', 'co96', 'non covered', 'excluded', 'abn', 'wol', 'cosmetic']
  },
  {
    id: 'search-co-97',
    title: 'CO-97: Bundled / Inclusive Procedure',
    subtitle: 'Service included in payment for another procedure. Check NCCI PTP edits and modifier overrides.',
    category: 'CARC Code',
    moduleId: 'ar-playbook',
    targetId: 'carc-co-97',
    keywords: ['co-97', 'co97', 'bundled', 'inclusive', 'ncci', 'mutually exclusive', 'modifier 59', 'unbundling']
  },
  {
    id: 'search-co-119',
    title: 'CO-119: Benefit Maximum Reached',
    subtitle: 'Annual visit limit or dollar cap exceeded. Bill secondary or shift to patient responsibility.',
    category: 'CARC Code',
    moduleId: 'ar-playbook',
    targetId: 'carc-co-119',
    keywords: ['co-119', 'co119', 'benefit maximum', 'visit limit', 'therapy cap', 'exhausted']
  },
  {
    id: 'search-co-197',
    title: 'CO-197: Missing or Exceeded Prior Authorization',
    subtitle: 'Prior auth was absent, expired, or visit limits exceeded. Request retro-auth within 72 hrs.',
    category: 'CARC Code',
    moduleId: 'ar-playbook',
    targetId: 'carc-co-197',
    keywords: ['co-197', 'co197', 'prior auth', 'pre-cert', 'authorization', 'retro-auth', 'precertification']
  },

  // Modifiers
  {
    id: 'search-mod-25',
    title: 'Modifier 25: Significant, Separately Identifiable E&M',
    category: 'Modifier',
    moduleId: 'coding-modifiers',
    targetId: 'mod-25',
    subtitle: 'Appended to E&M code (99213-25) performed on same day as minor surgery or preventive visit.',
    keywords: ['modifier 25', 'mod 25', 'e&m', '99213', 'preventive', 'same day', 'separate problem']
  },
  {
    id: 'search-mod-59',
    title: 'Modifier 59: Distinct Procedural Service',
    category: 'Modifier',
    moduleId: 'coding-modifiers',
    targetId: 'mod-59',
    subtitle: 'Identifies distinct surgical session, anatomical site, or organ system to override bundling.',
    keywords: ['modifier 59', 'mod 59', 'distinct service', 'unbundling', 'separate site', 'ncci']
  },
  {
    id: 'search-mod-76',
    title: 'Modifier 76: Repeat Procedure by Same Physician',
    category: 'Modifier',
    moduleId: 'coding-modifiers',
    targetId: 'mod-76',
    subtitle: 'Repeat clinical procedure on same calendar day by same doctor (avoids CO-18 duplicate).',
    keywords: ['modifier 76', 'mod 76', 'repeat procedure', 'same doctor', 'same day', 'duplicate']
  },
  {
    id: 'search-mod-77',
    title: 'Modifier 77: Repeat Procedure by Another Physician',
    category: 'Modifier',
    moduleId: 'coding-modifiers',
    targetId: 'mod-77',
    subtitle: 'Repeat procedure on same calendar day by a DIFFERENT doctor (e.g. failed resident intubation).',
    keywords: ['modifier 77', 'mod 77', 'repeat procedure', 'different doctor', 'another physician']
  },
  {
    id: 'search-mod-91',
    title: 'Modifier 91: Repeat Clinical Diagnostic Lab Test',
    category: 'Modifier',
    moduleId: 'coding-modifiers',
    targetId: 'mod-91',
    subtitle: 'Serial blood tests (e.g. ICU troponin/BMP) or redraw due to hemolyzed specimen.',
    keywords: ['modifier 91', 'mod 91', 'repeat lab', 'hemolyzed', 'serial lab', '80053', 'cmp']
  },
  {
    id: 'search-mod-rt-lt',
    title: 'Modifiers RT & LT: Right and Left Anatomical Sides',
    category: 'Modifier',
    moduleId: 'coding-modifiers',
    targetId: 'mod-lt-rt',
    subtitle: 'Identifies laterality on paired limbs, eyes, or organs (e.g., bilateral knee X-rays).',
    keywords: ['modifier rt', 'modifier lt', 'laterality', 'right', 'left', 'paired organs', 'bilateral']
  },
  {
    id: 'search-mod-ou-50',
    title: 'Modifier 50 vs. HCPCS OU: Bilateral Procedures',
    category: 'Modifier',
    moduleId: 'coding-modifiers',
    targetId: 'mod-ou-50',
    subtitle: 'CPT 50 triggers 150% fee schedule; HCPCS OU indicates Both Eyes in ophthalmology.',
    keywords: ['modifier 50', 'modifier ou', 'bilateral', 'both eyes', '150%', 'knee replacement']
  },
  {
    id: 'search-mod-ncci-x',
    title: 'NCCI Subset Modifiers (XE, XS, XP, XU)',
    category: 'Modifier',
    moduleId: 'coding-modifiers',
    targetId: 'mod-ncci',
    subtitle: 'CMS modifiers replacing general Mod 59: Separate Encounter (XE), Separate Structure (XS), etc.',
    keywords: ['xe', 'xs', 'xp', 'xu', 'ncci', 'subset modifiers', 'unbundling', 'ptp edits']
  },
  {
    id: 'search-mod-hospice',
    title: 'Hospice (GV/GW) & Component (TC/26) Modifiers',
    category: 'Modifier',
    moduleId: 'coding-modifiers',
    targetId: 'mod-hospice',
    subtitle: 'Modifier GW allows payment for services unrelated to terminal illness for hospice patients.',
    keywords: ['modifier gw', 'modifier gv', 'hospice', 'terminal illness', 'modifier 26', 'modifier tc', 'technical component']
  },

  // Claim Forms
  {
    id: 'search-box-12',
    title: 'CMS-1500 Box 12: Release of Information (ROI)',
    subtitle: 'Patient signature authorizing medical record disclosure under HIPAA.',
    category: 'Claim Form',
    moduleId: 'claim-forms',
    targetId: 'box-12',
    keywords: ['box 12', 'roi', 'release of information', 'signature on file', 'sof', 'hipaa']
  },
  {
    id: 'search-box-13',
    title: 'CMS-1500 Box 13: Assignment of Benefits (AOB)',
    subtitle: 'Patient signature authorizing direct insurance reimbursement to provider.',
    category: 'Claim Form',
    moduleId: 'claim-forms',
    targetId: 'box-13',
    keywords: ['box 13', 'aob', 'assignment of benefits', 'direct payment', 'sof']
  },
  {
    id: 'search-box-21',
    title: 'CMS-1500 Box 21: Diagnosis Codes (ICD-10-CM)',
    subtitle: 'Up to 12 ICD-10 diagnosis codes linked to CPT lines via pointers A–L.',
    category: 'Claim Form',
    moduleId: 'claim-forms',
    targetId: 'box-21',
    keywords: ['box 21', 'icd-10', 'diagnosis', 'medical necessity', 'pointers']
  },
  {
    id: 'search-box-22',
    title: 'CMS-1500 Box 22: Resubmission Code & Original Ref #',
    subtitle: 'Used for corrected claims: Code 7 (Replacement) & Original ICN number.',
    category: 'Claim Form',
    moduleId: 'claim-forms',
    targetId: 'box-22',
    keywords: ['box 22', 'corrected claim', 'resubmission', 'icn', 'dcn', 'code 7', 'code 8']
  },
  {
    id: 'search-box-23',
    title: 'CMS-1500 Box 23: Prior Auth / Referral / CLIA Number',
    subtitle: 'Multi-purpose box for Pre-Auth number or 10-digit CLIA lab certification number.',
    category: 'Claim Form',
    moduleId: 'claim-forms',
    targetId: 'box-23',
    keywords: ['box 23', 'prior auth', 'clia', 'referral', 'lab certification']
  },
  {
    id: 'search-ub04',
    title: 'UB-04 (CMS-1450): Institutional Hospital Billing',
    subtitle: '81 form locators used by hospitals for inpatient/outpatient stays (EDI 837I).',
    category: 'Claim Form',
    moduleId: 'claim-forms',
    targetId: 'ub04-explorer',
    keywords: ['ub-04', 'ub04', 'cms-1450', 'facility billing', 'revenue codes', 'drg', '837i']
  },

  // Terminology & Foundations
  {
    id: 'search-deductible',
    title: 'Deductible (PR-1)',
    subtitle: 'Annual amount paid out-of-pocket before insurance begins reimbursing.',
    category: 'Terminology',
    moduleId: 'foundations',
    targetId: 'pr-1-deductible',
    keywords: ['deductible', 'pr-1', 'pr1', 'cost sharing', 'medicare part b']
  },
  {
    id: 'search-coinsurance',
    title: 'Co-insurance (PR-2)',
    subtitle: 'Percentage cost-sharing (e.g. 80/20) between subscriber and payer.',
    category: 'Terminology',
    moduleId: 'foundations',
    targetId: 'pr-2-coinsurance',
    keywords: ['coinsurance', 'pr-2', 'pr2', '80/20', 'cost sharing']
  },
  {
    id: 'search-copay',
    title: 'Co-payment (Copay - PR-3)',
    subtitle: 'Fixed predetermined fee paid at check-in (e.g. $20 primary care, $50 specialist).',
    category: 'Terminology',
    moduleId: 'foundations',
    targetId: 'pr-3-copay',
    keywords: ['copay', 'copayment', 'pr-3', 'pr3', 'fixed fee', 'front desk']
  },
  {
    id: 'search-npi',
    title: 'National Provider Identifier (NPI)',
    subtitle: '10-digit CMS identifier. Type 1 (Individual Physician) vs Type 2 (Organization).',
    category: 'Terminology',
    moduleId: 'foundations',
    targetId: 'npi-provider-identifier',
    keywords: ['npi', 'type 1', 'type 2', 'nppes', 'rendering', 'billing provider']
  },
  {
    id: 'search-tin',
    title: 'Taxpayer Identification Number (TIN / EIN)',
    subtitle: '9-digit IRS tax ID reported in CMS-1500 Box 25 for provider billing.',
    category: 'Terminology',
    moduleId: 'foundations',
    targetId: 'tin-tax-id',
    keywords: ['tin', 'ein', 'tax id', 'irs', 'w-9', 'box 25']
  },
  {
    id: 'search-clia',
    title: 'CLIA Laboratory Quality Number',
    subtitle: '10-digit ID certifying lab testing standards entered in Box 23 with Modifier QW.',
    category: 'Terminology',
    moduleId: 'foundations',
    targetId: 'clia-number',
    keywords: ['clia', 'laboratory', 'in-house lab', 'rapid strep', 'covid test', 'qw']
  },
  {
    id: 'search-ipa',
    title: 'Independent Physician Association (IPA)',
    subtitle: 'Consortium of private doctors bargaining together to manage HMO capitated care.',
    category: 'Terminology',
    moduleId: 'foundations',
    targetId: 'ipa-network',
    keywords: ['ipa', 'independent physician association', 'hmo', 'capitation', 'delegated']
  },

  // Medicare & Payers
  {
    id: 'search-medicare-parts',
    title: 'Medicare Parts A, B, C, and D',
    subtitle: 'Part A (Inpatient/Hospice), Part B (Outpatient/MD), Part C (Advantage), Part D (Rx).',
    category: 'Medicare & Payer',
    moduleId: 'insurance-payers',
    targetId: 'medicare-deep-dive',
    keywords: ['medicare', 'part a', 'part b', 'part c', 'part d', 'medicare advantage', 'medigap']
  },
  {
    id: 'search-msp-codes',
    title: 'Medicare Secondary Payer (MSP) Codes 12, 13, 14, 15',
    subtitle: 'Code 12 Working Aged, Code 13 ESRD, Code 14 Auto No-Fault, Code 15 Workers Comp.',
    category: 'Medicare & Payer',
    moduleId: 'insurance-payers',
    targetId: 'msp-codes',
    keywords: ['msp', 'medicare secondary', 'code 12', 'code 13', 'esrd', 'workers comp', 'no-fault']
  },
  {
    id: 'search-birthday-rule',
    title: 'The Birthday Rule (Coordination of Benefits)',
    subtitle: 'Parent whose birthday falls earlier in the calendar year is Primary for dependent children.',
    category: 'Medicare & Payer',
    moduleId: 'insurance-payers',
    targetId: 'birthday-rule',
    keywords: ['birthday rule', 'cob', 'coordination of benefits', 'primary payer', 'dependent child']
  },
  {
    id: 'search-managed-care',
    title: 'Managed Care Comparison: HMO, PPO, EPO, POS',
    subtitle: 'Compare network flexibility, PCP gatekeeper rules, and specialist referral mandates.',
    category: 'Medicare & Payer',
    moduleId: 'insurance-payers',
    targetId: 'managed-care',
    keywords: ['hmo', 'ppo', 'epo', 'pos', 'gatekeeper', 'referrals', 'in-network']
  },

  // AR Scenarios
  {
    id: 'search-scen-cnof',
    title: 'AR Scenario 1: Claim Not on File (CNOF)',
    subtitle: 'Resolution workflow, clearinghouse 277CA check, Payer ID verification.',
    category: 'AR Scenario',
    moduleId: 'ar-playbook',
    targetId: 'scen-cnof',
    keywords: ['cnof', 'claim not on file', 'clearinghouse', 'payer id', 'resubmit']
  },
  {
    id: 'search-scen-untimely',
    title: 'AR Scenario 6: Untimely Filing Denial (CO-29)',
    subtitle: 'Proof of Timely Filing (POTF) appeal strategy, 277CA receipts, contractual write-off.',
    category: 'AR Scenario',
    moduleId: 'ar-playbook',
    targetId: 'scen-untimely-filing-co29',
    keywords: ['untimely filing', 'co-29', 'potf', 'appeals', 'tfl']
  },
  {
    id: 'search-scen-prior-auth',
    title: 'AR Scenario 9: Missing Prior Authorization (CO-197)',
    subtitle: 'Retro-authorization within 72 hours, hospital auth linking, emergency exceptions.',
    category: 'AR Scenario',
    moduleId: 'ar-playbook',
    targetId: 'scen-invalid-pre-auth-co197',
    keywords: ['prior auth', 'co-197', 'retro-auth', 'emergency admission', 'precert']
  },

  // Interactive Tools
  {
    id: 'search-tool-nato',
    title: 'NATO Phonetic Alphabet & Policy ID Converter',
    subtitle: 'A–Z table and live Member ID / NPI phonetic speech converter tool.',
    category: 'Interactive Tool',
    moduleId: 'call-scripts',
    targetId: 'nato-tool',
    keywords: ['nato', 'phonetic', 'spelling', 'audio', 'whiskey', 'member id audio']
  },
  {
    id: 'search-tool-birthday',
    title: 'Interactive Birthday Rule Calculator Widget',
    subtitle: 'Input Parent A and Parent B birthdays to calculate primary insurance for children.',
    category: 'Interactive Tool',
    moduleId: 'insurance-payers',
    targetId: 'birthday-calculator',
    keywords: ['birthday calculator', 'birthday rule widget', 'cob calculator']
  },
  {
    id: 'search-tool-note-builder',
    title: 'Interactive AR Note Builder Sandbox',
    subtitle: 'Draft professional, audit-ready AR call notes with 6 mandatory fields.',
    category: 'Interactive Tool',
    moduleId: 'ar-analytics',
    targetId: 'note-builder',
    keywords: ['note builder', 'ar note', 'documentation', 'audit trail', 'call notes']
  },
  {
    id: 'search-tool-quiz',
    title: 'Gamified Certification Quiz & Exam Engine',
    subtitle: '40+ MCQs in Practice Mode and Timed Certification Exam Mode with certificate.',
    category: 'Interactive Tool',
    moduleId: 'quiz-engine',
    targetId: 'quiz-engine-top',
    keywords: ['quiz', 'exam', 'test', 'mcq', 'certification', 'score', 'certificate']
  },
  {
    id: 'search-mind-map',
    title: 'Dynamic RCM Mind Map & Lifecycle Architecture',
    subtitle: 'Interactive hierarchical graph of all 4 macro phases and 10 pipeline gates with real-time EDI & KPI inspectors.',
    category: 'Interactive Tool',
    moduleId: 'mind-map',
    keywords: ['mind map', 'mindmap', 'diagram', 'lifecycle', 'workflow', 'ecosystem', 'architecture', 'phases', 'edi']
  },
  {
    id: 'search-gpd-script',
    title: 'GPD Eligibility & Benefits Verification Script (Smriti)',
    subtitle: 'Full recorded phone verification dialogue, cost-sharing check, and callback 251-260-8237.',
    category: 'Interactive Tool',
    moduleId: 'eligibility',
    keywords: ['gpd', 'smriti', 'eligibility script', 'benefits verification', 'call script', '251-260-8237', 'recorded line']
  },
  {
    id: 'search-inpatient-er-auth',
    title: 'Inpatient Authorization via ER (Haywood Regional - SAM_P)',
    subtitle: 'Emergency inpatient pre-certification, MCG/InterQual criteria, and 24-48 hr hospital admission notification.',
    category: 'Interactive Tool',
    moduleId: 'eligibility',
    keywords: ['haywood regional', 'sam_p', 'inpatient auth', 'er auth', 'emergency admission', 'interqual', 'mcg', 'auth script']
  },
  {
    id: 'search-modifiers-masterclass',
    title: 'Professional Modifiers Masterclass (25, 59, 50, 76, 77, 91)',
    subtitle: 'Exhaustive clinical case vignettes, billing codes, and dollar impact matrix for the 10 core AR denial modifiers.',
    category: 'Modifier',
    moduleId: 'coding',
    keywords: ['modifiers masterclass', 'modifier 25', 'modifier 59', 'modifier 50', 'modifier 76', 'modifier 77', 'modifier 91', 'xs', 'e1-e4']
  }
];
