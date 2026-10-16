import { ClaimBoxDetail, Ub04BoxDetail, Ub04CodeItem } from '../types/rcm';

export interface FormComparisonRow {
  feature: string;
  professional: string;
  facility: string;
}

export const FORM_COMPARISONS: FormComparisonRow[] = [
  {
    feature: 'Official Form Name',
    professional: 'CMS-1500 (formerly HCFA-1500, current version 02/12)',
    facility: 'UB-04 (CMS-1450, uniform institutional billing form)'
  },
  {
    feature: 'Electronic EDI Standard',
    professional: '837P (HIPAA ASC X12 005010X222A1 - Professional)',
    facility: '837I (HIPAA ASC X12 005010X223A2 - Institutional)'
  },
  {
    feature: 'Total Box Count',
    professional: '33 numbered boxes (Boxes 1 through 33)',
    facility: '81 numbered Form Locators (FL 01 through FL 81)'
  },
  {
    feature: 'Billing Entities',
    professional: 'Physicians, NPs, PAs, Solo Practices, Medical Groups, Ambulatory Surgical Centers (ASC professional fee)',
    facility: 'Hospitals (Inpatient/Outpatient), Skilled Nursing Facilities (SNF), Hospices, Inpatient Rehab, End-Stage Renal Disease (ESRD) Facilities'
  },
  {
    feature: 'Services Covered',
    professional: 'Professional physician work, consultations, physical exams, minor in-office surgical procedures, DME supplies',
    facility: 'Facility room & board, 24-hr nursing care, operating room suite, ICU equipment, pharmacy overhead, central sterile supply'
  },
  {
    feature: 'Reimbursement Methodology',
    professional: 'Fee Schedule (RBRVS / RVUs: Work RVU + Practice Expense RVU + Malpractice RVU), CPT/HCPCS per-line payment',
    facility: 'DRG (Inpatient Diagnosis-Related Group), APC (Ambulatory Payment Classifications), Fee-for-Service Per Diem'
  },
  {
    feature: 'Classification Coding Used',
    professional: 'CPT (5-digit numeric) + HCPCS Level II (alphanumeric) + 2-digit CPT Modifiers',
    facility: '4-digit Revenue Codes (FL 42) + ICD-10-PCS (Inpatient procedures) / CPT & HCPCS (Outpatient hospital)'
  },
  {
    feature: 'Diagnosis Capacity',
    professional: 'Up to 12 ICD-10-CM diagnosis codes (Box 21, Lines A through L)',
    facility: 'Principal Diagnosis (FL 67) + up to 24 Secondary Diagnosis codes (FL 67A–Q), with Present On Admission (POA) indicators'
  },
  {
    feature: 'Service Lines Per Claim',
    professional: '6 service lines per standard form (Box 24A to 24J)',
    facility: 'Up to 22 line items per single page (multi-page continuation claims supported)'
  },
  {
    feature: 'Attending / Billing IDs',
    professional: 'Box 24J (Rendering NPI), Box 32a (Facility NPI), Box 33a (Billing NPI)',
    facility: 'FL 56 (Billing NPI), FL 76 (Attending Physician NPI), FL 77 (Operating Physician NPI)'
  },
  {
    feature: 'Corrected Claim Indicator',
    professional: 'Box 22: Resubmission Code "7" (Replacement) + Original Reference ICN',
    facility: 'FL 04: Type of Bill 3rd digit "7" (e.g. 0117 Inpatient Replacement) + FL 64 (Original DCN/ICN)'
  }
];

