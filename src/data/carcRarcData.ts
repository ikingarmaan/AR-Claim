// ==============================================================
// RCMclaim — CARC, PR, and RARC Master Knowledge Base
// Claim Adjustment Reason Codes & Remittance Advice Remarks
// ==============================================================

export interface CoDenialCode {
  code: string;
  number: number;
  title: string;
  category: 'data-entry' | 'duplicates' | 'cob' | 'timely-filing' | 'contractual' | 'medical-necessity' | 'non-covered' | 'bundling' | 'benefit-limits' | 'authorization' | 'coverage-lapse';
  categoryLabel: string;
  definition: string;
  examples: string[];
  commonRemarks: string[];
  resultExplanation?: string;
  scenarios?: {
    title: string;
    description: string;
    action: string;
  }[];
  analogy?: string;
  rxWorkflow: string[];
  proTip: string;
  ncdLcdGuide?: {
    ncdTitle: string;
    ncdIssuedBy: string;
    ncdAppliesTo: string;
    ncdPurpose: string;
    ncdExample: string;
    ncdRule: string;
    lcdTitle: string;
    lcdIssuedBy: string;
    lcdAppliesTo: string;
    lcdPurpose: string;
    lcdExample: string;
    lcdRule: string;
    relationshipRule: string;
  };
}

export interface PrCodeItem {
  code: string;
  name: string;
  definition: string;
  example: string;
  resolution: string;
  category: 'cost-sharing' | 'liability' | 'non-covered' | 'eligibility' | 'benefit-limits' | 'plan-rules';
  categoryLabel: string;
}

export interface RarcRemarkCodeItem {
  code: string;
  meaning: string;
  series: 'M-series (CMS / General)' | 'N-series (National Standard)' | 'MA-series (Medicare Admin)';
  relatedCarcs: string[];
  practicalGuidance: string;
}

