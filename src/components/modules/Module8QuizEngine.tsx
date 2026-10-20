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
  Layers,
  FileCheck,
  Search,
  Filter,
  Eye,
  ChevronDown,
  ChevronUp
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

  // Post-Exam Review Mode State
  const [showReview, setShowReview] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct' | 'flagged'>('all');

  const isCompleted = progress.completedModules.includes('quiz-engine');

  // Filter practice questions
  const filteredPracticeQuestions = practiceCategory === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.module === practiceCategory);

  const activePracticeQuestion = filteredPracticeQuestions[currentPracticeIdx] || filteredPracticeQuestions[0];

  // Initialize Exam
  const handleStartExam = () => {
    // Pick 25 randomized questions from bank
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 25);
    setExamQuestions(shuffled);
    setExamAnswers({});
    setFlaggedQuestions([]);
    setCurrentExamIdx(0);
    setTimeLeft(25 * 60);
    setExamFinished(false);
    setExamStarted(true);
    setShowReview(false);
    setReviewFilter('all');
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
  let wrongExamAnswers = 0;

  if (examFinished) {
    examQuestions.forEach(q => {
      const isRight = examAnswers[q.id] === q.correctIndex;
      if (isRight) {
        correctExamAnswers++;
      } else {
        wrongExamAnswers++;
      }
    });
  }

  const examScorePercent = Math.round((correctExamAnswers / totalExamQuestions) * 100);
  const examPassed = examScorePercent >= 80;

  const handlePrintCertificate = () => {
    window.print();
  };

  // Filter review questions
  const reviewFilteredQuestions = examQuestions.filter(q => {
    const isRight = examAnswers[q.id] === q.correctIndex;
    const isFlagged = flaggedQuestions.includes(q.id);
    if (reviewFilter === 'wrong') return !isRight;
    if (reviewFilter === 'correct') return isRight;
    if (reviewFilter === 'flagged') return isFlagged;
    return true;
  });

  return (
    <div id="quiz-engine-top" className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner Card — Day & Dark Mode Precision Styling */}
      <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-2 border-amber-300 shadow-md dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 dark:border-amber-900/70 rounded-3xl p-6 sm:p-8 dark:shadow-2xl transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-500/40 shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300" />
                ACADEMY CERTIFICATION EXAMINATION
              </span>
              <span className="text-xs font-mono text-stone-700 dark:text-stone-300 font-bold">
                MODULE 8 OF 8
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              🎓 Gamified Assessment & Certification Exam Engine
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-sans max-w-3xl mt-1.5 leading-relaxed">
              Test your end-to-end competency across all 10 RCM pipeline stages with 42 authoritative questions. Practice with instant clinical rationales or take the timed 25-question credentialing exam to earn your official Certificate of Healthcare Revenue Cycle Mastery.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white dark:bg-stone-950 text-emerald-850 dark:text-emerald-300 border-2 border-emerald-500 dark:border-emerald-500/40 font-mono shadow-xs flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Best Exam: {progress.quizBestScore}%
            </span>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap gap-2.5 mt-6 pt-6 border-t-2 border-dashed border-stone-300 dark:border-stone-800">
          <button
            type="button"
            onClick={() => {
              setMode('practice');
              setShowReview(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-2 ${
              mode === 'practice'
                ? 'bg-amber-800 text-white shadow-md ring-2 ring-amber-500/60'
                : 'bg-white hover:bg-stone-100 text-stone-800 border-2 border-stone-300 dark:bg-stone-900 dark:hover:bg-stone-850 dark:text-stone-300 dark:border-stone-700 dark:hover:text-white'
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
                : 'bg-white hover:bg-stone-100 text-stone-800 border-2 border-stone-300 dark:bg-stone-900 dark:hover:bg-stone-850 dark:text-stone-300 dark:border-stone-700 dark:hover:text-white'
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
                    ? 'bg-emerald-700 text-white font-bold ring-2 ring-emerald-500/50 shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-stone-800 border-2 border-stone-300 dark:bg-stone-900 dark:hover:bg-stone-850 dark:text-stone-300 dark:border-stone-700 dark:hover:text-white font-medium'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Question Card — Dual Mode High Visibility */}
          <div className="bg-white dark:bg-stone-900/95 rounded-3xl p-6 sm:p-8 border-2 border-stone-300 dark:border-stone-700 shadow-lg dark:shadow-2xl space-y-6">
            {/* Question Header Strip */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-stone-200 dark:border-stone-800 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-400 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700/60 shadow-xs">
                  Question {currentPracticeIdx + 1} of {filteredPracticeQuestions.length}
                </span>
                <span className="text-xs font-mono text-amber-800 dark:text-amber-400 font-bold uppercase tracking-wider">
                  {activePracticeQuestion.category}
                </span>
              </div>
              <span className="text-xs font-mono text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 px-2.5 py-0.5 rounded capitalize font-medium">
                {activePracticeQuestion.difficulty} Level
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
              {activePracticeQuestion.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {activePracticeQuestion.options.map((opt, optIdx) => {
                const userChoice = selectedPracticeAnswers[activePracticeQuestion.id];
                const isRevealed = revealedPractice[activePracticeQuestion.id];
                const isSelected = userChoice === optIdx;
                const isCorrect = optIdx === activePracticeQuestion.correctIndex;

                let optionStyle = 'bg-stone-50 hover:bg-amber-50/50 border-2 border-stone-300 text-stone-900 hover:border-amber-600 dark:bg-stone-850 dark:hover:bg-stone-800 dark:border-stone-700 dark:text-stone-100 dark:hover:border-amber-500/70';
                let letterStyle = 'bg-white border-2 border-stone-300 text-stone-800 dark:bg-stone-800 dark:border-2 dark:border-stone-600 dark:text-stone-200';

                if (isRevealed) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-100 border-2 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/50 shadow-sm dark:bg-emerald-950/80 dark:border-emerald-500 dark:text-emerald-100';
                    letterStyle = 'bg-emerald-700 text-white border-2 border-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-100 border-2 border-rose-600 text-rose-950 font-bold ring-2 ring-rose-500/50 shadow-sm dark:bg-rose-950/80 dark:border-rose-500 dark:text-rose-100';
                    letterStyle = 'bg-rose-700 text-white border-2 border-rose-500';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-amber-100 border-2 border-amber-600 text-amber-950 font-bold ring-2 ring-amber-500/50 shadow-sm dark:bg-amber-950/70 dark:border-amber-500 dark:text-amber-100';
                  letterStyle = 'bg-amber-800 text-white border-2 border-amber-500';
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
                    <span className="flex-1 text-sm sm:text-base leading-relaxed font-sans">
                      {opt}
                    </span>
                    {isRevealed && isCorrect && (
                      <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isRevealed && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Rationale Explanation Box */}
            {revealedPractice[activePracticeQuestion.id] && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-stone-900 dark:bg-emerald-950/40 dark:border-emerald-600/70 dark:text-stone-100 space-y-1.5 shadow-xs animate-fadeIn">
                <span className="font-serif font-bold text-sm text-emerald-800 dark:text-emerald-300 block flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Authoritative RCM Clinical & Billing Rationale:
                </span>
                <p className="text-xs sm:text-sm font-sans leading-relaxed text-stone-800 dark:text-stone-200">
                  {activePracticeQuestion.explanation}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-stone-200 dark:border-stone-800">
              <button
                type="button"
                disabled={currentPracticeIdx === 0}
                onClick={() => setCurrentPracticeIdx(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border-2 border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-750 text-xs font-serif font-bold dark:text-stone-200 dark:border-stone-700 disabled:opacity-40 transition-colors"
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
          {/* STEP 1: PRE-EXAM SETUP SCREEN */}
          {!examStarted && !examFinished && (
            <div className="bg-white dark:bg-stone-900/95 rounded-3xl p-8 border-2 border-stone-300 dark:border-stone-700 shadow-xl dark:shadow-2xl text-center max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 border-2 border-amber-400 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-600/50 flex items-center justify-center mx-auto shadow-inner">
                <GraduationCap className="w-9 h-9" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  RCMclaim Professional Certification Exam
                </h2>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans mt-2 leading-relaxed">
                  Simulates a formal healthcare revenue cycle credentialing test. Answer 25 questions across coding, CMS-1500 & UB-04 claim forms, Medicare guidelines, modifiers, and denial recovery scenarios within 25 minutes. A passing score of 80% or higher awards your official printable certificate.
                </p>
              </div>

              <div className="max-w-sm mx-auto text-left">
                <label className="block text-xs font-serif font-bold text-stone-800 dark:text-stone-200 mb-1.5">
                  Candidate Name (For Official Certificate):
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border-2 border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-serif text-sm focus:border-amber-600 dark:focus:border-amber-500 focus:outline-none shadow-inner"
                  placeholder="Enter full legal name..."
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs max-w-md mx-auto pt-2">
                <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-950 border-2 border-stone-300 dark:border-stone-800 text-center">
                  <div className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">25 Questions</div>
                  <div className="text-[11px] font-mono text-stone-600 dark:text-stone-400">Randomized Bank</div>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-950 border-2 border-stone-300 dark:border-stone-800 text-center">
                  <div className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">25 Minutes</div>
                  <div className="text-[11px] font-mono text-stone-600 dark:text-stone-400">Timed Countdown</div>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-950 border-2 border-stone-300 dark:border-stone-800 text-center">
                  <div className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">80% to Pass</div>
                  <div className="text-[11px] font-mono text-stone-600 dark:text-stone-400">20 / 25 Correct</div>
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
              <div className="lg:col-span-8 bg-white dark:bg-stone-900/95 rounded-3xl p-6 sm:p-8 border-2 border-stone-300 dark:border-stone-700 shadow-xl dark:shadow-2xl space-y-6">
                {/* Header with Question Number, Flag, and High-Contrast Timer */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-stone-200 dark:border-stone-800 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700/60 shadow-xs">
                      Question {currentExamIdx + 1} of {examQuestions.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleFlag(examQuestions[currentExamIdx].id)}
                      className={`flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-xl border-2 transition-all ${
                        flaggedQuestions.includes(examQuestions[currentExamIdx].id)
                          ? 'bg-amber-200 text-amber-950 border-amber-500 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-600'
                          : 'bg-stone-100 text-stone-700 border-stone-300 hover:text-amber-700 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700 dark:hover:text-amber-400'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{flaggedQuestions.includes(examQuestions[currentExamIdx].id) ? 'Flagged' : 'Flag Question'}</span>
                    </button>
                  </div>

                  {/* High Contrast Countdown Timer */}
                  <div className="flex items-center gap-2 font-mono text-sm font-bold text-rose-800 bg-rose-100 border-2 border-rose-300 dark:text-rose-200 dark:bg-rose-950/80 dark:border-rose-800/80 px-3.5 py-1.5 rounded-xl shadow-xs">
                    <Clock className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>{formatTimer(timeLeft)}</span>
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-base sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
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
                            ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold ring-2 ring-amber-500/50 shadow-sm dark:bg-amber-950/70 dark:border-amber-500 dark:text-amber-100'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-300 text-stone-900 dark:bg-stone-850 dark:hover:bg-stone-800 dark:border-stone-700 dark:text-stone-100 hover:border-amber-500'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected 
                            ? 'bg-amber-800 text-white border-2 border-amber-500' 
                            : 'bg-white border-2 border-stone-300 text-stone-800 dark:bg-stone-800 dark:border-stone-600 dark:text-stone-200'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 text-sm sm:text-base leading-relaxed font-sans">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-stone-200 dark:border-stone-800">
                  <button
                    type="button"
                    disabled={currentExamIdx === 0}
                    onClick={() => setCurrentExamIdx(prev => Math.max(0, prev - 1))}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border-2 border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-750 text-xs font-serif font-bold dark:text-stone-200 dark:border-stone-700 disabled:opacity-40 transition-colors"
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
              <div className="lg:col-span-4 bg-white dark:bg-stone-900/95 rounded-3xl p-6 border-2 border-stone-300 dark:border-stone-700 shadow-xl dark:shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                  <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    Question Navigator
                  </h4>
                  <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">
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
                            ? 'ring-2 ring-amber-500 border-amber-500 text-amber-900 bg-amber-100 dark:ring-amber-400 dark:border-amber-400 dark:text-amber-300 dark:bg-amber-950/60'
                            : isAnswered
                            ? 'bg-emerald-600 text-white border-emerald-700 dark:bg-emerald-800 dark:border-emerald-600 shadow-xs'
                            : 'bg-stone-100 text-stone-700 border-stone-300 hover:border-stone-400 dark:bg-stone-850 dark:text-stone-300 dark:border-stone-700 dark:hover:border-stone-500'
                        }`}
                      >
                        {idx + 1}
                        {isFlagged && (
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute top-1 right-1 shadow-sm" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t-2 border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                  <button
                    type="button"
                    onClick={handleFinishExam}
                    className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-serif font-bold text-xs shadow-lg transition-colors"
                  >
                    Finish & Submit Exam
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: RESULTS, REVIEW & HIGHLY AUTHENTIC CERTIFICATE */}
          {examFinished && (
            <div className="space-y-8">
              {/* Summary Score Card */}
              <div className="bg-white dark:bg-stone-900/95 rounded-3xl p-6 sm:p-8 border-2 border-stone-300 dark:border-stone-700 shadow-xl dark:shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      examPassed 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-400 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-500/50' 
                        : 'bg-rose-100 text-rose-900 border border-rose-400 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-500/50'
                    }`}>
                      {examPassed ? 'EXAM PASSED (CERTIFIED PROFESSIONAL)' : 'DID NOT PASS (RETRY AVAILABLE)'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    Final Examination Results: {examScorePercent}%
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans mt-1">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{correctExamAnswers} Correct</span> • <span className="font-bold text-rose-700 dark:text-rose-400">{wrongExamAnswers} Incorrect</span> • Total {totalExamQuestions} Questions (Passing mark: 80%).
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Detailed Question Review Button */}
                  <button
                    type="button"
                    onClick={() => setShowReview(prev => !prev)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-serif font-bold border-2 transition-all flex items-center gap-2 shadow-sm ${
                      showReview
                        ? 'bg-amber-800 text-white border-amber-700'
                        : 'bg-indigo-700 hover:bg-indigo-600 text-white border-indigo-600'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{showReview ? 'Hide Exam Review' : 'Review Questions (Right vs Wrong)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border-2 border-stone-300 dark:bg-stone-800 dark:hover:bg-stone-750 text-xs font-serif font-bold dark:text-stone-200 dark:border-stone-700 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" /> Retake Exam
                  </button>

                  {examPassed && (
                    <button
                      type="button"
                      onClick={handlePrintCertificate}
                      className="px-5 py-2.5 rounded-xl skeuo-btn-primary text-white text-xs font-serif font-bold shadow-lg flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" /> Print / Save Diploma
                    </button>
                  )}
                </div>
              </div>

              {/* ================================================================= */}
              {/* INTERACTIVE QUESTION-BY-QUESTION REVIEW PANEL (RIGHT VS WRONG)   */}
              {/* ================================================================= */}
              {showReview && (
                <div className="bg-white dark:bg-stone-900/95 rounded-3xl p-6 sm:p-8 border-2 border-amber-600/50 shadow-2xl space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-stone-200 dark:border-stone-800">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                        <span>🔍 Examination Answer Key & Performance Analysis</span>
                      </h3>
                      <p className="text-xs text-stone-700 dark:text-stone-300 mt-1">
                        Compare your chosen answers against the correct standard and study the clinical/regulatory rationales.
                      </p>
                    </div>

                    {/* Filter Tabs for Quick Review */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setReviewFilter('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                          reviewFilter === 'all'
                            ? 'bg-amber-800 text-white shadow-xs'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                        }`}
                      >
                        All ({examQuestions.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('wrong')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                          reviewFilter === 'wrong'
                            ? 'bg-rose-700 text-white shadow-xs'
                            : 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-900'
                        }`}
                      >
                        ❌ Incorrect ({wrongExamAnswers})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('correct')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                          reviewFilter === 'correct'
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-900'
                        }`}
                      >
                        ✅ Correct ({correctExamAnswers})
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewFilter('flagged')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all ${
                          reviewFilter === 'flagged'
                            ? 'bg-amber-700 text-white shadow-xs'
                            : 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-900'
                        }`}
                      >
                        🚩 Flagged ({flaggedQuestions.length})
                      </button>
                    </div>
                  </div>

                  {/* Filtered Question Cards */}
                  <div className="space-y-6">
                    {reviewFilteredQuestions.map((q, idx) => {
                      const userChoice = examAnswers[q.id];
                      const isCorrect = userChoice === q.correctIndex;
                      const hasAnswered = userChoice !== undefined;
                      const isFlagged = flaggedQuestions.includes(q.id);

                      return (
                        <div
                          key={q.id}
                          className={`p-5 sm:p-6 rounded-2xl border-2 transition-all space-y-4 ${
                            isCorrect
                              ? 'bg-emerald-50/40 dark:bg-emerald-950/15 border-emerald-500/70'
                              : 'bg-rose-50/40 dark:bg-rose-950/15 border-rose-500/70'
                          }`}
                        >
                          {/* Question Badge Strip */}
                          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                                isCorrect
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-400 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-rose-100 text-rose-900 border-rose-400 dark:bg-rose-950 dark:text-rose-300'
                              }`}>
                                {isCorrect ? '✅ CORRECT (+1)' : '❌ INCORRECT (0)'}
                              </span>

                              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 uppercase">
                                Question {examQuestions.findIndex(eq => eq.id === q.id) + 1} of {examQuestions.length}
                              </span>

                              <span className="text-xs font-mono text-stone-600 dark:text-stone-400">
                                • {q.category}
                              </span>
                            </div>

                            {isFlagged && (
                              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                                <Flag className="w-3 h-3" /> Flagged during exam
                              </span>
                            )}
                          </div>

                          {/* Question Prompt */}
                          <h4 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 leading-relaxed">
                            {q.question}
                          </h4>

                          {/* 4 Options with User Selection vs Correct Answer Highlight */}
                          <div className="space-y-2.5">
                            {q.options.map((opt, optIdx) => {
                              const isThisUserChoice = userChoice === optIdx;
                              const isThisCorrect = optIdx === q.correctIndex;

                              let optCardStyle = 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 opacity-80';
                              let badgeContent = null;

                              if (isThisUserChoice && isThisCorrect) {
                                optCardStyle = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/50 dark:bg-emerald-950/80 dark:border-emerald-500 dark:text-emerald-100';
                                badgeContent = (
                                  <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                                    <Check className="w-4 h-4" /> Your Selection (Correct)
                                  </span>
                                );
                              } else if (isThisUserChoice && !isThisCorrect) {
                                optCardStyle = 'bg-rose-100 border-rose-600 text-rose-950 font-bold ring-2 ring-rose-500/50 dark:bg-rose-950/80 dark:border-rose-500 dark:text-rose-100';
                                badgeContent = (
                                  <span className="text-xs font-mono font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                                    <X className="w-4 h-4" /> Your Selection (Incorrect)
                                  </span>
                                );
                              } else if (isThisCorrect) {
                                optCardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold border-dashed border-2 dark:bg-emerald-950/50 dark:border-emerald-500 dark:text-emerald-200';
                                badgeContent = (
                                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                    ★ Correct Answer
                                  </span>
                                );
                              }

                              return (
                                <div
                                  key={optIdx}
                                  className={`p-3.5 rounded-xl border-2 flex items-start justify-between gap-3 text-xs sm:text-sm ${optCardStyle}`}
                                >
                                  <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 bg-black/10 dark:bg-white/10">
                                      {String.fromCharCode(65 + optIdx)}
                                    </span>
                                    <span className="leading-relaxed font-sans">{opt}</span>
                                  </div>
                                  {badgeContent && <div className="shrink-0">{badgeContent}</div>}
                                </div>
                              );
                            })}
                          </div>

                          {/* Authoritative RCM Clinical & Regulatory Rationale */}
                          <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800/60 text-xs sm:text-sm space-y-1">
                            <span className="font-serif font-bold text-amber-900 dark:text-amber-300 block flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                              Authoritative Clinical & Billing Rationale:
                            </span>
                            <p className="text-stone-800 dark:text-stone-200 font-sans leading-relaxed">
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Return Button */}
                  <div className="pt-4 border-t-2 border-stone-200 dark:border-stone-800 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowReview(false)}
                      className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-serif font-bold text-xs shadow-md transition-all"
                    >
                      Close Review & View Diploma
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* AUTHENTIC OFFICIAL HEALTHCARE CREDENTIAL DIPLOMA (MUSEUM GRADE)           */}
              {/* ========================================================================= */}
              {examPassed && (
                <div className="print:m-0 print:p-0 relative max-w-4xl mx-auto">
                  {/* Outer Frame with Double Gold Foil and Classical Guilloche Pattern */}
                  <div className="bg-[#fffef9] dark:bg-[#181512] text-stone-900 dark:text-stone-100 rounded-3xl p-6 sm:p-12 border-8 border-double border-[#b8860b] relative shadow-2xl overflow-hidden transition-colors">
                    
                    {/* Watermark Crest in Background */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] dark:opacity-[0.07]">
                      <img src="/rcmclaim-logo.png" alt="" className="w-96 h-96 object-contain" />
                    </div>

                    {/* Corner Ornate Brass Accents */}
                    <div className="absolute top-2 left-2 text-[#b8860b] font-serif text-lg pointer-events-none select-none">⚜</div>
                    <div className="absolute top-2 right-2 text-[#b8860b] font-serif text-lg pointer-events-none select-none">⚜</div>
                    <div className="absolute bottom-2 left-2 text-[#b8860b] font-serif text-lg pointer-events-none select-none">⚜</div>
                    <div className="absolute bottom-2 right-2 text-[#b8860b] font-serif text-lg pointer-events-none select-none">⚜</div>

                    <div className="text-center space-y-4 relative z-10">
                      {/* Top Institutional Crest */}
                      <div className="flex justify-center mb-1">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-700 shadow-xl border-2 border-amber-500/80 flex items-center justify-center">
                          <img 
                            src="/rcmclaim-logo.png" 
                            alt="Academy Insignia" 
                            className="w-full h-full rounded-full object-cover bg-stone-950 p-1"
                          />
                        </div>
                      </div>

                      {/* Header Institutional Text */}
                      <div className="space-y-1">
                        <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8c6218] dark:text-amber-400 font-bold">
                          AMERICAN ACADEMY OF HEALTHCARE REVENUE GOVERNANCE
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-stone-600 dark:text-stone-400 uppercase">
                          BOARD OF CERTIFICATION & REVENUE CYCLE MASTERY • NATIONAL REGISTRY OF SPECIALISTS
                        </div>
                      </div>

                      {/* Diploma Title */}
                      <div className="py-2">
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-[#2c1d0c] dark:text-[#f8f5ee] uppercase drop-shadow-xs">
                          Certificate of Mastery
                        </h1>
                        <p className="text-xs sm:text-sm font-mono tracking-widest text-[#a17822] dark:text-amber-300 uppercase mt-1 font-bold">
                          CERTIFIED REVENUE CYCLE PROFESSIONAL (CRCP™)
                        </p>
                      </div>

                      {/* Formal Conferral Legal Statement */}
                      <p className="text-[11px] sm:text-xs text-stone-700 dark:text-stone-300 max-w-2xl mx-auto font-serif italic leading-relaxed">
                        Be it known to all that the Candidate named herein, having successfully fulfilled all academic prerequisites and demonstrated comprehensive theoretical and operational mastery through standardized credentialing examination across the complete Ten-Stage Revenue Cycle Lifecycle, ANSI X12 EDI Transactions, CMS-1500 & UB-04 Claim Adjudication, NCCI Edits, and Denial Recovery Appeals, is hereby awarded this official credential:
                      </p>

                      {/* Recipient Candidate Name */}
                      <div className="py-4">
                        <div className="text-[10px] text-stone-600 dark:text-stone-400 uppercase tracking-[0.3em] font-mono font-bold">
                          PROUDLY CONFERRED UPON
                        </div>
                        <div className="text-3xl sm:text-5xl font-serif italic font-black text-[#5c3e10] dark:text-amber-300 mt-2 border-b-2 border-[#b8860b]/60 pb-2 inline-block px-8 sm:px-14 tracking-wide shadow-xs">
                          {studentName}
                        </div>
                      </div>

                      {/* Certification Verification Credentials Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left pt-3 border-t-2 border-dashed border-[#b8860b]/30 text-xs">
                        <div>
                          <span className="text-[9px] font-mono text-stone-600 dark:text-stone-400 uppercase block font-bold">CREDENTIAL NUMBER</span>
                          <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">RCM-CRCP-2026</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-stone-600 dark:text-stone-400 uppercase block font-bold">VERIFIED GRADE</span>
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">{examScorePercent}% (Honors)</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-stone-600 dark:text-stone-400 uppercase block font-bold">CEU CREDITS</span>
                          <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">24.0 CEU Units</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-stone-600 dark:text-stone-400 uppercase block font-bold">ISSUE DATE</span>
                          <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">{new Date().toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Security Barcode & Two Institutional Signatures */}
                      <div className="pt-6 border-t-2 border-stone-300 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
                        {/* Signature 1 */}
                        <div className="text-center sm:text-left space-y-1">
                          <div className="font-serif italic text-base sm:text-lg text-stone-800 dark:text-stone-200 border-b border-stone-400 dark:border-stone-600 pb-1">
                            Dr. Meredith Vance, MD, FHFMA
                          </div>
                          <span className="text-[9px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 block font-bold">
                            Dean of Clinical Revenue Operations
                          </span>
                        </div>

                        {/* Center Security Barcode & Seal */}
                        <div className="text-center space-y-1">
                          <div className="font-mono tracking-[0.2em] text-[10px] text-stone-800 dark:text-stone-300 font-bold select-none">
                            |||| ||| ||||| || | |||| ||| |||||
                          </div>
                          <span className="text-[8px] font-mono text-stone-500 uppercase block">
                            AUTHENTIC ELECTRONIC VERIFICATION
                          </span>
                        </div>

                        {/* Signature 2 */}
                        <div className="text-center sm:text-right space-y-1">
                          <div className="font-serif italic text-base sm:text-lg text-stone-800 dark:text-stone-200 border-b border-stone-400 dark:border-stone-600 pb-1">
                            Jonathan Sterling, CPB, CPC-I
                          </div>
                          <span className="text-[9px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 block font-bold">
                            Chairperson, Board of Claim Appeals
                          </span>
                        </div>
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
