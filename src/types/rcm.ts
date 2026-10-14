export type ModuleId = 
  | 'dashboard'
  | 'foundations'
  | 'claim-forms'
  | 'insurance-payers'
  | 'coding-modifiers'
  | 'ar-analytics'
  | 'ar-playbook'
  | 'call-scripts'
  | 'quiz-engine';

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

export interface ClaimBoxDetail {
  boxNumber: string;
  name: string;
  shortName: string;
  description: string;
  rules: string[];
  rejectionCauses: string[];
  sampleValue: string;
  category: 'patient' | 'provider' | 'clinical' | 'billing';
  coordinates: { x: number; y: number; width: number; height: number }; // For visual hotspot overlay
}

export interface Ub04CodeItem {
  code: string;
  type: 'revenue' | 'value' | 'occurrence';
  title: string;
  description: string;
  example: string;
}

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