// ==============================================================
// COMPLETE CMS-1500 (HCFA-1500) DIRECTORY - ALL 33 BOXES
// ==============================================================
export const CMS_1500_BOXES: ClaimBoxDetail[] = [
  {
    boxNumber: '1',
    name: 'Type of Health Insurance Coverage',
    shortName: 'Insurance Program Type',
    category: 'patient',
    sampleValue: 'Group Health Plan (Checked)',
    ediMapping: '837P Loop 2000B SBR09 (Claim Filing Indicator Code: CI, MB, MC, etc.)',
    description: 'Indicates the type of health insurance program under which the claim is being filed (Medicare, Medicaid, TRICARE, CHAMPVA, Group Health Plan, FECA Blk Lung, or Other).',
    rules: [
      'Only one single checkbox may be selected.',
      'Group Health Plan is used for employer-sponsored commercial insurance (BCBS, Aetna, Cigna, UHC).',
      'TRICARE is for active military service members and their families; CHAMPVA is for veterans with permanent disabilities.'
    ],
    rejectionCauses: [
      'Selecting multiple checkboxes simultaneously on paper submissions.',
      'Selecting Medicare when the patient is enrolled in a Medicare Advantage HMO plan (requires commercial/other payer routing).'
    ]
  },
  {
    boxNumber: '1a',
    name: "Insured's ID Number",
    shortName: 'Subscriber Member ID / MBI',
    category: 'patient',
    sampleValue: 'XYZ123456789 (or Medicare MBI: 1EG4-TE5-MK72)',
    ediMapping: '837P Loop 2010BA NM109 (Subscriber Primary Identifier)',
    description: 'The unique insurance identification number assigned to the primary insured/subscriber, including any alpha prefix or suffix.',
    rules: [
      'Must match the exact characters on the insurance card without hyphens, dashes, or spaces unless specifically mandated by the payer.',
      'For Traditional Medicare, must be the 11-character alphanumeric Medicare Beneficiary Identifier (MBI) without hyphens.',
      'Never report Social Security Numbers (SSN) as member IDs under HIPAA EDI compliance.'
    ],
    rejectionCauses: [
      'CARC CO-16 / RARC MA61: Missing/incomplete subscriber ID.',
      'Omission of 3-character alpha prefix on Blue Cross Blue Shield member cards.',
      'Reporting legacy Medicare HICN (Social Security based) instead of MBI.'
    ]
  },
  {
    boxNumber: '2',
    name: "Patient's Name",
    shortName: 'Patient Full Legal Name',
    category: 'patient',
    sampleValue: 'JOHNSON, ELEANOR M.',
    ediMapping: '837P Loop 2010CA NM103 (Last), NM104 (First), NM105 (Middle)',
    description: "The patient's legal name formatted as: Last Name, First Name, Middle Initial.",
    rules: [
      'Must match the patient’s legal government-issued ID and insurance enrollment records.',
      'Do not include titles (Dr., Mr., Mrs.) or professional suffixes (MD, PhD) in this box.',
      'Use commas between Last Name and First Name.'
    ],
    rejectionCauses: [
      'Name spelling mismatch with payer eligibility database.',
      'Using a nickname or maiden name that does not match insurance enrollment records (causes CARC CO-16 / CO-27).'
    ]
  },
  {
    boxNumber: '3',
    name: "Patient's Birth Date & Sex",
    shortName: 'Patient DOB & Sex',
    category: 'patient',
    sampleValue: '05 14 1978 | Sex: F (Female checked)',
    ediMapping: '837P Loop 2010CA DMG02 (Date: YYYYMMDD), DMG03 (Gender: M, F, U)',
    description: "Patient's date of birth in 8-digit format (MM DD YYYY) and biological sex (M or F).",
    rules: [
      'Birth date format must be 2-digit month, 2-digit day, and 4-digit year.',
      'Check either Male (M) or Female (F); leave unselected only if unknown under state regulations.',
      'Vital for validating age-dependent CPT/ICD codes and coordination of benefits.'
    ],
    rejectionCauses: [
      'DOB mismatch against insurance enrollment master file (CARC CO-16 / RARC MA60).',
      'Submitting 2-digit year (e.g. 78 instead of 1978).',
      'Gender mismatch on gender-specific procedures (e.g. prostate exam on female patient, pap smear on male patient without condition modifier).'
    ]
  },
  {
    boxNumber: '4',
    name: "Insured's Name",
    shortName: 'Subscriber / Policyholder Name',
    category: 'patient',
    sampleValue: 'JOHNSON, ELEANOR M. (or Spouse: JOHNSON, RICHARD K.)',
    ediMapping: '837P Loop 2010BA NM103 (Last), NM104 (First), NM105 (Middle)',
    description: 'The legal name of the person who holds the insurance policy (the primary subscriber).',
    rules: [
      'If the patient is the insured (Box 6 is "Self"), enter the patient’s legal name or leave blank if permitted by payer rules.',
      'If the patient is a dependent spouse or child, enter the subscriber’s legal name exactly as enrolled with the employer/payer.',
      'Formatted as Last Name, First Name, Middle Initial.'
    ],
    rejectionCauses: [
      'Entering "SAME" when the payer electronic rules engine mandates the full subscriber name.',
      'Subscriber name mismatch causing failure of EDI 270/271 demographic scrub.'
    ]
  },
  {
    boxNumber: '5',
    name: "Patient's Address & Telephone",
    shortName: 'Patient Street Address',
    category: 'patient',
    sampleValue: '1428 ELM STREET, DALLAS, TX 75201 | Phone: (214) 555-0199',
    ediMapping: '837P Loop 2010CA N301 (Street), N401 (City), N402 (State), N403 (ZIP)',
    description: "The patient's permanent residential address, including street, city, 2-letter state code, 5- or 9-digit ZIP code, and telephone number.",
    rules: [
      'Must contain a physical street address. A P.O. Box is generally acceptable for the patient only if no street address exists.',
      'State must be a standard 2-character USPS abbreviation.',
      'Telephone number must include the 3-digit area code.'
    ],
    rejectionCauses: [
      'Invalid or non-existent 5-digit ZIP code.',
      'Missing state abbreviation or invalid character count in address lines.'
    ]
  },
  {
    boxNumber: '6',
    name: 'Patient Relationship to Insured',
    shortName: 'Relationship to Subscriber',
    category: 'patient',
    sampleValue: 'Self (Checked)',
    ediMapping: '837P Loop 2000C PAT01 or Loop 2000B SBR02 (Individual Relationship Code: 18=Self, 01=Spouse, 19=Child, 20=Employee, etc.)',
    description: "Indicates the patient's relationship to the primary policyholder (Self, Spouse, Child, or Other).",
    rules: [
      'Select only one checkbox.',
      'If "Self" is selected, Box 4, 7, and 11a may be identical to Boxes 2, 5, and 3.',
      'If "Child" is selected, the Birthday Rule must be evaluated to verify primary payer status between dual-insured parents.'
    ],
    rejectionCauses: [
      'Selecting "Self" when the policy is actually held by a parent or spouse (causes denial CARC CO-26 or CO-27).'
    ]
  },
  {
    boxNumber: '7',
    name: "Insured's Address & Telephone",
    shortName: 'Subscriber Address',
    category: 'patient',
    sampleValue: '1428 ELM STREET, DALLAS, TX 75201 | Phone: (214) 555-0199',
    ediMapping: '837P Loop 2010BA N301 (Street), N401 (City), N402 (State), N403 (ZIP)',
    description: "The permanent residential street address and telephone number of the primary policyholder.",
    rules: [
      'If Box 6 is "Self", this may be populated with the patient’s address or left blank if allowed by payer.',
      'If the patient is a college student or separated child living at a different address, report the policyholder’s home address here.'
    ],
    rejectionCauses: [
      'Subscriber address mismatch on commercial insurance anti-fraud verifications.'
    ]
  },
  {
    boxNumber: '8',
    name: 'Reserved for NUCC Use',
    shortName: 'Reserved (Formerly Patient Status)',
    category: 'billing',
    sampleValue: '[BLANK - Do Not Populate]',
    ediMapping: 'N/A (Legacy student/marital status discontinued in 02/12 revision)',
    description: 'This box was formerly used for patient marital/employment/student status. It is now reserved for future NUCC assignment and must be left blank.',
    rules: [
      'Leave completely blank on all current CMS-1500 (02/12) submissions.',
      'Entering legacy data here will cause automated OCR scanning errors.'
    ],
    rejectionCauses: [
      'Populating text in reserved boxes causes paper scanning rejections.'
    ]
  },
  {
    boxNumber: '9',
    name: "Other Insured's Name",
    shortName: 'Secondary / Other Insured Name',
    category: 'patient',
    sampleValue: 'AETNA HEALTH - JOHNSON, ELEANOR M.',
    ediMapping: '837P Loop 2320 SBR03 and Loop 2330A NM103/NM104 (Other Subscriber Name)',
    description: 'Indicates the legal name of the subscriber of another health benefit plan (Secondary or Tertiary coverage).',
    rules: [
      'If the patient has secondary insurance coverage, enter the secondary subscriber’s name.',
      'If Medicare is secondary (MSP), report the primary commercial policyholder name here.',
      'If no other insurance exists, leave Boxes 9, 9a, 9b, 9c, and 9d completely blank.'
    ],
    rejectionCauses: [
      'Omission of secondary coverage details when payer records show dual insurance (causes CARC CO-22 denial).'
    ]
  },
  {
    boxNumber: '9a',
    name: "Other Insured's Policy or Group Number",
    shortName: 'Secondary Policy / Group Number',
    category: 'patient',
    sampleValue: 'GRP-40291 (Member ID: W987456123)',
    ediMapping: '837P Loop 2320 SBR04 or Loop 2330A NM109',
    description: 'The policy or group number of the other health benefit plan.',
    rules: [
      'Enter the secondary insurance policy number, group number, or subscriber ID.',
      'Required for coordination of benefits crossover claims.'
    ],
    rejectionCauses: [
      'Truncated or missing secondary policy number preventing automated crossover processing.'
    ]
  },
  {
    boxNumber: '9b',
    name: 'Reserved for NUCC Use',
    shortName: 'Reserved Box 9b',
    category: 'billing',
    sampleValue: '[BLANK]',
    ediMapping: 'N/A',
    description: 'Reserved for future NUCC national assignment. Formerly used for other insured birth date.',
    rules: ['Leave completely blank on version 02/12.'],
    rejectionCauses: ['Populating text in reserved boxes.']
  },
  {
    boxNumber: '9c',
    name: 'Reserved for NUCC Use',
    shortName: 'Reserved Box 9c',
    category: 'billing',
    sampleValue: '[BLANK]',
    ediMapping: 'N/A',
    description: 'Reserved for future NUCC national assignment. Formerly used for employer name.',
    rules: ['Leave completely blank on version 02/12.'],
    rejectionCauses: ['Populating text in reserved boxes.']
  },
  {
    boxNumber: '9d',
    name: 'Insurance Plan Name or Program Name',
    shortName: 'Secondary Payer Plan Name',
    category: 'patient',
    sampleValue: 'AETNA CHOICE POS II (Payer ID: 60054)',
    ediMapping: '837P Loop 2320 SBR04 / Loop 2330B NM103',
    description: 'The trade name or electronic payer name of the other health plan or program.',
    rules: [
      'Enter the legal plan name or 5-digit electronic Payer ID of the secondary carrier.',
      'Ensures clearinghouse routes electronic crossover remittance advice correctly.'
    ],
    rejectionCauses: ['Vague plan descriptions (e.g. "COMMERCIAL") with no electronic routing ID.']
  },
  {
    boxNumber: '10a',
    name: "Is Patient's Condition Related to Employment?",
    shortName: 'Employment Related (Workers Comp)',
    category: 'clinical',
    sampleValue: 'NO (Checked)',
    ediMapping: '837P Loop 2300 CLM11-1 (Related-Causes Code: EM=Employment)',
    description: 'Reports whether the patient’s clinical condition resulted from employment (triggering Workers Compensation as primary payer).',
    rules: [
      'Check "YES" or "NO".',
      'If "YES", commercial health plans become SECONDARY to Workers Comp insurance.',
      'Must be accompanied by date of injury in Box 14 and claim ID in Box 11b.'
    ],
    rejectionCauses: [
      'Marking "YES" when no Workers Comp claim was opened causes immediate health plan denial CARC CO-24.'
    ]
  },
  {
    boxNumber: '10b',
    name: "Is Patient's Condition Related to Auto Accident?",
    shortName: 'Auto Accident & Place State',
    category: 'clinical',
    sampleValue: 'NO (Checked) | State: TX',
    ediMapping: '837P Loop 2300 CLM11-1 (AA=Auto Accident), CLM11-4 (Auto Accident State Code)',
    description: 'Reports whether the medical condition was caused by a motor vehicle accident, and indicates the 2-letter state USPS abbreviation where the crash occurred.',
    rules: [
      'Check "YES" or "NO".',
      'If "YES", the 2-letter USPS postal code for the state where the accident occurred MUST be reported in the right margin.',
      'Automobile No-Fault (PIP) or Med-Pay insurance is PRIMARY to commercial health coverage.'
    ],
    rejectionCauses: [
      'Checking "YES" but leaving the 2-letter state code blank.',
      'Auto insurer not billed first prior to commercial health submission.'
    ]
  },
  {
    boxNumber: '10c',
    name: "Is Patient's Condition Related to Other Accident?",
    shortName: 'Other Accident (Third-Party Liability)',
    category: 'clinical',
    sampleValue: 'NO (Checked)',
    ediMapping: '837P Loop 2300 CLM11-1 (OA=Other Accident)',
    description: 'Reports whether the illness or injury resulted from a non-automobile, non-employment accident (e.g. slip and fall on commercial property, homeowner liability).',
    rules: [
      'Check "YES" or "NO".',
      'If "YES", liability insurance or property coverage is primary.'
    ],
    rejectionCauses: ['Marking "YES" without opening subrogation case with payer.']
  },
  {
    boxNumber: '10d',
    name: 'Claim Codes (Designated by NUCC)',
    shortName: 'Condition / Claim Codes',
    category: 'billing',
    sampleValue: '[BLANK or Condition Code W2 for Duplicate]',
    ediMapping: '837P Loop 2300 HI segment (Condition Codes)',
    description: 'Used to report specific condition codes or special program indicators designated by the NUCC.',
    rules: [
      'Leave blank unless a specific payer mandate or NUCC code is required.',
      'Code "W2" indicates duplicate of previous claim; code "BG" indicates abortion performed due to rape.'
    ],
    rejectionCauses: ['Entering invalid or unauthorized non-NUCC text codes.']
  },
  {
    boxNumber: '11',
    name: "Insured's Policy Group or FECA Number",
    shortName: 'Primary Policy / Group Number',
    category: 'patient',
    sampleValue: 'GRP-BCBS8842',
    ediMapping: '837P Loop 2000B SBR03 (Group or Policy Number)',
    description: 'The primary group number or individual policy number of the primary insured policyholder.',
    rules: [
      'CRITICAL: If Medicare is the PRIMARY insurance, enter the word "NONE" in Box 11 (this tells the Medicare system that no primary employer group plan exists!).',
      'For commercial plans, enter the employer group number printed on the subscriber card.',
      'For FECA Black Lung claims, enter the 9-digit FECA claim number.'
    ],
    rejectionCauses: [
      'For Medicare claims: Entering a group number in Box 11 triggers automated MSP questionnaire audit or denial CO-22 (Medicare Secondary Payer).',
      'Missing or incorrect commercial group number.'
    ]
  },
  {
    boxNumber: '11a',
    name: "Insured's Date of Birth & Sex",
    shortName: 'Subscriber DOB & Sex',
    category: 'patient',
    sampleValue: '05 14 1978 | Sex: F',
    ediMapping: '837P Loop 2010BA DMG02/DMG03',
    description: "The primary insured's date of birth (MM DD YYYY) and biological sex (M or F).",
    rules: [
      'If Box 6 is "Self", this matches Box 3.',
      'If the patient is a child or spouse, report the subscriber’s birthdate and sex.',
      'Required for coordination of benefits and eligibility verification.'
    ],
    rejectionCauses: ['DOB mismatch between claim and payer subscriber master file.']
  },
  {
    boxNumber: '11b',
    name: 'Other Claim ID (Designated by NUCC)',
    shortName: 'Property & Casualty Claim ID',
    category: 'billing',
    sampleValue: 'WC-CLAIM-987654 (Qualifier Y4)',
    ediMapping: '837P Loop 2300 REF segment (REF01=Y4, REF02=Claim ID)',
    description: 'Reports a 2-character qualifier and unique claim number when billing Workers Compensation or property and casualty claims.',
    rules: [
      'Qualifier "Y4" denotes Property and Casualty Claim Number.',
      'For standard group health and Medicare claims, leave completely blank.'
    ],
    rejectionCauses: ['Omission of Workers Comp claim number when condition is marked as employment-related in Box 10a.']
  },
  {
    boxNumber: '11c',
    name: 'Insurance Plan Name or Program Name',
    shortName: 'Primary Plan Name / Payer ID',
    category: 'patient',
    sampleValue: 'BLUE CROSS BLUE SHIELD TEXAS PPO (Payer ID: BCBSTX)',
    ediMapping: '837P Loop 2000B SBR04 / Loop 2010BB NM103',
    description: 'The legal name or electronic Payer ID of the primary insurance plan.',
    rules: [
      'Enter the health insurance company name or electronic routing ID.',
      'If Medicare is primary, enter "MEDICARE" or the regional MAC name (e.g. NOVITAS SOLUTIONS).'
    ],
    rejectionCauses: ['Missing payer name or invalid electronic payer routing ID at clearinghouse.']
  },
  {
    boxNumber: '11d',
    name: 'Is There Another Health Benefit Plan?',
    shortName: 'Secondary Insurance Indicator',
    category: 'patient',
    sampleValue: 'YES (Checked - Triggers coordination with Box 9)',
    ediMapping: '837P Loop 2300 CLM05 (Yes/No flag)',
    description: 'Indicates whether the patient has any other healthcare coverage or insurance policy.',
    rules: [
      'If "YES" is checked, Boxes 9, 9a, and 9d MUST be populated with the secondary insurance information.',
      'If "NO" is checked, Boxes 9, 9a, and 9d must remain completely blank.',
      'Directly dictates whether the payer issues a crossover electronic 835 remittance.'
    ],
    rejectionCauses: [
      'Marking "YES" but leaving Box 9 blank (causes clearinghouse validation failure).',
      'Marking "NO" when payer COB files show active secondary coverage (causes CARC CO-22).'
    ]
  },
  {
    boxNumber: '12',
    name: "Patient's or Authorized Person's Signature (ROI)",
    shortName: 'Release of Information (ROI)',
    category: 'patient',
    sampleValue: 'SIGNATURE ON FILE (SOF) - Date: 01/15/2025',
    ediMapping: '837P Loop 2300 CLM09 (Release of Information Code: Y or I)',
    description: 'Authorizes the physician/clinic to release medical records and protected health information necessary to adjudicate insurance claims.',
    rules: [
      'Legal consent under HIPAA Privacy Rule (45 CFR § 164.508).',
      'Can be a physical signature with date, or standard industry shorthand "SIGNATURE ON FILE" (SOF).',
      'Electronic claims (837P) transmit this as a "Y" flag in EDI Loop 2300 CLM09.',
      'Medical practice must maintain a signed paper/electronic HIPAA consent form in the patient’s permanent chart.'
    ],
    rejectionCauses: [
      'Missing SOF or date on paper submission.',
      'Payer audit failure and complete refund demand if clinic cannot produce signed HIPAA release during record review.'
    ]
  },
  {
    boxNumber: '13',
    name: "Insured's or Authorized Person's Signature (AOB)",
    shortName: 'Assignment of Benefits (AOB)',
    category: 'patient',
    sampleValue: 'SIGNATURE ON FILE (SOF)',
    ediMapping: '837P Loop 2300 CLM08 (Benefits Assignment Certification Indicator: Y, N, or W)',
    description: 'Authorizes the insurance carrier to send reimbursement checks directly to the healthcare provider rather than mailing payment to the patient.',
    rules: [
      'Stands for Assignment of Benefits.',
      'Populated with "SIGNATURE ON FILE" (SOF) upon patient signing the financial agreement.',
      'Crucial for non-participating (out-of-network) providers who wish to receive direct payment.',
      'If marked "N" or left blank, the insurance company will legally mail the payment check to the patient’s residential address!'
    ],
    rejectionCauses: [
      'If left blank or marked "N", payer mails check to patient. The clinic AR team must then chase the patient to collect reimbursement.',
      'Lack of valid AOB in audit triggers payer clawback.'
    ]
  },
  {
    boxNumber: '14',
    name: 'Date of Current Illness, Injury, or Pregnancy (LMP)',
    shortName: 'Onset Date / LMP & Qualifier',
    category: 'clinical',
    sampleValue: '431 01 10 2025 (431 = Onset of Current Symptoms)',
    ediMapping: '837P Loop 2300 DTP segment (DTP01=431 Onset, or 484 LMP; DTP03=YYYYMMDD)',
    description: 'Reports the date of onset of current illness, injury, or the Last Menstrual Period (LMP) for pregnancy, along with a 3-digit qualifier.',
    rules: [
      'Must include a 3-digit qualifier in the small left-hand box: "431" (Onset of Current Symptoms or Illness), or "484" (Last Menstrual Period).',
      'Format: 8-digit date (MM DD YYYY).',
      'Mandatory for all maternity/obstetrical services, chiropractic spinal subluxation claims, and injury liability claims.'
    ],
    rejectionCauses: [
      'Missing qualifier (431/484).',
      'Omission of LMP on obstetric ultrasound or prenatal delivery claims (causes CARC CO-16 / RARC M59).'
    ]
  },
  {
    boxNumber: '15',
    name: 'Other Date & Qualifier',
    shortName: 'Other Clinical Date & Qualifier',
    category: 'clinical',
    sampleValue: '454 01 12 2025 (454 = Initial Treatment Date)',
    ediMapping: '837P Loop 2300 DTP segment (DTP01=454 Initial Treatment, 453 Acute Manifestation, 304 Latest Visit)',
    description: 'Reports another clinical date related to the patient’s condition, accompanied by a 3-digit qualifier.',
    rules: [
      'Qualifiers include: "454" (Initial Treatment Date), "304" (Latest Visit or Consultation), "453" (Acute Manifestation of Chronic Condition), "439" (Accident Date).',
      'Commonly used for physical therapy, occupational therapy, and chiropractic maintenance care plans.'
    ],
    rejectionCauses: ['Entering a date without a valid 3-digit qualifier.']
  },
  {
    boxNumber: '16',
    name: 'Dates Patient Unable to Work in Current Occupation',
    shortName: 'Work Disability Dates',
    category: 'clinical',
    sampleValue: 'From: 01 10 2025 To: 01 24 2025',
    ediMapping: '837P Loop 2300 DTP segment (DTP01=314 Disability From, DTP01=315 Disability To)',
    description: 'Reports the beginning and ending dates that the patient was medically incapacitated from performing regular employment duties.',
    rules: [
      'Required for Workers Compensation, short-term disability, and commercial disability claims.',
      'Leave blank on standard commercial office visits unless disability evaluation is being claimed.'
    ],
    rejectionCauses: ['Date range contradicts clinical documentation in the medical chart.']
  },
  {
    boxNumber: '17',
    name: 'Name of Referring Provider or Other Source',
    shortName: 'Referring / Ordering Provider Name',
    category: 'provider',
    sampleValue: 'DN DR. GREGORY HOUSE MD',
    ediMapping: '837P Loop 2310A NM1 segment (NM101=DN Referring, DK Ordering, DQ Supervising)',
    description: 'Reports the legal name and credential of the physician who referred the patient or ordered diagnostic tests, specialty consultations, or DME equipment.',
    rules: [
      'Must include a 2-character qualifier in the leftmost margin: "DN" (Referring Provider), "DK" (Ordering Provider), or "DQ" (Supervising Provider).',
      'Mandatory for all specialist consultations, physical therapy, imaging (MRI, CT, X-ray), laboratory tests, and DME items.',
      'Box 17b must contain the 10-digit Type 1 individual NPI of this referring doctor.'
    ],
    rejectionCauses: [
      'Missing qualifier (DN/DK/DQ).',
      'Referring doctor NPI missing in Box 17b or not enrolled in Medicare PECOS (causes CARC CO-16 / RARC N574).'
    ]
  },
  {
    boxNumber: '17a',
    name: 'Other ID# of Referring Provider',
    shortName: 'Referring Provider Legacy ID',
    category: 'provider',
    sampleValue: '0B LIC987654 (Qualifier 0B State License)',
    ediMapping: '837P Loop 2310A REF segment (REF01=0B, 1G, G2)',
    description: 'Reports a non-NPI legacy identifier for the referring physician (State license, UPIN, or commercial payer provider number).',
    rules: [
      'Must be preceded by a 2-character qualifier: "0B" (State License #), "1G" (Legacy UPIN), "G2" (Commercial Provider ID).',
      'Most payers now reject legacy numbers and mandate the NPI in Box 17b.'
    ],
    rejectionCauses: ['Submitting legacy number without qualifier.']
  },
  {
    boxNumber: '17b',
    name: 'National Provider Identifier (NPI) of Referring Provider',
    shortName: 'Referring Provider NPI',
    category: 'provider',
    sampleValue: '1982736450',
    ediMapping: '837P Loop 2310A NM109 (NM108=XX National Provider Identifier)',
    description: 'The 10-digit Type 1 (Individual) National Provider Identifier of the referring or ordering physician.',
    rules: [
      'Must be a valid 10-digit numeric NPI passing the Luhn algorithm.',
      'Must be actively enrolled in CMS PECOS for Medicare and Medicaid claims.',
      'Required whenever Box 17 is completed.'
    ],
    rejectionCauses: [
      'Deactivated or deceased referring NPI.',
      'Referring physician not enrolled in PECOS (denial CARC CO-16 / RARC N286).'
    ]
  },
  {
    boxNumber: '18',
    name: 'Hospitalization Dates Related to Current Services',
    shortName: 'Related Inpatient Hospital Dates',
    category: 'clinical',
    sampleValue: 'From: 01 10 2025 To: 01 14 2025',
    ediMapping: '837P Loop 2300 DTP segment (DTP01=435 Admission, DTP01=096 Discharge)',
    description: 'Reports the inpatient hospital admission and discharge dates when a physician bills professional inpatient visits (e.g. CPT 99221-99233).',
    rules: [
      'Mandatory when Place of Service (Box 24B) is "21" (Inpatient Hospital).',
      'Format: MM DD YYYY From and To dates.',
      'Dates must match the institutional UB-04 hospital admission/discharge record.'
    ],
    rejectionCauses: [
      'Billing POS 21 (Inpatient) with blank Box 18 hospitalization dates.',
      'Discharge date precedes admission date.'
    ]
  },
  {
    boxNumber: '19',
    name: 'Additional Claim Information (Reserved for Local Use)',
    shortName: 'Claim Narrative / Additional Context',
    category: 'billing',
    sampleValue: 'NOC: Urgent evaluation of acute thoracic radiculopathy with intractable spasm',
    ediMapping: '837P Loop 2300 NTE segment (NTE01=ADD, NTE02=Narrative Text up to 80 chars)',
    description: 'A free-text narrative space used to communicate critical clinical context that cannot be conveyed via standard code sets.',
    rules: [
      'Used for unlisted procedure codes (CPT ending in 99, e.g. 29999, 99499) explaining what surgical service was rendered.',
      'Enter Last Menstrual Period (LMP) if Box 14 is occupied.',
      'Report specialty anesthesia start/stop times, dental cross-coding explanations, or justification for unusual emergency procedures.'
    ],
    rejectionCauses: [
      'Billing an unlisted procedure code (e.g. 99499) without explanatory narrative in Box 19 leads to immediate CARC CO-16 denial.'
    ]
  },
  {
    boxNumber: '20',
    name: 'Outside Lab? & $ Charges',
    shortName: 'Outside / Purchased Lab Indicator',
    category: 'billing',
    sampleValue: 'Outside Lab: NO (Checked) | $ Charges: [BLANK]',
    ediMapping: '837P Loop 2400 PS1 segment (PS101=Purchased Service Provider ID, PS102=Amount)',
    description: 'Reports whether laboratory tests billed on this claim were performed by an independent outside reference laboratory.',
    rules: [
      'Check "YES" or "NO".',
      'If "YES", the total dollar amount paid to the outside reference lab must be reported in the "$ Charges" field.',
      'Many state anti-markup statutes prohibit physicians from marking up purchased laboratory charges.'
    ],
    rejectionCauses: [
      'Checking "YES" but leaving "$ Charges" blank.',
      'Violation of state laboratory pass-through billing regulations.'
    ]
  },
  {
    boxNumber: '21',
    name: 'Diagnosis or Nature of Illness or Injury (ICD-10-CM)',
    shortName: 'Diagnosis Codes (ICD-10-CM)',
    category: 'clinical',
    sampleValue: 'ICD Ind: 0 | A: M54.50 | B: I10 | C: E11.9 | D: G43.909',
    ediMapping: '837P Loop 2300 HI segment (HI01-1=ABK for ICD-10, HI01-2=Diagnosis Code)',
    description: 'Lists up to 12 ICD-10-CM diagnosis codes establishing medical necessity for the procedures performed.',
    rules: [
      'Enter up to 12 diagnoses on lines A through L.',
      'The "ICD Ind." indicator box must be marked with "0" indicating ICD-10-CM ("9" indicates legacy ICD-9).',
      'Diagnosis pointer in Box 24E links these letters (A–L) to each individual CPT line item.',
      'Line A MUST contain the primary diagnosis representing the chief reason for the medical encounter.'
    ],
    rejectionCauses: [
      'Truncated ICD-10 codes missing 4th, 5th, 6th, or 7th characters (denial CARC CO-16 / RARC M76).',
      'Mismatched diagnosis indicator (entering "9" for ICD-10 codes).',
      'Medical necessity failure (LCD/NCD) because the linked diagnosis code is not covered for the billed CPT.'
    ]
  },
  {
    boxNumber: '22',
    name: 'Resubmission Code & Original Reference Number',
    shortName: 'Corrected Claim Resubmission Info',
    category: 'billing',
    sampleValue: 'Code: 7 | Original Ref: 2025011500892X',
    ediMapping: '837P Loop 2300 CLM05-3 (Claim Frequency Code: 7=Replacement, 8=Void) and Loop 2300 REF*F8 (Payer Claim Control Number)',
    description: 'Used when submitting corrected, replacement, or voided claims to an insurance payer.',
    rules: [
      'Resubmission Code: Enter "7" for Replacement/Corrected Claim, or "8" for Void/Cancel Claim.',
      'Original Ref No: The unique Internal Control Number (ICN) or Document Control Number (DCN) assigned by the payer to the original claim.',
      'Must NEVER be used for an original first-time claim submission.'
    ],
    rejectionCauses: [
      'Submitting Resubmission Code "7" without the Original Claim Reference Number (ICN).',
      'Submitting a corrected claim without Box 22 populated causes the payer to reject it as a duplicate claim (CARC CO-18).'
    ]
  },
  {
    boxNumber: '23',
    name: 'Prior Authorization / Referral / CLIA Number',
    shortName: 'Prior Auth / Referral / CLIA Number',
    category: 'billing',
    sampleValue: 'PA-9821447 (or CLIA: 45D0987654)',
    ediMapping: '837P Loop 2300 REF*G1 (Prior Auth), REF*9F (Referral), REF*X4 (CLIA ID)',
    description: 'Multi-purpose box to report Prior Authorization Number, Referral Certification Number, or 10-digit CLIA Laboratory Quality ID.',
    rules: [
      'Prior Auth: Enter alphanumeric authorization issued by payer Utilization Management before procedure.',
      'CLIA: If billing in-house laboratory procedures (e.g. CPT 87880 Strep, 81002 Urinalysis), enter the 10-digit CLIA certificate number.',
      'Never mix both auth and CLIA in the single paper box; electronic 837P splits them into distinct loops (REF*G1 vs REF*X4).'
    ],
    rejectionCauses: [
      'Missing or expired Prior Auth number results in fatal CARC CO-197 denial.',
      'Missing CLIA number for laboratory CPTs causes CO-16 / RARC MA120 rejection.'
    ]
  },
  {
    boxNumber: '24A',
    name: 'Dates of Service (From / To)',
    shortName: 'Date of Service (DOS)',
    category: 'clinical',
    sampleValue: 'From: 01 15 25 | To: 01 15 25',
    ediMapping: '837P Loop 2400 DTP segment (DTP01=472 Service Date, DTP03=YYYYMMDD)',
    description: 'Reports the beginning and ending calendar date on which the procedure or service was rendered.',
    rules: [
      'Format: 6-digit (MM DD YY) or 8-digit (MM DD YYYY).',
      'For single-day outpatient services, From and To dates are identical.',
      'For multi-day rental or hospitalized care, date spans must match the unit count in Box 24G.'
    ],
    rejectionCauses: [
      'Date of service in the future.',
      'Date of service outside the patient’s active policy coverage dates (CARC CO-27).'
    ]
  },
  {
    boxNumber: '24B',
    name: 'Place of Service (POS)',
    shortName: 'Place of Service Code',
    category: 'clinical',
    sampleValue: '11 (Office)',
    ediMapping: '837P Loop 2400 SV105 (Place of Service Code)',
    description: 'A 2-digit standard CMS code indicating the physical setting where the service was provided.',
    rules: [
      'Standard POS codes: 11 (Office), 21 (Inpatient Hospital), 22 (On-Campus Outpatient Hospital), 24 (Ambulatory Surgical Center), 12 (Home), 02 (Telehealth outside patient home), 10 (Telehealth in patient home).',
      'Dictates whether Medicare applies facility vs non-facility Practice Expense RVU pricing.'
    ],
    rejectionCauses: [
      'Mismatch between POS and billed procedure (e.g. billing major inpatient surgery with POS 11 Office).',
      'Mismatch between POS and Box 32 Service Facility address.'
    ]
  },
  {
    boxNumber: '24C',
    name: 'Emergency Indicator (EMG)',
    shortName: 'Emergency Indicator',
    category: 'clinical',
    sampleValue: '[BLANK or Y]',
    ediMapping: '837P Loop 2400 SV109 (Emergency Indicator: Y or blank)',
    description: 'Indicates whether the service was rendered in response to an acute medical emergency.',
    rules: [
      'Enter "Y" for emergency services; leave blank if non-emergency.',
      'Commonly required for Medicaid emergency room physician services or emergency dental encounters.'
    ],
    rejectionCauses: ['Entering "Y" without supporting emergency diagnosis codes.']
  },
  {
    boxNumber: '24D',
    name: 'Procedures, Services, or Supplies (CPT / HCPCS & Modifiers)',
    shortName: 'CPT / HCPCS & Modifiers',
    category: 'clinical',
    sampleValue: 'CPT: 99214 | Modifiers: 25, --, --, --',
    ediMapping: '837P Loop 2400 SV101-2 (Procedure Code), SV101-3 to SV101-6 (Modifiers 1-4)',
    description: 'Reports the 5-digit CPT code or alphanumeric HCPCS Level II code and up to 4 two-character modifiers.',
    rules: [
      '5-digit CPT (e.g. 99214, 20610) or HCPCS (e.g. J7325, A0428).',
      'Provides 4 modifier columns (e.g. 25, 59, RT, LT, 76).',
      'Must correspond directly to signed physician documentation in the patient chart.'
    ],
    rejectionCauses: [
      'Invalid, truncated, or retired CPT code.',
      'Omission of required modifier (e.g. omitting Modifier 25 when billing an E&M with an injection causes CO-97 bundle denial).'
    ]
  },
  {
    boxNumber: '24E',
    name: 'Diagnosis Pointer',
    shortName: 'Diagnosis Pointer (A–L)',
    category: 'clinical',
    sampleValue: 'A, B',
    ediMapping: '837P Loop 2400 SV107-1 to SV107-4 (Diagnosis Code Pointers)',
    description: 'Links the procedure code in Box 24D to one or more diagnosis letter lines (A through L) in Box 21.',
    rules: [
      'Must use letters (A, B, C, D, etc.) matching Box 21. (Numeric pointers 1, 2, 3 were discontinued in 02/12 revision).',
      'Up to 4 letter pointers can be reported per service line, listed in order of clinical relevance.',
      'Establishes medical necessity for each individual charge.'
    ],
    rejectionCauses: [
      'Using numbers instead of letters (e.g. "1, 2" instead of "A, B").',
      'Pointing to an empty letter line in Box 21 (e.g. pointing to "D" when only A and B are populated).'
    ]
  },
  {
    boxNumber: '24F',
    name: '$ Charges',
    shortName: 'Line Item Charge',
    category: 'billing',
    sampleValue: '$225.00',
    ediMapping: '837P Loop 2400 SV102 (Line Item Charge Amount)',
    description: 'The standard fee schedule charge submitted by the provider for this specific procedure line.',
    rules: [
      'Enter dollars and cents without dollar signs.',
      'Charge should equal unit price multiplied by Box 24G unit count.',
      'The sum of all Box 24F charges must equal Box 28 Total Charge.'
    ],
    rejectionCauses: ['Zero or negative charge amount.', 'Mathematical discrepancy between line items and Box 28.']
  },
  {
    boxNumber: '24G',
    name: 'Days or Units of Service',
    shortName: 'Days or Units',
    category: 'clinical',
    sampleValue: '1 (or 30 for J-code dosage units)',
    ediMapping: '837P Loop 2400 SV104 (Service Unit Count) and SV103 (Unit Basis: UN=Units, MJ=Minutes)',
    description: 'Reports the quantity of services rendered (e.g. 1 unit for office visit, 15-minute anesthesia increments, milligrams for injectable drugs).',
    rules: [
      'Standard office visits: 1 unit.',
      'Time-based therapy codes (e.g. CPT 97110 15 mins): 2 units = 30 mins.',
      'Drug HCPCS: Units must match the HCPCS dosage definition (e.g. J7325 Synvisc-One 1mg: 30mg injected = 30 units!).'
    ],
    rejectionCauses: [
      'Mismatch between NDC billing quantity and HCPCS unit count.',
      'Zero or blank units.'
    ]
  },
  {
    boxNumber: '24H',
    name: 'EPSDT / Family Plan',
    shortName: 'EPSDT / Family Planning',
    category: 'billing',
    sampleValue: '[BLANK or Y]',
    ediMapping: '837P Loop 2400 SV111 (EPSDT Indicator)',
    description: 'Medicaid Early and Periodic Screening, Diagnostic, and Treatment (EPSDT) or Family Planning indicator.',
    rules: [
      'Used exclusively on state Medicaid claims.',
      'Reports indicator codes such as "E" (EPSDT screening), "F" (Family planning service).'
    ],
    rejectionCauses: ['Entering non-Medicaid codes on commercial claims.']
  },
  {
    boxNumber: '24I',
    name: 'ID Qualifier',
    shortName: 'Rendering Provider ID Qualifier',
    category: 'provider',
    sampleValue: '[BLANK or 0B / G2]',
    ediMapping: '837P Loop 2420A REF01',
    description: 'Reports a 2-character qualifier in the top shaded portion if a non-NPI legacy provider number is reported in Box 24J.',
    rules: ['Leave blank unless reporting legacy IDs in shaded Box 24J.'],
    rejectionCauses: ['Entering NPI qualifier (XX) in Box 24I (XX is only used electronically).']
  },
  {
    boxNumber: '24J',
    name: 'Rendering Provider ID & NPI',
    shortName: 'Rendering Provider NPI',
    category: 'provider',
    sampleValue: '1234567890 (Bottom unshaded portion)',
    ediMapping: '837P Loop 2420A NM109 (NM108=XX National Provider Identifier)',
    description: 'Reports the 10-digit Type 1 (Individual) NPI of the physician or clinician who physically rendered the service on this line.',
    rules: [
      'The 10-digit individual NPI is entered in the LOWER UNSHADED area.',
      'The top shaded area is reserved for non-NPI legacy identifiers preceded by the Box 24I qualifier.',
      'Mandatory when rendering clinician differs from the billing organization in Box 33.'
    ],
    rejectionCauses: [
      'Entering a Type 2 Organizational NPI in Box 24J (Box 24J must ALWAYS be a Type 1 Individual clinician NPI!).',
      'Rendering clinician not credentialed with payer network.'
    ]
  },
  {
    boxNumber: '25',
    name: 'Federal Tax ID Number (TIN / EIN / SSN)',
    shortName: 'Federal Tax ID (TIN / EIN)',
    category: 'provider',
    sampleValue: '75-1234567 (EIN Checked)',
    ediMapping: '837P Loop 2010AA REF segment (REF01=EI Employer ID, or SY Social Security)',
    description: 'The 9-digit IRS Taxpayer Identification Number (EIN or SSN) of the billing entity.',
    rules: [
      'Check either "EIN" (Employer Identification Number) or "SSN" (Social Security Number).',
      'Must match the IRS W-9 form registered with the payer credentialing department.',
      'Required for annual IRS 1099 miscellaneous income tax reporting.'
    ],
    rejectionCauses: [
      'TIN mismatch between claim and payer master provider file (causes instant non-par rejection or 100% claim withholding).'
    ]
  },
  {
    boxNumber: '26',
    name: "Patient's Account No.",
    shortName: 'Patient Account Number',
    category: 'billing',
    sampleValue: 'ACC-998241',
    ediMapping: '837P Loop 2300 CLM01 (Patient Control Number)',
    description: 'The unique patient account or chart number assigned by the practice management software (PMS).',
    rules: [
      'Can be up to 14 alphanumeric characters.',
      'The payer returns this exact number in the Electronic Remittance Advice (835 ERA CLP01 segment) so payments auto-post to the correct patient ledger.'
    ],
    rejectionCauses: [
      'Missing account number forces manual payment posting and reconciliation delays.'
    ]
  },
  {
    boxNumber: '27',
    name: 'Accept Assignment?',
    shortName: 'Accept Assignment (PAR Agreement)',
    category: 'billing',
    sampleValue: 'YES (Checked)',
    ediMapping: '837P Loop 2300 CLM07 (Provider Accept Assignment Code: A=Assigned, C=Not Assigned)',
    description: 'Indicates whether the provider accepts the payer’s allowed amount fee schedule as payment in full.',
    rules: [
      'Check "YES" or "NO".',
      'All participating (in-network) providers and mandatory assignment programs (Medicare clinical lab, Medicaid) must check "YES".',
      'If "YES", provider agrees never to balance bill the patient for contractual adjustments (CO-45).'
    ],
    rejectionCauses: [
      'Checking "NO" when enrolled as a participating provider violates the payer contract.'
    ]
  },
  {
    boxNumber: '28',
    name: 'Total Charge',
    shortName: 'Total Claim Charges',
    category: 'billing',
    sampleValue: '$755.00',
    ediMapping: '837P Loop 2300 CLM02 (Total Claim Charge Amount)',
    description: 'The total billed amount for all services rendered on this claim.',
    rules: [
      'Must exactly equal the mathematical sum of all Box 24F line item charges.',
      'Enter dollars and cents without dollar signs.'
    ],
    rejectionCauses: [
      'Mathematical mismatch between Box 28 and sum of Box 24F line items.'
    ]
  },
  {
    boxNumber: '29',
    name: 'Amount Paid',
    shortName: 'Upfront Patient Copay / Deductible Paid',
    category: 'billing',
    sampleValue: '$0.00 (or $25.00 Copay Collected)',
    ediMapping: '837P Loop 2300 AMT segment (AMT01=F3 Patient Paid Amount)',
    description: 'The total amount collected directly from the patient at the time of service (e.g. upfront copayment).',
    rules: [
      'Enter copays or deductibles collected at clinic check-in.',
      'If nothing was collected at time of service, enter $0.00 or leave blank per payer guidelines.',
      'Do not report prior insurance payments here (prior insurance payments belong in secondary billing Loop 2320).'
    ],
    rejectionCauses: [
      'Entering primary insurance payments in Box 29 on secondary claims (causes incorrect balance calculation).'
    ]
  },
  {
    boxNumber: '30',
    name: 'Reserved for NUCC Use',
    shortName: 'Reserved (Formerly Balance Due)',
    category: 'billing',
    sampleValue: '[BLANK]',
    ediMapping: 'N/A',
    description: 'Reserved for future NUCC national assignment. Formerly used for Balance Due.',
    rules: ['Leave completely blank on version 02/12.'],
    rejectionCauses: ['Populating text in reserved boxes.']
  },
  {
    boxNumber: '31',
    name: 'Signature of Physician or Supplier & Date',
    shortName: 'Physician Signature & Date',
    category: 'provider',
    sampleValue: 'SARAH JENKINS MD - 01/16/2025',
    ediMapping: '837P Loop 2300 CLM06 (Provider Signature on File: Y)',
    description: 'The legal signature of the physician or supplier who provided the services, including academic degrees/credentials, and the signature date.',
    rules: [
      'Can be an actual physical signature, rubber stamp (if allowed by state/payer), or standard shorthand "SIGNATURE ON FILE" (SOF).',
      'Electronic claims transmit a "Y" flag in Loop 2300 CLM06.',
      'Must include the date the claim was signed.'
    ],
    rejectionCauses: [
      'Blank Box 31 on paper claims causes immediate rejection as an unsigned legal document.'
    ]
  },
  {
    boxNumber: '32',
    name: 'Service Facility Location Information',
    shortName: 'Service Facility Physical Address',
    category: 'provider',
    sampleValue: 'DALLAS SPINE & JOINT CENTER, 777 MEDICAL PKWY STE 200, DALLAS TX 75201',
    ediMapping: '837P Loop 2310C NM1 (Facility Name), N3 (Street), N4 (City, State, 9-digit ZIP)',
    description: 'The physical street location where services were actually rendered to the patient.',
    rules: [
      'CANNOT BE A P.O. BOX! Must be a physical physical street address under federal regulations.',
      'Payers use the Box 32 9-digit ZIP code to calculate locality pricing and determine in-network geographic tier.',
      'Required when the service facility differs from the billing provider address in Box 33.'
    ],
    rejectionCauses: [
      'Entering a P.O. Box in Box 32 causes immediate clearinghouse rejection.',
      'Missing 9-digit ZIP code (ZIP+4) for Medicare claims.'
    ]
  },
  {
    boxNumber: '32a',
    name: 'National Provider Identifier of Service Facility',
    shortName: 'Service Facility NPI',
    category: 'provider',
    sampleValue: '1982736450',
    ediMapping: '837P Loop 2310C NM109 (NM108=XX)',
    description: 'The 10-digit Type 2 (Organizational) NPI of the physical service facility.',
    rules: ['Required when Box 32 is completed and the facility has an assigned NPI.'],
    rejectionCauses: ['Invalid 10-digit NPI.']
  },
  {
    boxNumber: '32b',
    name: 'Other ID# of Service Facility',
    shortName: 'Service Facility Legacy ID',
    category: 'provider',
    sampleValue: '0B LIC-TX8842',
    ediMapping: '837P Loop 2310C REF segment',
    description: 'Reports a legacy non-NPI identifier preceded by a 2-character qualifier (0B, G2, LU).',
    rules: ['Leave blank unless required by specific state Medicaid or commercial plans.'],
    rejectionCauses: ['Missing qualifier.']
  },
  {
    boxNumber: '33',
    name: 'Billing Provider Info & Telephone Number',
    shortName: 'Billing Provider Entity & Phone',
    category: 'provider',
    sampleValue: 'METROPLEX CLINIC PARTNERS LLC, PO BOX 8840, DALLAS TX 75201 | Phone: (214) 555-0199',
    ediMapping: '837P Loop 2010AA NM1 (Legal Name), N3 (Address), N4 (City, State, ZIP), PER (Contact)',
    description: 'The legal name, address, and telephone number of the billing entity to whom payment and electronic remittance advice must be directed.',
    rules: [
      'Can be a physical address or P.O. Box for payments.',
      'Must match the billing entity registered with the payer under the TIN reported in Box 25.',
      'All EFT electronic funds transfers and paper checks are mailed according to this box.'
    ],
    rejectionCauses: [
      'Billing entity address or telephone missing.',
      'Billing name does not match the IRS W-9 TIN master file.'
    ]
  },
  {
    boxNumber: '33a',
    name: 'National Provider Identifier of Billing Provider',
    shortName: 'Billing Provider NPI',
    category: 'provider',
    sampleValue: '1876543210 (Type 2 Group NPI)',
    ediMapping: '837P Loop 2010AA NM109 (NM108=XX)',
    description: 'The 10-digit National Provider Identifier (NPI) of the billing entity (typically Type 2 Group NPI, or Type 1 for solo practice).',
    rules: [
      'Mandatory on all claims without exception.',
      'Must match the provider registration record in the payer EDI clearinghouse database.'
    ],
    rejectionCauses: [
      'Missing or invalid billing NPI causes instant level-1 EDI clearinghouse rejection (999/277CA).'
    ]
  },
  {
    boxNumber: '33b',
    name: 'Other ID# of Billing Provider & Taxonomy Code',
    shortName: 'Billing Provider Taxonomy Code',
    category: 'provider',
    sampleValue: 'ZZ207Q00000X (ZZ = Healthcare Provider Taxonomy)',
    ediMapping: '837P Loop 2000A PRV segment (PRV01=BI, PRV02=PXC, PRV03=Taxonomy Code)',
    description: 'Reports the 10-character alphanumeric Healthcare Provider Specialty Taxonomy Code prefixed with qualifier "ZZ".',
    rules: [
      'Preceded by 2-character qualifier "ZZ".',
      'Mandatory for all Medicaid, managed care HMO, and commercial plans to verify specialist billing rights.',
      'Taxonomy must match the official specialty classification registered in the NPPES NPI Registry.'
    ],
    rejectionCauses: [
      'Missing "ZZ" qualifier.',
      'Taxonomy code mismatch causing payer to adjudicate claim under wrong fee schedule.'
    ]
  }
];

