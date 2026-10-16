import React, { useState } from 'react';
import { 
  FileCheck2, 
  Building2, 
  Table, 
  ShieldAlert, 
  CheckCircle2, 
  AlertOctagon, 
  Search, 
  Eye, 
  ListFilter, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Award,
  Layers,
  FileText,
  DollarSign
} from 'lucide-react';
import { 
  CMS_1500_BOXES, 
  UB_04_BOXES, 
  SAMPLE_CMS1500_CLAIM, 
  SAMPLE_UB04_CLAIM, 
  FORM_COMPARISONS, 
  AUDIT_TRAPS,
  UB_04_CODES
} from '../../data/claimForms';
import { ClaimBoxDetail, Ub04BoxDetail } from '../../types/rcm';
import { useAcademy } from '../../context/AcademyContext';
import { triggerCelebrationConfetti } from '../common/Confetti';
import { CartoonTip } from '../common/CartoonTip';
import { OfficialFormViewer, FormSectionFilter } from './claim-forms/OfficialFormViewer';


const CMS_SECTIONS: FormSectionFilter<ClaimBoxDetail>[] = [
  { id: 'all', label: 'All 33 Boxes', filter: () => true },
  { 
    id: 'patient', 
    label: 'Patient & Insured (1–13)', 
    filter: (b) => {
      const num = parseInt(b.boxNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 1 && num <= 13;
    }
  },
  { 
    id: 'clinical', 
    label: 'Clinical & Referral (14–23)', 
    filter: (b) => {
      const num = parseInt(b.boxNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 14 && num <= 23;
    }
  },
  { 
    id: 'lines', 
    label: 'Service Lines (24A–J)', 
    filter: (b) => b.boxNumber.startsWith('24')
  },
  { 
    id: 'billing', 
    label: 'Billing & Location (25–33)', 
    filter: (b) => {
      const num = parseInt(b.boxNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 25 && num <= 33;
    }
  },
];

const UB04_SECTIONS: FormSectionFilter<Ub04BoxDetail>[] = [
  { id: 'all', label: 'All 81 Locators', filter: () => true },
  { 
    id: 'facility', 
    label: 'Facility & Patient (FL 01–17)', 
    filter: (b) => {
      const num = parseInt(b.locatorNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 1 && num <= 17;
    }
  },
  { 
    id: 'conditions', 
    label: 'Condition & Occurrence (FL 18–38)', 
    filter: (b) => {
      const num = parseInt(b.locatorNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 18 && num <= 38;
    }
  },
  { 
    id: 'values', 
    label: 'Value Codes & Charges (FL 39–41)', 
    filter: (b) => {
      const num = parseInt(b.locatorNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 39 && num <= 41;
    }
  },
  { 
    id: 'revenue', 
    label: 'Revenue Codes & Lines (FL 42–49)', 
    filter: (b) => {
      const num = parseInt(b.locatorNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 42 && num <= 49;
    }
  },
  { 
    id: 'payers', 
    label: 'Payers & Insurance (FL 50–65)', 
    filter: (b) => {
      const num = parseInt(b.locatorNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 50 && num <= 65;
    }
  },
  { 
    id: 'diagnoses', 
    label: 'Diagnoses & Procedures (FL 66–75)', 
    filter: (b) => {
      const num = parseInt(b.locatorNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 66 && num <= 75;
    }
  },
  { 
    id: 'providers', 
    label: 'Attending & Providers (FL 76–81)', 
    filter: (b) => {
      const num = parseInt(b.locatorNumber.replace(/[^0-9]/g, ''), 10);
      return !isNaN(num) && num >= 76 && num <= 81;
    }
  },
];

export const Module2ClaimForms: React.FC = () => {
  const { progress, markModuleCompleted } = useAcademy();
  const [activeTab, setActiveTab] = useState<'cms1500' | 'ub04' | 'comparison' | 'auditor'>('cms1500');

  // CMS-1500 State
  const [cmsViewMode, setCmsViewMode] = useState<'original' | 'visual' | 'directory'>('original');
  const [cmsSectionFilter, setCmsSectionFilter] = useState<string>('all');
  const [selectedCmsBox, setSelectedCmsBox] = useState<ClaimBoxDetail>(CMS_1500_BOXES.find(b => b.boxNumber === '24D') || CMS_1500_BOXES[0]);
  const [cmsSearch, setCmsSearch] = useState('');
  const [cmsCategoryFilter, setCmsCategoryFilter] = useState<'all' | 'patient' | 'clinical' | 'billing' | 'provider'>('all');

  // UB-04 State
  const [ub04ViewMode, setUb04ViewMode] = useState<'original' | 'visual' | 'directory'>('original');
  const [ub04SectionFilter, setUb04SectionFilter] = useState<string>('all');
  const [selectedUb04Box, setSelectedUb04Box] = useState<Ub04BoxDetail>(UB_04_BOXES.find(b => b.locatorNumber === 'FL 04') || UB_04_BOXES[0]);
  const [ub04Search, setUb04Search] = useState('');
  const [ub04CategoryFilter, setUb04CategoryFilter] = useState<'all' | 'provider' | 'patient' | 'codes' | 'charges' | 'payer' | 'clinical' | 'reserved'>('all');
  const [isWideLayout, setIsWideLayout] = useState<boolean>(false);

  // Auditor Sandbox State
  const [discoveredTraps, setDiscoveredTraps] = useState<string[]>([]);
  const [selectedTrap, setSelectedTrap] = useState<string | null>(null);

  const isCompleted = progress.completedModules.includes('claim-forms');

  // CMS-1500 filtering
  const filteredCmsBoxes = CMS_1500_BOXES.filter(box => {
    const matchesCat = cmsCategoryFilter === 'all' || box.category === cmsCategoryFilter;
    const matchesSearch = cmsSearch === '' || 
      box.boxNumber.toLowerCase().includes(cmsSearch.toLowerCase()) ||
      box.name.toLowerCase().includes(cmsSearch.toLowerCase()) ||
      box.shortName.toLowerCase().includes(cmsSearch.toLowerCase()) ||
      box.sampleValue.toLowerCase().includes(cmsSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // UB-04 filtering
  const filteredUb04Boxes = UB_04_BOXES.filter(box => {
    const matchesCat = ub04CategoryFilter === 'all' || box.category === ub04CategoryFilter;
    const matchesSearch = ub04Search === '' ||
      box.locatorNumber.toLowerCase().includes(ub04Search.toLowerCase()) ||
      box.name.toLowerCase().includes(ub04Search.toLowerCase()) ||
      box.shortName.toLowerCase().includes(ub04Search.toLowerCase()) ||
      box.sampleValue.toLowerCase().includes(ub04Search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectCmsBoxNumber = (num: string) => {
    if (num === '10a-c' || num === '10') {
      const b = CMS_1500_BOXES.find(x => x.boxNumber === '10a');
      if (b) { setSelectedCmsBox(b); return; }
    }
    const clean = num.toLowerCase().replace(/[^0-9a-z]/g, '');
    const found = CMS_1500_BOXES.find(b => {
      const bClean = b.boxNumber.toLowerCase().replace(/[^0-9a-z]/g, '');
      return bClean === clean || bClean.startsWith(clean) || clean.startsWith(bClean);
    });
    if (found) setSelectedCmsBox(found);
  };

  const isCmsSelected = (num: string) => {
    const cur = selectedCmsBox.boxNumber;
    if (num === '10a-c') {
      return cur === '10a' || cur === '10b' || cur === '10c' || cur === '10d';
    }
    if (num === '9') {
      return cur === '9' || cur === '9a' || cur === '9b' || cur === '9c' || cur === '9d';
    }
    if (num === '11') {
      return cur === '11' || cur === '11a' || cur === '11b' || cur === '11c' || cur === '11d';
    }
    if (num === '17') {
      return cur === '17' || cur === '17a' || cur === '17b';
    }
    if (num === '32') {
      return cur === '32' || cur === '32a' || cur === '32b';
    }
    if (num === '33') {
      return cur === '33' || cur === '33a' || cur === '33b';
    }
    const cleanCur = cur.toLowerCase().replace(/[^0-9a-z]/g, '');
    const cleanNum = num.toLowerCase().replace(/[^0-9a-z]/g, '');
    return cleanCur === cleanNum || cleanCur.startsWith(cleanNum) || cleanNum.startsWith(cleanCur);
  };

  const handleSelectUb04Locator = (loc: string) => {
    if (loc === 'FL 18-28' || loc === 'FL 18') {
      const b = UB_04_BOXES.find(x => x.locatorNumber === 'FL 18');
      if (b) { setSelectedUb04Box(b); return; }
    }
    if (loc === 'FL 31-34' || loc === 'FL 31') {
      const b = UB_04_BOXES.find(x => x.locatorNumber === 'FL 31');
      if (b) { setSelectedUb04Box(b); return; }
    }
    if (loc === 'FL 35-36' || loc === 'FL 35') {
      const b = UB_04_BOXES.find(x => x.locatorNumber === 'FL 35');
      if (b) { setSelectedUb04Box(b); return; }
    }
    if (loc === 'FL 39-41' || loc === 'FL 39') {
      const b = UB_04_BOXES.find(x => x.locatorNumber === 'FL 39');
      if (b) { setSelectedUb04Box(b); return; }
    }
    if (loc === 'FL 03' || loc === 'FL 03a-b') {
      const b = UB_04_BOXES.find(x => x.locatorNumber === 'FL 03a');
      if (b) { setSelectedUb04Box(b); return; }
    }
    if (loc === 'FL 08') {
      const b = UB_04_BOXES.find(x => x.locatorNumber === 'FL 08b' || x.locatorNumber === 'FL 08a');
      if (b) { setSelectedUb04Box(b); return; }
    }
    const clean = loc.toLowerCase().replace(/[^0-9a-z]/g, '');
    const found = UB_04_BOXES.find(b => {
      const bClean = b.locatorNumber.toLowerCase().replace(/[^0-9a-z]/g, '');
      return bClean === clean || bClean.startsWith(clean) || clean.startsWith(bClean);
    });
    if (found) setSelectedUb04Box(found);
  };

  const isUb04Selected = (loc: string) => {
    const cur = selectedUb04Box.locatorNumber;
    if (loc === 'FL 18-28') {
      const num = parseInt(cur.replace(/[^0-9]/g, ''), 10);
      return num >= 18 && num <= 28;
    }
    if (loc === 'FL 31-34') {
      const num = parseInt(cur.replace(/[^0-9]/g, ''), 10);
      return num >= 31 && num <= 34;
    }
    if (loc === 'FL 35-36') {
      const num = parseInt(cur.replace(/[^0-9]/g, ''), 10);
      return num === 35 || num === 36;
    }
    if (loc === 'FL 39-41') {
      const num = parseInt(cur.replace(/[^0-9]/g, ''), 10);
      return num >= 39 && num <= 41;
    }
    if (loc === 'FL 03a-b') {
      return cur === 'FL 03a' || cur === 'FL 03b';
    }
    if (loc === 'FL 08') {
      return cur === 'FL 08a' || cur === 'FL 08b';
    }
    const cleanCur = cur.toLowerCase().replace(/[^0-9a-z]/g, '');
    const cleanLoc = loc.toLowerCase().replace(/[^0-9a-z]/g, '');
    return cleanCur === cleanLoc || cleanCur.startsWith(cleanLoc) || cleanLoc.startsWith(cleanCur);
  };

  const handleToggleTrap = (trapId: string) => {
    if (!discoveredTraps.includes(trapId)) {
      const next = [...discoveredTraps, trapId];
      setDiscoveredTraps(next);
      if (next.length === AUDIT_TRAPS.length) {
        triggerCelebrationConfetti();
      }
    }
    setSelectedTrap(trapId);
  };

  const handleMarkComplete = () => {
    markModuleCompleted('claim-forms');
    if (!isCompleted) {
      triggerCelebrationConfetti();
    }
  };

  // Nav helpers for CMS-1500 inspector
  const currentCmsIdx = CMS_1500_BOXES.findIndex(b => b.boxNumber === selectedCmsBox.boxNumber);
  const prevCmsBox = currentCmsIdx > 0 ? CMS_1500_BOXES[currentCmsIdx - 1] : CMS_1500_BOXES[CMS_1500_BOXES.length - 1];
  const nextCmsBox = currentCmsIdx < CMS_1500_BOXES.length - 1 ? CMS_1500_BOXES[currentCmsIdx + 1] : CMS_1500_BOXES[0];

  // Nav helpers for UB-04 inspector
  const currentUb04Idx = UB_04_BOXES.findIndex(b => b.locatorNumber === selectedUb04Box.locatorNumber);
  const prevUb04Box = currentUb04Idx > 0 ? UB_04_BOXES[currentUb04Idx - 1] : UB_04_BOXES[UB_04_BOXES.length - 1];
  const nextUb04Box = currentUb04Idx < UB_04_BOXES.length - 1 ? UB_04_BOXES[currentUb04Idx + 1] : UB_04_BOXES[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-health-darkCard to-health-darkCard border border-emerald-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Module 2 of 8 • Claim Forms Studio
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              CMS-1500 & UB-04 Interactive Forms Studio
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Explore authentic, fully populated sample claims for both Professional (CMS-1500 / 837P) and Institutional Facility (UB-04 / 837I) billing. Click any box on the form sample or browse the complete directory to inspect EDI loops, billing rules, and denial traps.
            </p>
          </div>

          <button
            type="button"
            onClick={handleMarkComplete}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 self-start sm:self-auto ${
              isCompleted
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500/50 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{isCompleted ? 'Module Completed!' : 'Mark Module Done'}</span>
          </button>
        </div>

        {/* Studio Primary Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('cms1500')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'cms1500'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>1. CMS-1500 Professional (Sample & All 33 Boxes)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ub04')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'ub04'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>2. UB-04 Hospital Facility (Sample & 81 Locators)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'comparison'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>3. Professional vs. Facility Comparison Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('auditor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'auditor'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>4. Claim Auditor Lab (Find 5 Traps)</span>
          </button>
        </div>
      </div>

      {/* Mascot Insights Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CartoonTip
          mood="reading"
          type="green-tip"
          title="Box 12 (ROI) vs Box 13 (AOB) Signatures"
          message="Box 12 authorizes release of medical info to payers. Box 13 is Assignment of Benefits (AOB) authorizing the insurance check to be paid DIRECTLY to the clinic instead of the patient!"
        />
        <CartoonTip
          mood="denied"
          type="red-warning"
          title="Box 22 Corrected Claim Duplicate Trap"
          message="When sending a corrected claim, you MUST put Resubmission Code '7' and the Original Claim Reference # in Box 22! Omitting Box 22 causes the clearinghouse or payer to reject it as a duplicate (CO-18)!"
        />
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: CMS-1500 PROFESSIONAL CLAIM STUDIO           */}
      {/* ======================================================== */}
      {activeTab === 'cms1500' && (
        <div className="space-y-6">
          {/* Sub-Header & View Switcher */}
          <div className="bg-white dark:bg-health-darkCard p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                837P
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  CMS-1500 (HCFA-1500, version 02/12)
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  Used by Physicians, Solo Practices, Group Clinics, and Ambulatory Specialties
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl self-start sm:self-auto flex-wrap">
              <button
                type="button"
                onClick={() => setCmsViewMode('original')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  cmsViewMode === 'original'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1. Original Form (Image & Navigator)</span>
              </button>
              <button
                type="button"
                onClick={() => setCmsViewMode('directory')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  cmsViewMode === 'directory'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>2. All 33 Boxes Directory</span>
              </button>
              <button
                type="button"
                onClick={() => setCmsViewMode('visual')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  cmsViewMode === 'visual'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>3. Filled Sample Case</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Area: Form or Box Directory */}
            <div className={`${isWideLayout ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-4`}>
              {cmsViewMode === 'original' && (
                <OfficialFormViewer<ClaimBoxDetail>
                  formType="cms1500"
                  imageSrc="/forms/cms1500_original.png"
                  imageAlt="Official CMS-1500 (02/12) Health Insurance Claim Form"
                  officialTitle="CMS-1500 (HCFA-1500, version 02/12) Professional Claim Form"
                  officialSubtitle="Approved by National Uniform Claim Committee (NUCC)"
                  badgeText="Official Red Drop-Out OCR Form"
                  badgeColor="rose"
                  downloadFilename="CMS-1500-Official-Form.png"
                  items={CMS_1500_BOXES}
                  selectedItem={selectedCmsBox}
                  onSelectItem={setSelectedCmsBox}
                  getItemKey={b => b.boxNumber}
                  getItemNumber={b => `Box ${b.boxNumber}`}
                  getItemName={b => b.name}
                  getItemShortName={b => b.shortName}
                  sections={CMS_SECTIONS}
                  activeSection={cmsSectionFilter}
                  onSelectSection={setCmsSectionFilter}
                  inspectorElementId="cms-inspector-panel"
                  isWideLayout={isWideLayout}
                  onToggleWideLayout={() => setIsWideLayout(w => !w)}
                />
              )}

              {cmsViewMode === 'visual' && (
                /* AUTHENTIC VISUAL CMS-1500 FORM SAMPLE */
                <div className="bg-white border-2 border-rose-300 rounded-3xl p-5 shadow-md relative overflow-hidden font-sans">
                  {/* Top Paper Header Strip */}
                  <div className="flex items-center justify-between border-b-2 border-rose-300 pb-3 mb-4 text-rose-800">
                    <div className="text-[10px] font-black uppercase tracking-wider">
                      HEALTH INSURANCE CLAIM FORM • APPROVED BY NUCC (02/12)
                    </div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Sample Case: Eleanor Johnson (BCBS Texas)
                    </div>
                  </div>

                  {/* Payer Header Section */}
                  <div className="border border-rose-300 rounded-xl p-3 mb-3 bg-rose-50/20">
                    <div className="text-xs font-medium font-bold text-rose-700 uppercase">
                      Payer Header • Insurance Carrier
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-800">
                      {SAMPLE_CMS1500_CLAIM.payerName} • Payer ID: {SAMPLE_CMS1500_CLAIM.payerId}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {SAMPLE_CMS1500_CLAIM.payerAddress}
                    </div>
                  </div>

                  {/* Row 1: Box 1 & 1a */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('1')}
                      className={`col-span-7 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '1'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        1. MEDICARE / MEDICAID / TRICARE / GROUP HEALTH PLAN / OTHER
                      </div>
                      <div className="text-[10px] font-bold text-emerald-700 mt-1 flex items-center gap-1 font-mono">
                        <span className="w-2.5 h-2.5 rounded bg-emerald-600 text-white flex items-center justify-center text-xs font-medium">✓</span>
                        Group Health Plan
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('1a')}
                      className={`col-span-5 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '1a'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        1a. INSURED'S I.D. NUMBER
                      </div>
                      <div className="text-xs font-mono font-black text-slate-900 mt-1">
                        {SAMPLE_CMS1500_CLAIM.subscriber.id}
                      </div>
                    </div>
                  </div>

                  {/* Patient Demographics Row: Box 2, 3, 4 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('2')}
                      className={`col-span-5 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '2'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        2. PATIENT'S NAME (Last, First, Middle)
                      </div>
                      <div className="text-[11px] font-mono font-bold text-slate-900 mt-0.5">
                        {SAMPLE_CMS1500_CLAIM.patient.name}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('3')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '3'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        3. PATIENT'S BIRTH DATE & SEX
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900 mt-0.5">
                        {SAMPLE_CMS1500_CLAIM.patient.dob} | F
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('4')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '4'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        4. INSURED'S NAME
                      </div>
                      <div className="text-[11px] font-mono font-bold text-slate-900 mt-0.5">
                        {SAMPLE_CMS1500_CLAIM.subscriber.name}
                      </div>
                    </div>
                  </div>

                  {/* Address Row: Box 5, 6, 7 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('5')}
                      className={`col-span-5 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '5'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        5. PATIENT'S ADDRESS & PHONE
                      </div>
                      <div className="text-[10px] font-mono text-slate-900">
                        {SAMPLE_CMS1500_CLAIM.patient.address}, {SAMPLE_CMS1500_CLAIM.patient.city} {SAMPLE_CMS1500_CLAIM.patient.state} {SAMPLE_CMS1500_CLAIM.patient.zip}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('6')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '6'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        6. RELATION TO INSURED
                      </div>
                      <div className="text-[11px] font-mono font-bold text-emerald-700 mt-0.5">
                        ✓ Self
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('7')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '7'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        7. INSURED'S ADDRESS
                      </div>
                      <div className="text-[10px] font-mono text-slate-600">
                        (SAME AS PATIENT)
                      </div>
                    </div>
                  </div>

                  {/* Secondary & Primary Policy: Box 9, 10, 11 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('9')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '9' || selectedCmsBox.boxNumber === '9a' || selectedCmsBox.boxNumber === '9d'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        9. OTHER INSURED'S NAME & POLICY
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-800">
                        {SAMPLE_CMS1500_CLAIM.secondaryPayer.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        Policy: {SAMPLE_CMS1500_CLAIM.secondaryPayer.policy}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('10a-c')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        isCmsSelected('10a-c')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        10. IS CONDITION RELATED TO:
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 space-y-0.5">
                        <div>Employment: NO</div>
                        <div>Auto Accident: NO (TX)</div>
                        <div>Other Accident: NO</div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('11')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '11' || selectedCmsBox.boxNumber === '11d'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        11. INSURED'S POLICY / GROUP
                      </div>
                      <div className="text-[11px] font-mono font-bold text-slate-900">
                        {SAMPLE_CMS1500_CLAIM.subscriber.policyGroup}
                      </div>
                      <div className="text-xs font-medium font-mono text-emerald-700 font-bold mt-0.5">
                        11d. Other Plan: YES
                      </div>
                    </div>
                  </div>

                  {/* Signatures: Box 12 & 13 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('12')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '12'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        12. PATIENT'S SIGNATURE (Release of Information - ROI)
                      </div>
                      <div className="text-[10px] font-mono font-bold text-emerald-800 mt-0.5 flex items-center justify-between">
                        <span>SIGNATURE ON FILE (SOF)</span>
                        <span className="text-xs font-medium text-slate-500">Date: 01/15/2025</span>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('13')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '13'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        13. INSURED'S SIGNATURE (Assignment of Benefits - AOB)
                      </div>
                      <div className="text-[10px] font-mono font-bold text-emerald-800 mt-0.5">
                        SIGNATURE ON FILE (SOF) - Pay Doctor Directly
                      </div>
                    </div>
                  </div>

                  {/* Clinical Context Row: Box 14, 17, 19 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('14')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '14'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        14. DATE OF ILLNESS / LMP
                      </div>
                      <div className="text-[10px] font-mono text-slate-800 mt-0.5">
                        Qual 431: 01/10/2025
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('17')}
                      className={`col-span-5 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '17' || selectedCmsBox.boxNumber === '17b'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        17. REFERRING PROVIDER & 17b NPI
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900">
                        DN {SAMPLE_CMS1500_CLAIM.clinical.referringProvider}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                        NPI: {SAMPLE_CMS1500_CLAIM.clinical.referringNpi}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('19')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '19'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        19. ADDITIONAL CLAIM INFO
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate">
                        NOC: Radiculopathy Eval
                      </div>
                    </div>
                  </div>

                  {/* Diagnosis Codes: Box 21 */}
                  <div 
                    onClick={() => handleSelectCmsBoxNumber('21')}
                    className={`border p-2.5 rounded-lg mb-2 cursor-pointer transition-all ${
                      selectedCmsBox.boxNumber === '21'
                        ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                        : 'border-rose-300 hover:border-emerald-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase mb-1">
                      <span>21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY (ICD-10-CM)</span>
                      <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">ICD Ind: 0</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                      {SAMPLE_CMS1500_CLAIM.clinical.diagnoses.map(d => (
                        <div key={d.letter} className="bg-slate-50 border border-slate-200 p-1.5 rounded">
                          <span className="font-bold text-rose-700">{d.letter}: </span>
                          <span className="font-black text-slate-900">{d.code}</span>
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{d.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resubmission & Prior Auth: Box 22 & 23 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('22')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '22'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        22. RESUBMISSION CODE & ORIGINAL REF NO.
                      </div>
                      <div className="text-[10px] font-mono text-slate-800">
                        Code: 7 (Replacement) | Ref: 2025011500892X
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('23')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '23'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        23. PRIOR AUTH / REFERRAL / CLIA NUMBER
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900">
                        PA: {SAMPLE_CMS1500_CLAIM.clinical.priorAuthNumber}
                      </div>
                    </div>
                  </div>

                  {/* Box 24 Service Lines (The Core Billing Grid) */}
                  <div className="border border-rose-300 rounded-xl overflow-hidden mb-2">
                    <div className="bg-rose-100/60 p-2 text-xs font-medium font-black text-rose-800 uppercase grid grid-cols-12 text-center">
                      <div className="col-span-2">24A. Dates of Service</div>
                      <div className="col-span-1">24B. POS</div>
                      <div className="col-span-3">24D. CPT / HCPCS & Modifiers</div>
                      <div className="col-span-2">24E. Diag Pointer</div>
                      <div className="col-span-2">24F. $ Charges</div>
                      <div className="col-span-1">24G. Units</div>
                      <div className="col-span-1">24J. Rend NPI</div>
                    </div>

                    <div className="divide-y divide-rose-200">
                      {SAMPLE_CMS1500_CLAIM.serviceLines.map((line, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleSelectCmsBoxNumber('24D')}
                          className={`p-2 grid grid-cols-12 text-[10px] font-mono items-center text-center cursor-pointer transition-all ${
                            selectedCmsBox.boxNumber.startsWith('24')
                              ? 'bg-emerald-50/80 hover:bg-emerald-100/80'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="col-span-2 font-bold text-slate-800">{line.dos}</div>
                          <div className="col-span-1 font-bold text-blue-700">{line.pos}</div>
                          <div className="col-span-3 font-black text-slate-900 text-left pl-2">
                            {line.cpt} {line.mod && <span className="text-purple-700 font-black">-{line.mod}</span>}
                          </div>
                          <div className="col-span-2 font-bold text-rose-700">{line.pointer}</div>
                          <div className="col-span-2 font-bold text-slate-900">${line.charge.toFixed(2)}</div>
                          <div className="col-span-1 font-bold text-slate-700">{line.units}</div>
                          <div className="col-span-1 text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{line.renderingNpi}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Footer: Box 25, 26, 27, 28, 29 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('25')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '25'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        25. FEDERAL TAX I.D.
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900">
                        {SAMPLE_CMS1500_CLAIM.totals.taxId} (EIN)
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('26')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '26'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        26. PATIENT'S ACCOUNT NO.
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-800">
                        {SAMPLE_CMS1500_CLAIM.patient.accountNumber}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('27')}
                      className={`col-span-2 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '27'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        27. ACCEPT ASSIGN?
                      </div>
                      <div className="text-[11px] font-mono font-bold text-emerald-700">
                        ✓ YES
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('28')}
                      className={`col-span-2 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '28'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        28. TOTAL CHARGE
                      </div>
                      <div className="text-xs font-mono font-black text-slate-900">
                        ${SAMPLE_CMS1500_CLAIM.totals.totalCharge.toFixed(2)}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('29')}
                      className={`col-span-2 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '29'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        29. AMT PAID
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-600">
                        ${SAMPLE_CMS1500_CLAIM.totals.amountPaid.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Provider & Facility Row: Box 31, 32, 33 */}
                  <div className="grid grid-cols-12 gap-2">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('31')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '31'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        31. PHYSICIAN SIGNATURE
                      </div>
                      <div className="text-[10px] font-mono text-slate-800">
                        DR. SARAH JENKINS MD
                      </div>
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">Date: 01/16/2025</div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('32')}
                      className={`col-span-5 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '32' || selectedCmsBox.boxNumber === '32a'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        32. SERVICE FACILITY LOCATION (Physical Street - No P.O. Box!)
                      </div>
                      <div className="text-xs font-medium font-mono text-slate-900 leading-tight">
                        {SAMPLE_CMS1500_CLAIM.facility.name}, {SAMPLE_CMS1500_CLAIM.facility.address}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                        NPI 32a: {SAMPLE_CMS1500_CLAIM.facility.npi}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('33')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        selectedCmsBox.boxNumber === '33' || selectedCmsBox.boxNumber === '33a' || selectedCmsBox.boxNumber === '33b'
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-rose-300 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-rose-950 dark:text-rose-300 uppercase">
                        33. BILLING PROVIDER & PHONE
                      </div>
                      <div className="text-xs font-medium font-mono font-bold text-slate-900 truncate">
                        {SAMPLE_CMS1500_CLAIM.billing.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                        NPI 33a: {SAMPLE_CMS1500_CLAIM.billing.npi} | {SAMPLE_CMS1500_CLAIM.billing.taxonomy}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-center text-xs text-slate-700 dark:text-slate-300 font-bold italic">
                    💡 Click on any box on the sample claim above to inspect its rules, EDI mapping, and rejection causes!
                  </div>
                </div>
              )}

              {cmsViewMode === 'directory' && (
                /* BOX-BY-BOX MASTER DIRECTORY (ALL 33 BOXES) */
                <div className="bg-white dark:bg-health-darkCard p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-rose-900 bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-300">
                        All 33 Claim Boxes
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        NUCC Standard (Boxes 1 through 33)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      Showing {filteredCmsBoxes.length} of {CMS_1500_BOXES.length} Detailed Fields
                    </span>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={cmsSearch}
                        onChange={e => setCmsSearch(e.target.value)}
                        placeholder="Search Box #, Name, CPT, EDI loop..."
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {(['all', 'patient', 'clinical', 'billing', 'provider'] as const).map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCmsCategoryFilter(cat)}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
                            cmsCategoryFilter === cat
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* List of Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[560px] overflow-y-auto pr-1">
                    {filteredCmsBoxes.map(box => {
                      const isSelected = selectedCmsBox.boxNumber === box.boxNumber;
                      return (
                        <div
                          key={box.boxNumber}
                          onClick={() => setSelectedCmsBox(box)}
                          className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 ring-2 ring-emerald-200'
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              Box {box.boxNumber}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                              {box.category}
                            </span>
                          </div>
                          <div className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1">
                            {box.shortName}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 truncate mt-1">
                            {box.sampleValue}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Area (Col 5): Deep-Dive Box Inspector Card */}
            <div id="cms-inspector-panel" className={`${isWideLayout ? 'lg:col-span-12' : 'lg:col-span-5 sticky top-20'} space-y-4`}>
              <div className="bg-white dark:bg-health-darkCard p-6 rounded-3xl border-2 border-emerald-500/40 shadow-lg space-y-5">
                {/* Header Navigation */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                      Box {selectedCmsBox.boxNumber}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {selectedCmsBox.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedCmsBox(prevCmsBox)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                      title="Previous Box"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCmsBox(nextCmsBox)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                      title="Next Box"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Box Title */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {selectedCmsBox.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {selectedCmsBox.description}
                  </p>
                </div>

                {/* Sample Filled Value Monospace Banner */}
                <div className="p-3.5 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs border border-slate-800 shadow-inner">
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center justify-between">
                    <span>Authentic Claim Sample Value:</span>
                    <span className="text-emerald-400 font-bold">● Valid Syntax</span>
                  </div>
                  <div className="font-bold">{selectedCmsBox.sampleValue}</div>
                </div>

                {/* EDI 837P Mapping */}
                {selectedCmsBox.ediMapping && (
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 text-xs text-blue-900 dark:text-blue-200 font-mono">
                    <div className="font-bold text-[10px] uppercase text-blue-600 mb-0.5">
                      HIPAA EDI 837P Loop & Segment:
                    </div>
                    {selectedCmsBox.ediMapping}
                  </div>
                )}

                {/* Rules & NUCC Guidelines */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Key Guidelines & NUCC Rules
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedCmsBox.rules.map((r, i) => (
                      <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rejection Causes & Denial Codes */}
                <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-red-700 font-black text-xs uppercase tracking-wider">
                    <AlertOctagon className="w-4 h-4 shrink-0 text-red-600" />
                    <span>Top AR Denial Triggers & Traps</span>
                  </div>
                  <ul className="space-y-1 text-xs text-red-900 dark:text-red-200">
                    {selectedCmsBox.rejectionCauses.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5 font-medium">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: UB-04 INSTITUTIONAL FACILITY CLAIM STUDIO    */}
      {/* ======================================================== */}
      {activeTab === 'ub04' && (
        <div className="space-y-6">
          {/* Sub-Header & View Switcher */}
          <div className="bg-white dark:bg-health-darkCard p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                837I
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  UB-04 (CMS-1450) Institutional Facility Claim
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  Used by Hospitals (Inpatient/Outpatient), SNFs, Inpatient Rehab, Hospices, and ESRD Centers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl self-start sm:self-auto flex-wrap">
              <button
                type="button"
                onClick={() => setUb04ViewMode('original')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  ub04ViewMode === 'original'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1. Original UB-04 (Image & All 81 FLs)</span>
              </button>
              <button
                type="button"
                onClick={() => setUb04ViewMode('directory')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  ub04ViewMode === 'directory'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>2. Form Locators Directory (All 81)</span>
              </button>
              <button
                type="button"
                onClick={() => setUb04ViewMode('visual')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  ub04ViewMode === 'visual'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>3. Filled Hospital Inpatient Case</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Area: UB-04 Form or Directory */}
            <div className={`${isWideLayout ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-4`}>
              {ub04ViewMode === 'original' && (
                <OfficialFormViewer<Ub04BoxDetail>
                  formType="ub04"
                  imageSrc="/forms/ub04_original.png"
                  imageAlt="Official UB-04 (CMS-1450) Hospital Facility Claim Form"
                  officialTitle="UB-04 (CMS-1450) Institutional Facility Claim Form"
                  officialSubtitle="Approved by National Uniform Billing Committee (NUBC)"
                  badgeText="Official Institutional Bill with NUBC Seal"
                  badgeColor="amber"
                  downloadFilename="UB-04-Official-Form.png"
                  items={UB_04_BOXES}
                  selectedItem={selectedUb04Box}
                  onSelectItem={setSelectedUb04Box}
                  getItemKey={b => b.locatorNumber}
                  getItemNumber={b => b.locatorNumber}
                  getItemName={b => b.name}
                  getItemShortName={b => b.shortName}
                  sections={UB04_SECTIONS}
                  activeSection={ub04SectionFilter}
                  onSelectSection={setUb04SectionFilter}
                  inspectorElementId="ub04-inspector-panel"
                  isWideLayout={isWideLayout}
                  onToggleWideLayout={() => setIsWideLayout(w => !w)}
                />
              )}

              {ub04ViewMode === 'visual' && (
                /* AUTHENTIC VISUAL UB-04 FORM SAMPLE */
                <div className="bg-white border-2 border-amber-800/40 rounded-3xl p-5 shadow-md relative overflow-hidden font-sans">
                  {/* Top Paper Header Strip */}
                  <div className="flex items-center justify-between border-b-2 border-amber-800/30 pb-3 mb-4 text-amber-900">
                    <div className="text-[10px] font-black uppercase tracking-wider">
                      UNIFORM BILL (UB-04 / CMS-1450) • NATIONAL UNIFORM BILLING COMMITTEE (NUBC)
                    </div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Sample Case: Carlos Ramirez (Inpatient Stemi Admission)
                    </div>
                  </div>

                  {/* FL 01 & FL 04 Header Row */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 01')}
                      className={`col-span-8 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 01')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 01. BILLING PROVIDER NAME, ADDRESS & TELEPHONE
                      </div>
                      <div className="text-[11px] font-mono font-bold text-slate-900">
                        {SAMPLE_UB04_CLAIM.facility.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                        {SAMPLE_UB04_CLAIM.facility.address}, {SAMPLE_UB04_CLAIM.facility.city} {SAMPLE_UB04_CLAIM.facility.state} {SAMPLE_UB04_CLAIM.facility.zip} • {SAMPLE_UB04_CLAIM.facility.phone}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 04')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 04')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 04. TYPE OF BILL (TOB)
                      </div>
                      <div className="text-sm font-mono font-black text-emerald-700 mt-0.5">
                        {SAMPLE_UB04_CLAIM.billingType.tob}
                      </div>
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono truncate">
                        {SAMPLE_UB04_CLAIM.billingType.tobMeaning}
                      </div>
                    </div>
                  </div>

                  {/* FL 03, 05, 06 Row */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 03a-b')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 03a-b')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 03. PATIENT CONTROL # & MRN
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900">
                        Acc: {SAMPLE_UB04_CLAIM.patient.controlNumber}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        MRN: {SAMPLE_UB04_CLAIM.patient.mrn}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 05')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 05')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 05. FED TAX NO.
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900 mt-1">
                        {SAMPLE_UB04_CLAIM.facility.tin}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 06')}
                      className={`col-span-5 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 06')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 06. STATEMENT COVERS PERIOD
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-800 mt-1">
                        {SAMPLE_UB04_CLAIM.billingType.statementFrom} - {SAMPLE_UB04_CLAIM.billingType.statementThrough}
                      </div>
                    </div>
                  </div>

                  {/* Patient Demographics: FL 08, 12, 14, 17 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 08')}
                      className={`col-span-5 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 08')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 08. PATIENT LEGAL NAME
                      </div>
                      <div className="text-[11px] font-mono font-bold text-slate-900">
                        {SAMPLE_UB04_CLAIM.patient.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        DOB: {SAMPLE_UB04_CLAIM.patient.dob} | Sex: {SAMPLE_UB04_CLAIM.patient.sex}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 12')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 12')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 12. ADMISSION DATE
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900 mt-1">
                        {SAMPLE_UB04_CLAIM.admission.date} (Hr: {SAMPLE_UB04_CLAIM.admission.hour})
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 17')}
                      className={`col-span-4 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 17')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 17. DISCHARGE STATUS
                      </div>
                      <div className="text-[10px] font-mono font-bold text-emerald-800 mt-1 truncate">
                        {SAMPLE_UB04_CLAIM.admission.dischargeStatus}
                      </div>
                    </div>
                  </div>

                  {/* Value Codes & Condition Codes: FL 18-28 & FL 39-41 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 18-28')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 18-28')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 18-28. CONDITION CODES
                      </div>
                      <div className="text-[10px] font-mono text-slate-800 flex gap-2">
                        {SAMPLE_UB04_CLAIM.codes.conditionCodes.map(c => (
                          <span key={c} className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">{c}</span>
                        ))}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 39-41')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 39-41')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 39-41. VALUE CODES & AMOUNTS
                      </div>
                      <div className="text-[10px] font-mono text-slate-800 space-y-0.5">
                        {SAMPLE_UB04_CLAIM.codes.valueCodes.map(v => (
                          <div key={v.code} className="flex justify-between">
                            <span className="font-bold">Code {v.code}:</span>
                            <span>{v.amount} ({v.desc})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* FL 42 - FL 47 REVENUE CHARGES GRID */}
                  <div className="border border-amber-800/30 rounded-xl overflow-hidden mb-2">
                    <div className="bg-amber-100/60 p-2 text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase grid grid-cols-12 text-center">
                      <div className="col-span-2">FL 42. Rev Code</div>
                      <div className="col-span-4">FL 43. Revenue Description</div>
                      <div className="col-span-2">FL 44. HCPCS</div>
                      <div className="col-span-1">FL 46. Units</div>
                      <div className="col-span-3">FL 47. Total Charges</div>
                    </div>

                    <div className="divide-y divide-amber-200">
                      {SAMPLE_UB04_CLAIM.revenueGrid.map((row, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleSelectUb04Locator('FL 42')}
                          className={`p-2 grid grid-cols-12 text-[10px] font-mono items-center text-center cursor-pointer transition-all ${
                            row.rev === '0001' ? 'bg-amber-100/70 font-black' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="col-span-2 font-bold text-rose-800">{row.rev}</div>
                          <div className="col-span-4 text-left font-bold text-slate-900 truncate pl-2">{row.desc}</div>
                          <div className="col-span-2 text-slate-600 font-bold">{row.hcpcs || '--'}</div>
                          <div className="col-span-1 text-slate-800 font-bold">{row.units}</div>
                          <div className="col-span-3 font-black text-slate-900">${row.charge.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payer & Insured: FL 50, 56, 60, 63 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 50')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 50')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 50. PAYER NAME (Line A Primary)
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900 truncate">
                        {SAMPLE_UB04_CLAIM.payer.primaryPayer}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 60')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 60')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 60. INSURED UNIQUE ID
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900 truncate">
                        {SAMPLE_UB04_CLAIM.payer.mbi}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 63')}
                      className={`col-span-3 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 63')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 63. PRIOR AUTH
                      </div>
                      <div className="text-[10px] font-mono font-bold text-emerald-800 truncate">
                        {SAMPLE_UB04_CLAIM.payer.priorAuth}
                      </div>
                    </div>
                  </div>

                  {/* Clinical Diagnoses & Procedures: FL 67 & FL 74 */}
                  <div className="grid grid-cols-12 gap-2 mb-2">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 67')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 67')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 67. PRINCIPAL DIAGNOSIS & POA
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900">
                        {SAMPLE_UB04_CLAIM.diagnoses.principal.code} (POA: {SAMPLE_UB04_CLAIM.diagnoses.principal.poa})
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate">
                        {SAMPLE_UB04_CLAIM.diagnoses.principal.desc}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 74')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 74')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 74. PRINCIPAL PROCEDURE (ICD-10-PCS)
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900">
                        {SAMPLE_UB04_CLAIM.procedures[0].code} • Date: {SAMPLE_UB04_CLAIM.procedures[0].date}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate">
                        {SAMPLE_UB04_CLAIM.procedures[0].desc}
                      </div>
                    </div>
                  </div>

                  {/* Attending & Operating Physicians: FL 76 & FL 77 */}
                  <div className="grid grid-cols-12 gap-2">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 76')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 76')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 76. ATTENDING PHYSICIAN & NPI
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900">
                        {SAMPLE_UB04_CLAIM.physicians.attending.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        NPI: {SAMPLE_UB04_CLAIM.physicians.attending.npi}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 77')}
                      className={`col-span-6 border p-2 rounded-lg cursor-pointer transition-all ${
                        isUb04Selected('FL 77')
                          ? 'border-emerald-600 ring-2 ring-emerald-300 bg-emerald-50'
                          : 'border-amber-700/30 hover:border-emerald-400 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-amber-950 dark:text-amber-300 uppercase">
                        FL 77. OPERATING SURGEON & NPI
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900">
                        {SAMPLE_UB04_CLAIM.physicians.operating.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        NPI: {SAMPLE_UB04_CLAIM.physicians.operating.npi}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-center text-[10px] text-slate-700 dark:text-slate-300 font-bold italic">
                    💡 Click on any Form Locator above to inspect hospital DRG impact, rules, sample values, and denial triggers!
                  </div>
                </div>
              )}

              {ub04ViewMode === 'directory' && (
                /* UB-04 MASTER DIRECTORY (FL 01 to FL 81) */
                <div className="bg-white dark:bg-health-darkCard p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                        All 81 Form Locators
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Exact Sequential Order (FL 01 through FL 81)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      Showing {filteredUb04Boxes.length} of {UB_04_BOXES.length} Locators
                    </span>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={ub04Search}
                        onChange={e => setUb04Search(e.target.value)}
                        placeholder="Search Form Locator, Revenue Code, DRG..."
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {(['all', 'provider', 'patient', 'codes', 'charges', 'payer', 'clinical', 'reserved'] as const).map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setUb04CategoryFilter(cat)}
                          className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
                            ub04CategoryFilter === cat
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* List of Form Locators */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[560px] overflow-y-auto pr-1">
                    {filteredUb04Boxes.map(box => {
                      const isSelected = selectedUb04Box.locatorNumber === box.locatorNumber;
                      return (
                        <div
                          key={box.locatorNumber}
                          onClick={() => setSelectedUb04Box(box)}
                          className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 ring-2 ring-emerald-200'
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-xs font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {box.locatorNumber}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                              {box.category}
                            </span>
                          </div>
                          <div className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1">
                            {box.shortName}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 truncate mt-1">
                            {box.sampleValue}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Area (Col 5): Deep-Dive Form Locator Inspector Card */}
            <div id="ub04-inspector-panel" className={`${isWideLayout ? 'lg:col-span-12' : 'lg:col-span-5 sticky top-20'} space-y-4`}>
              <div className="bg-white dark:bg-health-darkCard p-6 rounded-3xl border-2 border-emerald-500/40 shadow-lg space-y-5">
                {/* Header Navigation */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                      {selectedUb04Box.locatorNumber}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {selectedUb04Box.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedUb04Box(prevUb04Box)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                      title="Previous Locator"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUb04Box(nextUb04Box)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                      title="Next Locator"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Form Locator Title */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {selectedUb04Box.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {selectedUb04Box.description}
                  </p>
                </div>

                {/* Sample Filled Value Monospace Banner */}
                <div className="p-3.5 rounded-2xl bg-slate-900 text-amber-400 font-mono text-xs border border-slate-800 shadow-inner">
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center justify-between">
                    <span>Authentic Hospital Sample Value:</span>
                    <span className="text-amber-400 font-bold">● Valid Syntax</span>
                  </div>
                  <div className="font-bold">{selectedUb04Box.sampleValue}</div>
                </div>

                {/* EDI 837I Mapping */}
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 text-xs text-purple-900 dark:text-purple-200 font-mono">
                  <div className="font-bold text-[10px] uppercase text-purple-600 mb-0.5">
                    HIPAA EDI 837I Loop & Segment:
                  </div>
                  {selectedUb04Box.ediMapping}
                </div>

                {/* Rules & Hospital Guidelines */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Hospital Guidelines & Inpatient / Outpatient Rules
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedUb04Box.rules.map((r, i) => (
                      <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rejection Causes & Denial Codes */}
                <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-red-700 font-black text-xs uppercase tracking-wider">
                    <AlertOctagon className="w-4 h-4 shrink-0 text-red-600" />
                    <span>Hospital Rejection & DRG Audit Risks</span>
                  </div>
                  <ul className="space-y-1 text-xs text-red-900 dark:text-red-200">
                    {selectedUb04Box.rejectionCauses.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5 font-medium">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 3: PROFESSIONAL VS. FACILITY COMPARISON MATRIX   */}
      {/* ======================================================== */}
      {activeTab === 'comparison' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Comprehensive Professional (CMS-1500) vs. Facility (UB-04) Matrix
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Master the fundamental legal, operational, and financial distinctions between physician and hospital billing
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                  <th className="py-3 px-4 font-black text-slate-900 dark:text-white uppercase tracking-wider w-1/4">
                    Comparison Feature
                  </th>
                  <th className="py-3 px-4 font-black text-blue-700 dark:text-blue-400 uppercase tracking-wider w-3/8">
                    Professional Billing (CMS-1500 / 837P)
                  </th>
                  <th className="py-3 px-4 font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider w-3/8">
                    Facility / Hospital Billing (UB-04 / 837I)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {FORM_COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-black text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-900/20">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                      {row.professional}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                      {row.facility}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 4: INTERACTIVE CLAIM AUDITOR LAB (FIND 5 TRAPS) */}
      {/* ======================================================== */}
      {activeTab === 'auditor' && (
        <div className="bg-white dark:bg-health-darkCard rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                  Pre-Submission Claim Scrubber Simulator
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Interactive AR Audit Game
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Spot the 5 Fatal Claim Traps Before Clearinghouse Rejection!
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                This draft CMS-1500 claim was generated by the clinic front desk and coding team. 5 critical compliance traps will cause instant clearinghouse rejection or non-payment. Click on the trapped boxes below to audit!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-600 font-mono">
                  {discoveredTraps.length} / {AUDIT_TRAPS.length}
                </div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
                  Traps Identified
                </div>
              </div>

              {discoveredTraps.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setDiscoveredTraps([]);
                    setSelectedTrap(null);
                  }}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1"
                  title="Reset Game"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(discoveredTraps.length / AUDIT_TRAPS.length) * 100}%` }}
            />
          </div>

          {/* Interactive Traps Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUDIT_TRAPS.map((trap, idx) => {
              const isFound = discoveredTraps.includes(trap.id);
              const isCurrent = selectedTrap === trap.id;

              return (
                <div
                  key={trap.id}
                  onClick={() => handleToggleTrap(trap.id)}
                  className={`p-5 rounded-2xl border-2 text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isFound
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:border-red-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-mono text-xs font-black px-2 py-0.5 rounded border ${
                        isFound
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-red-100 text-red-700 border-red-200'
                      }`}>
                        Box {trap.boxNumber}
                      </span>
                      {isFound ? (
                        <span className="text-[10px] font-black text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> CAUGHT!
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          Trap #{idx + 1}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-slate-900 mb-1">
                      {trap.boxTitle}
                    </h4>

                    <div className="p-2.5 rounded-xl bg-red-100/70 border border-red-200 text-red-950 font-mono text-[11px] mb-3">
                      <span className="font-bold text-red-700 block text-xs font-medium uppercase">Draft Claim Value:</span>
                      {trap.flawedValue}
                    </div>

                    {isFound && (
                      <div className="space-y-2 mt-2 pt-2 border-t border-emerald-200 text-xs">
                        <div className="text-emerald-900 font-mono text-[11px] bg-emerald-100/60 p-2 rounded-lg border border-emerald-200">
                          <span className="font-bold text-emerald-700 block text-xs font-medium uppercase">Compliant Corrected Value:</span>
                          {trap.correctValue}
                        </div>
                        <div className="text-[10px] font-bold text-red-600">
                          {trap.carcDenial}
                        </div>
                        <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                          {trap.explanation}
                        </p>
                      </div>
                    )}
                  </div>

                  {!isFound && (
                    <button
                      type="button"
                      className="mt-3 w-full py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                    >
                      Audit & Inspect This Box
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {discoveredTraps.length === AUDIT_TRAPS.length && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-6 h-6 text-amber-300" />
                  <h4 className="text-xl font-black">
                    Master Claim Auditor Certification Passed!
                  </h4>
                </div>
                <p className="text-xs text-emerald-100 max-w-xl">
                  You caught all 5 fatal billing traps! By fixing Modifier 25, Box 32 street address, Box 22 ICN reference, 5-digit ICD-10 specificity, and Box 24J Type 1 NPI, this claim achieves a 100% First-Pass Clean Claim Rate (CCR).
                </p>
              </div>

              <button
                type="button"
                onClick={handleMarkComplete}
                className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-black text-xs hover:bg-emerald-50 transition-colors shadow-md shrink-0"
              >
                Mark Module Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
