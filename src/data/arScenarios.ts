import { ArScenario, CarcRarcDetail } from '../types/rcm';

export const AR_SCENARIOS: ArScenario[] = [
  {
    id: 1,
    slug: 'cnof',
    title: '1. Claim Not on File (CNOF)',
    category: 'processing',
    definition: 'The insurance carrier reports having no electronic or physical record of the claim under the member’s ID, provider NPI, or date of service.',
    commonCauses: [
      'Incorrect electronic Payer ID entered at billing submission.',
      'Claim rejected at the clearinghouse level (front-end 277CA / 999 error) and never reached the payer.',
      'Paper claim lost in the mail or scanned to incorrect department.',
      'Wrong subscriber member ID or patient DOB submitted.'
    ],
    stepByStepWorkflow: [
      'Step 1: Check your Practice Management (PM) clearinghouse acceptance report (EDI 277CA). Verify the claim was accepted by the payer, not just the clearinghouse.',
      'Step 2: Verify the Payer ID. Large payers (e.g. UnitedHealthcare, Aetna) have multiple regional Payer IDs (commercial vs Medicare Advantage vs Medicaid HMO).',
      'Step 3: Call the payer rep and provide patient Name, Member ID, DOB, and DOS. If still CNOF, verify the correct claims submission mailing address, fax number, and electronic Payer ID.',
      'Step 4: Check payer’s Timely Filing Limit (TFL). If still within TFL, immediately retransmit electronically.',
      'Step 5: If past TFL, submit with Proof of Timely Filing (POTF) — including initial clearinghouse acceptance report and EDI trace batch report.'
    ],
    questionsForRep: [
      '"Can you please verify if there are any claims pending in suspense or unmapped under member ID [Member ID] for DOS [DOS]?"',
      '"What is the exact electronic Payer ID and physical claims mailing address on file for this patient’s benefit plan?"',
      '"What is the Timely Filing Limit (TFL) for this member’s policy from the date of service?"',
      '"Can I submit this claim via your secure provider web portal or dedicated claims fax number to expedite intake?"'
    ],
    proTips: [
      'Never accept "It’s not in our system, please refile" without checking your initial EDI 277CA acceptance timestamp!',
      'Always record the Call Reference Number and Rep Name to prove you called within the timely filing window.'
    ]
  },
  {
    id: 2,
    slug: 'member-not-eligible',
    title: '2. Member Not Eligible on DOS',
    category: 'eligibility',
    carcCode: 'CO-26 / PR-26',
    definition: 'The payer states the patient was not covered under the active policy on the specific Date of Service (DOS) billed.',
    commonCauses: [
      'Policy terminated before the DOS (e.g., job change, missed premium).',
      'Policy effective date starts after the DOS (retroactive enrollment delay).',
      'Patient presented an expired insurance card; new annual policy was issued under a different group or member ID.'
    ],
    stepByStepWorkflow: [
      'Step 1: Verify the effective and termination dates of coverage on the payer’s system with the representative.',
      'Step 2: Ask the rep if the member has another active policy or sub-group under the same carrier.',
      'Step 3: If coverage terminated: check PM system for alternate secondary insurance on file.',
      'Step 4: If no secondary coverage: reach out to patient to obtain new employer/commercial coverage details.',
      'Step 5: If patient was truly uninsured on DOS: transfer balance to Patient Responsibility (PR-26) and generate self-pay statement with prompt-pay discount options.'
    ],
    questionsForRep: [
      '"What are the exact effective and termination dates on record for this member ID?"',
      '"Does your system reflect any newly activated or replacement policy ID for this subscriber?"',
      '"What was the reason for termination (e.g., non-payment of premium, termination of employment)?"'
    ],
    proTips: [
      'Under the ACA, check if the patient is in a 90-day grace period where coverage may be reactivated once delinquent premium is settled.'
    ]
  },
  {
    id: 3,
    slug: 'claim-in-process',
    title: '3. Claim in Process / Pending',
    category: 'processing',
    definition: 'The claim was received by the insurance carrier and is currently undergoing clinical review, pricing, or system adjudication.',
    commonCauses: [
      'Normal electronic adjudication cycle (14–30 days).',
      'Payer flagged claim for internal medical record audit, high-dollar review, or coordination of benefits check.',
      'System backlog or claims re-platforming migration at the payer end.'
    ],
    stepByStepWorkflow: [
      'Step 1: Ask the representative for the exact Claim Receipt Date and the unique Claim Number / ICN (Internal Control Number).',
      'Step 2: Ask why the claim is pending: Is it in standard processing, or is it suspended awaiting medical documentation / patient questionnaire?',
      'Step 3: Inquire about the payer’s standard Turnaround Time (TAT) for this claim type.',
      'Step 4: If pending past normal TAT (e.g., > 30–45 days): request a supervisory escalation or priority re-queue.',
      'Step 5: Document next follow-up date (TAT date + 2 days) in the PM system.'
    ],
    questionsForRep: [
      '"What is the exact receipt date and assigned Claim / ICN Number in your system?"',
      '"Is the claim pending for any documentation from the provider, patient, or primary payer?"',
      '"What is your standard Turnaround Time (TAT) to finalize adjudication for this claim?"',
      '"Since this claim has been pending past the standard [30-day] window, can you please initiate an escalation ticket?"'
    ],
    proTips: [
      'Never hang up without the ICN/Claim Number; without it, future callers cannot track the exact adjudicative queue!'
    ]
  },
  {
    id: 4,
    slug: 'claim-paid-not-posted',
    title: '4. Claim is Paid (Payment Not Posted)',
    category: 'processing',
    definition: 'The payer representative confirms the claim was processed and paid, but the payment is not visible in the provider’s practice management system or bank account.',
    commonCauses: [
      'Paper check mailed to incorrect lockbox or old billing address.',
      'EFT (Electronic Funds Transfer) deposited into provider bank but 835 ERA failed to auto-post due to clearinghouse mismatch.',
      'Paper check was received but lost/misplaced before manual bank deposit.',
      'Check was returned to payer as undeliverable.'
    ],
    stepByStepWorkflow: [
      'Step 1: Obtain the Processed Date, Check/EFT Number, Payment Date, Total Check Amount, and Patient Responsibility (PR) breakdown.',
      'Step 2: Verify the exact payee name and physical mailing address (or banking ACH trace number) where payment was dispatched.',
      'Step 3: Check whether the check has been cashed (cleared) or remains outstanding.',
      'Step 4: If check is uncashed and older than 25–30 days: request a Stop Payment and Reissue to the updated billing address.',
      'Step 5: Request the EOB/remittance advice to be faxed or securely re-sent to the billing office.'
    ],
    questionsForRep: [
      '"What was the paid amount, allowed amount, and patient responsibility on this claim?"',
      '"Was payment issued via paper check or electronic EFT? What is the check/trace number and issue date?"',
      '"What is the exact mailing address where the paper check was routed?"',
      '"Has this check cleared your bank? If not, can we initiate a stop payment and reissue today?"',
      '"Can you please fax or portal-push a copy of the Explanation of Benefits (EOB) right now?"'
    ],
    proTips: [
      'Bulk checks: Many payers bundle dozens of patients into one single $15,000 bulk check. Ask for the "Bulk Check Total" so your accounting team can easily locate the bank deposit.'
    ]
  },
  {
    id: 5,
    slug: 'duplicate-claim-co18',
    title: '5. Duplicate Claim / Already Paid (CO-18)',
    category: 'denial',
    carcCode: 'CO-18',
    rarcCode: 'M86',
    definition: 'CARC CO-18: "Exact duplicate claim/service". The payer’s processing system flags the claim as identical to a previously processed claim for the same patient, provider, DOS, and CPT.',
    commonCauses: [
      'Staff rebilled a claim without checking whether the initial claim was already paid or in process.',
      'A repeat procedure (e.g. repeat EKG or second pathology specimen) was billed on the same day without appending Modifier 76, 77, 59, or 91.',
      'System automated auto-resubmission batch script sent duplicate EDI files.'
    ],
    stepByStepWorkflow: [
      'Step 1: Ask the rep for the Original Claim Number / ICN and the date the original claim was adjudicated.',
      'Step 2: Check the payment status of the original claim: Did the original claim pay, or did it deny?',
      'Step 3: If original claim was already paid: cross-verify if payment was posted. If so, write off the duplicate charge.',
      'Step 4: If the service was a true repeat clinical procedure (e.g. 2nd X-ray): send to certified coder to append Modifier 76/77/59 and resubmit as a corrected claim (Box 22 = 7).'
    ],
    questionsForRep: [
      '"Can you provide the original claim number (ICN) and adjudication date for the claim that this is duplicating?"',
      '"How was that original claim processed (paid amount, patient responsibility, or denial code)?"',
      '"If this was a separate procedure on the same day, what modifier does your plan require to differentiate the service?"'
    ],
    proTips: [
      'Never send a claim twice without changing something (e.g., corrected claim indicator or modifier); identical submissions always trigger CO-18.'
    ]
  },
  {
    id: 6,
    slug: 'untimely-filing-co29',
    title: '6. Untimely Filing (CO-29)',
    category: 'denial',
    carcCode: 'CO-29',
    rarcCode: 'M144',
    definition: 'CARC CO-29: "Time limit for filing has expired". The claim was received by the payer after the contractual Timely Filing Limit (TFL).',
    commonCauses: [
      'Billing delay at the provider office exceeding payer’s filing deadline (e.g., 90 days, 180 days, 365 days).',
      'Claim was initially sent to wrong payer, and by the time correct payer received it, TFL had passed.',
      'Clearinghouse rejected the claim initially, and nobody corrected the front-end edit before the deadline.'
    ],
    stepByStepWorkflow: [
      'Step 1: Ask the representative for the exact Timely Filing Limit for this provider contract and patient plan.',
      'Step 2: Check your clearinghouse archive for Proof of Timely Filing (POTF) — specifically the EDI 999 Functional Acknowledgment and 277CA Claim Acceptance report.',
      'Step 3: If initial submission was within TFL: prepare a formal First-Level Timely Filing Appeal attaching the initial EDI 277CA acceptance receipt, showing Payer ID, Member ID, DOS, and timestamp.',
      'Step 4: If secondary claim: calculate secondary TFL from the date of the Primary EOB (often 90 days from primary payment).',
      'Step 5: If the claim was genuinely billed late due to provider negligence: write off the balance (CO-29). In-network providers CANNOT bill CO-29 to the patient!'
    ],
    questionsForRep: [
      '"What is the contractual timely filing limit for this provider and plan (90, 180, or 365 days)?"',
      '"What acceptable Proof of Timely Filing (POTF) does your appeals committee require (EDI 277CA, clearinghouse report, certified mail slip)?"',
      '"What is the dedicated fax number or portal link for submitting timely filing reconsideration appeals?"'
    ],
    proTips: [
      'Medicare Part B TFL is 1 calendar year (365 days) from DOS. Commercial payers range from 90 days (UHC, Aetna commercial) to 180 days (BCBS).'
    ]
  },
  {
    id: 7,
    slug: 'services-not-covered-co96',
    title: '7. Services Not Covered (CO-96)',
    category: 'denial',
    carcCode: 'CO-96',
    rarcCode: 'N115 / N386',
    definition: 'CARC CO-96: "Non-covered charge(s)". The specific medical service, supply, or procedure is explicitly excluded from the member’s plan benefits.',
    commonCauses: [
      'Elective, cosmetic, or experimental procedures (e.g., cosmetic mole removal, acupuncture, experimental biologics).',
      'Routine vision/dental billed to medical insurance.',
      'Service is non-covered under the provider’s specific specialty taxonomy.'
    ],
    stepByStepWorkflow: [
      'Step 1: Ask the rep whether the service is non-covered under the member’s benefit plan OR non-covered for this provider’s specialty.',
      'Step 2: Check if the patient signed a valid Advance Beneficiary Notice (ABN for Medicare) or Waiver of Liability (WOL for commercial).',
      'Step 3: If signed ABN/WOL is on file: change adjustment from CO (Contractual Obligation) to PR (Patient Responsibility) and bill the patient.',
      'Step 4: If no advance waiver was signed and provider is in-network: the balance must be adjusted off per contract.'
    ],
    questionsForRep: [
      '"Why is this CPT code considered non-covered under this policy (plan exclusion vs medical policy)?"',
      '"Is this service covered under a separate rider or carve-out (e.g., behavioral health or vision vendor)?"',
      '"Is the patient responsible for this non-covered service, or is it a provider contractual write-off?"'
    ],
    proTips: [
      'Always obtain signed ABN/WOL before rendering services that carry frequent coverage exclusions.'
    ]
  },
  {
    id: 8,
    slug: 'maximum-benefit-met-co119',
    title: '8. Maximum Benefit Met / Reached (CO-119)',
    category: 'denial',
    carcCode: 'CO-119',
    rarcCode: 'N362 / M53',
    definition: 'CARC CO-119: "Benefit maximum for this time period or occurrence has been reached". The patient exhausted their annual dollar cap or visit limit for this benefit category.',
    commonCauses: [
      'Physical therapy, chiropractic, or occupational therapy exceeded annual visit limit (e.g. 20 visits/year).',
      'DME (Durable Medical Equipment) reached maximum dollar or rental allowance.',
      'Dental or mental health annual maximum payout reached.'
    ],
    stepByStepWorkflow: [
      'Step 1: Ask the rep what the maximum benefit is (number of visits or total dollar cap) and how many units were utilized prior to this DOS.',
      'Step 2: Obtain the exact date on which the benefit was exhausted.',
      'Step 3: Check if patient has a secondary insurance plan that provides supplementary rehabilitation or therapy benefits.',
      'Step 4: If no secondary coverage: bill the remaining balance to the patient with copy of the EOB, as maximum benefit exhaustion is valid Patient Responsibility.'
    ],
    questionsForRep: [
      '"What is the plan’s annual benefit limit for this specific service (dollar amount or visit count)?"',
      '"On what date and under which claim number was the annual benefit maximum reached?"',
      '"Does the plan allow an exception appeal based on demonstrated medical necessity?"'
    ],
    proTips: [
      'Therapy clinics must track visit counts at every check-in to warn patients before they hit their 20th visit cap!'
    ]
  },
  {
    id: 9,
    slug: 'invalid-pre-auth-co197',
    title: '9. Invalid / No Pre-Authorization (CO-197)',
    category: 'denial',
    carcCode: 'CO-197',
    rarcCode: 'M62 / N54',
    definition: 'CARC CO-197: "Precertification/authorization/notification/pre-treatment absent or exceeded". Service required prior approval from the insurance carrier which was either not obtained or exceeded.',
    commonCauses: [
      'Provider rendered surgery, MRI, or specialty infusion without contacting Utilization Review.',
      'Prior auth was obtained for 2 visits, but provider billed 4 visits (auth exceeded).',
      'Prior auth number was obtained, but billing staff forgot to enter it in CMS-1500 Box 23!',
      'Service was performed outside the authorized date span.'
    ],
    stepByStepWorkflow: [
      'Step 1: Check patient chart: Was an authorization number actually obtained prior to service? If YES: check CMS-1500 Box 23. If omitted on claim, resubmit as a corrected claim with auth number.',
      'Step 2: If auth was obtained, compare the authorized CPT code vs billed CPT code. If surgeon altered procedure mid-operation, contact authorization department to update authorization.',
      'Step 3: If no auth was obtained: ask rep if the plan permits a Retro-Authorization (typically within a 72-hour window for emergency admissions or extenuating circumstances).',
      'Step 4: If retro-auth is denied: file a medical necessity appeal including complete operative report and letter of medical necessity.',
      'Step 5: If in-network and auth was neglected without emergency basis: provider must write off (CO-197); balance cannot be billed to the patient.'
    ],
    questionsForRep: [
      '"Can you check if there is an authorization on file for this patient and date of service under an inpatient or referring provider number?"',
      '"Does this payer accept retrospective authorizations (retro-auth), and what is the submission deadline?"',
      '"What is the appeal process for claims denied for authorization when clinical emergency prevented advance notification?"'
    ],
    proTips: [
      'For inpatient surgeries: Check if the hospital facility obtained an authorization. In many cases, the facility auth also covers the rendering surgeon; ask the payer to link the surgeon claim to the facility auth!'
    ]
  },
  {
    id: 10,
    slug: 'denied-for-cob-co22',
    title: '10. Denied for COB / Primary Payer (CO-22)',
    category: 'coordination',
    carcCode: 'CO-22 / PR-22',
    definition: 'CARC CO-22: "This care may be covered by another payer per coordination of benefits". The payer believes another insurance policy is primary.',
    commonCauses: [
      'Payer’s annual COB update is overdue (insurers require members to verify secondary coverage every 12 months).',
      'Patient has dual coverage (e.g. Medicare + Commercial Employer Group Health Plan).',
      'Payer suspects auto accident, slip-and-fall, or Workers’ Compensation based on diagnosis codes.'
    ],
    stepByStepWorkflow: [
      'Step 1: Ask the rep which insurance carrier their system shows as primary, along with effective dates.',
      'Step 2: Ask if the denial is due to an unreturned annual COB questionnaire from the member.',
      'Step 3: If member questionnaire pending: contact the patient immediately. Instruct them to call the member services number on their insurance card to complete their COB verification.',
      'Step 4: If provider already billed the primary: obtain the Primary EOB and submit secondary claim with primary remittance attached.',
      'Step 5: Three-Questionnaire Rule: In many provider contracts, if the clinic documents 3 written attempts to obtain COB info from the patient over 30 days without response, the balance may be shifted to patient responsibility.'
    ],
    questionsForRep: [
      '"Which payer or policy does your coordination of benefits system show as primary for this DOS?"',
      '"Is this claim denied because the member needs to update their annual COB questionnaire?"',
      '"Once the member calls to update their COB records, will this claim be reprocessed automatically, or must we call back?"'
    ],
    proTips: [
      'COB denials can only be resolved by the patient calling their insurance company! The AR caller cannot update member COB on behalf of the subscriber.'
    ]
  },
  {
    id: 11,
    slug: 'denied-medical-records',
    title: '11. Denied / Pending for Medical Records',
    category: 'processing',
    carcCode: 'CO-16 / CO-252',
    rarcCode: 'N29 / M127',
    definition: 'The payer paused adjudication or denied the claim pending review of clinical documentation (operative note, progress notes, pathology report, or nursing charts).',
    commonCauses: [
      'High-dollar surgical procedure or unlisted procedure code (e.g., CPT 29999).',
      'Billed with Modifier 25 or 59, prompting audit verification of separate service.',
      'Payer clinical review for experimental/investigational treatments.'
    ],
    stepByStepWorkflow: [
      'Step 1: Ask rep for the exact clinical documents requested (e.g., operative report, anesthesia record, office progress notes, pathology report).',
      'Step 2: Ask for the designated medical records submission fax number, mailing address, or secure portal upload link.',
      'Step 3: Obtain the unique Case Reference Number or Barcoded Cover Sheet required to route the records to the review nurse.',
      'Step 4: Coordinate with HIM/medical records department to send the requested records within the payer’s deadline (usually 30–45 days).',
      'Step 5: Follow up 7–10 days after faxing to confirm receipt.'
    ],
    questionsForRep: [
      '"What specific clinical records are required (e.g. operative report, doctor clinical notes, lab results)?"',
      '"What is the dedicated fax number, attention-to department, or barcoded cover sheet needed for submission?"',
      '"What is the deadline to submit these records before the claim is permanently denied?"'
    ],
    proTips: [
      'Always write the Claim Number / ICN boldly across the top of EVERY page of clinical records before faxing.'
    ]
  },
  {
    id: 12,
    slug: 'denied-additional-info-co16',
    title: '12. Denied for Additional Information (CO-16)',
    category: 'denial',
    carcCode: 'CO-16',
    rarcCode: 'M51 / N382 / MA120',
    definition: 'CARC CO-16: "Claim/service lacks information or has submission/billing error(s) which is needed for adjudication". Accompanied by specific RARC codes.',
    commonCauses: [
      'Missing or invalid CLIA number in Box 23 (RARC MA120).',
      'Missing NDC 11-digit code or unit qualifier for injectable drug J-codes (RARC N382).',
      'Missing or invalid Referring/Ordering Provider NPI in Box 17B.',
      'Accident questionnaire required from member.'
    ],
    stepByStepWorkflow: [
      'Step 1: Check the accompanying Remittance Advice Remark Code (RARC). The RARC tells you the exact missing piece of information.',
      'Step 2: Determine if information is needed from the PROVIDER (e.g., CLIA, NDC, NPI, Tax ID) vs from the PATIENT (e.g., accident details, third-party liability questionnaire).',
      'Step 3: If provider error: correct the data in the PM system and resubmit as a corrected claim (Box 22 = 7).',
      'Step 4: If patient info needed: contact patient to supply information to the payer.',
      'Step 5: Once submitted, follow up in 14 days.'
    ],
    questionsForRep: [
      '"What specific Remark Code (RARC) is attached to this CO-16 denial?"',
      '"Is the missing information required from the medical provider or the patient?"',
      '"Can I provide the missing information verbally over the phone right now to reprocess the claim?"'
    ],
    proTips: [
      'Many minor CO-16 denials (e.g. CLIA number or referring NPI) can be reprocessed over the phone by a representative without waiting weeks for an appeal!'
    ]
  },
  {
    id: 13,
    slug: 'inclusive-bundled-co97',
    title: '13. Inclusive, Bundled, or Mutually Exclusive (CO-97)',
    category: 'denial',
    carcCode: 'CO-97',
    rarcCode: 'M15 / N20',
    definition: 'CARC CO-97: "The benefit for this service is included in the payment/allowance for another service/procedure that has already been adjudicated".',
    commonCauses: [
      'CMS NCCI (National Correct Coding Initiative) Procedure-to-Procedure (PTP) edit.',
      'Surgical dressing or local anesthesia billed alongside primary surgery.',
      'Multiple scopes billed during same endoscopy session without distinct modifier.'
    ],
    stepByStepWorkflow: [
      'Step 1: Identify the primary CPT code into which this denied code was bundled.',
      'Step 2: Verify whether the primary CPT was paid. If primary was denied, this code must be reconsidered.',
      'Step 3: Check CMS NCCI PTP edit tables: Does the edit pair carry modifier indicator "1" (unbundling allowed with clinical documentation)?',
      'Step 4: If indicator is "1" and clinical documentation proves separate site or encounter: send to coding to append Modifier 59 or XS/XE/XU and submit corrected claim.',
      'Step 5: If indicator is "0" or service was truly integral: write off the balance (CO-97); provider cannot bill the patient.'
    ],
    questionsForRep: [
      '"Which specific paid CPT code was this service bundled into?"',
      '"Does this payer follow CMS NCCI edits or proprietary commercial bundling rules?"',
      '"Will you reconsider this service if we submit medical records showing a separate anatomical site?"'
    ],
    proTips: [
      'Never blindly write off CO-97 on high-dollar surgical codes without consulting a certified medical coder for modifier unbundling eligibility.'
    ]
  },
  {
    id: 14,
    slug: 'primary-paid-more-than-secondary',
    title: '14. Primary Paid More Than Secondary Allowed Amount',
    category: 'coordination',
    carcCode: 'CO-45 / OA-23',
    definition: 'The primary insurance paid an amount that equals or exceeds the secondary insurance carrier’s contracted allowable fee schedule.',
    commonCauses: [
      'Primary commercial plan has a generous fee schedule ($250 allowed & paid), while secondary Medicaid or low-tier plan has an allowable rate of $120.',
      'Standard coordination rules dictate secondary payer pays only up to their contracted allowable fee.'
    ],
    stepByStepWorkflow: [
      'Step 1: Review Primary EOB and Secondary EOB side-by-side.',
      'Step 2: Verify the Secondary Allowed Amount. If Primary Paid ($200) >= Secondary Allowed ($150), Secondary payment is correctly $0.',
      'Step 3: Ensure patient responsibility from the primary plan (e.g. PR-2 coinsurance of $40) is addressed.',
      'Step 4: Under contractual agreements, if secondary payer writes off the balance, the provider must adjust the remaining balance to $0.',
      'Step 5: Never balance bill Medicaid secondary patients; balance billing Medicaid recipients is illegal under federal and state law!'
    ],
    questionsForRep: [
      '"What is your plan’s maximum allowable fee for this CPT code?"',
      '"Since primary payment exceeded your allowable rate, does your EOB indicate any remaining patient liability, or is the balance contractual write-off?"'
    ],
    proTips: [
      'When billing secondary claims, always send the primary 835 ERA remittance data (EDI Loop 2320/2430) so secondary systems adjudicate automatically.'
    ]
  }
];

