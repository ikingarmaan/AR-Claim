// ==============================================================
// RCMclaim — Comprehensive Modifiers Masterclass & AR Denial Prevention
// Complete guide to CPT & HCPCS Modifiers, clinical vignettes, and NCCI logic
// ==============================================================

export interface IntroModifierSummary {
  modifier: string;
  meaning: string;
  exampleUsage: string;
}

export interface DetailedModifierCase {
  title: string;
  scenario: string;
  codeSubmission: string[];
  alternativeSubmission?: string[];
  whyUsed: string;
  denialPreventionNote: string;
  documentationRequired: string[];
}

export interface DetailedModifierGuide {
  modifier: string;
  title: string;
  primaryUse: string;
  category: 'e&m' | 'procedural' | 'repeat' | 'anatomical' | 'ophthalmology' | 'bilateral' | 'ncci';
  categoryLabel: string;
  whenToUse: string[];
  whenNotToUse: string[];
  examples: DetailedModifierCase[];
  typicalReimbursementImpact: string;
}

export interface ModifierBestPractice {
  number: number;
  practice: string;
  description: string;
  actionSteps: string[];
}

export interface ModifierQuickReference {
  modifier: string;
  name: string;
  primaryUse: string;
  mostCommonDenialReason: string;
  typicalReimbursementImpact: string;
}

export interface ModifierFaq {
  question: string;
  answer: string;
  keyRule?: string;
}

// -------------------------------------------------------------
// 1. INTRODUCTORY MODIFIERS SUMMARY TABLE
// -------------------------------------------------------------
export const INTRO_MODIFIERS_TABLE: IntroModifierSummary[] = [
  { modifier: '25', meaning: 'Significant, separately identifiable E/M service', exampleUsage: 'E/M + procedure on same day (stitches + BP exam)' },
  { modifier: '26', meaning: 'Professional component only', exampleUsage: 'Radiologist interprets X-ray image' },
  { modifier: 'TC', meaning: 'Technical component only', exampleUsage: 'Hospital bills for X-ray machine use and technician time' },
  { modifier: '50', meaning: 'Bilateral procedure', exampleUsage: 'Cataract surgery performed in both eyes' },
  { modifier: '59', meaning: 'Distinct procedural service', exampleUsage: 'Two unrelated procedures performed on different anatomical sites' },
  { modifier: '57', meaning: 'Decision for surgery', exampleUsage: 'ER visit resulting in immediate decision for urgent appendectomy' },
  { modifier: 'GV', meaning: 'Physician service for hospice patient (not employed by hospice)', exampleUsage: 'Attending physician treating hospice patient for ongoing primary care' },
  { modifier: 'GW', meaning: 'Service unrelated to hospice terminal diagnosis', exampleUsage: 'Patient under hospice care seen for unrelated acute trauma/fracture' },
  { modifier: 'QW', meaning: 'CLIA waived test', exampleUsage: 'Simple, low-complexity laboratory test (e.g., urine pregnancy test)' },
  { modifier: '24', meaning: 'Unrelated E/M during post-op global period', exampleUsage: 'Knee surgery patient in 90-day global visits clinic for acute viral cough' },
  { modifier: 'LT', meaning: 'Left side', exampleUsage: 'Diagnostic X-ray of left forearm/wrist' },
  { modifier: 'RT', meaning: 'Right side', exampleUsage: 'Diagnostic X-ray of right forearm/wrist' }
];

// -------------------------------------------------------------
// 2. THE 10 MOST COMMONLY USED MODIFIERS IN AR DENIALS
// -------------------------------------------------------------
export const TEN_COMMON_MODIFIERS_LIST = [
  { code: '25', name: 'Significant, Separately Identifiable E/M Service' },
  { code: '59', name: 'Distinct Procedural Service' },
  { code: '76', name: 'Repeat Procedure by Same Physician' },
  { code: '77', name: 'Repeat Procedure by Different Physician' },
  { code: '91', name: 'Repeat Clinical Laboratory Test' },
  { code: 'LT / RT', name: 'Left / Right Anatomical Sites' },
  { code: 'E1 – E4', name: 'Multiple Eyelid Stages' },
  { code: 'OU', name: 'Bilateral Procedure (Both Eyes - HCPCS)' },
  { code: '50', name: 'Bilateral Procedure (CPT)' },
  { code: 'XS / XP / XE / XU', name: 'NCCI Bundling Edits Modifiers' }
];

