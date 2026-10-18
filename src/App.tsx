import React, { useState } from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { SearchModal } from './components/layout/SearchModal';
import { BirthdayRuleModal } from './components/tools/BirthdayRuleModal';
import { ArNoteModal } from './components/tools/ArNoteModal';
import { BookmarksDrawer } from './components/tools/BookmarksDrawer';

// Dashboard
import { SkeuoDashboard } from './components/dashboard/SkeuoDashboard';

// 10 Sequential RCM Stages
import { Stage1Appointment } from './components/stages/Stage1Appointment';
import { Stage2Eligibility } from './components/stages/Stage2Eligibility';
import { Stage3Registration } from './components/stages/Stage3Registration';
import { Stage4DoctorEncounter } from './components/stages/Stage4DoctorEncounter';
import { Stage5Transcription } from './components/stages/Stage5Transcription';
import { Stage6MedicalCoding } from './components/stages/Stage6MedicalCoding';
import { Stage7ChargeCapturing } from './components/stages/Stage7ChargeCapturing';
import { Stage8ClaimSubmission } from './components/stages/Stage8ClaimSubmission';
import { Stage9PaymentPosting } from './components/stages/Stage9PaymentPosting';
import { Stage10ArFollowUp } from './components/stages/Stage10ArFollowUp';
import { RcmDynamicMindMap } from './components/diagrams/RcmDynamicMindMap';

// Quiz / Certification Exam
import { Module8QuizEngine } from './components/modules/Module8QuizEngine';

// Icons for mobile quick dock
import { 
  Home, 
  UserCheck, 
  Stethoscope, 
  FileCheck2, 
  PhoneCall, 
  GraduationCap,
  Layers,
  Network
} from 'lucide-react';
import { StageId } from './types/rcm';

const MainLayout: React.FC = () => {
  const { activeModule, setActiveModule } = useAcademy();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [birthdayModalOpen, setBirthdayModalOpen] = useState(false);
  const [arNoteModalOpen, setArNoteModalOpen] = useState(false);

  // Render active stage or view
  const renderActiveView = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <SkeuoDashboard 
            onOpenBirthdayModal={() => setBirthdayModalOpen(true)}
            onOpenArNoteModal={() => setArNoteModalOpen(true)}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          />
        );
      case 'appointment':
        return <Stage1Appointment />;
      case 'eligibility':
        return <Stage2Eligibility />;
      case 'registration':
        return <Stage3Registration />;
      case 'encounter':
        return <Stage4DoctorEncounter />;
      case 'transcription':
        return <Stage5Transcription />;
      case 'coding':
        return <Stage6MedicalCoding />;
      case 'charge-capture':
        return <Stage7ChargeCapturing />;
      case 'claim-submission':
        return <Stage8ClaimSubmission />;
      case 'payment-posting':
        return <Stage9PaymentPosting />;
      case 'ar-followup':
        return <Stage10ArFollowUp />;
      case 'mind-map':
        return <RcmDynamicMindMap />;
      case 'quiz-engine':
        return <Module8QuizEngine />;
      default:
        return (
          <SkeuoDashboard 
            onOpenBirthdayModal={() => setBirthdayModalOpen(true)}
            onOpenArNoteModal={() => setArNoteModalOpen(true)}
            onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen skeuo-linen text-stone-900 dark:text-stone-100 flex transition-colors relative overflow-x-hidden">
      {/* Skeuomorphic Binder Sidebar */}
      <Sidebar 
        mobileOpen={mobileSidebarOpen} 
        onCloseMobile={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        {/* Skeuomorphic Leather Header */}
        <Header 
          onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
          onOpenQuickTools={() => setBirthdayModalOpen(true)}
        />

        {/* Dynamic Page Views */}
        <main className={`flex-1 p-3 sm:p-5 lg:p-6 mx-auto w-full pb-24 lg:pb-8 ${activeModule === 'claim-submission' ? 'max-w-full 2xl:max-w-[1920px]' : 'max-w-7xl'}`}>
          {renderActiveView()}
        </main>

        {/* Mobile Bottom Dock (Skeuomorphic Brass Navigation Bar) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-stone-900 via-stone-900/95 to-stone-900/90 text-amber-200 border-t border-amber-900/80 px-2 py-2 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-around text-[10px] font-mono">
            <button
              onClick={() => setActiveModule('dashboard')}
              className={`flex flex-col items-center gap-1 p-1 rounded transition-colors ${
                activeModule === 'dashboard' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Desk</span>
            </button>

            <button
              onClick={() => setActiveModule('appointment')}
              className={`flex flex-col items-center gap-1 p-1 rounded transition-colors ${
                activeModule === 'appointment' || activeModule === 'eligibility' || activeModule === 'registration' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Intake</span>
            </button>

            <button
              onClick={() => setActiveModule('encounter')}
              className={`flex flex-col items-center gap-1 p-1 rounded transition-colors ${
                activeModule === 'encounter' || activeModule === 'transcription' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Clinical</span>
            </button>

            <button
              onClick={() => setActiveModule('claim-submission')}
              className={`flex flex-col items-center gap-1 p-1 rounded transition-colors ${
                activeModule === 'claim-submission' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Forms</span>
            </button>

            <button
              onClick={() => setActiveModule('ar-followup')}
              className={`flex flex-col items-center gap-1 p-1 rounded transition-colors ${
                activeModule === 'ar-followup' || activeModule === 'payment-posting' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>AR</span>
            </button>

            <button
              onClick={() => setActiveModule('mind-map')}
              className={`flex flex-col items-center gap-1 p-1 rounded transition-colors ${
                activeModule === 'mind-map' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Map</span>
            </button>

            <button
              onClick={() => setActiveModule('quiz-engine')}
              className={`flex flex-col items-center gap-1 p-1 rounded transition-colors ${
                activeModule === 'quiz-engine' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Exam</span>
            </button>
          </div>
        </div>

        {/* Skeuomorphic Desk Footer */}
        <footer className="mt-auto border-t border-stone-300 dark:border-stone-800 py-4 px-6 text-center text-xs font-mono text-stone-500 bg-stone-100/50 dark:bg-stone-900/50">
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
            <div className="flex items-center gap-2">
              <img src="/rcmclaim-logo.png" alt="RCMclaim" className="w-5 h-5 rounded-full object-cover border border-amber-600/40" />
              <span>RCMclaim — Skeuomorphic US Healthcare Revenue Cycle Management</span>
            </div>
            <div className="flex items-center gap-3 text-stone-400">
              <span>CMS-1500 (02/12)</span>
              <span>•</span>
              <span>UB-04 (CMS-1450)</span>
              <span>•</span>
              <span>ANSI X12 837 / 835</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Modals & Drawers */}
      <SearchModal />
      <BirthdayRuleModal isOpen={birthdayModalOpen} onClose={() => setBirthdayModalOpen(false)} />
      <ArNoteModal isOpen={arNoteModalOpen} onClose={() => setArNoteModalOpen(false)} />
      <BookmarksDrawer isOpen={bookmarksDrawerOpen} onClose={() => setBookmarksDrawerOpen(false)} />
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
