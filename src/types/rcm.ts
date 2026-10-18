// ==========================================
// RCMclaim — Skeuomorphic US Healthcare RCM
// Type Definitions for 10-Stage Pipeline
// ==========================================

/** 10 RCM pipeline stages + dashboard + quiz */
export type StageId =
  | 'dashboard'
  | 'appointment'        // Stage 1: Appointment Scheduling
  | 'eligibility'        // Stage 2: Eligibility Verification
  | 'registration'       // Stage 3: Patient Registration
  | 'encounter'          // Stage 4: Doctor Encounter
  | 'transcription'      // Stage 5: Medical Transcription
  | 'coding'             // Stage 6: Medical Coding
  | 'charge-capture'     // Stage 7: Charge Capturing
  | 'claim-submission'   // Stage 8: Claim Submission (CMS-1500 & UB-04)
  | 'payment-posting'    // Stage 9: Payment Posting
  | 'ar-followup'        // Stage 10: AR Follow-Up
  | 'quiz-engine';       // Certification Exam

/** Legacy module IDs for backward compatibility */
export type LegacyModuleId =
  | 'foundations'
  | 'claim-forms'
  | 'insurance-payers'
  | 'coding-modifiers'
  | 'ar-analytics'
  | 'ar-playbook'
  | 'call-scripts';

/** Main active module / stage identifier */
export type ModuleId = StageId | LegacyModuleId;

// --- Claim Form Types ---

export interface ClaimBoxDetail {
  boxNumber: string;
  name: string;
  shortName: string;
  description: string;
  rules: string[];
  rejectionCauses: string[];
  sampleValue: string;
  ediMapping?: string;
  category: 'patient' | 'provider' | 'clinical' | 'billing';
  coordinates?: { x: number; y: number; width: number; height: number };
}

export interface Ub04BoxDetail {
  locatorNumber: string;
  name: string;
  shortName: string;
  category: 'provider' | 'patient' | 'codes' | 'charges' | 'payer' | 'clinical' | 'reserved';
  description: string;
  sampleValue: string;
  ediMapping: string;
  rules: string[];
  rejectionCauses: string[];
}

export interface Ub04CodeItem {
  code: string;
  type: 'revenue' | 'value' | 'occurrence';
  title: string;
  description: string;
  example: string;
}

// --- Terminology & Education ---

export interface TermItem {
  id: string;
  category: 'cost-sharing' | 'financial' | 'compliance' | 'identifiers';
  title: string;
  code?: string;
  shortDefinition: string;
  detailedExplanation: string;
  realWorldExample: string;
  calculationMath?: string;
  keyRule: string;
  tags: string[];
}

// --- Coding & Modifiers ---

export interface ModifierDeepDive {
  code: string;
  title: string;
  category: 'e&m' | 'surgical-distinct' | 'repeat' | 'anatomical' | 'ncci' | 'hospice-component';
  primaryUse: string;
  whenToUse: string[];
  whenNotToUse: string[];
  dollarImpact: string;
  documentationChecklist: string[];
  cases: {
    title: string;
    clinicalScenario: string;
    correctBilling: string;
    financialImpact: string;
    rationale: string;
  }[];
}

// --- AR Scenarios ---

export interface ArScenario {
  id: number;
  slug: string;
  title: string;
  carcCode?: string;
  rarcCode?: string;
  category: 'eligibility' | 'processing' | 'denial' | 'coordination';
  definition: string;
  commonCauses: string[];
  stepByStepWorkflow: string[];
  questionsForRep: string[];
  proTips: string[];
}

export interface CarcRarcDetail {
  code: string;
  type: 'CARC' | 'RARC';
  name: string;
  description: string;
  associatedCodes: string[];
  rootCause: string;
  resolutionStrategy: string;
}

// --- Quiz ---

export interface QuizQuestion {
  id: number;
  module: ModuleId;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// --- AR Notes ---

export interface ArNoteData {
  id: string;
  date: string;
  repName: string;
  callRef: string;
  claimNumber: string;
  patientName: string;
  dos: string;
  billedAmount: string;
  status: string;
  actionTaken: string;
  nextFollowUpDate: string;
  createdAt: string;
}

// --- User Progress ---

export interface UserProgress {
  completedModules: string[];
  bookmarkedDenials: string[];
  bookmarkedModifiers: string[];
  bookmarkedTerms: string[];
  quizBestScore: number;
  quizHistory: {
    date: string;
    score: number;
    total: number;
    mode: 'practice' | 'exam';
  }[];
  savedNotes: ArNoteData[];
}

// --- Stage Metadata ---

export interface StageInfo {
  id: StageId;
  number: number;
  title: string;
  subtitle: string;
  icon: string; // emoji
  color: string; // tailwind color name
}

export const RCM_STAGES: StageInfo[] = [
  { id: 'appointment', number: 1, title: 'Appointment Scheduling', subtitle: 'Patient intake & scheduling systems', icon: '📅', color: 'blue' },
  { id: 'eligibility', number: 2, title: 'Eligibility Verification', subtitle: '270/271 EDI real-time checks', icon: '🔍', color: 'indigo' },
  { id: 'registration', number: 3, title: 'Patient Registration', subtitle: 'Demographics, consent & ABN', icon: '📋', color: 'violet' },
  { id: 'encounter', number: 4, title: 'Doctor Encounter', subtitle: 'E/M levels, SOAP notes & MDM', icon: '🩺', color: 'teal' },
  { id: 'transcription', number: 5, title: 'Medical Transcription', subtitle: 'CDI, HPI, ROS & documentation', icon: '📝', color: 'cyan' },
  { id: 'coding', number: 6, title: 'Medical Coding', subtitle: 'ICD-10, CPT, HCPCS & modifiers', icon: '🏷️', color: 'amber' },
  { id: 'charge-capture', number: 7, title: 'Charge Capturing', subtitle: 'Superbill, fee schedules & CDM', icon: '💰', color: 'orange' },
  { id: 'claim-submission', number: 8, title: 'Claim Submission', subtitle: 'CMS-1500, UB-04 & EDI 837', icon: '📨', color: 'emerald' },
  { id: 'payment-posting', number: 9, title: 'Payment Posting', subtitle: 'ERA/835, EOB & adjustments', icon: '🏦', color: 'green' },
  { id: 'ar-followup', number: 10, title: 'AR Follow-Up', subtitle: 'Denials, appeals & call scripts', icon: '📞', color: 'rose' },
];
