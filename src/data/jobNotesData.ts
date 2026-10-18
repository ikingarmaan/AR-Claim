export interface JobInterviewQuestion {
  id: string;
  number: number;
  question: string;
  answer: string;
  category: 'eligibility-cob' | 'coding-modifiers' | 'claim-forms' | 'ar-denials' | 'payers-compliance';
  keyTakeaway: string;
  notesFromDoc?: string;
  examples?: string;
}

export interface PlanTypeComparison {
  planType: string;
  fullName: string;
  pcpRequired: string;
  referralRequired: string;
  inNetworkBenefits: string;
  outOfNetworkBenefits: string;
  premiumLevel: string;
}

export interface PayerTimelyFilingRule {
  payer: string;
  limitDays: number;
  fromEvent: string;
  appealLimitDays: number;
  acceptableProof: string;
}

export interface PosDirectoryItem {
  code: string;
  name: string;
  description: string;
  claimForm: 'CMS-1500 Box 24B' | 'UB-04 (Revenue code equivalent)';
  commonSpecialties: string;
}

export interface ClinicalModifierCase {
  id: string;
  title: string;
  modifier: string;
  scenario: string;
  billingCodes: string;
  whyUsed: string;
  denialPrevention: string;
  reimbursementImpact: string;
  whenNotToUse: string;
}

export interface ArCallScenario {
  id: string;
  number: number;
  title: string;
  category: 'intake-status' | 'eligibility' | 'denials' | 'billing-rules';
  categoryLabel: string;
  definition: string;
  stepsToFollow: string[];
  repQuestions: string[];
  goldenRuleOrTip?: string;
  actionResolution: string;
  simulatedData: {
    status: string;
    actionTaken: string;
    nextFollowUpDays: number;
  };
}

export * from './carcRarcData';
export * from './modifiersMasteryData';