// ==============================================================
// COMPLETE UB-04 (CMS-1450) DIRECTORY - ALL 81 FORM LOCATORS
// In 100% Correct Sequential Order (FL 01 through FL 81)
// ==============================================================
export const UB_04_BOXES: Ub04BoxDetail[] = [
  {
    locatorNumber: 'FL 01',
    name: 'Billing Provider Name, Street Address & Phone',
    shortName: 'Facility Legal Name & Address',
    category: 'provider',
    sampleValue: 'TEXAS GENERAL HOSPITAL, 1000 HEALTHCARE BLVD, AUSTIN TX 78705 | (512) 555-0100',
    ediMapping: '837I Loop 2010AA NM1/N3/N4',
    description: 'The official legal name, physical street address, and telephone number of the institutional facility submitting the claim.',
    rules: [
      'Must match state hospital licensure and Medicare provider enrollment records.',
      'Remittance checks are sent to this address unless FL 02 (Pay-To) is populated.'
    ],
    rejectionCauses: ['Address mismatch against Medicare PECOS master institutional file.']
  },
  {
    locatorNumber: 'FL 02',
    name: 'Pay-To Name and Address',
    shortName: 'Pay-To Address (Bank Lockbox)',
    category: 'provider',
    sampleValue: 'TEXAS GENERAL HEALTH SYSTEM, PO BOX 4000, AUSTIN TX 78767',
    ediMapping: '837I Loop 2010AB NM1/N3/N4',
    description: 'The designated bank lockbox or corporate entity address where payments must be routed if different from FL 01.',
    rules: ['Only completed if payment routing differs from the physical facility in FL 01.'],
    rejectionCauses: ['Invalid bank lockbox ZIP code.']
  },
  {
    locatorNumber: 'FL 03a',
    name: 'Patient Control Number',
    shortName: 'Patient Billing Account #',
    category: 'patient',
    sampleValue: 'HOSP-889921',
    ediMapping: '837I Loop 2300 CLM01 (Patient Control Number)',
    description: 'The hospital’s internal patient billing account number assigned by the hospital information system (HIS).',
    rules: [
      'Returned on the 835 ERA remittance (CLP01 segment) to enable automated cash posting.',
      'Can be up to 24 alphanumeric characters.'
    ],
    rejectionCauses: ['Missing patient control number prevents automated payment posting.']
  },
  {
    locatorNumber: 'FL 03b',
    name: 'Medical Record Number (MRN)',
    shortName: 'Medical Record Number (MRN)',
    category: 'patient',
    sampleValue: 'MRN-442190',
    ediMapping: '837I Loop 2300 REF*EA (Medical Record Number)',
    description: 'The patient’s permanent hospital chart/EMR identifier used for medical records auditing and clinical chart retrieval.',
    rules: ['Must match the hospital HIM (Health Information Management) permanent chart index.'],
    rejectionCauses: ['MRN mismatch on clinical audit reviews.']
  },
  {
    locatorNumber: 'FL 04',
    name: 'Type of Bill (TOB - 4 Digits)',
    shortName: 'Type of Bill (TOB)',
    category: 'codes',
    sampleValue: '0111 (Hospital Inpatient, Admit through Discharge)',
    ediMapping: '837I Loop 2300 CLM05-1 (Facility Code), CLM05-2 (Bill Classification), CLM05-3 (Frequency)',
    description: 'A 4-digit code identifying: 1) Leading zero, 2) Type of Facility (1=Hospital, 2=SNF, 3=Home Health), 3) Bill Classification (1=Inpatient, 3=Outpatient), 4) Frequency (1=Admit through discharge, 7=Replacement, 8=Void).',
    rules: [
      'Leading zero is standard (e.g. 0111).',
      'Common codes: 0111 (Inpatient acute), 0131 (Outpatient hospital), 0117 (Corrected/replacement inpatient claim).',
      'Dictates payer adjudication logic (DRG vs APC vs fee schedule).'
    ],
    rejectionCauses: [
      'Invalid TOB code combination.',
      'Submitting 0111 for outpatient observation care (must be 0131).'
    ]
  },
  {
    locatorNumber: 'FL 05',
    name: 'Federal Tax Number (TIN / EIN)',
    shortName: 'Facility Federal Tax ID',
    category: 'provider',
    sampleValue: '74-9876543',
    ediMapping: '837I Loop 2010AA REF*EI',
    description: 'The 9-digit IRS Taxpayer Identification Number (EIN) of the billing hospital or institution.',
    rules: ['Must match the IRS W-9 form and Medicare provider agreement.'],
    rejectionCauses: ['TIN mismatch causes immediate claim suspension or withholding.']
  },
  {
    locatorNumber: 'FL 06',
    name: 'Statement Covers Period (From / Through)',
    shortName: 'Statement Covers Dates',
    category: 'patient',
    sampleValue: 'From: 01 10 2025 | Through: 01 14 2025',
    ediMapping: '837I Loop 2300 DTP*434 (Statement From/Through: YYYYMMDD-YYYYMMDD)',
    description: 'The beginning and ending calendar dates covered by this specific hospital bill.',
    rules: [
      'Must encompass all line item service dates in FL 45.',
      'For continuous inpatient stays billed monthly, Through date marks the end of the billing cycle.'
    ],
    rejectionCauses: ['Line item service date falls outside the Statement Covers Period.']
  },
  {
    locatorNumber: 'FL 07',
    name: 'Reserved for Assignment by NUBC',
    shortName: 'Reserved FL 07',
    category: 'reserved',
    sampleValue: '[BLANK - Do Not Populate]',
    ediMapping: 'N/A',
    description: 'Reserved for future national assignment by the National Uniform Billing Committee (NUBC).',
    rules: ['Must be left completely blank.'],
    rejectionCauses: ['Populating text in reserved fields causes optical scanning failure.']
  },
  {
    locatorNumber: 'FL 08a',
    name: 'Patient Identifier (Patient ID)',
    shortName: 'Patient Identifier / Card ID',
    category: 'patient',
    sampleValue: '1EG4-TE5-MK72 (or Card ID)',
    ediMapping: '837I Loop 2010CA REF*EJ',
    description: 'An internal hospital patient identifier number or state-specific Medicaid patient ID.',
    rules: ['Used when state regulations or specific payers mandate a patient identification number distinct from FL 60.'],
    rejectionCauses: ['Entering invalid patient identifier.']
  },
  {
    locatorNumber: 'FL 08b',
    name: 'Patient Name (Last, First, Middle Initial)',
    shortName: 'Patient Full Legal Name',
    category: 'patient',
    sampleValue: 'RAMIREZ, CARLOS D.',
    ediMapping: '837I Loop 2010CA NM103 (Last), NM104 (First), NM105 (Middle)',
    description: 'The patient’s legal name formatted as Last Name, First Name, Middle Initial.',
    rules: ['Must match the hospital admission face sheet and government insurance card.'],
    rejectionCauses: ['Demographic spelling mismatch with payer records.']
  },
  {
    locatorNumber: 'FL 09',
    name: 'Patient Address (Street, City, State, ZIP, Country)',
    shortName: 'Patient Residential Address',
    category: 'patient',
    sampleValue: '9a: 502 CONGRESS AVE | 9b: AUSTIN | 9c: TX | 9d: 78701 | 9e: USA',
    ediMapping: '837I Loop 2010CA N301 (Street), N401 (City), N402 (State), N403 (ZIP), N404 (Country)',
    description: 'The patient’s primary physical residential address broken down into street, city, state, ZIP code, and country.',
    rules: [
      'Street address in 9a, City in 9b, State in 9c, ZIP code in 9d, Country code in 9e.',
      'Must contain a valid 5- or 9-digit postal code.'
    ],
    rejectionCauses: ['Invalid ZIP code or missing city/state.']
  },
  {
    locatorNumber: 'FL 10',
    name: 'Patient Birthdate',
    shortName: 'Patient Date of Birth',
    category: 'patient',
    sampleValue: '11 22 1958',
    ediMapping: '837I Loop 2010CA DMG02 (YYYYMMDD)',
    description: 'The patient’s date of birth in 8-digit format (MM DD YYYY).',
    rules: [
      'Must be 8 numeric digits.',
      'Used to calculate pediatric vs adult DRG groupers.'
    ],
    rejectionCauses: ['DOB discrepancy against Medicare/Social Security master enrollment files.']
  },
  {
    locatorNumber: 'FL 11',
    name: 'Patient Sex',
    shortName: 'Patient Biological Sex',
    category: 'patient',
    sampleValue: 'M (Male)',
    ediMapping: '837I Loop 2010CA DMG03 (M, F, U)',
    description: 'Reports the biological sex of the patient: M (Male), F (Female), or U (Unknown).',
    rules: ['Must be compatible with gender-specific diagnoses and procedure codes.'],
    rejectionCauses: ['Gender mismatch edit against ICD-10 diagnosis.']
  },
  {
    locatorNumber: 'FL 12',
    name: 'Admission / Start of Care Date',
    shortName: 'Admission Date',
    category: 'patient',
    sampleValue: '01 10 2025',
    ediMapping: '837I Loop 2300 DTP*435 (Admission Date: YYYYMMDD)',
    description: 'The calendar date the patient was formally admitted to the hospital for inpatient care, or start of care date.',
    rules: [
      'Required on all inpatient hospital claims.',
      'Governs the CMS 72-Hour Rule (3-day payment window for diagnostic outpatient services).'
    ],
    rejectionCauses: ['Admission date later than Statement Covers Period From date.']
  },
  {
    locatorNumber: 'FL 13',
    name: 'Admission Hour',
    shortName: 'Admission Hour (Military Time)',
    category: 'patient',
    sampleValue: '08 (8:00 AM)',
    ediMapping: '837I Loop 2300 CL102 (Admission Hour: 00-23)',
    description: 'The time of day the patient was admitted, reported in 2-digit military time (00 to 23).',
    rules: [
      'Enter 00 for midnight, 12 for noon, 23 for 11:00 PM.',
      'Required on all inpatient claims.'
    ],
    rejectionCauses: ['Hour values greater than 23 or invalid formatting.']
  },
  {
    locatorNumber: 'FL 14',
    name: 'Priority (Type) of Admission',
    shortName: 'Admission Priority Code',
    category: 'codes',
    sampleValue: '1 (Emergency)',
    ediMapping: '837I Loop 2300 CL101 (Admission Type Code)',
    description: 'Reports the clinical urgency of the admission: 1=Emergency, 2=Urgent, 3=Elective, 4=Newborn, 5=Trauma Center.',
    rules: [
      'Emergency (1) indicates patient requires immediate medical intervention to prevent death or disability.',
      'Elective (3) requires prior authorization before hospital admission.'
    ],
    rejectionCauses: ['Billing Elective admission without prior authorization in FL 63.']
  },
  {
    locatorNumber: 'FL 15',
    name: 'Point of Origin for Admission',
    shortName: 'Point of Origin (Source of Admission)',
    category: 'codes',
    sampleValue: '7 (Emergency Room Transfer)',
    ediMapping: '837I Loop 2300 CL103 (Point of Origin Code)',
    description: 'Indicates where the patient was prior to hospital admission: 1=Non-health care facility (Home), 2=Clinic referral, 4=Transfer from hospital, 7=Emergency room, 8=Court/law enforcement.',
    rules: [
      'Identifies whether patient was admitted through the hospital’s own ER.',
      'For newborns: 5=Born inside hospital, 6=Born outside hospital.'
    ],
    rejectionCauses: ['Code inconsistent with billed ER revenue codes (Rev 0450).']
  },
  {
    locatorNumber: 'FL 16',
    name: 'Discharge Hour',
    shortName: 'Discharge Hour (Military Time)',
    category: 'patient',
    sampleValue: '14 (2:00 PM)',
    ediMapping: '837I Loop 2300 DTP*096 (Discharge Date & Time)',
    description: 'The time of day the patient was formally discharged, in 2-digit military time (00 to 23).',
    rules: [
      'Required on all inpatient claims with discharge status other than 30 (Still patient).',
      'Leave blank if patient has not been discharged.'
    ],
    rejectionCauses: ['Discharge hour populated when patient status is 30 (Still a patient).']
  },
  {
    locatorNumber: 'FL 17',
    name: 'Patient Discharge Status Code',
    shortName: 'Discharge Status (2 Digits)',
    category: 'patient',
    sampleValue: '01 (Discharged to Home or Self Care)',
    ediMapping: '837I Loop 2300 CL103 (Patient Status Code)',
    description: 'A 2-digit code describing the patient’s disposition and destination at the time of formal discharge.',
    rules: [
      'Common codes: 01 (Home/Self-care), 02 (Short-term acute hospital transfer), 03 (Skilled Nursing Facility SNF), 06 (Home Health Agency), 20 (Expired/Deceased), 30 (Still a patient).',
      'Governs the Post-Acute Care Transfer (PACT) DRG payment reduction policy under Medicare!'
    ],
    rejectionCauses: [
      'Reporting 01 (Home) when patient was transferred to SNF (Medicare PACT audit penalty).',
      'Discharge status contradicts medical chart discharge summary.'
    ]
  },
  {
    locatorNumber: 'FL 18',
    name: 'Condition Code 1',
    shortName: 'Condition Code 1',
    category: 'codes',
    sampleValue: 'P1 (Do Not Resuscitate DNR order on file)',
    ediMapping: '837I Loop 2300 HI segment (HI*BG:P1)',
    description: 'First of up to 11 two-character codes identifying special conditions, clinical circumstances, or statutory exceptions relating to this claim.',
    rules: [
      'Code P1: Do Not Resuscitate (DNR) order on file in medical chart.',
      'Code 02: Employment related condition (Workers Comp secondary).',
      'Code 21: Billing for denial notice (demanded by secondary payer).',
      'Condition codes alter payer processing rules, waiver liability, and statutory time limits.'
    ],
    rejectionCauses: ['Missing condition code required for statutory billing exception.']
  },
  {
    locatorNumber: 'FL 19',
    name: 'Condition Code 2',
    shortName: 'Condition Code 2',
    category: 'codes',
    sampleValue: '40 (Same-day transfer from hospital to another facility)',
    ediMapping: '837I Loop 2300 HI segment (HI*BG:40)',
    description: 'Second condition code slot for reporting additional administrative, clinical, or billing qualifiers.',
    rules: [
      'Code 40: Same-day transfer to another health care facility.',
      'Code 38: Billed for Medicare Secondary Payer (MSP) purposes.'
    ],
    rejectionCauses: ['Entering invalid 2-digit condition code syntax.']
  },
  {
    locatorNumber: 'FL 20',
    name: 'Condition Code 3',
    shortName: 'Condition Code 3',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BG)',
    description: 'Third condition code slot for reporting clinical or administrative circumstances.',
    rules: [
      'Code 28: Patient and/or spouse is employed and covered under employer group plan.',
      'Leave blank if fewer than 3 condition codes apply.'
    ],
    rejectionCauses: ['Entering duplicate condition codes across FL 18-28.']
  },
  {
    locatorNumber: 'FL 21',
    name: 'Condition Code 4',
    shortName: 'Condition Code 4',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BG)',
    description: 'Fourth condition code slot for institutional billing qualifiers.',
    rules: [
      'Code 42: Continuing Care.',
      'Code 55: SNF bed not available.'
    ],
    rejectionCauses: ['Invalid condition code format.']
  },
  {
    locatorNumber: 'FL 22',
    name: 'Condition Code 5',
    shortName: 'Condition Code 5',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BG)',
    description: 'Fifth condition code slot for reporting special patient circumstances.',
    rules: ['Leave blank if fewer than 5 condition codes apply.'],
    rejectionCauses: ['Invalid condition code format.']
  },
  {
    locatorNumber: 'FL 23',
    name: 'Condition Code 6',
    shortName: 'Condition Code 6',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BG)',
    description: 'Sixth condition code slot for reporting institutional qualifiers.',
    rules: ['Leave blank if fewer than 6 condition codes apply.'],
    rejectionCauses: ['Invalid condition code format.']
  },
  {
    locatorNumber: 'FL 24',
    name: 'Condition Code 7',
    shortName: 'Condition Code 7',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BG)',
    description: 'Seventh condition code slot for reporting institutional qualifiers.',
    rules: ['Leave blank if fewer than 7 condition codes apply.'],
    rejectionCauses: ['Invalid condition code format.']
  },
  {
    locatorNumber: 'FL 25',
    name: 'Condition Code 8',
    shortName: 'Condition Code 8',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BG)',
    description: 'Eighth condition code slot for reporting institutional qualifiers.',
    rules: ['Leave blank if fewer than 8 condition codes apply.'],
    rejectionCauses: ['Invalid condition code format.']
  },
  {
    locatorNumber: 'FL 26',
    name: 'Condition Code 9',
    shortName: 'Condition Code 9',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BG)',
    description: 'Ninth condition code slot for reporting replacement or void qualifiers.',
    rules: [
      'Code 67: Replacement claim for a previously adjudicated claim.',
      'Code 68: Void / Cancel previously adjudicated claim.'
    ],
    rejectionCauses: ['Entering replacement condition code without original DCN in FL 64.']
  },
  {
    locatorNumber: 'FL 27',
    name: 'Condition Code 10',
    shortName: 'Condition Code 10',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BG)',
    description: 'Tenth condition code slot for reporting institutional billing qualifiers.',
    rules: ['Leave blank if not applicable.'],
    rejectionCauses: ['Invalid condition code format.']
  },
  {
    locatorNumber: 'FL 28',
    name: 'Condition Code 11',
    shortName: 'Condition Code 11',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BG)',
    description: 'Eleventh condition code slot (final condition code box on paper form).',
    rules: [
      'Code A1: Early and Periodic Screening, Diagnostic and Treatment (EPSDT).',
      'Electronic 837I can transmit more than 11 condition codes in Loop 2300.'
    ],
    rejectionCauses: ['Entering text longer than 2 alphanumeric characters.']
  },
  {
    locatorNumber: 'FL 29',
    name: 'Accident State',
    shortName: 'Accident State Code',
    category: 'codes',
    sampleValue: 'TX (2-letter postal abbreviation)',
    ediMapping: '837I Loop 2300 HI segment (Accident State)',
    description: 'The 2-character USPS state postal abbreviation where the auto or other accident occurred.',
    rules: ['Required when Occurrence Code 01 (Auto accident) is reported in FL 31-34.'],
    rejectionCauses: ['Missing state code when auto accident occurrence is claimed.']
  },
  {
    locatorNumber: 'FL 30',
    name: 'Reserved for Assignment by NUBC',
    shortName: 'Reserved FL 30',
    category: 'reserved',
    sampleValue: '[BLANK]',
    ediMapping: 'N/A',
    description: 'Reserved for future national assignment by the NUBC.',
    rules: ['Must be left completely blank.'],
    rejectionCauses: ['Text entered in reserved fields.']
  },
  {
    locatorNumber: 'FL 31',
    name: 'Occurrence Code and Date 1 (FL 31a/b)',
    shortName: 'Occurrence Code & Date 1',
    category: 'codes',
    sampleValue: 'Code 11: 01 09 2025 (Onset of Symptoms / Illness)',
    ediMapping: '837I Loop 2300 HI segment (HI*BH:11:D8:20250109)',
    description: 'First occurrence code (FL 31a, 2 alphanumeric chars) and associated calendar date (FL 31b, MMDDYYYY) defining a specific event affecting benefits.',
    rules: [
      'Code 11: Onset of symptoms or illness.',
      'Code 01: Auto accident date (requires state in FL 29).',
      'Code 04: Employment / Industrial accident date.'
    ],
    rejectionCauses: ['Submitting an occurrence code without a valid calendar date or invalid MMDDYYYY format.']
  },
  {
    locatorNumber: 'FL 32',
    name: 'Occurrence Code and Date 2 (FL 32a/b)',
    shortName: 'Occurrence Code & Date 2',
    category: 'codes',
    sampleValue: 'Code 01: 01 10 2025 (Auto Accident Date)',
    ediMapping: '837I Loop 2300 HI segment (HI*BH:01:D8:20250110)',
    description: 'Second occurrence code and date field for reporting additional events affecting claim processing.',
    rules: [
      'Code 01: Auto accident date. Must report 2-letter state code in FL 29.',
      'Code 24: Date insurance denied prior authorization or coverage.'
    ],
    rejectionCauses: ['Missing accident state in FL 29 when occurrence code 01 is reported.']
  },
  {
    locatorNumber: 'FL 33',
    name: 'Occurrence Code and Date 3 (FL 33a/b)',
    shortName: 'Occurrence Code & Date 3',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BH)',
    description: 'Third occurrence code and date field for reporting coverage-impacting events.',
    rules: [
      'Code 29: Date of last physical therapy visit.',
      'Code 50: Date of Assessment (used in home health and hospice).',
      'Leave blank if no 3rd occurrence code applies.'
    ],
    rejectionCauses: ['Reporting occurrence code without date.']
  },
  {
    locatorNumber: 'FL 34',
    name: 'Occurrence Code and Date 4 (FL 34a/b)',
    shortName: 'Occurrence Code & Date 4',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BH)',
    description: 'Fourth occurrence code and date field on the paper UB-04 form.',
    rules: [
      'Code 35: Date of termination of Medicare secondary coverage.',
      'Leave blank if no 4th occurrence code applies.'
    ],
    rejectionCauses: ['Invalid occurrence code.']
  },
  {
    locatorNumber: 'FL 35',
    name: 'Occurrence Span Code & Dates 1 (FL 35a/b)',
    shortName: 'Occurrence Span Code 1 (From/Through)',
    category: 'codes',
    sampleValue: 'Code 70: 01 05 2025 - 01 08 2025 (Qualifying Stay Dates for SNF)',
    ediMapping: '837I Loop 2300 HI segment (HI*BI:70:RD8:20250105-20250108)',
    description: 'First occurrence span code (2 characters) and From / Through calendar date range (MMDDYYYY to MMDDYYYY) defining an event spanning a period of time.',
    rules: [
      'Code 70: Qualifying stay dates for SNF coverage (3 consecutive midnight hospital stay).',
      'Code 74: Non-covered level of care dates.'
    ],
    rejectionCauses: ['Span Through Date precedes Span From Date or spans outside Statement Covers Period.']
  },
  {
    locatorNumber: 'FL 36',
    name: 'Occurrence Span Code & Dates 2 (FL 36a/b)',
    shortName: 'Occurrence Span Code 2 (From/Through)',
    category: 'codes',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BI)',
    description: 'Second occurrence span code and date range field for hospital billing periods.',
    rules: [
      'Code 71: Prior stay dates.',
      'Code 76: Patient liability period.'
    ],
    rejectionCauses: ['Reporting span code without valid start and end dates.']
  },
  {
    locatorNumber: 'FL 37',
    name: 'Reserved for Assignment by NUBC',
    shortName: 'Reserved FL 37',
    category: 'reserved',
    sampleValue: '[BLANK]',
    ediMapping: 'N/A',
    description: 'Reserved for future national assignment by the NUBC.',
    rules: ['Must be left completely blank.'],
    rejectionCauses: ['Text entered in reserved fields.']
  },
  {
    locatorNumber: 'FL 38',
    name: 'Responsible Party Name and Address',
    shortName: 'Responsible Party / Guarantor',
    category: 'patient',
    sampleValue: 'RAMIREZ, CARLOS D., 502 CONGRESS AVE, AUSTIN TX 78701',
    ediMapping: '837I Loop 2010BD NM1/N3/N4 (Responsible Party Name & Address)',
    description: 'The name and physical billing address of the individual or legal entity responsible for the patient’s financial obligations.',
    rules: ['Required when patient is a minor or under legal guardianship.'],
    rejectionCauses: ['Missing responsible party when billing minor patients.']
  },
  {
    locatorNumber: 'FL 39',
    name: 'Value Code & Amount A (FL 39a/b)',
    shortName: 'Value Code & Amount A',
    category: 'charges',
    sampleValue: 'Code 01: $2,200.00 (Most Common Semi-Private Rate)',
    ediMapping: '837I Loop 2300 HI segment (HI*BE:01:::2200.00)',
    description: 'First of three value code blocks. Reports a 2-digit alphanumeric code (FL 39a) and associated monetary dollar amount or unit count (FL 39b).',
    rules: [
      'Code 01: Most common semi-private room rate.',
      'Code 80: Covered days (must equal room and board revenue days in FL 46).',
      'Value amounts are reported in dollars and cents (no dollar signs or commas on paper form).'
    ],
    rejectionCauses: ['Mismatch between Value Code 80 covered days and room & board revenue units in FL 46.']
  },
  {
    locatorNumber: 'FL 40',
    name: 'Value Code & Amount B (FL 40a/b)',
    shortName: 'Value Code & Amount B',
    category: 'charges',
    sampleValue: 'Code 80: 4.0 (Covered Inpatient Days)',
    ediMapping: '837I Loop 2300 HI segment (HI*BE:80:::4)',
    description: 'Second value code block for statistical, demographic, and financial thresholds.',
    rules: [
      'Code 80: Number of covered days in this inpatient stay.',
      'Code 81: Number of non-covered days in this inpatient stay.',
      'Code 24: Units of whole blood / PRBC furnished.'
    ],
    rejectionCauses: ['Covered days reported when billing outpatient claims.']
  },
  {
    locatorNumber: 'FL 41',
    name: 'Value Code & Amount C (FL 41a/b)',
    shortName: 'Value Code & Amount C',
    category: 'charges',
    sampleValue: '[OPTIONAL / BLANK]',
    ediMapping: '837I Loop 2300 HI segment (HI*BE)',
    description: 'Third value code block on the paper form.',
    rules: [
      'Code 48: Hemoglobin reading (e.g. 9.4 g/dL).',
      'Code 49: Hematocrit reading.',
      'Electronic 837I transmits unlimited value code pairs in Loop 2300.'
    ],
    rejectionCauses: ['Invalid value code syntax.']
  },
  {
    locatorNumber: 'FL 42',
    name: 'Revenue Code (4 Digits)',
    shortName: 'Revenue Code (4 Digits)',
    category: 'charges',
    sampleValue: '0110 (Room & Board Private) | 0250 (Pharmacy) | 0300 (Lab) | 0360 (OR) | 0450 (ER) | 0001 (Total)',
    ediMapping: '837I Loop 2400 SV201 (Revenue Code)',
    description: 'A 4-digit code identifying the specific hospital department, accommodation, or ancillary service rendered.',
    rules: [
      'Entered on each line of the charges grid.',
      'Final line of the claim MUST be Revenue Code "0001" representing Total Charges.',
      'Common codes: 0110 (Room & Board), 0250 (Pharmacy), 0300 (Laboratory), 0360 (Operating Room), 0450 (Emergency Room).'
    ],
    rejectionCauses: [
      'Missing Revenue Code 0001 total line.',
      'Revenue code missing corresponding HCPCS on outpatient claims.'
    ]
  },
  {
    locatorNumber: 'FL 43',
    name: 'Revenue Description',
    shortName: 'Revenue Description Text',
    category: 'charges',
    sampleValue: 'Room & Board - Private Med/Surg',
    ediMapping: '837I Loop 2400 SV202-7 (Description)',
    description: 'The standard text description of the revenue accommodation or ancillary hospital service.',
    rules: ['Must correspond directly to the official 4-digit revenue code entered in FL 42.'],
    rejectionCauses: ['Vague or mismatched descriptions.']
  },
  {
    locatorNumber: 'FL 44',
    name: 'HCPCS / Accommodation Rates / HIPPS Rate Codes',
    shortName: 'HCPCS / HIPPS Rate Codes',
    category: 'charges',
    sampleValue: '99285 (ER Visit) or HIPPS Code for SNF/Inpatient Rehab',
    ediMapping: '837I Loop 2400 SV202-2 (Procedure Code)',
    description: 'Reports the CPT/HCPCS code for outpatient hospital services, or accommodation rate / HIPPS case-mix code.',
    rules: [
      'Mandatory for all outpatient hospital encounters (TOB 0131).',
      'Accompanied by HCPCS modifiers when applicable.'
    ],
    rejectionCauses: ['Outpatient hospital claim submitted with revenue code but missing mandatory CPT code.']
  },
  {
    locatorNumber: 'FL 45',
    name: 'Service Date',
    shortName: 'Line Item Service Date',
    category: 'charges',
    sampleValue: '01 10 25',
    ediMapping: '837I Loop 2400 DTP*472 (Date of Service: YYYYMMDD)',
    description: 'The calendar date on which the specific ancillary service or outpatient procedure was performed.',
    rules: [
      'Required on outpatient hospital bills for each individual line item.',
      'On inpatient bills, reports bill creation date or specific procedure date.'
    ],
    rejectionCauses: ['Service date outside the Statement Covers Period.']
  },
  {
    locatorNumber: 'FL 46',
    name: 'Service Units',
    shortName: 'Revenue Service Units',
    category: 'charges',
    sampleValue: '4 (Days) | 12 (Doses) | 1 (Procedure)',
    ediMapping: '837I Loop 2400 SV205 (Service Unit Count)',
    description: 'The number of units, days of accommodation, doses, or occurrences of the service.',
    rules: ['For room & board, units represent covered days and must match Value Code 80.'],
    rejectionCauses: ['Zero or negative unit count.']
  },
  {
    locatorNumber: 'FL 47',
    name: 'Total Charges',
    shortName: 'Line Item & Total Charges',
    category: 'charges',
    sampleValue: '$20,870.00 (Sum of all institutional hospital line items)',
    ediMapping: '837I Loop 2400 SV203 (Line Charge) and Loop 2300 CLM02 (Total Claim Charge)',
    description: 'The gross facility charge for each line item, with the final line (Rev 0001) showing total claim charges.',
    rules: ['Sum of all line items must exactly equal the Rev 0001 total charge line.'],
    rejectionCauses: ['Mathematical addition discrepancy between line items and total charges.']
  },
  {
    locatorNumber: 'FL 48',
    name: 'Non-Covered Charges',
    shortName: 'Non-Covered Charges Amount',
    category: 'charges',
    sampleValue: '$0.00 (or $150.00 Non-Covered Private Room Difference)',
    ediMapping: '837I Loop 2400 SV207 (Non-Covered Amount)',
    description: 'The portion of total line item charges that are known to be non-covered or excluded under the patient’s insurance policy.',
    rules: ['Must be reported for statutory exclusions (e.g. personal convenience items, TV rental).'],
    rejectionCauses: ['Failure to report non-covered days under Value Code 81.']
  },
  {
    locatorNumber: 'FL 49',
    name: 'Reserved for Assignment by NUBC',
    shortName: 'Reserved FL 49',
    category: 'reserved',
    sampleValue: '[BLANK]',
    ediMapping: 'N/A',
    description: 'Reserved for future national assignment by the NUBC.',
    rules: ['Must be left completely blank.'],
    rejectionCauses: ['Text entered in reserved fields.']
  },
  {
    locatorNumber: 'FL 50',
    name: 'Payer Name (Lines A, B, C)',
    shortName: 'Payer Name (Lines A, B, C)',
    category: 'payer',
    sampleValue: 'Line A: MEDICARE PART A - NOVITAS SOLUTIONS MAC',
    ediMapping: '837I Loop 2000B SBR / Loop 2010BB NM103',
    description: 'Reports the health insurance plans responsible for payment: Line A (Primary), Line B (Secondary), Line C (Tertiary).',
    rules: [
      'Line A is always the primary payer.',
      'If Medicare is primary, enter Medicare on Line A; secondary supplemental plans are listed on Line B.'
    ],
    rejectionCauses: ['Inverted payer order violating Coordination of Benefits (COB) rules.']
  },
  {
    locatorNumber: 'FL 51',
    name: 'Health Plan ID (Lines A, B, C)',
    shortName: 'Health Plan Electronic Routing ID',
    category: 'payer',
    sampleValue: '04402 (Novitas Solutions Medicare MAC)',
    ediMapping: '837I Loop 2010BB NM109 (Payor Identifier)',
    description: 'The unique electronic Payer ID number used to route the claim through the clearinghouse to the health plan.',
    rules: ['Must be a valid 5-character electronic routing Payer ID.'],
    rejectionCauses: ['Invalid payer routing ID causing clearinghouse reject.']
  },
  {
    locatorNumber: 'FL 52',
    name: 'Release of Information Certification Indicator',
    shortName: 'Release of Information (ROI Indicator)',
    category: 'payer',
    sampleValue: 'Y (Signature on file)',
    ediMapping: '837I Loop 2300 CLM09 (Release of Information Code: Y or I)',
    description: 'Indicates whether the hospital has a signed authorization on file from the patient to release medical records.',
    rules: [
      'Enter "Y" (Yes), "I" (Informed consent), or "N" (No).',
      'Electronic 837I requires "Y" for claim processing.'
    ],
    rejectionCauses: ['Entering "N" causes immediate claim refusal.']
  },
  {
    locatorNumber: 'FL 53',
    name: 'Assignment of Benefits Certification Indicator',
    shortName: 'Assignment of Benefits (AOB Indicator)',
    category: 'payer',
    sampleValue: 'Y (Pay hospital directly)',
    ediMapping: '837I Loop 2300 CLM08 (Benefits Assignment Indicator: Y or N)',
    description: 'Indicates whether the patient authorized payment of benefits directly to the hospital.',
    rules: ['Must be "Y" for the hospital to receive electronic funds transfer (EFT) reimbursement.'],
    rejectionCauses: ['Entering "N" causes payer to mail reimbursement check to patient home.']
  },
  {
    locatorNumber: 'FL 54',
    name: 'Prior Payments (Lines A, B, C)',
    shortName: 'Prior Payments Received',
    category: 'charges',
    sampleValue: '$0.00 (or $500.00 Prior Commercial Payment on Secondary Claim)',
    ediMapping: '837I Loop 2300 AMT*D (Prior Payments)',
    description: 'Reports any payment amount received from the primary payer or patient prior to billing this claim.',
    rules: ['Mandatory when billing secondary/tertiary payers to show primary adjudication payment.'],
    rejectionCauses: ['Failure to report primary payment on secondary hospital bills.']
  },
  {
    locatorNumber: 'FL 55',
    name: 'Estimated Amount Due (Lines A, B, C)',
    shortName: 'Estimated Net Amount Due',
    category: 'charges',
    sampleValue: '$20,870.00',
    ediMapping: '837I Loop 2300 AMT*F5 (Estimated Amount Due)',
    description: 'The net estimated dollar amount expected from this specific payer after deducting prior payments and non-covered charges.',
    rules: ['Equals Total Charges minus Prior Payments minus Non-Covered Charges.'],
    rejectionCauses: ['Negative balance amounts.']
  },
  {
    locatorNumber: 'FL 56',
    name: 'National Provider Identifier (Billing NPI)',
    shortName: 'Hospital Facility NPI',
    category: 'provider',
    sampleValue: '1457896321 (Type 2 Facility NPI)',
    ediMapping: '837I Loop 2010AA NM109',
    description: 'The 10-digit Type 2 National Provider Identifier of the billing hospital or facility.',
    rules: ['Mandatory on all institutional claims.'],
    rejectionCauses: ['Missing or uncredentialed hospital NPI.']
  },
  {
    locatorNumber: 'FL 57',
    name: 'Other Provider ID (Lines A, B, C)',
    shortName: 'Facility Legacy Provider Number',
    category: 'provider',
    sampleValue: 'LIC-TX99884 (State License)',
    ediMapping: '837I Loop 2010AA REF segment',
    description: 'Reports a legacy non-NPI identifier (Medicaid legacy PIN or state hospital license).',
    rules: ['Leave blank unless specifically required by state Medicaid or local plans.'],
    rejectionCauses: ['Entering legacy ID when NPI is mandated.']
  },
  {
    locatorNumber: 'FL 58',
    name: "Insured's Name (Lines A, B, C)",
    shortName: 'Policyholder Legal Name',
    category: 'payer',
    sampleValue: 'RAMIREZ, CARLOS D.',
    ediMapping: '837I Loop 2010BA NM103/NM104',
    description: 'The legal name of the person who holds the insurance policy on lines A, B, and C.',
    rules: ['Formatted as Last Name, First Name, Middle Initial.'],
    rejectionCauses: ['Subscriber name spelling mismatch against eligibility record.']
  },
  {
    locatorNumber: 'FL 59',
    name: "Patient's Relationship to Insured (Lines A, B, C)",
    shortName: 'Relationship to Insured (2 Digits)',
    category: 'payer',
    sampleValue: '18 (Self)',
    ediMapping: '837I Loop 2000B SBR02 (18=Self, 01=Spouse, 19=Child)',
    description: 'A 2-digit code identifying the patient’s relationship to the policyholder: 18=Self, 01=Spouse, 19=Child, 20=Employee.',
    rules: ['Select code corresponding to insurance enrollment relationship.'],
    rejectionCauses: ['Reporting 18 Self when patient is a dependent child.']
  },
  {
    locatorNumber: 'FL 60',
    name: "Insured's Unique Identifier (Lines A, B, C)",
    shortName: 'Insured Member ID / MBI',
    category: 'payer',
    sampleValue: '1EG4-TE5-MK72 (Medicare Beneficiary Identifier)',
    ediMapping: '837I Loop 2010BA NM109',
    description: 'The subscriber’s unique insurance identification number on the corresponding payer line.',
    rules: ['Must match the 11-character Medicare MBI or commercial subscriber ID without spaces or hyphens.'],
    rejectionCauses: ['Member ID mismatch against payer eligibility database.']
  },
  {
    locatorNumber: 'FL 61',
    name: 'Insurance Group Name (Lines A, B, C)',
    shortName: 'Employer / Group Plan Name',
    category: 'payer',
    sampleValue: 'TEXAS STATE EMPLOYEES HEALTH PLAN',
    ediMapping: '837I Loop 2000B SBR03',
    description: 'The name of the employer group, union, or association that sponsors the health plan.',
    rules: ['Enter employer name sponsoring commercial policy.'],
    rejectionCauses: ['Omission on employer-sponsored commercial claims.']
  },
  {
    locatorNumber: 'FL 62',
    name: 'Insurance Group Number (Lines A, B, C)',
    shortName: 'Insurance Group Number',
    category: 'payer',
    sampleValue: 'GRP-99882',
    ediMapping: '837I Loop 2000B SBR03',
    description: 'The alphanumeric group number identifying the specific employer plan benefits.',
    rules: ['Enter group number printed on subscriber card.'],
    rejectionCauses: ['Invalid group number causing benefit adjudication delay.']
  },
  {
    locatorNumber: 'FL 63',
    name: 'Treatment Authorization Codes (Lines A, B, C)',
    shortName: 'Prior Authorization / Precert Code',
    category: 'payer',
    sampleValue: 'AUTH-HOSP7781',
    ediMapping: '837I Loop 2300 REF*G1',
    description: 'The formal precertification or prior authorization number issued by the payer utilization management department.',
    rules: ['Mandatory for elective hospital admissions and specialized surgical procedures.'],
    rejectionCauses: ['Missing authorization triggers fatal CARC CO-197 hospital denial.']
  },
  {
    locatorNumber: 'FL 64',
    name: 'Document Control Number (DCN / Lines A, B, C)',
    shortName: 'Original Claim Reference ICN / DCN',
    category: 'payer',
    sampleValue: '20250110009874X',
    ediMapping: '837I Loop 2300 REF*F8 (Original Claim Number)',
    description: 'The unique tracking number assigned by the payer to the original claim when submitting a replacement/corrected claim (TOB 0117).',
    rules: ['Mandatory when FL 04 frequency digit is "7" (Replacement) or "8" (Void).'],
    rejectionCauses: ['Submitting corrected bill without prior DCN causes duplicate claim denial.']
  },
  {
    locatorNumber: 'FL 65',
    name: 'Employer Name of the Insured',
    shortName: 'Insured Employer Name',
    category: 'payer',
    sampleValue: 'STATE OF TEXAS RETIREMENT SYSTEM',
    ediMapping: '837I Loop 2010BA NM1',
    description: 'The legal name of the employer that provides health insurance coverage to the policyholder.',
    rules: ['Required when Medicare Secondary Payer (MSP) Working Aged rules apply.'],
    rejectionCauses: ['Missing employer name on MSP coordination claims.']
  },
  {
    locatorNumber: 'FL 66',
    name: 'Diagnosis Version Qualifier',
    shortName: 'Diagnosis Version (0 = ICD-10)',
    category: 'clinical',
    sampleValue: '0 (ICD-10-CM)',
    ediMapping: '837I Loop 2300 HI segment (ABK qualifier)',
    description: 'A 1-character code indicating the diagnostic classification system used: "0" indicates ICD-10-CM, "9" indicates legacy ICD-9.',
    rules: ['Must be "0" for all healthcare encounters since October 1, 2015.'],
    rejectionCauses: ['Reporting "9" on modern claims.']
  },
  {
    locatorNumber: 'FL 67',
    name: 'Principal Diagnosis Code & POA Indicator',
    shortName: 'Principal Diagnosis & POA',
    category: 'clinical',
    sampleValue: 'I21.0 (ST elevation myocardial infarction) | POA: Y',
    ediMapping: '837I Loop 2300 HI*ABK (Principal DX) and HI*PO (Present On Admission Indicator)',
    description: 'The ICD-10-CM diagnosis code established after medical evaluation to be chiefly responsible for occasioning the patient’s admission to the hospital.',
    rules: [
      'Cannot be a symptom or unconfirmed diagnosis if a definitive diagnosis was reached.',
      'Must be accompanied by a Present on Admission (POA) indicator: Y (Yes), N (No), U (Unknown), W (Clinically undetermined), 1 (Exempt).',
      'Drives the hospital Inpatient Prospective Payment System (IPPS) MS-DRG reimbursement weight!'
    ],
    rejectionCauses: [
      'Missing Present on Admission (POA) indicator causes claim rejection.',
      'Selecting an invalid or non-specific diagnosis code for the principal position.'
    ]
  },
  {
    locatorNumber: 'FL 67A-Q',
    name: 'Other (Secondary) Diagnosis Codes & POA',
    shortName: 'Secondary Diagnoses & POA (FL 67A-Q)',
    category: 'clinical',
    sampleValue: '67A: I10 (Hypertension) POA: Y | 67B: E11.9 (Type 2 Diabetes) POA: Y',
    ediMapping: '837I Loop 2300 HI*ABF (Secondary Diagnoses) and HI*PO',
    description: 'Up to 24 secondary diagnosis codes representing comorbidities (CC) or major comorbidities (MCC) that coexist at admission or develop during hospital stay.',
    rules: [
      'Determines whether the patient qualifies for a higher-weighted Complication/Comorbidity (CC) or Major CC (MCC) DRG reimbursement!'
    ],
    rejectionCauses: ['Listing hospital-acquired conditions as present on admission.']
  },
  {
    locatorNumber: 'FL 68',
    name: 'Reserved for Assignment by NUBC',
    shortName: 'Reserved FL 68',
    category: 'reserved',
    sampleValue: '[BLANK]',
    ediMapping: 'N/A',
    description: 'Reserved for future national assignment by the NUBC.',
    rules: ['Must be left completely blank.'],
    rejectionCauses: ['Text entered in reserved fields.']
  },
  {
    locatorNumber: 'FL 69',
    name: 'Admitting Diagnosis Code',
    shortName: 'Admitting Diagnosis (ICD-10)',
    category: 'clinical',
    sampleValue: 'R07.9 (Chest pain, unspecified)',
    ediMapping: '837I Loop 2300 HI*ABJ (Admitting Diagnosis)',
    description: 'The initial diagnosis code describing the patient’s clinical symptoms or condition at the moment they presented for admission.',
    rules: ['Required on all inpatient hospital claims.'],
    rejectionCauses: ['Missing admitting diagnosis on inpatient admissions.']
  },
  {
    locatorNumber: 'FL 70',
    name: "Patient's Reason for Visit (Lines a, b, c)",
    shortName: "Patient's Reason for Visit",
    category: 'clinical',
    sampleValue: 'R07.9 (Chest pain, unspecified)',
    ediMapping: '837I Loop 2300 HI*PR (Patient Reason for Visit)',
    description: 'The primary symptom, complaint, or clinical reason stated by the patient for seeking outpatient emergency or clinic care.',
    rules: ['Required for unscheduled outpatient hospital encounters (e.g. emergency room visits).'],
    rejectionCauses: ['Omission on outpatient ER claims.']
  },
  {
    locatorNumber: 'FL 71',
    name: 'Prospective Payment System (PPS) Code',
    shortName: 'PPS Code (Home Health / Hospice)',
    category: 'codes',
    sampleValue: 'HIPPS Code (e.g. 1AFKS)',
    ediMapping: '837I Loop 2300 CLM segment',
    description: 'Reports specialized case-mix or Prospective Payment System codes used in Home Health (OASIS) or SNF PPS billing.',
    rules: ['Used when specific PPS payment models govern reimbursement.'],
    rejectionCauses: ['Invalid HIPPS rate code.']
  },
  {
    locatorNumber: 'FL 72',
    name: 'External Cause of Injury (ECI) Codes & POA',
    shortName: 'External Cause of Injury Codes',
    category: 'clinical',
    sampleValue: 'V43.52XA (Passenger in car injured in collision) | POA: Y',
    ediMapping: '837I Loop 2300 HI*BN (External Cause of Injury)',
    description: 'Reports secondary ICD-10 external cause codes (V00-Y99) describing environmental events, circumstances, or accident causes of injury.',
    rules: ['Mandatory when primary diagnosis is traumatic injury, burn, or poisoning.'],
    rejectionCauses: ['Trauma claim submitted without secondary E-code.']
  },
  {
    locatorNumber: 'FL 73',
    name: 'Reserved for Assignment by NUBC',
    shortName: 'Reserved FL 73',
    category: 'reserved',
    sampleValue: '[BLANK]',
    ediMapping: 'N/A',
    description: 'Reserved for future national assignment by the NUBC.',
    rules: ['Must be left completely blank.'],
    rejectionCauses: ['Text entered in reserved fields.']
  },
  {
    locatorNumber: 'FL 74',
    name: 'Principal Procedure Code & Date (ICD-10-PCS)',
    shortName: 'Principal Inpatient Procedure Code',
    category: 'clinical',
    sampleValue: '02703ZZ (Dilation of Coronary Artery) | Date: 01 10 2025',
    ediMapping: '837I Loop 2300 HI*BBQ (Principal Procedure: 7-character ICD-10-PCS code & Date)',
    description: 'The 7-character alphanumeric ICD-10-PCS procedure code performed for definitive treatment (rather than diagnostic or exploratory purposes) during the inpatient stay.',
    rules: [
      'Used exclusively on inpatient hospital claims (ICD-10-PCS is never used on outpatient claims!).',
      'Accompanied by the exact procedure date.',
      'Directly affects the surgical MS-DRG grouping.'
    ],
    rejectionCauses: [
      'Submitting CPT codes instead of ICD-10-PCS on inpatient claims.',
      'Invalid 7-character PCS structure.'
    ]
  },
  {
    locatorNumber: 'FL 74a-e',
    name: 'Other Procedure Codes & Dates',
    shortName: 'Secondary Inpatient Procedures (FL 74a-e)',
    category: 'clinical',
    sampleValue: '74a: B2111ZZ (Fluoroscopy single coronary artery) | Date: 01 10 2025',
    ediMapping: '837I Loop 2300 HI*BBR (Secondary Inpatient Procedures)',
    description: 'Up to 5 additional secondary surgical or therapeutic procedures performed during the hospital stay.',
    rules: ['Reported in descending order of surgical complexity.'],
    rejectionCauses: ['Procedure dates outside inpatient admission span.']
  },
  {
    locatorNumber: 'FL 75',
    name: 'Reserved for Assignment by NUBC',
    shortName: 'Reserved FL 75',
    category: 'reserved',
    sampleValue: '[BLANK]',
    ediMapping: 'N/A',
    description: 'Reserved for future national assignment by the NUBC.',
    rules: ['Must be left completely blank.'],
    rejectionCauses: ['Text entered in reserved fields.']
  },
  {
    locatorNumber: 'FL 76',
    name: 'Attending Provider Name & Identifiers (NPI)',
    shortName: 'Attending Physician Name & NPI',
    category: 'provider',
    sampleValue: 'DR. MARCUS WELBY MD | NPI: 1659874123',
    ediMapping: '837I Loop 2310A NM1*71 (Attending Provider: NM103 Last, NM104 First, NM109 NPI)',
    description: 'The individual clinician who had primary medical responsibility for the patient’s hospital care and treatment plan.',
    rules: [
      'Must be a 10-digit Type 1 individual physician NPI.',
      'Mandatory on all inpatient and outpatient hospital claims.'
    ],
    rejectionCauses: ['Missing attending physician NPI or entering facility Type 2 NPI in this field.']
  },
  {
    locatorNumber: 'FL 77',
    name: 'Operating Physician Name & Identifiers (NPI)',
    shortName: 'Operating Surgeon Name & NPI',
    category: 'provider',
    sampleValue: 'DR. DENTON COOLEY MD | NPI: 1346798520',
    ediMapping: '837I Loop 2310B NM1*72 (Operating Physician: NM109 NPI)',
    description: 'The individual surgeon who performed the principal surgical procedure reported in FL 74.',
    rules: ['Required whenever a surgical procedure code is reported in FL 74.'],
    rejectionCauses: ['Reporting surgical procedure in FL 74 without operating surgeon NPI in FL 77.']
  },
  {
    locatorNumber: 'FL 78',
    name: 'Other Provider (Rendering / Consulting) Name & NPI',
    shortName: 'Consulting / Rendering Clinician & NPI',
    category: 'provider',
    sampleValue: 'DR. ALICE STERLING MD | NPI: 1982736450',
    ediMapping: '837I Loop 2310C NM1*82 (Rendering Provider)',
    description: 'Reports the name and NPI of a consulting specialist or secondary clinician involved in patient care.',
    rules: ['Used when specialist consultations are billed within the institutional claim.'],
    rejectionCauses: ['Invalid NPI syntax.']
  },
  {
    locatorNumber: 'FL 79',
    name: 'Other Provider (Assisting Surgeon) Name & NPI',
    shortName: 'Assistant Surgeon / Other Clinician & NPI',
    category: 'provider',
    sampleValue: 'DR. KEVIN CHEN MD | NPI: 1122334455',
    ediMapping: '837I Loop 2310D NM1*ZZ (Other Operating Physician)',
    description: 'Reports the name and NPI of the assistant surgeon or secondary physician.',
    rules: ['Required when surgical assistant fees are included in facility billing.'],
    rejectionCauses: ['Missing credentialing for assistant surgeon.']
  },
  {
    locatorNumber: 'FL 80',
    name: 'Remarks Field',
    shortName: 'Remarks / Clinical Free Text',
    category: 'clinical',
    sampleValue: 'Emergency coronary angioplasty following acute anterior STEMI with cardiogenic shock',
    ediMapping: '837I Loop 2300 NTE segment (Billing Remarks)',
    description: 'A free-text space used to communicate special clinical context, non-standard authorization notes, or justification for unusual emergency care.',
    rules: ['Keep concise; used when no standardized condition or occurrence code fits.'],
    rejectionCauses: ['Failing to provide remarks when unlisted hospital services are billed.']
  },
  {
    locatorNumber: 'FL 81',
    name: 'CC (Code-Code) Field & Taxonomy Qualifier',
    shortName: 'Healthcare Provider Taxonomy (FL 81)',
    category: 'provider',
    sampleValue: 'B3: 282N00000X (General Acute Care Hospital Taxonomy)',
    ediMapping: '837I Loop 2000A PRV segment (Provider Taxonomy)',
    description: 'Reports specific national billing codes or the hospital’s 10-character Healthcare Provider Taxonomy Code preceded by qualifier "B3".',
    rules: [
      'Qualifier "B3" indicates Healthcare Provider Taxonomy.',
      'Mandatory for Medicaid institutional billing and Medicare specialty carve-outs.'
    ],
    rejectionCauses: ['Missing B3 qualifier or invalid 10-character taxonomy code.']
  }
];

