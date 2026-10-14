import { ModifierDeepDive } from '../types/rcm';

export interface CptSection {
  name: string;
  range: string;
  min: number;
  max: number;
  description: string;
  highlightCodes: string;
}

export const CPT_SECTIONS: CptSection[] = [
  {
    name: 'Evaluation and Management (E&M)',
    range: '99201 – 99499',
    min: 99201,
    max: 99499,
    description: 'Physician encounters, hospital rounds, consultations, preventive physicals, and prolonged care services. Governed by 2021/2023 Medical Decision Making (MDM) or total physician time rules.',
    highlightCodes: 'New Patient: 99202–99205 | Established: 99211–99215 (3-Year Rule: Patient not seen within 3 years by same specialty in same group is considered NEW!)'
  },
  {
    name: 'Anesthesiology',
    range: '00100 – 01999',
    min: 100,
    max: 1999,
    description: 'Anesthesia administration for head, neck, thorax, spine, abdomen, and perineal procedures. Billed using Base Units + Time Units (15-min increments) + Modifying physical status factors.',
    highlightCodes: '00100 (Head), 00811 (Screening colonoscopy anesthesia), Physical status modifiers P1–P6'
  },
  {
    name: 'Surgery',
    range: '10040 – 69990',
    min: 10040,
    max: 69990,
    description: 'Largest CPT section divided by anatomical system (Integumentary 10000s, Musculoskeletal 20000s, Respiratory 30000s, Cardiovascular 33000s, Digestive 40000s, Urinary 50000s, Nervous 60000s).',
    highlightCodes: 'Includes global surgical packages (000, 010, 090 days) covering pre-op, intra-op, and standard post-op recovery care.'
  },
  {
    name: 'Radiology',
    range: '70010 – 79999',
    min: 70010,
    max: 79999,
    description: 'Diagnostic imaging, ultrasound, MRI, CT scans, nuclear medicine, and radiation oncology. Can be split into Professional (-26) and Technical (-TC) components.',
    highlightCodes: '71045 (Chest X-ray 1 view), 70551 (Brain MRI), 76881 (Complete joint ultrasound)'
  },
  {
    name: 'Pathology & Laboratory',
    range: '80048 – 89399',
    min: 80048,
    max: 89399,
    description: 'Organ disease panels, automated blood counts, microbiology, surgical pathology tissue examinations, and urinalysis. Strict CLIA compliance and frequency limits apply.',
    highlightCodes: '80053 (Comprehensive Metabolic Panel), 85025 (Complete Blood Count with differential), 88305 (Surgical pathology Level IV)'
  },
  {
    name: 'Medicine',
    range: '90281 – 99199 & 99500 – 99607',
    min: 90281,
    max: 99607,
    description: 'Immunizations, psychiatry, cardiovascular diagnostics (EKG, echocardiography), pulmonary function, allergy testing, physical medicine, and rehabilitation.',
    highlightCodes: '90471 (Immunization admin), 93000 (12-lead EKG), 97110 (Therapeutic exercises 15 min)'
  }
];

export interface PosCodeItem {
  code: string;
  name: string;
  setting: string;
  billingNotes: string;
}