// ==============================================================
// 1. ALL 44+ OFFICIAL INTERVIEW QUESTIONS FROM USER'S NOTES
// ==============================================================
export const JOB_INTERVIEW_QUESTIONS: JobInterviewQuestion[] = [
  {
    id: 'capitation',
    number: 1,
    question: 'What is meant by Capitation?',
    answer: 'Capitation is a fixed amount of money given by an insurance company per patient to the healthcare provider for providing healthcare services, regardless of how many services or appointments the patient actually uses (Per Member Per Month / PMPM).',
    category: 'payers-compliance',
    keyTakeaway: 'Fixed prospective monthly payment per enrolled patient; shifts financial risk to the provider.',
    notesFromDoc: 'RCM Note: Often utilized in HMO plans where the primary care physician receives a set dollar amount each month.'
  },
  {
    id: 'cob',
    number: 2,
    question: 'What is meant by COB (Coordination of Benefits)?',
    answer: 'COB (Coordination of Benefits) is the process and set of rules used to determine which health insurance plan is primary, secondary, and tertiary when a patient is covered by more than one insurance policy, preventing duplicate payments.',
    category: 'eligibility-cob',
    keyTakeaway: 'Prevents overpayment and determines the legal order of billing (Primary pays up to limits, Secondary picks up leftover balance).',
    notesFromDoc: 'Key Rules: Birthday Rule for dependent children, active employment vs retiree, Medicare vs Commercial employer plan size.'
  },
  {
    id: 'aob',
    number: 3,
    question: 'What is meant by AOB (Assignment of Benefits)?',
    answer: 'AOB (Assignment of Benefits) is a legally signed document by the patient that authorizes the insurance company to pay the healthcare provider directly for medical services rendered, rather than sending the reimbursement check to the patient.',
    category: 'claim-forms',
    keyTakeaway: 'Reflected in CMS-1500 Box 53 / Box 13 ("Signature on File" or "SOF"). Without AOB, the payer sends checks directly to the patient.',
    notesFromDoc: 'If Box 13 is blank or "No", the insurer pays the patient and the provider must attempt to collect from the patient directly.'
  },
  {
    id: 'abn',
    number: 4,
    question: 'What is meant by ABN (Advance Beneficiary Notice)?',
    answer: 'An ABN (Advance Beneficiary Notice of Noncoverage, Form CMS-R-131) is a standardized signed notice given to a Traditional Medicare fee-for-service beneficiary before receiving services, stating that Medicare is likely to deny the service as not medically necessary, and explaining that the patient will be personally responsible if denied.',
    category: 'eligibility-cob',
    keyTakeaway: 'Mandatory before non-emergency services that Medicare is expected to deny under LCD/NCD rules. Requires Modifier GA on claim.',
    notesFromDoc: 'Must specify the estimated cost ($) and the exact clinical rationale why Medicare may not pay.'
  },
  {
    id: 'wol',
    number: 5,
    question: 'What is meant by WOL (Waiver of Liability)?',
    answer: 'A WOL (Waiver of Liability) is an advance written legal notice provided to the patient before receiving non-covered or non-medically necessary services, where the patient acknowledges financial responsibility if the commercial or Medicare Advantage insurance plan denies coverage.',
    category: 'eligibility-cob',
    keyTakeaway: 'Protects the provider against mandatory contractual write-offs when performing elective or experimental procedures.',
    notesFromDoc: 'WOL differs from ABN: ABN is specifically for Traditional Medicare; WOL is widely used across commercial and managed care payers.'
  },
  {
    id: 'roi',
    number: 6,
    question: 'What is meant by ROI (Release of Information)?',
    answer: 'ROI (Release of Information) is a signed authorization form from the patient that permits the healthcare provider to disclose Protected Health Information (PHI) and clinical records to the insurance company or third parties for billing and claims adjudication purposes.',
    category: 'eligibility-cob',
    keyTakeaway: 'Governed by HIPAA Privacy Rule; documented on CMS-1500 in Box 12 ("Signature on File").',
    notesFromDoc: 'Required before medical records or operative notes can be mailed or faxed to payers for claim appeals.'
  },
  {
    id: 'pre-auth',
    number: 7,
    question: 'What is Pre-Authorization (Prior Auth)?',
    answer: 'Pre-Authorization is the requirement mandated by health insurance plans where the provider must notify and receive prior approval from the insurance carrier before performing specific medical services, outpatient surgeries, high-tech imaging (MRI/CT), or specialty medications for the service to be eligible for coverage.',
    category: 'eligibility-cob',
    keyTakeaway: 'Lack of prior auth causes hard denial CO-197. Cannot bill patient if in-network without prior authorization.',
    notesFromDoc: 'Authorization number must be entered in CMS-1500 Box 23 or UB-04 FL 63.'
  },
  {
    id: 'retro-auth',
    number: 8,
    question: 'What is Retro-Authorization and what is the Turnaround Time (TAT)?',
    answer: 'Retro-Authorization (Retroactive Authorization) occurs when a healthcare provider misses securing pre-authorization prior to the service (often due to emergency admission or urgent clinical status) and requests authorization after the service has already begun or been rendered. The standard Turnaround Time (TAT) to submit and obtain retro-auth is 72 hours from admission or DOS.',
    category: 'eligibility-cob',
    keyTakeaway: 'Strict 72-hour window. Must prove clinical urgency or legitimate administrative reason for not getting prior approval.',
    notesFromDoc: 'If missed past 72 hours, payer will issue an unappealable CO-197 authorization denial.'
  },
  {
    id: 'hipaa',
    number: 9,
    question: 'What is HIPAA and when was it established?',
    answer: 'HIPAA (Health Insurance Portability and Accountability Act) is a landmark US federal law established by the US government in 1996. It protects sensitive patient health information (PHI) from disclosure without consent, establishes national standards for electronic healthcare transactions (EDI 837, 835, 270/271), and provides health insurance portability for workers transitioning between jobs.',
    category: 'payers-compliance',
    keyTakeaway: 'Enacted in 1996. Establishes Privacy Rule, Security Rule, and Standardized ANSI X12 Electronic Transaction Codes.',
    notesFromDoc: 'Violations incur severe civil and criminal penalties up to $50,000 per violation and imprisonment.'
  },
  {
    id: 'cobra',
    number: 10,
    question: 'What is COBRA and what is its coverage duration?',
    answer: 'COBRA (Consolidated Omnibus Budget Reconciliation Act) is a federal law that allows employees and their qualified dependents to temporarily continue their group health insurance coverage at their own expense after losing employment or experiencing qualifying life events. Standard coverage lasts up to 18 months, and in specific circumstances (such as employee disability, divorce, or death), it can extend up to 36 months.',
    category: 'payers-compliance',
    keyTakeaway: 'Beneficiary pays 102% of the premium (100% full cost + 2% administrative fee). 18 months standard, 36 months extended.',
    notesFromDoc: 'Applies to employers with 20 or more employees.'
  },
  {
    id: 'clia',
    number: 11,
    question: 'What is CLIA, what type of number is it, and where is it reported?',
    answer: 'CLIA (Clinical Laboratory Improvement Amendments) is a quality assurance standard driven by Congress in 1988 to ensure accuracy and reliability of all laboratory testing in the US. A CLIA certificate provides an alphanumeric 10-digit identifier required for billing laboratory tests. It must be explicitly reported in Box 23 of the CMS-1500 claim form or Loop 2300 REF*X4 in EDI 837P.',
    category: 'claim-forms',
    keyTakeaway: '10-digit alphanumeric identifier. Mandatory in CMS-1500 Box 23 for all in-house clinical lab tests (e.g. 80053, 85025).',
    notesFromDoc: 'Omission causes immediate clearinghouse rejection or payer denial CO-16 / N257 (Missing CLIA number).'
  },
  {
    id: 'hospice',
    number: 12,
    question: 'What is Hospice Care and what are its coverage criteria?',
    answer: 'Hospice Care is specialized compassionate end-of-life palliative care provided to terminally ill patients with a medically certified life expectancy of six months or less. In the US, it is exclusively covered under Medicare Part A. When a patient enters hospice, curative treatments for the terminal condition stop, but unrelated services can still be billed to Medicare using Modifier GW or GV.',
    category: 'payers-compliance',
    keyTakeaway: 'Terminal illness with <= 6 months prognosis. Covered under Medicare Part A. Requires Modifier GW for unrelated care.',
    notesFromDoc: 'Modifier GV: Attending physician not employed by hospice. Modifier GW: Service unrelated to terminal diagnosis.'
  },
  {
    id: 'medicare-eligibility',
    number: 13,
    question: 'What is Medicare and what are the 4 primary eligibility criteria?',
    answer: 'Medicare is a federal health insurance program administered by CMS for specific eligible populations. The 4 primary eligibility criteria are: (1) Individuals aged 65 years or older; (2) Individuals under 65 with permanent disabilities who have received Social Security Disability Insurance (SSDI) for at least 24 months (2 years); (3) Individuals with End-Stage Renal Disease (ESRD) requiring dialysis or kidney transplant; (4) Individuals with ALS (Amyotrophic Lateral Sclerosis) or Black Lung disease.',
    category: 'payers-compliance',
    keyTakeaway: 'Age 65+, 2-year disability duration, ESRD (kidney failure), or ALS / Black Lung.',
    notesFromDoc: 'Medicare Beneficiary Identifier (MBI) is 11 alphanumeric characters, never includes SSN.'
  },
  {
    id: 'medicare-parts',
    number: 14,
    question: 'What are the 4 Parts of Medicare and what does each cover?',
    answer: 'Medicare has 4 distinct parts: (1) Part A (Hospital Insurance): Covers inpatient hospital admissions, Skilled Nursing Facilities (SNF), Hospice care, and inpatient surgeries; (2) Part B (Medical Insurance): Covers outpatient physician services, doctor visits, labs, DME supplies, and ambulatory surgical services; (3) Part C (Medicare Advantage): Managed care plans provided by private insurers that combine Part A + Part B + usually Part D, often with vision/dental; (4) Part D (Prescription Drug Coverage): Covers outpatient prescription medications and pharmacy benefits.',
    category: 'payers-compliance',
    keyTakeaway: 'Part A = Inpatient/Hospice; Part B = Outpatient/Physician; Part C = Advantage All-in-One; Part D = Rx Drugs.',
    notesFromDoc: 'Part A has $0 premium for most workers who paid FICA taxes for 40 quarters (10 years).'
  },
  {
    id: 'medicare-supplements',
    number: 15,
    question: 'What is a Medicare Supplement Plan (Medigap) vs Medicare Advantage?',
    answer: 'A Medicare Supplement Plan (also known as Medigap) is private health insurance designed to fill the "gaps" in Original Medicare (Part A and Part B), paying patient out-of-pocket costs such as deductibles, coinsurance (the 20% Part B balance), and copayments. In contrast, Medicare Advantage (Part C) replaces Original Medicare with a private managed care network (HMO/PPO) and does NOT allow the patient to purchase Medigap.',
    category: 'payers-compliance',
    keyTakeaway: 'Medigap works alongside Original Medicare (cross-over claims). Medicare Advantage replaces Original Medicare.',
    notesFromDoc: 'You cannot legally sell a Medigap policy to someone enrolled in a Medicare Advantage plan.'
  },
  {
    id: 'medicare-deductible',
    number: 16,
    question: 'What is the Medicare Part B Annual Deductible history (2022 to 2025)?',
    answer: 'The Medicare Part B annual deductible amounts are: 2022: $233.00; 2023: $226.00 (decreased); 2024: $240.00; 2025: $257.00. The patient must satisfy this annual deductible out-of-pocket before Medicare begins paying its 80% allowable share for outpatient services.',
    category: 'payers-compliance',
    keyTakeaway: '2025 Part B Deductible is $257.00. Assigned to CARC code PR-1 on 835 ERA / EOB.',
    notesFromDoc: 'Once met, Medicare pays 80% and the remaining 20% coinsurance is assigned to PR-2.'
  },
  {
    id: 'medicaid-eligibility',
    number: 17,
    question: 'What is Medicaid and who is eligible?',
    answer: 'Medicaid is a joint federal and state health insurance program designed for low-income individuals, families, children, pregnant women, elderly adults, and people with disabilities. Eligibility is primarily based on Modified Adjusted Gross Income (MAGI) below state-mandated poverty thresholds.',
    category: 'payers-compliance',
    keyTakeaway: 'Joint state/federal program; payer of last resort. Cannot balance bill Medicaid recipients.',
    notesFromDoc: 'Each state administers its own program rules, timely filing deadlines, and fee schedules.'
  },
  {
    id: 'spenddown',
    number: 18,
    question: 'What is meant by Medicaid Spend-Down?',
    answer: 'Medicaid Spend-Down (also called the Medically Needy program) applies when an applicant meets all categorical eligibility requirements for Medicaid (age, disability, medical condition) except their income is slightly above the state threshold. The patient must incur medical expenses equal to or exceeding their excess income during a set budget period (e.g. 1 to 6 months) before Medicaid activates and covers the remaining medical costs.',
    category: 'payers-compliance',
    keyTakeaway: 'Acts like an insurance deductible based on excess income; once the patient proves incurred medical bills, Medicaid pays the rest.',
    notesFromDoc: 'Commonly seen with elderly patients entering nursing facilities.'
  },
  {
    id: 'claim-forms-count',
    number: 19,
    question: 'How many types of Claim Forms are there, how many boxes do they contain, and what are their billing limits?',
    answer: 'There are two primary paper claim forms in US healthcare: (1) CMS-1500 (formerly HCFA-1500, version 02/12): Used for physician/professional billing. It contains 33 numbered boxes and allows billing up to 6 CPT service lines and 12 ICD-10-CM diagnosis codes on a single page. (2) UB-04 (CMS-1450): Used for institutional/facility billing (hospitals, SNFs). It contains 81 Form Locators (FL 01 through FL 81) and supports up to 22 service lines per page.',
    category: 'claim-forms',
    keyTakeaway: 'CMS-1500 = 33 Boxes (6 CPTs, 12 ICDs, Professional 837P); UB-04 = 81 Form Locators (22 Lines, Institutional 837I).',
    notesFromDoc: 'Both have electronic equivalents: EDI 837P and EDI 837I.'
  },
  {
    id: 'cpt-definition',
    number: 20,
    question: 'What is a CPT code?',
    answer: 'A CPT (Current Procedural Terminology) code is a standardized 5-digit numeric or alphanumeric code maintained and copyrighted by the American Medical Association (AMA) that describes medical, surgical, diagnostic, and evaluation & management (E/M) services performed by healthcare providers for billing.',
    category: 'coding-modifiers',
    keyTakeaway: 'Category I (5 digits e.g. 99213), Category II (performance tracking e.g. 3008F), Category III (emerging tech e.g. 0500T).',
    notesFromDoc: 'Reported in Box 24D of CMS-1500 along with any applicable 2-digit modifiers.'
  },
  {
    id: 'revenue-code',
    number: 21,
    question: 'What is a Revenue Code?',
    answer: 'A Revenue Code is a 4-digit numeric code reported on facility UB-04 claims (FL 42) that identifies the specific department, hospital accommodation, or operational location where a medical service, room, or procedure was provided (e.g., 0110 Room & Board Private, 0250 Pharmacy, 0360 Operating Room, 0450 Emergency Room).',
    category: 'claim-forms',
    keyTakeaway: '4-digit facility code required on UB-04 institutional claims; tells the payer WHERE within the hospital the charge originated.',
    notesFromDoc: 'Medicare will reject UB-04 lines that lack a valid 4-digit revenue code.'
  },
  {
    id: 'dx-codes',
    number: 22,
    question: 'What are Diagnosis (DX) Codes?',
    answer: 'Diagnosis (DX) codes are standardized alphanumeric codes from the ICD-10-CM (International Classification of Diseases, 10th Revision, Clinical Modification) system that healthcare providers assign to describe a patient\'s symptoms, medical condition, disease, injury, or encounter reason, establishing medical necessity for the procedures performed.',
    category: 'coding-modifiers',
    keyTakeaway: 'Structure: 3 to 7 characters (e.g. E11.9 Type 2 Diabetes). Justifies medical necessity for CPT codes.',
    notesFromDoc: 'Reported in CMS-1500 Box 21 (Lines A through L) and pointed to in Box 24E.'
  },
  {
    id: 'md-sign',
    number: 23,
    question: 'What is an MD Signature and why is it legally required?',
    answer: 'An MD Signature is the physician\'s physical or authenticated electronic signature on clinical records, operative reports, progress notes, and orders. It validates that the physician personally ordered, performed, or supervised the medical services billed to the patient and insurance company.',
    category: 'payers-compliance',
    keyTakeaway: 'Unsigned medical records will cause immediate claim denial upon payer medical audit, triggering recoupment/offset.',
    notesFromDoc: 'CMS requires electronic signatures to be date/time stamped with authentication credentials.'
  },
  {
    id: 'plans-comparison',
    number: 24,
    question: 'Compare the 3 major commercial health plan types: HMO, PPO, and EPO.',
    answer: 'HMO (Health Maintenance Organization): Requires PCP designation, requires formal specialist referrals, zero out-of-network benefits (except emergencies), lowest monthly premiums. PPO (Preferred Provider Organization): No PCP required, no specialist referrals needed, offers out-of-network benefits (at higher coinsurance/deductibles), highest monthly premiums. EPO (Exclusive Provider Organization): No PCP required, no referrals needed, zero out-of-network benefits, moderate-to-high premiums.',
    category: 'payers-compliance',
    keyTakeaway: 'HMO = Strict gatekeeper PCP + referral; PPO = Flexibility + out-of-network; EPO = In-network only but no referrals needed.',
    notesFromDoc: 'Billing an out-of-network EPO claim results in 100% patient responsibility denial.'
  },
  {
    id: 'modifier-definition',
    number: 25,
    question: 'What is a Medical Modifier and what are common examples?',
    answer: 'A Modifier is a 2-digit alphanumeric or numeric code appended to a CPT or HCPCS code to provide additional clinical information or modify the description of the procedure without changing the fundamental definition of the code. Examples include: GV (Hospice attending physician), GW (Hospice unrelated service), 59 (Distinct procedural service), TC (Technical component), 26 (Professional component), LT/RT (Left/Right side), 25 (Significant, separately identifiable E/M on same day as procedure), 76 (Repeat procedure by same provider), 77 (Repeat procedure by different provider).',
    category: 'coding-modifiers',
    keyTakeaway: 'Appended in Box 24D; tells the payer that a special clinical circumstance exists to bypass NCCI bundle edits.',
    notesFromDoc: 'Never append a modifier merely to get a claim paid; documentation must support separate work.'
  },
  {
    id: 'lcd-ncd',
    number: 26,
    question: 'What is the difference between LCD and NCD guidelines?',
    answer: 'NCD (National Coverage Determination) is released by CMS (Centers for Medicare & Medicaid Services) and applies nationwide across all US states and territories for Medicare Part A and B. LCD (Local Coverage Determination) is released by individual regional Medicare Administrative Contractors (MACs, such as Novitas, Noridian, Palmetto) and applies only to providers within that specific MAC\'s jurisdiction.',
    category: 'payers-compliance',
    keyTakeaway: 'NCD overrides LCD. LCD cannot conflict with or restrict an existing NCD.',
    notesFromDoc: 'Both list the exact covered ICD-10 diagnosis codes that prove medical necessity for specific CPT codes.'
  },
  {
    id: 'global-period',
    number: 27,
    question: 'What is a Global Surgical Period and what are its 3 types?',
    answer: 'A Global Surgical Period is a designated timeframe established by CMS where all routine pre-operative, intra-operative, and post-operative care related to a surgical procedure is bundled into a single comprehensive reimbursement fee. The 3 types are: (1) 0-Day Global: Minor procedures or endoscopies; applies only to the day of the procedure; (2) 10-Day Global: Minor surgical procedures; 0 days pre-op + day of surgery + 10 days post-op (11 days total); (3) 90-Day Global: Major surgical operations; 1 day pre-op + day of surgery + 90 days post-op (92 days total).',
    category: 'coding-modifiers',
    keyTakeaway: 'Routine post-op visits within the global period are billed as 99024 with $0 charge. Unrelated visits require Modifier 24.',
    notesFromDoc: 'Return to operating room for complications requires Modifier 78; unrelated procedure requires Modifier 79.'
  },
  {
    id: 'inclusive-vs-bundled',
    number: 28,
    question: 'What is the difference between "Inclusive" and "Bundled" services?',
    answer: '"Bundled" refers to grouping multiple distinct procedures or diagnostic tests that could theoretically be billed separately into a single unified billing package (e.g., a Comprehensive Metabolic Panel 80053 bundling 14 individual blood tests). "Inclusive" emphasizes service components that are an inherent, integral part of the primary procedure and can never be unbundled (e.g., local anesthesia, surgical incision, and routine skin closure are inclusive to an excision of lesion).',
    category: 'coding-modifiers',
    keyTakeaway: 'Bundled = distinct services packaged under NCCI; Inclusive = anatomical/technical steps integral to the main procedure.',
    notesFromDoc: 'Unbundling inclusive services is considered fraudulent billing under False Claims Act.'
  },
  {
    id: 'offset-recoupment',
    number: 29,
    question: 'What is an Offset (Recoupment) and give a numerical example?',
    answer: 'An Offset (Recoupment) occurs when an insurance company overpays a healthcare provider on an earlier claim and recovers the overpaid funds by deducting that amount from a subsequent, future claim payment made to the same provider or tax ID. Example: On DOS 01/01/2025, the insurance allowed $100.00 but erroneously paid $150.00 ($50 overpayment). When the provider submits an unrelated claim on DOS 02/15/2025 for $200.00, the payer will offset $50.00 and issue a check for $150.00, balancing the provider\'s overall ledger.',
    category: 'ar-denials',
    keyTakeaway: 'Payer automatically deducts historical overpayments from new claim checks; must be posted via PLB (Provider Level Balance).',
    notesFromDoc: 'RCM staff must match the PLB adjustment on the 835 ERA to prevent balance leakage.'
  },
  {
    id: 'new-vs-established',
    number: 30,
    question: 'What is the difference between a New Patient and an Established Patient?',
    answer: 'Under AMA and CMS CPT guidelines, an Established Patient is one who has received professional face-to-face services from the same physician or another physician of the exact same specialty in the same group practice (same Tax ID) within the preceding three years (36 months). A New Patient is one who has NOT received any professional services from the physician or group practice within the past three years.',
    category: 'coding-modifiers',
    keyTakeaway: '3-year rule (36 months). Same provider or same specialty in same tax ID group practice.',
    notesFromDoc: 'Billing new patient codes (99202-99205) for established patients causes immediate denial CO-16.'
  },
  {
    id: 'birthday-rule',
    number: 31,
    question: 'What is the Birthday Rule and provide a clinical scenario?',
    answer: 'The Birthday Rule is an NAIC coordination of benefits standard used to determine primary insurance for a dependent child covered under both parents\' health insurance plans. The parent whose birth date (month and day only, disregarding year) occurs earliest in the calendar year is the primary plan for the child. If both parents share the exact same birthday, the policy that has been active longer becomes primary. Example: Father born March 14, 1980; Mother born July 22, 1982. The Father\'s insurance is primary because March comes before July.',
    category: 'eligibility-cob',
    keyTakeaway: 'Month and day only; year is completely ignored. Earliest in calendar year is primary.',
    notesFromDoc: 'Court divorce custody decrees override the birthday rule if child medical custody is specifically assigned.'
  },
  {
    id: '72-hour-rule',
    number: 32,
    question: 'What is the 72-Hour Payment Window Rule (3-Day Rule)?',
    answer: 'Under the CMS 72-Hour Rule (Payment Window Rule), any outpatient diagnostic tests or clinically related non-diagnostic services performed within 72 hours (3 days) prior to an inpatient hospital admission by the same hospital or a hospital-owned/operated physician practice must be bundled into the inpatient Part A MS-DRG claim on the UB-04 form and CANNOT be billed separately on a CMS-1500 form. For CAHs (Critical Access Hospitals), the window is 24 hours (1-Day Rule).',
    category: 'claim-forms',
    keyTakeaway: 'Outpatient diagnostic services <= 72 hours before inpatient admission must be bundled into the UB-04 inpatient DRG.',
    notesFromDoc: 'Billing outpatient CMS-1500 claims within 72 hours of admission triggers federal compliance recoupment.'
  },
  {
    id: 'ndc-code',
    number: 33,
    question: 'What is an NDC code, its format, and why is it required for J-codes?',
    answer: 'An NDC (National Drug Code) is a unique 11-digit numeric identifier established by the FDA for all human prescription drugs. It follows a 5-4-2 configuration: 5 digits identifying the manufacturer/labeler, 4 digits for the specific product/dosage, and 2 digits for package size (e.g. 12345-6789-01). Payers require NDC reporting alongside HCPCS J-codes (injectable pharmaceuticals) in CMS-1500 Box 24A shaded line to verify exact drug cost and rebate eligibility.',
    category: 'claim-forms',
    keyTakeaway: '11 digits (5-4-2 format). Mandatory for J-codes (e.g. J1745) to ensure accurate drug reimbursement and rebates.',
    notesFromDoc: 'Prefix "N4" qualifier required before the 11-digit string on electronic 837P Loop 2410 LIN segment.'
  },
  {
    id: 'appeals-modes',
    number: 34,
    question: 'What is a Claim Appeal and what are the 3 primary modes of appeal submission?',
    answer: 'A Claim Appeal is a formal administrative process initiated by a healthcare provider when an insurance payer has improperly denied, downcoded, or withheld payment for a medically necessary service. The 3 modes of appeal submission are: (1) Via Secure Payer Web Portals (fastest, electronic audit trail); (2) Via Secure Dedicated Claims Fax (immediate transmission confirmation sheet); (3) Via Certified Physical Mail with Return Receipt (essential for high-dollar claims and legal proof of timely filing).',
    category: 'ar-denials',
    keyTakeaway: 'Always secure proof of transmission (fax receipt, certified mail tracking, portal confirmation #).',
    notesFromDoc: 'Appeals must include cover letter, copy of original claim, EOB/remit, and supporting operative/clinical records.'
  },
  {
    id: 'timely-filing-payers',
    number: 35,
    question: 'What are the Timely Filing Limits for major US health insurance payers?',
    answer: 'Timely filing limits from Date of Service (DOS) are: (1) Traditional Medicare: 365 calendar days (1 full calendar year); (2) Blue Cross Blue Shield (BCBS): 180 days (standard) or 90 days for specific regional plans; (3) UnitedHealthcare (UHC): 90 days for commercial in-network providers; (4) Cigna: 90 days for in-network participating providers; (5) Aetna: 180 days (standard) or 90 days for selected networks; (6) Anthem BCBS: 90 days from DOS.',
    category: 'ar-denials',
    keyTakeaway: 'Medicare = 365 days; Commercial payers typically range from 90 to 180 days from Date of Service.',
    notesFromDoc: 'Claim denial CO-29 indicates timely filing expiration; requires electronic 999/277CA acceptance proof to overturn.'
  },
  {
    id: 'waiting-period',
    number: 36,
    question: 'What is a Waiting Period in health insurance?',
    answer: 'A Waiting Period is the designated timeframe following enrollment in a health insurance policy during which the subscriber or beneficiary is not yet entitled to receive full benefits for specific conditions or elective treatments (most commonly pre-existing chronic conditions, maternity, or major dental procedures). Services performed during this window will be denied as patient responsibility.',
    category: 'eligibility-cob',
    keyTakeaway: 'Typically 30 to 90 days. Services rendered before waiting period completion are denied as non-covered.',
    notesFromDoc: 'Under ACA, waiting periods cannot exceed 90 days for group health plans.'
  },
  {
    id: 'medical-necessity',
    number: 37,
    question: 'What is meant by Medical Necessity?',
    answer: 'Medical Necessity is the legal and clinical determination by a health insurer that a specific healthcare service, diagnostic test, or treatment is reasonable, appropriate, and essential for the evaluation, diagnosis, or treatment of an illness, injury, or symptom, consistent with accepted standards of medical practice and not primarily for the convenience of the patient or provider.',
    category: 'ar-denials',
    keyTakeaway: 'Established by linking correct ICD-10 diagnosis to CPT procedure under CMS LCD/NCD coverage policies.',
    notesFromDoc: 'Lack of medical necessity results in denial CO-50; overturned by sending physician notes and clinical literature.'
  },
  {
    id: 'denial-codes-list',
    number: 38,
    question: 'Identify the most common CARC Denial Codes in US Healthcare RCM.',
    answer: 'Key Claim Adjustment Reason Codes (CARC) include: (1) CO-16: Claim/service lacks information or has submission/billing error; (2) CO-18: Duplicate claim or service; (3) CO-22: Coordination of benefits - service may be covered by another payer; (4) CO-27: Expenses incurred after coverage terminated; (5) CO-29: Timely filing limit expired; (6) CO-45: Charges exceed contractual fee schedule allowable (contractual write-off); (7) CO-50: Not deemed medically necessary; (8) CO-55: Procedure/treatment is experimental or investigational; (9) CO-109: Claim not covered by this payer/contractor; (10) CO-197: Pre-certification/authorization absent or invalid.',
    category: 'ar-denials',
    keyTakeaway: 'CO codes = Contractual adjustments (provider cannot bill patient unless ABN/WOL signed). PR codes = Patient responsibility.',
    notesFromDoc: 'PR-1: Deductible; PR-2: Coinsurance; PR-3: Copayment.'
  },
  {
    id: 'pos-codes',
    number: 39,
    question: 'Name the major Place of Service (POS) Codes reported in CMS-1500 Box 24B.',
    answer: 'Key CMS Place of Service (POS) 2-digit codes: POS 11: Office; POS 12: Home; POS 21: Inpatient Hospital; POS 22: On Campus Outpatient Hospital; POS 23: Emergency Room Hospital; POS 24: Ambulatory Surgical Center (ASC); POS 25: Birthing Center; POS 26: Military Treatment Facility; POS 31: Skilled Nursing Facility (SNF); POS 32: Nursing Facility; POS 34: Hospice; POS 41: Land Ambulance; POS 42: Air or Water Ambulance; POS 51: Inpatient Psychiatric Facility; POS 52: Psychiatric Facility Partial Hospitalization; POS 65: End-Stage Renal Disease (ESRD) Treatment Facility; POS 09/10: Prison / Correctional Facility.',
    category: 'claim-forms',
    keyTakeaway: 'Reported in Box 24B. Determines whether professional fee schedule pays facility or non-facility RVU rate.',
    notesFromDoc: 'Mismatch between POS and CPT (e.g. billing in-office 99213 with POS 21 Inpatient) triggers immediate clearinghouse rejection.'
  },
  {
    id: 'medicare-vs-advantage',
    number: 40,
    question: 'Summarize the core differences between Traditional Medicare and Medicare Advantage (Part C).',
    answer: 'Traditional Medicare: Patients can visit any doctor or hospital nationwide that accepts Medicare; Part B covers 80% with 20% coinsurance left to patient; patients can purchase Medigap to cover coinsurance/deductibles; no referrals needed; no foreign coverage. Medicare Advantage: Restricted to in-network doctors and service areas; HMO plans require PCP and referrals; copayments/coinsurance vary by plan; beneficiaries CANNOT buy Medigap; often bundles Part D and supplemental hearing, vision, and dental; some plans offer emergency foreign travel care.',
    category: 'payers-compliance',
    keyTakeaway: 'Traditional Medicare = Nationwide provider freedom + 80/20 split + Medigap allowed. Advantage = Network HMO/PPO + all-in-one.',
    notesFromDoc: 'Always verify on 271 eligibility whether patient is enrolled in Part C replacement plan.'
  },
  {
    id: 'duplicate-scenarios',
    number: 41,
    question: 'What are the 2 Scenarios in Duplicate Claim Denials (CO-18) and their action plans?',
    answer: 'Scenario 1 (Legitimate Repeat Service): The same procedure was legitimately performed twice on the same patient on the same Date of Service (e.g. repeat EKG, repeat lab test, bilateral x-rays). Action: Append appropriate modifier (e.g. 76 for repeat procedure by same MD, 77 for different MD, 91 for repeat lab, 59/XS for separate anatomical site) and submit appeal or corrected claim with documentation to request reprocessing. Scenario 2 (Accidental Double Billing): The exact same claim was accidentally submitted twice by the billing software or billing staff. Action: Research the original claim status (check issue date, check number, EFT trace #), verify payment, and immediately cancel/void the second duplicate claim in the practice management system.',
    category: 'ar-denials',
    keyTakeaway: 'Scenario 1 = Add modifier (76/77/91/59) and reprocess; Scenario 2 = Check original claim status, take check #, void duplicate.',
    notesFromDoc: 'Never rebill a denied claim without identifying root cause, or you will create a third duplicate denial.'
  },
  {
    id: 'denial-rate-formula',
    number: 42,
    question: 'What is the Denial Rate formula and industry benchmark?',
    answer: 'The Denial Rate is calculated as: Denial Rate (%) = (Total Number of Denied Claims / Total Number of Claims Submitted) * 100. Alternatively, it can be calculated based on dollar value: (Total Dollar Amount of Denied Claims / Total Dollar Amount Submitted) * 100. The industry benchmark established by HFMA (Healthcare Financial Management Association) is to keep the initial denial rate under 5% to 8%.',
    category: 'ar-denials',
    keyTakeaway: 'Formula: (Denied / Submitted) * 100. Target benchmark is under 5% for top-tier revenue cycle departments.',
    notesFromDoc: 'A denial rate > 10% indicates severe front-end registration or coding deficiencies.'
  },
  {
    id: 'pr-vs-co-codes',
    number: 43,
    question: 'Explain the difference between Patient Responsibility (PR) and Contractual Obligation (CO) Group Codes.',
    answer: 'Group Code PR (Patient Responsibility): Indicates that the amount is legally the patient\'s personal financial responsibility under their benefit design (PR-1 Deductible, PR-2 Coinsurance, PR-3 Copayment). The healthcare provider must generate a patient billing statement for this balance. Group Code CO (Contractual Obligation): Indicates that the amount is a mandatory contractual discount or billing write-off between the provider and the in-network payer (e.g. CO-45 Contractual Adjustment). The provider CANNOT bill the patient for this amount under federal and contractual balance billing laws.',
    category: 'ar-denials',
    keyTakeaway: 'PR = Bill the patient; CO = Provider write-off (illegal to balance bill the patient).',
    notesFromDoc: 'Balance billing a patient for a CO-45 or CO-197 in-network denial violates payer contracts.'
  },
  {
    id: 'call-script-questions',
    number: 44,
    question: 'What critical questions must an A/R follow-up specialist ask when calling a payer regarding a Paid or Pending Claim?',
    answer: 'For a Paid Claim (not yet posted in host system): (1) Date the claim was finalized; (2) Total allowed amount, paid amount, and contractual adjustment; (3) Patient responsibility amount (PR-1, PR-2, PR-3); (4) Payment method: Check or EFT/ACH; (5) Check number or EFT trace #; (6) Issue date and whether check has been cashed; (7) Mailing address where check was dispatched. For a Pending Claim: (1) Date claim was received; (2) Internal Payer Claim Number (ICN/DCN); (3) Standard turnaround time for processing; (4) Whether claim is held in medical review; (5) Any outstanding additional information or patient questionnaires required.',
    category: 'ar-denials',
    keyTakeaway: 'Always record Call Reference Number, Representative Name, Call Date/Time, and next follow-up date.',
    notesFromDoc: 'If rep states a questionnaire was mailed to patient and 30 days have elapsed without response, check payer policy.'
  }
];

