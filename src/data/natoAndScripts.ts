export interface NatoLetter {
  letter: string;
  word: string;
  phonetic: string;
  tip: string;
}

export const NATO_ALPHABET: NatoLetter[] = [
  { letter: 'A', word: 'Alfa', phonetic: 'AL-FAH', tip: 'Like "Alpha"' },
  { letter: 'B', word: 'Bravo', phonetic: 'BRAH-VOH', tip: 'Avoid confusing with "D" (Delta)' },
  { letter: 'C', word: 'Charlie', phonetic: 'CHAR-LEE', tip: 'Clear "Ch" sound' },
  { letter: 'D', word: 'Delta', phonetic: 'DELL-TAH', tip: 'Avoid confusing with "B" (Bravo)' },
  { letter: 'E', word: 'Echo', phonetic: 'ECK-OH', tip: 'Short "E"' },
  { letter: 'F', word: 'Foxtrot', phonetic: 'FOKS-TROT', tip: 'Avoid confusing with "S" (Sierra)' },
  { letter: 'G', word: 'Golf', phonetic: 'GOLF', tip: 'Avoid confusing with "J" (Juliett)' },
  { letter: 'H', word: 'Hotel', phonetic: 'HOH-TELL', tip: 'Emphasize "H"' },
  { letter: 'I', word: 'India', phonetic: 'IN-DEE-AH', tip: 'Clear short "I"' },
  { letter: 'J', word: 'Juliett', phonetic: 'JEW-LEE-ETT', tip: 'Spelled with double "t"' },
  { letter: 'K', word: 'Kilo', phonetic: 'KEY-LOH', tip: 'Crisp "K"' },
  { letter: 'L', word: 'Lima', phonetic: 'LEE-MAH', tip: 'Like the city' },
  { letter: 'M', word: 'Mike', phonetic: 'MIKE', tip: 'Never say "Mary"; always say "Mike"' },
  { letter: 'N', word: 'November', phonetic: 'NO-VEM-BER', tip: 'Never say "Nancy"; always say "November"' },
  { letter: 'O', word: 'Oscar', phonetic: 'OSS-CAH', tip: 'Crisp "O"' },
  { letter: 'P', word: 'Papa', phonetic: 'PAH-PAH', tip: 'Avoid confusing with "B"' },
  { letter: 'Q', word: 'Quebec', phonetic: 'KEH-BECK', tip: 'Clear "Q" sound' },
  { letter: 'R', word: 'Romeo', phonetic: 'ROH-ME-OH', tip: 'Roll the "R"' },
  { letter: 'S', word: 'Sierra', phonetic: 'SEE-AIR-RAH', tip: 'Avoid confusing with "F"' },
  { letter: 'T', word: 'Tango', phonetic: 'TANG-GO', tip: 'Crisp "T"' },
  { letter: 'U', word: 'Uniform', phonetic: 'YOU-NEE-FORM', tip: 'Clear "U"' },
  { letter: 'V', word: 'Victor', phonetic: 'VIK-TAH', tip: 'Avoid confusing with "B"' },
  { letter: 'W', word: 'Whiskey', phonetic: 'WISS-KEY', tip: 'Clear "Wh"' },
  { letter: 'X', word: 'X-ray', phonetic: 'ECKS-RAY', tip: 'Sharp "X"' },
  { letter: 'Y', word: 'Yankee', phonetic: 'YANG-KEY', tip: 'Clear "Y"' },
  { letter: 'Z', word: 'Zulu', phonetic: 'ZOO-LOO', tip: 'Never say "Zebra"; always say "Zulu"' }
];

export const NUMBER_PHONETICS: Record<string, string> = {
  '0': 'Zero',
  '1': 'One',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine'
};

export interface ScriptSection {
  title: string;
  icon: string;
  callerDialogue: string;
  repExpectedDialogue: string;
  notes: string;
}

export interface CallScriptTemplate {
  id: string;
  name: string;
  duration: string;
  targetObjective: string;
  sections: ScriptSection[];
}

