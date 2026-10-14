import React, { useState } from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { SearchModal } from './components/layout/SearchModal';
import { BirthdayRuleModal } from './components/tools/BirthdayRuleModal';
import { ArNoteModal } from './components/tools/ArNoteModal';
import { BookmarksDrawer } from './components/tools/BookmarksDrawer';

// Dashboard Components
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
  const { activeModule } = useAcademy();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [birthdayModalOpen, setBirthdayModalOpen] = useState(false);
  const [arNoteModalOpen, setArNoteModalOpen] = useState(false);

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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeModule === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Flagship Animated Pipeline */}
              <RevenueCyclePipeline />

              {/* Quick Stats Grid */}
              <QuickStats />

              {/* Curriculum Action Hub */}
              <ActionHub />
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