// -------------------------------------------------------------
// 3. DETAILED MODIFIER GUIDES WITH USES AND EXAMPLES
// -------------------------------------------------------------
export const DETAILED_MODIFIER_GUIDES: DetailedModifierGuide[] = [
  {
    modifier: '25',
    title: 'Significant, Separately Identifiable Evaluation & Management (E/M) Service',
    category: 'e&m',
    categoryLabel: 'Evaluation & Management',
    primaryUse: 'Used to indicate that an E&M service (such as 99213, 99214, or 99215) was provided on the same day as a preventive visit (99385–99397), minor procedure, or another service, and the E&M service was significant and separately identifiable from the other service.',
    whenToUse: [
      'A patient comes for a routine preventive visit (99395) and develops an acute problem requiring additional evaluation and medical decision-making.',
      'An E&M service is provided on the same day as a minor surgical procedure (0 or 10-day global).',
      'A significant, unplanned clinical evaluation is performed in addition to a scheduled service.',
      'Substantial additional clinical work beyond the routine visit is fully documented in the chart.'
    ],
    whenNotToUse: [
      'The problem is minor and addressed as part of routine preventive screening care.',
      'The clinical evaluation is minimal or merely incidental to the minor procedure (e.g. routine pre-procedure consent).',
      'Time spent is minimal and does not justify separate medical decision-making (MDM).'
    ],
    typicalReimbursementImpact: '$40 – $75 per claim ($150+ for Level 4/5 encounters)',
    examples: [
      {
        title: 'Example 1: Preventive Visit + Acute Problem',
        scenario: 'A 45-year-old female presents for her annual preventive exam (99395). During the visit, she reports a severe, persistent headache ongoing for three days. The physician performs an additional focused neurological assessment, evaluates migraine medication adjustments, and orders diagnostic imaging studies.',
        codeSubmission: [
          '99395 (Preventive visit, established patient, 40-49 years)',
          '99213-25 (Office visit, established patient, Level 3 with Modifier 25)'
        ],
        whyUsed: 'The problem-oriented evaluation of headache required significant additional work beyond the routine preventive screening. Documentation must clearly demonstrate that the headache evaluation required a separate, identifiable medical decision-making process.',
        denialPreventionNote: 'Without Modifier 25, insurers routinely bundle both services and pay only for the preventive visit, resulting in a $40–$75 loss per claim.',
        documentationRequired: [
          'Separate chief complaint and history of present illness for the acute condition.',
          'Physical exam findings distinct from the wellness screening.',
          'Documented Medical Decision Making (MDM) showing independent treatment plan, medication review, or imaging orders.'
        ]
      },
      {
        title: 'Example 2: Preventive Visit + Minor Office Procedure',
        scenario: 'A 52-year-old male presents for his annual physical exam (99395). During the examination, the physician identifies a small sebaceous cyst on the patient’s back that requires removal. The physician performs a focused 10-minute excision with distinct decision-making beyond the checkup.',
        codeSubmission: [
          '99395 (Preventive visit)',
          '11404-25 (Excision, benign lesion, trunk, 0.6-1.0 cm, with Modifier 25)'
        ],
        whyUsed: 'If the cyst evaluation and surgical removal was significant and required separate decision-making beyond the routine physical, Modifier 25 is appropriate. If the cyst was simply noted and excised with minimal work, modifier 25 should not be used.',
        denialPreventionNote: 'Payers audit Modifier 25 on preventive visits paired with excisions. Clear documentation of separate time and surgical consent prevents post-payment recoupments.',
        documentationRequired: [
          'Separate documentation of surgical risks, benefits, and patient informed consent.',
          'Distinct operative note with lesion dimensions, excision depth, and closure.',
          'Separate ICD-10 diagnosis pointers linking 99395 to Z00.00 and 11404 to L72.3.'
        ]
      }
    ]
  },
  {
    modifier: '59',
    title: 'Distinct Procedural Service',
    category: 'procedural',
    categoryLabel: 'Distinct Procedures',
    primaryUse: 'Indicates that a procedure or service was distinct or independent from other non-E&M procedures performed on the same day. It is used when standard modifiers (like 25, 76, 77, 91) are not appropriate, but the procedures are clearly separate services.',
    whenToUse: [
      'Two surgical procedures are performed on completely different anatomical sites or organ systems.',
      'Procedures are performed at different times or separate sessions during the same day.',
      'Procedures have a distinct clinical purpose despite being performed during the same operative encounter.',
      'NCCI edits bundle procedures that should legitimately be paid separately for clinical reasons.',
      'No other specific anatomical or subset modifier (XE, XS, XP, XU) is applicable.'
    ],
    whenNotToUse: [
      'Modifier 25, 76, 77, or 91 is more appropriate for the clinical scenario.',
      'The procedures are inherently bundled components per payer guidelines (e.g. routine wound closure).',
      'The second procedure is an integral part of the primary procedure’s global surgical package.'
    ],
    typicalReimbursementImpact: '$50 – $150+ per claim',
    examples: [
      {
        title: 'Example 1: Two Unrelated Procedures on Different Body Areas',
        scenario: 'A 60-year-old patient presents to dermatology with two separate skin concerns. The physician performs cryotherapy on a wart on the left hand (20 minutes) and then removes a skin tag from the right upper back (15 minutes). These are distinct procedures in different anatomical areas with separate clinical indications.',
        codeSubmission: [
          '17004 (Cryotherapy, warts, first lesion)',
          '11200-59 (Removal of skin tags, one to fifteen lesions, with Modifier 59)'
        ],
        whyUsed: 'The two procedures are completely independent, performed on different anatomical sites, and have distinct clinical purposes. Cryotherapy was for a viral lesion (B07.8); skin tag removal was for a benign neoplasm (L91.8). Despite being on the same day, they required separate clinical decisions.',
        denialPreventionNote: 'Without Modifier 59, payers bundle both services together and reduce payment, resulting in a $50–$100 denial. The modifier signals that these are distinct services deserving separate payment.',
        documentationRequired: [
          'Separate clinical indications and diagnoses for each procedure.',
          'Exact time spent on each individual procedure.',
          'Distinct anatomical locations (e.g., left dorsal hand vs right scapular back).',
          'Independent operative descriptions for both cryosurgery and excision.'
        ]
      },
      {
        title: 'Example 2: Diagnostic Service + Treatment Service',
        scenario: 'A patient presents with suspected shoulder impingement. The physician performs a diagnostic ultrasound of the right shoulder (to assess rotator cuff pathology) and then performs a therapeutic injection of corticosteroid into the subacromial space (to reduce acute inflammation).',
        codeSubmission: [
          '76881 (Ultrasound, complete joint, real-time with image documentation)',
          '20610-59 (Arthrocentesis, aspiration/injection, major joint or bursa, with Modifier 59)'
        ],
        whyUsed: 'Although both procedures involve the same joint, the ultrasound is diagnostic (gathering information), while the injection is therapeutic (providing treatment). They represent distinct services performed sequentially with different clinical purposes. Without the modifier, payers deny the injection as part of the diagnostic ultrasound.',
        denialPreventionNote: 'Payers often bundle ultrasound guidance into injection codes. Modifier 59 proves the ultrasound was a full diagnostic examination, preserving ~$110 in reimbursement.',
        documentationRequired: [
          'Ultrasound report documenting pathology that clinically justified subsequent injection.',
          'Time interval between diagnostic imaging and therapeutic injection.',
          'Clinical reasoning for combining diagnostic assessment and treatment in one visit.'
        ]
      }
    ]
  },
  {
    modifier: '76',
    title: 'Repeat Procedure by Same Physician on Same Day',
    category: 'repeat',
    categoryLabel: 'Repeat Services',
    primaryUse: 'Used when the same procedure is repeated by the same physician on the same day or during the same encounter. It indicates that a procedure was performed more than once and the repetition was clinically necessary.',
    whenToUse: [
      'A diagnostic procedure fails or yields an inadequate initial specimen and is repeated immediately.',
      'A laboratory or pathology consultation is repeated the same day due to an unusable or invalid first result.',
      'A surgical procedure requires repeated attempts or an urgent return to the OR to achieve clinical success or control bleeding.',
      'A diagnostic test (ECG, X-ray) is repeated later in the day due to changing clinical status.'
    ],
    whenNotToUse: [
      'The procedure is normally billed multiple times without a modifier per payer guidelines.',
      'The same procedure is performed on different calendar days (no modifier needed).',
      'A different physician performs the repeat procedure (use Modifier 77 instead).',
      'The repetition is an expected step in the procedure’s typical standard protocol.'
    ],
    typicalReimbursementImpact: '$75 – $200+ per repeat service',
    examples: [
      {
        title: 'Example 1: Repeat Pathology Specimen Review',
        scenario: 'A pathologist reviews a histopathology specimen from a skin biopsy (88305). During the initial review, the tissue specimen is deemed inadequate or the staining is poor. The specimen is recut, prepared again, and re-reviewed by the same pathologist on the same day to provide a definitive diagnosis.',
        codeSubmission: [
          '88305 (Surgical pathology consultation / tissue exam, Level IV)',
          '88305-76 (Surgical pathology examination, repeated by same physician, with Modifier 76)'
        ],
        whyUsed: 'The same pathology service was performed twice on the same day by the same physician due to the initial result being uninterpretable. The modifier indicates this was a necessary repetition, not a billing error or duplicate submission.',
        denialPreventionNote: 'Without Modifier 76, insurers deny the second service as an exact duplicate (CO-18). The modifier justifies the repetition and recovers $100–$200 for the second read.',
        documentationRequired: [
          'Reason for initial specimen inadequacy (poor staining, insufficient cell volume).',
          'Remediation steps taken to recut and restain the tissue.',
          'Confirmation that both reads were completed by the same pathologist.',
          'Final diagnostic conclusion from the repeat microscopic review.'
        ]
      },
      {
        title: 'Example 2: Repeat Surgical Debridement for Hemarthrosis',
        scenario: 'A surgeon performs an arthroscopic debridement of a knee joint (29881) at 8:00 AM. In the recovery room, acute bleeding causes severe hemarthrosis and compartment pressure. The patient is taken back to the operating room by the same surgeon for repeat arthroscopic evacuation and joint debridement.',
        codeSubmission: [
          '29881 (Arthroscopic knee debridement)',
          '29881-76 (Arthroscopic knee debridement, repeat by same physician, with Modifier 76)'
        ],
        whyUsed: 'The identical surgical procedure was performed twice during the same operative calendar day due to acute postoperative bleeding. This is clinically justified emergency care, not an accidental billing duplicate.',
        denialPreventionNote: 'Prevents automatic duplicate rejection under CO-18, protecting $450 in surgical reimbursement.',
        documentationRequired: [
          'Time stamps for initial operative session and repeat emergency return to OR.',
          'Clinical operative report detailing the hemorrhage and necessity for repeat surgery.',
          'Independent anesthesia and surgical operative records for both encounters.'
        ]
      }
    ]
  },
  {
    modifier: '77',
    title: 'Repeat Procedure by Different Physician on Same Day',
    category: 'repeat',
    categoryLabel: 'Repeat Services',
    primaryUse: 'Used when the same procedure is repeated during the same day or encounter but by a different physician or qualified healthcare professional. It indicates that repetition was clinically necessary and performed by another provider.',
    whenToUse: [
      'A procedure is attempted by one physician and fails; a second physician repeats it successfully.',
      'Due to hospital shift changes or specialized expertise, a second physician performs the repeat procedure.',
      'A consulting specialist repeats a diagnostic imaging study or procedure previously attempted by the primary team.'
    ],
    whenNotToUse: [
      'The same physician performs both procedures (use Modifier 76).',
      'The procedures are performed on different calendar dates.',
      'The second physician’s involvement is for a different clinical consultation or distinct service.'
    ],
    typicalReimbursementImpact: '$75 – $200+ per procedure',
    examples: [
      {
        title: 'Example: Repeat Emergency Intubation by Different Physician',
        scenario: 'An emergency resident (Dr. A) attempts endotracheal intubation (31500) on a patient with a challenging airway. After two unsuccessful attempts over 15 minutes, attending critical care anesthesiologist (Dr. B) takes over with video laryngoscopy and successfully completes intubation on the first attempt.',
        codeSubmission: [
          '31500 (Intubation, endotracheal, emergency procedure — billed under Dr. A NPI)',
          '31500-77 (Intubation, endotracheal, emergency, repeat by different physician, with Modifier 77 — billed under Dr. B NPI)'
        ],
        whyUsed: 'The identical intubation procedure was medically necessary twice, performed by two different physicians, due to initial failure and the need for a provider with advanced technical expertise.',
        denialPreventionNote: 'Without Modifier 77, the second intubation will be denied as a duplicate procedure under CO-18. The modifier justifies both procedures and supports separate payment.',
        documentationRequired: [
          'Reason for first attempt failure (severe airway edema, anatomical challenge).',
          'Time spent on first attempt and documentation of handoff.',
          'Identity and individual NPIs of both physicians.',
          'Separate clinical procedure notes from both providers.'
        ]
      }
    ]
  },
  {
    modifier: '91',
    title: 'Repeat Clinical Diagnostic Laboratory Test',
    category: 'repeat',
    categoryLabel: 'Clinical Laboratory',
    primaryUse: 'Used when a clinical laboratory test is repeated on the same day and the repetition is clinically necessary. It indicates that the test was performed more than once for valid clinical reasons, not as a duplicate or billing error.',
    whenToUse: [
      'A lab test result is invalid or uninterpretable (hemolyzed sample, clotted specimen, short draw).',
      'A test needs to be repeated to confirm an unexpected, life-threatening critical lab value.',
      'Serial testing is performed within the same calendar day for acute clinical monitoring in ICU or emergency settings.',
      'Monitoring a rapidly changing clinical parameter (blood glucose, cardiac troponin, arterial blood gases) requires same-day serial draws.'
    ],
    whenNotToUse: [
      'The lab test is normally performed in duplicate or triplicate per automated machine protocol (do not use modifier).',
      'The same test is performed on different calendar days.',
      'The repeat was necessitated by lab technician mishandling or laboratory equipment calibration failure.'
    ],
    typicalReimbursementImpact: '$25 – $75 per repeat lab test',
    examples: [
      {
        title: 'Example 1: Invalid First Sample — Hemolyzed Blood',
        scenario: 'A patient has a venipuncture performed for a Basic Metabolic Panel (80053). The blood specimen is accidentally hemolyzed during processing (red cells lysed, invalidating potassium values). A second venipuncture and repeat BMP are performed on the same day to obtain reliable clinical data.',
        codeSubmission: [
          '80053 (Comprehensive metabolic panel)',
          '80053-91 (Comprehensive metabolic panel, repeat clinical laboratory test, with Modifier 91)'
        ],
        whyUsed: 'The identical lab test was medically necessary twice on the same day due to sample inadequacy. The first result was clinically uninterpretable and unreliable.',
        denialPreventionNote: 'Without Modifier 91, insurers automatically deny the second test as a duplicate charge, resulting in a $25–$75 loss per panel.',
        documentationRequired: [
          'Laboratory information system (LIS) rejection flag (e.g. gross hemolysis).',
          'Exact time stamps between first and second blood draws.',
          'Physician order for repeat draw.',
          'Valid final diagnostic laboratory output.'
        ]
      },
      {
        title: 'Example 2: Serial Same-Day Lab Monitoring in ICU',
        scenario: 'A patient in the ICU with acute kidney injury requires serial monitoring of creatinine and BUN levels to assess response to IV fluid resuscitation. Three basic metabolic panels are performed within 8 hours (at 8 AM, 12 PM, and 4 PM) to guide fluid and medication dosing.',
        codeSubmission: [
          '80053 (Comprehensive metabolic panel at 08:00)',
          '80053-91 (Comprehensive metabolic panel at 12:00, with Modifier 91)',
          '80053-91 (Comprehensive metabolic panel at 16:00, with Modifier 91)'
        ],
        whyUsed: 'Serial laboratory testing on the same day is appropriate in critical care settings where rapid changes in patient physiology require frequent titration of therapies.',
        denialPreventionNote: 'Recovers payment for both repeat draws; without Modifier 91, claims scrubbers reject panels #2 and #3 as duplicate billing.',
        documentationRequired: [
          'ICU physician progress notes documenting acute renal failure.',
          'Clinical changes between tests that necessitated serial monitoring.',
          'Documented medication or fluid titration orders triggered by each result.'
        ]
      }
    ]
  },
  {
    modifier: 'LT / RT',
    title: 'Left / Right Anatomical Site Modifiers',
    category: 'anatomical',
    categoryLabel: 'Anatomical Laterality',
    primaryUse: 'Modifiers LT (Left) and RT (Right) are used to specify which side of the body a procedure was performed on when reporting procedures performed on paired anatomical organs or extremities (arms, legs, eyes, ears, kidneys, lungs).',
    whenToUse: [
      'A unilateral procedure is performed on the left side of the body (LT).',
      'A unilateral procedure is performed on the right side of the body (RT).',
      'Both sides are treated during the same encounter, but payer rules require reporting as separate line items rather than using bilateral Modifier 50.',
      'Procedures performed on paired anatomical structures (knees, hips, eyes, shoulders).'
    ],
    whenNotToUse: [
      'The CPT code description already specifies bilateral status (e.g. bilateral mammogram).',
      'Bilateral modifier 50 is preferred or mandated by the specific payer.',
      'The organ or anatomical site is midline or non-paired (e.g., spine, stomach, bladder).'
    ],
    typicalReimbursementImpact: '$25 – $100 per diagnostic study ($200–$500+ for surgery)',
    examples: [
      {
        title: 'Example 1: Bilateral Knee X-rays',
        scenario: 'A 72-year-old patient with severe osteoarthritis in both knees presents for imaging evaluation. Standing AP and lateral X-rays are obtained of the right knee and then the left knee to assess joint space narrowing and compare severity.',
        codeSubmission: [
          '73610-RT (X-ray, knee, three views, right knee)',
          '73610-LT (X-ray, knee, three views, left knee)'
        ],
        whyUsed: 'The same X-ray procedure was performed on both knees as separate anatomical studies. The modifiers clarify that each film represents imaging of a different anatomical site, justifying separate payment for each side.',
        denialPreventionNote: 'Without anatomical modifiers, insurers bundle both knee X-rays into a single payment or reject line 2 as duplicate CO-18. Proper use of LT/RT ensures payment for both studies ($50–$100 recovery).',
        documentationRequired: [
          'Separate radiographic findings and joint measurements for each knee.',
          'Physician order specifying bilateral knee pain or osteoarthritis.',
          'Radiologist report with distinct right and left impressions.'
        ]
      },
      {
        title: 'Example 2: Bilateral Cataract Extraction',
        scenario: 'A patient with visually significant cataracts in both eyes undergoes surgical removal and intraocular lens implantation. The right eye cataract extraction (66984) is performed first. Later that day or in a staged session, the left eye cataract extraction is performed.',
        codeSubmission: [
          '66984-RT (Cataract surgery with intraocular lens implant, right eye)',
          '66984-LT (Cataract surgery with intraocular lens implant, left eye)'
        ],
        whyUsed: 'Although the identical surgical CPT is performed, it is performed on two separate anatomical structures (right eye vs left eye). The modifiers specify exact laterality, preventing duplicate rejection.',
        denialPreventionNote: 'Medicare and commercial plans require explicit laterality (RT/LT) for ocular surgery; missing modifiers cause immediate claim suspension.',
        documentationRequired: [
          'Separate operative reports for each eye.',
          'Pre-operative visual acuity and pathology recorded for each eye independently.',
          'Specific lens implant serial numbers recorded for both left and right eyes.'
        ]
      }
    ]
  },
  {
    modifier: 'OU',
    title: 'Bilateral Procedure — Both Eyes (HCPCS Level II)',
    category: 'ophthalmology',
    categoryLabel: 'Ophthalmology',
    primaryUse: 'Modifier OU (both eyes) is a HCPCS Level II modifier used to indicate that an ophthalmologic procedure was performed on both eyes during the same encounter. It is primarily used in ophthalmology and optometry billing.',
    whenToUse: [
      'An ophthalmologic procedure (intravitreal injection, laser trabeculoplasty, punctal plug insertion) is performed on both eyes during the same visit.',
      'Payer guidelines allow bilateral reporting with OU rather than separate line items with LT/RT.',
      'Both eyes are treated as a single bilateral service under specific commercial or Medicaid guidelines.'
    ],
    whenNotToUse: [
      'LT and RT modifiers are required or preferred by the specific payer.',
      'The procedure is performed on different calendar dates.',
      'The procedure is inherently unilateral only per CPT definition.'
    ],
    typicalReimbursementImpact: '$50 – $150 per bilateral ophthalmic procedure',
    examples: [
      {
        title: 'Example: Bilateral Intravitreal Injections for Macular Degeneration',
        scenario: 'A 78-year-old patient with age-related macular degeneration (AMD) requires intravitreal anti-VEGF injection therapy in both eyes. During the same visit, the ophthalmologist performs intravitreal injections of bevacizumab (Avastin) in both the right eye and left eye.',
        codeSubmission: [
          '67040-OU (Intravitreal injection, pharmacologic agent, with Modifier OU for both eyes)'
        ],
        alternativeSubmission: [
          '67040-RT (Intravitreal injection, right eye)',
          '67040-LT (Intravitreal injection, left eye)'
        ],
        whyUsed: 'The same injection procedure was performed on both eyes during the same visit. The OU modifier indicates bilateral treatment and supports appropriate reimbursement for both eyes in a single line item, rather than splitting into two separate charges.',
        denialPreventionNote: 'Using the correct bilateral modifier (OU vs 50 vs LT/RT) per payer guidelines prevents denials. Some payers reject split line items; others reject OU. Always check payer policy.',
        documentationRequired: [
          'Documented indication for bilateral treatment (AMD in both eyes).',
          'Separate pre-procedure and post-procedure acuity measurements for each eye.',
          'Exact medication dosage, lot number, and expiration date injected in each eye.',
          'Confirmation of bilateral tolerance and post-injection pressure checks.'
        ]
      }
    ]
  },
  {
    modifier: '50',
    title: 'Bilateral Procedure (CPT Universal)',
    category: 'bilateral',
    categoryLabel: 'Bilateral Services',
    primaryUse: 'Modifier 50 indicates that a procedure was performed bilaterally (on both sides of the body or both paired organs). It is used to bill a single CPT code once with Modifier 50, rather than billing the code twice with LT/RT modifiers.',
    whenToUse: [
      'A surgical, radiology, or diagnostic procedure is performed on paired anatomical structures (both knees, both ears, both breasts).',
      'The procedure is performed bilaterally and payer guidelines require a single line item with Modifier 50.',
      'The CPT code has a CMS Bilateral Indicator of "1" in the Medicare Physician Fee Schedule (150% bilateral reimbursement rule applies).'
    ],
    whenNotToUse: [
      'LT and RT modifiers are explicitly required or preferred by the payer.',
      'The CPT code description already specifies "bilateral" (e.g. CPT 58700 salpingectomy or bilateral screening mammography).',
      'The procedures are performed on different calendar dates.',
      'The CPT code has a Bilateral Indicator of "0" (150% payment does not apply) or "2" (already bilateral).'
    ],
    typicalReimbursementImpact: '$50 – $300+ ($200–$500+ for major orthopedic surgery)',
    examples: [
      {
        title: 'Example: Bilateral Total Knee Replacement (Same Day)',
        scenario: 'A 65-year-old patient with severe end-stage bilateral osteoarthritis undergoes bilateral total knee arthroplasty (TKA). Both knees are replaced during the same surgical session under a single general anesthesia encounter.',
        codeSubmission: [
          '27447-50 (Total knee replacement, bilateral with Modifier 50)'
        ],
        alternativeSubmission: [
          '27447-RT (Total knee replacement, right knee — 100% allowable)',
          '27447-LT-51 (Total knee replacement, left knee — 50% multiple surgery allowable)'
        ],
        whyUsed: 'The identical major joint replacement was performed on both paired knees during the same operative session. Medicare applies the 150% bilateral rule (100% for first side, 50% for second side).',
        denialPreventionNote: 'Using the wrong bilateral modifier format (50 vs LT/RT) causes immediate adjudication rejection. Medicare Part B contractors generally require 1 line with Modifier 50; some commercial plans demand 2 lines with RT/LT.',
        documentationRequired: [
          'Comprehensive operative report detailing surgical technique on both knees.',
          'Individual surgical incision, implant insertion, and closure descriptions for both sides.',
          'Total surgical and anesthesia duration for the combined procedure.'
        ]
      }
    ]
  },
  {
    modifier: 'XS / XP / XE / XU',
    title: 'NCCI Edits Modifiers (Medicare Specific -59 Subsets)',
    category: 'ncci',
    categoryLabel: 'NCCI Bundling Overrides',
    primaryUse: 'These four HCPCS Level II modifiers were created by CMS to provide greater specificity than general Modifier 59 when overriding National Correct Coding Initiative (NCCI) Procedure-to-Procedure (PTP) bundling edits.',
    whenToUse: [
      'XE (Separate Encounter): Service is distinct because it occurred during a separate patient encounter on the same date.',
      'XS (Separate Structure): Service is distinct because it was performed on a separate anatomical organ or distinct structure.',
      'XP (Separate Practitioner): Service is distinct because it was performed by a different physician or qualified provider.',
      'XU (Unusual Non-Overlapping Service): Service is distinct because it does not overlap the usual components of the main service.',
      'The NCCI edit table has a Modifier Indicator of "1" (bypass allowed with supporting documentation).'
    ],
    whenNotToUse: [
      'The NCCI edit table has a Modifier Indicator of "0" (bypass is strictly prohibited under federal guidelines).',
      'The clinical circumstances do not meet the precise criteria for XE, XS, XP, or XU.',
      'The services are performed in the same operative field on the same structure without distinct indication.'
    ],
    typicalReimbursementImpact: '$100 – $500+ per overridden line item',
    examples: [
      {
        title: 'Example 1: Same-Day EGD and Colonoscopy (Different Anatomical Sites)',
        scenario: 'A 70-year-old patient presents for both upper and lower GI endoscopy procedures. An esophagogastroduodenoscopy (EGD, 43235) is performed to evaluate Barrett’s esophagus, and immediately following, a colonoscopy (45378) is performed for colorectal cancer screening.',
        codeSubmission: [
          '43235 (Esophagogastroduodenoscopy, diagnostic, with biopsy)',
          '45378-XS (Colonoscopy, diagnostic, with biopsy, with Modifier XS for separate structures)'
        ],
        whyUsed: 'Although both endoscopic procedures occur during the same operative session, they involve completely different anatomical structures (upper gastrointestinal tract vs lower gastrointestinal tract). NCCI edits bundle these by default, but Modifier XS demonstrates distinct organ systems.',
        denialPreventionNote: 'Without Modifier XS, insurers bundle both procedures and deny the colonoscopy or EGD, resulting in a $200–$400 loss.',
        documentationRequired: [
          'Separate endoscopy reports with distinct visual findings.',
          'Documented separate clinical indications (dysphagia vs screening).',
          'Biopsy pathology requisition logs indicating upper vs lower GI tissue origin.'
        ]
      },
      {
        title: 'Example 2: Hysterectomy + Incidental Appendectomy for Acute Inflammation',
        scenario: 'During an abdominal surgery, a gynecologist performs a total abdominal hysterectomy (58150) for uterine fibroids. During exploration, an acutely inflamed appendix is discovered, and an appendectomy (44950) is performed.',
        codeSubmission: [
          '58150 (Total abdominal hysterectomy, includes removal of fallopian tubes and ovaries)',
          '44950-XS (Appendectomy, with Modifier XS indicating separate anatomical organ)'
        ],
        whyUsed: 'Although both procedures are performed through the same surgical incision during the same session, they involve completely different organ systems (reproductive vs digestive tract). Modifier XS justifies separate reimbursement.',
        denialPreventionNote: 'Routine incidental appendectomies are non-covered. Documenting acute appendicitis pathology and using Modifier XS secures legitimate reimbursement ($250+).',
        documentationRequired: [
          'Detailed operative report describing separate pathological findings for uterus and appendix.',
          'Pathology report confirming acute appendiceal inflammation distinct from uterine leiomyoma.'
        ]
      }
    ]
  }
];