export const CARC_RARC_DICTIONARY: CarcRarcDetail[] = [
  {
    code: 'CO-16',
    type: 'CARC',
    name: 'Claim Lacks Information / Billing Error',
    description: 'Claim lacks information or has submission/billing error(s) needed for adjudication.',
    associatedCodes: ['RARC M51 (Missing/incomplete procedure codes)', 'RARC N29 (Missing/incomplete documentation)', 'RARC N382 (Missing/invalid NDC code)', 'RARC MA120 (Missing/invalid CLIA number)'],
    rootCause: 'Omission of required identifiers, NDC numbers, CLIA IDs, or clinical notes.',
    resolutionStrategy: 'Identify the attached RARC code, rectify the missing data element in your PM system, and resubmit as a corrected claim (Box 22 = 7).'
  },
  {
    code: 'CO-18',
    type: 'CARC',
    name: 'Exact Duplicate Claim / Service',
    description: 'The service is identical to a previously submitted and adjudicated claim.',
    associatedCodes: ['RARC M86 (Service already adjudicated under another claim)'],
    rootCause: 'Rebilling without tracking initial claim, or repeat same-day clinical service billed without Modifiers 76, 77, 59, or 91.',
    resolutionStrategy: 'Verify original claim status. If truly duplicate, adjust off. If distinct repeat clinical service, append Modifier 76/77 and submit with clinical notes.'
  },
  {
    code: 'CO-22',
    type: 'CARC',
    name: 'Coordination of Benefits (COB) Required',
    description: 'This care may be covered by another payer per coordination of benefits.',
    associatedCodes: ['RARC MA01 (Missing primary payer EOB)', 'RARC N89 (Member COB questionnaire required)'],
    rootCause: 'Dual coverage, outdated coordination questionnaire, or suspected auto/work comp liability.',
    resolutionStrategy: 'Instruct patient to call carrier member services to update COB records. If secondary claim, submit with Primary EOB attached.'
  },
  {
    code: 'CO-29',
    type: 'CARC',
    name: 'Timely Filing Limit Expired',
    description: 'The time limit for filing has expired.',
    associatedCodes: ['RARC M144 (Pre-op or billing timeframe exceeded)'],
    rootCause: 'Claim billed after the contractual filing deadline (90 days, 180 days, or 365 days).',
    resolutionStrategy: 'Locate initial clearinghouse EDI 277CA acceptance receipt. File a formal Proof of Timely Filing (POTF) appeal. If genuinely late, write off per contract.'
  },
  {
    code: 'CO-45',
    type: 'CARC',
    name: 'Charge Exceeds Fee Schedule (Contractual Adjustment)',
    description: 'Charge exceeds fee schedule / maximum allowable amount per participating provider agreement.',
    associatedCodes: ['RARC N20 (Service not payable per fee schedule)', 'RARC M15 (Separately billed service not allowed)'],
    rootCause: 'Difference between gross billed provider charge and contracted allowable fee.',
    resolutionStrategy: 'Mandatory contractual write-off. In-network providers CANNOT balance bill this to the patient.'
  },
  {
    code: 'CO-50',
    type: 'CARC',
    name: 'These are Non-Covered Services Because This is Not Deemed a "Medical Necessity"',
    description: 'Claim denied for lack of clinical medical necessity according to LCD/NCD coverage policies.',
    associatedCodes: ['RARC M40 (Diagnosis does not support procedure)', 'RARC N115 (Procedure not covered under medical policy)'],
    rootCause: 'Billed ICD-10 diagnosis code is not on the payer’s covered diagnosis list for this CPT code.',
    resolutionStrategy: 'Review medical records to verify if other diagnosed conditions were addressed. Submit redetermination appeal with operative notes and physician letter.'
  },
  {
    code: 'CO-96',
    type: 'CARC',
    name: 'Non-Covered Charge(s)',
    description: 'The medical service, supply, or procedure is explicitly excluded from plan benefits.',
    associatedCodes: ['RARC N115 (Service not covered)', 'RARC N386 (Excluded under contract rider)'],
    rootCause: 'Elective, cosmetic, or experimental procedures, or missing coverage rider.',
    resolutionStrategy: 'Check for signed ABN or Waiver of Liability. If signed on file, shift to PR. If in-network without waiver, write off.'
  },
  {
    code: 'CO-97',
    type: 'CARC',
    name: 'Benefit Included in Another Service (Bundled / Inclusive)',
    description: 'The benefit for this service is included in the payment/allowance for another service already adjudicated.',
    associatedCodes: ['RARC M15 (Included in primary service fee)', 'RARC N20 (Payment bundled)'],
    rootCause: 'CMS NCCI Procedure-to-Procedure (PTP) edits, surgical dressing, or component bundling.',
    resolutionStrategy: 'Consult NCCI edit tables. If modifier indicator is 1 and documentation supports distinct anatomical site, append Modifier 59 or XS/XE/XU.'
  },
  {
    code: 'CO-119',
    type: 'CARC',
    name: 'Benefit Maximum Reached',
    description: 'Benefit maximum for this time period or occurrence has been reached.',
    associatedCodes: ['RARC N362 (Number of days/units exceeds maximum)', 'RARC M53 (Annual dollar limit reached)'],
    rootCause: 'Patient exceeded visit limits (e.g. 20 PT visits) or maximum annual dollar allotment.',
    resolutionStrategy: 'Verify exhausted units. Bill secondary insurance if available. Otherwise, shift balance to patient responsibility with copy of EOB.'
  },
  {
    code: 'CO-197',
    type: 'CARC',
    name: 'Precertification / Prior Authorization Absent or Exceeded',
    description: 'Precertification/authorization/notification/pre-treatment absent or exceeded.',
    associatedCodes: ['RARC M62 (Missing authorization)', 'RARC N54 (Authorization date or visit count exceeded)'],
    rootCause: 'Service rendered without required prior approval from payer Utilization Review.',
    resolutionStrategy: 'Check if auth exists on hospital file; request retro-auth within 72 hours; appeal based on emergency medical necessity. If neglected, write off.'
  }
];

