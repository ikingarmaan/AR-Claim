// =========================================================================
// RCMclaim — Call Scripts, NATO Phonetic Alphabet & Verification Playbooks
// Field-tested scripts from Jobs Notes: GPD, Short Professional, and ER Inpatient Auth
// =========================================================================

export interface NatoLetter {
  letter: string;
  word: string;
  phonetic: string;
  tip: string;
  medicalExample: string;
}

export const NATO_ALPHABET_MASTER: NatoLetter[] = [
  { letter: 'A', word: 'Alfa', phonetic: 'AL-FAH', tip: 'Avoid confusing with "Alpha"', medicalExample: 'Aetna Member ID prefix: "A12345678"' },
  { letter: 'B', word: 'Bravo', phonetic: 'BRAH-VOH', tip: 'Avoid confusing with "D" (Delta) or "P" (Papa)', medicalExample: 'Blue Cross prefix: "BCA"' },
  { letter: 'C', word: 'Charlie', phonetic: 'CHAR-LEE', tip: 'Clear "Ch" sound', medicalExample: 'Cigna Member ID: "C98765432"' },
  { letter: 'D', word: 'Delta', phonetic: 'DELL-TAH', tip: 'Avoid confusing with "B" (Bravo)', medicalExample: 'Delta Dental Payer ID: "D9981"' },
  { letter: 'E', word: 'Echo', phonetic: 'ECK-OH', tip: 'Short "E" sound', medicalExample: 'Emblem Health ID: "E55443322"' },
  { letter: 'F', word: 'Foxtrot', phonetic: 'FOKS-TROT', tip: 'Avoid confusing with "S" (Sierra)', medicalExample: 'First Health Payer ID: "F8871"' },
  { letter: 'G', word: 'Golf', phonetic: 'GOLF', tip: 'Avoid confusing with "J" (Juliett)', medicalExample: 'GHI Payer ID: "G1122"' },
  { letter: 'H', word: 'Hotel', phonetic: 'HOH-TELL', tip: 'Emphasize aspirated "H"', medicalExample: 'Humana Member ID: "H88990011"' },
  { letter: 'I', word: 'India', phonetic: 'IN-DEE-AH', tip: 'Crisp short "I", never "Eye"', medicalExample: 'Independent Health: "I44332211"' },
  { letter: 'J', word: 'Juliett', phonetic: 'JEW-LEE-ETT', tip: 'Spelled with double "t"', medicalExample: 'Johns Hopkins HC: "JH123456"' },
  { letter: 'K', word: 'Kilo', phonetic: 'KEY-LOH', tip: 'Sharp "K"', medicalExample: 'Kaiser Permanente MRN: "K7766554"' },
  { letter: 'L', word: 'Lima', phonetic: 'LEE-MAH', tip: 'Like the city Lima, Peru', medicalExample: 'Louisiana Medicaid: "L9988776"' },
  { letter: 'M', word: 'Mike', phonetic: 'MIKE', tip: 'NEVER say "Mary" or "Mancy"; always say "Mike"', medicalExample: 'Molina Healthcare: "M33221144"' },
  { letter: 'N', word: 'November', phonetic: 'NO-VEM-BER', tip: 'NEVER say "Nancy"; always say "November"', medicalExample: 'Novitas Solutions MAC: "N12345"' },
  { letter: 'O', word: 'Oscar', phonetic: 'OSS-CAH', tip: 'Crisp "O"', medicalExample: 'Oxford Health ID: "O66778899"' },
  { letter: 'P', word: 'Papa', phonetic: 'PAH-PAH', tip: 'Avoid confusing with "B" or "D"', medicalExample: 'Palmetto GBA MAC: "P55443"' },
  { letter: 'Q', word: 'Quebec', phonetic: 'KEH-BECK', tip: 'Clear "Q" sound', medicalExample: 'QualChoice ID: "Q88112233"' },
  { letter: 'R', word: 'Romeo', phonetic: 'ROH-ME-OH', tip: 'Roll the "R"', medicalExample: 'Railroad Medicare MBI: "R44556677"' },
  { letter: 'S', word: 'Sierra', phonetic: 'SEE-AIR-RAH', tip: 'Avoid confusing with "F" (Foxtrot)', medicalExample: 'State Farm MedPay: "S1122334"' },
  { letter: 'T', word: 'Tango', phonetic: 'TANG-GO', tip: 'Crisp "T"', medicalExample: 'Tricare Military ID: "T99887766"' },
  { letter: 'U', word: 'Uniform', phonetic: 'YOU-NEE-FORM', tip: 'Clear "U"', medicalExample: 'UnitedHealthcare (UHC): "U12345678"' },
  { letter: 'V', word: 'Victor', phonetic: 'VIK-TAH', tip: 'Avoid confusing with "B" (Bravo)', medicalExample: 'Veterans Affairs (VA): "V7788990"' },
  { letter: 'W', word: 'Whiskey', phonetic: 'WISS-KEY', tip: 'Clear "Wh" sound', medicalExample: 'WellCare Medicare ID: "W55667788"' },
  { letter: 'X', word: 'X-ray', phonetic: 'ECKS-RAY', tip: 'Sharp "X"', medicalExample: 'Blue Cross Alpha Prefix: "XEA123456"' },
  { letter: 'Y', word: 'Yankee', phonetic: 'YANG-KEY', tip: 'Clear "Y"', medicalExample: 'BCBS Prefix: "YKA987654"' },
  { letter: 'Z', word: 'Zulu', phonetic: 'ZOO-LOO', tip: 'NEVER say "Zebra"; always say "Zulu"', medicalExample: 'Medicare Beneficiary Identifier (MBI): "1Z2A3B4CD5"' }
];