// ==============================================================
// 1. ALL MASTER CO DENIAL CODES (CO-16 through CO-200)
// ==============================================================
export const CO_DENIAL_CODES: CoDenialCode[] = [
  {
    code: 'CO-16',
    number: 16,
    title: 'Missing Info / Data Entry Error',
    category: 'data-entry',
    categoryLabel: 'Intake & Demographic',
    definition: 'Claim/service lacks information or has submission/billing error(s) which is needed for adjudication. Mandatory administrative or clinical data elements were missing, invalid, or truncated.',
    examples: [
      'Missing or invalid Rendering / Billing Provider NPI (Box 24J / Box 33A)',
      'Wrong Date of Birth or inverted Date of Service (DOS)',
      'Invalid, incomplete, or truncated ICD-10-CM diagnosis code (missing 4th to 7th character digit)',
      'Missing Referring Physician Name or NPI for specialist consults (Box 17 / 17b)',
      'Missing or invalid Federal Tax ID / EIN (Box 25)'
    ],
    commonRemarks: ['M51', 'N29', 'N382', 'MA65'],
    resultExplanation: 'Payer front-end adjudication engines immediately reject claims when mandatory HIPAA 837 data loops (2000A, 2300, 2400) fail syntax or relational validation.',
    rxWorkflow: [
      'Read Denial reason and remark code carefully in the 835 ERA / EOB (e.g. check for N382, N29, or M51).',
      'Audit all mandatory CMS-1500 / UB-04 data fields: Provider NPI, TIN, Patient DOB, DOS, ICD-10 diagnosis codes, CPT/HCPCS procedure codes, and modifiers.',
      'Cross-check patient chart and insurance card copy in the practice management (PM) system to verify exact spelling and numbers.',
      'Correct the identified data entry error directly within the billing software.',
      'Resubmit the corrected claim electronically (set 837 Claim Frequency Code to 7 for Replacement / Corrected Claim).',
      'Use pre-submission claim scrubbing tools to validate format and field rules before batch transmission.'
    ],
    proTip: 'Front-end clearinghouse claim scrubbers eliminate >90% of CO-16 errors before the claim ever reaches the payer. Never resubmit without correcting the exact field cited in the RARC.'
  },
  {
    code: 'CO-18',
    number: 18,
    title: 'Duplicate Claim / Service Already Paid',
    category: 'duplicates',
    categoryLabel: 'Duplicate Adjudication',
    definition: 'Duplicate claim/service. The payer’s adjudication system detected that this claim or service line has the exact same patient, date of service, provider NPI, and procedure code as one already on file.',
    examples: [
      'Billed the exact same CMS-1500 twice due to an automated batch re-transmission glitch.',
      'Billing team re-submitted an unpaid claim while the original submission was still actively pending in adjudication.',
      'Provider legitimately performed two distinct surgical procedures or repeat laboratory tests on the same calendar date without a distinguishing modifier.'
    ],
    commonRemarks: ['M86'],
    resultExplanation: 'There are two distinct scenarios in duplicate denials requiring opposite actions: legitimate repeat service vs accidental double billing.',
    scenarios: [
      {
        title: 'Scenario 1: Legitimate Repeat Service (Perform Twice)',
        description: 'The provider legitimately rendered the same service twice on the same DOS (e.g., repeat blood sugar/ABG in ICU, two separate EKGs post-medication, bilateral skin biopsies).',
        action: 'If billed without a modifier, send claim for coding review to append the appropriate modifier (76 for repeat by same physician, 77 for different physician, 91 for repeat clinical lab, or 59/XS for separate anatomical site), then submit for reprocessing.'
      },
      {
        title: 'Scenario 2: Accidental Double Billing (Submitted Twice)',
        description: 'The exact same claim was mistakenly transmitted twice by the software or staff.',
        action: 'Look up the original claim status in the payer portal or host. Once the original claim is verified as paid or correctly in-process, adjust off / write off the duplicate claim balance.'
      }
    ],
    rxWorkflow: [
      'Check billing system for previous submission history of this claim.',
      'Look up original claim status — was it paid, denied, or pending?',
      'If original is pending: DO NOT re-bill. Wait for full adjudication before resubmitting.',
      'If original was denied: correct the underlying error on the original claim and resubmit as a corrected claim — do NOT copy/paste a fresh duplicate.',
      'If original was paid: verify payment posting on the patient ledger. The duplicate gets denied correctly; write off or void the duplicate entry.'
    ],
    proTip: 'CO-18 is preventable with proper claim tracking. If performing a legitimate repeat procedure on the same day, NEVER bill without Modifier 76, 77, 91, or 59 upfront!'
  },
  {
    code: 'CO-22',
    number: 22,
    title: 'Coordination of Benefits (COB) / Care Covered by Another Payer',
    category: 'cob',
    categoryLabel: 'Coordination of Benefits',
    definition: 'This care may be covered by another payer per coordination of benefits. The patient has more than one active insurance plan, and this claim should have been submitted to another payer first before coming to this one.',
    examples: [
      'Commercial group health plan billed first when the patient is also covered by active Medicare with <20 employees (Medicare is primary).',
      'Child covered under both mother’s and father’s commercial employer plans; billed father first when mother’s birthday falls earlier in calendar year (Birthday Rule).',
      'Secondary payer billed without attaching the primary payer’s Explanation of Benefits (EOB / 835 Remittance).'
    ],
    commonRemarks: ['MA01', 'N89'],
    resultExplanation: 'Insurers exchange eligibility data. When a payer detects active primary coverage elsewhere, they deny secondary claims as CO-22 until primary adjudication is proven.',
    rxWorkflow: [
      'Determine the correct legal COB order using federal and industry guidelines (Birthday Rule for dependent children, active employment vs retiree status, commercial group size for Medicare).',
      'Bill the true primary insurance first with all required clinical charges.',
      'Once the primary insurance pays or adjudicates, obtain the official Explanation of Benefits (EOB) or 835 Electronic Remittance Advice (ERA).',
      'Transmit the secondary claim with the primary EOB attached (or populate 837 Loop 2320 with primary paid amount, CAS adjustment codes, and remit date).',
      'Update the patient’s insurance hierarchy order (Primary, Secondary, Tertiary) in your practice management system.',
      'Contact the patient if the primary payer requires a COB annual update questionnaire to be submitted by the subscriber.'
    ],
    proTip: 'Always ask: "Do you or your spouse have more than one health insurance plan?" at every patient intake and registration. COB denials are 100% preventable with proper intake!'
  },
  {
    code: 'CO-29',
    number: 29,
    title: 'Timely Filing Limit (TFL) Expired',
    category: 'timely-filing',
    categoryLabel: 'Timely Filing',
    definition: 'The time limit for filing has expired. You submitted the claim too late after the Date of Service (DOS) or initial remittance date per the payer’s contractual filing deadline.',
    examples: [
      'Commercial claim submitted on Day 120 when the payer contract enforces a 90-day filing limit.',
      'Medicare Part B claim submitted 14 months after DOS (exceeding Medicare’s strict 365-day / 1 calendar year statutory window).',
      'Corrected claim submitted on Day 190 when corrected claims must be filed within 180 days of the original EOB date.'
    ],
    commonRemarks: ['M144'],
    resultExplanation: 'Every health plan enforces strict contractual filing windows (e.g., Aetna 90 days, UnitedHealthcare 90 days, BCBS 90–365 days, Medicare 365 days). Once the clock expires, payers issue automated non-appealable denials unless valid Proof of Timely Filing is demonstrated.',
    rxWorkflow: [
      'Check when the claim was originally transmitted from your billing software.',
      'Gather Proof of Timely Filing (POTF): initial clearinghouse acceptance report (277CA with "Accepted by Payer" status), EDI 999 Functional Acknowledgement, or certified mail receipt.',
      'If it is a corrected claim or resubmission: include documentation of the original timely submission date and initial claim control number (ICN).',
      'File a formal Level 1 appeal accompanied by an explicit Proof of Timely Filing summary cover sheet, clearinghouse EDI trace logs, and clinical records.',
      'If genuinely late due to internal office delay without valid proof: write off the balance per in-network contractual obligations (cannot bill patient under contract).'
    ],
    proTip: 'Set billing alerts for every open encounter. Most commercial carriers require filing within 90 to 180 days. Track all unbilled charges in your AR system by their timely filing expiration countdown!'
  },
  {
    code: 'CO-45',
    number: 45,
    title: 'Contractual Obligation / Fee Schedule Adjustment',
    category: 'contractual',
    categoryLabel: 'Contractual Pricing',
    definition: 'Charge exceeds fee schedule / maximum allowable or contracted amount. You billed more than what your in-network provider contract allows. The difference is a mandatory contractual write-off — you CANNOT bill the patient for it.',
    examples: [
      'Billed $350 for an office visit (CPT 99214); payer’s contracted allowable fee is $150. Payer pays $120, applies $30 to patient copay, and writes off $200 under CO-45.',
      'Provider charges $1,200 for outpatient arthroscopy; contractual allowable is $750. The $450 difference is contractually adjusted off to zero.'
    ],
    commonRemarks: ['N20', 'M15'],
    resultExplanation: 'CO-45 is NOT a denial — it is the agreed-upon contractual discount for being an in-network participating provider. Balance-billing patients for CO-45 amounts is illegal and breaches insurance provider contracts.',
    rxWorkflow: [
      'Verify that the allowed amount adjudicated on the EOB matches your current contracted fee schedule for that CPT/HCPCS code.',
      'Post the difference between billed charge and allowed amount as a Contractual Write-off / In-Network Discount.',
      'NEVER balance-bill the patient for CO-45 amounts — it violates federal and state participating provider agreements.',
      'If the allowed amount appears lower than your contract agreement: audit your fee schedule, identify underpayment variance, and file an underpayment dispute with payer provider relations.'
    ],
    proTip: 'CO-45 is the most common adjustment code in in-network medical billing. Use dedicated contractual adjustment ledger codes in your billing software to distinguish discounts from bad debt write-offs.'
  },
  {
    code: 'CO-50',
    number: 50,
    title: 'Not a Medical Necessity (NCD / LCD Policy Denial)',
    category: 'medical-necessity',
    categoryLabel: 'Clinical & Coverage',
    definition: 'These are non-covered services because this is not deemed a "medical necessity" by the payer. Insurance reviewed the claim and decided the service wasn’t medically necessary — it wasn’t needed from a clinical standpoint according to payer guidelines.',
    examples: [
      'MRI Lumbar Spine (CPT 72148) denied because conservative treatment (6 weeks of physical therapy or NSAIDs) was not documented in the medical chart prior to imaging.',
      'Vitamin D screening (CPT 82306) denied because the diagnosis code billed was routine checkup (Z00.00) rather than an LCD-approved deficiency diagnosis (e.g., E55.9, osteoporosis).',
      'High-level emergency room visit (CPT 99285) downcoded or denied for medical necessity based on benign final diagnosis.'
    ],
    commonRemarks: ['M40', 'N115'],
    resultExplanation: 'Payers rely on formal evidence-based clinical policies — CMS National Coverage Determinations (NCDs) and Medicare Administrative Contractor Local Coverage Determinations (LCDs) — to define medical necessity.',
    ncdLcdGuide: {
      ncdTitle: 'NCDs — National Coverage Determinations',
      ncdIssuedBy: 'CMS (Centers for Medicare & Medicaid Services)',
      ncdAppliesTo: 'All Medicare beneficiaries nationwide (Uniform 50-State Policy)',
      ncdPurpose: 'Sets uniform nationwide coverage rules, diagnostic criteria, and frequency limits for specific medical procedures and technologies.',
      ncdExample: 'Medicare covers a PET scan or specific cardiac diagnostic test ONLY when the patient meets exact nationwide clinical staging criteria.',
      ncdRule: 'If a service fails to meet the NCD criteria, Medicare denies the claim nationwide. Commercial payers frequently model their guidelines on CMS NCDs.',
      lcdTitle: 'LCDs — Local Coverage Determinations',
      lcdIssuedBy: 'MACs (Medicare Administrative Contractors — Novitas, Noridian, Palmetto, NGS, First Coast, WPS, CGS)',
      lcdAppliesTo: 'Specific geographic jurisdictions or states',
      lcdPurpose: 'Provides regional coverage rules, valid ICD-10 diagnosis crosswalks, and clinical indications when no national NCD exists.',
      lcdExample: 'One regional Medicare contractor (e.g. Novitas) may cover a genetic screening test under specific secondary diagnoses, while another MAC (e.g. Noridian) may require prior conservative therapy.',
      lcdRule: 'RULE OF PRECEDENCE: LCDs must follow NCDs if an NCD exists. An LCD cannot contradict or restrict a national NCD mandate.',
      relationshipRule: 'NCD (Federal CMS) > LCD (Regional MAC) > Payer Commercial Clinical Policy'
    },
    rxWorkflow: [
      'Pull the complete medical record documentation, physician progress notes, and diagnostic test results.',
      'Review the payer’s exact LCD or NCD policy bulletin for the billed CPT code to verify covered ICD-10-CM diagnosis codes and clinical indications.',
      'Write a comprehensive appeal letter highlighting the patient’s symptoms, failed conservative treatments, and exact clinical medical necessity.',
      'Have the treating physician draft and sign a formal clinical addendum supporting medical necessity.',
      'Request a Peer-to-Peer (P2P) clinical review between the treating physician and the payer’s Medical Director.',
      'Submit additional secondary or underlying ICD-10 diagnosis codes that more accurately reflect the patient’s comorbidities.'
    ],
    proTip: 'CO-50 is one of the most common AND most winnable denials in revenue cycle management! Strong, organized clinical documentation beats this denial. Train physicians to document medical decision-making (MDM) thoroughly.'
  },
  {
    code: 'CO-96',
    number: 96,
    title: 'Non-Covered Charges (Plan Benefit Exclusion)',
    category: 'non-covered',
    categoryLabel: 'Benefit Exclusion',
    definition: 'Non-covered charge(s). The specific service, procedure, or supply billed is not covered under this patient’s insurance policy at all. It is an explicit plan exclusion.',
    examples: [
      'Adult routine dental or vision exams billed to a standard major medical policy.',
      'Elective cosmetic surgery (e.g., rhinoplasty for aesthetic purposes without airway obstruction).',
      'Acupuncture or alternative medicine treatments specifically excluded in the employer group benefit booklet.'
    ],
    commonRemarks: ['N115', 'N386'],
    resultExplanation: 'UNLIKE CO-50 (not medically necessary), CO-96 means the service is a NON-BENEFIT — it does not matter how medically necessary the service is, the insurance policy simply does not cover it under any circumstances.',
    rxWorkflow: [
      'Verify patient plan benefits and coverage booklet to confirm the specific service is an excluded non-benefit.',
      'Verify if the patient was informed about non-covered services BEFORE receiving treatment (via a signed Advance Beneficiary Notice [ABN] for Medicare or Waiver of Liability for commercial).',
      'Bill the patient directly if they were properly informed in advance and signed a financial agreement to self-pay.',
      'Check if a secondary or supplemental insurance policy covers this specific service (e.g. supplemental dental or vision plan).',
      'Do NOT write this off unless the patient qualifies for approved sliding-fee financial assistance or charity care.'
    ],
    proTip: 'For Traditional Medicare beneficiaries, ALWAYS issue an Advance Beneficiary Notice (ABN, Form CMS-R-131) before providing potentially non-covered services. Without a valid, signed ABN on file, you CANNOT legally bill the patient!'
  },
  {
    code: 'CO-97',
    number: 97,
    title: 'Service Included in Another Procedure (Bundling & NCCI Edits)',
    category: 'bundling',
    categoryLabel: 'NCCI & Bundling',
    definition: 'The benefit for this service is included in the payment/allowance for another service/procedure that has already been adjudicated.',
    examples: [
      'Billing routine blood draw / venipuncture (CPT 36415) on the same date as a high-level emergency room visit (CPT 99284).',
      'Billing local anesthesia injection separately when performing a minor skin excision (anesthesia is included in the surgical procedure fee).',
      'Billing pre-operative surgical clearance evaluation separately when provided within the global surgical period.'
    ],
    commonRemarks: ['M15', 'N20'],
    analogy: 'THE MEAL & BREAD ANALOGY: It is like ordering a complete dinner at a restaurant and the restaurant tries to bill you separately for the bread basket — the bread is already included in the price of the meal!',
    resultExplanation: 'Insurance already paid for a major comprehensive procedure, and the code you are now billing for is considered an integral component of that primary procedure — not a separately reimbursable service.',
    rxWorkflow: [
      'Review CMS National Correct Coding Initiative (NCCI) Procedure-to-Procedure (PTP) edit tables to see if these two codes are bundled.',
      'Check the NCCI Modifier Indicator: "0" = Unbundling never allowed; "1" = Modifier allowed if distinct clinical criteria are met; "9" = Edit deleted.',
      'Check if Modifier -59 or an Anatomical X-Modifier (XE: Separate Encounter, XS: Separate Organ/Structure, XP: Separate Practitioner, XU: Unusual Non-Overlapping Service) is appropriate.',
      'Review operative reports and clinical documentation to confirm the services were performed at distinct anatomical sites or separate sessions.',
      'If documentation supports a truly distinct procedure: append the appropriate modifier and file an appeal with clinical notes.',
      'Verify global surgery package rules: routine pre-op, intra-op, and post-op care within 10 or 90 days cannot be billed separately.'
    ],
    proTip: 'CO-97 is extremely prevalent on surgical and procedural claims. Master the Global Surgery Package rules: pre-op evaluation, intra-op anesthesia/supplies, and routine post-op recovery visits are bundled into the primary surgeon’s allowable fee!'
  },
  {
    code: 'CO-119',
    number: 119,
    title: 'Benefit Maximum Reached for This Period',
    category: 'benefit-limits',
    categoryLabel: 'Benefit Ceiling',
    definition: 'Benefit maximum for this time period or occurrence has been reached. The patient has exhausted the maximum number of visits, therapy sessions, or annual dollar allowance covered by their health plan.',
    examples: [
      'Patient used all 20 covered Physical Therapy (PT) or Occupational Therapy (OT) visits for the calendar year; visit #21 denied under CO-119.',
      'Patient reached their $2,500 annual chiropractic or acupuncture dollar cap.',
      'Mental health counseling sessions capped at 30 visits per benefit year.'
    ],
    commonRemarks: ['N362', 'M53'],
    resultExplanation: 'Health insurance policies frequently enforce benefit ceilings on rehabilitative, psychiatric, or elective modalities. Once the visit or dollar cap is exhausted, no further reimbursement will be disbursed until the benefit cycle resets.',
    rxWorkflow: [
      'Verify the specific benefit ceiling and check remaining visit count via the payer’s online eligibility portal or representative phone call.',
      'Inform patients upfront at scheduling and check-in regarding their remaining benefit visits.',
      'Check if a medical necessity exception or benefit extension rider can be requested from the insurance medical director.',
      'File a request for continuation of care accompanied by functional score improvement documentation if medically warranted.',
      'Discuss self-pay pricing, prompt-pay discounts, or structured payment plans with the patient for ongoing care.',
      'Transfer legitimate excess balances to Patient Responsibility (PR-119) with a detailed billing statement.'
    ],
    proTip: 'Track visit counters in your practice management system — especially for Physical Therapy, Occupational Therapy, Speech Therapy, Mental Health, and Chiropractic. Alert patients well before they hit their annual limit!'
  },
  {
    code: 'CO-197',
    number: 197,
    title: 'Pre-Authorization / Prior Notification Absent',
    category: 'authorization',
    categoryLabel: 'Prior Authorization',
    definition: 'Pre-certification/authorization/notification/pre-treatment absent. The service rendered required advance approval or prior notification from the payer, and that mandatory administrative step was skipped before the service was performed.',
    examples: [
      'Elective outpatient knee arthroscopy scheduled without submitting clinical notes for prior authorization.',
      'High-tech diagnostic imaging (CT scan, MRI, PET scan) performed without obtaining an authorization reference number from payer radiology benefit manager (e.g. eviCore, Carelon).',
      'Non-emergency inpatient admission without 24-hour advance payer notification.'
    ],
    commonRemarks: ['M62', 'N54'],
    resultExplanation: 'Insurers enforce strict utilization management. High-cost elective procedures, surgical suites, and specialized pharmaceuticals require verified clinical approval before service delivery.',
    rxWorkflow: [
      'Check your payer contract and billing guide to determine whether Prior Authorization (PA) was mandatory for this CPT code and diagnosis.',
      'If PA was obtained prior to service: locate the authorization number in your records, verify that the NPI, DOS, and CPT code match, provide the auth# to the claims rep, and request claim reprocessing.',
      'If PA was not obtained: check if the payer accepts retroactive authorization (retro-auth) within their allowable window (typically 24 to 72 hours post-emergency).',
      'Submit an urgent medical necessity appeal with clinical charts demonstrating urgent medical necessity that precluded advance authorization.',
      'Audit front-desk and scheduling workflows: implement a mandatory pre-service authorization checklist before patient check-in.'
    ],
    proTip: 'Maintain a comprehensive payer-specific Prior Authorization Matrix. Know which CPT codes, imaging studies, and outpatient surgeries require pre-cert for each payer BEFORE scheduling the patient on the calendar!'
  },
  {
    code: 'CO-200',
    number: 200,
    title: 'Expenses Incurred During Lapse in Coverage',
    category: 'coverage-lapse',
    categoryLabel: 'Policy Lapsed',
    definition: 'Expenses incurred during lapse in coverage / policy not active on Date of Service. The patient had an active gap or temporary lapse in policy coverage on the specific date medical care was rendered.',
    examples: [
      'Patient failed to pay monthly commercial health insurance premium, resulting in mid-month policy cancellation.',
      'COBRA continuation coverage elected late after the statutory election grace period expired.',
      'Patient transitioned between employers; new health insurance effective date started on the 1st of next month, leaving a 2-week gap during which service was rendered.'
    ],
    commonRemarks: ['MA27', 'N115'],
    resultExplanation: 'Insurers bear no financial liability for dates falling within an active lapse or suspension of coverage. Claims billed for services rendered during coverage gaps are denied in full.',
    rxWorkflow: [
      'Verify the exact policy termination date and reinstatement dates with the payer representative.',
      'Check if the patient is enrolled in an ACA Health Insurance Marketplace plan eligible for a 90-day premium payment grace period.',
      'Check if the patient has retroactive Medicaid coverage or active secondary commercial coverage that covers the gap period.',
      'If coverage was legitimately lapsed without reinstatement: reallocate the balance to Patient Responsibility (PR-27 / PR-28) and issue a patient statement.',
      'Offer the patient un-insured / self-pay prompt-payment discounts or financial hardship assistance if eligible.'
    ],
    proTip: 'Always run automated real-time 270/271 electronic eligibility checks 24 to 48 hours prior to every scheduled visit, and re-verify active eligibility on the morning of service!'
  }
];

