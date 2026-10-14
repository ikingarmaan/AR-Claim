import { QuizQuestion } from '../types/rcm';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Module 1: Foundations & Terminology
  {
    id: 1,
    module: 'foundations',
    category: 'Cost-Sharing',
    question: 'A Medicare Part B patient visits a participating doctor for a consultation. The billed charge is $350, and the Medicare allowed amount is $150. The patient has not met their annual deductible. How much does Medicare pay, and what does the patient owe?',
    options: [
      'Medicare pays $150; patient owes $0.',
      'Medicare pays $0; patient owes $150 (assigned as PR-1).',
      'Medicare pays $120; patient owes $30 (20% coinsurance).',
      'Medicare pays $0; patient owes $350.'
    ],
    correctIndex: 1,
    explanation: 'Because the patient has not satisfied their annual deductible, Medicare pays $0 and assigns the full allowed amount ($150) to Patient Responsibility (PR-1). The doctor cannot balance bill the $200 difference ($350 - $150) because they are a participating provider.',
    difficulty: 'beginner'
  },
  {
    id: 2,
    module: 'foundations',
    category: 'Billing Mechanics',
    question: 'What is CARC CO-45, and what must the billing department do with this balance for an in-network provider?',
    options: [
      'It represents patient coinsurance and must be billed to the subscriber.',
      'It represents an invalid diagnosis code and requires a resubmission.',
      'It is the contractual adjustment (charge exceeding fee schedule) and must be written off.',
      'It is a pre-authorization denial requiring a peer-to-peer review.'
    ],
    correctIndex: 2,
    explanation: 'CO-45 represents the contractual write-off between the provider’s billed charge and the insurance company’s allowed rate. In-network providers are legally prohibited from balance billing CO-45 to the patient.',
    difficulty: 'beginner'
  },
  {
    id: 3,
    module: 'foundations',
    category: 'Billing Mechanics',
    question: 'When an insurance company recovers an overpayment from a historical claim by deducting that amount from a current remittance payment on new claims, what is this process called?',
    options: [
      'Capitation',
      'Payer Offset (Recoupment / Clawback)',
      'Subrogation',
      'Coordination of Benefits'
    ],
    correctIndex: 1,
    explanation: 'An offset occurs when an insurer claws back funds from future claim payments to satisfy an earlier overpayment or audit adjustment.',
    difficulty: 'intermediate'
  },
  {
    id: 4,
    module: 'foundations',
    category: 'Compliance & Identifiers',
    question: 'Which provider identifier is a 10-digit intelligence-free number required on all HIPAA electronic claim transactions to identify healthcare providers?',
    options: [
      'TIN (Taxpayer Identification Number)',
      'PTAN (Provider Transaction Access Number)',
      'NPI (National Provider Identifier)',
      'CLIA Number'
    ],
    correctIndex: 2,
    explanation: 'The National Provider Identifier (NPI) is the 10-digit HIPAA standard identifier issued via NPPES. TIN is 9 digits, PTAN is a Medicare-only number, and CLIA is for clinical laboratory certification.',
    difficulty: 'beginner'
  },
  {
    id: 5,
    module: 'foundations',
    category: 'Compliance & Identifiers',
    question: 'In an offshore Third-Party AR Account setting, what is the standard protocol when an AR caller identifies an untimely filing denial (CO-29)?',
    options: [
      'Immediately write off the claim in the client’s practice management system.',
      'Bill the balance directly to the patient.',
      'Document call findings, attach POTF, and escalate to the US first-party client manager per SOP.',
      'Submit a duplicate claim with a different provider NPI.'
    ],
    correctIndex: 2,
    explanation: 'Third-party AR specialists typically have restricted adjustment authority and must document the investigation and escalate to the US first-party client manager for approval before any financial write-off.',
    difficulty: 'intermediate'
  },
  {
    id: 6,
    module: 'foundations',
    category: 'Cost-Sharing',
    question: 'What is Capitation (PMPM)?',
    options: [
      'A fee paid every time a patient visits the emergency department.',
      'A fixed monthly prospective payment per enrolled member paid to a provider regardless of whether services are used.',
      'The penalty fee assessed against providers for HIPAA violations.',
      'The copay amount paid by Medicare Advantage patients for specialty drugs.'
    ],
    correctIndex: 1,
    explanation: 'Capitation is a managed care payment arrangement where a medical practice receives a fixed Per Member Per Month (PMPM) sum to manage all healthcare needs for an enrolled panel.',
    difficulty: 'intermediate'
  },

  // Module 2: Claim Forms Explorer
  {
    id: 7,
    module: 'claim-forms',
    category: 'CMS-1500',
    question: 'What is the purpose of CMS-1500 Box 13, and what happens if it is left blank or answered "No"?',
    options: [
      'It represents Release of Information (ROI); the claim is rejected immediately.',
      'It represents Assignment of Benefits (AOB); the insurance check will be sent directly to the patient rather than the doctor.',
      'It specifies the Prior Authorization number; claim denies CO-197.',
      'It contains the Referring Provider NPI.'
    ],
    correctIndex: 1,
    explanation: 'Box 13 is Assignment of Benefits (AOB). If not signed (or "SOF" on file), the insurance carrier is legally required to mail the reimbursement check directly to the patient’s home address.',
    difficulty: 'intermediate'
  },
  {
    id: 8,
    module: 'claim-forms',
    category: 'CMS-1500',
    question: 'When submitting a Corrected or Replacement Claim on a CMS-1500 form, which box must be populated with Resubmission Code "7" and the Original Claim Reference / ICN number?',
    options: [
      'Box 19',
      'Box 22',
      'Box 23',
      'Box 10d'
    ],
    correctIndex: 1,
    explanation: 'Box 22 is designated for Medicaid / Resubmission. Code "7" indicates a Replacement/Corrected Claim, and the Original Reference number (ICN/DCN) must be populated in the adjacent field.',
    difficulty: 'intermediate'
  },
  {
    id: 9,
    module: 'claim-forms',
    category: 'CMS-1500',
    question: 'Which box on the CMS-1500 is used to report a 10-digit CLIA number when in-office laboratory tests (e.g. rapid strep or COVID tests) are billed?',
    options: [
      'Box 17B',
      'Box 21',
      'Box 23',
      'Box 32B'
    ],
    correctIndex: 2,
    explanation: 'Box 23 is a multi-purpose field that accommodates Prior Authorization, Referral numbers, or the 10-digit CLIA certification number for lab testing.',
    difficulty: 'beginner'
  },
  {
    id: 10,
    module: 'claim-forms',
    category: 'CMS-1500',
    question: 'Why will entering a P.O. Box in CMS-1500 Box 32 (Service Facility Location Information) result in an immediate clearinghouse or payer rejection?',
    options: [
      'Box 32 is strictly for the patient’s home address.',
      'Box 32 must be the physical physical location where services were rendered to accurately calculate locality fee schedules.',
      'P.O. Boxes are only allowed on hospital UB-04 forms.',
      'The clearinghouse only accepts P.O. Boxes if an NPI is entered in Box 33.'
    ],
    correctIndex: 1,
    explanation: 'Box 32 mandates the physical street address of the service facility because payers determine geographic locality reimbursement (GPCI/RVUs) based on where care was physically delivered.',
    difficulty: 'intermediate'
  },
  {
    id: 11,
    module: 'claim-forms',
    category: 'UB-04',
    question: 'On an institutional UB-04 claim form, what is the role of 4-digit Revenue Codes (e.g. 0450, 0250, 0110)?',
    options: [
      'They identify the rendering doctor’s sub-specialty.',
      'They identify the hospital department or specific type of facility accommodation where services occurred.',
      'They represent the patient’s primary diagnosis.',
      'They are the equivalent of CPT surgical modifiers.'
    ],
    correctIndex: 1,
    explanation: 'Revenue codes (Form Locator 42) tell the payer which hospital department or cost center provided the service (e.g., 0450 Emergency Room, 0250 Pharmacy, 0110 Room & Board).',
    difficulty: 'beginner'
  },
  {
    id: 12,
    module: 'claim-forms',
    category: 'UB-04',
    question: 'On a UB-04, what is the difference between Value Codes and Occurrence Codes?',
    options: [
      'Value Codes report dates ("When"); Occurrence Codes report dollar figures ("How much").',
      'Value Codes report monetary amounts or measurable units ("How much"); Occurrence Codes report significant event dates ("When").',
      'Value Codes are only used for Medicare; Occurrence Codes are only for Medicaid.',
      'Value Codes represent ICD-10 diagnosis codes; Occurrence Codes represent revenue codes.'
    ],
    correctIndex: 1,
    explanation: 'Value Codes (FL 39–41) report measurable units or dollar values (e.g., Code 80 Covered days, Code 01 Semi-private room rate). Occurrence Codes (FL 31–34) report specific calendar dates (e.g., Code 01 Auto accident date, Code 11 Onset of illness).',
    difficulty: 'advanced'
  },

  // Module 3: US Insurance Ecosystem & Payers
  {
    id: 13,
    module: 'insurance-payers',
    category: 'Medicare',
    question: 'Which of the following patients is NOT automatically eligible for Medicare entitlement?',
    options: [
      'An individual turning 65 years old who is a US citizen or permanent resident of 5+ years.',
      'An individual under 65 who has received SSDI (Social Security Disability) for 24 months.',
      'An individual diagnosed with End-Stage Renal Disease (ESRD) requiring chronic dialysis.',
      'A low-income 30-year-old single parent with no disability.'
    ],
    correctIndex: 3,
    explanation: 'A low-income non-disabled adult qualifies for Medicaid, not Medicare. Medicare eligibility is based on age (65+), 24 months of SSDI disability, ESRD, ALS (Lou Gehrig’s), or Black Lung.',
    difficulty: 'beginner'
  },
  {
    id: 14,
    module: 'insurance-payers',
    category: 'Medicare',
    question: 'What is Medicare Part C commonly known as, and how does it function?',
    options: [
      'Medigap; it is a federal program that pays hospital deductibles.',
      'Medicare Advantage; it is an alternative managed care plan provided by private commercial insurers combining Parts A, B, and usually D.',
      'Medicare Prescription Drug Plan; it covers retail pharmacy medications exclusively.',
      'Medicaid Crossover; it is for dual-eligible nursing home residents.'
    ],
    correctIndex: 1,
    explanation: 'Medicare Part C is Medicare Advantage. Private approved insurance companies (like Humana, UHC, Aetna) replace Original Medicare, offering bundled coverage often with dental/vision extras.',
    difficulty: 'beginner'
  },
  {
    id: 15,
    module: 'insurance-payers',
    category: 'Medicare Secondary Payer',
    question: 'Under Medicare Secondary Payer (MSP) rules, when a 68-year-old employed patient is covered by an Employer Group Health Plan (EGHP) where the company has 50 employees, which plan is primary?',
    options: [
      'Medicare is Primary; the employer plan is Secondary.',
      'The Employer Group Health Plan (EGHP) is Primary; Medicare is Secondary (MSP Code 12).',
      'The plans share costs equally on a 50/50 basis.',
      'Whichever policy was active longer is primary.'
    ],
    correctIndex: 1,
    explanation: 'Under the Working Aged MSP rules (Code 12), for employers with 20 or more employees, the Employer Group Health Plan is PRIMARY, and Medicare is SECONDARY.',
    difficulty: 'intermediate'
  },
  {
    id: 16,
    module: 'insurance-payers',
    category: 'COB & Birthday Rule',
    question: 'Parent A was born on June 18, 1982. Parent B was born on April 24, 1980. Both parents have employer-sponsored health insurance covering their dependent child. According to the Birthday Rule, which parent’s insurance is primary?',
    options: [
      'Parent B’s insurance, because Parent B was born in 1980 (older parent).',
      'Parent B’s insurance, because April comes before June in the calendar year.',
      'Parent A’s insurance, because Parent A’s birthday is earlier in the month (18th vs 24th).',
      'Whichever parent has the highest deductible plan is primary.'
    ],
    correctIndex: 1,
    explanation: 'The Birthday Rule strictly evaluates the calendar MONTH and DAY, completely ignoring the birth year. Since Parent B’s birthday is in April and Parent A’s is in June, Parent B’s plan is PRIMARY.',
    difficulty: 'intermediate'
  },
  {
    id: 17,
    module: 'insurance-payers',
    category: 'Managed Care',
    question: 'How does an EPO (Exclusive Provider Organization) plan differ from an HMO plan?',
    options: [
      'EPO plans allow unrestricted out-of-network benefits, whereas HMO plans do not.',
      'EPO plans require care to be in-network like an HMO, but generally do NOT require patients to obtain PCP referrals to see specialists.',
      'EPO plans are administered by the federal government, while HMOs are state-run.',
      'EPO plans only cover prescription drugs.'
    ],
    correctIndex: 1,
    explanation: 'Like HMOs, EPOs generally do not cover out-of-network non-emergency care. However, unlike HMOs, EPOs do not force patients to select a PCP gatekeeper or obtain written referrals to see specialists.',
    difficulty: 'intermediate'
  },
  {
    id: 18,
    module: 'insurance-payers',
    category: 'Hospital Rules',
    question: 'What is the CMS 72-Hour Rule (3-Day Payment Window)?',
    options: [
      'Hospitals must discharge patients within 72 hours of admission.',
      'All diagnostic and related outpatient hospital services provided within 72 hours prior to an inpatient admission must be bundled into the inpatient UB-04 claim.',
      'Payers have 72 hours to adjudicate clean electronic claims.',
      'Prior authorizations expire 72 hours after clinical issuance.'
    ],
    correctIndex: 1,
    explanation: 'Under CMS guidelines, diagnostic and clinically related outpatient services performed by the hospital within 3 calendar days prior to an inpatient admission cannot be billed separately; they must be bundled into the Part A DRG payment.',
    difficulty: 'advanced'
  },
  {
    id: 19,
    module: 'insurance-payers',
    category: 'Medicaid',
    question: 'What is Medicaid "Spenddown" (Medically Needy Program)?',
    options: [
      'A mandatory fee charged to all Medicaid recipients every month.',
      'A process where individuals whose income exceeds state Medicaid eligibility limits deduct incurred medical bills to lower their countable income to qualify for coverage.',
      'The rate at which state governments reduce Medicaid funding annually.',
      'An automatic recoupment of overpayments by state Medicaid agencies.'
    ],
    correctIndex: 1,
    explanation: 'Spenddown functions like an insurance deductible for Medicaid: patients with excess income submit medical expenses to offset their income down to the state’s Medically Needy Income Limit (MNIL).',
    difficulty: 'advanced'
  },

  // Module 4: Medical Coding & Modifiers
  {
    id: 20,
    module: 'coding-modifiers',
    category: 'CPT Structure',
    question: 'According to AMA CPT guidelines, what is the "3-Year Rule" used to distinguish a New Patient (99202–99205) from an Established Patient (99211–99215)?',
    options: [
      'A patient who has not been seen by any physician in the entire hospital within the last 3 years.',
      'A patient who has not received any professional services from the physician or another physician of the exact same specialty in the same group practice within the past 3 years.',
      'A patient who changed insurance plans within the last 3 years.',
      'A patient who has not undergone major surgery within the last 3 years.'
    ],
    correctIndex: 1,
    explanation: 'A patient is classified as "New" if they have not received any face-to-face professional service from the physician or another physician of the same specialty in the same group practice within the preceding 3 years.',
    difficulty: 'intermediate'
  },
  {
    id: 21,
    module: 'coding-modifiers',
    category: 'Modifier 25',
    question: 'A 50-year-old patient presents for an annual preventive wellness exam (99396). During the visit, the patient develops severe acute chest pain and dizziness. The physician spends 30 minutes conducting an independent evaluation, ordering an ECG, and managing acute unstable angina. How should this encounter be coded?',
    options: [
      'Bill only 99396; preventive visits bundle all illness discussions.',
      'Bill 99396 on Line 1, and 99214-25 on Line 2 with independent diagnosis ICD-10 codes.',
      'Bill 99214 on Line 1, and append Modifier 59 to 99396.',
      'Bill 99396 with Modifier 52 (reduced services).'
    ],
    correctIndex: 1,
    explanation: 'Modifier 25 is appended to the problem-oriented E&M service (99214-25) to show that a significant, separately identifiable evaluation and management service was rendered on the same day as a preventive exam.',
    difficulty: 'intermediate'
  },
  {
    id: 22,
    module: 'coding-modifiers',
    category: 'Modifier 59 vs XS',
    question: 'A surgeon performs an upper gastrointestinal endoscopy (EGD - CPT 43235) and a lower screening colonoscopy (CPT 45378) during the same anesthesia session. Which CMS NCCI modifier should be appended to the EGD to specify that it was performed on a distinct anatomical organ/structure?',
    options: [
      'Modifier XE',
      'Modifier XS',
      'Modifier XP',
      'Modifier 76'
    ],
    correctIndex: 1,
    explanation: 'CMS established Modifier XS (Separate Structure) to indicate that a service was performed on a separate anatomical organ or structure (Upper GI vs Lower GI tract), which is more specific than Modifier 59.',
    difficulty: 'advanced'
  },
  {
    id: 23,
    module: 'coding-modifiers',
    category: 'Repeat Modifiers',
    question: 'A hospitalized patient has blood drawn for a Comprehensive Metabolic Panel (80053) at 8:00 AM. At 2:00 PM, because of worsening electrolyte collapse in the ICU, the physician orders an identical repeat 80053 panel. Which modifier must be appended to the 2:00 PM lab charge?',
    options: [
      'Modifier 76',
      'Modifier 59',
      'Modifier 91',
      'Modifier 77'
    ],
    correctIndex: 2,
    explanation: 'Modifier 91 is used exclusively for repeat clinical diagnostic laboratory tests (80000 series) on the same day for serial monitoring or valid clinical repeats. Modifiers 76 and 77 are for procedures, not automated lab tests.',
    difficulty: 'intermediate'
  },
  {
    id: 24,
    module: 'coding-modifiers',
    category: 'Repeat Modifiers',
    question: 'An emergency room resident attempts endotracheal intubation (CPT 31500) but is unsuccessful. The attending critical care anesthesiologist Dr. Smith steps in and successfully intubates the patient. How should Dr. Smith’s intubation service be billed?',
    options: [
      'CPT 31500 with Modifier 76',
      'CPT 31500 with Modifier 77',
      'CPT 31500 with Modifier 22',
      'It cannot be billed because it was attempted earlier on the same day.'
    ],
    correctIndex: 1,
    explanation: 'Modifier 77 indicates a repeat procedure performed on the same calendar day by a DIFFERENT physician or healthcare professional. (Modifier 76 would be used if the same physician repeated it).',
    difficulty: 'intermediate'
  },
  {
    id: 25,
    module: 'coding-modifiers',
    category: 'Hospice Modifiers',
    question: 'A patient enrolled in Medicare hospice for terminal congestive heart failure trips over a garden hose and fractures their left wrist. The orthopedic surgeon treats the fracture in the clinic. Which modifier MUST be appended to the surgeon’s claim so Medicare Part B will pay?',
    options: [
      'Modifier GV',
      'Modifier GW',
      'Modifier GA',
      'Modifier 25'
    ],
    correctIndex: 1,
    explanation: 'Modifier GW certifies that the service rendered to a hospice patient is completely UNRELATED to their terminal hospice condition. Without GW, Medicare auto-denies the claim under hospice exclusion rules.',
    difficulty: 'advanced'
  },
  {
    id: 26,
    module: 'coding-modifiers',
    category: 'Global Surgical Package',
    question: 'What is the duration of the post-operative global surgical period for a major surgical procedure (e.g. total hip replacement or open cholecystectomy)?',
    options: [
      '000 days',
      '010 days',
      '090 days',
      '180 days'
    ],
    correctIndex: 2,
    explanation: 'Major surgeries carry a 090-day global surgical period, which includes 1 pre-operative day, the day of surgery, and 90 post-operative days during which routine follow-up care is inclusive in the surgical fee.',
    difficulty: 'beginner'
  },
  {
    id: 27,
    module: 'coding-modifiers',
    category: 'Drug Coding',
    question: 'What is the required structure and format of an 11-digit National Drug Code (NDC) when billing injectable HCPCS J-codes?',
    options: [
      '11 alphanumeric digits starting with letter "J".',
      '5-4-2 configuration: 5 digits (Manufacturer/Labeler), 4 digits (Product), 2 digits (Package size).',
      '10 numeric digits plus a check digit.',
      '3-digit state code followed by 8-digit pharmacy license.'
    ],
    correctIndex: 1,
    explanation: 'The HIPAA 11-digit NDC format uses an unhyphenated 5-4-2 format (`XXXXX-XXXX-XX`), representing the labeler, product code, and package commercial size.',
    difficulty: 'advanced'
  },

  // Module 5: AR Analytics & Aging
  {
    id: 28,
    module: 'ar-analytics',
    category: 'KPIs',
    question: 'A medical group has an average gross monthly billing of $900,000 ($30,000/day) and currently carries $1,050,000 in total outstanding Accounts Receivable. What is their Days in AR (DAR), and does it meet industry benchmarks?',
    options: [
      '25 Days; fails industry benchmark.',
      '35 Days; meets industry benchmark (< 40 days).',
      '55 Days; critical danger status.',
      '70 Days; fails industry benchmark.'
    ],
    correctIndex: 1,
    explanation: 'Days in AR = Total AR ($1,050,000) / Average Daily Charges ($30,000) = 35.0 Days. This is below the industry threshold of 40 days and represents healthy financial velocity.',
    difficulty: 'intermediate'
  },
  {
    id: 29,
    module: 'ar-analytics',
    category: 'KPIs',
    question: 'What is the healthcare industry benchmark target for Clean Claim Rate (CCR)?',
    options: [
      'At least 75%',
      'At least 85%',
      'At least 95%',
      '100% exactly'
    ],
    correctIndex: 2,
    explanation: 'Leading healthcare organizations maintain a Clean Claim Rate of >= 95%. Higher clean claim rates reduce manual re-work, decrease days in AR, and prevent unnecessary phone follow-ups.',
    difficulty: 'beginner'
  },
  {
    id: 30,
    module: 'ar-analytics',
    category: 'Aging Buckets',
    question: 'When prioritizing an aging AR inventory of 500 unpaid claims, which prioritization model produces the highest cash recovery velocity?',
    options: [
      'First In, First Out (FIFO): Work oldest 120+ day claims regardless of dollar amount.',
      'Alphabetical order by patient last name.',
      'Stratified Matrix: High-Dollar Claims + Near Timely Filing Limit (TFL) first.',
      'Smallest dollar balances first to clear unit count quickly.'
    ],
    correctIndex: 2,
    explanation: 'Best-in-class AR teams prioritize high-dollar claims nearing their payer timely filing deadline to recover maximum cash before legal filing rights expire, supported by stratified batch sampling.',
    difficulty: 'intermediate'
  },
  {
    id: 31,
    module: 'ar-analytics',
    category: 'Documentation',
    question: 'Which of the following contains all 6 mandatory audit-trail elements required in a professional AR follow-up note?',
    options: [
      'Date of Call, Rep Name, Call Reference #, Claim Status, Action Taken, and Next Follow-up Date.',
      'Patient Name, Doctor NPI, Insurance Name, and Check Number.',
      'Date of Service, CPT code, Diagnosis Code, and Paid Amount.',
      'Rep Name, Call Duration, Rep Phone Number, and Supervisor Name.'
    ],
    correctIndex: 0,
    explanation: 'An audit-ready AR note must include: 1. Date of Follow-up, 2. Rep Name, 3. Call Reference #, 4. Current Claim Status, 5. Action Taken, and 6. Next Follow-up Date.',
    difficulty: 'intermediate'
  },

  // Module 6: AR Call Scenarios & Appeals
  {
    id: 32,
    module: 'ar-playbook',
    category: 'Scenario 1: CNOF',
    question: 'An AR caller contacts a commercial payer for a 45-day-old claim. The rep states "Claim is Not on File (CNOF)". What is the immediate first step the AR caller should take?',
    options: [
      'Immediately bill the patient for the full balance.',
      'Verify clearinghouse EDI 277CA acceptance reports to ensure the electronic claim reached the payer, and confirm the Payer ID and claims address.',
      'Write off the balance as untimely filing.',
      'Call the state insurance commissioner.'
    ],
    correctIndex: 1,
    explanation: 'The caller must verify if the clearinghouse successfully transmitted the claim to the payer (277CA acceptance report). If accepted, the EDI trace proves timely receipt. Then verify the electronic Payer ID and mailing address before resubmitting.',
    difficulty: 'intermediate'
  },
  {
    id: 33,
    module: 'ar-playbook',
    category: 'Scenario 6: Untimely Filing',
    question: 'A claim for $1,200 is denied with CARC CO-29 ("Time limit for filing has expired"). Provider contract allows 90-day TFL. The billing department has a clearinghouse 277CA report showing acceptance on Day 28 from DOS. What should the AR team do?',
    options: [
      'Write off the $1,200 immediately.',
      'Bill the patient with a note explaining the late filing.',
      'Submit a formal first-level appeal with Proof of Timely Filing (POTF) attaching the EDI 277CA timestamped acceptance receipt.',
      'Change the Date of Service to a more recent date and resubmit.'
    ],
    correctIndex: 2,
    explanation: 'When valid Proof of Timely Filing (POTF / EDI 277CA) exists proving the claim was submitted within the 90-day limit, the provider must file an appeal with this proof to overturn the CO-29 denial.',
    difficulty: 'intermediate'
  },
  {
    id: 34,
    module: 'ar-playbook',
    category: 'Scenario 9: Prior Auth',
    question: 'A surgeon’s claim is denied under CARC CO-197 for missing prior authorization. The patient was admitted through the hospital Emergency Department for acute emergency surgery. What is the most effective resolution strategy?',
    options: [
      'Bill the patient immediately under emergency care rules.',
      'Request a retrospective authorization (retro-auth) within the payer’s emergency TAT window, or link the surgeon claim to the hospital facility’s approved inpatient auth.',
      'Write off the surgical fee with zero appeal.',
      'Resubmit the claim with Modifier 59.'
    ],
    correctIndex: 1,
    explanation: 'For emergency admissions, payers typically permit a 72-hour retrospective authorization. Furthermore, the surgeon’s billing team can check if the facility obtained an inpatient auth number and link the professional claim to that existing approval.',
    difficulty: 'advanced'
  },
  {
    id: 35,
    module: 'ar-playbook',
    category: 'Scenario 10: COB',
    question: 'A claim is denied under CARC CO-22 ("Care may be covered by another payer per coordination of benefits"). The payer rep explains the member has not completed their annual coordination questionnaire. Can the AR caller update the COB verbally on behalf of the member?',
    options: [
      'Yes, any billing representative can verbally update COB for the patient.',
      'No, payers legally require the member/subscriber to contact customer service directly to update their own COB records.',
      'Yes, if the provider writes a letter to the medical director.',
      'No, the provider must automatically write off the claim.'
    ],
    correctIndex: 1,
    explanation: 'Insurers do not accept COB updates from providers. The subscriber/patient must personally contact the member services department or complete the online coordination questionnaire to verify other coverage.',
    difficulty: 'intermediate'
  },
  {
    id: 36,
    module: 'ar-playbook',
    category: 'Appeals Process',
    question: 'In the 4-Tier Appeal Process, what is Tier 3 (Peer-to-Peer Review)?',
    options: [
      'A dispute between two billing clerks from different practices.',
      'A direct telephonic discussion between the treating physician and the insurance company’s Medical Director to defend clinical necessity.',
      'A lawsuit filed in federal district court.',
      'An arbitration hearing conducted by the American Medical Association.'
    ],
    correctIndex: 1,
    explanation: 'Tier 3 Peer-to-Peer Review connects the treating clinician directly with the payer’s Medical Director (typically a physician of the same specialty) to discuss clinical nuances and reverse denials on the spot.',
    difficulty: 'intermediate'
  },
  {
    id: 37,
    module: 'ar-playbook',
    category: 'CARC / RARC',
    question: 'Which Remark Code (RARC) attached to a CARC CO-16 denial indicates that an 11-digit National Drug Code (NDC) is missing or invalid on an injectable medication line?',
    options: [
      'RARC M86',
      'RARC MA120',
      'RARC N382',
      'RARC M144'
    ],
    correctIndex: 2,
    explanation: 'RARC N382 stands for "Missing/incomplete/invalid National Drug Code (NDC) or unit of measure". (MA120 is missing CLIA, M86 is duplicate, M144 is pre-op period).',
    difficulty: 'advanced'
  },

  // Module 7: Call Scripts & NATO Phonetics
  {
    id: 38,
    module: 'call-scripts',
    category: 'NATO Phonetics',
    question: 'When communicating a patient Member ID containing the letters "M", "N", and "Z" over the telephone to an insurance representative, what are the correct standard NATO phonetic words to use?',
    options: [
      'Mary, Nancy, Zebra',
      'Mike, November, Zulu',
      'Metro, North, Zero',
      'Michael, New York, Zanzibar'
    ],
    correctIndex: 1,
    explanation: 'The international NATO phonetic alphabet uses "Mike" for M, "November" for N, and "Zulu" for Z. Informal names like "Mary", "Nancy", or "Zebra" cause frequent audio confusion.',
    difficulty: 'beginner'
  },
  {
    id: 39,
    module: 'call-scripts',
    category: 'Call Scripts',
    question: 'Why is it mandatory for an AR caller to obtain both the Representative Name AND the Call Reference Number before ending an insurance follow-up call?',
    options: [
      'To verify the representative’s personal salary.',
      'To provide an unchallengeable legal audit trail proving when and with whom the provider verified benefits, preserved timely filing, or requested claim reprocessing.',
      'It is only needed if the call lasted longer than 15 minutes.',
      'To report the representative to CMS.'
    ],
    correctIndex: 1,
    explanation: 'The Call Reference Number and Rep Name serve as concrete proof of communication in case the claim remains unpaid, the tape needs retrieval, or a timely filing appeal is required.',
    difficulty: 'beginner'
  },
  {
    id: 40,
    module: 'call-scripts',
    category: 'Call Scripts',
    question: 'During a GPD eligibility verification call, why must the caller ask whether the deductible operates on a "Calendar Year" or "Plan/Benefit Year"?',
    options: [
      'Calendar year deductibles reset on January 1st, whereas plan year deductibles reset on the employer’s policy renewal anniversary date (e.g. July 1st).',
      'Plan year deductibles never reset.',
      'Calendar year deductibles only apply to pediatric patients.',
      'There is no operational difference.'
    ],
    correctIndex: 0,
    explanation: 'If a plan operates on a Benefit/Plan year (e.g. Oct 1 to Sept 30), a patient who had satisfied their deductible in August will have it reset on October 1st, dramatically impacting patient collections.',
    difficulty: 'intermediate'
  },

  // Bonus Comprehensive Scenarios
  {
    id: 41,
    module: 'foundations',
    category: 'Cost-Sharing Math',
    question: 'Patient has an 80/20 commercial PPO policy with a $500 deductible (of which $400 has already been met) and a $20 copay for office visits. The physician bills $300 for CPT 99214; the payer allowable amount is $150. Assuming the plan applies deductible before coinsurance and copay does not apply to office procedures, what does the patient owe?',
    options: [
      '$150',
      '$100 (remaining deductible) + $10 (20% coinsurance on remaining $50) = $110 total.',
      '$300 full billed charge.',
      '$20 copay only.'
    ],
    correctIndex: 1,
    explanation: 'Allowed amount is $150. Remaining deductible is $100 ($500 - $400), which the patient owes in full. That leaves $50 covered under coinsurance: payer pays 80% ($40), patient pays 20% ($10). Total patient liability = $100 + $10 = $110.',
    difficulty: 'advanced'
  },
  {
    id: 42,
    module: 'coding-modifiers',
    category: 'Bilateral Billing',
    question: 'An orthopedic surgeon performs bilateral total knee replacements (CPT 27447) in the same operating session. Medicare standard bilateral payment policy applies (150% reimbursement). How should this typically be reported on a professional CMS-1500 claim?',
    options: [
      'Line 1: 27447. Line 2: 27447 with Modifier 59.',
      'Line 1: 27447 with Modifier 50 (1 unit). Payer automatically calculates 150% of the allowable fee.',
      'Line 1: 27447-50 with 2 units.',
      'Bilateral total knee surgeries cannot be billed on the same day.'
    ],
    correctIndex: 1,
    explanation: 'Under CMS Medicare rules, bilateral procedures subject to the 150% bilateral fee schedule are reported on a single line item with CPT Modifier 50 and 1 unit of service. Medicare system software automatically computes 150% of the allowable rate.',
    difficulty: 'advanced'
  }
];
