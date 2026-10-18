// =========================================================================
// RCMclaim — Comprehensive Dynamic RCM Mind Map Data
// Complete end-to-end hierarchy of US Healthcare Revenue Cycle Management
// =========================================================================

export type RcmPhase = 'front-end' | 'mid-cycle' | 'back-end' | 'ar-recovery';

export interface MindMapNode {
  id: string;
  title: string;
  shortTitle: string;
  phase: RcmPhase;
  stageNumber?: number;
  stageRoute?: string;
  icon: string;
  badge?: string;
  summary: string;
  description: string;
  operationalSteps: string[];
  ediTransactions: {
    code: string;
    name: string;
    direction: 'Outbound' | 'Inbound' | 'Bi-directional';
    description: string;
  }[];
  kpis: {
    name: string;
    target: string;
    definition: string;
  }[];
  denialRisks: {
    code: string;
    reason: string;
    prevention: string;
  }[];
  bestPractices: string[];
  children?: MindMapNode[];
}

export const RCM_MIND_MAP_DATA: MindMapNode = {
  id: 'rcm-root',
  title: 'US Healthcare Revenue Cycle Management Ecosystem',
  shortTitle: 'RCM Ecosystem',
  phase: 'front-end',
  icon: '🏛️',
  badge: 'CORE REVENUE ENGINE',
  summary: 'The administrative and clinical workflow that translates healthcare services into compliant provider reimbursement and patient financial clearance.',
  description: 'Revenue Cycle Management (RCM) encompasses every operational step from a patient scheduling an appointment to final zero-balance resolution. When executed with high clinical fidelity and automated EDI protocols, top-performing health systems achieve a >98% Clean Claim Rate, <35 Days in A/R, and <5% Denial Rate.',
  operationalSteps: [
    'Pre-Service Access & Financial Clearance (Front-End)',
    'Clinical Encounter, Medical Coding & Charge Capture (Mid-Cycle)',
    'Claim Formatting, Scrubbing, Clearinghouse & Remittance (Back-End)',
    'Accounts Receivable Aging, Denial Management & Payer Appeals (A/R Follow-Up)'
  ],
  ediTransactions: [
    { code: '270 / 271', name: 'Eligibility & Benefit Inquiry / Response', direction: 'Bi-directional', description: 'Real-time insurance coverage validation' },
    { code: '278', name: 'Prior Authorization & Referral Request / Response', direction: 'Bi-directional', description: 'Utilization management certification' },
    { code: '837P / 837I', name: 'Healthcare Claim (Professional / Institutional)', direction: 'Outbound', description: 'Electronic claim transmission to clearinghouse/payer' },
    { code: '276 / 277', name: 'Claim Status Request / Response', direction: 'Bi-directional', description: 'Electronic tracking of claim adjudication' },
    { code: '835', name: 'Electronic Remittance Advice (ERA)', direction: 'Inbound', description: 'Electronic payment voucher and CAS adjustments' }
  ],
  kpis: [
    { name: 'Clean Claim Rate (CCR)', target: '> 98.0%', definition: 'Percentage of claims passing all scrubbing edits and accepted on first transmission.' },
    { name: 'Net Days in A/R', target: '< 35.0 Days', definition: 'Average number of days required to collect payment on billed charges.' },
    { name: 'Initial Denial Rate', target: '< 5.0%', definition: 'Percentage of billed claim volume denied upon first adjudication by payers.' },
    { name: 'Cost to Collect', target: '< 2.5% of NCR', definition: 'Total revenue cycle operating expenses divided by net collected revenue.' }
  ],
  denialRisks: [
    { code: 'CO-16', reason: 'Missing or Invalid Demographic / Clinical Data', prevention: 'Automated claim scrubbers and mandatory registration field validation.' },
    { code: 'CO-18', reason: 'Duplicate Claim Submission', prevention: 'Real-time billing system duplicate checks and proper modifier 76/77 usage.' },
    { code: 'CO-22', reason: 'Coordination of Benefits (COB) Conflict', prevention: 'Upfront COB verification and NAIC Birthday Rule determination.' },
    { code: 'CO-29', reason: 'Timely Filing Limit Exceeded', prevention: 'Daily billing alerts and clearinghouse 277CA acceptance tracking.' }
  ],
  bestPractices: [
    'Enforce rigorous pre-registration and real-time 270/271 eligibility verification 48 hours prior to DOS.',
    'Align clinical documentation with 2021/2023 AMA E/M guidelines and ICD-10 highest specificity.',
    'Scrub all claims against NCCI PTP edits and MUE tables before electronic 837 batch creation.',
    'Post ERAs (835) within 24 hours of receipt to keep AR aging buckets accurate.'
  ],
  children: [
    // =======================================================================
    // PHASE 1: FRONT-END REVENUE CYCLE
    // =======================================================================
    {
      id: 'phase-frontend',
      title: 'Phase 1: Front-End Revenue Cycle (Pre-Service & Patient Access)',
      shortTitle: '1. Front-End Operations',
      phase: 'front-end',
      icon: '🟢',
      badge: 'GATE 1–3',
      summary: 'Patient access operations that prevent over 60% of all downstream claim denials before care is delivered.',
      description: 'The front-end captures patient demographics, verifies active insurance benefits, calculates estimated patient out-of-pocket liabilities, and secures prior authorizations. Errors made here cascade directly into uncollectible bad debt or fatal CO-27 / CO-22 denials.',
      operationalSteps: [
        'Pre-registration intake and scheduling cadence optimization',
        'Electronic EDI 270/271 real-time benefit verification',
        'In-network vs Out-of-network provider status validation',
        'Prior authorization and specialist referral procurement (EDI 278)',
        'Point-of-service patient financial clearance and copay collection'
      ],
      ediTransactions: [
        { code: '270', name: 'Eligibility Request', direction: 'Outbound', description: 'PMS sends member inquiry to payer' },
        { code: '271', name: 'Eligibility Response', direction: 'Inbound', description: 'Payer returns active status, copay, and deductible' },
        { code: '278', name: 'Prior Auth Request/Response', direction: 'Bi-directional', description: 'Utilization management certification' }
      ],
      kpis: [
        { name: 'Pre-Registration Rate', target: '> 95.0%', definition: 'Percentage of scheduled appointments pre-registered prior to arrival.' },
        { name: 'POS Cash Collections', target: '> 80.0% of Copays', definition: 'Percentage of copays collected at the front desk before the encounter.' },
        { name: 'Eligibility Denial Rate', target: '< 1.0%', definition: 'Percentage of claims denied for CO-27 (coverage terminated) or CO-26.' }
      ],
      denialRisks: [
        { code: 'CO-27', reason: 'Coverage Terminated prior to Date of Service', prevention: 'Re-verify 270/271 morning of encounter.' },
        { code: 'CO-26', reason: 'Expenses incurred prior to coverage effective date', prevention: 'Confirm effective date covers scheduled DOS.' }
      ],
      bestPractices: [
        'Run batch EDI 270 queries 48 hours prior to service and re-verify real-time upon check-in.',
        'Collect photo ID and front/back scans of all commercial, Medicare, and Medicaid cards.'
      ],
      children: [
        {
          id: 'node-stage1',
          title: 'Gate 1: Appointment Scheduling & Pre-Registration',
          shortTitle: '1. Scheduling',
          phase: 'front-end',
          stageNumber: 1,
          stageRoute: 'appointment',
          icon: '📅',
          badge: 'GATE 1',
          summary: 'Capturing baseline patient identity, contact details, insurance subscriber details, and scheduling appointment slots.',
          description: 'Scheduling establishes the patient encounter record. Capturing full legal name, DOB, phone, address, and primary/secondary insurance ensures downstream electronic clearinghouse scrubbers can validate subscriber records.',
          operationalSteps: [
            'Collect patient legal name matching government-issued photo ID',
            'Record subscriber relationship (Self, Spouse, Child, Other)',
            'Capture policy ID, group number, and electronic Payer ID',
            'Confirm referring physician name and NPI if specialist visit'
          ],
          ediTransactions: [
            { code: '270', name: 'Eligibility Inquiry', direction: 'Outbound', description: 'Triggered upon schedule confirmation' }
          ],
          kpis: [
            { name: 'Demographic Accuracy Rate', target: '99.5%', definition: 'Clean demographic records with zero spelling or transposition errors.' }
          ],
          denialRisks: [
            { code: 'CO-16', reason: 'Name / DOB mismatch with payer enrollment file', prevention: 'Verify spelling against physical insurance card.' }
          ],
          bestPractices: [
            'Never abbreviate first or last names.',
            'Ask: "Do you have any secondary or supplemental insurance coverage?" at every scheduling event.'
          ]
        },
        {
          id: 'node-stage2',
          title: 'Gate 2: Insurance Eligibility & Benefits Verification',
          shortTitle: '2. Eligibility & Benefits',
          phase: 'front-end',
          stageNumber: 2,
          stageRoute: 'eligibility',
          icon: '🔍',
          badge: 'GATE 2',
          summary: 'Electronic EDI 270/271 real-time query and phone verification for policy status, deductibles, copays, coinsurance, and COB.',
          description: 'Validates that coverage is active on the DOS. Calculates deductible accumulator status (met vs unmet), copayment amounts, out-of-pocket maximums, and Coordination of Benefits (NAIC Birthday Rule). Uses standardized GPD and Short Professional phone scripts when electronic responses are incomplete.',
          operationalSteps: [
            'Transmit ANSI X12 EDI 270 inquiry to payer EDI gateway',
            'Parse EDI 271 response segments (EB*1 active, EB*C deductible, EB*B copay)',
            'Verify Coordination of Benefits (COB) order (Birthday Rule for dual-covered children)',
            'Execute GPD phone script (Smriti / John) if electronic portal is inconclusive',
            'Verify provider in-network contractual participation'
          ],
          ediTransactions: [
            { code: '270', name: 'Eligibility Inquiry', direction: 'Outbound', description: 'Real-time inquiry segment EQ*30' },
            { code: '271', name: 'Eligibility Response', direction: 'Inbound', description: 'Returns active status EB*1 and cost-shares' }
          ],
          kpis: [
            { name: 'Eligibility Verification Rate', target: '100%', definition: 'All active encounters verified within 48 hours of service.' },
            { name: 'COB Discrepancy Resolution', target: '< 24 Hours', definition: 'Time to update payer primary/secondary order in PMS.' }
          ],
          denialRisks: [
            { code: 'CO-22', reason: 'Coordination of Benefits (Payment by primary payer required)', prevention: 'Identify primary payer using NAIC Birthday Rule and bill in correct order.' },
            { code: 'CO-27', reason: 'Expenses incurred after coverage terminated', prevention: 'Check termination date on EDI 271 response.' }
          ],
          bestPractices: [
            'In January, account for calendar-year deductible resets ($0 met).',
            'Use standard NATO Phonetic Alphabet when communicating Member IDs to payer phone representatives.'
          ]
        },
        {
          id: 'node-stage3',
          title: 'Gate 3: Patient Registration & Financial Clearance',
          shortTitle: '3. Registration & Consent',
          phase: 'front-end',
          stageNumber: 3,
          stageRoute: 'registration',
          icon: '📋',
          badge: 'GATE 3',
          summary: 'In-person check-in, identity validation, consent execution, Advance Beneficiary Notice (ABN), and copay collection.',
          description: 'Front-desk point-of-service intake. Verifies patient identity, scans physical insurance cards, captures signed Treatment Consent and Assignment of Benefits (CMS-1500 Box 12 & 13), executes CMS-R-131 ABN for non-covered Medicare services, and collects upfront copayments.',
          operationalSteps: [
            'Scan government photo ID and front/back of insurance card',
            'Execute HIPAA Notice of Privacy Practices acknowledgement',
            'Obtain signed Assignment of Benefits (AOB) for Box 13 direct reimbursement',
            'Issue Advance Beneficiary Notice (ABN) if procedure is not deemed medically necessary by Medicare LCD/NCD',
            'Collect copayment, past-due balances, and estimated coinsurance at point of service'
          ],
          ediTransactions: [
            { code: '270', name: 'Check-in Real-time Ping', direction: 'Outbound', description: 'Instant eligibility verification upon arrival' }
          ],
          kpis: [
            { name: 'Point-of-Service (POS) Collections', target: '> 85%', definition: 'Percentage of scheduled patient copay liabilities collected prior to exam.' },
            { name: 'Card Scan Compliance', target: '100%', definition: 'Encounter files with verified front/back card images.' }
          ],
          denialRisks: [
            { code: 'CO-50', reason: 'Non-covered service (lack of medical necessity)', prevention: 'Valid signed ABN form (CMS-R-131) with modifier GA appended to CPT.' },
            { code: 'PR-1 / PR-2 / PR-3', reason: 'Patient Deductible / Coinsurance / Copay', prevention: 'Upfront patient collection at registration desk.' }
          ],
          bestPractices: [
            'Never bill Medicare without an ABN if an LCD/NCD indicates medical necessity may be denied.',
            'Ensure Box 12 (Release of Medical Information) and Box 13 (Assignment of Benefits) are signed and on file.'
          ]
        },
        {
          id: 'node-prior-auth',
          title: 'Prior Authorization & Utilization Management (EDI 278)',
          shortTitle: 'Prior Authorization',
          phase: 'front-end',
          icon: '🛡️',
          badge: 'CLINICAL GATE',
          summary: 'Pre-certification for inpatient admissions, elective surgeries, and advanced diagnostic imaging.',
          description: 'Securing formal authorization from commercial payers, Medicare Advantage, and Medicaid prior to procedure execution. Manages emergency inpatient admission notifications within 24–48 hours (Haywood Regional Medical Centre script by SAM_P) and satisfies InterQual / Milliman MCG clinical criteria.',
          operationalSteps: [
            'Identify CPT codes requiring prior authorization from payer guidelines',
            'Submit electronic ANSI X12 EDI 278 request or upload clinical records to payer portal',
            'Execute 24–48 hour emergency inpatient admission notification for ER admissions',
            'Substantiate clinical Severity of Illness (SI) and Intensity of Service (IS)',
            'Record Authorization / Case Reference Number and authorized Length of Stay (LOS)'
          ],
          ediTransactions: [
            { code: '278', name: 'Prior Auth Request / Response', direction: 'Bi-directional', description: 'Electronic pre-certification transaction' }
          ],
          kpis: [
            { name: 'Prior Auth Turnaround Time', target: '< 72 Hours', definition: 'Average elapsed time from auth submission to payer determination.' },
            { name: 'Prior Auth Denial Rate', target: '< 0.5%', definition: 'Claims denied for CO-197 (Precertification/authorization absent).' }
          ],
          denialRisks: [
            { code: 'CO-197', reason: 'Precertification / authorization / notification absent', prevention: 'Verify active auth number matches CPT code and DOS on CMS-1500 Box 23.' },
            { code: 'CO-200', reason: 'Expenses incurred after authorization period expired', prevention: 'Track auth validity expiration dates and request extensions before DOS.' }
          ],
          bestPractices: [
            'For ER admissions, report inpatient bed assignment within 24–48 hours under EMTALA emergency rules.',
            'Enter the exact 10-digit authorization number into CMS-1500 Box 23 or UB-04 Form Locator 63.'
          ]
        }
      ]
    },

    // =======================================================================
    // PHASE 2: MID-CYCLE REVENUE CYCLE
    // =======================================================================
    {
      id: 'phase-midcycle',
      title: 'Phase 2: Mid-Cycle Operations (Clinical Care, Coding & Charge Capture)',
      shortTitle: '2. Mid-Cycle Operations',
      phase: 'mid-cycle',
      icon: '🔵',
      badge: 'GATE 4–7',
      summary: 'Translating clinical care into compliant documentation, medical codes, and billable charges.',
      description: 'The clinical heart of healthcare billing. Physicians document patient encounters, transcriptionists and CDI specialists ensure clinical clarity, certified coders assign ICD-10-CM, CPT, and HCPCS codes with compliant modifiers, and charge capture systems populate the billing ledger via the Charge Description Master (CDM).',
      operationalSteps: [
        'Provider clinical encounter and SOAP progress note documentation',
        'Clinical Documentation Improvement (CDI) review and provider queries',
        'Medical coding to highest specificity (ICD-10-CM, CPT, HCPCS Level II)',
        'Modifier assignment (25, 59, 50, 76, 77, 91, XS/XP/XE/XU) and NCCI edit checks',
        'Charge capture entry and Superbill fee schedule reconciliation'
      ],
      ediTransactions: [
        { code: 'EHR / HL7', name: 'Clinical Data Exchange', direction: 'Bi-directional', description: 'Interop messaging between EHR and billing systems' }
      ],
      kpis: [
        { name: 'Discharged Not Final Billed (DNFB)', target: '< 4.0 Days', definition: 'Average days clinical charts remain uncoded after patient discharge.' },
        { name: 'Coding Accuracy Rate', target: '> 95.0%', definition: 'Percentage of reviewed charts coded cleanly without audit discrepancies.' },
        { name: 'Late Charge Percentage', target: '< 1.5%', definition: 'Percentage of total charges posted after initial claim submission.' }
      ],
      denialRisks: [
        { code: 'CO-97', reason: 'The benefit for this service is included in the payment for another service (Bundled)', prevention: 'Check NCCI PTP edits and append modifier 59 / XS only when clinically supported.' },
        { code: 'CO-11', reason: 'The diagnosis is inconsistent with the procedure (Medical Necessity)', prevention: 'Verify ICD-10 to CPT linkage on CMS-1500 Box 24E.' }
      ],
      bestPractices: [
        'Ensure provider documentation explicitly establishes Medical Decision Making (MDM) or total encounter time for E/M selection.',
        'Never code directly from the alphabetical index; always verify codes in the tabular list for code first / use additional notes.'
      ],
      children: [
        {
          id: 'node-stage4',
          title: 'Gate 4: Doctor Encounter & Clinical Documentation',
          shortTitle: '4. Doctor Encounter',
          phase: 'mid-cycle',
          stageNumber: 4,
          stageRoute: 'encounter',
          icon: '🩺',
          badge: 'GATE 4',
          summary: 'Physician clinical exam, SOAP notes, Medical Decision Making (MDM), and Evaluation & Management (E/M) selection.',
          description: 'Documenting the clinical encounter using SOAP (Subjective, Objective, Assessment, Plan). Selecting E/M codes (99202–99215 for outpatient, 99221–99233 for inpatient) based on 2021/2023 AMA guidelines: either total physician time on DOS or the 3 MDM elements (Problems, Data, Risk).',
          operationalSteps: [
            'Record Chief Complaint (CC) and History of Present Illness (HPI)',
            'Document physical examination and Review of Systems (ROS)',
            'Formulate clinical Assessment and Medical Decision Making (MDM)',
            'Select E/M level based on Number/Complexity of Problems, Data Analyzed, and Risk of Complications'
          ],
          ediTransactions: [],
          kpis: [
            { name: 'Provider Documentation Completion', target: '< 24 Hours', definition: 'Time from patient encounter to signed clinical note.' }
          ],
          denialRisks: [
            { code: 'CO-150', reason: 'Payer downcoding of Evaluation & Management service', prevention: 'Substantiate high/moderate MDM complexity with detailed clinical rationale.' }
          ],
          bestPractices: [
            'Do not use generic "cut and paste" templates that introduce clinical discrepancies.',
            'When billing by time, document exact start/stop minutes and counseling topics.'
          ]
        },
        {
          id: 'node-stage5',
          title: 'Gate 5: Medical Transcription & CDI Review',
          shortTitle: '5. Transcription & CDI',
          phase: 'mid-cycle',
          stageNumber: 5,
          stageRoute: 'transcription',
          icon: '📝',
          badge: 'GATE 5',
          summary: 'Clinical documentation transcription, speech-to-text validation, and Clinical Documentation Improvement (CDI).',
          description: 'Ensures clinical accuracy of provider dictations. CDI specialists review inpatient charts for diagnostic specificity (e.g., specifying type of heart failure: systolic, diastolic, combined, acute vs chronic) and issue concurrent physician queries to avoid coding under-specificity.',
          operationalSteps: [
            'Transcribe audio dictation or review ambient AI speech-to-text records',
            'Verify anatomical terminology and pharmacological dosages',
            'Perform concurrent CDI chart reviews to identify missing secondary diagnoses (CC/MCC)',
            'Generate compliant physician queries without leading questions'
          ],
          ediTransactions: [],
          kpis: [
            { name: 'CDI Query Response Rate', target: '> 90%', definition: 'Percentage of physician queries answered prior to billing.' }
          ],
          denialRisks: [
            { code: 'CO-16 / N382', reason: 'Missing or non-specific diagnosis code', prevention: 'CDI queries clarify acute vs chronic and etiology.' }
          ],
          bestPractices: [
            'Ensure physician queries are non-leading and present multiple diagnostic choices including "unable to determine".'
          ]
        },
        {
          id: 'node-stage6',
          title: 'Gate 6: Medical Coding & Modifiers Masterclass',
          shortTitle: '6. Medical Coding',
          phase: 'mid-cycle',
          stageNumber: 6,
          stageRoute: 'coding',
          icon: '🏷️',
          badge: 'GATE 6',
          summary: 'Translating clinical notes into ICD-10-CM, CPT, and HCPCS codes with NCCI edits and compliant modifiers.',
          description: 'Professional and facility medical coding. Assigns ICD-10-CM diagnosis codes to highest specificity (7 characters), CPT procedural codes, and HCPCS Level II codes. Appends essential modifiers (25, 59, 50, 76, 77, 91, XS, TC, 26) to prevent bundling denials and duplicate rejections.',
          operationalSteps: [
            'Abstract clinical record for primary and secondary diagnoses',
            'Code ICD-10-CM to 7th character specificity (e.g. laterality, episode of care A/D/S)',
            'Assign CPT procedure codes and HCPCS Level II supply/drug codes',
            'Audit code pairs against CMS National Correct Coding Initiative (NCCI) PTP edits',
            'Append clinical modifiers: 25 (separate E/M), 59/XS (distinct procedural service), 50 (bilateral)'
          ],
          ediTransactions: [],
          kpis: [
            { name: 'First-Pass Coding Accuracy', target: '> 96%', definition: 'Percentage of coded charts passing internal QA audits.' },
            { name: 'Coder Productivity (Charts/Hour)', target: '5–7 Inpt / 25 Outpt', definition: 'Standard coding throughput benchmark.' }
          ],
          denialRisks: [
            { code: 'CO-97', reason: 'Procedure bundled into primary service without separate modifier', prevention: 'Append modifier 25 to E/M or modifier 59/XS to distinct procedural code.' },
            { code: 'CO-4', reason: 'The procedure code is inconsistent with the modifier used', prevention: 'Verify modifier is anatomically and clinically valid for CPT code.' }
          ],
          bestPractices: [
            'Modifier 25 requires a separately identifiable E/M service with its own clinical SOAP notes.',
            'Never append modifier 59 when a more specific CMS "X" modifier (XS, XP, XE, XU) applies.'
          ]
        },
        {
          id: 'node-stage7',
          title: 'Gate 7: Charge Capturing & Charge Description Master (CDM)',
          shortTitle: '7. Charge Capture',
          phase: 'mid-cycle',
          stageNumber: 7,
          stageRoute: 'charge-capture',
          icon: '💰',
          badge: 'GATE 7',
          summary: 'Posting billable clinical items to patient ledger via Superbill, EHR charge entry, and hospital CDM.',
          description: 'Charge capture translates coded services into billable charges. Reconciles Superbills with clinic appointment schedules to ensure zero missing charges. In hospitals, connects order entry to the Charge Description Master (CDM) with correct Revenue Codes and Fee Schedules.',
          operationalSteps: [
            'Reconcile daily clinic schedule against entered Superbill encounter forms',
            'Link CPT/HCPCS codes to practice fee schedule or hospital Charge Description Master (CDM)',
            'Map institutional services to 4-digit Revenue Codes (UB-04 Form Locator 42)',
            'Execute charge reconciliation audits to catch unbilled procedures and supplies'
          ],
          ediTransactions: [],
          kpis: [
            { name: 'Charge Lag Time', target: '< 48 Hours', definition: 'Average time between date of service and charge entry into PMS.' },
            { name: 'Missing Charge Reconciliation Rate', target: '100%', definition: 'Zero unbilled clinical appointments at month-end.' }
          ],
          denialRisks: [
            { code: 'CO-96', reason: 'Non-covered charge / fee schedule discrepancy', prevention: 'Maintain updated fee schedules matching payer contractual allowables.' }
          ],
          bestPractices: [
            'Conduct monthly reconciliation between clinical surgery logs and billed operating room charges.',
            'Verify all CLIA-waived laboratory tests (e.g. rapid strep, urinalysis) carry modifier QW and valid CLIA certificate number.'
          ]
        }
      ]
    },

    // =======================================================================
    // PHASE 3: BACK-END REVENUE CYCLE
    // =======================================================================
    {
      id: 'phase-backend',
      title: 'Phase 3: Back-End Operations (Claims Generation, Transmission & Adjudication)',
      shortTitle: '3. Back-End Operations',
      phase: 'back-end',
      icon: '🟣',
      badge: 'GATE 8–9',
      summary: 'Electronic claim creation, clearinghouse scrubbing, payer adjudication, and remittance posting.',
      description: 'Generates official CMS-1500 and UB-04 claim files, translates them into ANSI X12 EDI 837P (Professional) and 837I (Institutional) data streams, runs clearinghouse rules engines, tracks 277CA acceptance, and reconciles incoming EDI 835 Electronic Remittance Advice (ERA) payments against bank deposits.',
      operationalSteps: [
        'Generate CMS-1500 (33 boxes) or UB-04 (81 Form Locators) claim records',
        'Format outbound ANSI X12 EDI 837P / 837I transaction streams',
        'Transmit to healthcare clearinghouse and process 999 Functional Acknowledgements',
        'Review 277CA Claim Acknowledgements for Level 1 & Level 2 front-end rejections',
        'Post EDI 835 Electronic Remittance Advice (ERA) and manual paper EOB vouchers'
      ],
      ediTransactions: [
        { code: '837P', name: 'Professional Health Claim', direction: 'Outbound', description: 'Physicians, clinics, and outpatient therapy' },
        { code: '837I', name: 'Institutional Health Claim', direction: 'Outbound', description: 'Hospitals, inpatient, SNF, and home health' },
        { code: '999', name: 'Implementation Acknowledgement', direction: 'Inbound', description: 'Clearinghouse syntax and structural check' },
        { code: '277CA', name: 'Claim Acknowledgement', direction: 'Inbound', description: 'Payer front-end acceptance or rejection' },
        { code: '835', name: 'Electronic Remittance Advice (ERA)', direction: 'Inbound', description: 'Automated payment posting and adjustments' }
      ],
      kpis: [
        { name: 'Clean Claim Rate (CCR)', target: '> 98.0%', definition: 'Claims accepted by clearinghouse and payer without rejections.' },
        { name: 'Electronic Remittance (ERA) Rate', target: '> 90.0%', definition: 'Percentage of payments posted automatically via EDI 835.' },
        { name: 'Payment Posting Turnaround', target: '< 24 Hours', definition: 'Time from ERA receipt to ledger posting and bank reconciliation.' }
      ],
      denialRisks: [
        { code: 'Level 1 Rejection', reason: 'Clearinghouse format error (Invalid NPI, missing Tax ID)', prevention: 'Claim scrubber pre-flight validation.' },
        { code: 'Level 2 Rejection', reason: 'Payer front-end rejection (Member ID not found)', prevention: 'Real-time 270/271 check before batch transmission.' },
        { code: 'CO-45', reason: 'Charges exceed fee schedule / Maximum Allowable Amount', prevention: 'Automatic contractual write-off per provider agreement.' }
      ],
      bestPractices: [
        'Never let a clearinghouse rejection sit in the queue; correct and resubmit within 24 hours to protect the timely filing clock.',
        'Reconcile EFT batch totals against bank deposit statements daily before posting patient responsibility.'
      ],
      children: [
        {
          id: 'node-stage8',
          title: 'Gate 8: Claim Submission (CMS-1500, UB-04 & EDI 837)',
          shortTitle: '8. Claim Submission',
          phase: 'back-end',
          stageNumber: 8,
          stageRoute: 'claim-submission',
          icon: '📨',
          badge: 'GATE 8',
          summary: 'Assembling CMS-1500 (33 boxes) & UB-04 (81 locators) into EDI 837P/I and transmitting via clearinghouse.',
          description: 'Generates compliant claim documents. Maps patient demographics, provider NPIs (Billing NPI Box 33a vs Rendering NPI Box 24j), Tax ID (Box 25), diagnosis pointers (Box 24E), Place of Service (Box 24B), and Prior Auth Number (Box 23). Transmits electronic batches and validates 999 & 277CA reports.',
          operationalSteps: [
            'Assemble CMS-1500 professional claim boxes (1–33) or UB-04 institutional locators (1–81)',
            'Map Billing Provider NPI (Box 33a) and Rendering Provider NPI (Box 24j)',
            'Link diagnosis pointers (A–L) from Box 21 to procedural lines in Box 24E',
            'Translate claim data into ANSI X12 EDI 837P or 837I transaction streams',
            'Submit batch to clearinghouse and verify Level 1 (syntax) and Level 2 (payer) 277CA acceptances'
          ],
          ediTransactions: [
            { code: '837P', name: 'Professional Claim (CMS-1500)', direction: 'Outbound', description: 'Loop 2000A (Billing Prov), 2000B (Subscriber), 2300 (Claim), 2400 (Service Line)' },
            { code: '837I', name: 'Institutional Claim (UB-04)', direction: 'Outbound', description: 'Includes Type of Bill, Revenue Codes, and Occurrence Codes' }
          ],
          kpis: [
            { name: 'First-Pass Acceptance Rate', target: '> 98%', definition: 'Percentage of claims passing clearinghouse on first transmission.' },
            { name: 'Electronic Submission Rate', target: '> 99%', definition: 'Percentage of claims billed electronically rather than paper.' }
          ],
          denialRisks: [
            { code: 'Claim Not On File (CNOF)', reason: 'Claim sent from billing system but insurance has no record of receiving it', prevention: 'Check clearinghouse 277CA report for payer acknowledgement receipts.' },
            { code: 'CO-16', reason: 'Missing NPI, wrong Date of Service, or invalid diagnosis pointer', prevention: 'Automated claim scrubbers pre-flight validation.' }
          ],
          bestPractices: [
            'Claim Not On File ≠ Denial! The timely filing clock is still ticking every second.',
            'Confirm the correct 5-digit electronic Payer ID before transmitting batch.'
          ]
        },
        {
          id: 'node-stage9',
          title: 'Gate 9: Payment Posting & Remittance Reconciliation (835 ERA)',
          shortTitle: '9. Payment Posting',
          phase: 'back-end',
          stageNumber: 9,
          stageRoute: 'payment-posting',
          icon: '🏦',
          badge: 'GATE 9',
          summary: 'Auto-posting EDI 835 Remittance Advices, manual EOB posting, CAS write-offs, and patient responsibility balancing.',
          description: 'Reconciles incoming electronic funds transfers (EFT) or paper checks against patient accounts. Posts paid amounts, contractual adjustments (Group Code CO-45), patient cost-sharing (PR-1 Deductible, PR-2 Coinsurance, PR-3 Copay), and zero-pay denial codes to trigger immediate A/R follow-up.',
          operationalSteps: [
            'Download daily ANSI X12 EDI 835 Electronic Remittance Advice (ERA) files',
            'Match EFT trace numbers or physical check numbers against provider bank deposits',
            'Execute automated auto-posting algorithms to post allowed amounts and line-item payments',
            'Apply Claim Adjustment Group Codes (CO Contractual Obligation, PR Patient Responsibility, OA Other Adjustment, CR Correction/Reversal)',
            'Route zero-pay denials to A/R follow-up work queues'
          ],
          ediTransactions: [
            { code: '835', name: 'Electronic Remittance Advice', direction: 'Inbound', description: 'Contains CLP (Claim Level Payment) and CAS (Claim Adjustment Segment)' }
          ],
          kpis: [
            { name: 'Auto-Posting Rate', target: '> 90%', definition: 'Percentage of remittance advice dollars posted without human intervention.' },
            { name: 'Unapplied Cash Balance', target: '< 1% of Monthly Revenue', definition: 'Deposited funds not yet matched to open patient encounters.' }
          ],
          denialRisks: [
            { code: 'CO-45', reason: 'Contractual write-off (Difference between billed charge and contracted fee schedule)', prevention: 'Verify contract fee schedule and never balance-bill patient for CO-45 write-offs.' },
            { code: 'Zero-Pay Adjudication', reason: 'Claim denied 100% with no payment issued', prevention: 'Route immediately to Stage 10 A/R denial management.' }
          ],
          bestPractices: [
            'Math Rule: Billed Charge = Payer Paid Amount + Contractual Adjustment (CO-45) + Patient Responsibility (PR).',
            'Post payments within 24 hours of bank clearance to ensure accurate collection balances.'
          ]
        }
      ]
    },

    // =======================================================================
    // PHASE 4: A/R FOLLOW-UP & DENIAL MANAGEMENT
    // =======================================================================
    {
      id: 'phase-ar-recovery',
      title: 'Phase 4: Accounts Receivable (A/R) Follow-Up, Denial Management & Appeals',
      shortTitle: '4. A/R & Recovery',
      phase: 'ar-recovery',
      icon: '🔴',
      badge: 'GATE 10',
      summary: 'Managing aging claims, overturning denials, executing phone inquiries, filing formal appeals, and patient collections.',
      description: 'The pinnacle of revenue cycle recovery. Resolves unpaid claims across aging buckets (0–30, 31–60, 61–90, 91–120, 121+ Days), tracks claim status via EDI 276/277, executes professional payer phone inquiries using field-tested scripts, appeals unjust denials through the 5-level Medicare appeal ladder, and manages patient financial collections compliant with the No Surprises Act.',
      operationalSteps: [
        'Analyze accounts receivable aging reports by aging bucket and financial class',
        'Conduct electronic claim status inquiries (EDI 276/277) and payer portal searches',
        'Perform professional payer phone calls using NATO Phonetic Alphabet and standardized scripts',
        'Categorize denials by CARC / RARC root cause (Clinical, Technical, Eligibility, Timely Filing)',
        'Resubmit corrected claims (Claim Frequency Code 7) or file formal Level 1 Redetermination appeals',
        'Issue clear patient statements and offer interest-free payment plans for patient responsibility (PR)'
      ],
      ediTransactions: [
        { code: '276', name: 'Claim Status Request', direction: 'Outbound', description: 'Inquiry asking payer for adjudication state' },
        { code: '277', name: 'Claim Status Response', direction: 'Inbound', description: 'Returns claim receipt date, ICN, and pending status' }
      ],
      kpis: [
        { name: 'Days in A/R', target: '< 35.0 Days', definition: 'Average time from date of service to cash collection.' },
        { name: 'A/R Over 90 Days', target: '< 15.0%', definition: 'Percentage of total outstanding accounts receivable aged past 90 days.' },
        { name: 'Denial Overturn Rate', target: '> 75.0%', definition: 'Percentage of appealed claim denials successfully recovered.' },
        { name: 'Bad Debt Write-Off Rate', target: '< 1.5%', definition: 'Uncollectible accounts written off as bad debt divided by gross revenue.' }
      ],
      denialRisks: [
        { code: 'CO-29', reason: 'Timely Filing Limit Exceeded', prevention: 'Track claims by payer filing deadline (90–365 days) and appeal with certified EDI acceptance proof.' },
        { code: 'CO-18', reason: 'Duplicate Claim Submission', prevention: 'Determine if legitimate repeat service (append modifier 76/77) or accidental double billing (void second claim).' },
        { code: 'CO-22', reason: 'Coordination of Benefits (COB) Dispute', prevention: 'Verify primary payer order, obtain primary EOB, and bill secondary within timely filing.' }
      ],
      bestPractices: [
        'Always obtain Representative Full Name and Call Reference Number on every payer telephone inquiry.',
        'File Level 1 Medicare Redeterminations within 120 days of denial remit date on CMS Form 20027.',
        'Comply with federal No Surprises Act: never balance-bill emergency or out-of-network facility services without valid consent.'
      ],
      children: [
        {
          id: 'node-stage10-aging',
          title: 'A/R Aging Buckets & Portfolio Prioritization',
          shortTitle: 'A/R Aging Buckets',
          phase: 'ar-recovery',
          icon: '📊',
          badge: 'KPI ENGINE',
          summary: 'Stratifying unpaid claims into 0–30, 31–60, 61–90, 91–120, and 121+ day aging buckets.',
          description: 'Managing revenue velocity. Focuses collector efforts on high-dollar, high-risk claims approaching payer timely filing deadlines. Maintains healthy Days in A/R under 35 days and keeps A/R >90 days under 15% of total portfolio.',
          operationalSteps: [
            'Run weekly aging reports sorted by dollar value and timely filing expiration date',
            'Work claims in 31–60 day bucket before they age into high-risk 91+ day categories',
            'Identify systematic payer adjudication delays and escalate to provider relations',
            'Calculate practice Days in A/R: (Total A/R / Average Daily Gross Revenue)'
          ],
          ediTransactions: [
            { code: '276 / 277', name: 'Batch Claim Status', direction: 'Bi-directional', description: 'Automated claim tracking across aging buckets' }
          ],
          kpis: [
            { name: 'Days in A/R', target: '< 35 Days', definition: 'Average days outstanding.' },
            { name: 'A/R > 90 Days', target: '< 15%', definition: 'Percentage of total A/R aged past 90 days.' }
          ],
          denialRisks: [
            { code: 'Aging Exceeding TFL', reason: 'Claim ages past payer timely filing limit while sitting idle in aging queue', prevention: 'Weekly touch cadence on all claims unpaid at 30 days.' }
          ],
          bestPractices: [
            'Prioritize claims by: (1) Impending Timely Filing Deadline, (2) Dollar Amount, (3) Payer Volume.',
            'Automate 276/277 status queries at Day 14 and Day 28 post-submission.'
          ]
        },
        {
          id: 'node-stage10-denials',
          title: 'Denial Management & CARC / RARC Remediation',
          shortTitle: 'Denial Resolution',
          phase: 'ar-recovery',
          stageNumber: 10,
          stageRoute: 'ar-followup',
          icon: '📞',
          badge: 'GATE 10',
          summary: 'Root cause analysis of CARC / RARC codes, corrected claim resubmission (Freq 7), and appeal ladders.',
          description: 'Analyzing Claim Adjustment Reason Codes (CARC) and Remittance Advice Remark Codes (RARC). Resolves missing data (CO-16), duplicate claims (CO-18), coordination of benefits (CO-22), timely filing (CO-29), medical necessity (CO-50), and unbundling (CO-97). Uses the 5-level Medicare appeal process.',
          operationalSteps: [
            'Read 835 Remittance Advice for exact CARC and RARC combinations',
            'Determine correct recovery action: Correct & Resubmit (Freq 7) vs Formal Appeal vs Balance Bill Patient (PR)',
            'Prepare Level 1 Redetermination packet with medical records, operative notes, and cover letter',
            'Escalate unresolved clinical disputes to Level 2 Reconsideration (QIC) and Administrative Law Judge (ALJ)'
          ],
          ediTransactions: [
            { code: '837P / 837I (Freq 7)', name: 'Corrected Claim', direction: 'Outbound', description: 'Resubmission with original payer claim number (ICN)' }
          ],
          kpis: [
            { name: 'Denial Overturn Rate', target: '> 75%', definition: 'Percentage of denied claims successfully recovered on appeal.' },
            { name: 'First-Pass Denial Rate', target: '< 5%', definition: 'Percentage of claims denied upon initial adjudication.' }
          ],
          denialRisks: [
            { code: 'CO-16', reason: 'Missing info / data entry error', prevention: 'Correct specific missing field (NPI, DOB, ICD-10) and resubmit.' },
            { code: 'CO-18', reason: 'Duplicate claim submitted twice', prevention: 'Append repeat modifier 76/77 for legitimate repeat care; void second duplicate.' }
          ],
          bestPractices: [
            'Always submit corrected claims with Claim Frequency Code 7 and reference the original ICN in Box 22.',
            'Never copy-paste an original denied claim; correct the root cause before sending.'
          ]
        },
        {
          id: 'node-stage10-scripts',
          title: 'Payer Phone Verification & Call Scripts Masterclass',
          shortTitle: 'Phone Scripts & NATO',
          phase: 'ar-recovery',
          icon: '🎧',
          badge: 'CALL CENTER',
          summary: 'Professional call scripts: GPD Verification (Smriti), Short Version (John), Inpatient ER Auth (SAM_P), and NATO Alphabet.',
          description: 'Mastering telephone interactions with insurance companies. Utilizing the standard 26-letter NATO Phonetic Alphabet to eliminate member ID transcription errors. Executing verified scripts for Eligibility & Benefits, Urgent ER Inpatient Authorizations, and Claim Not On File investigations.',
          operationalSteps: [
            'Announce recorded line compliance and caller identity clearly',
            'Provide Provider NPI, Tax ID, Member ID, DOB, and DOS systematically',
            'Spell alphanumeric characters using standard NATO Phonetic Alphabet (A Alfa to Z Zulu)',
            'Capture mandatory 5 closing items: Rep Name, Operator ID, Call Ref #, Timely Filing Limit, Dedicated Fax #',
            'Document complete narrative note into patient billing ledger within 5 minutes of call'
          ],
          ediTransactions: [],
          kpis: [
            { name: 'Call Handle Time (AHT)', target: '4–6 Minutes', definition: 'Average elapsed time per payer phone inquiry.' },
            { name: 'Call Reference Capture Rate', target: '100%', definition: 'Percentage of logged calls with valid payer reference number.' }
          ],
          denialRisks: [
            { code: 'Unverified Phone Inquiries', reason: 'Lack of call reference number prevents proving payer promised payment during appeals', prevention: 'Never hang up without the official Call Reference Number.' }
          ],
          bestPractices: [
            'If rep says "Claim Not On File", verify Payer ID, check 277CA clearinghouse proof, and ask for intake fax #.',
            'For ER Inpatient Admissions, start auth notification within 24–48 hours using Haywood Regional protocol.'
          ]
        }
      ]
    }
  ]
};

