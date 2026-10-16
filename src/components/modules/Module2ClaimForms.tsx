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
  DollarSign,
  X,
  BookOpen,
  PanelRightOpen,
  PanelRightClose,
  Columns2,
  ZoomIn,
  ZoomOut,
  SlidersHorizontal,
  Maximize2
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

  // CMS-1500 State: default to 'visual' (large, readable, interactive form)
  const [cmsViewMode, setCmsViewMode] = useState<'visual' | 'original' | 'directory'>('visual');
  const [cmsSectionFilter, setCmsSectionFilter] = useState<string>('all');
  const [selectedCmsBox, setSelectedCmsBox] = useState<ClaimBoxDetail>(CMS_1500_BOXES.find(b => b.boxNumber === '24D') || CMS_1500_BOXES[0]);
  const [cmsSearch, setCmsSearch] = useState('');
  const [cmsCategoryFilter, setCmsCategoryFilter] = useState<'all' | 'patient' | 'clinical' | 'billing' | 'provider'>('all');

  // UB-04 State: default to 'visual' (large, readable, interactive form)
  const [ub04ViewMode, setUb04ViewMode] = useState<'visual' | 'original' | 'directory'>('visual');
  const [ub04SectionFilter, setUb04SectionFilter] = useState<string>('all');
  const [selectedUb04Box, setSelectedUb04Box] = useState<Ub04BoxDetail>(UB_04_BOXES.find(b => b.locatorNumber === 'FL 04') || UB_04_BOXES[0]);
  const [ub04Search, setUb04Search] = useState('');
  const [ub04CategoryFilter, setUb04CategoryFilter] = useState<'all' | 'provider' | 'patient' | 'codes' | 'charges' | 'payer' | 'clinical' | 'reserved'>('all');
  const [isWideLayout, setIsWideLayout] = useState<boolean>(true);
  const [inspectorLayout, setInspectorLayout] = useState<'split' | 'drawer' | 'bottom'>('split');
  const [isCmsDrawerOpen, setIsCmsDrawerOpen] = useState<boolean>(true);
  const [isUb04DrawerOpen, setIsUb04DrawerOpen] = useState<boolean>(true);
  const [formScale, setFormScale] = useState<'normal' | 'large' | 'huge'>('large');

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
    setIsCmsDrawerOpen(true);
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
    if (num === '24') {
      return cur.startsWith('24');
    }
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
    setIsUb04DrawerOpen(true);
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

  const getScaleStyles = () => {
    if (formScale === 'huge') {
      return {
        cardPadding: 'p-4 sm:p-5',
        labelSize: 'text-xs sm:text-sm font-black',
        valueSize: 'text-base sm:text-lg font-black font-mono',
        subSize: 'text-xs font-semibold',
        tableHeader: 'text-xs sm:text-sm font-black',
        tableText: 'text-sm sm:text-base font-bold font-mono',
        badgeSize: 'text-xs px-2.5 py-1',
      };
    }
    if (formScale === 'normal') {
      return {
        cardPadding: 'p-2.5 sm:p-3',
        labelSize: 'text-[11px] font-extrabold',
        valueSize: 'text-xs sm:text-sm font-bold font-mono',
        subSize: 'text-[10px]',
        tableHeader: 'text-[11px] font-black',
        tableText: 'text-xs font-mono',
        badgeSize: 'text-[10px] px-2 py-0.5',
      };
    }
    // 'large' default (prominent, clear, comfortable)
    return {
      cardPadding: 'p-3.5 sm:p-4',
      labelSize: 'text-xs sm:text-sm font-black',
      valueSize: 'text-sm sm:text-base font-black font-mono',
      subSize: 'text-xs font-medium',
      tableHeader: 'text-xs font-black',
      tableText: 'text-xs sm:text-sm font-bold font-mono',
      badgeSize: 'text-xs px-2 py-0.5',
    };
  };

  const scale = getScaleStyles();

  // Renderers for Inspector Cards (usable in Drawer, Split, or Stacked modes)
  const renderCmsInspectorCard = (onClose?: () => void) => (
    <div className="bg-white dark:bg-health-darkCard p-5 sm:p-6 rounded-3xl border-2 border-emerald-500/50 shadow-xl space-y-4">
      {/* Header Navigation with Active Beside Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-mono">
            Box {selectedCmsBox.boxNumber}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {selectedCmsBox.category}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSelectedCmsBox(prevCmsBox)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
            title="Previous Box"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setSelectedCmsBox(nextCmsBox)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
            title="Next Box"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 ml-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 text-xs font-bold transition-colors"
              title="Close Side Inspector"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Box Title & Active Status */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Description Live Beside Form</span>
        </div>
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
  );

  const renderUb04InspectorCard = (onClose?: () => void) => (
    <div className="bg-white dark:bg-health-darkCard p-5 sm:p-6 rounded-3xl border-2 border-amber-600/50 shadow-xl space-y-4">
      {/* Header Navigation with Active Beside Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black px-3 py-1 rounded-xl bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 font-mono">
            {selectedUb04Box.locatorNumber}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {selectedUb04Box.category}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSelectedUb04Box(prevUb04Box)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
            title="Previous Locator"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setSelectedUb04Box(nextUb04Box)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
            title="Next Locator"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 ml-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 text-xs font-bold transition-colors"
              title="Close Side Inspector"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Form Locator Title & Active Status */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 mb-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Description Live Beside Form</span>
        </div>
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
  );

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

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {/* Form Scaling / Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Size:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setFormScale('normal')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    formScale === 'normal'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Standard Form Size (100%)"
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setFormScale('large')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    formScale === 'large'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Large Form Size (115% - Recommended)"
                >
                  Large (115%)
                </button>
                <button
                  type="button"
                  onClick={() => setFormScale('huge')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    formScale === 'huge'
                      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Huge Form Size (130% - Maximum Readability)"
                >
                  Huge (130%)
                </button>
              </div>

              {/* Layout Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setInspectorLayout('split')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    inspectorLayout === 'split'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Side-by-Side: Form on Left, Description Beside on Right"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span>Beside Form (Split)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setInspectorLayout('drawer'); setIsCmsDrawerOpen(true); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    inspectorLayout === 'drawer'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Expand Form to Full 100% Width with Slide-Out Inspector"
                >
                  <PanelRightOpen className="w-3.5 h-3.5" />
                  <span>Full-Width Form</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorLayout('bottom')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    inspectorLayout === 'bottom'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Stack Description Below Form"
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Stacked</span>
                </button>
              </div>

              {/* View Modes */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
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
                  <span>1. Interactive Form (Clear & Big)</span>
                </button>
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
                  <span>2. Scanned Paper (NUCC)</span>
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
                  <span>3. All 33 Boxes</span>
                </button>
              </div>
            </div>
          </div>

          <div className={
            inspectorLayout === 'split'
              ? "grid grid-cols-1 xl:grid-cols-12 gap-6 items-start"
              : "space-y-6"
          }>
            {/* Form Area: in split mode takes 7 or 8 columns, in drawer/bottom takes 100% full width */}
            <div className={
              inspectorLayout === 'split'
                ? "xl:col-span-7 2xl:col-span-8 space-y-4"
                : "w-full space-y-4"
            }>
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
                  onSelectItem={(box) => {
                    setSelectedCmsBox(box);
                    setIsCmsDrawerOpen(true);
                  }}
                  getItemKey={b => b.boxNumber}
                  getItemNumber={b => `Box ${b.boxNumber}`}
                  getItemName={b => b.name}
                  getItemShortName={b => b.shortName}
                  sections={CMS_SECTIONS}
                  activeSection={cmsSectionFilter}
                  onSelectSection={setCmsSectionFilter}
                  inspectorElementId="cms-inspector-panel"
                  onOpenInspector={() => setIsCmsDrawerOpen(true)}
                />
              )}

              {cmsViewMode === 'visual' && (
                /* AUTHENTIC LARGE INTERACTIVE CMS-1500 FORM STUDIO */
                <div className="bg-white dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-900/60 rounded-3xl p-5 sm:p-7 shadow-lg relative font-sans space-y-6 transition-all">
                  {/* Top Paper Header Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-rose-400/40 text-rose-900 dark:text-rose-400 gap-2">
                    <div>
                      <div className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-mono text-xs">NUCC 02/12</span>
                        <span>HEALTH INSURANCE CLAIM FORM (CMS-1500)</span>
                      </div>
                      <div className="text-xs text-slate-500 font-semibold mt-0.5">
                        Standard Professional Outpatient Claim Format • EDI ANSI-837P Aligned
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-black">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Case Study: Eleanor Johnson (BCBS Texas)
                      </span>
                    </div>
                  </div>

                  {/* Payer Header Section */}
                  <div 
                    onClick={() => handleSelectCmsBoxNumber('1a')}
                    className="border-2 border-rose-200 dark:border-rose-900/40 rounded-2xl p-4 bg-rose-50/30 dark:bg-rose-950/20 hover:border-emerald-500 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">
                      <span>Carrier Header • Primary Insurance Carrier Destination</span>
                      <span className="font-mono text-xs bg-white dark:bg-slate-800 px-2.5 py-0.5 rounded border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 font-black">
                        Loop 2010BB
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white mt-1">
                      {SAMPLE_CMS1500_CLAIM.payerName} • Payer ID: {SAMPLE_CMS1500_CLAIM.payerId}
                    </div>
                    <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                      {SAMPLE_CMS1500_CLAIM.payerAddress}
                    </div>
                  </div>

                  {/* SECTION 1: PATIENT & INSURED DEMOGRAPHICS (BOXES 1 - 8) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-rose-950 dark:text-rose-300">
                      Section 1: Patient & Insured Demographics (Boxes 1 – 8)
                    </span>
                  </div>

                  {/* Row 1: Box 1 & 1a */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('1')}
                      className={`md:col-span-7 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('1')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1.5`}>
                        1. TYPE OF HEALTH INSURANCE COVERAGE
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs font-mono">
                        {['Medicare', 'Medicaid', 'TRICARE', 'CHAMPVA', 'Group Health Plan', 'FECA', 'Other'].map(type => (
                          <span 
                            key={type}
                            className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 ${
                              type === 'Group Health Plan'
                                ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                                : 'bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {type === 'Group Health Plan' && '✓'} {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('1a')}
                      className={`md:col-span-5 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('1a')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        1a. INSURED'S I.D. NUMBER
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_CMS1500_CLAIM.subscriber.id}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-1">
                        Primary Member Policy ID (Loop 2010BA NM109)
                      </div>
                    </div>
                  </div>

                  {/* Patient Demographics Row: Box 2, 3, 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('2')}
                      className={`md:col-span-5 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('2')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        2. PATIENT'S NAME (Last, First, Middle)
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_CMS1500_CLAIM.patient.name}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-1">
                        Legal patient name matching payer eligibility
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('3')}
                      className={`md:col-span-3 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('3')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        3. BIRTH DATE & SEX
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_CMS1500_CLAIM.patient.dob}
                      </div>
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
                        <span>[✓] Female (F)</span>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('4')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('4')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        4. INSURED'S NAME
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_CMS1500_CLAIM.subscriber.name}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-1">
                        Subscriber on policy contract
                      </div>
                    </div>
                  </div>

                  {/* Address Row: Box 5, 6, 7 */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('5')}
                      className={`md:col-span-5 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('5')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        5. PATIENT'S ADDRESS & PHONE
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_CMS1500_CLAIM.patient.address}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-1">
                        {SAMPLE_CMS1500_CLAIM.patient.city}, {SAMPLE_CMS1500_CLAIM.patient.state} {SAMPLE_CMS1500_CLAIM.patient.zip} • Tel: (214) 555-0144
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('6')}
                      className={`md:col-span-3 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('6')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        6. RELATION TO INSURED
                      </div>
                      <div className={`${scale.valueSize} text-emerald-700 dark:text-emerald-400`}>
                        ✓ Self (18)
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        [ ] Spouse  [ ] Child  [ ] Other
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('7')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('7')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        7. INSURED'S ADDRESS
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        SAME AS PATIENT
                      </div>
                      <div className="text-xs font-mono text-slate-500 mt-1">
                        Dallas, TX 75207
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: SECONDARY INSURANCE & ACCIDENT DETAILS (BOXES 9 – 11d) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-rose-950 dark:text-rose-300">
                      Section 2: Secondary Insurance (COB) & Accident Details (Boxes 9 – 11d)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('9')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('9')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        9. OTHER INSURED'S NAME & POLICY
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_CMS1500_CLAIM.secondaryPayer.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-1">
                        Policy: {SAMPLE_CMS1500_CLAIM.secondaryPayer.policy}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Secondary Coordination of Benefits (COB)
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('10a-c')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('10a-c')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        10. IS CONDITION RELATED TO:
                      </div>
                      <div className="space-y-1 mt-1 text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
                        <div className="flex items-center justify-between">
                          <span>10a. Employment:</span>
                          <span className="text-rose-700 dark:text-rose-400">[✓] NO</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>10b. Auto Accident:</span>
                          <span className="text-rose-700 dark:text-rose-400">[✓] NO (State: TX)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>10c. Other Accident:</span>
                          <span className="text-rose-700 dark:text-rose-400">[✓] NO</span>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('11')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('11')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        11. INSURED'S POLICY / GROUP NUMBER
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_CMS1500_CLAIM.subscriber.policyGroup}
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                        11d. Other Plan: [✓] YES (Secondary Coverage)
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: SIGNATURES & AUTHORIZATIONS (BOXES 12 & 13) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-rose-950 dark:text-rose-300">
                      Section 3: Patient Authorizations & Benefits Assignment (Boxes 12 & 13)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('12')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('12')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        12. PATIENT'S SIGNATURE (RELEASE OF INFORMATION - ROI)
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`${scale.valueSize} text-emerald-700 dark:text-emerald-400`}>
                          SIGNATURE ON FILE (SOF)
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                          Date: 01/15/2025
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Authorizes medical records release to BCBS Texas for claims adjudication
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('13')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('13')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        13. INSURED'S SIGNATURE (ASSIGNMENT OF BENEFITS - AOB)
                      </div>
                      <div className={`${scale.valueSize} text-emerald-700 dark:text-emerald-400 mt-1`}>
                        SIGNATURE ON FILE (SOF)
                      </div>
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                        ✓ Authorizes insurance payment to go DIRECTLY to Dr. Jenkins instead of patient
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: CLINICAL CONTEXT, REFERRALS & PRIOR AUTH (BOXES 14 - 23) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-rose-950 dark:text-rose-300">
                      Section 4: Clinical History, Prior Auth & ICD-10 Diagnoses (Boxes 14 – 23)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('14')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('14')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        14. DATE OF CURRENT ILLNESS / INJURY / LMP
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        01/10/2025
                      </div>
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">
                        Qualifier 431: Onset of Current Symptoms
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('17')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('17')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        17. REFERRING PROVIDER & 17b NPI
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        DN {SAMPLE_CMS1500_CLAIM.clinical.referringProvider}
                      </div>
                      <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 mt-1">
                        NPI: {SAMPLE_CMS1500_CLAIM.clinical.referringNpi}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('19')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('19')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        19. ADDITIONAL CLAIM INFO (NOC)
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        NOC: Radiculopathy Eval
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Not Otherwise Classified clinical documentation
                      </div>
                    </div>
                  </div>

                  {/* Box 21: ICD-10 Diagnoses */}
                  <div 
                    onClick={() => handleSelectCmsBoxNumber('21')}
                    className={`border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                      isCmsSelected('21')
                        ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                        : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide`}>
                        21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY (ICD-10-CM)
                      </div>
                      <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 self-start sm:self-auto">
                        ICD Indicator: 0 (ICD-10-CM)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {SAMPLE_CMS1500_CLAIM.clinical.diagnoses.map(d => (
                        <div key={d.letter} className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 p-3 rounded-xl">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-mono font-black text-xs flex items-center justify-center">
                              {d.letter}
                            </span>
                            <span className="font-mono font-black text-slate-900 dark:text-white text-sm sm:text-base">
                              {d.code}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 line-clamp-2">
                            {d.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Box 22 & 23 */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('22')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('22')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        22. RESUBMISSION CODE & ORIGINAL REF NO.
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        Code: 7 (Replacement Claim)
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-1">
                        Original ICN / Ref #: 2025011500892X
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('23')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('23')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        23. PRIOR AUTHORIZATION / REFERRAL / CLIA NUMBER
                      </div>
                      <div className={`${scale.valueSize} text-emerald-700 dark:text-emerald-400`}>
                        PA: {SAMPLE_CMS1500_CLAIM.clinical.priorAuthNumber}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Pre-certified authorization code for high-level E/M evaluation
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: BOX 24 SERVICE LINES (THE CORE PROFESSIONAL CHARGE GRID) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                      <span className="text-xs font-black uppercase tracking-wider text-rose-950 dark:text-rose-300">
                        Section 5: Box 24 Service Lines & Charges (CPT / HCPCS / Modifiers)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-xs font-bold text-slate-500 mr-1">Inspect:</span>
                      {['24A', '24B', '24D', '24E', '24F', '24G', '24J'].map(sub => (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => handleSelectCmsBoxNumber(sub)}
                          className={`px-2 py-0.5 rounded-lg text-xs font-mono font-black transition-all ${
                            selectedCmsBox.boxNumber === sub
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 hover:bg-rose-200'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dedicated Service Lines Table with Horiz Scroll */}
                  <div className="border-2 border-rose-300 dark:border-rose-900/50 rounded-2xl overflow-hidden shadow-xs bg-white dark:bg-slate-800">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="bg-rose-100/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-300 border-b border-rose-200 dark:border-rose-800 text-xs sm:text-sm font-black uppercase tracking-wide">
                            <th className="py-3 px-3 min-w-[130px]">24A. Dates of Service</th>
                            <th className="py-3 px-2 min-w-[80px] text-center">24B. POS</th>
                            <th className="py-3 px-3 min-w-[200px]">24D. Procedures & Modifiers</th>
                            <th className="py-3 px-2 min-w-[90px] text-center">24E. Diag Pointer</th>
                            <th className="py-3 px-3 min-w-[110px] text-right">24F. $ Charges</th>
                            <th className="py-3 px-2 min-w-[70px] text-center">24G. Units</th>
                            <th className="py-3 px-3 min-w-[140px] text-right">24J. Rend NPI</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-rose-100 dark:divide-slate-700">
                          {SAMPLE_CMS1500_CLAIM.serviceLines.map((line, idx) => (
                            <tr 
                              key={idx}
                              onClick={() => handleSelectCmsBoxNumber('24D')}
                              className={`cursor-pointer transition-all hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 ${scale.tableText} ${
                                selectedCmsBox.boxNumber.startsWith('24')
                                  ? 'bg-emerald-50/30 dark:bg-emerald-950/10'
                                  : ''
                              }`}
                            >
                              <td className="py-3.5 px-3 text-slate-900 dark:text-white font-bold">
                                {line.dos}
                              </td>
                              <td className="py-3.5 px-2 text-center">
                                <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-black">
                                  {line.pos} (Office)
                                </span>
                              </td>
                              <td className="py-3.5 px-3">
                                <span className="text-slate-950 dark:text-white font-black text-sm sm:text-base mr-1.5">
                                  {line.cpt}
                                </span>
                                {line.mod && (
                                  <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-black border border-purple-300 dark:border-purple-700 text-xs">
                                    -{line.mod}
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-2 text-center">
                                <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 font-black text-xs">
                                  {line.pointer}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-slate-950 dark:text-white text-sm sm:text-base">
                                ${line.charge.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-2 text-center font-bold text-slate-700 dark:text-slate-300">
                                {line.units}
                              </td>
                              <td className="py-3.5 px-3 text-right font-mono text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
                                {line.renderingNpi}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SECTION 6: FINANCIAL TOTALS & TAX ID (BOXES 25 – 30) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-rose-950 dark:text-rose-300">
                      Section 6: Billing Totals, Payments & Tax ID (Boxes 25 – 30)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('25')}
                      className={`md:col-span-3 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('25')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        25. FEDERAL TAX I.D.
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_CMS1500_CLAIM.totals.taxId}
                      </div>
                      <div className="text-xs font-bold text-slate-500 mt-1">
                        [✓] EIN  [ ] SSN
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('26')}
                      className={`md:col-span-3 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('26')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        26. PATIENT'S ACCOUNT NO.
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_CMS1500_CLAIM.patient.accountNumber}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Clinic internal ledger ID
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('27')}
                      className={`md:col-span-2 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('27')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        27. ACCEPT ASSIGN?
                      </div>
                      <div className={`${scale.valueSize} text-emerald-700 dark:text-emerald-400`}>
                        ✓ YES
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Govt Participating
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('28')}
                      className={`md:col-span-2 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('28')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        28. TOTAL CHARGE
                      </div>
                      <div className="text-base sm:text-lg font-black font-mono text-emerald-700 dark:text-emerald-400">
                        ${SAMPLE_CMS1500_CLAIM.totals.totalCharge.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Sum of Box 24F lines
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('29')}
                      className={`md:col-span-2 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('29')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        29. AMT PAID
                      </div>
                      <div className={`${scale.valueSize} text-slate-600 dark:text-slate-400`}>
                        ${SAMPLE_CMS1500_CLAIM.totals.amountPaid.toFixed(2)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Copay at DOS
                      </div>
                    </div>
                  </div>

                  {/* SECTION 7: PHYSICIAN SIGNATURE & FACILITY LOCATION (BOXES 31 – 33) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-rose-950 dark:text-rose-300">
                      Section 7: Physician Signature, Facility Location & Billing Provider (Boxes 31 – 33)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectCmsBoxNumber('31')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('31')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        31. PHYSICIAN SIGNATURE & DATE
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        DR. SARAH JENKINS, MD
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 mt-1">
                        Date: 01/16/2025 (Signature on File)
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('32')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('32')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        32. SERVICE FACILITY (NO P.O. BOX!)
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white truncate`}>
                        {SAMPLE_CMS1500_CLAIM.facility.name}
                      </div>
                      <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5 truncate">
                        {SAMPLE_CMS1500_CLAIM.facility.address}
                      </div>
                      <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 mt-1">
                        NPI 32a: {SAMPLE_CMS1500_CLAIM.facility.npi}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectCmsBoxNumber('33')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isCmsSelected('33')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-rose-200 dark:border-rose-900/40 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-rose-950 dark:text-rose-300 uppercase tracking-wide mb-1`}>
                        33. BILLING PROVIDER & PHONE
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white truncate`}>
                        {SAMPLE_CMS1500_CLAIM.billing.name}
                      </div>
                      <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                        Phone: (214) 555-0199
                      </div>
                      <div className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 mt-1">
                        NPI 33a: {SAMPLE_CMS1500_CLAIM.billing.npi} | Taxo: {SAMPLE_CMS1500_CLAIM.billing.taxonomy}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 text-center text-xs text-rose-950 dark:text-rose-200 font-bold">
                    💡 Click on any Box on the claim above to inspect its rules, EDI 837P mapping, and rejection causes beside the form!
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

            {/* Split Mode: Fixed In-Grid Beside Column */}
            {inspectorLayout === 'split' && (
              <div id="cms-inspector-panel" className="xl:col-span-5 2xl:col-span-4 space-y-4 xl:sticky xl:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
                {renderCmsInspectorCard()}
              </div>
            )}

            {/* Bottom Mode: Stacked Full Width Below Form */}
            {inspectorLayout === 'bottom' && (
              <div id="cms-inspector-panel" className="w-full space-y-4">
                {renderCmsInspectorCard()}
              </div>
            )}
          </div>

          {/* Drawer Mode: Slide-Over Inspector Beside Form (Keeps form 100% large and readable!) */}
          {inspectorLayout === 'drawer' && (
            <>
              {isCmsDrawerOpen ? (
                <div 
                  id="cms-inspector-panel"
                  className="fixed inset-y-0 right-0 z-50 w-full max-w-lg lg:max-w-xl bg-white dark:bg-health-darkCard shadow-2xl border-l-4 border-emerald-500 flex flex-col animate-in slide-in-from-right duration-200"
                >
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/70 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        CMS-1500 Box Inspector • Beside Form
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCmsDrawerOpen(false)}
                      className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Close Side Inspector"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-5 overflow-y-auto flex-1">
                    {renderCmsInspectorCard(() => setIsCmsDrawerOpen(false))}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsCmsDrawerOpen(true)}
                  className="fixed right-4 bottom-8 z-40 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-2xl flex items-center gap-2 border-2 border-emerald-400 transition-all hover:scale-105"
                  title="Open Box Description beside form"
                >
                  <PanelRightOpen className="w-5 h-5" />
                  <span>Explain Box {selectedCmsBox.boxNumber} (Open Beside)</span>
                </button>
              )}
            </>
          )}
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

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {/* Form Scaling / Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
                  <span>Size:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setFormScale('normal')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    formScale === 'normal'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Standard Form Size (100%)"
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setFormScale('large')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    formScale === 'large'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Large Form Size (115% - Recommended)"
                >
                  Large (115%)
                </button>
                <button
                  type="button"
                  onClick={() => setFormScale('huge')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                    formScale === 'huge'
                      ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-300'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Huge Form Size (130% - Maximum Readability)"
                >
                  Huge (130%)
                </button>
              </div>

              {/* Layout Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setInspectorLayout('split')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    inspectorLayout === 'split'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Side-by-Side: Form on Left, Description Beside on Right"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span>Beside Form (Split)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setInspectorLayout('drawer'); setIsUb04DrawerOpen(true); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    inspectorLayout === 'drawer'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Expand Form to Full 100% Width with Slide-Out Inspector"
                >
                  <PanelRightOpen className="w-3.5 h-3.5" />
                  <span>Full-Width Form</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorLayout('bottom')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    inspectorLayout === 'bottom'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Stack Description Below Form"
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Stacked</span>
                </button>
              </div>

              {/* View Modes */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setUb04ViewMode('visual')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    ub04ViewMode === 'visual'
                      ? 'bg-amber-700 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>1. Interactive Form (Clear & Big)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUb04ViewMode('original')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    ub04ViewMode === 'original'
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>2. Scanned Paper (NUBC)</span>
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
                  <span>3. All 81 FLs</span>
                </button>
              </div>
            </div>
          </div>

          <div className={
            inspectorLayout === 'split'
              ? "grid grid-cols-1 xl:grid-cols-12 gap-6 items-start"
              : "space-y-6"
          }>
            {/* Form Area: in split mode takes 7 or 8 columns, in drawer/bottom takes 100% full width */}
            <div className={
              inspectorLayout === 'split'
                ? "xl:col-span-7 2xl:col-span-8 space-y-4"
                : "w-full space-y-4"
            }>
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
                  onSelectItem={(box) => {
                    setSelectedUb04Box(box);
                    setIsUb04DrawerOpen(true);
                  }}
                  getItemKey={b => b.locatorNumber}
                  getItemNumber={b => b.locatorNumber}
                  getItemName={b => b.name}
                  getItemShortName={b => b.shortName}
                  sections={UB04_SECTIONS}
                  activeSection={ub04SectionFilter}
                  onSelectSection={setUb04SectionFilter}
                  inspectorElementId="ub04-inspector-panel"
                  onOpenInspector={() => setIsUb04DrawerOpen(true)}
                />
              )}

              {ub04ViewMode === 'visual' && (
                /* AUTHENTIC LARGE INTERACTIVE UB-04 FORM STUDIO */
                <div className="bg-white dark:bg-slate-900 border-2 border-amber-800/40 rounded-3xl p-5 sm:p-7 shadow-lg relative font-sans space-y-6 transition-all">
                  {/* Top Paper Header Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-amber-800/30 text-amber-950 dark:text-amber-400 gap-2">
                    <div>
                      <div className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-mono text-xs">NUBC UB-04</span>
                        <span>UNIFORM BILLING FORM (CMS-1450)</span>
                      </div>
                      <div className="text-xs text-slate-500 font-semibold mt-0.5">
                        Standard Institutional Inpatient & Outpatient Hospital Facility Format • EDI ANSI-837I Aligned
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-black">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        Case Study: Carlos Ramirez (Inpatient STEMI Admission)
                      </span>
                    </div>
                  </div>

                  {/* SECTION 1: FACILITY BILLING & STATEMENT PERIOD (FL 01 – FL 07) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-300">
                      Section 1: Billing Facility & Statement Covers Period (FL 01 – FL 07)
                    </span>
                  </div>

                  {/* FL 01 & FL 04 Header Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 01')}
                      className={`md:col-span-8 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 01')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 01. BILLING PROVIDER NAME, PHYSICAL ADDRESS & TELEPHONE
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_UB04_CLAIM.facility.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-1">
                        {SAMPLE_UB04_CLAIM.facility.address}, {SAMPLE_UB04_CLAIM.facility.city} {SAMPLE_UB04_CLAIM.facility.state} {SAMPLE_UB04_CLAIM.facility.zip} • Tel: {SAMPLE_UB04_CLAIM.facility.phone}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 04')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 04')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 04. TYPE OF BILL (TOB 4-DIGIT CODE)
                      </div>
                      <div className="text-base sm:text-lg font-mono font-black text-emerald-700 dark:text-emerald-400">
                        {SAMPLE_UB04_CLAIM.billingType.tob}
                      </div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                        {SAMPLE_UB04_CLAIM.billingType.tobMeaning}
                      </div>
                    </div>
                  </div>

                  {/* FL 03, 05, 06 Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 03a-b')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 03a-b')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 03. PATIENT CONTROL # & MRN
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        Acct: {SAMPLE_UB04_CLAIM.patient.controlNumber}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 mt-1">
                        MRN: {SAMPLE_UB04_CLAIM.patient.mrn}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 05')}
                      className={`md:col-span-3 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 05')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 05. FED TAX NO. (TIN)
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_UB04_CLAIM.facility.tin}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Hospital Taxpayer ID
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 06')}
                      className={`md:col-span-5 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 06')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 06. STATEMENT COVERS PERIOD (FROM - THROUGH)
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_UB04_CLAIM.billingType.statementFrom} - {SAMPLE_UB04_CLAIM.billingType.statementThrough}
                      </div>
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">
                        Total Stay: 4 Inpatient Billing Days
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: PATIENT DEMOGRAPHICS & INPATIENT ADMISSION (FL 08 – FL 17) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-300">
                      Section 2: Patient Demographics & Admission / Discharge Status (FL 08 – FL 17)
                    </span>
                  </div>

                  {/* Patient Demographics: FL 08, 12, 17 */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 08')}
                      className={`md:col-span-5 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 08')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 08. PATIENT LEGAL NAME & IDENTIFIERS
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_UB04_CLAIM.patient.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-1">
                        DOB: {SAMPLE_UB04_CLAIM.patient.dob} • Sex: {SAMPLE_UB04_CLAIM.patient.sex} (Male)
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 12')}
                      className={`md:col-span-4 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 12')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 12-15. ADMISSION DATE, HOUR, TYPE & SOURCE
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_UB04_CLAIM.admission.date} (Hr: {SAMPLE_UB04_CLAIM.admission.hour})
                      </div>
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">
                        Type: 1 (Emergency) • Source: 1 (Physician Referral)
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 17')}
                      className={`md:col-span-3 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 17')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 17. PATIENT DISCHARGE STATUS
                      </div>
                      <div className={`${scale.valueSize} text-emerald-700 dark:text-emerald-400`}>
                        01 Routine Home
                      </div>
                      <div className="text-xs text-slate-500 mt-1 truncate">
                        Discharged to Home / Self Care
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: INSTITUTIONAL CODES & OCCURRENCE (FL 18 – FL 41) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-300">
                      Section 3: Condition Codes, Occurrence & Value Amounts (FL 18 – FL 41)
                    </span>
                  </div>

                  {/* Value Codes & Condition Codes: FL 18-28 & FL 39-41 */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 18-28')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 18-28')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1.5`}>
                        FL 18-28. CONDITION CODES
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-mono">
                        {SAMPLE_UB04_CLAIM.codes.conditionCodes.map(c => (
                          <span key={c} className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white px-2.5 py-1 rounded-lg font-bold border border-slate-300 dark:border-slate-600">
                            Code {c} (Same-Day Transfer)
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500 mt-1.5">
                        Inpatient admission special operational circumstances
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 39-41')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 39-41')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1.5`}>
                        FL 39-41. VALUE CODES & AMOUNTS
                      </div>
                      <div className="space-y-1 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200">
                        {SAMPLE_UB04_CLAIM.codes.valueCodes.map(v => (
                          <div key={v.code} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                            <span className="font-bold text-amber-800 dark:text-amber-300">Code {v.code}:</span>
                            <span className="font-black">${v.amount} ({v.desc})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: REVENUE CODES & ITEMIZED CHARGES (FL 42 – FL 47) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-300">
                      Section 4: Itemized Hospital Revenue Codes & Charges (FL 42 – FL 47)
                    </span>
                  </div>

                  {/* FL 42 - FL 47 REVENUE CHARGES GRID */}
                  <div className="border-2 border-amber-800/40 rounded-2xl overflow-hidden shadow-xs bg-white dark:bg-slate-800">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="bg-amber-100/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-300 border-b border-amber-200 dark:border-amber-800 text-xs sm:text-sm font-black uppercase tracking-wide">
                            <th className="py-3 px-3 min-w-[110px]">FL 42. Rev Code</th>
                            <th className="py-3 px-3 min-w-[240px]">FL 43. Revenue Description</th>
                            <th className="py-3 px-2 min-w-[100px] text-center">FL 44. HCPCS</th>
                            <th className="py-3 px-2 min-w-[80px] text-center">FL 46. Units</th>
                            <th className="py-3 px-3 min-w-[140px] text-right">FL 47. Total Charges</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-100 dark:divide-slate-700">
                          {SAMPLE_UB04_CLAIM.revenueGrid.map((row, idx) => (
                            <tr 
                              key={idx}
                              onClick={() => handleSelectUb04Locator('FL 42')}
                              className={`cursor-pointer transition-all hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 ${scale.tableText} ${
                                row.rev === '0001' ? 'bg-amber-100/70 dark:bg-amber-950/50 font-black' : ''
                              }`}
                            >
                              <td className="py-3.5 px-3 text-rose-800 dark:text-rose-400 font-bold">
                                {row.rev}
                              </td>
                              <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                                {row.desc}
                              </td>
                              <td className="py-3.5 px-2 text-center text-slate-600 dark:text-slate-400 font-bold">
                                {row.hcpcs || '--'}
                              </td>
                              <td className="py-3.5 px-2 text-center font-bold text-slate-800 dark:text-slate-200">
                                {row.units}
                              </td>
                              <td className="py-3.5 px-3 text-right font-black text-slate-950 dark:text-white text-sm sm:text-base">
                                ${row.charge.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SECTION 5: PAYER INFORMATION & PRIOR AUTHORIZATION (FL 50 – FL 65) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-300">
                      Section 5: Payer Information & Prior Authorization (FL 50 – FL 65)
                    </span>
                  </div>

                  {/* Payer & Insured: FL 50, 56, 60, 63 */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 50')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 50')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 50. PAYER NAME (LINE A PRIMARY)
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white truncate`}>
                        {SAMPLE_UB04_CLAIM.payer.primaryPayer}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Line B Secondary: BCBS Texas
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 60')}
                      className={`md:col-span-3 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 60')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 60. INSURED UNIQUE ID (MBI)
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white truncate`}>
                        {SAMPLE_UB04_CLAIM.payer.mbi}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Medicare Beneficiary Identifier
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 63')}
                      className={`md:col-span-3 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 63')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 63. PRIOR AUTH NUMBER
                      </div>
                      <div className={`${scale.valueSize} text-emerald-700 dark:text-emerald-400 truncate`}>
                        {SAMPLE_UB04_CLAIM.payer.priorAuth}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Inpatient acute authorization
                      </div>
                    </div>
                  </div>

                  {/* SECTION 6: CLINICAL DIAGNOSES & PROCEDURES (FL 67 – FL 74) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-300">
                      Section 6: Principal Diagnosis (ICD-10-CM) & Procedure (ICD-10-PCS) (FL 67 – FL 74)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 67')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 67')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 67. PRINCIPAL DIAGNOSIS & POA INDICATOR
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_UB04_CLAIM.diagnoses.principal.code} (POA: {SAMPLE_UB04_CLAIM.diagnoses.principal.poa})
                      </div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                        {SAMPLE_UB04_CLAIM.diagnoses.principal.desc}
                      </div>
                      <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                        POA 'Y': Present at time of inpatient admission
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 74')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 74')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 74. PRINCIPAL PROCEDURE (ICD-10-PCS) & DATE
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_UB04_CLAIM.procedures[0].code} • Date: {SAMPLE_UB04_CLAIM.procedures[0].date}
                      </div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                        {SAMPLE_UB04_CLAIM.procedures[0].desc}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Inpatient hospital surgical operating room procedure
                      </div>
                    </div>
                  </div>

                  {/* SECTION 7: ATTENDING & OPERATING PHYSICIANS (FL 76 – FL 77) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-300">
                      Section 7: Attending Physician & Operating Surgeon (FL 76 – FL 77)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                    <div 
                      onClick={() => handleSelectUb04Locator('FL 76')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 76')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 76. ATTENDING PHYSICIAN & NPI
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_UB04_CLAIM.physicians.attending.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 mt-1">
                        NPI: {SAMPLE_UB04_CLAIM.physicians.attending.npi}
                      </div>
                    </div>

                    <div 
                      onClick={() => handleSelectUb04Locator('FL 77')}
                      className={`md:col-span-6 border-2 ${scale.cardPadding} rounded-2xl cursor-pointer transition-all ${
                        isUb04Selected('FL 77')
                          ? 'border-emerald-600 ring-4 ring-emerald-400/40 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                          : 'border-amber-800/30 hover:border-emerald-400 bg-white dark:bg-slate-800/80'
                      }`}
                    >
                      <div className={`${scale.labelSize} text-amber-950 dark:text-amber-300 uppercase tracking-wide mb-1`}>
                        FL 77. OPERATING SURGEON & NPI
                      </div>
                      <div className={`${scale.valueSize} text-slate-950 dark:text-white`}>
                        {SAMPLE_UB04_CLAIM.physicians.operating.name}
                      </div>
                      <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 mt-1">
                        NPI: {SAMPLE_UB04_CLAIM.physicians.operating.npi}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-center text-xs text-amber-950 dark:text-amber-200 font-bold">
                    💡 Click on any Form Locator on the claim above to inspect hospital DRG impact, rules, sample values, and denial triggers beside the form!
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

            {/* Split Mode: Fixed In-Grid Beside Column */}
            {inspectorLayout === 'split' && (
              <div id="ub04-inspector-panel" className="xl:col-span-5 2xl:col-span-4 space-y-4 xl:sticky xl:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
                {renderUb04InspectorCard()}
              </div>
            )}

            {/* Bottom Mode: Stacked Full Width Below Form */}
            {inspectorLayout === 'bottom' && (
              <div id="ub04-inspector-panel" className="w-full space-y-4">
                {renderUb04InspectorCard()}
              </div>
            )}
          </div>

          {/* Drawer Mode: Slide-Over Inspector Beside Form (Keeps form 100% large and readable!) */}
          {inspectorLayout === 'drawer' && (
            <>
              {isUb04DrawerOpen ? (
                <div 
                  id="ub04-inspector-panel"
                  className="fixed inset-y-0 right-0 z-50 w-full max-w-lg lg:max-w-xl bg-white dark:bg-health-darkCard shadow-2xl border-l-4 border-amber-600 flex flex-col animate-in slide-in-from-right duration-200"
                >
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/70 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        UB-04 Form Locator Inspector • Beside Form
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsUb04DrawerOpen(false)}
                      className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Close Side Inspector"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-5 overflow-y-auto flex-1">
                    {renderUb04InspectorCard(() => setIsUb04DrawerOpen(false))}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsUb04DrawerOpen(true)}
                  className="fixed right-4 bottom-8 z-40 px-4 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold shadow-2xl flex items-center gap-2 border-2 border-amber-400 transition-all hover:scale-105"
                  title="Open Locator Description beside form"
                >
                  <PanelRightOpen className="w-5 h-5" />
                  <span>Explain {selectedUb04Box.locatorNumber} (Open Beside)</span>
                </button>
              )}
            </>
          )}
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