export const POS_CODES: PosCodeItem[] = [
  { code: '11', name: 'Office', setting: 'Private doctor practice or independent physician clinic', billingNotes: 'Non-facility RVU rate applies (higher physician reimbursement because doctor pays office overhead).' },
  { code: '12', name: 'Home', setting: 'Patient private residence or domicile', billingNotes: 'Used for home health physician house calls (CPT 99341–99350).' },
  { code: '21', name: 'Inpatient Hospital', setting: 'Acute care hospital inpatient admission', billingNotes: 'Facility RVU rate applies (lower physician reimbursement; overhead covered by UB-04).' },
  { code: '22', name: 'On-Campus Outpatient Hospital', setting: 'Hospital-owned clinic or department on main hospital campus', billingNotes: 'Subject to Split-Billing (Professional CMS-1500 + Facility UB-04).' },
  { code: '23', name: 'Emergency Room - Hospital', setting: 'Hospital emergency department open 24/7', billingNotes: 'Requires EMTALA compliance. Physician bills 99281–99285.' },
  { code: '24', name: 'Ambulatory Surgical Center (ASC)', setting: 'Freestanding surgical outpatient center', billingNotes: 'Separate facility fee paid via ASC payment groups.' },
  { code: '31', name: 'Skilled Nursing Facility (SNF)', setting: 'Subacute nursing care and rehabilitation facility', billingNotes: 'Check for SNF Consolidated Billing restrictions (Part A vs Part B).' },
  { code: '81', name: 'Independent Laboratory', setting: 'Freestanding clinical or anatomical testing lab', billingNotes: 'Requires CLIA certification on file; Box 32 shows lab address.' },
  { code: '02 / 10', name: 'Telehealth Services', setting: 'Telemedicine encounter (02 = Other than patient home, 10 = In patient home)', billingNotes: 'Requires telehealth modifiers (e.g. 95) depending on payer policy.' }
];