// ==============================================================
// 2. COMMERCIAL HEALTH PLANS COMPARISON MATRIX
// ==============================================================
export const HEALTH_PLANS_MATRIX: PlanTypeComparison[] = [
  {
    planType: 'HMO',
    fullName: 'Health Maintenance Organization',
    pcpRequired: 'Yes (Designated Primary Care Provider required)',
    referralRequired: 'Yes (Must obtain PCP referral before seeing specialist)',
    inNetworkBenefits: 'Yes (Comprehensive coverage with fixed copays)',
    outOfNetworkBenefits: 'NO (Zero coverage except life-threatening emergencies)',
    premiumLevel: 'Lowest monthly premiums'
  },
  {
    planType: 'PPO',
    fullName: 'Preferred Provider Organization',
    pcpRequired: 'NO (Patients choose any physician freely)',
    referralRequired: 'NO (Can schedule directly with any specialist)',
    inNetworkBenefits: 'Yes (Discounted contracted fee schedule)',
    outOfNetworkBenefits: 'Yes (Covered, but higher deductible & coinsurance e.g. 70/30)',
    premiumLevel: 'Highest monthly premiums'
  },
  {
    planType: 'EPO',
    fullName: 'Exclusive Provider Organization',
    pcpRequired: 'Sometimes (Varies by plan, usually not required)',
    referralRequired: 'NO (No referral needed for in-network specialists)',
    inNetworkBenefits: 'Yes (Standard contracted in-network benefits)',
    outOfNetworkBenefits: 'NO (Zero out-of-network coverage, like HMO)',
    premiumLevel: 'Moderate to High premiums'
  }
];

