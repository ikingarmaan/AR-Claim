import { TermItem } from '../types/rcm';

export const TERMINOLOGY_DATA: TermItem[] = [
  // --- Cost-Sharing ---
  {
    id: 'pr-1-deductible',
    category: 'cost-sharing',
    title: 'Deductible',
    code: 'PR-1',
    shortDefinition: 'Predefined out-of-pocket amount subscriber must pay each calendar year before insurance begins reimbursing.',
    detailedExplanation: 'The annual deductible resets on January 1st for calendar-year policies (or plan anniversary for benefit-year plans). Claims processed before the deductible is satisfied are assigned CARC PR-1 (Patient Responsibility: Deductible). The healthcare provider must collect this amount directly from the patient, not from insurance.',
    realWorldExample: 'Medicare Part B standard annual deductible is $240–$283/year. Patient John visits Dr. Adams on Jan 10 for a $350 consultation. Dr. Adams allowed rate is $150. Since John has not met his deductible, insurance pays $0 and assigns $150 to PR-1. John owes the clinic $150.',
    calculationMath: 'Billed: $350 | Allowed: $150 | Deductible Applied: $150 | Payer Pays: $0 | Patient Responsibility: $150',
    keyRule: 'Never write off a deductible unless a documented financial hardship agreement is in place; routine deductible waivers violate federal False Claims Act & Anti-Kickback statutes.',
    tags: ['PR-1', 'Deductible', 'Cost-Sharing', 'Medicare Part B']
  },
  {
    id: 'pr-2-coinsurance',
    category: 'cost-sharing',
    title: 'Co-insurance',
    code: 'PR-2',
    shortDefinition: 'Percentage sharing of covered medical costs between subscriber and payer after deductible is met.',
    detailedExplanation: 'Most standard commercial and Medicare plans operate on an 80/20 or 70/30 split. The payer covers 80% of the contractual allowed amount, and the patient is liable for the remaining 20% (assigned as CARC PR-2). Coinsurance continues until the patient reaches their annual Out-of-Pocket Maximum (OOP Max).',
    realWorldExample: 'Patient Sarah had satisfied her annual deductible. She undergoes an outpatient endoscopy with an allowed amount of $1,000. Her PPO plan has an 80/20 coinsurance. Payer pays $800 (80%), and assigns $200 (20%) to PR-2. Sarah receives an invoice for $200.',
    calculationMath: 'Allowed: $1,000 | Payer Share (80%): $800 | Patient Coinsurance (20%): $200 | CARC: PR-2',
    keyRule: 'Coinsurance applies ONLY to the payer’s allowed amount, never to the gross billed provider charges.',
    tags: ['PR-2', 'Coinsurance', '80/20', 'Cost-Sharing']
  },
  {
    id: 'pr-3-copay',
    category: 'cost-sharing',
    title: 'Co-payment (Copay)',
    code: 'PR-3',
    shortDefinition: 'Predetermined fixed dollar fee paid by the insured at the time of each clinical service or visit.',
    detailedExplanation: 'Copayments vary by the type of service (e.g., $20 for Primary Care, $50 for Specialist, $100 for Emergency Room). Copays are typically collected by the front desk at check-in. On the ERA/EOB, the payer adjudicates the claim and deducts the copay from their payment, labeling it PR-3.',
    realWorldExample: 'David visits his Cardiologist (specialist). His HMO plan dictates a $45 specialist copay. Billed charge is $220; payer allowed rate is $130. Payer pays the clinic $85 ($130 - $45) and assigns $45 to PR-3.',
    calculationMath: 'Allowed: $130 | Copay Deducted: $45 | Payer Payment: $85 | Patient Balance: $45 (PR-3)',
    keyRule: 'Always verify copay tier before the visit. Commercial plans do not require deductible satisfaction before copay applies in HMO/PPO office encounters.',
    tags: ['PR-3', 'Copay', 'Fixed Fee', 'Front Desk']
  },
  {
    id: 'premium',
    category: 'cost-sharing',
    title: 'Insurance Premium',
    code: 'PREM',
    shortDefinition: 'Monthly, quarterly, or yearly financial payment paid by the subscriber/employer to keep the policy in force.',
    detailedExplanation: 'Premiums are paid directly to the insurance carrier regardless of whether medical services are utilized. Non-payment of premium triggers a grace period (typically 30–90 days under ACA). During grace periods, payers frequently "pend" claims; if canceled retroactively, claims are denied for "Coverage Terminated".',
    realWorldExample: 'An employer covers 75% of an employee’s $600/month premium, leaving $150 deducted from payroll. If the employee leaves and does not elect COBRA, coverage lapses on midnight of the last day of the month.',
    calculationMath: 'Total Premium: $600/mo = $450 Employer + $150 Employee contribution.',
    keyRule: 'Premiums do not count toward the patient’s annual Out-of-Pocket Maximum (OOP Max) or Deductible.',
    tags: ['Premium', 'Grace Period', 'Policy Active']
  },

  // --- Financial & Billing Mechanics ---
  {
    id: 'allowed-amount',
    category: 'financial',
    title: 'Allowed Amount (A.A / Fee Schedule)',
    code: 'ALLOWED',
    shortDefinition: 'The maximum contractually agreed reimbursement payable by the insurance company for a covered procedure.',
    detailedExplanation: 'Participating (PAR) providers sign contracts agreeing to accept the Allowed Amount as full payment. The allowed amount is divided into two buckets: what the insurance pays + what the patient pays (PR-1, PR-2, PR-3). The remainder is written off as Contractual Adjustment.',
    realWorldExample: 'Dr. Lee bills $500 for CPT 99214. Blue Cross Blue Shield’s contracted allowable fee for 99214 in that geographic zip code is $145. $145 is the Allowed Amount. The difference ($355) must be adjusted off.',
    calculationMath: 'Billed Amount ($500) = Allowed Amount ($145) + Contractual Write-off ($355)',
    keyRule: 'Allowed amounts are defined by payer fee schedules, RBRVS (Resource-Based Relative Value Scale), or percentage of Medicare.',
    tags: ['Allowed Amount', 'Fee Schedule', 'PAR Provider']
  },
  {
    id: 'contractual-adjustment-co45',
    category: 'financial',
    title: 'Contractual Adjustment',
    code: 'CO-45',
    shortDefinition: 'The non-billable difference between provider billed charge and insurer allowable rate written off under contract.',
    detailedExplanation: 'CARC CO-45 stands for "Charge exceeds fee schedule / maximum allowable amount". It is a mandatory write-off for in-network participating providers. Participating providers are legally and contractually prohibited from billing this excess amount to the patient ("Balance Billing").',
    realWorldExample: 'A surgeon bills $4,200 for a laparoscopic appendectomy (CPT 44970). Payer allowable rate is $1,600. Payer pays $1,280, patient coinsurance is $320 (20%), and $2,600 is adjusted off with reason code CO-45.',
    calculationMath: 'Billed: $4,200 | Allowed: $1,600 | Paid: $1,280 | PR-2: $320 | CO-45 Write-off: $2,600',
    keyRule: 'CRITICAL COMPLIANCE: In-network providers CANNOT balance bill CO-45 to the patient. Doing so violates the payer contract and the federal No Surprises Act.',
    tags: ['CO-45', 'Contractual Adjustment', 'Write-Off', 'No Surprises Act']
  },
  {
    id: 'pr-vs-co-codes',
    category: 'financial',
    title: 'PR vs. CO Group Codes',
    code: 'PR vs CO',
    shortDefinition: 'Patient Responsibility (PR) must be billed to the patient; Contractual Obligation (CO) must be adjusted/written off.',
    detailedExplanation: 'Every CARC belongs to a Claim Adjustment Group Code: PR (Patient Responsibility), CO (Contractual Obligation), CR (Correction/Reversal), OA (Other Adjustment), or PI (Payer Initiated). PR means the billing office sends a statement to the patient. CO means the provider absorbs the reduction per contract or filing failure.',
    realWorldExample: 'PR-1, PR-2, PR-3, PR-26 (Expenses incurred prior to coverage) -> Bill patient. CO-45, CO-97 (Bundled), CO-29 (Untimely filing) -> Adjust off/write off. If an AR caller bills CO-29 to the patient, it is an illegal billing practice!',
    calculationMath: 'Claim Total ($200) = Paid ($110) + PR-2 ($20) + CO-45 ($70). Send patient statement for $20 only.',
    keyRule: 'Never shift a CO code to patient balance without an advance signed notice (such as a valid ABN or Waiver of Liability).',
    tags: ['PR vs CO', 'Group Codes', 'Compliance', 'Audit Trail']
  },
  {
    id: 'capitation',
    category: 'financial',
    title: 'Capitation (PMPM)',
    code: 'CAPITATION',
    shortDefinition: 'Fixed prospective monthly payment per enrolled patient paid to a medical group regardless of service frequency.',
    detailedExplanation: 'In Capitation models (common in HMOs and Medicare Advantage), the primary care provider receives a fixed Per Member Per Month (PMPM) fee (e.g., $45/patient/month). If the patient visits 10 times in a month, the clinic gets no additional fee-for-service payment. If the patient does not visit at all, the clinic still retains the $45. Encounter claims are submitted with a $0 charge ("Shadow Claims") for HEDIS & risk-adjustment tracking.',
    realWorldExample: 'Central Medical Clinic has 1,200 assigned HMO members at $40 PMPM = $48,000 guaranteed revenue every month. Patient visits are billed with encounter code and adjusted to $0 under capitation contract.',
    calculationMath: 'Monthly Payment = Enrolled Patients (1,200) × Contracted PMPM ($40) = $48,000/mo.',
    keyRule: 'Capitation shifts financial risk to the provider, incentivizing preventive medicine and chronic disease management.',
    tags: ['Capitation', 'PMPM', 'HMO', 'Risk-Sharing']
  },
  {
    id: 'offset-clawback',
    category: 'financial',
    title: 'Payer Offset (Recoupment / Clawback)',
    code: 'OFFSET',
    shortDefinition: 'Payer withholding payment on current clean claims to recover an acknowledged historical overpayment.',
    detailedExplanation: 'When an insurer audits historical claims and discovers an overpayment (e.g. claim paid twice, or patient had retroactive primary coverage), they request a refund. If the provider does not refund by check within 30–45 days, the insurer initiates an automated offset on the next 835 ERA remittance. The ERA shows a $0 check or reduced deposit, offsetting against new claims.',
    realWorldExample: 'Payer overpaid Dr. Miller $300 on DOS 02/01/2025. On 04/10/2025, Dr. Miller submits clean claims totaling $500 for three new patients. Payer sends an ERA paying $200 cash, with an adjustment recoupment showing -$300 offset from the 02/01 overpayment.',
    calculationMath: 'New Approved Charges: $500 | Historical Recoupment: -$300 | Net Electronic Fund Transfer: $200',
    keyRule: 'Payment posting teams must cross-post offsets! Do not leave the new patients with an outstanding balance.',
    tags: ['Offset', 'Clawback', 'Recoupment', 'ERA 835', 'Payment Posting']
  },
  {
    id: 'inclusive-vs-bundled',
    category: 'financial',
    title: 'Inclusive vs. Bundled Procedures',
    code: 'INCL / BUND',
    shortDefinition: 'Bundled = multiple distinct codes grouped into one; Inclusive = inherent component of a primary procedure.',
    detailedExplanation: 'Bundled: Two separate procedures performed together that payer guidelines group under a single comprehensive code (e.g., Lab Panel 80053 bundles individual metabolic tests). Inclusive: A minor service that is clinically necessary to perform the main surgery (e.g., local anesthesia or surgical incision closure is inclusive to the excision itself, CARC CO-97).',
    realWorldExample: 'Surgeon performs a skin biopsy (11102) and bills a separate charge for local lidocaine infiltration (CPT 96372). Payer denies 96372 with CO-97 as inclusive to the surgical biopsy.',
    calculationMath: 'Primary CPT 11102: Paid $180. Secondary CPT 96372: Denied CO-97 ($0 allowed, $60 adjusted).',
    keyRule: 'NCCI (National Correct Coding Initiative) defines Column 1/Column 2 edit pairs that establish whether bundling allows modifier override.',
    tags: ['Inclusive', 'Bundled', 'CO-97', 'NCCI Edits']
  },

  // --- Compliance, Legal & Identifiers ---
  {
    id: 'hipaa-hitech',
    category: 'compliance',
    title: 'HIPAA (1996) & HITECH (2009)',
    code: 'HIPAA',
    shortDefinition: 'Federal statutes safeguarding Protected Health Information (PHI), EDI transaction rules, and electronic security.',
    detailedExplanation: 'HIPAA established standardized EDI formats (ASC X12 837, 835, 270/271, 276/277) and Privacy/Security Rules. HITECH (Health Information Technology for Economic and Clinical Health Act) expanded HIPAA to cover Business Associates directly, mandated breach notifications within 60 days, and tiered violation penalties up to $1.5 million/year per violation category.',
    realWorldExample: 'An offshore AR specialist email-forwards patient demographics and claim spreadsheets to their personal Gmail. This is a severe HIPAA security violation subject to OCR investigations, fines, and immediate contract termination.',
    calculationMath: 'Civil Monetary Penalties: Tier 1 ($100–$50,000) up to Tier 4 Willful Neglect ($50,000–$1,500,000/yr).',
    keyRule: 'Never share PHI without a signed BAA (Business Associate Agreement) and end-to-end encryption.',
    tags: ['HIPAA', 'HITECH', 'PHI', 'BAA', 'Compliance']
  },
  {
    id: 'npi-provider-identifier',
    category: 'identifiers',
    title: 'National Provider Identifier (NPI)',
    code: 'NPI',
    shortDefinition: 'A 10-digit unique intelligence-free numeric identifier issued by CMS to all US healthcare providers.',
    detailedExplanation: 'Mandated under HIPAA to replace legacy UPINs and Medicaid provider numbers. NPIs are issued via NPPES (National Plan and Provider Enumeration System). Two types exist: Type 1 (Individual Physician/Practitioner) and Type 2 (Organizational/Group Practice/Facility).',
    realWorldExample: 'Dr. John Doe has an individual Type 1 NPI (`1234567890`) entered in CMS-1500 Box 24J & Box 17B (as rendering/referring). His practice entity "Valley Health LLC" has a Type 2 NPI (`1987654321`) entered in Box 33A as the Billing Provider.',
    calculationMath: '10 digits with a Luhn check-digit algorithm as the 10th digit. Format: 10 numeric digits, no letters.',
    keyRule: 'Box 24J = Rendering Provider Type 1 NPI; Box 33A = Billing Entity Type 2 (or Type 1 solo) NPI.',
    tags: ['NPI', 'Type 1', 'Type 2', 'NPPES', 'CMS-1500']
  },
  {
    id: 'tin-tax-id',
    category: 'identifiers',
    title: 'Taxpayer Identification Number (TIN / EIN)',
    code: 'TIN',
    shortDefinition: 'A 9-digit IRS-issued number identifying the business entity for tax reporting and 1099 disbursements.',
    detailedExplanation: 'Entered in CMS-1500 Box 25. Insurers link the Billing NPI in Box 33A to the Federal Tax ID (EIN) in Box 25 on their system through the provider’s W-9 form. A mismatch between NPI and TIN triggers clearinghouse rejections or claim denials for "Provider Not Credentialed / TIN mismatch".',
    realWorldExample: 'Practice EIN format: `12-3456789`. Solo practitioners operating as sole proprietors may use their SSN, but commercial practices utilize an IRS Employer Identification Number (EIN).',
    calculationMath: 'Format: 9 digits (`XX-XXXXXXX`). Checked against IRS database during payer credentialing.',
    keyRule: 'Always verify Box 25 TIN matches the exact W-9 submitted during payer contracting and enrollment.',
    tags: ['TIN', 'EIN', 'IRS', 'Box 25', 'W-9']
  },
  {
    id: 'ptan-provider-access',
    category: 'identifiers',
    title: 'PTAN (Provider Transaction Access Number)',
    code: 'PTAN',
    shortDefinition: 'A Medicare-only legacy tracking number assigned by the regional MAC upon Medicare enrollment approval.',
    detailedExplanation: 'While the NPI is public and used on electronic claim transactions, the PTAN is private to Medicare. When an AR specialist calls Medicare (MAC) IVR or speaks with a customer service representative, the IVR requires both the NPI and the provider’s PTAN + last 5 digits of TIN to authenticate access.',
    realWorldExample: 'When calling Noridian or Novitas Medicare MAC IVR, you must key in the 10-digit NPI, 6-digit PTAN, and Tax ID before the system reveals claim status or check numbers.',
    calculationMath: 'Assigned by CMS via PECOS (Provider Enrollment, Chain, and Ownership System).',
    keyRule: 'Keep PTANs secure in internal provider master files; never submit PTAN in place of NPI on 837P claims.',
    tags: ['PTAN', 'Medicare', 'MAC', 'PECOS', 'IVR Authentication']
  },
  {
    id: 'taxonomy-code',
    category: 'identifiers',
    title: 'Healthcare Provider Taxonomy Code',
    code: 'TAXONOMY',
    shortDefinition: 'A 10-digit unique alphanumeric code defining the provider’s clinical specialty and sub-specialty.',
    detailedExplanation: 'Administered by the National Uniform Claim Committee (NUCC). Entered in CMS-1500 Box 33B (with qualifier ZZ) or EDI Loop 2000A. Required by state Medicaid programs, TRICARE, and commercial payers to determine reimbursement eligibility for specialized procedures.',
    realWorldExample: '`207Q00000X` = Family Medicine Physician; `207R00000X` = Internal Medicine; `104100000X` = Social Worker. If a Family Practitioner bills a complex neurosurgery code, claims will deny based on taxonomy mismatch.',
    calculationMath: '10 alphanumeric characters. Structure: 2 characters (Type) + 2 characters (Classification) + 5 characters (Area of Specialization) + "X".',
    keyRule: 'Taxonomy must match the provider’s exact enrolled specialty with that specific payer.',
    tags: ['Taxonomy', 'Specialty', 'NUCC', 'Box 33B']
  },
  {
    id: 'clia-number',
    category: 'identifiers',
    title: 'CLIA Identification Number',
    code: 'CLIA',
    shortDefinition: 'A 10-digit alphanumeric ID certifying clinical laboratory testing standards under the 1988 CLIA Act.',
    detailedExplanation: 'Any in-office laboratory testing (e.g., rapid strep test 87880, urine dipstick 81002, rapid COVID antigen 87811) requires a CLIA certificate (Certificate of Waiver, Compliance, or Accreditation). The 10-digit CLIA number is mandatory in CMS-1500 Box 23. Without it, lab claims deny with CARC CO-16 / RARC MA120.',
    realWorldExample: 'Clinic runs an in-house rapid COVID-19 test (87811 with modifier QW). The clinic’s CLIA Certificate of Waiver number `05D1234567` must be populated in Box 23.',
    calculationMath: 'Format: 10 characters. Character 3 is always the letter "D" (e.g., `10D9876543`).',
    keyRule: 'Lab tests on the FDA waiver list must be billed with Modifier QW (CLIA waived test) along with Box 23 CLIA number.',
    tags: ['CLIA', 'Box 23', 'Lab Tests', 'Modifier QW', 'FDA Waived']
  },
  {
    id: 'first-party-vs-third-party',
    category: 'compliance',
    title: 'First-Party vs. Third-Party Accounts',
    code: 'ACCOUNTS',
    shortDefinition: 'First-Party: Direct provider billing with full authority; Third-Party: Subcontracted agency with limited adjustment rights.',
    detailedExplanation: 'First-Party AR: The billing agency or internal team is directly contracted with the hospital/clinic, possessing live access to the provider’s EHR/PM system, full authority to post adjustments, submit appeals, and sign settlements. Third-Party AR: An offshore or subcontracted vendor working under a primary US billing company. Third-party AR agents typically have restricted permissions: they can status claims and make calls, but must escalate write-offs, refunds, and appeals back to the first-party client.',
    realWorldExample: 'A third-party AR rep in Mumbai discovers an untimely filing denial (CO-29). They cannot write off the $800 charge; they must draft an escalation ticket with call reference details for the US client manager to authorize.',
    calculationMath: 'First-Party: Direct Provider -> AR Team. Third-Party: Provider -> US Billing Agency -> Subcontracted BPO.',
    keyRule: 'Third-party callers must know their client SOP escalation limits for adjustments and write-offs.',
    tags: ['First-Party', 'Third-Party', 'BPO', 'SOP Escalation', 'Authority']
  },
  {
    id: 'ipa-network',
    category: 'compliance',
    title: 'Independent Physician Association (IPA)',
    code: 'IPA',
    shortDefinition: 'An organized legal consortium of independent private-practice doctors joined to negotiate managed care HMO contracts.',
    detailedExplanation: 'Private physicians join an IPA to preserve private ownership while gaining collective bargaining power with large HMO payers. The IPA often manages credentialing, utilization review, prior authorizations, and claims payment adjudication under risk-sharing or capitation agreements (e.g., delegated payer models). Claims for HMO patients assigned to an IPA must be submitted to the IPA, not the parent commercial health plan!',
    realWorldExample: 'Patient has Anthem Blue Cross HMO, but the insurance card specifies "Assigned IPA: Heritage Provider Network". Claim must be billed to Heritage IPA’s clearinghouse Payer ID, not Anthem Blue Cross directly.',
    calculationMath: 'Independent Practices (10–500) -> IPA Central Management -> HMO Payer Contract.',
    keyRule: 'Always check the member ID card for IPA name and delegated claims submission mailing address/Payer ID.',
    tags: ['IPA', 'Delegated Payer', 'HMO Network', 'Independent Practice']
  }
];
