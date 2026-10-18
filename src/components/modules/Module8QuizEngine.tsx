import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Award, 
  RotateCcw, 
  Check, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Flag, 
  Sparkles,
  Printer,
  ShieldCheck,
  Download,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizQuestions';
import { QuizQuestion } from '../../types/rcm';
import { useAcademy } from '../../context/AcademyContext';
import { triggerCelebrationConfetti } from '../common/Confetti';

export const Module8QuizEngine: React.FC = () => {
  const { progress, markModuleCompleted, saveQuizScore } = useAcademy();
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');

  // Practice Mode State
  const [practiceCategory, setPracticeCategory] = useState<string>('all');
  const [currentPracticeIdx, setCurrentPracticeIdx] = useState(0);
  const [selectedPracticeAnswers, setSelectedPracticeAnswers] = useState<Record<number, number>>({});
  const [revealedPractice, setRevealedPractice] = useState<Record<number, boolean>>({});

  // Exam Mode State
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [currentExamIdx, setCurrentExamIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 mins
  const [studentName, setStudentName] = useState('Certified Healthcare Specialist');
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);

  const isCompleted = progress.completedModules.includes('quiz-engine');

  // Filter practice questions
  const filteredPracticeQuestions = practiceCategory === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.module === practiceCategory);

  const activePracticeQuestion = filteredPracticeQuestions[currentPracticeIdx] || filteredPracticeQuestions[0];

  // Initialize Exam
  const handleStartExam = () => {
    // Pick 25 randomized questions
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 25);
    setExamQuestions(shuffled);
    setExamAnswers({});
    setFlaggedQuestions([]);
    setCurrentExamIdx(0);
    setTimeLeft(25 * 60);
    setExamFinished(false);
    setExamStarted(true);
  };

  // Timer effect for exam
  useEffect(() => {
    if (!examStarted || examFinished) return;
    if (timeLeft <= 0) {
      handleFinishExam();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, examFinished, timeLeft]);

  const handleFinishExam = () => {
    setExamFinished(true);
    setExamStarted(false);

    // Calculate score
    let correctCount = 0;
    examQuestions.forEach(q => {
      if (examAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / examQuestions.length) * 100);
    saveQuizScore(correctCount, examQuestions.length, 'exam');

    if (percent >= 80) {
      triggerCelebrationConfetti();
      markModuleCompleted('quiz-engine');
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleFlag = (id: number) => {
    setFlaggedQuestions(prev => 
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  // Exam Score calculations
  const totalExamQuestions = examQuestions.length || 1;
  let correctExamAnswers = 0;
  const categoryScores: Record<string, { correct: number; total: number }> = {};

  if (examFinished) {
    examQuestions.forEach(q => {
      const isRight = examAnswers[q.id] === q.correctIndex;
      if (isRight) correctExamAnswers++;
      
      const cat = q.category || 'General';
      if (!categoryScores[cat]) categoryScores[cat] = { correct: 0, total: 0 };
      categoryScores[cat].total++;
      if (isRight) categoryScores[cat].correct++;
    });
  }

  const examScorePercent = Math.round((correctExamAnswers / totalExamQuestions) * 100);
  const examPassed = examScorePercent >= 80;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div id="quiz-engine-top" className="space-y-6 animate-fadeIn">
      {/* Top Banner Card — Dark Leather & Gold Skeuomorphic Styling */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-2 border-amber-900/70 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                ACADEMY CERTIFICATION EXAMINATION
              </span>
              <span className="text-xs font-mono text-stone-300 font-bold">
                MODULE 8 OF 8
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-2">
              🎓 Gamified Assessment & Certification Exam Engine
            </h1>
            <p className="text-sm text-stone-300 font-sans max-w-3xl mt-1.5 leading-relaxed">
              Test your end-to-end competency across all 10 RCM pipeline stages with 42 authoritative questions. Practice with instant clinical rationales or take the timed 25-question credentialing exam to earn your official Certificate of Healthcare Revenue Cycle Mastery.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-xs font-bold px-3.5 py-2 rounded-xl bg-stone-950 text-emerald-300 border-2 border-emerald-500/40 font-mono shadow-inner flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Best Exam: {progress.quizBestScore}%
            </span>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap gap-2.5 mt-6 pt-6 border-t-2 border-dashed border-stone-800">
          <button
            type="button"
            onClick={() => setMode('practice')}
            className={`px-4 py-2.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 ${
              mode === 'practice'
                ? 'bg-amber-800 text-white shadow-md ring-2 ring-amber-500/60'
                : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border-2 border-stone-700 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Practice Mode (Instant Rationales & Study Notes)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('exam')}
            className={`px-4 py-2.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 ${
              mode === 'exam'
                ? 'bg-amber-800 text-white shadow-md ring-2 ring-amber-500/60'
                : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border-2 border-stone-700 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Timed Certification Exam (25 Questions • 25 Min)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: PRACTICE MODE                                                     */}
      {/* ========================================================================= */}
      {mode === 'practice' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All 42 Questions' },
              { id: 'foundations', label: '1. Foundations & Math' },
              { id: 'claim-forms', label: '2. CMS-1500 & UB-04 Forms' },
              { id: 'insurance-payers', label: '3. Medicare & Payers' },
              { id: 'coding-modifiers', label: '4. Coding & Modifiers' },
              { id: 'ar-analytics', label: '5. AR Analytics & KPIs' },
              { id: 'ar-playbook', label: '6. 14 AR Playbook Scenarios' },
              { id: 'call-scripts', label: '7. Call Scripts & NATO' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setPracticeCategory(cat.id);
                  setCurrentPracticeIdx(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-all ${
                  practiceCategory === cat.id
                    ? 'bg-emerald-800 text-white font-bold ring-2 ring-emerald-500/50 shadow-sm'
                    : 'bg-stone-900 hover:bg-stone-850 text-stone-300 border-2 border-stone-700 hover:text-white font-medium'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Question Card — Dark Leather / Stone Aesthetic */}
          <div className="bg-stone-900/95 rounded-3xl p-6 sm:p-8 border-2 border-stone-700 shadow-2xl space-y-6">
            {/* Question Header Strip */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-stone-800 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60 shadow-xs">
                  Question {currentPracticeIdx + 1} of {filteredPracticeQuestions.length}
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  {activePracticeQuestion.category}
                </span>
              </div>
              <span className="text-xs font-mono text-stone-300 bg-stone-800 border border-stone-700 px-2.5 py-0.5 rounded capitalize font-medium">
                {activePracticeQuestion.difficulty} Level
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-xl font-serif font-bold text-stone-100 leading-relaxed">
              {activePracticeQuestion.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {activePracticeQuestion.options.map((opt, optIdx) => {
                const userChoice = selectedPracticeAnswers[activePracticeQuestion.id];
                const isRevealed = revealedPractice[activePracticeQuestion.id];
                const isSelected = userChoice === optIdx;
                const isCorrect = optIdx === activePracticeQuestion.correctIndex;

                let optionStyle = 'bg-stone-850 hover:bg-stone-800 border-2 border-stone-700 text-stone-100 hover:border-amber-500/70';
                let letterStyle = 'bg-stone-800 border-2 border-stone-600 text-stone-200';

                if (isRevealed) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100 font-bold ring-2 ring-emerald-500/60 shadow-md';
                    letterStyle = 'bg-emerald-700 text-white border-2 border-emerald-400';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-950/80 border-2 border-rose-500 text-rose-100 font-bold ring-2 ring-rose-500/60 shadow-md';
                    letterStyle = 'bg-rose-800 text-white border-2 border-rose-400';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-amber-950/70 border-2 border-amber-500 text-amber-100 font-bold ring-2 ring-amber-500/50 shadow-md';
                  letterStyle = 'bg-amber-800 text-white border-2 border-amber-400';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => {
                      if (!isRevealed) {
                        setSelectedPracticeAnswers(prev => ({
                          ...prev,
                          [activePracticeQuestion.id]: optIdx
                        }));
                        setRevealedPractice(prev => ({
                          ...prev,
                          [activePracticeQuestion.id]: true
                        }));
                      }
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${optionStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${letterStyle}`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 text-sm sm:text-base leading-relaxed text-stone-100 font-sans">
                      {opt}
                    </span>
                    {isRevealed && isCorrect && (
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isRevealed && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Rationale Explanation Box */}
            {revealedPractice[activePracticeQuestion.id] && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-600/70 text-stone-100 space-y-1.5 shadow-inner animate-fadeIn">
                <span className="font-serif font-bold text-sm text-emerald-300 block flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Authoritative RCM Clinical & Billing Rationale:
                </span>
                <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed">
                  {activePracticeQuestion.explanation}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-stone-800">
              <button
                type="button"
                disabled={currentPracticeIdx === 0}
                onClick={() => setCurrentPracticeIdx(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-xs font-serif font-bold text-stone-200 border-2 border-stone-700 disabled:opacity-40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                type="button"
                disabled={currentPracticeIdx === filteredPracticeQuestions.length - 1}
                onClick={() => setCurrentPracticeIdx(prev => Math.min(filteredPracticeQuestions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl skeuo-btn-primary text-xs font-serif font-bold text-white disabled:opacity-40 shadow-md"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: TIMED CERTIFICATION EXAM                                          */}
      {/* ========================================================================= */}
      {mode === 'exam' && (
        <div className="space-y-6">
          {/* STEP 1: PRE-EXAM REGISTRATION & OVERVIEW SCREEN */}
          {!examStarted && !examFinished && (
            <div className="bg-stone-900/95 rounded-3xl p-8 border-2 border-stone-700 shadow-2xl text-center max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-950/60 text-amber-300 border-2 border-amber-600/50 flex items-center justify-center mx-auto shadow-inner">
                <GraduationCap className="w-9 h-9" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                  RCMclaim Professional Certification Exam
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 font-sans mt-2 leading-relaxed">
                  Simulates a formal healthcare revenue cycle credentialing test. Answer 25 questions across coding, CMS-1500 & UB-04 claim forms, Medicare guidelines, modifiers, and denial recovery scenarios within 25 minutes. A passing score of 80% or higher awards your official printable certificate.
                </p>
              </div>

              <div className="max-w-sm mx-auto text-left">
                <label className="block text-xs font-serif font-bold text-stone-200 mb-1.5">
                  Candidate Name (For Official Certificate):
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border-2 border-stone-700 text-stone-100 font-serif text-sm focus:border-amber-500 focus:outline-none shadow-inner"
                  placeholder="Enter full legal name..."
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs max-w-md mx-auto pt-2">
                <div className="p-3.5 rounded-xl bg-stone-950 border-2 border-stone-800 text-center">
                  <div className="font-serif font-bold text-stone-100 text-sm">25 Questions</div>
                  <div className="text-[11px] font-mono text-stone-400">Randomized Bank</div>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950 border-2 border-stone-800 text-center">
                  <div className="font-serif font-bold text-stone-100 text-sm">25 Minutes</div>
                  <div className="text-[11px] font-mono text-stone-400">Timed Countdown</div>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950 border-2 border-stone-800 text-center">
                  <div className="font-serif font-bold text-stone-100 text-sm">80% to Pass</div>
                  <div className="text-[11px] font-mono text-stone-400">20 / 25 Correct</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartExam}
                className="skeuo-btn-primary px-8 py-3.5 rounded-2xl text-white font-serif font-bold text-sm shadow-xl"
              >
                Begin Timed Certification Exam Now
              </button>
            </div>
          )}

          {/* STEP 2: ACTIVE EXAM IN PROGRESS */}
          {examStarted && !examFinished && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Question Area */}
              <div className="lg:col-span-8 bg-stone-900/95 rounded-3xl p-6 sm:p-8 border-2 border-stone-700 shadow-2xl space-y-6">
                {/* Header with Question Number, Flag, and High-Contrast Timer */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-stone-800 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60 shadow-xs">
                      Question {currentExamIdx + 1} of {examQuestions.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleFlag(examQuestions[currentExamIdx].id)}
                      className={`flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-xl border-2 transition-all ${
                        flaggedQuestions.includes(examQuestions[currentExamIdx].id)
                          ? 'bg-amber-950 text-amber-300 border-amber-600'
                          : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-amber-400'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{flaggedQuestions.includes(examQuestions[currentExamIdx].id) ? 'Flagged' : 'Flag Question'}</span>
                    </button>
                  </div>

                  {/* High Contrast Countdown Timer */}
                  <div className="flex items-center gap-2 font-mono text-sm font-bold text-rose-300 bg-rose-950/80 px-3.5 py-1.5 rounded-xl border-2 border-rose-800/80 shadow-inner">
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span>{formatTimer(timeLeft)}</span>
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-base sm:text-xl font-serif font-bold text-stone-100 leading-relaxed">
                  {examQuestions[currentExamIdx]?.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {examQuestions[currentExamIdx]?.options.map((opt, optIdx) => {
                    const isSelected = examAnswers[examQuestions[currentExamIdx].id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => {
                          setExamAnswers(prev => ({
                            ...prev,
                            [examQuestions[currentExamIdx].id]: optIdx
                          }));
                        }}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-amber-950/70 border-amber-500 text-amber-100 font-bold ring-2 ring-amber-500/50 shadow-md'
                            : 'bg-stone-850 hover:bg-stone-800 border-stone-700 text-stone-100 hover:border-amber-500/70'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected ? 'bg-amber-800 text-white border-2 border-amber-400' : 'bg-stone-800 border-2 border-stone-600 text-stone-200'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 text-sm sm:text-base leading-relaxed text-stone-100 font-sans">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-stone-800">
                  <button
                    type="button"
                    disabled={currentExamIdx === 0}
                    onClick={() => setCurrentExamIdx(prev => Math.max(0, prev - 1))}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-xs font-serif font-bold text-stone-200 border-2 border-stone-700 disabled:opacity-40 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {currentExamIdx < examQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentExamIdx(prev => Math.min(examQuestions.length - 1, prev + 1))}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl skeuo-btn-primary text-xs font-serif font-bold text-white shadow-md"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinishExam}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-serif font-bold text-xs shadow-lg transition-colors"
                      >
                        Submit Final Exam Now
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Question Navigator Grid Card */}
              <div className="lg:col-span-4 bg-stone-900/95 rounded-3xl p-6 border-2 border-stone-700 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-amber-300">
                    Question Navigator
                  </h4>
                  <span className="text-xs font-mono font-bold text-stone-300">
                    {Object.keys(examAnswers).length} / {examQuestions.length} Done
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {examQuestions.map((q, idx) => {
                    const isAnswered = examAnswers[q.id] !== undefined;
                    const isFlagged = flaggedQuestions.includes(q.id);
                    const isCurrent = currentExamIdx === idx;

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentExamIdx(idx)}
                        className={`h-10 rounded-xl font-mono text-xs font-bold flex items-center justify-center relative border-2 transition-all ${
                          isCurrent
                            ? 'ring-2 ring-amber-400 border-amber-400 text-amber-300 bg-amber-950/60'
                            : isAnswered
                            ? 'bg-emerald-800 text-white border-emerald-600 shadow-xs'
                            : 'bg-stone-850 text-stone-300 border-stone-700 hover:border-stone-500'
                        }`}
                      >
                        {idx + 1}
                        {isFlagged && (
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute top-1 right-1 shadow-sm" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t-2 border-stone-800 space-y-2 text-xs">
                  <button
                    type="button"
                    onClick={handleFinishExam}
                    className="w-full py-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-serif font-bold text-xs shadow-lg transition-colors"
                  >
                    Finish & Submit Exam
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: RESULTS & OFFICIAL PRINTABLE CERTIFICATE */}
          {examFinished && (
            <div className="space-y-8">
              {/* Summary Score Card */}
              <div className="bg-stone-900/95 rounded-3xl p-6 sm:p-8 border-2 border-stone-700 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      examPassed 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50' 
                        : 'bg-rose-950 text-rose-300 border border-rose-500/50'
                    }`}>
                      {examPassed ? 'EXAM PASSED (CERTIFIED)' : 'DID NOT PASS (RETRY AVAILABLE)'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                    Final Examination Results: {examScorePercent}%
                  </h2>
                  <p className="text-xs text-stone-300 font-sans mt-1">
                    {correctExamAnswers} of {totalExamQuestions} questions answered correctly. Passing mark: 80%.
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-serif font-bold border-2 border-stone-700 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" /> Retake Exam
                  </button>

                  {examPassed && (
                    <button
                      type="button"
                      onClick={handlePrintCertificate}
                      className="px-5 py-2.5 rounded-xl skeuo-btn-primary text-white text-xs font-serif font-bold shadow-lg flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" /> Print / Save Certificate
                    </button>
                  )}
                </div>
              </div>

              {/* Printable Official Certificate (High-Contrast Prestigious Dark Leather Diploma) */}
              {examPassed && (
                <div className="print:m-0 print:p-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-100 rounded-3xl p-8 sm:p-12 border-4 border-amber-500/60 relative shadow-2xl overflow-hidden max-w-4xl mx-auto">
                  {/* Decorative Watermark Seal */}
                  <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center pointer-events-none">
                    <ShieldCheck className="w-48 h-48 text-amber-500/10" />
                  </div>

                  <div className="text-center space-y-4 relative z-10">
                    <div className="flex justify-center mb-2">
                      <div className="w-16 h-16 rounded-2xl bg-amber-950/70 text-amber-300 border-2 border-amber-400/80 flex items-center justify-center shadow-inner">
                        <Award className="w-9 h-9" />
                      </div>
                    </div>

                    <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                      RCMCLAIM • CREDENTIAL VERIFICATION & MASTERY
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                      Certificate of Healthcare Revenue Cycle Mastery
                    </h1>

                    <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto font-sans leading-relaxed">
                      This official certificate verifies that the candidate has demonstrated comprehensive theoretical and operational mastery of US Revenue Cycle Management, Claims Processing, and Accounts Receivable.
                    </p>

                    <div className="py-4">
                      <div className="text-xs text-stone-400 uppercase tracking-widest font-mono font-bold">
                        PROUDLY CONFERRED UPON
                      </div>
                      <div className="text-2xl sm:text-3xl font-serif italic font-bold text-amber-300 mt-1 border-b-2 border-amber-500/40 pb-2 inline-block px-8">
                        {studentName}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-xs pt-4 border-t-2 border-stone-800 text-left">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase block font-mono font-bold">EXAM SCORE</span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">{examScorePercent}% (Passed)</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase block font-mono font-bold">CREDENTIAL ID</span>
                        <span className="font-mono font-bold text-stone-200 text-sm">RCM-{Date.now().toString().slice(-8)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase block font-mono font-bold">ISSUE DATE</span>
                        <span className="font-mono font-bold text-stone-200 text-sm">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
