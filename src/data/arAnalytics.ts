export interface KpiMetric {
  id: string;
  name: string;
  benchmark: string;
  targetRange: string;
  formula: string;
  description: string;
  impact: string;
}

export const AR_KPIS: KpiMetric[] = [
  {
    id: 'days-in-ar',
    name: 'Days in Accounts Receivable (DAR)',
    benchmark: '< 40 Days (Best in class: < 32 days)',
    targetRange: '30 – 40 days',
    formula: 'Days in AR = (Total Gross Accounts Receivable / Average Daily Gross Charges)',
    description: 'Measures the average number of days it takes for a healthcare practice to get paid from the date services were billed.',
    impact: 'A high DAR (> 50 days) indicates stalled claims, severe payer delays, backlog in denial resolution, or cash flow constriction.'
  },
  {
    id: 'clean-claim-rate',
    name: 'Clean Claim Rate (CCR)',
    benchmark: '>= 95%',
    targetRange: '95% – 98%',
    formula: 'CCR = (Claims Accepted and Paid on Initial Submission / Total Claims Submitted) × 100',
    description: 'The percentage of claims that successfully pass all clearinghouse and payer front-end edits without rejection or manual touch.',
    impact: 'Every 1% increase in CCR drastically reduces rework costs and accelerates cash collection by 14–21 days.'
  },
  {
    id: 'first-pass-rate',
    name: 'First Pass Resolution Rate (FPRR)',
    benchmark: '>= 90%',
    targetRange: '90% – 95%',
    formula: 'FPRR = (Total Claims Paid on First Adjudication Cycle / Total Claims Adjudicated) × 100',
    description: 'Calculates the proportion of claims fully paid on their first adjudication without undergoing rework, appeals, or resubmission.',
    impact: 'High FPRR proves clinical documentation, coding, and patient demographic capture are executing flawlessly.'
  },
  {
    id: 'denial-rate',
    name: 'Initial Denial Rate',
    benchmark: '< 5% (HFMA standard)',
    targetRange: '3% – 5%',
    formula: 'Denial Rate = (Total Dollar Value or Count of Denied Claims / Total Claims Submitted) × 100',
    description: 'Measures the proportion of submitted claims that result in a zero payment or CARC denial on the initial ERA/EOB.',
    impact: 'Denial rates above 8% strain staff capacity and indicate systematic front-end eligibility failures or coding breakdowns.'
  }
];

export const DENIAL_REDUCTION_CHECKLIST = [
  {
    step: '1. Real-Time Eligibility (270/271 EDI Verification)',
    detail: 'Run automated EDI 270/271 checks 48 hours prior to service and at check-in. Eliminates 30–40% of all denials caused by terminated policies or inactive coverage.'
  },
  {
    step: '2. Proactive Prior Authorization Tracking',
    detail: 'Deploy centralized authorization workflows. Cross-reference planned CPTs with payer pre-cert lists. Document auth# in CMS-1500 Box 23 before billing.'
  },
  {
    step: '3. Certified Medical Coding Calibration',
    detail: 'Regular dual-auditing of E&M levels and surgical operative notes to ensure complete LCD/NCD medical necessity linkage and correct modifier usage.'
  },
  {
    step: '4. Clearinghouse Front-End Scrubbing Edits',
    detail: 'Build custom rules in the clearinghouse to stop claims with invalid NPI, missing referring doctor, PO Box in Box 32, or missing CLIA numbers before reaching the payer.'
  },
  {
    step: '5. Root Cause Analysis (RCA) on Remittances',
    detail: 'Categorize weekly 835 ERA adjustment reason codes (CARCs) into actionable buckets: Demographic, Prior Auth, Medical Necessity, or Timely Filing.'
  },
  {
    step: '6. DMAIC / PDCA Continuous Improvement',
    detail: 'Apply Six Sigma (Define, Measure, Analyze, Improve, Control) or PDCA cycles to address top 3 recurring denial codes every month.'
  },
  {
    step: '7. Timely Filing Limit (TFL) Countdown Alarms',
    detail: 'Configure automated PM alerts when claims reach 50% of the payer’s TFL (e.g. 45 days on a 90-day filing limit) to prevent irreversible write-offs.'
  },
  {
    step: '8. Payer Policy & NCCI Edit Updates',
    detail: 'Maintain a quarterly matrix of commercial payer contract changes, quarterly CMS NCCI PTP edits, and annual AMA CPT updates.'
  }
];

export interface AgingBucket {
  bucket: string;
  status: string;
  actionRequired: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  color: string;
  tflRisk: string;
}

export const AGING_BUCKETS: AgingBucket[] = [
  {
    bucket: '0 – 30 Days',
    status: 'In Process / Normal Adjudication',
    actionRequired: 'Check clearinghouse 999 and 277CA acceptance reports. Verify electronic claim was accepted by payer without front-end rejections.',
    riskLevel: 'low',
    color: 'emerald',
    tflRisk: 'Safe. Normal commercial electronic turnaround is 14–21 days; Medicare is 14 days (clean claim floor).'
  },
  {
    bucket: '31 – 60 Days',
    status: 'Status Check / First Follow-up',
    actionRequired: 'Run 276/277 claim status inquiry or check payer provider web portal (e.g. Availity, Optum). Verify if claim is pending for records or was never received (CNOF).',
    riskLevel: 'medium',
    color: 'amber',
    tflRisk: 'Moderate risk for payers with 60–90 day timely filing limits (e.g. Medicaid or certain HMOs).'
  },
  {
    bucket: '61 – 90 Days',
    status: 'Active Telephone Calling',
    actionRequired: 'Call payer customer service representative. Obtain claim receipt date, processing status, payment draft details, or exact denial rationale. Initiate resubmission or appeal.',
    riskLevel: 'high',
    color: 'orange',
    tflRisk: 'High urgency for commercial plans with 90-day TFL (e.g. UnitedHealthcare, Aetna commercial).'
  },
  {
    bucket: '91 – 120 Days',
    status: 'High Priority Escalation / TFL Risk',
    actionRequired: 'Escalate to payer claims supervisor. Expedite corrected claims or first-level appeals with Proof of Timely Filing (POTF / EDI 277CA acceptance receipt).',
    riskLevel: 'high',
    color: 'rose',
    tflRisk: 'Critical TFL danger! Claims past 90 days risk irreversible CO-29 contractual write-off.'
  },
  {
    bucket: '120+ Days',
    status: 'Urgent Escalation / Supervisory Review',
    actionRequired: 'Exhaust all appeal avenues (second-level appeals, external reviews, or client manager escalations). Prepare write-off justification if past appeal deadlines.',
    riskLevel: 'critical',
    color: 'red',
    tflRisk: 'Maximum risk. Likely requires formal written grievance, state insurance commissioner complaint, or contractual write-off.'
  }
];