export interface ScriptDialogueSection {
  title: string;
  badge: string;
  callerDialogue: string;
  repExpectedResponse?: string;
  actionItems: string[];
  keyRules: string[];
}

export interface CallScriptDossier {
  id: string;
  title: string;
  category: 'eligibility-benefits' | 'prior-authorization' | 'claim-status' | 'denial-resolution';
  callerPersona: string;
  facility: string;
  targetDuration: string;
  purpose: string;
  verbatimOpening: string;
  sections: ScriptDialogueSection[];
  postCallDocumentation: {
    mandatoryFields: string[];
    sampleLedgerNote: string;
    escalationTrigger: string;
  };
}

export const MASTER_CALL_SCRIPTS: CallScriptDossier[] = [
  // =========================================================================
  // SCRIPT 1: GPD ELIGIBILITY & BENEFITS VERIFICATION SCRIPT (SMRITI)
  // =========================================================================
  {
    id: 'gpd-eligibility-benefits',
    title: 'GPD Eligibility & Benefits Verification Master Script',
    category: 'eligibility-benefits',
    callerPersona: 'Smriti (Patient Access / Eligibility Representative)',
    facility: '[Provider/Facility Name]',
    targetDuration: '5 – 8 Minutes',
    purpose: 'Comprehensive verification of patient policy status, effective dates, network participation, cost-sharing amounts (copay, deductible, coinsurance, OOP max), and authorization requirements before rendering services.',
    verbatimOpening: '"Please note that this call may be recorded for quality assurance and training purposes. Good morning/afternoon. My name is Smriti, calling from [Provider/Facility Name]. I am calling to verify a patient\'s eligibility and benefits. May I proceed?"',
    sections: [
      {
        title: '1. Opening & QA Recording Disclosure',
        badge: 'COMPLIANCE',
        callerDialogue: '"Please note that this call may be recorded for quality assurance and training purposes.\n\nGood morning/afternoon. My name is Smriti, calling from [Provider/Facility Name]. I am calling to verify a patient\'s eligibility and benefits. May I proceed?"',
        repExpectedResponse: '"Yes, you may proceed. Can I have your Billing NPI and Tax ID number for verification?"',
        actionItems: [
          'State recorded line disclosure immediately to comply with 2-party consent wiretapping laws (e.g., California, Florida, Illinois).',
          'Have CMS-1500 Box 33 NPI and Box 25 Federal Tax ID (TIN) ready.',
          'Speak clearly at a professional pace; state your name and facility cleanly.'
        ],
        keyRules: [
          'Mandatory compliance: Payer audio calls are retained for legal audit trails.',
          'If the rep asks for the physical practice address, provide the exact billing address registered on Box 33.'
        ]
      },
      {
        title: '2. Patient & Provider Information Authentication',
        badge: 'AUTHENTICATION',
        callerDialogue: '"The patient\'s information is as follows:\n\n• Full Name: [Patient Name]\n• Date of Birth: [MM/DD/YYYY]\n• Member ID: [Member ID]\n• Group Number: [Group Number, if available]\n\nThe provider information is:\n\n• NPI: [NPI Number]\n• Tax ID: [Tax ID Number]\n\nDate of Service: [MM/DD/YYYY]."',
        repExpectedResponse: '"Thank you Smriti, I have located the patient in our system. Provider Dr. [Doctor] is in our database. How can I help you today?"',
        actionItems: [
          'Use the NATO Phonetic Alphabet to spell alphanumeric Member IDs (e.g. "U-Uniform, 4-Four, 2-Two, Z-Zulu").',
          'Confirm the patient is the primary subscriber or a dependent child/spouse.',
          'State the planned Date of Service (DOS) to ensure active status on the exact service date.'
        ],
        keyRules: [
          'A policy can be active today but terminated on the DOS (or vice-versa). Always anchor to DOS.',
          'Never omit the Group Number if available—it identifies specific employer carve-outs.'
        ]
      },
      {
        title: '3. Eligibility Verification & Policy Status',
        badge: 'ELIGIBILITY CHECK',
        callerDialogue: '"Could you please verify the patient\'s eligibility and benefits for the date of service provided?\n\nI\'d also like to confirm:\n• Is the policy currently active?\n• What are the effective and termination dates?\n• If the policy is inactive, could you please advise the termination date and let me know if there is any other active coverage on file?\n• Is the provider in-network or out-of-network under this plan?\n• Is there any Coordination of Benefits (COB) information on file?\n• Could you provide the claims mailing address?"',
        repExpectedResponse: '"Policy is active with effective date 01/01/2026, no term date. The provider is in-network for this commercial PPO product. No other active coverage is flagged in COB. Claims go to PO Box 30555, Salt Lake City, UT 84130, Payer ID 87726."',
        actionItems: [
          'Record the exact Effective Date and Termination Date (if term date exists, request cancellation reason).',
          'Verify In-Network vs Out-of-Network status (OON creates huge patient financial exposure or non-coverage).',
          'Confirm COB update date. If COB has not been updated within 12 months, claims will deny CO-22.',
          'Write down both Electronic Payer ID (for 837P) and Physical Paper Claims Mailing Address.'
        ],
        keyRules: [
          'If policy is terminated on DOS: Ask the rep if there is any COBRA continuation or replacement policy on file.',
          'If provider is Out-of-Network: Ask whether the plan has Out-of-Network benefits (PPO vs HMO/EPO).'
        ]
      },
      {
        title: '4. Three-Tier Benefit Breakdown (Cost-Sharing)',
        badge: 'BENEFIT COVERAGE',
        callerDialogue: '"Could you also verify the benefits for:\n\n• Emergency Services\n• Outpatient Services\n• Inpatient Services\n\nPlease advise any applicable:\n• Copay\n• Coinsurance\n• Deductible (Individual & Family, met vs unmet)\n• Out-of-Pocket Maximum\n• Authorization or Referral Requirements"',
        repExpectedResponse: '"For Outpatient Office Visits: $30 Copay for primary care, $50 Copay for specialists. Deductible is $1,500 calendar year individual, $450 satisfied to date. Coinsurance is 80/20. Out-of-pocket maximum is $6,000 individual, $1,200 satisfied. Emergency ER copay is $250 waived if admitted. Inpatient requires prior auth through our Utilization Management portal."',
        actionItems: [
          'Itemize all 3 clinical tiers: Emergency, Outpatient, and Inpatient.',
          'Ask whether the deductible applies to office visits or only procedural services.',
          'Ask if the deductible counts towards the annual Out-of-Pocket (OOP) Maximum.',
          'Record whether a Primary Care Physician (PCP) Referral is required (crucial for HMO plans).'
        ],
        keyRules: [
          'Accumulator Reset Alert: In January, all calendar-year deductibles reset to $0. Expect high PR-1 patient responsibility.',
          'Authorization Trap: Inpatient admissions and advanced outpatient radiology (MRI, CT, PET) almost always require Prior Auth (EDI 278).'
        ]
      },
      {
        title: '5. Closing, Call Reference Number & Callback Number',
        badge: 'AUDIT TRAIL',
        callerDialogue: '"Thank you for verifying that information.\n\nMay I please have your name and a reference number for today\'s call for documentation purposes?\n\nAlso, if there are any questions regarding this verification, my callback number is 251-260-8237.\n\nI appreciate your time and assistance today. Have a wonderful day."',
        repExpectedResponse: '"You\'re very welcome! My name is Danielle, and your Call Reference Number is REF-8819204. Thank you for calling, and have a great day!"',
        actionItems: [
          'MANDATORY: Never hang up without the Payer Representative Name and Call Reference Number.',
          'State your callback phone number (251-260-8237) clearly for call logging.',
          'Record the date and time stamp of the call.'
        ],
        keyRules: [
          'If the claim denies later for eligibility, the Call Reference Number is your golden ticket to overturn the denial via appeal.',
          'Payer call reference numbers remain valid proof in appeal packets for up to 365 days.'
        ]
      }
    ],
    postCallDocumentation: {
      mandatoryFields: [
        'Payer Rep Name & ID',
        'Call Reference Number',
        'Policy Effective & Term Dates',
        'In-Network vs Out-of-Network Confirmation',
        'Individual Deductible (Total & Remaining Unmet)',
        'Copay / Coinsurance Amounts',
        'Out-of-Pocket Maximum Remaining',
        'Prior Auth Phone / Portal URL & Guidelines',
        'Electronic Payer ID & Paper Claims Mailing Address',
        'Callback Number (251-260-8237)'
      ],
      sampleLedgerNote: '02/14/2026 10:15 AM EST - Smriti (Eligibility Dept): Called Payer BCBS (Payer ID 87726). Spoke with rep Danielle, Call Ref # REF-8819204. Verified active policy for Eleanor Vance (DOB 04/12/1984, Member ID U42Z9981). Effective 01/01/2026, no term. Provider Dr. Reynolds is IN-NETWORK. Individual Ded: $1,500 total, $450 met, $1,050 remaining unmet. Copay: $50 specialist. Coinsurance: 80/20. OOP Max: $6,000 ($1,200 met). No PCP referral required. Prior auth required for CPT 73721 via eviCore. Claims Address: PO Box 30555, Salt Lake City, UT 84130. Callback left: 251-260-8237. Status: VERIFIED ACTIVE.',
      escalationTrigger: 'If rep states policy is inactive on DOS or COB dispute exists (e.g. other active employer coverage flagged), immediately notify front desk to contact patient for updated card before rendering non-emergent care.'
    }
  },

  // =========================================================================
  // SCRIPT 2: SHORT PROFESSIONAL VERSION (JOHN - MOST COMMONLY USED)
  // =========================================================================
  {
    id: 'short-professional-verification',
    title: 'Short Professional Verification Script (Most Commonly Used)',
    category: 'eligibility-benefits',
    callerPersona: 'John (A/R Specialist / Patient Intake)',
    facility: '[Provider Name]',
    targetDuration: '2 – 3 Minutes',
    purpose: 'Rapid, high-volume eligibility and benefit verification for fast-paced clinics and front desk check-in desks where speed and accuracy are paramount.',
    verbatimOpening: '"Good morning/afternoon, this is John calling from [Provider Name]. I am calling to verify eligibility and benefits for a patient. May I proceed?\n\nPatient Name: [Name]\nDOB: [DOB]\nMember ID: [ID]\nDOS: [DOS]"',
    sections: [
      {
        title: '1. Fast Identification & Verification Request',
        badge: 'FAST IDENT',
        callerDialogue: '"Good morning/afternoon, this is John calling from [Provider Name]. I am calling to verify eligibility and benefits for a patient. May I proceed?\n\nPatient Name: [Name]\nDOB: [DOB]\nMember ID: [ID]\nDOS: [DOS]\nProvider NPI: [Billing NPI]"',
        repExpectedResponse: '"Hi John, yes I can verify that for you. Member is active in our system under commercial group #98221."',
        actionItems: [
          'Group all 4 patient identifiers together in one clear breath to save call time.',
          'Provide NPI and DOS proactively before the rep asks.'
        ],
        keyRules: [
          'Speed rule: Professional call center reps save 2-3 minutes per call by offering identifiers in standard sequence: Name -> DOB -> ID -> DOS.'
        ]
      },
      {
        title: '2. Core 7-Point Benefit Check',
        badge: '7 CORE POINTS',
        callerDialogue: '"Could you please verify:\n\n• Active eligibility and effective dates\n• In-network or out-of-network status\n• Emergency, outpatient, and inpatient benefits\n• Deductible, coinsurance, copay, and out-of-pocket amounts\n• Authorization requirements\n• Coordination of Benefits (COB) information\n• Claims mailing address"',
        repExpectedResponse: '"Active from 01/01/2026, no term. In-network provider. Emergency copay $250. Outpatient specialist copay $40. Inpatient requires prior auth. Individual deductible $1,000, $200 met. Coinsurance 20%. OOP Max $4,500. COB is clear. Claims PO Box 1000, Payer ID 12345."',
        actionItems: [
          'Check off all 7 items on your physical intake notepad.',
          'Clarify if copay or deductible applies to today\'s specific procedure.'
        ],
        keyRules: [
          'Never hang up without confirming whether Prior Auth is needed for the scheduled CPT.'
        ]
      },
      {
        title: '3. Rapid Documentation Closing',
        badge: 'CLOSING',
        callerDialogue: '"Lastly, may I have your name and call reference number for documentation?\n\nThank you for your assistance."',
        repExpectedResponse: '"My name is Tyler, reference number REF-449120. Thank you John, have a great day!"',
        actionItems: [
          'Transcribe Call Ref # and Rep Name directly into EHR/PMS software.',
          'Thank the rep politely.'
        ],
        keyRules: [
          'Short does not mean incomplete: The call reference number remains strictly mandatory.'
        ]
      }
    ],
    postCallDocumentation: {
      mandatoryFields: ['Rep Name', 'Call Ref #', 'Active Status', 'In-Network Status', 'Copay/Ded/OOP Max', 'Prior Auth Rules'],
      sampleLedgerNote: '02/14/2026 - John (Intake): Phoned payer Aetna. Rep Tyler, Ref # REF-449120. Active DOS 02/14/2026. In-network. Specialist Copay $40, Ded $1,000 ($200 met), Coins 20%, OOP $4,500. No PCP referral. Payer ID 12345. Status: OK TO SCHEDULE.',
      escalationTrigger: 'If deductible is unmet >$1,000, collect estimated coinsurance/deductible at front desk prior to service.'
    }
  },

  // =========================================================================
  // SCRIPT 3: INPATIENT AUTHORIZATION VIA EMERGENCY VISIT (SAM_P - HAYWOOD)
  // =========================================================================
  {
    id: 'inpatient-er-auth-haywood',
    title: 'Inpatient Authorization via ER Visit Master Script',
    category: 'prior-authorization',
    callerPersona: 'SAM_P (Hospital Utilization Review / Case Management Specialist)',
    facility: 'Haywood Regional Medical Centre',
    targetDuration: '6 – 10 Minutes',
    purpose: 'Urgent emergency inpatient admission notification, clinical intensity of service handover, and pre-certification for a patient admitted directly through the Emergency Room.',
    verbatimOpening: '"HI MY NAME IS SAM_P, I\'M CALLING FROM FACILITY Haywood Regional Medical Centre, Please note that this call may be recorded for quality assurance and training purposes.”, TODAY I WANT TO START A NEW INPT AUTH THROUGH ER VISIT, COULD YOU PLEASE HELP ME...."',
    sections: [
      {
        title: '1. Verbatim Opening & Urgent Emergency Intake',
        badge: 'URGENT ER INTAKE',
        callerDialogue: '"HI MY NAME IS SAM_P, I\'M CALLING FROM FACILITY Haywood Regional Medical Centre, Please note that this call may be recorded for quality assurance and training purposes.\n\nTODAY I WANT TO START A NEW INPT AUTH THROUGH ER VISIT, COULD YOU PLEASE HELP ME...."',
        repExpectedResponse: '"Hello Sam, thank you for calling. I can certainly help you initiate an emergency inpatient authorization. Can I please have your hospital Tax ID, NPI, and the patient\'s Member ID?"',
        actionItems: [
          'Deliver the recorded line disclosure and facility identity with urgent clarity.',
          'Hospital NPI (UB-04 Form Locator 56) and Tax ID (FL 5) ready.',
          'Have patient\'s Face Sheet and Emergency Department Arrival Time ready.'
        ],
        keyRules: [
          'The 24–48 Hour Emergency Admission Rule: Most commercial payers, Medicare Advantage, and Medicaid HMOs require inpatient admission notification within 24 to 48 hours of bed placement. Exceeding this window triggers fatal CO-197 / CO-200 timely auth denials!'
        ]
      },
      {
        title: '2. Patient Demographics & ER Admission Details',
        badge: 'CLINICAL DEMOGRAPHICS',
        callerDialogue: '"The patient details are:\n\n• Member ID: [Member ID]\n• Patient Name: [Patient Full Name]\n• Date of Birth: [MM/DD/YYYY]\n• Emergency Room Admission Date & Time: [MM/DD/YYYY at HH:MM AM/PM]\n• Admitting Facility: Haywood Regional Medical Centre (NPI: [Hospital NPI])\n• Attending Physician: Dr. [Attending Physician Name], NPI: [Doctor NPI]\n• Primary Admitting Diagnosis: [ICD-10 Code & Description, e.g. K35.20 - Acute Appendicitis with Generalized Peritonitis]\n• Level of Care Requested: Acute Inpatient (Med-Surg / Telemetry / ICU)"',
        repExpectedResponse: '"Thank you Sam. I have located the member. Our system shows Haywood Regional Medical Centre is contracted. What was the emergency admission pathway and current clinical status?"',
        actionItems: [
          'Specify exact admission hour/minute (payers verify against midnight census).',
          'Clarify requested Level of Care: Acute Inpatient vs Observation vs ICU/CCU.',
          'Provide both hospital NPI (FL 56) and attending physician NPI (FL 76).'
        ],
        keyRules: [
          'Observation vs Inpatient Warning: If the physician wrote "Admit to Inpatient" but clinical notes only justify observation, payer medical directors will downgrade to observation. Ensure physician documentation explicitly supports Acute Inpatient severity of illness.'
        ]
      },
      {
        title: '3. Clinical Handover & Severity of Illness (MCG / InterQual Criteria)',
        badge: 'CLINICAL CRITERIA',
        callerDialogue: '"The patient presented to Haywood Regional ER with severe acute right lower quadrant abdominal pain, fever 102.4°F, leukocytosis (WBC 18.5k), and rebound tenderness.\n\nCT of abdomen and pelvis confirmed acute ruptured appendicitis with localized abscess. Emergency laparoscopic appendectomy was performed. Patient requires continuous IV antibiotics, post-op pain management, and wound monitoring.\n\nPatient meets InterQual / MCG Acute Inpatient criteria for Severity of Illness (SI) and Intensity of Service (IS). Clinical records, operative notes, H&P, and lab reports are ready to transmit."',
        repExpectedResponse: '"Understood. Clinical records are required for clinical review. Please transmit the emergency H&P, ER notes, and operative report to our clinical review fax at 800-555-0199 or upload via our provider portal within 24 hours."',
        actionItems: [
          'Cite clinical evidence: Vital signs, lab values (WBC, troponin, creatinine), imaging findings (CT, MRI, ultrasound), and surgical intervention.',
          'State adherence to recognized utilization management criteria (Milliman Care Guidelines [MCG] or McKesson InterQual).',
          'Confirm dedicated Clinical Review Fax Number or Electronic Portal URL.'
        ],
        keyRules: [
          'EMTALA & Retroactive Authorization: Under the Emergency Medical Treatment and Labor Act (EMTALA), patients must be stabilized before insurance authorization is required. Payers cannot deny emergency stabilization for lack of prior auth, but once admitted to inpatient bed, the notification clock starts.'
        ]
      },
      {
        title: '4. Authorization Reference, Length of Stay & Concurrent Review Schedule',
        badge: 'AUTH DETERMINATION',
        callerDialogue: '"Thank you. Could you please provide:\n\n• The Inpatient Authorization / Case Reference Number?\n• What is the initial approved Length of Stay (LOS) or authorized date range?\n• If pended for medical director review, what is the expected turnaround time (TAT)?\n• When are concurrent review clinical notes due for continuation of stay?\n• Dedicated clinical fax number and Case Manager name?"',
        repExpectedResponse: '"The Inpatient Auth Case Reference Number is AUTH-992014-HRMC. Initial status is PENDED FOR CLINICALS. Once faxed, clinical review turnaround is 24 to 48 hours. If approved, initial stay will be 3 days through [Date]. Concurrent review clinical update will be due by 12:00 PM on day 2. My name is Carlos, operator ID UR-882."',
        actionItems: [
          'Record the Auth / Case Reference Number with 100% precision (AUTH-992014-HRMC).',
          'Document the concurrent review deadline (e.g. 12:00 PM Day 2).',
          'Alert hospital Case Management team to fax clinical documentation within 24 hours.'
        ],
        keyRules: [
          'Never close the file on a "Pended" authorization. A pended authorization without clinical follow-up converts into a denial after 72 hours!'
        ]
      },
      {
        title: '5. Closing Audit Trail & Callback Confirmation',
        badge: 'AUDIT CLOSE',
        callerDialogue: '"Thank you Carlos. To confirm, Auth Case # AUTH-992014-HRMC is created for Haywood Regional Medical Centre. Clinicals will be transmitted to 800-555-0199 today. My direct callback line in Utilization Review is 828-456-7311 ext 402.\n\nThank you for assisting with this emergency admission. Have a great day!"',
        repExpectedResponse: '"Everything is logged. Thank you Sam, have a great day."',
        actionItems: [
          'Repeat all critical numbers back to the representative to ensure zero digit transposition.',
          'Save the electronic transmission fax confirmation receipt into the patient billing file.'
        ],
        keyRules: [
          'Keep the Fax Confirmation Sheet with transmission timestamp. In an appeal, this proves timely submission of clinicals.'
        ]
      }
    ],
    postCallDocumentation: {
      mandatoryFields: [
        'Auth / Case Reference Number',
        'Hospital Name: Haywood Regional Medical Centre',
        'Caller Name: SAM_P',
        'Payer Rep Name & ID',
        'Admitting Diagnosis (ICD-10)',
        'Approved Level of Care (Acute Inpatient vs Obs)',
        'Authorized Days / Length of Stay (LOS)',
        'Clinical Fax Number / Portal Upload Link',
        'Concurrent Review Due Date & Time'
      ],
      sampleLedgerNote: '02/14/2026 11:30 AM EST - SAM_P (UR Dept, Haywood Regional Medical Centre): Contacted Payer UHC Commercial for Emergency Inpatient Auth via ER visit. Patient Eleanor Vance (DOB 04/12/1984, Member ID 992817201). Admitted through ER on 02/14/2026 at 03:45 AM with Acute Perforated Appendicitis (ICD-10 K35.20). Post-op laparoscopic appendectomy. InterQual acute inpatient criteria met. Spoke with rep Carlos (ID UR-882). AUTH CASE GENERATED: AUTH-992014-HRMC. Status: PENDED FOR CLINICALS. Sent 14-page clinical packet (ER notes, CT report, OP note, labs) to fax 800-555-0199 at 11:45 AM. Concurrent review update due 02/16 by 12:00 PM. Direct callback left: 828-456-7311 ext 402.',
      escalationTrigger: 'If payer issues Denial for "Lack of Medical Necessity" or "Observation Level of Care", schedule immediate Peer-to-Peer review between treating hospital surgeon and Payer Medical Director within 48 hours.'
    }
  },

  // =========================================================================
  // SCRIPT 4: SHORT PROFESSIONAL AR CLAIM STATUS INQUIRY SCRIPT
  // =========================================================================
  {
    id: 'ar-fast-claim-status',
    title: 'Short Professional AR Claim Status Inquiry Script',
    category: 'claim-status',
    callerPersona: 'Marcus (Accounts Receivable Specialist)',
    facility: '[Provider / Practice Name]',
    targetDuration: '2 – 4 Minutes',
    purpose: 'Rapid inquiry into claim processing status, adjudication outcome, payment voucher/EFT trace details, and patient cost-sharing allocations.',
    verbatimOpening: '"Hi! Calling from [Provider Name] to check claim status on a recorded line. Billing NPI [Billing NPI], Tax ID [Tax ID]. Member ID is [Member ID Phonetic], DOB [Patient DOB], and Date of Service is [DOS]. Billed amount is $[Billed Amount]."',
    sections: [
      {
        title: '1. Fast Authentication & Claim Identification',
        badge: 'FAST IDENT',
        callerDialogue: '"Hi! Calling from [Provider Name] to check claim status on a recorded line.\n\nBilling NPI [Billing NPI], Tax ID [Tax ID]. Member ID is [Member ID Phonetic], DOB [Patient DOB], Date of Service is [DOS], and Billed Charge is $[Billed Amount]."',
        repExpectedResponse: '"Thank you. Found the claim under ICN 202602140089. Received electronically on 02/05/2026."',
        actionItems: ['Provide all 4 key identifiers in one single breath.', 'Record payer Internal Control Number (ICN).'],
        keyRules: ['Never make the rep search multiple screens; provide exact billed charge to verify record.']
      },
      {
        title: '2. Current Status & Adjudication Breakdown',
        badge: 'ADJUDICATION',
        callerDialogue: '"Has this claim finalized adjudication? What is the current status, paid amount, contractual adjustment, and patient responsibility?"',
        repExpectedResponse: '"Claim finalized on 02/10/2026. Approved for $240.00 allowable. Contractual adjustment is $110.00 (CO-45). Paid amount is $190.00. Patient responsibility is $50.00 copay (PR-3)."',
        actionItems: ['Record paid amount, write-off amount, and patient responsibility.', 'Verify CARC reason codes.'],
        keyRules: ['Math check: Billed ($350) = Allowed ($240) + Write-off ($110). Allowed ($240) = Paid ($190) + Patient Resp ($50).']
      },
      {
        title: '3. Payment Disbursement Details & Trace ID',
        badge: 'DISBURSEMENT',
        callerDialogue: '"Was payment issued via EFT or check? What is the check/trace number, check date, and bulk check total? May I have your name and call reference number?"',
        repExpectedResponse: '"Issued via EFT trace #ACH-9921408 on 02/12/2026 in a bulk deposit of $4,850.20. My name is Kendra, call reference #REF-771920."',
        actionItems: ['Capture EFT Trace # for banking matching.', 'Capture Rep Name and Call Ref #.'],
        keyRules: ['EFT funds typically arrive in provider bank account within 24 to 48 hours of issue date.']
      }
    ],
    postCallDocumentation: {
      mandatoryFields: ['Payer ICN', 'Adjudication Date', 'Paid Amount', 'CO-45 Write-off', 'PR Code & Amount', 'EFT Trace # / Check #', 'Rep Name & Call Ref #'],
      sampleLedgerNote: '02/14/2026 - Marcus (AR): Called Payer Cigna. Rep Kendra, Ref # REF-771920. Claim ICN 202602140089 (DOS 02/05/2026, Billed $350.00). Finalized 02/10. Allowed: $240.00, Paid: $190.00 via EFT trace #ACH-9921408 on 02/12. Contractual write-off: $110.00 (CO-45). Patient copay: $50.00 (PR-3). Status: PAID IN FULL.',
      escalationTrigger: 'If payment check was issued >30 days ago but not received in clinic, request immediate stop payment and reissue.'
    }
  },

  // =========================================================================
  // SCRIPT 5: CLAIM NOT ON FILE RESOLUTION SCRIPT
  // =========================================================================
  {
    id: 'claim-not-on-file-script',
    title: 'Claim Not On File (CNOF) Resolution & Payer Intake Script',
    category: 'denial-resolution',
    callerPersona: 'Sarah (AR Follow-Up Lead)',
    facility: '[Provider / Billing Service Name]',
    targetDuration: '4 – 6 Minutes',
    purpose: 'Investigating claims transmitted through clearinghouse that the payer claims to have no record of receiving. Crucial for stopping the timely filing clock.',
    verbatimOpening: '"Good morning/afternoon, this is Sarah from [Provider Name] billing department on a recorded line. I am following up on a claim that was submitted on [Date] for Member [Member ID], but shows no payment or denial on file. May I verify the intake status?"',
    sections: [
      {
        title: '1. Identification & Clearinghouse Transmission Proof',
        badge: 'CNOF INQUIRY',
        callerDialogue: '"Good morning/afternoon, this is Sarah from [Provider Name] billing department on a recorded line.\n\nI am following up on a claim submitted for Member [Member ID Phonetic], DOB [Patient DOB], DOS [DOS], billed for $[Amount].\n\nOur clearinghouse reports confirm electronic transmission under Batch ID [Batch #] with 277CA acceptance on [Date]. However, our portal reflects no record on file. Can you search by patient Member ID and DOB?"',
        repExpectedResponse: '"I have searched our primary and archived systems by Member ID and DOB, and I show no record of this claim on file."',
        actionItems: [
          'State Clearinghouse Batch ID and 277CA acceptance timestamp.',
          'Ask rep to search alternate spellings or without hyphenated names.'
        ],
        keyRules: [
          'Claim Not On File ≠ Denial! The Timely Filing clock is still ticking every second. Act immediately.'
        ]
      },
      {
        title: '2. Payer Intake Verification Questions',
        badge: 'INTAKE QUESTIONS',
        callerDialogue: '"Since the claim is not on file, could you please confirm:\n\n• What is the policy effective and termination date?\n• Was the patient policy active on the Date of Service?\n• What is your exact Timely Filing Limit from the Date of Service?\n• How do you accept claims (electronic Payer ID vs paper mailing address)?\n• Do you accept FAX submissions? If yes, what is the fax number and attention line?\n• What is the electronic Payer ID for clearinghouse routing?"',
        repExpectedResponse: '"Policy is active from 01/01/2026. Timely filing limit is 90 days from DOS. We accept electronically under Payer ID 60054. We accept faxed claims with clearinghouse proof at 888-555-0144 Attn: Claims Intake. Paper claims go to PO Box 2000, Chicago, IL 60601."',
        actionItems: [
          'Record Timely Filing Limit (e.g. 90, 180, 365 days).',
          'Confirm Electronic Payer ID to verify PMS was not sending to obsolete ID.',
          'Capture dedicated Claims Intake Fax Number.'
        ],
        keyRules: [
          'If the timely filing limit is close to expiring (e.g. day 80 of 90), FAX the claim immediately with clearinghouse acceptance report attached as proof of timely filing!'
        ]
      },
      {
        title: '3. Immediate Action Plan & Call Reference Capture',
        badge: 'RE-SUBMISSION',
        callerDialogue: '"Thank you. We will resubmit the claim electronically to Payer ID 60054 today with the clearinghouse proof attached to protect timely filing.\n\nMay I please have your full name and the Call Reference Number for this call?"',
        repExpectedResponse: '"My name is Wayne, and your Call Reference Number is REF-552091. Allow 14 to 21 business days for electronic processing."',
        actionItems: [
          'Capture Rep Name and Call Ref #.',
          'Resubmit claim fresh from PMS/billing software immediately.',
          'Set reminder for 14-day turnaround follow-up.'
        ],
        keyRules: [
          'Always log the Call Reference Number in the billing system before resubmitting. This proves timely inquiry.'
        ]
      }
    ],
    postCallDocumentation: {
      mandatoryFields: ['Rep Name', 'Call Ref #', 'Payer ID Verified', 'Timely Filing Limit', 'Fax # / Address', 'Action: Resubmitted with EDI Proof', 'Next Follow-up Date'],
      sampleLedgerNote: '02/14/2026 - Sarah (AR Lead): Phoned Payer Humana. Rep Wayne, Ref # REF-552091. Claim DOS 01/10/2026 ($420.00) NOT ON FILE. Policy is ACTIVE. Verified Payer ID is 60054. Timely filing is 90 days (deadline 04/10/2026). Resubmitted claim fresh via clearinghouse batch #99214 with 277CA receipt attached. Also faxed copy to 888-555-0144 Attn: Claims Intake. Next follow-up scheduled for 02/28/2026.',
      escalationTrigger: 'If timely filing deadline has passed, file an administrative appeal accompanied by certified clearinghouse transmission proof showing timely electronic delivery.'
    }
  }
];

