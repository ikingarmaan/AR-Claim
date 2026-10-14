import { ClaimBoxDetail, Ub04CodeItem } from '../types/rcm';

export interface FormComparisonRow {
  feature: string;
  professional: string;
  facility: string;
}

export const FORM_COMPARISONS: FormComparisonRow[] = [
  {
    feature: 'Official Form Name',
    professional: 'CMS-1500 (formerly HCFA-1500)',
    facility: 'UB-04 (CMS-1450)'
  },
  {
    feature: 'Electronic EDI Standard',
    professional: '837P (Professional)',
    facility: '837I (Institutional)'
  },
  {
    feature: 'Total Box Count',
    professional: '33 numbered boxes',
    facility: '81 form locators (FL 01 to FL 81)'
  },
  {
    feature: 'Billing Entities',
    professional: 'Physicians, NPs, PAs, Solo Practices, Medical Groups, Ambulatory Clinics',
    facility: 'Hospitals (Inpatient/Outpatient), Skilled Nursing Facilities (SNF), Hospices, Rehab Centers'
  },
  {
    feature: 'Services Covered',
    professional: 'Professional physician work, consultations, minor in-office procedures, DME',
    facility: 'Facility room & board, nursing care, operating room overhead, equipment, surgical trays'
  },
  {
    feature: 'Reimbursement Methodology',
    professional: 'Fee Schedule (RBRVS / RVUs), CPT/HCPCS per-line payment',
    facility: 'DRG (Diagnosis-Related Group), APC (Ambulatory Payment Classifications), Per Diem'
  },
  {
    feature: 'Classification Coding Used',
    professional: 'CPT (5-digit) + HCPCS Level II + Modifiers',
    facility: '4-digit Revenue Codes + ICD-10-PCS (Inpatient procedures) / CPT (Outpatient)'
  },
  {
    feature: 'Diagnosis Capacity',
    professional: 'Up to 12 ICD-10-CM codes (Pointers A–L)',
    facility: 'Principal Diagnosis + up to 24 Secondary DX codes'
  },
  {
    feature: 'Service Lines Per Claim',
    professional: '6 line items (Box 24A to 24J)',
    facility: 'Up to 22 line items per page (with continuation pages allowed)'
  }
];

