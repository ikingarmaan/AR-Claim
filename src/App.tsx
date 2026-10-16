import React, { useState } from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { SearchModal } from './components/layout/SearchModal';
import { BirthdayRuleModal } from './components/tools/BirthdayRuleModal';
import { ArNoteModal } from './components/tools/ArNoteModal';
import { BookmarksDrawer } from './components/tools/BookmarksDrawer';

// Dashboard Components
import { ClaimyJourneyComic } from './components/dashboard/ClaimyJourneyComic';
import { RevenueCyclePipeline } from './components/dashboard/RevenueCyclePipeline';
import { QuickStats } from './components/dashboard/QuickStats';
import { ActionHub } from './components/dashboard/ActionHub';

// Module Components
import { Module1Foundations } from './components/modules/Module1Foundations';
import { Module2ClaimForms } from './components/modules/Module2ClaimForms';
import { Module3InsurancePayer } from './components/modules/Module3InsurancePayer';
import { Module4CodingModifiers } from './components/modules/Module4CodingModifiers';
import { Module5ArAnalytics } from './components/modules/Module5ArAnalytics';
import { Module6ArPlaybook } from './components/modules/Module6ArPlaybook';
import { Module7CallScripts } from './components/modules/Module7CallScripts';
import { Module8QuizEngine } from './components/modules/Module8QuizEngine';