export const CALL_SCRIPTS: CallScriptTemplate[] = [
  {
    id: 'gpd-full',
    name: 'Full GPD Eligibility & Benefits Verification Script',
    duration: '6 – 8 Minutes',
    targetObjective: 'Comprehensive verification of patient policy status, cost-sharing amounts, prior authorization requirements, and billing details.',
    sections: [
      {
        title: '1. Opening & QA Disclosure',
        icon: 'PhoneCall',
        callerDialogue: '"Hello, good morning! My name is [Caller Name] calling from [Provider Name] on a recorded line. I am calling to verify eligibility and benefits for one of your members. How are you doing today?"',
        repExpectedDialogue: '"I’m doing well, thank you. I can help you with that. Can I please have your provider NPI and Tax ID?"',
        notes: 'Always state your full name and provider name clearly. Acknowledge the recorded line for legal compliance.'
      },
      {
        title: '2. Provider Authentication',
        icon: 'ShieldCheck',
        callerDialogue: '"Certainly. Our Billing NPI is [Billing NPI], Tax ID is [Tax ID], and our practice address is [Provider Address]. The rendering physician is Dr. [Rendering Doctor Name] with NPI [Rendering NPI]."',
        repExpectedDialogue: '"Thank you, doctor is active in our system. And who is the member you are calling about?"',
        notes: 'Have Box 33 NPI and Box 25 Tax ID ready before placing the call.'
      },
      {
        title: '3. Patient Demographics & Eligibility Status',
        icon: 'UserCheck',
        callerDialogue: '"The patient’s name is [Patient First Name] [Patient Last Name], spelled [Patient Name Phonetic]. Date of birth is [Patient DOB], and the Member ID is [Member ID Phonetic]. Can you please confirm if this policy is currently active?"',
        repExpectedDialogue: '"Yes, the policy is active with an effective date of 01/01/2025. There is no termination date on file."',
        notes: 'Read member IDs using NATO phonetic alphabet to prevent single-character transpositions.'
      },
      {
        title: '4. Plan Type, Network & Gatekeeper (PCP/IPA)',
        icon: 'Layers',
        callerDialogue: '"Thank you. What is the specific plan type—is it an HMO, PPO, EPO, or POS? Is Dr. [Rendering Doctor Name] considered in-network or out-of-network? Does this plan require a PCP assignment or referral to see a specialist?"',
        repExpectedDialogue: '"This is a Commercial PPO plan. Dr. [Rendering Doctor Name] is in-network. No PCP assignment or referrals are required to see specialists."',
        notes: 'If HMO, verify if care is delegated to an Independent Physician Association (IPA).'
      },
      {
        title: '5. Cost-Sharing: Deductible, Coinsurance & Copay',
        icon: 'DollarSign',
        callerDialogue: '"Can you provide the cost-sharing details for outpatient office visits? What is the individual annual deductible, how much has been satisfied to date, and does this plan operate on a calendar year or plan year basis?"',
        repExpectedDialogue: '"The individual deductible is $1,500 calendar-year. To date, $350 has been satisfied. After the deductible, coinsurance is 80/20. The primary care copay is $25 and specialist copay is $50."',
        notes: 'Ask for both individual AND family deductible/OOP max thresholds.'
      },
      {
        title: '6. Out-of-Pocket Maximum & Authorization Rules',
        icon: 'CheckCircle2',
        callerDialogue: '"What is the annual Out-of-Pocket Maximum, and does the deductible count towards it? Also, does CPT [Procedure Code] require Prior Authorization or Pre-Certification through your Utilization Management department?"',
        repExpectedDialogue: '"Out-of-pocket maximum is $6,000, and yes, deductible applies towards it. For CPT [Procedure Code], prior authorization is required through our radiology review vendor eviCore."',
        notes: 'Document the third-party auth vendor (e.g., eviCore, Carelon, AIM).'
      },
      {
        title: '7. Coordination of Benefits (COB) & Secondary Coverage',
        icon: 'GitCompare',
        callerDialogue: '"Does your system reflect any other active primary or secondary coverage for this member, or is your plan primary? When was the member’s COB last updated?"',
        repExpectedDialogue: '"We are primary; COB was verified on 01/10/2025 with no other active coverage on file."',
        notes: 'If COB has not been updated within 12 months, warn front desk that claims may deny CO-22.'
      },
      {
        title: '8. Claims Submission & Closing Documentation',
        icon: 'FileText',
        callerDialogue: '"Perfect. Could you please confirm the electronic Payer ID, physical claims mailing address, and your Timely Filing Limit? Lastly, may I have your name and the Call Reference Number for this verification?"',
        repExpectedDialogue: '"Electronic Payer ID is 87726. Paper claims go to PO Box 30555, Salt Lake City, UT 84130. Timely filing is 90 days from DOS. My name is Jessica, and your call reference number is REF-892401."',
        notes: 'Mandatory: Never hang up without the Call Reference Number and Rep Name!'
      }
    ]
  },
  {
    id: 'ar-fast-status',
    name: 'Short Professional AR Claim Follow-up Script',
    duration: '2 – 3 Minutes',
    targetObjective: 'Rapid claim status inquiry for claims in processing, pending, or recently paid.',
    sections: [
      {
        title: '1. Fast Authentication & Claim Identification',
        icon: 'Zap',
        callerDialogue: '"Hi! Calling from [Provider Name] to check claim status. Billing NPI [Billing NPI], Tax ID [Tax ID]. Member ID is [Member ID Phonetic], DOB [Patient DOB], and Date of Service is [DOS]. Billed amount is $[Billed Amount]."',
        repExpectedDialogue: '"Thank you. Found the claim under ICN 202502140089. It was received on 02/05/2025."',
        notes: 'Provide all 4 identifiers (NPI, Member ID, DOS, Billed Charge) upfront to save time.'
      },
      {
        title: '2. Current Status & Adjudication Breakdown',
        icon: 'Search',
        callerDialogue: '"Has this claim finalized adjudication? What is the current status, paid amount, contractual adjustment, and patient responsibility?"',
        repExpectedDialogue: '"The claim was approved on 02/18/2025 for $185.00. Patient responsibility is $35 copay (PR-3), contractual write-off is $80 (CO-45)."',
        notes: 'Write down all CARC amounts to ensure payment equals allowed minus PR.'
      },
      {
        title: '3. Payment Disbursement Details & Call Reference',
        icon: 'CreditCard',
        callerDialogue: '"Was payment issued via EFT or check? What is the check/trace number, check date, and bulk check total? May I have your name and call reference number?"',
        repExpectedDialogue: '"Issued via EFT trace #ACH-9812401 on 02/20/2025 in a bulk batch of $4,320. My name is Marcus, reference #REF-334102."',
        notes: 'Record EFT trace number for banking reconciliation.'
      }
    ]
  },
  {
    id: 'inpatient-er-auth',
    name: 'Inpatient Authorization via Emergency Department Script',
    duration: '4 – 5 Minutes',
    targetObjective: 'Emergency inpatient admission notification and clinical pre-certification.',
    sections: [
      {
        title: '1. Emergency Admission Notification',
        icon: 'AlertCircle',
        callerDialogue: '"Hello, this is [Caller Name] from [Hospital Name] Utilization Review. I am calling to report an emergency inpatient admission via our Emergency Department for member [Member ID Phonetic]."',
        repExpectedDialogue: '"Thank you. Can I have the patient’s full name, DOB, admission date, and admitting diagnosis code?"',
        notes: 'Must be reported within 24–48 hours of emergency admission.'
      },
      {
        title: '2. Clinical Handover & Severity Criteria',
        icon: 'Activity',
        callerDialogue: '"Patient was admitted on [DOS] through ER with acute appendicitis with perforation, ICD-10 K35.20. Emergency laparoscopic appendectomy was completed. Patient meets InterQual acute inpatient severity of illness criteria."',
        repExpectedDialogue: '"Understood. Clinical records were received via fax. The inpatient admission has been authorized for 3 days through 02/28/2025 under Auth Number AUTH-98012."',
        notes: 'Document authorized length of stay (LOS) and authorization number.'
      },
      {
        title: '3. Concurrent Review Schedule & Auth Reference',
        icon: 'Calendar',
        callerDialogue: '"Thank you. What is the due date for concurrent review notes if the patient requires additional days? Can you confirm the authorized auth number and representative name?"',
        repExpectedDialogue: '"Concurrent review update is due by 12 PM on 02/27. Auth #AUTH-98012. Representative David, ref #UR-7762."',
        notes: 'Set reminder for next concurrent clinical review submission.'
      }
    ]
  }
];