// ==========================================
// REAL-WORLD SAMPLE DATASETS FOR FORMS
// ==========================================
export const SAMPLE_CMS1500_CLAIM = {
  payerName: 'BLUE CROSS BLUE SHIELD TEXAS PPO',
  payerAddress: 'PO BOX 660044, DALLAS, TX 75266',
  payerId: 'BCBSTX',
  patient: {
    name: 'JOHNSON, ELEANOR M.',
    dob: '05/14/1978',
    sex: 'F',
    address: '1428 ELM STREET',
    city: 'DALLAS',
    state: 'TX',
    zip: '75201',
    phone: '(214) 555-0199',
    relToInsured: 'Self',
    accountNumber: 'ACC-998241'
  },
  subscriber: {
    id: 'XYZ123456789',
    name: 'JOHNSON, ELEANOR M.',
    policyGroup: 'GRP-BCBS8842',
    dob: '05/14/1978',
    sex: 'F',
    planName: 'BCBS BLUE CHOICE PPO'
  },
  secondaryPayer: {
    hasSecondary: true,
    name: 'AETNA HEALTH',
    policy: 'GRP-40291',
    id: 'W987456123'
  },
  clinical: {
    onsetLmpDate: '01/10/2025',
    onsetQualifier: '431',
    referringProvider: 'DR. GREGORY HOUSE MD',
    referringNpi: '1982736450',
    referringQual: 'DN',
    priorAuthNumber: 'PA-9821447',
    diagnoses: [
      { letter: 'A', code: 'M54.50', desc: 'Low back pain, unspecified' },
      { letter: 'B', code: 'I10', desc: 'Essential (primary) hypertension' },
      { letter: 'C', code: 'E11.9', desc: 'Type 2 diabetes mellitus without complications' },
      { letter: 'D', code: 'G43.909', desc: 'Migraine, unspecified, not intractable' }
    ]
  },
  serviceLines: [
    {
      dos: '01/15/2025',
      pos: '11',
      emg: '',
      cpt: '99214',
      mod: '25',
      pointer: 'A,B',
      charge: 225.00,
      units: 1,
      renderingNpi: '1234567890'
    },
    {
      dos: '01/15/2025',
      pos: '11',
      emg: '',
      cpt: '20610',
      mod: 'RT',
      pointer: 'A',
      charge: 180.00,
      units: 1,
      renderingNpi: '1234567890'
    },
    {
      dos: '01/15/2025',
      pos: '11',
      emg: '',
      cpt: 'J7325',
      mod: '',
      pointer: 'A',
      charge: 350.00,
      units: 30,
      renderingNpi: '1234567890'
    }
  ],
  totals: {
    taxId: '75-1234567',
    taxIdType: 'EIN',
    totalCharge: 755.00,
    amountPaid: 0.00,
    balanceDue: 755.00,
    acceptAssignment: true
  },
  facility: {
    name: 'DALLAS SPINE & JOINT CENTER',
    address: '777 MEDICAL PKWY STE 200',
    city: 'DALLAS',
    state: 'TX',
    zip: '75201',
    npi: '1982736450'
  },
  billing: {
    name: 'METROPLEX CLINIC PARTNERS LLC',
    address: 'PO BOX 8840',
    city: 'DALLAS',
    state: 'TX',
    zip: '75201',
    phone: '(214) 555-0199',
    npi: '1876543210',
    taxonomy: 'ZZ207Q00000X'
  }
};