// Icons for spatial mobile dock & categories
import { 
  FileCheck2, 
  Activity, 
  Code2, 
  PhoneForwarded, 
  GraduationCap, 
  Sparkles,
  BookOpen,
  Headphones,
  BarChart3,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeModule, setActiveModule, completionPercentage } = useAcademy();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [birthdayModalOpen, setBirthdayModalOpen] = useState(false);
  const [arNoteModalOpen, setArNoteModalOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'pipeline' | 'forms' | 'curriculum' | 'comic' | 'tools'>('pipeline');

  // Determine current active high-level category
  const getCurrentCategory = (): 'forms' | 'pipeline' | 'coding' | 'ar-lab' | 'exam' => {
    if (activeModule === 'claim-forms') return 'forms';
    if (activeModule === 'dashboard' || activeModule === 'foundations') return 'pipeline';
    if (activeModule === 'coding-modifiers') return 'coding';
    if (activeModule === 'quiz-engine') return 'exam';
    return 'ar-lab';
  };

  const activeCategory = getCurrentCategory();

  const handleCategorySelect = (cat: 'forms' | 'pipeline' | 'coding' | 'ar-lab' | 'exam') => {
    switch (cat) {
      case 'forms':
        setActiveModule('claim-forms');
        break;
      case 'pipeline':
        setActiveModule('dashboard');
        break;
      case 'coding':
        setActiveModule('coding-modifiers');
        break;
      case 'ar-lab':
        setActiveModule('ar-playbook');
        break;
      case 'exam':
        setActiveModule('quiz-engine');
        break;
    }
  };

  return (
    <div className="min-h-screen spatial-mesh-bg text-slate-800 dark:text-slate-100 flex transition-colors relative overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        mobileOpen={mobileSidebarOpen} 
        onCloseMobile={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* Persistent Top Header */}
        <Header 
          onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          onOpenQuickTools={() => setBirthdayModalOpen(true)}
        />

        {/* Dynamic Page Views */}
        <main className={`flex-1 p-3 sm:p-5 lg:p-6 mx-auto w-full pb-24 lg:pb-8 ${activeModule === 'claim-forms' ? 'max-w-full 2xl:max-w-[1920px]' : 'max-w-7xl'}`}>
          {/* Sub-navigation bar when inside AR Lab modules */}
          {(activeModule === 'ar-playbook' || activeModule === 'call-scripts' || activeModule === 'ar-analytics' || activeModule === 'insurance-payers') && (
            <div className="mb-5 glass-spatial p-2 rounded-2xl flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 pl-2">
                <PhoneForwarded className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  AR Denials & Payer Lab:
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveModule('ar-playbook')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeModule === 'ar-playbook'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  14 Decision Trees
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModule('call-scripts')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    activeModule === 'call-scripts'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Call Audio & NATO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModule('ar-analytics')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeModule === 'ar-analytics'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  AR Aging & Notes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModule('insurance-payers')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeModule === 'insurance-payers'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Payers & Birthday Rule
                </button>
              </div>
            </div>
          )}

          {activeModule === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Spatial Welcome & Mission Hero Card */}
              <div className="glass-spatial rounded-3xl p-5 sm:p-8 relative overflow-hidden border border-white/80 dark:border-white/10 shadow-spatial">
                {/* Glowing background auras */}
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                        Spatial US Healthcare Billing & AR
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {completionPercentage}% Completed
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-1">
                      <span>RCM</span>
                      <span className="text-emerald-500">claim</span>
                      <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-sans tracking-normal ml-2">
                        Studio
                      </span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Interactive spatial environment for mastering the complete US healthcare revenue cycle: patient registration, 270/271 eligibility, CMS-1500 & UB-04 sample claim forms with all boxes, modifiers, CARC/RARC denials, and live AR telephone follow-up.
                    </p>
                  </div>

                  {/* Primary Spatial Fast Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveModule('claim-forms')}
                      className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md shadow-emerald-600/25 flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Claim Forms Studio</span>
                      </div>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-lg font-mono">
                        CMS-1500 & UB-04
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveModule('quiz-engine')}
                      className="px-5 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Certification Exam</span>
                      </div>
                      <span className="text-[10px] bg-white/20 dark:bg-slate-900/20 px-2 py-0.5 rounded-lg">
                        40+ MCQs
                      </span>
                    </button>
                  </div>
                </div>

                {/* Categorized Workspace Quick Switcher */}
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-200/60 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setDashboardTab('pipeline')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      dashboardTab === 'pipeline'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-white/5'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>1. 8-Stage RCM Pipeline</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModule('claim-forms')}
                    className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/50 dark:border-white/5"
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>2. Claim Forms Studio (All Boxes)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDashboardTab('curriculum')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      dashboardTab === 'curriculum'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-white/5'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>3. Curriculum Modules</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDashboardTab('comic')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      dashboardTab === 'comic'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-white/5'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>4. Claimy's Comic Adventure</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDashboardTab('tools')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      dashboardTab === 'tools'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-white/5'
                    }`}
                  >
                    <span>🛠️ 5. AR Tools & Note Builder</span>
                  </button>
                </div>
              </div>

              {/* SECTION: 8-STAGE ANIMATED REVENUE CYCLE PIPELINE */}
              {dashboardTab === 'pipeline' && (
                <div className="space-y-6">
                  {/* Flagship Highlight Banner for Claim Forms Studio */}
                  <div className="glass-spatial-card rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-500/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white">
                          Flagship Feature
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          Interactive Claim Inspections
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        Complete CMS-1500 & UB-04 Sample Forms Studio
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                        Click on realistic authentic sample claim documents to inspect all 33 CMS-1500 boxes and 81 UB-04 hospital Form Locators with real patient data, EDI 837 mappings, and denial prevention rules.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModule('claim-forms')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs shrink-0 flex items-center gap-2"
                    >
                      <span>Launch Forms Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <RevenueCyclePipeline />
                  <QuickStats />
                </div>
              )}

              {/* SECTION: CURRICULUM MODULES */}
              {dashboardTab === 'curriculum' && (
                <div className="space-y-6">
                  <QuickStats />
                  <ActionHub />
                </div>
              )}

              {/* SECTION: CLAIMY'S COMIC ADVENTURE */}
              {dashboardTab === 'comic' && (
                <div>
                  <ClaimyJourneyComic />
                </div>
              )}

              {/* SECTION: AR TOOLS */}
              {dashboardTab === 'tools' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="glass-spatial-card p-6 rounded-3xl space-y-3">
                    <div className="text-[11px] font-black uppercase text-cyan-600">Calculator</div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">The Birthday Rule Calculator</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Determine primary vs secondary insurance for dependent children covered under dual parent commercial health plans.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBirthdayModalOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                    >
                      Launch Calculator
                    </button>
                  </div>

                  <div className="glass-spatial-card p-6 rounded-3xl space-y-3">
                    <div className="text-[11px] font-black uppercase text-emerald-600">Documentation</div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">6-Point AR Audit Note Sandbox</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Format industry-standard audit notes with Call Reference #, Rep Name, Claims Address, Timely Limits, and Action Plans.
                    </p>
                    <button
                      type="button"
                      onClick={() => setArNoteModalOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                    >
                      Open Note Builder
                    </button>
                  </div>

                  <div className="glass-spatial-card p-6 rounded-3xl space-y-3">
                    <div className="text-[11px] font-black uppercase text-indigo-600">Telephonic Skills</div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">NATO Phonetic Audio Trainer</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Convert alphanumeric member IDs, claim numbers, and check numbers into crystal-clear NATO phonetics with text-to-speech.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveModule('call-scripts')}
                      className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                    >
                      Practice Call Scripts
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeModule === 'foundations' && <Module1Foundations />}
          {activeModule === 'claim-forms' && <Module2ClaimForms />}
          {activeModule === 'insurance-payers' && <Module3InsurancePayer />}
          {activeModule === 'coding-modifiers' && <Module4CodingModifiers />}
          {activeModule === 'ar-analytics' && <Module5ArAnalytics />}
          {activeModule === 'ar-playbook' && <Module6ArPlaybook />}
          {activeModule === 'call-scripts' && <Module7CallScripts />}
          {activeModule === 'quiz-engine' && <Module8QuizEngine />}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200/60 dark:border-white/10 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="text-slate-900 dark:text-white">RCM</span>
              <span className="text-emerald-500">claim</span>
              <span className="text-slate-400 font-normal">• Spatial US Healthcare Billing & AR Studio</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={() => setBirthdayModalOpen(true)}
                className="hover:text-emerald-500 transition-colors font-medium"
              >
                Birthday Rule Calculator
              </button>
              <button 
                type="button" 
                onClick={() => setArNoteModalOpen(true)}
                className="hover:text-emerald-500 transition-colors font-medium"
              >
                AR Note Builder
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Spatial Mobile Dock (Bottom Thumb Bar) */}
      <nav 
        aria-label="Mobile Navigation"
        className="fixed bottom-3 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-40 glass-dock rounded-2xl p-1.5 flex items-center justify-around shadow-2xl lg:hidden"
      >
        <button
          type="button"
          onClick={() => handleCategorySelect('forms')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeCategory === 'forms'
              ? 'text-emerald-600 dark:text-emerald-400 font-black'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <FileCheck2 className={`w-4 h-4 ${activeCategory === 'forms' ? 'scale-115 text-emerald-500' : ''}`} />
          <span className="text-[10px]">Forms</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategorySelect('pipeline')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeCategory === 'pipeline'
              ? 'text-cyan-600 dark:text-cyan-400 font-black'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Activity className={`w-4 h-4 ${activeCategory === 'pipeline' ? 'scale-115 text-cyan-500' : ''}`} />
          <span className="text-[10px]">Pipeline</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategorySelect('coding')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeCategory === 'coding'
              ? 'text-indigo-600 dark:text-indigo-400 font-black'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Code2 className={`w-4 h-4 ${activeCategory === 'coding' ? 'scale-115 text-indigo-500' : ''}`} />
          <span className="text-[10px]">Coding</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategorySelect('ar-lab')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeCategory === 'ar-lab'
              ? 'text-rose-600 dark:text-rose-400 font-black'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <PhoneForwarded className={`w-4 h-4 ${activeCategory === 'ar-lab' ? 'scale-115 text-rose-500' : ''}`} />
          <span className="text-[10px]">AR Lab</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategorySelect('exam')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeCategory === 'exam'
              ? 'text-amber-600 dark:text-amber-400 font-black'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <GraduationCap className={`w-4 h-4 ${activeCategory === 'exam' ? 'scale-115 text-amber-500' : ''}`} />
          <span className="text-[10px]">Exam</span>
        </button>
      </nav>

      {/* Global Modals & Drawers */}
      <SearchModal />
      <BirthdayRuleModal 
        isOpen={birthdayModalOpen} 
        onClose={() => setBirthdayModalOpen(false)} 
      />
      <ArNoteModal 
        isOpen={arNoteModalOpen} 
        onClose={() => setArNoteModalOpen(false)} 
      />
      <BookmarksDrawer 
        isOpen={bookmarksDrawerOpen} 
        onClose={() => setBookmarksDrawerOpen(false)} 
      />
    </div>
  );
};

export function App() {
  return (
    <AcademyProvider>
      <MainLayout />
    </AcademyProvider>
  );
}

export default App;