// ==============================================================
// 2. ALL 19 IMPORTANT PR CODES (PATIENT RESPONSIBILITY)
// ==============================================================
export const PR_PATIENT_CODES: PrCodeItem[] = [
  {
    code: 'PR-1',
    name: 'Deductible',
    definition: 'The amount of money the patient must pay out-of-pocket for covered medical expenses before the insurance policy begins paying.',
    example: 'Insurance applies $200 of allowed amount to patient’s remaining $1,000 annual deductible.',
    resolution: 'Bill the patient for $200; verify remaining deductible balance in 271 eligibility response.',
    category: 'cost-sharing',
    categoryLabel: 'Cost-Sharing'
  },
  {
    code: 'PR-2',
    name: 'Coinsurance',
    definition: 'The percentage of the allowed medical cost that the patient is required to pay after their annual deductible has been satisfied (e.g. 80/20 plan).',
    example: 'Payer allowed amount is $250. Insurance pays 80% ($200); patient owes 20% coinsurance ($50).',
    resolution: 'Bill the patient for $50 coinsurance; confirm coinsurance percentage per the EOB.',
    category: 'cost-sharing',
    categoryLabel: 'Cost-Sharing'
  },
  {
    code: 'PR-3',
    name: 'Copayment (Copay)',
    definition: 'A fixed dollar amount established by the insurance plan that the patient must pay each time a specific medical service is received.',
    example: 'Patient has a $40 specialist office visit copay on an in-network HMO plan.',
    resolution: 'Bill patient for $40 if not collected at check-in; verify copay collection at time of service.',
    category: 'cost-sharing',
    categoryLabel: 'Cost-Sharing'
  },
  {
    code: 'PR-4',
    name: 'Other Patient Responsibility',
    definition: 'Miscellaneous patient-owed cost per specific policy terms, non-standard cost-sharing riders, or ancillary fees.',
    example: 'Payer assigns $35 miscellaneous patient-owed balance under specialized benefit agreement.',
    resolution: 'Bill patient; review EOB line-item remark codes for specific contractual allocation.',
    category: 'cost-sharing',
    categoryLabel: 'Cost-Sharing'
  },
  {
    code: 'PR-5',
    name: 'Other Liability (Accident Pending)',
    definition: 'Service may be the liability of another entity due to pending accident, injury, or third-party claim investigation.',
    example: 'Patient treated for lacerations following a slip-and-fall; health plan places claim in pending liability status.',
    resolution: 'Contact patient immediately; request accident questionnaire and third-party liability attorney details.',
    category: 'liability',
    categoryLabel: 'Third-Party Liability'
  },
  {
    code: 'PR-6',
    name: 'Third-Party Liability (Auto / Motor Vehicle)',
    definition: 'Motor vehicle or automobile insurance carries primary legal liability for injury treatment costs.',
    example: 'Care was rendered following a car crash; patient’s commercial health insurer disclaims primary liability.',
    resolution: 'Bill auto insurance carrier PIP (Personal Injury Protection) / MedPay; update COB order in system.',
    category: 'liability',
    categoryLabel: 'Third-Party Liability'
  },
  {
    code: 'PR-7',
    name: 'Workers’ Compensation Liability',
    definition: 'Medical service is related to an occupational injury or illness covered under state Workers’ Compensation law.',
    example: 'Employee sustained back injury lifting warehouse machinery; health insurance denies for work-related liability.',
    resolution: 'Bill employer Workers’ Comp insurance; obtain workers’ comp claim number, adjuster name, and billing address.',
    category: 'liability',
    categoryLabel: 'Third-Party Liability'
  },
  {
    code: 'PR-8',
    name: 'Student / School Liability',
    definition: 'Injury occurred on school premises or during university athletic activities covered under a student policy.',
    example: 'High school athlete sustained concussion during varsity football game; health plan identifies school insurance.',
    resolution: 'Bill school student injury insurance carrier; attach incident report and primary denial.',
    category: 'liability',
    categoryLabel: 'Third-Party Liability'
  },
  {
    code: 'PR-26',
    name: 'Non-Covered Service (Cosmetic / Excluded)',
    definition: 'Expenses incurred for services not covered by the health plan; patient is liable if notified in advance.',
    example: 'Patient underwent elective cosmetic blepharoplasty without visual field impairment.',
    resolution: 'Bill patient directly; verify signed Advance Beneficiary Notice (ABN) or Waiver of Liability is on file.',
    category: 'non-covered',
    categoryLabel: 'Benefit Exclusion'
  },
  {
    code: 'PR-27',
    name: 'Coverage Terminated Prior to DOS',
    definition: 'Expenses incurred after coverage was terminated. Patient’s insurance policy was inactive on the date of service.',
    example: 'Patient’s employer coverage ended September 30; service was provided on October 12.',
    resolution: 'Contact patient to obtain replacement insurance details; re-bill active payer or bill patient as self-pay.',
    category: 'eligibility',
    categoryLabel: 'Eligibility Issue'
  },
  {
    code: 'PR-28',
    name: 'Coverage Not Yet in Effect',
    definition: 'Expenses incurred prior to coverage effective date. Patient enrolled in plan with effective date after the DOS.',
    example: 'New insurance policy became effective November 1; clinic visit took place on October 24.',
    resolution: 'Bill patient; verify exact policy start date in payer portal; verify prior active insurance on DOS.',
    category: 'eligibility',
    categoryLabel: 'Eligibility Issue'
  },
  {
    code: 'PR-119',
    name: 'Benefit Maximum Reached',
    definition: 'Benefit maximum for this period has been reached; patient is responsible for services rendered beyond policy caps.',
    example: 'Patient completed 20 covered physical therapy visits; visit #21 allocated to patient responsibility.',
    resolution: 'Bill patient; request benefit maximum update; offer self-pay payment plan or prompt-pay discount.',
    category: 'benefit-limits',
    categoryLabel: 'Benefit Limits'
  },
  {
    code: 'PR-122',
    name: 'Prior Balance Applied to Claim',
    definition: 'Previously unpaid patient balance, delinquent copay, or rollover deductible balance applied to new claim.',
    example: 'Payer rolls over an unpaid prior-year deductible adjustment to the current provider remit.',
    resolution: 'Bill patient; provide itemized statement explaining rollover balance history from prior period.',
    category: 'cost-sharing',
    categoryLabel: 'Cost-Sharing'
  },
  {
    code: 'PR-123',
    name: 'Patient Chose Non-Covered Service',
    definition: 'The patient elected to receive a service that was non-covered after being informed of financial responsibility.',
    example: 'Patient requested specialized genetic screening test not covered by standard plan after signing consent.',
    resolution: 'Bill patient; retain signed non-coverage agreement and elective treatment consent in billing record.',
    category: 'non-covered',
    categoryLabel: 'Benefit Exclusion'
  },
  {
    code: 'PR-125',
    name: 'Patient Did Not Follow Plan Rules',
    definition: 'The patient failed to follow health plan rules, such as visiting an out-of-network specialist without a PCP referral.',
    example: 'HMO patient scheduled visit with orthopedic surgeon directly without obtaining mandatory PCP referral.',
    resolution: 'Bill patient; educate patient on managed care HMO referral protocols for future visits.',
    category: 'plan-rules',
    categoryLabel: 'Plan Rules'
  },
  {
    code: 'PR-204',
    name: 'Service Not Covered Under Policy Benefits',
    definition: 'Service is not covered under the patient’s specific plan benefit package or statutory exclusions.',
    example: 'Routine foot care or toenail debridement excluded under standard commercial health plan benefits.',
    resolution: 'Bill patient; review medical necessity guidelines and verify if patient signed advance financial notice.',
    category: 'non-covered',
    categoryLabel: 'Benefit Exclusion'
  },
  {
    code: 'PR-243',
    name: 'General Patient Responsibility',
    definition: 'General patient responsibility assigned by payer line-item adjudication rules or non-specified cost-sharing.',
    example: 'Payer assigns miscellaneous $25 co-pay variance to patient responsibility under specific plan provisions.',
    resolution: 'Bill patient; review EOB line remarks and cross-check patient ledger before statement generation.',
    category: 'cost-sharing',
    categoryLabel: 'Cost-Sharing'
  },
  {
    code: 'PR-B9',
    name: 'Not Covered by Primary Payer (Must Bill Secondary)',
    definition: 'Patient is responsible because service is not covered by primary payer; balance must be submitted to secondary.',
    example: 'Primary Medicare excludes hearing screening; balance allocated to PR-B9 for crossover to secondary.',
    resolution: 'Bill secondary insurance plan; attach primary EOB and update coordination of benefits.',
    category: 'plan-rules',
    categoryLabel: 'Plan Rules'
  },
  {
    code: 'PR-W2',
    name: 'Policy Limitation Excluded',
    definition: 'Plan excludes service based on specific contract limitation riders, waiting periods, or pre-existing exclusions.',
    example: 'Plan includes a 12-month waiting period limitation on elective bariatric surgery.',
    resolution: 'Bill patient; verify plan rules and effective date of benefit riders with payer provider relations.',
    category: 'non-covered',
    categoryLabel: 'Benefit Exclusion'
  }
];

