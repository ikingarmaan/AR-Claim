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
  Download
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
  const [studentName, setStudentName] = useState('Certified Healthcare Professional');
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);

  const isCompleted = progress.completedModules.includes('quiz-engine');

  // Filter practice questions
  const filteredPracticeQuestions = practiceCategory === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.module === practiceCategory);

  const activePracticeQuestion = filteredPracticeQuestions[currentPracticeIdx] || filteredPracticeQuestions[0];

  // Initialize Exam
  const handleStartExam = () => {
    // Pick 25 questions or all 42
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
    <div id="quiz-engine-top" className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-health-darkCard to-health-darkCard border border-emerald-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Module 8 of 8
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              Gamified Assessment & Certification Exam Engine
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Test your proficiency across all 8 modules with 42 comprehensive MCQs. Practice with immediate feedback rationales or sit for the timed certification exam to earn your official academy credential.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-emerald-400 border border-emerald-500/30 font-mono">
              Best Exam: {progress.quizBestScore}%
            </span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setMode('practice')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'practice'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice Mode (Instant Rationales)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('exam')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'exam'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Timed Certification Exam Mode (25 Questions)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: PRACTICE MODE */}
      {mode === 'practice' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All 42 Questions' },
              { id: 'foundations', label: 'Foundations & Math' },
              { id: 'claim-forms', label: 'CMS-1500 & UB-04' },
              { id: 'insurance-payers', label: 'Medicare & Payers' },
              { id: 'coding-modifiers', label: 'Coding & Modifiers' },
              { id: 'ar-analytics', label: 'AR Analytics & KPIs' },
              { id: 'ar-playbook', label: '14 AR Scenarios' },
              { id: 'call-scripts', label: 'Call Scripts & NATO' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setPracticeCategory(cat.id);
                  setCurrentPracticeIdx(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  practiceCategory === cat.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-health-darkCard text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                  Question {currentPracticeIdx + 1} of {filteredPracticeQuestions.length}
                </span>
                <span className="text-xs text-slate-400 font-semibold uppercase">
                  {activePracticeQuestion.category}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 capitalize">
                {activePracticeQuestion.difficulty} Level
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {activePracticeQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {activePracticeQuestion.options.map((opt, optIdx) => {
                const userChoice = selectedPracticeAnswers[activePracticeQuestion.id];
                const isRevealed = revealedPractice[activePracticeQuestion.id];
                const isSelected = userChoice === optIdx;
                const isCorrect = optIdx === activePracticeQuestion.correctIndex;

                let optionStyle = 'bg-slate-50 dark:bg-health-darkSubtle/30 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50';

                if (isRevealed) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold ring-1 ring-emerald-500/40';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/40';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-semibold';
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
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    {isRevealed && isCorrect && (
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                    {isRevealed && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Rationale Explanation */}
            {revealedPractice[activePracticeQuestion.id] && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                  Authoritative RCM Rationale:
                </span>
                <p className="leading-relaxed">
                  {activePracticeQuestion.explanation}
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={currentPracticeIdx === 0}
                onClick={() => setCurrentPracticeIdx(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                type="button"
                disabled={currentPracticeIdx === filteredPracticeQuestions.length - 1}
                onClick={() => setCurrentPracticeIdx(prev => Math.min(filteredPracticeQuestions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold disabled:opacity-40"
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: TIMED CERTIFICATION EXAM */}
      {mode === 'exam' && (
        <div className="space-y-6">
          {!examStarted && !examFinished && (
            /* Start Exam Screen */
            <div className="bg-white dark:bg-health-darkCard rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <GraduationCap className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  RCM & AR Healthcare Certification Exam
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Simulates a formal healthcare revenue cycle credentialing test. Answer 25 questions across coding, claim forms, Medicare, modifiers, and denial scenarios within 25 minutes. A passing score of 80% or higher grants an official Certificate of Completion.
                </p>
              </div>

              <div className="max-w-xs mx-auto text-left">
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Candidate Name (For Certificate):
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs max-w-md mx-auto pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white">25 Questions</div>
                  <div className="text-[10px] text-slate-400">Randomized Bank</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white">25 Minutes</div>
                  <div className="text-[10px] text-slate-400">Timed Countdown</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white">80% to Pass</div>
                  <div className="text-[10px] text-slate-400">20 / 25 Correct</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartExam}
                className="px-8 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Begin Timed Certification Exam
              </button>
            </div>
          )}

          {examStarted && !examFinished && (
            /* Active Exam Screen */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Question Area */}
              <div className="lg:col-span-8 bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                      Question {currentExamIdx + 1} of {examQuestions.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleFlag(examQuestions[currentExamIdx].id)}
                      className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                        flaggedQuestions.includes(examQuestions[currentExamIdx].id)
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'text-slate-400 hover:text-amber-500'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{flaggedQuestions.includes(examQuestions[currentExamIdx].id) ? 'Flagged' : 'Flag'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-sm font-black text-rose-500 bg-rose-500/10 px-3 py-1 rounded-xl border border-rose-500/20">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimer(timeLeft)}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
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
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold ring-1 ring-emerald-500/40'
                            : 'bg-slate-50 dark:bg-health-darkSubtle/30 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation & Submit */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    disabled={currentExamIdx === 0}
                    onClick={() => setCurrentExamIdx(prev => Math.max(0, prev - 1))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold disabled:opacity-40"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {currentExamIdx < examQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentExamIdx(prev => Math.min(examQuestions.length - 1, prev + 1))}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFinishExam}
                        className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md hover:bg-emerald-400 transition-colors"
                      >
                        Submit Final Exam
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Question Navigator Grid */}
              <div className="lg:col-span-4 bg-white dark:bg-health-darkCard rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Question Navigator
                  </h4>
                  <span className="text-xs text-slate-500">
                    {Object.keys(examAnswers).length} / {examQuestions.length} Answered
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
                        className={`h-9 rounded-xl font-mono text-xs font-bold flex items-center justify-center relative border transition-all ${
                          isCurrent
                            ? 'ring-2 ring-emerald-500 border-emerald-500 text-emerald-500'
                            : isAnswered
                            ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {idx + 1}
                        {isFlagged && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1 right-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <button
                    type="button"
                    onClick={handleFinishExam}
                    className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors"
                  >
                    Finish & Submit Exam Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {examFinished && (
            /* Results & Certificate Screen */
            <div className="space-y-8">
              {/* Summary Score Card */}
              <div className="bg-white dark:bg-health-darkCard rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      examPassed ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}>
                      {examPassed ? 'EXAM PASSED (CERTIFIED)' : 'DID NOT PASS (RETRY AVAILABLE)'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    Final Examination Results: {examScorePercent}%
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {correctExamAnswers} of {totalExamQuestions} questions answered correctly. Passing mark: 80%.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" /> Retake Exam
                  </button>

                  {examPassed && (
                    <button
                      type="button"
                      onClick={handlePrintCertificate}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" /> Print / Save Certificate
                    </button>
                  )}
                </div>
              </div>

              {/* Printable Official Certificate (renders cleanly on screen and in print) */}
              {examPassed && (
                <div className="print:m-0 print:p-0 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border-4 border-emerald-500/40 relative shadow-2xl overflow-hidden max-w-4xl mx-auto">
                  {/* Watermark seal */}
                  <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center pointer-events-none">
                    <ShieldCheck className="w-48 h-48 text-emerald-500/10" />
                  </div>

                  <div className="text-center space-y-4 relative z-10">
                    <div className="flex justify-center mb-2">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                        <Award className="w-8 h-8" />
                      </div>
                    </div>

                    <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                      RCM & US MEDICAL AR ACADEMY • CREDENTIAL VERIFICATION
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      Certificate of Healthcare Revenue Cycle Mastery
                    </h1>

                    <p className="text-xs text-slate-400 max-w-lg mx-auto">
                      This official certificate verifies that the candidate has demonstrated comprehensive theoretical and operational mastery of US Revenue Cycle Management, Claims Processing, and Accounts Receivable.
                    </p>

                    <div className="py-4">
                      <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                        PROUDLY CONFERRED UPON
                      </div>
                      <div className="text-2xl sm:text-3xl font-serif italic font-bold text-emerald-300 mt-1 border-b border-emerald-500/30 pb-2 inline-block px-8">
                        {studentName}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-xs pt-4 border-t border-slate-800 text-left">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-mono">EXAM SCORE</span>
                        <span className="font-mono font-bold text-emerald-400">{examScorePercent}% (Passed)</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-mono">CREDENTIAL ID</span>
                        <span className="font-mono font-bold text-slate-200">RCM-{Date.now().toString().slice(-8)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-mono">ISSUE DATE</span>
                        <span className="font-mono font-bold text-slate-200">{new Date().toLocaleDateString()}</span>
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