export const INPATIENT_ER_AUTH_WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Emergency Admission Identification (EMTALA Window)',
    description: 'Patient arrives through ER and physician issues order "Admit to Inpatient". Under EMTALA, emergency stabilization is mandatory regardless of pre-authorization. However, the commercial/Medicare 24–48 hour notification window starts the moment bed assignment occurs.',
    clinicalDocsNeeded: ['ER Physician Triage & Evaluation Notes', 'Admitting Physician H&P', 'Physician Order with Bed Level (Inpatient vs Observation)', 'Patient Face Sheet']
  },
  {
    step: 2,
    title: 'Intensity of Service (IS) & Severity of Illness (SI) Validation',
    description: 'Case Manager reviews clinical chart against national Utilization Management criteria (InterQual or Milliman MCG) to substantiate that the patient requires acute hospital level of care rather than outpatient observation.',
    clinicalDocsNeeded: ['Vital Signs Trends', 'Diagnostic Imaging (CT / MRI / X-ray Reports)', 'Abnormal Lab Panels (WBC, Troponin, ABG, Chem-7)', 'Operative / Procedural Reports']
  },
  {
    step: 3,
    title: 'Immediate Phone or Portal Pre-Certification Notification',
    description: 'Call payer Utilization Management department or initiate electronic 278 authorization. Deliver standard ER Inpatient script (e.g. SAM_P from Haywood Regional Medical Centre). Obtain immediate Auth Case Reference Number.',
    clinicalDocsNeeded: ['Hospital Billing NPI (UB-04 FL 56)', 'Attending MD NPI (FL 76)', 'Primary ICD-10 Admitting Diagnosis', 'Payer Member ID & Group #']
  },
  {
    step: 4,
    title: 'Transmission of Clinical Packet & Time-Stamping',
    description: 'Fax or upload complete medical record packet to dedicated clinical review queue within 24 hours. Retain electronic transmission receipt with date/time stamp to defend against timely notification denials.',
    clinicalDocsNeeded: ['Fax Transmission Confirmation Page', 'EHR Upload Audit Log', 'Call Reference Number', 'Pended Auth Case Number']
  },
  {
    step: 5,
    title: 'Concurrent Review & Length of Stay (LOS) Tracking',
    description: 'Monitor daily census. If patient requires additional hospital days beyond the initially authorized Length of Stay, submit updated clinical progress notes prior to concurrent review deadline (usually 12:00 PM on final authorized day).',
    clinicalDocsNeeded: ['Daily Physician Progress Notes', 'Updated Lab / Medication Flowsheets', 'Discharge Planning / Social Work Notes']
  }
];