export const SAMPLE_UB04_CLAIM = {
  facility: {
    name: 'TEXAS GENERAL HOSPITAL',
    address: '1000 HEALTHCARE BLVD',
    city: 'AUSTIN',
    state: 'TX',
    zip: '78705',
    phone: '(512) 555-0100',
    npi: '1457896321',
    tin: '74-9876543'
  },
  billingType: {
    tob: '0111',
    tobMeaning: 'Hospital Inpatient, Admit through Discharge',
    statementFrom: '01/10/2025',
    statementThrough: '01/14/2025'
  },
  patient: {
    name: 'RAMIREZ, CARLOS D.',
    address: '502 CONGRESS AVE',
    city: 'AUSTIN',
    state: 'TX',
    zip: '78701',
    dob: '11/22/1958',
    sex: 'M',
    controlNumber: 'HOSP-889921',
    mrn: 'MRN-442190'
  },
  admission: {
    date: '01/10/2025',
    hour: '08',
    priority: '1 (Emergency)',
    pointOfOrigin: '7 (Emergency Room Transfer)',
    dischargeHour: '14',
    dischargeStatus: '01 (Discharged to Home / Self-Care)'
  },
  codes: {
    conditionCodes: ['P1', '40'],
    occurrenceCodes: [
      { code: '11', date: '01/09/2025', desc: 'Onset of Symptoms' },
      { code: '01', date: '01/10/2025', desc: 'Auto Accident' }
    ],
    valueCodes: [
      { code: '01', amount: '$2,200.00', desc: 'Most Common Semi-Private Rate' },
      { code: '80', amount: '4.0', desc: 'Covered Inpatient Days' }
    ]
  },
  revenueGrid: [
    { rev: '0110', desc: 'Room & Board - Private Med/Surg', hcpcs: '', date: '01/10/25', units: 4, charge: 9600.00 },
    { rev: '0250', desc: 'Pharmacy - General Classification', hcpcs: '', date: '01/10/25', units: 12, charge: 1850.00 },
    { rev: '0300', desc: 'Laboratory - General Chemistry', hcpcs: '', date: '01/10/25', units: 8, charge: 920.00 },
    { rev: '0360', desc: 'Operating Room Services Suite', hcpcs: '', date: '01/10/25', units: 1, charge: 6400.00 },
    { rev: '0450', desc: 'Emergency Room - General Care', hcpcs: '99285', date: '01/10/25', units: 1, charge: 2100.00 },
    { rev: '0001', desc: 'TOTAL CHARGES LINE', hcpcs: '', date: '', units: 26, charge: 20870.00 }
  ],
  payer: {
    primaryPayer: 'MEDICARE PART A - NOVITAS SOLUTIONS',
    payerId: '04402',
    insuredName: 'RAMIREZ, CARLOS D.',
    mbi: '1EG4-TE5-MK72',
    priorAuth: 'AUTH-HOSP7781',
    estDue: 20870.00
  },
  diagnoses: {
    version: '0 (ICD-10-CM)',
    principal: { code: 'I21.0', desc: 'ST elevation myocardial infarction of anterior wall', poa: 'Y' },
    secondary: [
      { code: 'I10', desc: 'Essential (primary) hypertension', poa: 'Y' },
      { code: 'E11.9', desc: 'Type 2 diabetes without complications', poa: 'Y' },
      { code: 'Z95.1', desc: 'Presence of aortocoronary bypass graft', poa: '1' }
    ],
    admitting: { code: 'R07.9', desc: 'Chest pain, unspecified' }
  },
  procedures: [
    { code: '02703ZZ', date: '01/10/2025', desc: 'Dilation of Coronary Artery, One Artery, Percutaneous Approach' }
  ],
  physicians: {
    attending: { name: 'DR. MARCUS WELBY MD', npi: '1659874123' },
    operating: { name: 'DR. DENTON COOLEY MD', npi: '1346798520' }
  }
};

