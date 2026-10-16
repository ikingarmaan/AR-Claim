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

const MainLayout: React.FC = () => {
  const { activeModule, setActiveModule, completionPercentage } = useAcademy();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [birthdayModalOpen, setBirthdayModalOpen] = useState(false);
  const [arNoteModalOpen, setArNoteModalOpen] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'curriculum' | 'pipeline' | 'comic' | 'tools'>('curriculum');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-health-darkBg text-slate-800 dark:text-slate-100 flex transition-colors">
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
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 mx-auto w-full ${activeModule === 'claim-forms' ? 'max-w-[1720px]' : 'max-w-7xl'}`}>
          {activeModule === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Clean Welcome & Academy Mission Hub */}
              <div className="bg-white dark:bg-health-darkCard border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        US Healthcare Billing & AR Curriculum
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {completionPercentage}% Completed
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      RCM & US Medical AR Academy
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Master the complete end-to-end US healthcare revenue cycle: patient registration, 270/271 eligibility, CMS-1500 & UB-04 claim forms, modifiers, CARC/RARC denials, and live AR payer telephone follow-up.
                    </p>
                  </div>

                  {/* Quick Action Badges */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveModule('claim-forms')}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-xs flex items-center justify-between gap-3"
                    >
                      <span>📑 Claim Forms Studio (CMS-1500 & UB-04)</span>
                      <span className="text-[10px] bg-emerald-700 px-1.5 py-0.5 rounded">All Boxes</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModule('quiz-engine')}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-xs flex items-center justify-between gap-3"
                    >
                      <span>🎓 Take Certification Exam</span>
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">40+ MCQs</span>
                    </button>
                  </div>
                </div>

                {/* Dashboard Section Switcher Tabs */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setDashboardTab('curriculum')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      dashboardTab === 'curriculum'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    📚 1. Core Curriculum (8 Modules)
                  </button>

                  <button
                    type="button"
                    onClick={() => setDashboardTab('pipeline')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      dashboardTab === 'pipeline'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    🔄 2. Animated Revenue Cycle Pipeline (8 Stages)
                  </button>

                  <button
                    type="button"
                    onClick={() => setDashboardTab('comic')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      dashboardTab === 'comic'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    🎨 3. Claimy's Comic Adventure (7 Episodes)
                  </button>

                  <button
                    type="button"
                    onClick={() => setDashboardTab('tools')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      dashboardTab === 'tools'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    🛠️ 4. Quick AR Tools & Calculators
                  </button>
                </div>
              </div>

              {/* TAB 1: CURRICULUM MODULES */}
              {dashboardTab === 'curriculum' && (
                <div className="space-y-6">
                  {/* Quick Stats Grid */}
                  <QuickStats />

                  {/* Flagship Highlight Banner for Claim Forms Studio */}
                  <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-2 border-emerald-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white">
                        Special Feature
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        Complete CMS-1500 & UB-04 Sample Forms Studio
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                        Click on realistic authentic sample claim documents to inspect all 33 CMS-1500 boxes and 81 UB-04 hospital Form Locators with real patient data, EDI 837 mappings, and denial rules.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModule('claim-forms')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm shrink-0"
                    >
                      Open Claim Forms Studio →
                    </button>
                  </div>

                  {/* Curriculum Action Hub */}
                  <ActionHub />
                </div>
              )}

              {/* TAB 2: ANIMATED REVENUE CYCLE PIPELINE */}
              {dashboardTab === 'pipeline' && (
                <div>
                  <RevenueCyclePipeline />
                </div>
              )}

              {/* TAB 3: CLAIMY'S COMIC ADVENTURE */}
              {dashboardTab === 'comic' && (
                <div>
                  <ClaimyJourneyComic />
                </div>
              )}

              {/* TAB 4: AR TOOLS */}
              {dashboardTab === 'tools' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-health-darkCard p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="text-xs font-black uppercase text-blue-600">Calculator</div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">The Birthday Rule Calculator</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Determine primary vs secondary insurance for dependent children covered under dual parent commercial health plans.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBirthdayModalOpen(true)}
                      className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                    >
                      Launch Calculator
                    </button>
                  </div>

                  <div className="bg-white dark:bg-health-darkCard p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="text-xs font-black uppercase text-emerald-600">Documentation</div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">6-Point AR Audit Note Sandbox</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Format industry-standard audit notes with Call Reference #, Rep Name, Claims Address, Timely Limits, and Action Plans.
                    </p>
                    <button
                      type="button"
                      onClick={() => setArNoteModalOpen(true)}
                      className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                    >
                      Open Note Builder
                    </button>
                  </div>

                  <div className="bg-white dark:bg-health-darkCard p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="text-xs font-black uppercase text-purple-600">Telephonic Skills</div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">NATO Phonetic Audio Trainer</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Convert alphanumeric member IDs, claim numbers, and check numbers into crystal-clear NATO phonetics with text-to-speech.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveModule('call-scripts')}
                      className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
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
        <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-4 text-center text-xs text-slate-400 dark:text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>RCM & US Medical AR Academy • Comprehensive US Healthcare Billing & AR Curriculum</span>
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={() => setBirthdayModalOpen(true)}
                className="hover:text-health-electric transition-colors"
              >
                Birthday Rule Calculator
              </button>
              <button 
                type="button" 
                onClick={() => setArNoteModalOpen(true)}
                className="hover:text-health-electric transition-colors"
              >
                AR Note Builder
              </button>
            </div>
          </div>
        </footer>
      </div>

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