export const FOUR_TIER_APPEAL_PROCESS = [
  {
    tier: 'Tier 1: First-Level Written Appeal / Reconsideration',
    timeline: '30 to 180 days from initial EOB denial date',
    target: 'Payer Claims Reconsideration Department',
    description: 'Formal written appeal letter with claim copy, initial EOB, Proof of Timely Filing, or clinical notes proving medical necessity and coding accuracy.'
  },
  {
    tier: 'Tier 2: Second-Level Formal Grievance / Administrative Appeal',
    timeline: '30 to 60 days following Tier 1 denial',
    target: 'Payer Appeals Committee / Chief Medical Reviewer',
    description: 'Comprehensive evidentiary package submitted to an independent clinical review panel within the insurance organization not involved in the initial denial.'
  },
  {
    tier: 'Tier 3: Peer-to-Peer Review (Provider to Medical Director)',
    timeline: 'Usually within 14–30 days of denial (varies by payer)',
    target: 'Insurance Medical Director (same specialty physician)',
    description: 'A direct phone discussion between the treating physician and the insurance company’s Medical Director to defend clinical necessity and overturn the denial on the spot.'
  },
  {
    tier: 'Tier 4: External Independent Review Organization (IRO)',
    timeline: 'Within 4 months of final adverse internal determination',
    target: 'State Insurance Commissioner / CMS / Independent Medical Reviewer',
    description: 'Binding external determination by an unbiased third-party clinical panel governed by state Department of Insurance (DOI) or federal ERISA/CMS guidelines.'
  }
];