// -------------------------------------------------------------
// 4. HOW TO PREVENT MODIFIER-RELATED DENIALS (5 BEST PRACTICES)
// -------------------------------------------------------------
export const MODIFIER_PREVENTION_PRACTICES: ModifierBestPractice[] = [
  {
    number: 1,
    practice: 'Know Your Payer’s Specific Modifier Rules',
    description: 'Different insurance payers enforce distinct rules regarding modifier usage and bundling overrides. Medicare, Medicaid, and commercial insurers frequently diverge on bilateral reporting (50 vs LT/RT) and NCCI subsets (59 vs XS/XP/XE/XU).',
    actionSteps: [
      'Request and review written payer-specific coding and billing policy bulletins.',
      'Maintain an active payer-specific modifier matrix in your billing office.',
      'Review CMS NCCI quarterly edit table updates on the CMS.gov website.'
    ]
  },
  {
    number: 2,
    practice: 'Ensure Comprehensive Clinical Documentation',
    description: 'Insufficient clinical chart documentation is the #1 cause of modifier-related denials and audit clawbacks. If the chart does not clearly document separate decision-making or distinct sites, payers will reject the claim.',
    actionSteps: [
      'Document separate clinical indications and chief complaints for each service.',
      'Explicitly record distinct anatomical locations (e.g. left dorsal forearm vs right scapula).',
      'Record specific procedural start and stop timestamps for repeat services (Modifiers 76, 77, 91).'
    ]
  },
  {
    number: 3,
    practice: 'Deploy Automated Claim Scrubbing Software',
    description: 'Pre-submission claim scrubbing software flags missing modifiers and NCCI bundling conflicts before the 837 claim batch ever leaves your practice.',
    actionSteps: [
      'Configure billing scrubbers to enforce NCCI procedure-to-procedure (PTP) edits.',
      'Set automated warnings for same-day E/M visits billed alongside procedures missing Modifier 25.',
      'Flag duplicate CPT codes on the same date missing repeat modifiers (76, 77, 91).'
    ]
  },
  {
    number: 4,
    practice: 'Implement Regular Internal Coding Audits',
    description: 'Routine random audits of paid and denied claims reveal underlying modifier error trends before payers launch retrospective audits.',
    actionSteps: [
      'Audit high-volume modifier codes (Modifier 25 on preventive visits, Modifier 59 on dermatology).',
      'Track modifier denial rates by provider and specialty monthly.',
      'Review EOB denial remark codes (M15, M80, N20) to identify pattern bundling.'
    ]
  },
  {
    number: 5,
    practice: 'Provide Ongoing Coder & Clinical Training',
    description: 'Continuous education for certified coders, billing specialists, and clinical providers prevents modifier leakage and protects audit integrity.',
    actionSteps: [
      'Educate clinical providers on documenting separate and distinct medical decision-making.',
      'Train billing teams on appealing modifier denials with highlighted operative notes.',
      'Conduct refresher sessions whenever AMA or CMS issues annual CPT/HCPCS guideline revisions.'
    ]
  }
];