// ==============================================================
// 3. ALL 19 MASTER RARC REMITTANCE ADVICE REMARK CODES
// ==============================================================
export const RARC_REMARK_CODES: RarcRemarkCodeItem[] = [
  {
    code: 'M15',
    meaning: 'Separately billed services/tests have been bundled.',
    series: 'M-series (CMS / General)',
    relatedCarcs: ['CO-97', 'CO-45'],
    practicalGuidance: 'Check NCCI PTP edit tables. Review operative notes to verify whether a distinct anatomical site or session supports Modifier 59 or an X-modifier.'
  },
  {
    code: 'M40',
    meaning: 'Service not deemed medically necessary.',
    series: 'M-series (CMS / General)',
    relatedCarcs: ['CO-50'],
    practicalGuidance: 'Cross-reference LCD/NCD coverage policies. Prepare formal appeal letter with physician clinical notes, lab results, and peer-to-peer review request.'
  },
  {
    code: 'M51',
    meaning: 'Missing, incomplete, or invalid procedure code.',
    series: 'M-series (CMS / General)',
    relatedCarcs: ['CO-16'],
    practicalGuidance: 'Check current-year CPT/HCPCS coding manual. Look for deleted codes, truncated 4-digit codes, or invalid unlisted code billing without documentation.'
  },
  {
    code: 'M53',
    meaning: 'Maximum benefit for this period has been reached.',
    series: 'M-series (CMS / General)',
    relatedCarcs: ['CO-119', 'PR-119'],
    practicalGuidance: 'Verify patient benefit visit count in portal. Allocate excess visits to patient responsibility if advance notification was signed.'
  },
  {
    code: 'M62',
    meaning: 'Missing or invalid authorization number.',
    series: 'M-series (CMS / General)',
    relatedCarcs: ['CO-197'],
    practicalGuidance: 'Check PM system for pre-cert number. If obtained, retransmit in CMS-1500 Box 23. If omitted, file for retroactive authorization immediately.'
  },
  {
    code: 'M80',
    meaning: 'Not covered when performed during the same session as another procedure.',
    series: 'M-series (CMS / General)',
    relatedCarcs: ['CO-97'],
    practicalGuidance: 'Bundled under mutually exclusive / same-session rules. Determine if separate anatomical structure was operated on (Modifier 59 / XS).'
  },
  {
    code: 'M86',
    meaning: 'Service already processed. Duplicate claim/service.',
    series: 'M-series (CMS / General)',
    relatedCarcs: ['CO-18'],
    practicalGuidance: 'Look up original claim ICN. If legitimate repeat service, append Modifier 76/77/91. If accidental double submission, void duplicate and adjust off.'
  },
  {
    code: 'M144',
    meaning: 'Claim not filed within timely filing limits.',
    series: 'M-series (CMS / General)',
    relatedCarcs: ['CO-29'],
    practicalGuidance: 'Retrieve initial clearinghouse 277CA acceptance report. File Level 1 appeal with EDI 999 timestamp proving timely transmission.'
  },
  {
    code: 'N20',
    meaning: 'Payment included in another service provided on the same date.',
    series: 'N-series (National Standard)',
    relatedCarcs: ['CO-97', 'CO-45'],
    practicalGuidance: 'Global surgery package or incidental procedure edit. Do NOT balance bill patient; post as contractual adjustment.'
  },
  {
    code: 'N29',
    meaning: 'Missing documentation/information needed to process claim.',
    series: 'N-series (National Standard)',
    relatedCarcs: ['CO-16', 'CO-252'],
    practicalGuidance: 'Payer requires operative reports, itemized billing invoices, or clinical charts. Fax requested records to claims review unit.'
  },
  {
    code: 'N54',
    meaning: 'Missing required prior authorization.',
    series: 'N-series (National Standard)',
    relatedCarcs: ['CO-197'],
    practicalGuidance: 'Verify pre-service authorization. If auth was issued, call rep with auth ID. If omitted, explore retro-authorization or appeal.'
  },
  {
    code: 'N89',
    meaning: 'Information needed to determine primary payer responsibility.',
    series: 'N-series (National Standard)',
    relatedCarcs: ['CO-22'],
    practicalGuidance: 'Patient must contact their health insurer to complete the annual COB questionnaire. Secondary cannot process until primary order is finalized.'
  },
  {
    code: 'N115',
    meaning: 'Service not covered or not medically necessary under payer policy.',
    series: 'N-series (National Standard)',
    relatedCarcs: ['CO-50', 'CO-96'],
    practicalGuidance: 'Determine whether denial stems from clinical guidelines (LCD/NCD) or policy non-benefit exclusion. File clinical appeal if medically indicated.'
  },
  {
    code: 'N362',
    meaning: 'Benefit maximum has been reached.',
    series: 'N-series (National Standard)',
    relatedCarcs: ['CO-119', 'PR-119'],
    practicalGuidance: 'Benefit ceiling exhausted. Review coverage reset date (calendar year vs policy year) and transfer excess to patient responsibility.'
  },
  {
    code: 'N382',
    meaning: 'Missing or incomplete information on claim.',
    series: 'N-series (National Standard)',
    relatedCarcs: ['CO-16'],
    practicalGuidance: 'Audit electronic claim syntax: check rendering NPI, billing TIN, patient DOB, diagnosis pointer in Box 24E, or place of service code.'
  },
  {
    code: 'N386',
    meaning: 'Decision based on benefit plan provisions; service not covered.',
    series: 'N-series (National Standard)',
    relatedCarcs: ['CO-96'],
    practicalGuidance: 'Contractual plan exclusion. Non-benefit. Verify whether patient executed a valid pre-treatment financial liability agreement / ABN.'
  },
  {
    code: 'MA01',
    meaning: 'Missing or incomplete other insurance information.',
    series: 'MA-series (Medicare Admin)',
    relatedCarcs: ['CO-22'],
    practicalGuidance: 'Populate CMS-1500 Boxes 9, 9a, 9d, 11, 11a, 11c with primary/secondary insurance policy details and retransmit claim.'
  },
  {
    code: 'MA27',
    meaning: 'Coverage terminated before the date of service.',
    series: 'MA-series (Medicare Admin)',
    relatedCarcs: ['CO-27', 'CO-200'],
    practicalGuidance: 'Verify policy effective and termination dates. Request current active insurance card copy from patient and rebill active carrier.'
  },
  {
    code: 'MA65',
    meaning: 'Missing or incorrect payer information.',
    series: 'MA-series (Medicare Admin)',
    relatedCarcs: ['CO-16'],
    practicalGuidance: 'Verify electronic Payer ID, clearinghouse routing code, or regional claims processing center address.'
  }
];