export const MODIFIER_MASTERCLASS: ModifierDeepDive[] = [
  {
    code: '25',
    title: 'Significant, Separately Identifiable E&M on Same Day',
    category: 'e&m',
    primaryUse: 'Appended to an Evaluation & Management code (99202–99215, 99381–99397) to indicate that on the same day as a minor procedure or preventive visit, the patient had a separate medical problem requiring substantial, independent evaluation.',
    whenToUse: [
      'Patient arrives for annual routine physical (99395), and also presents with an acute, uncontrolled medical condition (e.g., severe migraine or acute hypertension flare).',
      'Patient scheduled for a minor skin biopsy, and during the visit the doctor evaluates a completely separate chronic condition (e.g., uncontrolled asthma).'
    ],
    whenNotToUse: [
      'Do NOT use if the E&M discussion only covers pre-operative consent and routine discussion inherent to the procedure itself.',
      'Do NOT bill on non-E&M codes (never append 25 to a surgical CPT or lab code).',
      'Do NOT use when billing an E&M with a major surgery that has a 90-day global period (use Modifier 57 instead!).'
    ],
    dollarImpact: 'Unlocks $40 to $185 per encounter by preventing auto-bundling of the physician office visit.',
    documentationChecklist: [
      'Separate chief complaint documented.',
      'Distinct history, exam, and medical decision making (MDM) recorded in the chart.',
      'Separate diagnosis code (ICD-10) linked to the E&M line item whenever possible.'
    ],
    cases: [
      {
        title: 'Case 1: Annual Preventive Visit + Acute Migraine Episode',
        clinicalScenario: 'A 42-year-old established patient attends an annual preventive exam (CPT 99395). During the encounter, patient reports a 4-day throbbing unilateral headache with photophobia and nausea. Physician performs a focused neurological exam, diagnoses acute migraine with aura, prescribes Sumatriptan, and orders follow-up.',
        correctBilling: 'Line 1: 99395 (Preventive exam linked to Z00.00). Line 2: 99213-25 (Office visit Level 3 linked to G43.109).',
        financialImpact: 'Insurance pays 100% of the preventive visit ($140) PLUS $75 for 99213-25. Without modifier 25, 99213 is denied as bundled (loss of $75).',
        rationale: 'The migraine required independent history, neurological assessment, and pharmacological management exceeding routine preventive health maintenance.'
      },
      {
        title: 'Case 2: Preventive Exam + Minor Sebaceous Cyst Excision',
        clinicalScenario: 'Patient presents for scheduled annual checkup (99395). Patient asks the doctor to examine an infected, draining 2 cm sebaceous cyst on the upper back. Doctor performs an excision (CPT 11402) under local lidocaine anesthesia.',
        correctBilling: 'Line 1: 99395-25 (linked to Z00.00). Line 2: 11402 (linked to L72.3).',
        financialImpact: 'Secures full preventive reimbursement ($150) and full surgical allowance ($180). Net recovery: $330.',
        rationale: 'The preventive examination is unrelated to the infected epidermal cyst.'
      }
    ]
  },
  {
    code: '59',
    title: 'Distinct Procedural Service',
    category: 'surgical-distinct',
    primaryUse: 'Identifies that a procedure or service was distinct or independent from other non-E&M services performed on the same day (different session, different procedure/surgery, different site/organ system, or separate incision).',
    whenToUse: [
      'Two surgical procedures performed during the same operative session on completely distinct anatomical locations.',
      'Diagnostic test performed on a different body part than an interventional injection.',
      'When no other more specific modifier (such as XE, XS, XP, XU, or RT/LT) applies.'
    ],
    whenNotToUse: [
      'Do NOT use on E&M codes (use 25).',
      'Do NOT use if the service is a component or natural extension of the primary procedure (e.g. closure of surgical wound).',
      'Do NOT use if CMS requires NCCI subset modifiers (XE, XS, XP, XU).'
    ],
    dollarImpact: 'Reclaims $50 to $600+ on surgical line items that would otherwise be rejected as mutually exclusive or bundled.',
    documentationChecklist: [
      'Operative note explicitly mentions separate incision, excision, or lesion sites.',
      'Distinct anatomical landmarks documented.',
      'Different pathology diagnoses where applicable.'
    ],
    cases: [
      {
        title: 'Case 1: Cryotherapy of Left Hand Wart + Skin Tag Excision on Back',
        clinicalScenario: 'Dermatologist treats a stubborn verruca on the patient’s left hand using liquid nitrogen cryotherapy (CPT 17004). During the same encounter, doctor surgically snips a pedunculated skin tag from the patient’s upper right back (CPT 11200).',
        correctBilling: 'Line 1: 17004 (B78.1). Line 2: 11200-59 (L91.8).',
        financialImpact: 'Prevents denial CO-97 on CPT 11200, preserving $65 in professional reimbursement.',
        rationale: 'Procedures were conducted on completely separate anatomical structures (hand vs back) for separate conditions.'
      },
      {
        title: 'Case 2: Diagnostic Ultrasound + Joint Corticosteroid Injection',
        clinicalScenario: 'Orthopedic surgeon conducts a diagnostic ultrasound of the right shoulder (76881) evaluating rotator cuff integrity, followed by an ultrasound-guided therapeutic subacromial bursal corticosteroid injection (20610).',
        correctBilling: 'Line 1: 20610-RT (Arthrocentesis). Line 2: 76881-59 (Diagnostic ultrasound).',
        financialImpact: 'Recovers $110 for the diagnostic ultrasound which payers routinely bundle with arthrocentesis.',
        rationale: 'Documentation demonstrates the ultrasound was a full diagnostic evaluation, not merely guidance.'
      }
    ]
  },
  {
    code: '76',
    title: 'Repeat Procedure by Same Physician on Same Day',
    category: 'repeat',
    primaryUse: 'Informs the payer that a procedure or service was repeated subsequent to the original service on the same calendar day by the SAME physician or qualified healthcare professional.',
    whenToUse: [
      'Repeat diagnostic ECG or chest X-ray taken later in the day due to changing cardiac status.',
      'Repeat pathology review of a specimen because the original cut or stain was inadequate.',
      'Patient experiences acute post-operative bleeding in recovery, requiring the original surgeon to re-enter the OR.'
    ],
    whenNotToUse: [
      'Do NOT use if a different doctor performed the repeat procedure (use Modifier 77).',
      'Do NOT use if repeating a clinical laboratory test (use Modifier 91).',
      'Do NOT use to resubmit a denied claim (Modifier 76 is a clinical modifier, not a billing resubmission tag!).'
    ],
    dollarImpact: 'Prevents automatic rejection under CARC CO-18 (Exact duplicate claim), unlocking $100–$500+.',
    documentationChecklist: [
      'Time stamps recorded for both initial and second procedure.',
      'Clinical rationale for repeating the procedure documented in progress notes.',
      'Same rendering provider NPI in Box 24J.'
    ],
    cases: [
      {
        title: 'Case 1: Repeat Pathology Specimen Review Due to Poor Staining',
        clinicalScenario: 'Pathologist prepares and reviews a surgical biopsy specimen (CPT 88305). Initial tissue staining reveals ambiguous nuclear details. The same pathologist orders a fresh recut, restains the block, and performs a second microscopic review later that afternoon.',
        correctBilling: 'Line 1: 88305 (DOS 03/10). Line 2: 88305-76 (DOS 03/10).',
        financialImpact: 'Reimbursement of $125 on the second pathology review. Without -76, payer rejects line 2 as duplicate CO-18.',
        rationale: 'Indicates the second charge is a distinct, necessary clinical repeat by the same pathologist.'
      },
      {
        title: 'Case 2: Repeat Arthroscopic Knee Debridement for Post-Op Hemarthrosis',
        clinicalScenario: 'Surgeon performs knee arthroscopy debridement (29881) at 8:00 AM. In the PACU at 2:00 PM, patient develops massive hemarthrosis and joint compartment compression. The same surgeon takes patient back to the OR for repeat arthroscopic evacuation and hemostasis.',
        correctBilling: 'Line 1: 29881. Line 2: 29881-76.',
        financialImpact: 'Protects $450 in surgical reimbursement for the emergency return to OR.',
        rationale: 'Explicitly tells payer claim scrubber that this is an emergency repeat, not a billing error.'
      }
    ]
  },
  {
    code: '77',
    title: 'Repeat Procedure by Another Physician on Same Day',
    category: 'repeat',
    primaryUse: 'Reports that a procedure or service was repeated on the same day by a DIFFERENT physician or healthcare provider.',
    whenToUse: [
      'A morning chest X-ray ordered by the ER doctor is repeated in the evening by the admitting pulmonologist.',
      'Emergency endotracheal intubation attempted by Dr. A fails, and attending critical care specialist Dr. B takes over and successfully intubates the patient.'
    ],
    whenNotToUse: [
      'Do NOT use if both procedures were performed by the exact same doctor (use Modifier 76).',
      'Do NOT use for laboratory tests (use Modifier 91).'
    ],
    dollarImpact: 'Saves $75 to $350 on emergency and multi-specialty inpatient handoffs.',
    documentationChecklist: [
      'Different rendering provider NPI in Box 24J on Line 2.',
      'Clinical handoff or consultation note justifying the repeat service.'
    ],
    cases: [
      {
        title: 'Case: Emergency Intubation Attempt by Resident followed by Attending',
        clinicalScenario: 'In the ICU, emergency physician Dr. A attempts endotracheal intubation (CPT 31500) on an anatomically difficult airway but cannot pass the tube. Attending critical care anesthesiologist Dr. B arrives with video laryngoscopy and successfully completes intubation.',
        correctBilling: 'Line 1: 31500 (Rendering: Dr. A NPI). Line 2: 31500-77 (Rendering: Dr. B NPI).',
        financialImpact: 'Dr. B receives full allowable reimbursement ($145) rather than suffering a duplicate denial.',
        rationale: 'Proves to payer claims engine that a separate practitioner repeated the procedure.'
      }
    ]
  },
  {
    code: '91',
    title: 'Repeat Clinical Diagnostic Laboratory Test',
    category: 'repeat',
    primaryUse: 'Used exclusively on clinical laboratory CPT codes (80000 series) to report that the exact same lab test was run multiple times on the same day to obtain serial measurements or due to an unusable initial specimen.',
    whenToUse: [
      'Blood sample hemolyzed during centrifugation; phlebotomist draws new specimen and lab reruns Comprehensive Metabolic Panel (80053).',
      'Serial cardiac troponin or arterial blood gas (ABG) draws taken at 0, 3, and 6 hours for an unstable patient.'
    ],
    whenNotToUse: [
      'Do NOT use to confirm an unexpected initial test result (standard lab QC protocol forbids billing repeats for rerun confirmations).',
      'Do NOT use on radiology, surgery, or E&M services.',
      'Do NOT use if the test failed due to equipment malfunction or laboratory operator error.'
    ],
    dollarImpact: 'Recovers $15 to $85 per serial lab test in ICU, ER, and outpatient hospital settings.',
    documentationChecklist: [
      'Exact draw time stamps (e.g. 08:00, 12:00, 16:00) documented in LIS (Laboratory Information System).',
      'Physician order for serial monitoring or lab accession note detailing hemolyzed initial specimen.'
    ],
    cases: [
      {
        title: 'Case 1: Hemolyzed Blood Sample on Comprehensive Metabolic Panel',
        clinicalScenario: 'Patient presents for pre-op clearance. Lab draws blood for CMP (80053). The specimen hemolyzes during transit. Phlebotomist redraws a fresh vacutainer 2 hours later, and the lab reruns the panel.',
        correctBilling: 'Line 1: 80053 (Draw 09:15). Line 2: 80053-91 (Draw 11:30).',
        financialImpact: 'Payer reimburses both tests ($38 each = $76 total). Without -91, line 2 is denied CO-18.',
        rationale: 'Valid repeat lab test on a newly obtained specimen.'
      },
      {
        title: 'Case 2: Serial ICU Creatinine / BMP Monitoring in Acute Kidney Injury',
        clinicalScenario: 'An ICU patient with septic shock and acute renal failure requires tight monitoring of serum potassium and creatinine. BMP (80048) is ordered and drawn at 8 AM, 1 PM, and 7 PM.',
        correctBilling: 'Line 1: 80048. Line 2: 80048-91. Line 3: 80048-91.',
        financialImpact: 'Recovers all three test runs ($90 total).',
        rationale: 'Serial tests ordered for dynamic metabolic clinical management.'
      }
    ]
  },
  {
    code: 'LT & RT',
    title: 'Left / Right Side Anatomical Modifiers',
    category: 'anatomical',
    primaryUse: 'HCPCS Level II national modifiers used to identify procedures performed on the left (LT) or right (RT) side of paired organs, limbs, or structures.',
    whenToUse: [
      'Bilateral limb X-rays (e.g., right knee vs left knee).',
      'Cataract extractions performed on separate eyes.',
      'Joint injections into paired extremities (e.g., left shoulder).'
    ],
    whenNotToUse: [
      'Do NOT use on non-paired structures (e.g., liver, stomach, uterus, spine midline).',
      'Do NOT use if the payer requires Modifier 50 (Bilateral) on a single line instead of two lines.'
    ],
    dollarImpact: 'Prevents $50 to $800 denials when submitting paired anatomical procedures.',
    documentationChecklist: [
      'Operative report clearly specifies side (Left vs Right).',
      'ICD-10-CM diagnosis code includes laterality (e.g., M17.11 Right knee osteoarthritis vs M17.12 Left knee).'
    ],
    cases: [
      {
        title: 'Case 1: Bilateral Knee X-Rays on Same Day',
        clinicalScenario: 'Patient falls down stairs injuring both knees. Physician orders 2-view X-rays of both the right and left knees.',
        correctBilling: 'Line 1: 73560-RT (Right knee, 2 views). Line 2: 73560-LT (Left knee, 2 views).',
        financialImpact: 'Both claims pay at 100% allowable fee ($65 + $65 = $130).',
        rationale: 'Prevents the second X-ray from being flagged as a duplicate claim.'
      },
      {
        title: 'Case 2: Bilateral Cataract Extraction with IOL',
        clinicalScenario: 'Ophthalmologist performs phacoemulsification with intraocular lens implantation on both eyes in a specialized bilateral protocol.',
        correctBilling: 'Line 1: 66984-RT (Right eye). Line 2: 66984-LT (Left eye).',
        financialImpact: 'Protects $750+ surgical facility and professional fees.',
        rationale: 'Explicit laterality proves two distinct surgical fields.'
      }
    ]
  },
  {
    code: 'OU vs. 50',
    title: 'Bilateral Procedure Modifiers (HCPCS OU vs. CPT 50)',
    category: 'anatomical',
    primaryUse: 'CPT 50 is the official AMA bilateral procedure modifier used when a bilateral service is billed on a single line (paid at 150% of the allowable fee). HCPCS OU represents "Both Eyes" in ophthalmic billing.',
    whenToUse: [
      'CPT 50: Bilateral total knee arthroplasty (27447-50), bilateral mammogram (77067), or bilateral carpal tunnel release.',
      'HCPCS OU: Bilateral intravitreal eye injections (e.g., Avastin/Eylea CPT 67028-OU) when required by Medicare MAC.'
    ],
    whenNotToUse: [
      'Do NOT append Modifier 50 to CPT codes whose official descriptor already includes the word "Bilateral" (e.g., CPT 77067 or 92250).',
      'Do NOT bill two lines with modifier 50 (e.g., 27447 on Line 1 and 27447-50 on Line 2 is an error!).'
    ],
    dollarImpact: 'Ensures correct 150% bilateral fee schedule reimbursement ($200–$1,200+ difference).',
    documentationChecklist: [
      'Check Medicare MAC / commercial payer bilateral billing preference (1 line with Modifier 50 & 1 unit vs 1 line with 2 units vs 2 lines with RT/LT).'
    ],
    cases: [
      {
        title: 'Case: Bilateral Total Knee Replacement',
        clinicalScenario: 'Patient undergoes planned bilateral total knee arthroplasty under single general anesthesia session.',
        correctBilling: 'Line 1: 27447-50 (Units: 1). Payer calculates 150% of allowable amount ($1,400 × 1.5 = $2,100).',
        financialImpact: 'Prevents full denial of the second knee surgery or underpayment at 100%.',
        rationale: 'Follows CMS standard bilateral payment policy.'
      }
    ]
  },
  {
    code: 'NCCI (XE, XS, XP, XU)',
    title: 'NCCI PTP Subset Modifiers (X{EPSU})',
    category: 'ncci',
    primaryUse: 'CMS established the four "X{EPSU}" modifiers to provide greater specificity than general Modifier 59 when unbundling National Correct Coding Initiative (NCCI) Procedure-to-Procedure (PTP) edits.',
    whenToUse: [
      'XE (Separate Encounter): Service occurred during a distinct encounter on the same date.',
      'XS (Separate Structure): Service performed on a separate anatomical organ or structure.',
      'XP (Separate Practitioner): Service rendered by a distinct physician/practitioner.',
      'XU (Unusual Non-Overlapping Service): Service does not overlap components of the main procedure.'
    ],
    whenNotToUse: [
      'Do NOT use if the NCCI edit modifier indicator is "0" (never allowable to unbundle!).',
      'Do NOT bill both Modifier 59 and an X{EPSU} modifier on the same line item.'
    ],
    dollarImpact: 'Eliminates automatic audit rejections and pre-payment record requests triggered by overused Modifier 59.',
    documentationChecklist: [
      'Check CMS NCCI edit tables for edit indicator "1".',
      'Select the exact X subset (XS for distinct organ, XE for distinct time/session).'
    ],
    cases: [
      {
        title: 'Case: Same-Session Upper Endoscopy + Lower Colonoscopy',
        clinicalScenario: 'Gastroenterologist performs a diagnostic Upper EGD (CPT 43235) and a diagnostic Colonoscopy (CPT 45378) during the same anesthesia sedation session.',
        correctBilling: 'Line 1: 45378 (Colonoscopy). Line 2: 43235-XS (Separate structure / Upper GI tract).',
        financialImpact: 'Reclaims $190 on the EGD. Mod 59 frequently triggers automated denials, whereas XS clears cleanly.',
        rationale: 'Upper GI tract and Lower GI tract are completely separate anatomical organ systems.'
      }
    ]
  },
  {
    code: 'GV & GW / TC & 26',
    title: 'Hospice (GV/GW) & Component (TC/26) Modifiers',
    category: 'hospice-component',
    primaryUse: 'GV/GW: Route Medicare hospice physician claims. TC/26: Split diagnostic testing into Technical Component (equipment/tech) and Professional Component (physician interpretation).',
    whenToUse: [
      'Modifier GV: Attending physician is NOT employed by hospice, managing patient for terminal illness condition.',
      'Modifier GW: Service rendered to hospice patient for a condition completely UNRELATED to terminal hospice diagnosis (e.g. hospice cancer patient breaks wrist in a fall).',
      'Modifier TC: Hospital or imaging center billing for equipment, technologist, and facility cost.',
      'Modifier 26: Radiologist or cardiologist billing solely for reading and dictating the report.'
    ],
    whenNotToUse: [
      'Do NOT bill GV/GW for patients not enrolled in hospice.',
      'Do NOT append 26 or TC to global procedures when the same provider owns the machine AND interprets the test in their private office (bill global code without modifier).'
    ],
    dollarImpact: 'Without GW on non-hospice claims, Medicare auto-denies 100% under hospice exclusion rules!',
    documentationChecklist: [
      'Verify hospice election date in Medicare 271 eligibility response.',
      'Verify whether condition is terminal-related or unrelated.',
      'For imaging: Verify whether practice owns the equipment (global) or only provides interpretation (26).'
    ],
    cases: [
      {
        title: 'Case: Hospice Lung Cancer Patient Falls and Fractures Wrist',
        clinicalScenario: 'Patient enrolled in home hospice for terminal lung carcinoma trips over a rug and suffers a Colles fracture of the right distal radius. Orthopedic surgeon reduces the fracture and casts the arm (CPT 25600).',
        correctBilling: 'Line 1: 25600-GW (Fracture care unrelated to terminal hospice condition).',
        financialImpact: 'Medicare Part B pays the claim ($320). Without Modifier GW, Medicare immediately denies claim under hospice exclusion rules (CO-96).',
        rationale: 'Modifier GW legally certifies the fracture is completely independent of the palliative terminal diagnosis.'
      }
    ]
  }
];