// ==========================================
// INTERACTIVE AUDITOR CHALLENGE SCENARIO
// ==========================================
export interface AuditTrap {
  id: string;
  boxNumber: string;
  boxTitle: string;
  flawedValue: string;
  correctValue: string;
  carcDenial: string;
  explanation: string;
}

export const AUDIT_TRAPS: AuditTrap[] = [
  {
    id: 'trap-1',
    boxNumber: '24D',
    boxTitle: 'Procedures & Modifiers (Line 1)',
    flawedValue: 'CPT 99214 with NO Modifier (Office Visit billed same day as injection 20610)',
    correctValue: 'CPT 99214 with Modifier 25',
    carcDenial: 'CO-97 (The benefit for this service is included in the payment for another service)',
    explanation: 'When billing an E&M code on the same date as a minor surgical procedure (arthrocentesis 20610), omitting Modifier 25 causes the insurance adjudication engine to automatically bundle the visit into the procedure payment!'
  },
  {
    id: 'trap-2',
    boxNumber: '32',
    boxTitle: 'Service Facility Location Information',
    flawedValue: 'PO BOX 4420, DALLAS TX 75201',
    correctValue: 'Physical street address: 777 MEDICAL PKWY STE 200, DALLAS TX 75201',
    carcDenial: 'Clearinghouse 277CA Rejection: "Service Facility Address Cannot Be a Post Office Box"',
    explanation: 'Federal NUCC guidelines and CMS regulations strictly require a physical street address in Box 32 because locality pricing, fee schedules, and network tiers are based on geographic coordinates. A P.O. Box is illegal here!'
  },
  {
    id: 'trap-3',
    boxNumber: '22',
    boxTitle: 'Resubmission Code & Original Reference Number',
    flawedValue: 'Resubmission Code: 7 | Original Ref No: [BLANK]',
    correctValue: 'Resubmission Code: 7 | Original Ref No: 2025011500892X',
    carcDenial: 'Clearinghouse Level 2 Rejection: "Original Claim Reference Number (ICN/DCN) Required When Frequency Code 7 is Reported"',
    explanation: 'Reporting replacement code 7 without the payer original claim internal control number (ICN) makes it impossible for the claims engine to link and void the prior claim, leading to instant rejection or duplicate denial CO-18.'
  },
  {
    id: 'trap-4',
    boxNumber: '21',
    boxTitle: 'Diagnosis Code on Line A',
    flawedValue: 'M54.5 (Truncated 4-character legacy code)',
    correctValue: 'M54.50 (Complete 5-character ICD-10 code)',
    carcDenial: 'CO-16 / RARC M76: "Missing/incomplete/invalid diagnosis code"',
    explanation: 'Under ICD-10-CM coding guidelines, M54.5 was expanded to 5-digit specificity (M54.50, M54.51, M54.59). Submitting a truncated code missing required trailing characters causes immediate claim denial!'
  },
  {
    id: 'trap-5',
    boxNumber: '24J',
    boxTitle: 'Rendering Provider NPI (Line 2)',
    flawedValue: '1876543210 (Type 2 Organizational Group NPI entered in Box 24J)',
    correctValue: '1234567890 (Type 1 Individual Clinician NPI)',
    carcDenial: 'CO-16 / RARC N290: "Missing/incomplete/invalid rendering provider identifier"',
    explanation: 'Box 24J must ALWAYS contain the 10-digit Type 1 individual NPI of the physician who physically held the scalpel or syringe. The Type 2 Group NPI belongs exclusively in Box 33a!'
  }
];