// ==============================================================
// 3. PAYER TIMELY FILING DEADLINES & APPEAL LIMITS
// ==============================================================
export const PAYER_TIMELY_FILING_RULES: PayerTimelyFilingRule[] = [
  {
    payer: 'Traditional Medicare (Part A & B)',
    limitDays: 365,
    fromEvent: 'Date of Service (DOS)',
    appealLimitDays: 120,
    acceptableProof: 'EDI 999 / 277CA acceptance acknowledgement with STC*A1 code or certified postal delivery receipt.'
  },
  {
    payer: 'Blue Cross Blue Shield (BCBS Commercial)',
    limitDays: 180,
    fromEvent: 'Date of Service (DOS)',
    appealLimitDays: 180,
    acceptableProof: 'Clearinghouse electronic transmission report showing Payer ID and accepted batch timestamp.'
  },
  {
    payer: 'Anthem Blue Cross Blue Shield',
    limitDays: 90,
    fromEvent: 'Date of Service (DOS)',
    appealLimitDays: 90,
    acceptableProof: 'Payer portal batch confirmation or certified mail receipt.'
  },
  {
    payer: 'UnitedHealthcare (UHC Commercial)',
    limitDays: 90,
    fromEvent: 'Date of Service (DOS)',
    appealLimitDays: 180,
    acceptableProof: 'EDI 277CA acceptance confirmation or UHC Link portal submission record.'
  },
  {
    payer: 'Cigna Healthcare',
    limitDays: 90,
    fromEvent: 'Date of Service (DOS)',
    appealLimitDays: 180,
    acceptableProof: 'EDI 999 acknowledgement with matching tracking reference.'
  },
  {
    payer: 'Aetna Commercial',
    limitDays: 180,
    fromEvent: 'Date of Service (DOS)',
    appealLimitDays: 180,
    acceptableProof: 'Availity clearinghouse delivery status report with trace ID.'
  }
];