// -------------------------------------------------------------
// 5. QUICK REFERENCE GUIDE TABLE
// -------------------------------------------------------------
export const MODIFIER_QUICK_REFERENCE_TABLE: ModifierQuickReference[] = [
  {
    modifier: '25',
    name: 'Significant, Separately Identifiable E&M',
    primaryUse: 'Preventive + problem visit or E&M + minor procedure on same day',
    mostCommonDenialReason: 'Missing documentation of separate, distinct E&M decision-making',
    typicalReimbursementImpact: '$40 – $75 denial per claim'
  },
  {
    modifier: '59',
    name: 'Distinct Procedural Service',
    primaryUse: 'Different anatomical sites, different sessions, or distinct clinical purposes',
    mostCommonDenialReason: 'Inappropriate bundling under NCCI edits; non-distinct documentation',
    typicalReimbursementImpact: '$50 – $150 denial per claim'
  },
  {
    modifier: '76',
    name: 'Repeat Procedure, Same Physician',
    primaryUse: 'Exact same procedure repeated on same day by same doctor',
    mostCommonDenialReason: 'Treated as duplicate submission (CO-18)',
    typicalReimbursementImpact: '$75 – $200 denial per claim'
  },
  {
    modifier: '77',
    name: 'Repeat Procedure, Different Physician',
    primaryUse: 'Same procedure repeated on same day by another qualified provider',
    mostCommonDenialReason: 'Denied as duplicate procedure under CO-18',
    typicalReimbursementImpact: '$75 – $200 denial per claim'
  },
  {
    modifier: '91',
    name: 'Repeat Clinical Laboratory Test',
    primaryUse: 'Lab test repeated on same day for valid clinical monitoring or hemolyzed specimen',
    mostCommonDenialReason: 'Rejected as duplicate laboratory billing',
    typicalReimbursementImpact: '$25 – $75 denial per claim'
  },
  {
    modifier: 'LT',
    name: 'Left Side',
    primaryUse: 'Specifies left anatomical structure on paired organs/extremities',
    mostCommonDenialReason: 'Denied or bundled without laterality specification',
    typicalReimbursementImpact: '$25 – $100 denial per claim'
  },
  {
    modifier: 'RT',
    name: 'Right Side',
    primaryUse: 'Specifies right anatomical structure on paired organs/extremities',
    mostCommonDenialReason: 'Denied or bundled without laterality specification',
    typicalReimbursementImpact: '$25 – $100 denial per claim'
  },
  {
    modifier: 'OU',
    name: 'Both Eyes (HCPCS)',
    primaryUse: 'Bilateral eye procedures in ophthalmology/optometry',
    mostCommonDenialReason: 'Missing laterality specification or payer rejects OU in favor of RT/LT',
    typicalReimbursementImpact: '$50 – $150 denial per claim'
  },
  {
    modifier: '50',
    name: 'Bilateral Procedure (CPT)',
    primaryUse: 'Bilateral procedures performed during same operative session',
    mostCommonDenialReason: 'Unbundled incorrectly or submitted on 2 lines when 1 line with 50 required',
    typicalReimbursementImpact: '$50 – $300+ denial per claim'
  },
  {
    modifier: 'XS / XP / XE / XU',
    name: 'NCCI Edits Override Subsets',
    primaryUse: 'Overrides CMS NCCI bundling edits with specific clinical justification',
    mostCommonDenialReason: 'NCCI edit not overridden or inappropriate use when indicator is 0',
    typicalReimbursementImpact: '$100 – $500+ denial per claim'
  }
];

