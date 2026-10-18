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