export const CMS_1500_BOXES: ClaimBoxDetail[] = [
  {
    boxNumber: '12',
    name: "Patient's or Authorized Person's Signature (ROI)",
    shortName: 'Release of Information (ROI)',
    description: 'Authorizes the physician/clinic to release medical records and protected health information necessary to process insurance claims.',
    rules: [
      'Legal consent under HIPAA Privacy Rule.',
      'Can be a physical signature with date, or standard industry shorthand "SIGNATURE ON FILE" (SOF).',
      'Electronic claims (837P) transmit this as a "Y" flag in EDI Loop 2300 (CLM09).'
    ],
    rejectionCauses: [
      'Missing SOF or date on paper submission.',
      'Payer audit failure if practice has no signed HIPAA consent on file in the patient medical chart.'
    ],
    sampleValue: 'SIGNATURE ON FILE (SOF) - Date: 01/15/2025',
    category: 'patient',
    coordinates: { x: 5, y: 32, width: 44, height: 6 }
  },
  {
    boxNumber: '13',
    name: "Insured's or Authorized Person's Signature (AOB)",
    shortName: 'Assignment of Benefits (AOB)',
    description: 'Authorizes the insurance carrier to send reimbursement checks directly to the medical provider rather than sending payment to the patient.',
    rules: [
      'Stands for Assignment of Benefits.',
      'Populated with "SIGNATURE ON FILE" (SOF) upon patient signing the financial agreement.',
      'Crucial for non-participating (out-of-network) providers who wish to receive direct payment.'
    ],
    rejectionCauses: [
      'If left blank or marked "N", payer will legally mail the reimbursement check directly to the patient’s home address!',
      'AR team must then chase the patient to surrender the insurance check.'
    ],
    sampleValue: 'SIGNATURE ON FILE (SOF)',
    category: 'patient',
    coordinates: { x: 51, y: 32, width: 44, height: 6 }
  },
  {
    boxNumber: '17',
    name: 'Name of Referring Provider or Other Source',
    shortName: 'Referring / Ordering Provider',
    description: 'Reports the name and credential of the physician who referred the patient or ordered diagnostic tests, consultations, or DME.',
    rules: [
      'Must include a 2-character qualifier in the leftmost margin: "DN" (Referring), "DK" (Ordering), "DQ" (Supervising).',
      'Box 17B must contain the 10-digit Type 1 NPI of the referring doctor.',
      'Mandatory for all lab tests, imaging (X-ray, MRI), specialist consults, and physical therapy.'
    ],
    rejectionCauses: [
      'Missing qualifier (DN/DK).',
      'Referring doctor NPI missing, deactivated, or not enrolled in PECOS (for Medicare claims).',
      'Clearinghouse rejection: "Referring Provider Required for Specialist/Diagnostic Services".'
    ],
    sampleValue: 'DN DR. ROBERT REYNOLDS MD (NPI 17B: 1457896321)',
    category: 'provider',
    coordinates: { x: 5, y: 40, width: 48, height: 5 }
  },
  {
    boxNumber: '19',
    name: 'Additional Claim Information (Reserved for Local Use)',
    shortName: 'Claim Narrative / Additional Info',
    description: 'A free-text space (up to 71 characters on paper, Loop 2300 NTE segment on 837P) used to communicate essential clinical context.',
    rules: [
      'Used to report exact LMP (Last Menstrual Period) for pregnancy visits.',
      'Used for unlisted procedure codes (e.g. 99499, 29999) explaining the surgical technique.',
      'Enter dental cross-coding narratives, specialty anesthesia times, or justification for unusual emergency encounters.'
    ],
    rejectionCauses: [
      'Billing an unlisted procedure code (CPT ending in 99) without explanatory narrative in Box 19 leads to immediate CARC CO-16 denial.'
    ],
    sampleValue: 'NOC: Arthroscopic revision with bone grafting right knee 45 min',
    category: 'billing',
    coordinates: { x: 5, y: 46, width: 90, height: 4 }
  },
  {
    boxNumber: '21',
    name: 'Diagnosis or Nature of Illness or Injury (ICD-10-CM)',
    shortName: 'Diagnosis Codes (ICD-10-CM)',
    description: 'Lists up to 12 ICD-10-CM diagnosis codes establishing medical necessity for the billed procedures.',
    rules: [
      'Entered on lines A through L (up to 12 diagnosis codes).',
      'The "ICD Ind." indicator box must be marked with "0" indicating ICD-10-CM ("9" was legacy ICD-9).',
      'Diagnosis pointer in Box 24E references these letter lines (e.g. "A, B") to link each CPT code.'
    ],
    rejectionCauses: [
      'Truncated ICD-10 codes missing 4th, 5th, 6th, or 7th characters (unspecified or incomplete coding).',
      'No primary diagnosis listed on Line A.',
      'Mismatched diagnosis indicator.'
    ],
    sampleValue: 'A: I10 (Essential Hypertension) | B: E11.9 (Type 2 Diabetes) | C: M54.50 (Low Back Pain)',
    category: 'clinical',
    coordinates: { x: 5, y: 51, width: 90, height: 8 }
  },
  {
    boxNumber: '22',
    name: 'Resubmission Code & Original Reference Number',
    shortName: 'Resubmission / Corrected Claim Info',
    description: 'Used when submitting corrected, replacement, or voided claims to an insurance payer.',
    rules: [
      'Resubmission Code: "7" represents Replacement/Corrected Claim; "8" represents Void/Cancel Claim.',
      'Original Ref No.: The unique Internal Control Number (ICN) or Document Control Number (DCN) assigned by the payer to the original claim.',
      'EDI equivalent: Loop 2300 CLM05-3 = "7", and Loop 2300 REF*F8 segment with payer claim number.'
    ],
    rejectionCauses: [
      'Sending code 7 without the Original Reference Number leads to immediate rejection: "Missing Original Claim Reference ICN".',
      'Entering a corrected claim as an original claim causes denial CO-18 (Exact duplicate).'
    ],
    sampleValue: 'Code: 7 | Original Ref: 20250115009845X',
    category: 'billing',
    coordinates: { x: 5, y: 60, width: 44, height: 5 }
  },
  {
    boxNumber: '23',
    name: 'Prior Authorization / Referral / CLIA Number',
    shortName: 'Prior Auth / Referral / CLIA Number',
    description: 'Multi-purpose box to report Prior Authorization Number, Referral Certification Number, or 10-digit CLIA Quality Lab Number.',
    rules: [
      'Prior Auth: Enter alphanumeric authorization issued by insurance Utilization Management (UM).',
      'CLIA: If billing in-house laboratory services (e.g., CPT 87880, 81002), enter the 10-digit CLIA ID.',
      'Never mix both auth and CLIA in this single paper box; electronic 837P splits them into distinct loops (2300 REF*G1 for Auth, 2300 REF*X4 for CLIA).'
    ],
    rejectionCauses: [
      'Missing or expired Prior Auth number results in fatal CARC CO-197 denial.',
      'Missing CLIA number for laboratory CPTs causes CO-16 / RARC MA120 rejection.'
    ],
    sampleValue: 'PA: AUTH9874102 / CLIA: 05D9876543',
    category: 'billing',
    coordinates: { x: 51, y: 60, width: 44, height: 5 }
  },
  {
    boxNumber: '24D',
    name: 'Procedures, Services, or Supplies (CPT / HCPCS / Modifiers)',
    shortName: 'CPT / HCPCS & Modifiers',
    description: 'The core clinical billing line: reports the 5-digit CPT or HCPCS Level II code and up to 4 two-character modifiers.',
    rules: [
      'Lists 5-digit CPT (e.g., 99214) or alphanumeric HCPCS (e.g., J0696).',
      'Provides 4 modifier columns (e.g. 25, 59, RT, LT).',
      'Must correspond directly to the clinical documentation in the medical chart.'
    ],
    rejectionCauses: [
      'Invalid CPT code, deleted code, or inappropriate modifier.',
      'Missing required modifier (e.g., omitting Modifier 25 when billing an E&M with an injection).'
    ],
    sampleValue: 'CPT: 99214 | Modifiers: 25, --, --, --',
    category: 'clinical',
    coordinates: { x: 25, y: 68, width: 25, height: 10 }
  },
  {
    boxNumber: '24G',
    name: 'Days or Units of Service',
    shortName: 'Days or Units',
    description: 'Indicates the quantity of services rendered (e.g., 1 unit for office visit, 15-minute anesthesia increments, drug mg increments, physical therapy units).',
    rules: [
      'Standard office visits: 1 unit.',
      'Time-based therapy codes (e.g., CPT 97110 - 15 mins): 2 units = 30 mins.',
      'Drug HCPCS: Units must match the HCPCS dosage definition (e.g., J1745 Infliximab 10mg: 500mg = 50 units!).'
    ],
    rejectionCauses: [
      'Mismatch between NDC quantity and HCPCS unit count.',
      'Zero or blank units.'
    ],
    sampleValue: '1 (or 4 for 60-min PT therapy)',
    category: 'clinical',
    coordinates: { x: 65, y: 68, width: 8, height: 10 }
  },
  {
    boxNumber: '25',
    name: 'Federal Tax ID Number (TIN / EIN / SSN)',
    shortName: 'Federal Tax ID (TIN / EIN)',
    description: 'The 9-digit IRS Taxpayer Identification Number or Employer Identification Number of the billing entity.',
    rules: [
      'Checkbox indicating EIN (Employer ID) or SSN (Social Security).',
      'Must match the IRS W-9 form registered with the insurance payer credentialing department.',
      'Crucial for receiving proper IRS 1099 annual reporting.'
    ],
    rejectionCauses: [
      'TIN mismatch between claim and payer master file; triggers immediate clearinghouse rejection or non-par payment status.'
    ],
    sampleValue: '12-3456789 (EIN checkbox checked)',
    category: 'provider',
    coordinates: { x: 5, y: 80, width: 22, height: 6 }
  },
  {
    boxNumber: '32',
    name: 'Service Facility Location Information',
    shortName: 'Service Facility & NPI',
    description: 'The physical street address where services were actually rendered to the patient, along with the facility Type 2 NPI (Box 32a).',
    rules: [
      'CANNOT be a P.O. Box! Must be a physical physical street address.',
      'Payer uses Box 32 zip code to calculate locality pricing and determine in-network network tier.',
      'Required when service location differs from billing provider address (Box 33).'
    ],
    rejectionCauses: [
      'Entering a P.O. Box in Box 32 will immediately reject at the clearinghouse!',
      'Missing 9-digit ZIP code (ZIP+4) for Medicare claims.'
    ],
    sampleValue: 'St. Jude Ambulatory Center, 450 Medical Pkwy, Austin, TX 78705 (NPI 32a: 1982736450)',
    category: 'provider',
    coordinates: { x: 30, y: 88, width: 34, height: 10 }
  },
  {
    boxNumber: '33',
    name: 'Billing Provider Info & Ph # / NPI',
    shortName: 'Billing Provider & NPI',
    description: 'The legal name, address, telephone number, and 10-digit Type 2 (or Type 1 solo) NPI of the billing entity to whom payment is directed.',
    rules: [
      'Box 33a: 10-digit Billing NPI.',
      'Box 33b: Legacy provider ID or 10-character Taxonomy code prefixed with qualifier "ZZ".',
      'Payment checks and ERA remittances are routed according to this box.'
    ],
    rejectionCauses: [
      'Missing Box 33a NPI.',
      'Billing NPI not registered with payer EDI/clearinghouse.'
    ],
    sampleValue: 'Austin Physician Group LLC, PO Box 900, Austin TX 78701 (NPI 33a: 1876543210, 33b: ZZ207Q00000X)',
    category: 'provider',
    coordinates: { x: 65, y: 88, width: 34, height: 10 }
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