// ==============================================================
// 4. PLACE OF SERVICE (POS) MASTER DIRECTORY
// ==============================================================
export const POS_MASTER_DIRECTORY: PosDirectoryItem[] = [
  { code: '09/10', name: 'Prison / Correctional Facility', description: 'Incarceration facility where medical care is provided to inmates.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Correctional health, primary care' },
  { code: '11', name: 'Office', description: 'Location, other than a hospital, skilled nursing facility (SNF), or home, where health professional routinely provides health examinations.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'All outpatient physician practices, clinics' },
  { code: '12', name: 'Home', description: 'Location, other than hospital or other facility, where patient receives care in a private residence.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Home health, visiting physician' },
  { code: '21', name: 'Inpatient Hospital', description: 'Designated hospital facility for patients admitted for 24+ hour surgical, medical, or psychiatric care.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Hospitalist, surgery, critical care' },
  { code: '22', name: 'On Campus Outpatient Hospital', description: 'Hospital-owned clinic or department located on hospital campus providing outpatient care.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Outpatient surgery, oncology, specialty clinics' },
  { code: '23', name: 'Emergency Room - Hospital', description: 'Hospital emergency facility operating 24 hours a day for immediate care.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Emergency medicine, trauma surgery' },
  { code: '24', name: 'Ambulatory Surgical Center (ASC)', description: 'Freestanding non-hospital facility operating exclusively to provide outpatient surgeries.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Orthopedics, ophthalmology, endoscopy' },
  { code: '25', name: 'Birthing Center', description: 'Freestanding facility specifically designed for low-risk childbirth.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Obstetrics, certified nurse midwives' },
  { code: '26', name: 'Military Treatment Facility', description: 'Medical facility operated by US Department of Defense / Armed Forces.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'TRICARE medical providers' },
  { code: '31', name: 'Skilled Nursing Facility (SNF)', description: 'Facility providing inpatient 24-hr skilled nursing and rehabilitation services.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Physical therapy, geriatric medicine' },
  { code: '32', name: 'Nursing Facility', description: 'Facility providing continuous long-term care and custodial assistance.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Geriatrics, palliative care' },
  { code: '34', name: 'Hospice', description: 'Facility or home program providing palliative care for terminally ill patients.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Hospice & palliative medicine' },
  { code: '41', name: 'Ambulance - Land', description: 'Land vehicle equipped to provide basic or advanced life support during transit.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Emergency medical services (EMS)' },
  { code: '42', name: 'Ambulance - Air or Water', description: 'Helicopter, fixed-wing aircraft, or watercraft for patient medical evacuation.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Life flight trauma transport' },
  { code: '51', name: 'Inpatient Psychiatric Facility', description: 'Facility providing 24-hour medical and psychiatric inpatient care.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Psychiatry, behavioral health' },
  { code: '52', name: 'Psychiatric Facility Partial Hospitalization', description: 'Day program for mental health treatment that does not require overnight stay.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Psychiatric day treatment' },
  { code: '65', name: 'ESRD Treatment Facility', description: 'Designated clinic providing hemodialysis or peritoneal dialysis for kidney disease.', claimForm: 'CMS-1500 Box 24B', commonSpecialties: 'Nephrology, dialysis therapy' }
];

// ==============================================================
// 5. EXTRACTED CLINICAL MODIFIER CASE STUDIES (FROM ONENOTE)
// ==============================================================
export const CLINICAL_MODIFIER_CASES: ClinicalModifierCase[] = [
  {
    id: 'case-mod-25',
    title: 'Preventive Physical Exam + Acute Migraine Evaluation',
    modifier: 'Modifier 25',
    scenario: 'A 52-year-old established male presents for his scheduled annual preventive physical examination (CPT 99395). During the review of systems, the patient reports severe throbbing unilateral headaches with photophobia and nausea for the past 2 weeks. The physician conducts a detailed history, neurological examination, orders a brain MRI, and prescribes sumatriptan. This problem-oriented evaluation went substantially beyond routine preventive care.',
    billingCodes: '99395 (Preventive E/M) + 99213-25 (Office E/M Level 3 with Modifier 25) with ICD-10 G43.909 (Migraine).',
    whyUsed: 'Modifier 25 alerts the payer that a significant, separately identifiable evaluation and management service was rendered on the exact same date as another service/preventive encounter.',
    denialPrevention: 'Without Modifier 25, the insurance software will automatically bundle and deny 99213 as inclusive to the physical exam, causing a $75 to $150 loss in allowable revenue.',
    reimbursementImpact: 'Protects full payment for both the preventive physical ($180) and the separate problem-oriented visit ($110).',
    whenNotToUse: 'Do not use if the problem was minor or already covered in routine physical questions without distinct documentation.'
  },
  {
    id: 'case-mod-76',
    title: 'Repeat Frozen Section Pathology Consultation During Surgery',
    modifier: 'Modifier 76',
    scenario: 'During an oncological mastectomy, the surgeon excises a breast tumor and submits tissue for an immediate intraoperative frozen section pathology consultation (CPT 88305). Twenty minutes later, the surgeon takes an additional margin of deep surgical tissue and sends a second separate specimen back to the same pathologist for immediate microscopic evaluation.',
    billingCodes: 'Line 1: 88305 (Initial pathology consultation); Line 2: 88305-76 (Repeat pathology consultation by same physician).',
    whyUsed: 'Modifier 76 communicates that the exact same procedure was legitimately repeated by the same practitioner on the same patient and date of service.',
    denialPrevention: 'Without Modifier 76, payer adjudication software will issue a CO-18 (Duplicate Claim) denial for the second specimen, withholding $100+.',
    reimbursementImpact: 'Secures full reimbursement for both surgical margin evaluations ($120 each = $240 total).',
    whenNotToUse: 'Do not use if a different pathologist read the second specimen (use Modifier 77 instead).'
  },
  {
    id: 'case-mod-91',
    title: 'Serial ICU Renal Metabolic Panels for Acute Kidney Failure',
    modifier: 'Modifier 91',
    scenario: 'A critically ill ICU patient with acute renal failure is undergoing aggressive IV fluid resuscitation and nephrotoxic drug titration. The physician orders a Comprehensive Metabolic Panel (CPT 80053) at 12:00 PM to evaluate potassium and creatinine. At 4:00 PM, a second Comprehensive Metabolic Panel is drawn to assess response to dialysis and intravenous calcium gluconate.',
    billingCodes: 'Line 1: 80053 at 12:00 PM; Line 2: 80053-91 at 4:00 PM (Repeat clinical diagnostic laboratory test).',
    whyUsed: 'Modifier 91 informs the payer that serial laboratory tests were clinically necessary to track rapid hemodynamic or electrolyte changes in an acute setting.',
    denialPrevention: 'Without Modifier 91, the second automated blood test is denied as duplicate CO-18 or bundled.',
    reimbursementImpact: 'Ensures payment for both essential lab panels ($35 each = $70 total).',
    whenNotToUse: 'Do NOT use Modifier 91 to re-run a test because of a laboratory specimen error, hemolysis, or machine malfunction.'
  },
  {
    id: 'case-mod-xs',
    title: 'Upper Endoscopy (EGD) + Lower Colonoscopy in Same Session',
    modifier: 'Modifier XS',
    scenario: 'A 70-year-old patient with iron-deficiency anemia and positive occult stool presents for both an upper GI endoscopy (EGD) and a diagnostic colonoscopy during the same operative session under sedation.',
    billingCodes: 'CPT 43239 (EGD with biopsy) + CPT 45378-XS (Colonoscopy with biopsy, separate organ/structure).',
    whyUsed: 'Modifier XS (HCPCS X-subset) specifies that the second endoscopy was performed on an entirely separate organ/structure (colon vs esophagus/stomach).',
    denialPrevention: 'Without Modifier XS (or 59), commercial and Medicare payers bundle both procedures under NCCI edits, paying only the higher-valued code.',
    reimbursementImpact: 'Prevents automatic $250 to $400 unbundling denial and allows standard multiple-procedure fee schedule discount.',
    whenNotToUse: 'Do not use if procedures are performed in the same anatomical structure (e.g., two polyps in the sigmoid colon).'
  },
  {
    id: 'case-mod-ou',
    title: 'Bilateral Ophthalmology Intravitreal Eye Injections',
    modifier: 'Modifier OU / Bilateral',
    scenario: 'A 78-year-old patient with severe bilateral age-related macular degeneration (AMD) requires intravitreal injections of anti-VEGF medication into both the left and right eyes during the same clinic visit.',
    billingCodes: 'CPT 67040-OU (or 67040-RT and 67040-LT depending on payer policy).',
    whyUsed: 'Clearly distinguishes that both eyes were independently treated, satisfying bilateral medical necessity documentation.',
    denialPrevention: 'Without bilateral modifiers (OU or RT/LT), payer pays one unit and denies the second as duplicate CO-18.',
    reimbursementImpact: 'Yields 150% allowable reimbursement under the standard Medicare bilateral surgery fee rule.',
    whenNotToUse: 'Do not use when only one eye was treated or when payer guidelines mandate separate lines with LT and RT modifiers.'
  }
];

// ==============================================================
// 6. ALL 14 MASTER AR CALL SCENARIOS & PAYER REP QUESTIONS
// ==============================================================
export const AR_CALL_SCENARIOS: ArCallScenario[] = [
  {
    id: 'claim-not-on-file',
    number: 1,
    title: 'Claim Not on File',
    category: 'intake-status',
    categoryLabel: 'Submission & Intake',
    definition: 'This means the claim was sent from the billing system but insurance has no record of receiving it.',
    stepsToFollow: [
      'Check if claim is stuck in system — look for rejections at clearing house or EDI/payer level.',
      'Check the Clearing House report for any system rejection or format error (e.g. 999 or 277 rejections).',
      'If rejection found — correct the error and resubmit from billing system.',
      'If no rejection found — resend claim fresh from billing software to insurance.',
      'Always confirm the correct Payer ID before resubmitting.'
    ],
    goldenRuleOrTip: 'Claim Not On File ≠ Denial. The timely filing clock is still running — act fast before the filing window expires!',
    repQuestions: [
      'Effective & termination date of the policy?',
      'Check whether policy active or not at the time of service?',
      'What is the timely filing limit of the insurance?',
      'Verify the claim submission address if submitted through paper or Payer ID in case of electronic claims.',
      'How do you accept the claim (paper or electronically)?',
      'Do you accept FAX submissions? If yes, what is the fax# and attention to whom?',
      'What is the call reference number?',
      'Re-bill the claim again; if timely filing limit has expired, bill with proof of timely filing.'
    ],
    actionResolution: 'Audit clearinghouse 277 report. If rejected, correct data and transmit fresh 837 claim. If accepted by clearinghouse but lost by payer, rebill electronically with clearinghouse batch confirmation as Proof of Timely Filing.',
    simulatedData: {
      status: 'Claim Not on File / Fresh Submission',
      actionTaken: 'Rep confirmed no record of claim under ICN or Member ID. Policy active on DOS (eff 01/01/26). Timely filing limit 90 days. Payer ID verified as 00810. Resubmitted electronic 837 claim with clearinghouse batch confirmation attached. Faxed backup copy to Claims Intake per rep instructions.',
      nextFollowUpDays: 14
    }
  },
  {
    id: 'member-not-eligible',
    number: 2,
    title: 'Member Not Eligible on Date of Service (DOS)',
    category: 'eligibility',
    categoryLabel: 'Eligibility & Coverage',
    definition: 'Whenever patient’s policy doesn’t active on DOS then we get such denial or, patient’s policy starts after DOS. First we need to go through the website/portal to know the patient’s eligibility.',
    stepsToFollow: [
      'First log into the payer provider portal to verify patient coverage history on the specific DOS.',
      'Check whether policy terminated prior to DOS or effective date starts after DOS.',
      'If portal verifies coverage was indeed active on DOS, demand phone representative reprocess the claim.',
      'Inquire if patient has any alternate active policy enrolled at the time of service.',
      'If alternate insurance identified, obtain policy# and payer name, update PM host, and bill secondary/alternate payer.',
      'If no alternate insurance exists, transfer balance to patient statement with itemized explanation.'
    ],
    goldenRuleOrTip: 'Always ask the representative if their database lists an alternate enrolled policy or employer transition plan before billing the patient!',
    repQuestions: [
      'What was the exact denial date?',
      'What is the claim# / ICN?',
      'What are the original Effective & Termination dates of the policy?',
      'Cross verify in the system with DOS, whether patient is eligible or not.',
      'If patient is eligible on DOS then ask to reprocess the claim, take new claim# and how long will it take to process (TAT)?',
      'Ask: Is there any other policy in which patient has enrolled at the time of service?',
      'If yes, take the policy# and insurance name, update in the host/PM software and bill to that insurance.',
      'In case of no other insurance, bill to patient with proper documentation notes.',
      'What is the call reference number?'
    ],
    actionResolution: 'If verified eligible on DOS, request phone reprocessing. If confirmed inactive, bill alternate secondary insurance or bill patient statement directly.',
    simulatedData: {
      status: 'Denial CO-27 / Alternate Payer Billed',
      actionTaken: 'Rep confirmed denial CO-27 on 10/12. Policy terminated 06/30/26; DOS was 08/14/26. Inquired regarding alternate policy; rep confirmed member transitioned to Aetna Group #W9912. Updated host billing system with new policy and dispatched fresh 837 claim.',
      nextFollowUpDays: 30
    }
  },
  {
    id: 'claim-in-process-pending',
    number: 3,
    title: "'Claim in Process' or 'Pending' Status",
    category: 'intake-status',
    categoryLabel: 'Submission & Intake',
    definition: 'When insurance says the claim is still in process / pending, it means they received it but have not finalized payment or denial yet.',
    stepsToFollow: [
      'Ask insurance representative for: claim receipt date, claim number, and expected turnaround time (TAT).',
      'Document call reference number, rep name, and follow-up date in the system ledger.',
      'If pending for medical records or additional information — check with client/clinical team and provide records immediately.',
      'If pending for more than usual TAT — escalate to claims supervisor or ask insurance to expedite processing.',
      'Note the follow-up date in system and revisit the claim at the end of TAT.'
    ],
    goldenRuleOrTip: 'Never conclude a call on a pending claim without the exact receipt date and the specific processing TAT in business days!',
    repQuestions: [
      'What is the claim# / ICN?',
      'When exactly did you receive the claim?',
      'How long will it take to process (standard TAT)?',
      'If it’s taking too much time beyond normal TAT, ask why it’s taking so long.',
      'Is the claim pended for medical review, COB questionnaire, or pricing?',
      'Mention the specific pending reason in system notes if taking excessive time.',
      'What is your call reference number?'
    ],
    actionResolution: 'Record claim receipt date and TAT. If pending for records, fax requested chart notes. If past standard TAT, request supervisor escalation.',
    simulatedData: {
      status: 'Claim in Process / Level 1 Review',
      actionTaken: 'Rep verified claim received 09/28. Claim currently in Level 1 medical review for high-dollar service. Stated standard processing TAT is 30 business days from receipt. No additional clinical records required at this time. Set tickler reminder for 11/05 follow-up.',
      nextFollowUpDays: 14
    }
  },
  {
    id: 'claim-is-paid',
    number: 4,
    title: "'Claim is Paid' Scenario (Unposted Remittance)",
    category: 'intake-status',
    categoryLabel: 'Payment & Remittance',
    definition: 'Paid claim means claim has been processed by insurance company. However, the payment is not posted in our system/host. We need to collect payment details in case of payment promised.',
    stepsToFollow: [
      'Collect: EFT or check number, payment date, allowed amount, paid amount, and claim number.',
      'Ask if payment was via EFT (direct deposit) or paper check.',
      'If EFT — verify the bank account number on file. Check with billing/posting team if EFT was received in bank but unposted.',
      'If Check — verify mailing address. Check if check was cashed (encashment date). If outstanding, request insurance to place stop payment and re-issue or trace check.',
      'If address was wrong — update address in system and request check reissue. Send updated W-9 form if needed.',
      'Request EOB / 835 ERA copy if payment was issued more than 25-30 days ago.'
    ],
    goldenRuleOrTip: 'Always check if paper check has cleared (encashment date). If uncashed after 30 days, request immediate stop payment and reissue to correct lockbox address!',
    repQuestions: [
      'What was the claim processed date?',
      'What is the claim# / ICN?',
      'What is the allowed amount and paid amount?',
      'Is there any patient responsibility (deductible, copay, coinsurance)?',
      'What is the mode of payment? (EFT, Check, credit card, cash)?',
      'If EFT: ask for EFT trace#, payment date, and bank routing.',
      'If Check: ask for check#, check date, bulk amount of check, and mailing address.',
      'Verify the payment address. If it’s wrong then ask to stop payment and re-issue a new check to the correct address. Also ask for encashment date.',
      'What is the call reference number?'
    ],
    actionResolution: 'Audit bank deposit logs for EFT trace number or initiate stop-payment and reissuance with updated W-9 for uncashed paper checks.',
    simulatedData: {
      status: 'Paid / Remittance Unposted (Check Reissued)',
      actionTaken: 'Rep stated claim adjudicated on 09/15. Allowed $340.00, paid $272.00 via paper check #0098214 mailed 09/18. $68.00 assigned to PR-2 (20% coinsurance). Rep confirmed check is still UNCASHED. Verified mailing address: discovered outdated suite number. Requested stop payment and reissue to new lockbox. Call Ref #BCBS-99120.',
      nextFollowUpDays: 21
    }
  },
  {
    id: 'duplicate-claim',
    number: 5,
    title: 'Duplicate Claim / Claim Already Paid (Denial CO-18)',
    category: 'denials',
    categoryLabel: 'Denial Management',
    definition: 'If a claim has been billed to insurance company twice for the same DX code on same date of service or, if we have given similar services twice and we are billing the claim without adding an appropriate modifier.',
    stepsToFollow: [
      'Check in our billing system whether claim was submitted to insurance twice for identical services, or if similar services were rendered twice without a modifier.',
      'If we billed the claim twice in clerical error — take status of the original claim and write off the duplicate claim.',
      'If we legitimately performed similar services twice (e.g. bilateral, repeat procedure, multiple lesions) — verify if a modifier (59, 76, 77, 91, XS) was omitted.',
      'Ask representative: "Can we resubmit the claim after adding a modifier?"',
      'Make a detailed clinical note and forward to onshore/coding team to append the modifier and resubmit as a corrected claim (Resubmission Code 7).'
    ],
    goldenRuleOrTip: 'Never write off a duplicate denial without first checking if a separate, distinct procedure was performed with an omitted modifier!',
    repQuestions: [
      'What was the denial date & claim#?',
      'What is the original claim ICN that this claim was matched against?',
      'Check in our system: has the claim been submitted twice for the same Dx code, or were similar services given twice without a modifier?',
      'If billed twice in error: what is the status of the original claim?',
      'If similar services were performed twice: can we resubmit the claim after adding a modifier (e.g. 59, 76, 77, 91)?',
      'Make a proper note and forward to onshore to add a modifier and resubmit the claim.',
      'What is the call reference number?'
    ],
    actionResolution: 'If accidental duplicate, write off duplicate balance. If distinct clinical service, append Modifier 59/76/77/91 and submit as Replacement Claim (Code 7) with original ICN.',
    simulatedData: {
      status: 'Duplicate Denial / Mod 76 Corrected Resubmission',
      actionTaken: 'Claim denied 10/05 as CO-18 (Exact duplicate of ICN-2026-091). Chart review confirms patient had morning EKG (93000) and repeat EKG (93000) at 4:00 PM for chest pain. Rep confirmed second service will be reprocessed if submitted with Modifier 76 and clinical timestamps. Forwarded to coding for 93000-76 resubmission.',
      nextFollowUpDays: 20
    }
  },
  {
    id: 'untimely-filing',
    number: 6,
    title: 'Untimely Filing Denial (Denial CO-29)',
    category: 'denials',
    categoryLabel: 'Denial Management',
    definition: 'There is a timeframe given by insurance company to file the claim. If we file the claim after the filing limit, then insurance company denies it for untimely filing.',
    stepsToFollow: [
      'Verify the insurance company’s specific timely filing window (e.g. Medicare 365 days, Medicaid 90-180 days, Commercial 90-180 days).',
      'Check billing software and clearinghouse archive for initial EDI transmission timestamp and 999/277 functional acceptance reports.',
      'If claim was submitted within filing limit — demand representative reprocess based on electronic trace evidence.',
      'If claim was submitted after filing limit due to internal delay — write off the balance per practice threshold (cannot bill patient).',
      'If claim was filed on time but insurance claims they received it late — submit a formal Level 1 appeal along with Proof of Timely Filing.'
    ],
    goldenRuleOrTip: 'Proof of Timely Filing must show: (1) Patient Name, (2) Member ID, (3) DOS, (4) Payer ID, and (5) Clearinghouse Acceptance timestamp!',
    repQuestions: [
      'What was the denial date & claim#?',
      'When did you receive the claim for the very first time?',
      'What is the timely filing limit of the insurance plan?',
      'Check our system: was the claim submitted within filing limit or not?',
      'If within filing limit in our clearinghouse reports: can you reprocess the claim based on electronic EDI trace?',
      'If after filing limit due to provider delay: write off amount (depending on practice threshold).',
      'If claim was filed on time but insurance received late: what is your appeal address/fax to submit proof of timely filing?',
      'What is the call reference number?'
    ],
    actionResolution: 'Audit clearinghouse batch reports; if transmitted on time, file Level 1 appeal attaching electronic 277 acceptance proof. If submitted late without excuse, write off.',
    simulatedData: {
      status: 'Denial CO-29 / Timely Filing Appeal Dispatched',
      actionTaken: 'Claim denied as CO-29 (Filing limit expired). Payer filing window is 90 days from DOS (05/10/26). Clearinghouse audit proves initial electronic transmission on 06/15/26 (Day 36) with EDI Acceptance Batch #TX-882194. Rep refused phone reprocessing; provided Appeal Fax #800-555-0199. Drafted Level 1 appeal packet with clearinghouse 277 acceptance attached.',
      nextFollowUpDays: 30
    }
  },
  {
    id: 'services-not-covered',
    number: 7,
    title: 'Services Not Covered / Non-Covered Services (Denial CO-96 / PR-96)',
    category: 'denials',
    categoryLabel: 'Denial Management',
    definition: 'The services which are not covered under patient’s plan or not covered under doctor’s specialty are called non covered services.',
    stepsToFollow: [
      'Ask representative whether services are excluded under patient plan or due to provider specialty restrictions.',
      'Check if patient has an active secondary or supplemental insurance that covers the excluded service.',
      'If services are non-covered under patient plan: verify if an Advance Beneficiary Notice (ABN) or signed financial liability waiver is on file.',
      'If signed waiver exists and no other active coverage: bill patient statement with clear explanation.',
      'If services are non-covered due to doctor’s specialty or credentialing scope: write off the remaining balance (cannot bill patient).'
    ],
    goldenRuleOrTip: 'If denied as CO-96, provider MUST write off unless a valid signed pre-service financial waiver (ABN) is in the patient’s chart!',
    repQuestions: [
      'What was the denial date & claim#?',
      'Why is this service non-covered?',
      'Are the services performed not covered under the patient’s benefit plan, or not covered under the provider’s specialty?',
      'Was this denied as Provider Obligation (CO) or Patient Responsibility (PR)?',
      'Is there an exclusion clause or specific policy rider for this procedure?',
      'If services are non-covered under patient plan, is there any other active coverage on file?',
      'What is the call reference number?'
    ],
    actionResolution: 'If PR-96 with signed patient financial consent, transfer to patient responsibility. If provider specialty exclusion (CO-96), execute contractual write-off.',
    simulatedData: {
      status: 'Denial PR-96 / Patient Balance Transferred',
      actionTaken: 'Rep confirmed CPT 97010 (Hot/cold packs) denied as PR-96 non-covered service under patient employer benefit plan. Verified signed clinic financial consent in chart. Secondary insurance checked: none active. Transferred $35 balance to patient statement with itemized non-covered explanation.',
      nextFollowUpDays: 30
    }
  },
  {
    id: 'max-benefit-met',
    number: 8,
    title: 'Maximum Benefit Met or Reached (Denial CO-119 / PR-119)',
    category: 'eligibility',
    categoryLabel: 'Benefit Limits',
    definition: 'There can be 2 scenarios: it can be in terms of dollar value ($ limit) or number of allowed service visits. Once maximum limit is reached, patient is responsible for excess balance in case there isn’t another active coverage.',
    stepsToFollow: [
      'Clarify whether maximum benefit was reached in service visits (e.g. 20 therapy visits/year) or dollar cap (e.g. $1,500 annual limit).',
      'Ask insurance rep: "What is the maximum limit, and when was the last date you paid for this service?"',
      'Cross-check patient encounter ledger to verify accurate count of utilized visits or dollars across the benefit year.',
      'Check for active secondary insurance: bill secondary claim with primary EOB attached showing PR-119.',
      'If no secondary insurance and denial is validated: bill patient with proper documentation notes.'
    ],
    goldenRuleOrTip: 'Always bill secondary insurance first! Supplemental and secondary plans often provide coverage beyond primary benefit caps.',
    repQuestions: [
      'What was the denial date & claim#?',
      'What is the maximum benefit limit? Is it in terms of service visit counts or dollar amount?',
      'In terms of services: how many visits are allowed, and when did you pay last for that service?',
      'In terms of dollar amount: what is the annual dollar cap, and what was the cumulative paid amount prior to this claim?',
      'If it’s a correct denial, can we bill secondary insurance or transfer to patient balance?',
      'What is the call reference number?'
    ],
    actionResolution: 'Submit secondary claim with primary EOB showing PR-119. If no secondary coverage, bill patient for the balance exceeding the benefit cap.',
    simulatedData: {
      status: 'Denial PR-119 / Secondary Payer Dispatched',
      actionTaken: 'Claim denied for CPT 97110 (Physical Therapy) as PR-119. Rep confirmed plan has 20-visit annual limit. DOS was Visit #22; payer paid Visit #20 on 09/02. Patient has active Mutual of Omaha secondary supplement. Dispatched secondary 837 claim with primary EOB attached.',
      nextFollowUpDays: 21
    }
  },
  {
    id: 'no-pre-auth',
    number: 9,
    title: 'Claim Denied for Invalid or Missing Pre-Authorization (Denial CO-197)',
    category: 'denials',
    categoryLabel: 'Prior Authorization',
    definition: 'Auth# is a unique number given by Insurance Company as an approval to the provider before and after services are taken by the patient. Missing authorization results in strict denial.',
    stepsToFollow: [
      'Check in our billing system / PM host whether an authorization number was previously secured by intake team.',
      'If auth exists in system — provide the auth# to rep and ask to reprocess the claim immediately.',
      'If no auth exists — ask representative: "Was there a hospital facility claim for the same DOS that has been paid?" If yes, ask to reprocess physician claim under that same hospital Auth#!',
      'If no hospital auth exists — ask rep: "Do you accept a retroactive authorization (retro-auth)?"',
      'If they accept retro-auth — connect to authorization department, secure retro-auth (within standard 72-hour TAT), and reprocess claim with claims department.',
      'If retro-auth is not accepted — work according to process update (contractual write-off; provider cannot bill patient without pre-service ABN).'
    ],
    goldenRuleOrTip: 'INSIDER TRICK: If the hospital facility claim was paid with an Auth#, commercial payers will frequently reprocess the professional surgeon/radiologist claim under that exact same authorization number!',
    repQuestions: [
      'What was the denial date & claim#?',
      'Check in our billing host: do we have an authorization# on file?',
      'If yes: provide the auth# and ask to reprocess the claim.',
      'If no: is there a hospital claim for the same DOS which has been paid? If yes, can you reprocess the claim under that same Auth#?',
      'If we don’t have an Auth#, do you accept a retro-authorization?',
      'If you accept retro-auth: what is the direct phone/fax for the auth department, and what is the submission window (standard 72 hours)?',
      'If retro-auth secured: will you reprocess and issue a new claim# with expected TAT?',
      'If retro-auth is not accepted: confirm denial code is CO-197 for contractual write-off.',
      'What is the call reference number?'
    ],
    actionResolution: 'Supply existing auth; link to approved hospital facility auth; or submit 72-hour clinical retro-auth packet.',
    simulatedData: {
      status: 'Denial CO-197 / Linked to Hospital Facility Auth',
      actionTaken: 'Denied as CO-197 (Pre-cert missing) for MRI Brain (CPT 70553). Checked billing host: auth omitted by scheduling. Discovered hospital outpatient facility claim paid under Auth #AUTH-882194-IL. Contacted commercial rep; rep linked professional claim to hospital auth and queued for reprocessing. TAT 14 business days. Call Ref #BCBS-77182.',
      nextFollowUpDays: 14
    }
  },
  {
    id: 'claim-denied-cob',
    number: 10,
    title: 'Claim Denied for COB / Care Covered by Another Payer (Denial CO-22)',
    category: 'eligibility',
    categoryLabel: 'Coordination of Benefits',
    definition: 'Sometimes the claim is billed to secondary before primary insurance or sometimes we don’t have primary insurance info & we consider secondary insurance as primary. If rep says claim is denied as secondary payer or other insurance is primary.',
    stepsToFollow: [
      'First check patient’s other visits in EHR/PM system to verify whether alternate primary insurance was documented.',
      'If alternate insurance is listed as primary in other encounters — verify eligibility and bill that insurance immediately.',
      'If no insurance is updated in other visits — ask representative: "As per your internal records, which insurance carrier is listed as primary?"',
      'If primary payer info is obtained — bill primary insurance immediately after confirming active eligibility.',
      'If rep has no primary payer details — ask: "Have you sent a COB questionnaire to the patient to update their coordination of benefits?"',
      'If questionnaires were sent: ask how many questionnaires were sent and when the last one was mailed. If 3 questionnaires have been sent and 30 days completed without member response, bill balance to patient.'
    ],
    goldenRuleOrTip: 'THE 3-LETTER / 30-DAY RULE: When a payer denies CO-22 and confirms they mailed 3 COB update letters to the member with 30 days elapsed, billing guidelines permit invoicing the patient directly!',
    repQuestions: [
      'What was the denial date & claim#?',
      'First check other visits: do we have another insurance listed in PM software?',
      'If other insurance found in other visits: verify eligibility and bill primary.',
      'If no other insurance found, ask rep: "As per your records, which insurance is primary?"',
      'If primary info obtained: what is policy#, group#, payer ID, and filing address?',
      'If no info obtained, ask rep: "Have you sent a questionnaire to the patient to update COB?"',
      'If yes: how many questionnaires have been sent, and when was the last questionnaire mailed?',
      'If 3 questionnaires have been sent and 30 days completed without member response, can we bill patient directly?',
      'What is the call reference number?'
    ],
    actionResolution: 'Bill identified primary payer; or if 3 questionnaires/30 days passed without member response, transfer balance to patient statement.',
    simulatedData: {
      status: 'Denial CO-22 / Primary Sequence Reassigned',
      actionTaken: 'Denied as CO-22 (Care covered by another payer). Rep verified member has Medicare Part A/B primary through disability. Obtained Medicare MBI #1EG4-TE5-MK72. Updated insurance sequence in PM host (Medicare Primary, BCBS Secondary). Dispatched primary electronic 837 claim to Medicare.',
      nextFollowUpDays: 21
    }
  },
  {
    id: 'denied-medical-records',
    number: 11,
    title: 'Claim Denied or Pended for Medical Records (Denial CO-16 / CO-252)',
    category: 'denials',
    categoryLabel: 'Clinical Records',
    definition: 'Insurer or payer didn’t accept the documentation or found clinical records missing, incomplete, or invalid to substantiate medical necessity.',
    stepsToFollow: [
      'Contact insurance representative to pinpoint the exact clinical documents required (e.g. operative report, H&P, clinic progress notes, pathology, lab values).',
      'Obtain the dedicated Medical Review physical address, electronic portal upload link, or direct secure fax number, and attention to whom.',
      'Ask for the strict timeframe / deadline to submit medical notes (typically 30 to 45 days).',
      'Pull signed clinical chart from EHR, attach claim face sheet with Claim ICN clearly labeled, and transmit via fax/portal.',
      'Document fax transmission confirmation number and set follow-up reminder for end of medical review TAT (30-45 days).'
    ],
    goldenRuleOrTip: 'Always write the Claim ICN, Patient Member ID, and "ATTN: MEDICAL REVIEW DEPARTMENT" in bold on the fax cover page to prevent records detachment!',
    repQuestions: [
      'What was the denial date or pending date?',
      'What is the claim# / ICN?',
      'What specific kind of Medical Records do you need (e.g. Operative report, physician notes, lab panels)?',
      'What is the exact physical address or secure fax# where medical notes must be sent?',
      'To whose attention should the records be directed?',
      'What is the exact timeframe / deadline to submit the medical notes?',
      'What is the processing turnaround time once records are received?',
      'What is the call reference number?'
    ],
    actionResolution: 'Pull physician-signed documentation from EHR, compile with claim cover sheet, fax to Medical Review team, and track adjudication.',
    simulatedData: {
      status: 'Denial / Medical Records Submitted via Fax',
      actionTaken: 'Claim denied for CPT 29881 (Knee arthroscopy) for operative notes. Rep confirmed payer needs full surgeon operative report and pre-op MRI report. Dedicated Fax #888-555-0142, Attn: Clinical Review Team. Pulled signed op notes from Epic EHR; faxed complete 8-page packet with ICN on cover sheet. Fax transmission successful (Conf #FX-99812).',
      nextFollowUpDays: 30
    }
  },
  {
    id: 'denied-additional-info',
    number: 12,
    title: 'Claim Denied for Additional Information (Denial CO-16 / RARC N382)',
    category: 'denials',
    categoryLabel: 'Information Requests',
    definition: 'Insurance company will not pay the claim till all the information is completed with insurance. Information may be required from either provider or patient.',
    stepsToFollow: [
      'Ask insurance rep: "Is the additional information needed from the healthcare provider or from the patient?"',
      'If from Provider: ask which specific documentation is needed (e.g. W-9 form, itemized statement, manufacturer invoice for unlisted code, valid taxonomy code).',
      'Send requested provider information immediately via secure fax or portal, and request new claim# and processing TAT.',
      'If from Patient: ask what specific info is needed from member (e.g. accident questionnaire, dependent status, coordination of benefits update).',
      'Ask if questionnaires were mailed to patient. If 3 questionnaires have been sent and 30 days completed without member response, bill balance to patient.',
      'If patient contact is recent, contact patient to assist them in responding to payer inquiries.'
    ],
    goldenRuleOrTip: 'Distinguish immediately whether the bottleneck is Provider-side (fixable by billing staff today) or Patient-side (requires member outreach)!',
    repQuestions: [
      'What was the denial date or pending date?',
      'What is the claim# / ICN?',
      'Whether the additional information is needed from the patient or from the healthcare provider?',
      'If information needed from Provider: which specific documentation do you need? What is the submission fax#?',
      'If information needed from Provider: after submission, how long will it take to process? Will you issue a new claim#?',
      'If information needed from Patient: which specific information do you need from patient?',
      'Have you sent a questionnaire to the patient for additional information?',
      'If yes: how many questionnaires have been sent, and when was the last questionnaire mailed?',
      'If 3 questionnaires have been sent and 30 days completed without member response, can we bill patient directly?',
      'What is the call reference number?'
    ],
    actionResolution: 'Submit missing invoice/W-9 if provider info; or contact patient to complete questionnaire, billing patient if 3 letters/30 days expire.',
    simulatedData: {
      status: 'Pending / Supplier Invoice Furnished',
      actionTaken: 'Rep stated claim pended for unlisted surgical supply code CPT 99070. Payer requires itemized manufacturer purchase invoice. Retrieved supplier invoice ($145.00) from materials management; faxed to Payer Claims Intake with cover letter citing ICN-2026-8812. Rep quoted 21-day processing TAT.',
      nextFollowUpDays: 21
    }
  },
  {
    id: 'inclusive-bundled-services',
    number: 13,
    title: 'Claim Denied as Inclusive, Bundled & Mutually Exclusive (Denial CO-97 / NCCI Edits)',
    category: 'billing-rules',
    categoryLabel: 'Coding & Bundling',
    definition: 'When a CPT is identifying two services but the other service is still billed separately then insurance company doesn’t pay the separate CPT & they will deny the claim stating service is inclusive, bundled or mutually exclusive.',
    stepsToFollow: [
      'Ask representative: "What is the primary CPT code with which this secondary service was made inclusive?"',
      'Check in billing host whether the primary CPT code was paid or denied.',
      'If primary CPT was not paid: ask rep why primary was not paid and resolve the primary procedure first.',
      'If primary CPT was paid: verify payment details, allowed amount, and payment date.',
      'Check CMS NCCI PTP (Procedure-to-Procedure) edit table: look up the Modifier Indicator (0 = Never allowed; 1 = Modifier allowed if distinct session/site/incision).',
      'If clinical documentation substantiates a separate distinct procedural service and modifier is permitted (Indicator 1): append modifier (59, XE, XS) and resubmit as a corrected claim.',
      'If on NCCI bundle list with Modifier Indicator 0 (not unbundleable): adjust and write off the separate CPT amount as contractual adjustment CO-97.'
    ],
    goldenRuleOrTip: 'Never unbundle unless medical documentation clearly substantiates: (1) different session, (2) different procedure, (3) separate site, or (4) separate incision!',
    repQuestions: [
      'What was the denial date & claim#?',
      'What is the primary CPT code with which this procedure was made inclusive?',
      'Was the primary CPT code paid or denied?',
      'If it’s not paid: ask rep why the primary CPT was not paid?',
      'If it’s paid: ask details for the payment and mention in the notes for primary procedure?',
      'Does the payer recognize NCCI modifier overrides (e.g. Modifier 59, XE, XS) with supporting clinical documentation?',
      'If it is on bundle list with no distinct documentation: adjust the separate CPT amount as write-off.',
      'What is the call reference number?'
    ],
    actionResolution: 'Audit NCCI PTP edit tables. If distinct service supported by medical record, append Modifier 59/XS and resubmit. If integral, write off CO-97.',
    simulatedData: {
      status: 'Denial CO-97 / NCCI Bundle Contractual Adjustment',
      actionTaken: 'CPT 36415 (Routine venipuncture) denied as CO-97 bundled into emergency E&M 99284. Primary 99284 paid in full ($210.00). Checked NCCI edit guidelines: routine venipuncture is an integral component of emergency department workups and carries Modifier Indicator 0 (not unbundleable). Contractually adjusted $25.00 write-off.',
      nextFollowUpDays: 0
    }
  },
  {
    id: 'primary-paid-more-than-secondary',
    number: 14,
    title: 'Primary Paid More Than Secondary Allowed Amount (Non-Duplication COB)',
    category: 'billing-rules',
    categoryLabel: 'Secondary Adjudication',
    definition: 'If primary insurance has paid more than the secondary’s allowed amount, then secondary insurance denies the claim or pays $0 for this reason under standard non-duplication of benefits.',
    stepsToFollow: [
      'Ask representative: "What was the secondary insurance company’s contracted allowed amount for this claim?"',
      'Check primary insurance Explanation of Benefits (EOB / 835 ERA).',
      'Compare primary reimbursement against secondary allowed amount: e.g. Primary paid $200; Secondary allowable is $180.',
      'Because primary payment ($200) exceeds secondary allowable ($180), secondary payer financial liability is $0.00.',
      'Under contractual in-network provider agreements, the provider has received equal to or greater than the secondary negotiated rate.',
      'Contractually write off the remaining balance to zero (cannot balance-bill patient under non-duplication provisions).'
    ],
    goldenRuleOrTip: 'NON-DUPLICATION RULE: In-network secondary payers will NEVER pay more than their own contracted fee schedule. If Primary Paid >= Secondary Allowed, the balance is a MANDATORY write-off!',
    repQuestions: [
      'What was the denial / adjudication date?',
      'What is the claim# / ICN?',
      'What is the secondary insurance company’s contracted allowed amount?',
      'Check primary’s EOB: did primary already pay equal to or more than the secondary’s allowed amount?',
      'Can you confirm patient responsibility is $0.00 and remaining balance should be written off?',
      'What is the call reference number?'
    ],
    actionResolution: 'Verify primary payment exceeds secondary allowable; execute mandatory contractual write-off for zero balance.',
    simulatedData: {
      status: 'Secondary Adjudicated / Non-Duplication Write-Off',
      actionTaken: 'Secondary claim adjudicated with $0.00 payment and denial code CO-23 / CO-45. Rep confirmed Secondary allowable for 99214 is $150.00. Primary Medicare already paid $160.00. Because Primary paid ($160.00) > Secondary allowed ($150.00), secondary balance is $0.00. Contractually adjusted remaining balance to zero per COB agreement.',
      nextFollowUpDays: 0
    }
  }
];