// -------------------------------------------------------------
// 6. FREQUENTLY ASKED QUESTIONS (FAQS)
// -------------------------------------------------------------
export const MODIFIER_FAQS: ModifierFaq[] = [
  {
    question: 'What is the difference between Modifier 25 and Modifier 59?',
    answer: 'Modifier 25 is specifically designed for Evaluation and Management (E/M) services performed on the same day as a minor procedure or preventive visit. Modifier 59 is a general "distinct procedural service" modifier used strictly on NON-E/M surgical, radiology, or diagnostic codes. Rule: Never append Modifier 25 to a surgical code, and never append Modifier 59 to an E/M code!',
    keyRule: 'Modifier 25 = E/M codes ONLY | Modifier 59 = Non-E/M procedural codes ONLY'
  },
  {
    question: 'When should I use Modifier 50 instead of Modifier 25?',
    answer: 'These modifiers serve completely different functions and are never interchangeable. Modifier 50 indicates a bilateral procedure performed on paired organs (both knees, both eyes, both breasts). Modifier 25 indicates a significant, separately identifiable office visit on the same day as a procedure.',
    keyRule: 'Modifier 50 = Bilateral paired anatomy | Modifier 25 = Separate E/M evaluation'
  },
  {
    question: 'Can I stack multiple modifiers on a single CPT procedure code?',
    answer: 'Yes, you can stack modifiers when multiple clinical circumstances apply. For example: CPT 73610-LT-59 indicates a left-sided knee X-ray that was also a distinct procedural service. CMS-1500 Box 24D accommodates up to 4 modifier fields (e.g. 27447-RT-59-QW). However, avoid unnecessary stacking, as each additional modifier increases payer scrutiny.',
    keyRule: 'Up to 4 modifiers can be reported in Box 24D. Sequence pricing/functional modifiers before informational modifiers.'
  },
  {
    question: 'If a payer denies a claim due to missing Modifier 25, can I appeal it?',
    answer: 'Yes, absolutely. If the medical record supports that the physician performed a significant, separately identifiable evaluation (with distinct chief complaint, exam, and medical decision-making), you can submit a corrected claim or appeal with the clinical progress note. Appeal success rates for missing Modifier 25 are typically 60% to 70% with thorough documentation.',
    keyRule: 'Highlight the separate history, exam, and treatment plan in the progress note when filing the appeal.'
  },
  {
    question: 'How do I know if Modifier 25 is required?',
    answer: 'Review payer guidelines and NCCI edits. As a general rule, Modifier 25 is required whenever an E/M code is reported on the same date of service as: (1) a preventive health exam (99381–99397), (2) a minor surgical procedure with a 0-day or 10-day global period, or (3) an in-office therapeutic injection or diagnostic test that has bundling edits with E/M services.',
    keyRule: 'Check NCCI Column 1 / Column 2 edits. If the procedure is Column 1 and E/M is Column 2, Modifier 25 is mandatory.'
  },
  {
    question: 'What happens if I use a modifier inappropriately?',
    answer: 'Inappropriate or unsupportable modifier usage causes: (1) Immediate claim denials, (2) Retrospective audits and recoupment demands by payers, (3) Accusations of fraudulent unbundling under the federal False Claims Act (31 U.S.C. § 3729), and (4) Heightened pre-payment review status. Modifiers must always be substantiated by the medical record.',
    keyRule: 'Never append a modifier solely to bypass a billing edit without verified chart documentation.'
  },
  {
    question: 'Are modifier rules identical for Medicare and commercial insurance plans?',
    answer: 'No. While CMS NCCI guidelines establish the baseline for Medicare, commercial payers (Aetna, UnitedHealthcare, Cigna, Blue Cross Blue Shield) have proprietary payment policies. For example, some commercial payers do not recognize NCCI X-modifiers (XE, XS, XP, XU) and demand Modifier 59, while others have different bilateral rules (requiring 2 lines with RT/LT instead of 1 line with 50).',
    keyRule: 'Always maintain a payer-specific modifier rulebook to verify individual payer preferences.'
  }
];