export const MODIFIER_BEST_PRACTICES: string[] = [
  'Never use Modifier 59 as a default "fix-all": Prefer specific anatomical modifiers (RT, LT, E1-E4, F1-F10) or NCCI X{EPSU} modifiers whenever applicable.',
  'Verify NCCI PTP Edit Indicators: Indicator "0" = unbundling NOT permitted under any circumstances; Indicator "1" = modifier override allowed with clinical documentation; Indicator "9" = edit deleted.',
  'Always substantiate separate E&M: For Modifier 25, ensure the physician note contains a distinct chief complaint, relevant physical exam, and independent medical decision making beyond routine consent.',
  'Check Payer-Specific Bilateral Rules: Some commercial payers insist on 1 line with Modifier 50 and 1 unit, while others mandate 2 separate lines with RT and LT modifiers.',
  'Audit Global Surgical Periods: Check whether an E&M falls inside a 010 or 090 day post-op global window; append Modifier 24 for unrelated post-op E&M or Modifier 57 for decision for major surgery.'
];

export const MODIFIER_FAQS = [
  {
    q: 'Why did my claim with Modifier 25 get denied as inclusive (CO-97)?',
    a: 'Payers use AI scrubbers to flag Modifier 25 if the medical record shows the E&M visit was merely an evaluation to perform the minor procedure. To overturn this denial, the physician chart must prove an independent problem was addressed (e.g. managing diabetes during a wart excision) with separate ICD-10 diagnosis linkage.'
  },
  {
    q: 'Can I append both Modifier 25 and Modifier 59 on the same claim?',
    a: 'Yes, but on DIFFERENT line items! Modifier 25 is strictly appended to an Evaluation & Management code (e.g. 99214-25), while Modifier 59 is appended to a distinct procedural or surgical code (e.g. 11200-59). Never put Modifier 59 on an E&M code.'
  },
  {
    q: 'What is the difference between Modifier 76 and Modifier 77?',
    a: 'Modifier 76 indicates the procedure was repeated by the SAME physician who performed the initial service on that calendar day. Modifier 77 indicates the repeat procedure was performed by a DIFFERENT physician.'
  },
  {
    q: 'When should I use Modifier 91 instead of Modifier 59 for repeat labs?',
    a: 'Modifier 91 is specifically designed for repeating the exact same clinical diagnostic laboratory test (80000 series) on the same day for serial monitoring or because of a hemolyzed sample. Modifier 59 should never be used for repeat lab tests of the same CPT code.'
  }
];