export const UB_04_CODES: Ub04CodeItem[] = [
  // Revenue Codes
  {
    code: '0110',
    type: 'revenue',
    title: 'Room & Board - Private (Medical/Surgical)',
    description: 'Standard inpatient private room charge. Accompanied by covered day units (FL 46).',
    example: 'Patient admitted for 3 days in private acute room: 3 units @ $1,500/day.'
  },
  {
    code: '0250',
    type: 'revenue',
    title: 'Pharmacy - General Classification',
    description: 'Inpatient medications, IV fluids, and inpatient pharmaceutical distribution.',
    example: 'Includes inpatient antibiotics and pain management meds administered during hospital stay.'
  },
  {
    code: '0300',
    type: 'revenue',
    title: 'Laboratory - General Classification',
    description: 'Diagnostic inpatient hospital laboratory evaluations and pathology.',
    example: 'Bundled inpatient blood panels, urinalysis, and CBC tests run in hospital central lab.'
  },
  {
    code: '0360',
    type: 'revenue',
    title: 'Operating Room Services',
    description: 'Facility charge for operating room suite, sterile field maintenance, and surgical technician staff.',
    example: 'Inpatient surgical suite fee for 2.5 hour CABG or total hip arthroplasty.'
  },
  {
    code: '0450',
    type: 'revenue',
    title: 'Emergency Room - General',
    description: 'Facility fee for emergency room triage, nursing, trauma bay, and facility overhead.',
    example: 'Patient visits ER for chest pain triage. Rev code 0450 captures hospital ER facility fee.'
  },
  {
    code: '0760',
    type: 'revenue',
    title: 'Treatment / Observation Room',
    description: 'Outpatient observation bed care when patient status is under observation pending admission or discharge.',
    example: 'Billed with hourly units (e.g. 18 hours observation monitoring).'
  },

  // Value Codes ("How Much" - Money / Units)
  {
    code: '01',
    type: 'value',
    title: 'Most Common Semi-Private Room Rate',
    description: 'Reports hospital’s standard semi-private room rate for comparison against Medicare limits.',
    example: 'Value Code 01 = $1,850.00 (entered in FL 39–41).'
  },
  {
    code: '80',
    type: 'value',
    title: 'Covered Days',
    description: 'The number of days of inpatient hospital care covered by the primary payer during this billing cycle.',
    example: 'Value Code 80 = 5.0 (5 covered inpatient days).'
  },
  {
    code: '24',
    type: 'value',
    title: 'Number of Blood Units Furnished',
    description: 'Identifies total units of whole blood or packed red cells given to patient.',
    example: 'Value Code 24 = 3 (3 units of PRBC transfused).'
  },
  {
    code: '48',
    type: 'value',
    title: 'Hemoglobin Reading',
    description: 'Latest laboratory hemoglobin reading, required when billing erythropoietin or chemotherapy drugs.',
    example: 'Value Code 48 = 9.4 g/dL.'
  },

  // Occurrence Codes ("When" - Dates)
  {
    code: '01',
    type: 'occurrence',
    title: 'Auto Accident Date',
    description: 'Date on which a motor vehicle accident occurred that caused injuries requiring treatment.',
    example: 'Occurrence Code 01 = 02/10/2025. Payer routes claim to auto insurance PIP primary.'
  },
  {
    code: '11',
    type: 'occurrence',
    title: 'Onset of Symptoms / Illness',
    description: 'Exact date the patient first experienced symptoms of this medical condition.',
    example: 'Occurrence Code 11 = 01/02/2025. Used to verify pre-existing condition and policy active dates.'
  },
  {
    code: '29',
    type: 'occurrence',
    title: 'Date of Last Physical Therapy Visit',
    description: 'The calendar date of the final outpatient physical therapy session prior to hospital encounter.',
    example: 'Occurrence Code 29 = 01/28/2025.'
  },
  {
    code: '04',
    type: 'occurrence',
    title: 'Accident / Employment Related',
    description: 'Date of an on-the-job industrial accident or workplace injury.',
    example: 'Occurrence Code 04 = 01/20/2025. Alerts health plan to verify Workers’ Compensation coverage.'
  }
];
