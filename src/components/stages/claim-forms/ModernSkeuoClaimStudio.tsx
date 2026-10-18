import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Building2, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Table, 
  Download,
  Info,
  Calendar,
  Hash,
  User,
  DollarSign,
  Activity,
  FileCheck
} from 'lucide-react';
import { CMS_1500_BOXES, UB_04_BOXES, FORM_COMPARISONS } from '../../../data/claimForms';
import { ClaimBoxDetail, Ub04BoxDetail } from '../../../types/rcm';

export const ModernSkeuoClaimStudio: React.FC = () => {
  const [formType, setFormType] = useState<'cms1500' | 'ub04'>('cms1500');
  const [activeTab, setActiveTab] = useState<'interactive' | 'official' | 'matrix'>('interactive');
  const [mobileActiveView, setMobileActiveView] = useState<'form' | 'inspector'>('form');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  // Selected Box IDs
  const [selectedCmsBox, setSelectedCmsBox] = useState<ClaimBoxDetail>(
    () => CMS_1500_BOXES.find(b => b.boxNumber === '23') || CMS_1500_BOXES[0]
  );
  const [selectedUbBox, setSelectedUbBox] = useState<Ub04BoxDetail>(
    () => UB_04_BOXES.find(b => b.locatorNumber === 'FL 04') || UB_04_BOXES[0]
  );

  // Zoom for official PNG
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Quick lookup helper for CMS box
  const getCmsBox = (num: string) => CMS_1500_BOXES.find(b => b.boxNumber === num) || {
    boxNumber: num,
    name: `Box ${num}`,
    shortName: `Box ${num}`,
    description: 'Detailed billing data element.',
    rules: ['Follow CMS Chapter 26 guidelines.'],
    rejectionCauses: ['Data element mismatch.'],
    sampleValue: 'N/A',
    category: 'patient' as const
  };

  // Quick lookup helper for UB locator
  const getUbBox = (fl: string) => UB_04_BOXES.find(b => b.locatorNumber === fl || b.locatorNumber === `FL ${fl}`) || {
    locatorNumber: fl.startsWith('FL') ? fl : `FL ${fl}`,
    name: `Locator ${fl}`,
    shortName: `Locator ${fl}`,
    description: 'Institutional billing locator element.',
    rules: ['Follow NUBC guidelines.'],
    rejectionCauses: ['Missing institutional data.'],
    sampleValue: 'N/A',
    ediMapping: '837I',
    category: 'charges' as const
  };

  // OneNote specific insights for key boxes
  const getJobNotesInsight = (boxNumber: string, isUb: boolean) => {
    if (isUb) {
      if (boxNumber === 'FL 04' || boxNumber === '4') {
        return 'Jobs Notes 💼 Core Rule: Type of Bill (TOB) is a 3 or 4-digit code. 1st digit: Facility Type (1=Hospital), 2nd digit: Bill Classification (1=Inpatient, 3=Outpatient), 3rd digit: Frequency Code (1=Admit through discharge, 7=Replacement/Corrected claim).';
      }
      if (boxNumber === 'FL 42' || boxNumber === '42') {
        return 'Jobs Notes 💼 Core Rule: Revenue Code is a 4-digit code identifying the hospital department/accommodation (e.g. 0110 Room & Board, 0250 Pharmacy, 0360 Operating Room, 0450 Emergency Room, 0001 Total). Required on every UB-04 institutional service line.';
      }
      if (boxNumber === 'FL 67' || boxNumber === '67') {
        return 'Jobs Notes 💼 Core Rule: Principal Diagnosis is the chief clinical condition established after medical study to be responsible for occasioning the patient\'s hospital admission. Cannot be an external cause code.';
      }
      if (boxNumber === 'FL 76' || boxNumber === '76') {
        return 'Jobs Notes 💼 Core Rule: Attending Physician NPI is mandatory for all inpatient and surgical hospital claims. Must be an individual Type 1 NPI.';
      }
      return null;
    } else {
      if (boxNumber === '23') {
        return 'Jobs Notes 💼 Core Q&A: (1) CLIA 10-digit alphanumeric number is mandatory in Box 23 for all clinical lab tests (Congress 1988 law). (2) Prior Authorization / Retro-auth number is entered here. Standard TAT to secure retro-auth is 72 hours!';
      }
      if (boxNumber === '24D') {
        return 'Jobs Notes 💼 Core Q&A: Report 5-digit CPT code + up to four 2-digit modifiers. Modifiers (like 25, 59, 76, 77, 91, XS) bypass NCCI bundle edits without changing procedure definition.';
      }
      if (boxNumber === '21') {
        return 'Jobs Notes 💼 Core Q&A: Accommodates up to 12 ICD-10-CM diagnosis codes (Lines A through L). Diagnosis pointers in Box 24E link specific procedures to their supporting diagnosis.';
      }
      if (boxNumber === '22') {
        return 'Jobs Notes 💼 Core Q&A: Resubmission Code "7" indicates a Replacement/Corrected claim; Code "8" indicates a Void/Cancel claim. Must pair with the original claim ICN/reference number.';
      }
      if (boxNumber === '24B') {
        return 'Jobs Notes 💼 Core Q&A: Place of Service (POS) 2-digit code. E.g., POS 11 (Office), POS 21 (Inpatient), POS 22 (Outpatient), POS 23 (ER), POS 24 (ASC). Determines facility vs non-facility fee schedule reimbursement.';
      }
      if (boxNumber === '1a') {
        return 'Jobs Notes 💼 Core Q&A: Subscriber Member ID. For Medicare, must be the 11-digit alphanumeric MBI (Medicare Beneficiary Identifier) without dashes. Never report Social Security Numbers!';
      }
      if (boxNumber === '11') {
        return 'Jobs Notes 💼 Core Q&A: Insured\'s Policy Group Number. Crucial for Coordination of Benefits (COB) and secondary claims routing.';
      }
      if (boxNumber === '24J') {
        return 'Jobs Notes 💼 Core Q&A: Rendering Provider NPI (Type 1 Individual). Identifies the exact clinician who delivered the hands-on service. Must differ from Box 33a (Billing NPI - Type 2 Group) for group practices.';
      }
      return null;
    }
  };

  const jobNotesInsight = formType === 'cms1500' 
    ? getJobNotesInsight(selectedCmsBox.boxNumber, false)
    : getJobNotesInsight(selectedUbBox.locatorNumber, true);

  // Box Selection Handler
  const handleSelectBox = (boxNumber: string) => {
    if (formType === 'cms1500') {
      const match = CMS_1500_BOXES.find(b => b.boxNumber === boxNumber);
      if (match) {
        setSelectedCmsBox(match);
        setMobileActiveView('inspector');
      }
    } else {
      const cleanFl = boxNumber.startsWith('FL') ? boxNumber : `FL ${boxNumber}`;
      const match = UB_04_BOXES.find(b => b.locatorNumber === cleanFl || b.locatorNumber.replace(/\s+/g, '') === cleanFl.replace(/\s+/g, ''));
      if (match) {
        setSelectedUbBox(match);
        setMobileActiveView('inspector');
      }
    }
  };

  // Stepper handlers
  const handleNextBox = () => {
    if (formType === 'cms1500') {
      const currIdx = CMS_1500_BOXES.findIndex(b => b.boxNumber === selectedCmsBox.boxNumber);
      const nextIdx = (currIdx + 1) % CMS_1500_BOXES.length;
      setSelectedCmsBox(CMS_1500_BOXES[nextIdx]);
    } else {
      const currIdx = UB_04_BOXES.findIndex(b => b.locatorNumber === selectedUbBox.locatorNumber);
      const nextIdx = (currIdx + 1) % UB_04_BOXES.length;
      setSelectedUbBox(UB_04_BOXES[nextIdx]);
    }
  };

  const handlePrevBox = () => {
    if (formType === 'cms1500') {
      const currIdx = CMS_1500_BOXES.findIndex(b => b.boxNumber === selectedCmsBox.boxNumber);
      const prevIdx = (currIdx - 1 + CMS_1500_BOXES.length) % CMS_1500_BOXES.length;
      setSelectedCmsBox(CMS_1500_BOXES[prevIdx]);
    } else {
      const currIdx = UB_04_BOXES.findIndex(b => b.locatorNumber === selectedUbBox.locatorNumber);
      const prevIdx = (currIdx - 1 + UB_04_BOXES.length) % UB_04_BOXES.length;
      setSelectedUbBox(UB_04_BOXES[prevIdx]);
    }
  };

  // Reusable Interactive Box Component for CMS-1500
  const CmsFormCell = ({ 
    num, 
    title, 
    sample, 
    colSpan = 'col-span-1', 
    highlight = false 
  }: { 
    num: string; 
    title: string; 
    sample: string; 
    colSpan?: string; 
    highlight?: boolean;
  }) => {
    const isSelected = selectedCmsBox.boxNumber === num;
    const boxData = getCmsBox(num);

    return (
      <div
        onClick={() => handleSelectBox(num)}
        className={`${colSpan} p-2 rounded transition-all cursor-pointer relative group border ${
          isSelected 
            ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-600 dark:border-amber-400 ring-2 ring-amber-500 shadow-md scale-[1.01]' 
            : highlight
              ? 'bg-red-50/40 dark:bg-red-950/20 border-red-300 dark:border-red-900/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:border-amber-400'
              : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 hover:border-amber-400'
        }`}
      >
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[10px] font-mono font-bold text-red-700 dark:text-red-400 uppercase tracking-tight">
            {num}. {title}
          </span>
          {isSelected && (
            <span className="text-[9px] font-mono font-black bg-amber-700 text-white px-1.5 py-0.2 rounded uppercase tracking-wider">
              INSPECTING
            </span>
          )}
        </div>
        <div className="font-mono text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
          {sample || boxData.sampleValue}
        </div>
      </div>
    );
  };

  // Reusable Interactive Box Component for UB-04
  const UbFormCell = ({ 
    fl, 
    title, 
    sample, 
    colSpan = 'col-span-1' 
  }: { 
    fl: string; 
    title: string; 
    sample: string; 
    colSpan?: string; 
  }) => {
    const cleanFl = fl.startsWith('FL') ? fl : `FL ${fl}`;
    const isSelected = selectedUbBox.locatorNumber === cleanFl || selectedUbBox.locatorNumber.replace(/\s+/g, '') === cleanFl.replace(/\s+/g, '');
    const boxData = getUbBox(cleanFl);

    return (
      <div
        onClick={() => handleSelectBox(cleanFl)}
        className={`${colSpan} p-2 rounded transition-all cursor-pointer relative group border ${
          isSelected 
            ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-600 dark:border-amber-400 ring-2 ring-amber-500 shadow-md scale-[1.01]' 
            : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 hover:border-amber-400'
        }`}
      >
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-tight">
            {cleanFl} — {title}
          </span>
          {isSelected && (
            <span className="text-[9px] font-mono font-black bg-amber-700 text-white px-1.5 py-0.2 rounded uppercase tracking-wider">
              INSPECTING
            </span>
          )}
        </div>
        <div className="font-mono text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
          {sample || boxData.sampleValue}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Studio Command Header */}
      <div className="skeuo-paper p-4 sm:p-6 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-emerald-800 text-white font-mono text-xs px-2.5 py-0.5 rounded">
                STAGE 8 CLAIM STUDIO
              </span>
              <span className="text-xs font-mono text-stone-700 dark:text-stone-300 font-bold uppercase tracking-wide">
                AUTHENTIC OCR DROP-OUT RED & BLUE FORMS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
              Official Medical Claim Forms Studio (CMS-1500 & UB-04)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              Complete interactive split-screen experience: inspect the full authentic form with real billing sample values on the left while exploring box-by-box CMS Chapter 26 rules, ANSI X12 837 mappings, and Jobs Notes 💼 interview tips on the right.
            </p>
          </div>

          {/* Form Switcher Pill Buttons */}
          <div className="flex items-center gap-2 p-1.5 bg-stone-200 dark:bg-stone-800 rounded-xl border border-stone-300 dark:border-stone-700 self-start lg:self-auto">
            <button
              onClick={() => {
                setFormType('cms1500');
                setSelectedSection('all');
              }}
              className={`px-3.5 py-2 rounded-lg font-serif font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                formType === 'cms1500'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>CMS-1500 (33 Boxes - Professional)</span>
            </button>

            <button
              onClick={() => {
                setFormType('ub04');
                setSelectedSection('all');
              }}
              className={`px-3.5 py-2 rounded-lg font-serif font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                formType === 'ub04'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>UB-04 (81 Locators - Institutional)</span>
            </button>
          </div>
        </div>

        {/* View Mode Controls & Quick Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-stone-300 dark:border-stone-700">
          {/* Mode Switch Tabs */}
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
            <span className="text-stone-700 dark:text-stone-300 mr-1">Studio View:</span>
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'interactive'
                  ? 'bg-amber-800 text-white border-amber-900 shadow-sm'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Real Form</span>
            </button>

            <button
              onClick={() => setActiveTab('official')}
              className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'official'
                  ? 'bg-amber-800 text-white border-amber-900 shadow-sm'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Official Scanned PDF</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'matrix'
                  ? 'bg-amber-800 text-white border-amber-900 shadow-sm'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>837P vs 837I Matrix</span>
            </button>
          </div>

          {/* Quick Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder={formType === 'cms1500' ? "Search Box (e.g. 23, 24D, CLIA)..." : "Search Locator (e.g. FL 04, Revenue)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
          </div>
        </div>
      </div>

      {/* Mobile Switcher Tab (Small screens only) */}
      <div className="lg:hidden flex rounded-xl border border-stone-400 bg-stone-200 dark:bg-stone-800 p-1 font-serif text-xs font-bold">
        <button
          onClick={() => setMobileActiveView('form')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            mobileActiveView === 'form' ? 'bg-amber-800 text-white shadow' : 'text-stone-700 dark:text-stone-300'
          }`}
        >
          📄 View Form ({formType === 'cms1500' ? 'CMS-1500' : 'UB-04'})
        </button>
        <button
          onClick={() => setMobileActiveView('inspector')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            mobileActiveView === 'inspector' ? 'bg-amber-800 text-white shadow' : 'text-stone-700 dark:text-stone-300'
          }`}
        >
          🔍 Box Inspector ({formType === 'cms1500' ? `Box ${selectedCmsBox.boxNumber}` : selectedUbBox.locatorNumber})
        </button>
      </div>

      {/* Main Studio Body: Side-by-Side Grid */}
      {activeTab === 'matrix' ? (
        // Comparison Matrix Tab
        <div className="skeuo-paper p-5 sm:p-7 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-md">
          <div className="flex items-center gap-2 pb-4 border-b border-stone-300 dark:border-stone-700">
            <span className="skeuo-stamp-approved text-xs px-2.5 py-0.5 font-mono uppercase">
              PROFESSIONAL VS INSTITUTIONAL
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              CMS-1500 (837P) vs UB-04 (837I) Comprehensive Matrix
            </h3>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b-2 border-stone-400 dark:border-stone-600 text-stone-800 dark:text-stone-200 text-left">
                  <th className="py-2.5 px-3 bg-stone-100 dark:bg-stone-800">DIMENSION / ATTRIBUTE</th>
                  <th className="py-2.5 px-3 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300">
                    PROFESSIONAL (CMS-1500 / 837P)
                  </th>
                  <th className="py-2.5 px-3 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300">
                    INSTITUTIONAL (UB-04 / 837I)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-700 font-sans">
                {FORM_COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/40 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-stone-900 dark:text-stone-100 bg-stone-50/50 dark:bg-stone-800/50">
                      {row.feature}
                    </td>
                    <td className="py-2.5 px-3 text-stone-800 dark:text-stone-200 leading-relaxed">
                      {row.professional}
                    </td>
                    <td className="py-2.5 px-3 text-stone-800 dark:text-stone-200 leading-relaxed">
                      {row.facility}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: THE FORM (60% on desktop) */}
          <div className={`lg:col-span-7 space-y-4 ${mobileActiveView === 'form' ? 'block' : 'hidden lg:block'}`}>
            {activeTab === 'interactive' && formType === 'cms1500' && (
              // CMS-1500 REALISTIC INTERACTIVE FORM
              <div className="skeuo-paper p-4 sm:p-6 rounded-2xl border-2 border-red-700 dark:border-red-600 shadow-skeuo-raised space-y-4">
                {/* Authentic Red Form Header */}
                <div className="border-b-2 border-red-700 dark:border-red-600 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-red-800 dark:text-red-400 font-bold uppercase tracking-wider">
                    <span>HEALTH INSURANCE CLAIM FORM</span>
                    <span>APPROVED BY NATIONAL UNIFORM CLAIM COMMITTEE (NUCC) 02/12</span>
                  </div>
                  <div className="text-[10px] font-sans text-stone-800 dark:text-stone-200 mt-0.5">
                    Click any box to inspect side-by-side rules, sample values, and Jobs Notes 💼 interview insights.
                  </div>
                </div>

                {/* Carrier Top Area */}
                <div className="p-2.5 rounded border border-red-300 dark:border-red-900/60 bg-red-50/20 dark:bg-stone-900/60 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-red-800 dark:text-red-400 font-bold block">CARRIER BLOCK:</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">BLUE CROSS BLUE SHIELD — EDI PAYER ID: 00810</span>
                  </div>
                  <span className="text-[10px] text-stone-800 dark:text-stone-200">P.O. BOX 98124, DALLAS, TX 75201</span>
                </div>

                {/* SECTION 1: PATIENT & INSURED DEMOGRAPHICS (Boxes 1 - 13) */}
                <div className="border-2 border-red-700 dark:border-red-600 rounded-lg p-3 space-y-3 bg-white/60 dark:bg-stone-950/40">
                  <div className="flex items-center gap-2 border-b border-red-300 dark:border-red-900/60 pb-1.5">
                    <span className="text-[11px] font-mono font-bold text-red-800 dark:text-red-400 uppercase">
                      SECTION 1: PATIENT & INSURED DEMOGRAPHICS (BOXES 1 – 13)
                    </span>
                  </div>

                  {/* Row 1: Box 1 & 1a */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <CmsFormCell 
                      num="1" 
                      title="Medicare/Medicaid/TRICARE/Group" 
                      sample="Group Health Plan (Checked)" 
                      highlight 
                    />
                    <CmsFormCell 
                      num="1a" 
                      title="Insured's ID / MBI Number" 
                      sample="XYZ123456789 (MBI: 1EG4-TE5-MK72)" 
                      highlight 
                    />
                  </div>

                  {/* Row 2: Box 2, 3, 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <CmsFormCell num="2" title="Patient's Legal Name" sample="JOHNSON, ELEANOR M." />
                    <CmsFormCell num="3" title="Patient Birth Date & Sex" sample="04/18/1982 | Female" />
                    <CmsFormCell num="4" title="Insured's Full Name" sample="JOHNSON, ROBERT L." />
                  </div>

                  {/* Row 3: Box 5, 6, 7 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <CmsFormCell num="5" title="Patient's Address & Tel" sample="742 Evergreen Terr, Springfield, IL" />
                    <CmsFormCell num="6" title="Relationship to Insured" sample="Spouse (Checked)" />
                    <CmsFormCell num="7" title="Insured's Address & Tel" sample="Same as Patient (742 Evergreen Terr)" />
                  </div>

                  {/* Row 4: Box 9 & 10 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <CmsFormCell num="9" title="Other Insured's Name (Secondary)" sample="AETNA CHOICE POS II (ID: W998214)" />
                    <CmsFormCell num="10" title="Condition Related to Auto/Work?" sample="10a: NO | 10b: NO | 10c: NO" />
                  </div>

                  {/* Row 5: Box 11, 12, 13 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <CmsFormCell num="11" title="Insured's Policy Group #" sample="GRP-882194-IL" highlight />
                    <CmsFormCell num="12" title="Patient's Signature (SOF)" sample="SIGNATURE ON FILE (10/18/2026)" />
                    <CmsFormCell num="13" title="Insured's Assignment (AOB)" sample="SIGNATURE ON FILE (10/18/2026)" />
                  </div>
                </div>

                {/* SECTION 2: CLINICAL ENCOUNTER & DIAGNOSIS (Boxes 14 - 23) */}
                <div className="border-2 border-red-700 dark:border-red-600 rounded-lg p-3 space-y-3 bg-white/60 dark:bg-stone-950/40">
                  <div className="flex items-center gap-2 border-b border-red-300 dark:border-red-900/60 pb-1.5">
                    <span className="text-[11px] font-mono font-bold text-red-800 dark:text-red-400 uppercase">
                      SECTION 2: CLINICAL ENCOUNTER, REFERRAL & DIAGNOSIS (BOXES 14 – 23)
                    </span>
                  </div>

                  {/* Row 1: Box 14, 15, 16, 17 */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <CmsFormCell num="14" title="Date of Current Illness/LMP" sample="10/12/2026 (Qual 431)" />
                    <CmsFormCell num="15" title="Other Date & Qual" sample="None Reported" />
                    <CmsFormCell num="16" title="Dates Unable to Work" sample="Not Applicable" />
                    <CmsFormCell num="17" title="Referring Provider & NPI" sample="DR. MARK SLOAN | NPI: 1487291038" />
                  </div>

                  {/* Row 2: Box 18, 19, 20 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <CmsFormCell num="18" title="Hospitalization Dates" sample="Not Applicable (Outpatient)" />
                    <CmsFormCell num="19" title="Additional Claim Info (PWK)" sample="NOC Drug: J9999 / 20mg" />
                    <CmsFormCell num="20" title="Outside Lab & Charges?" sample="NO | Charge: $0.00" />
                  </div>

                  {/* Row 3: Box 21 (Diagnosis Codes Table) */}
                  <div 
                    onClick={() => handleSelectBox('21')}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      selectedCmsBox.boxNumber === '21' 
                        ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-600 ring-2 ring-amber-500' 
                        : 'bg-white dark:bg-stone-900 border-red-300 dark:border-red-900/60 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-red-800 dark:text-red-400 uppercase">
                        21. DIAGNOSIS OR NATURE OF ILLNESS (ICD-10-CM LINES A THROUGH L) — [ICD IND = 0]
                      </span>
                      {selectedCmsBox.boxNumber === '21' && (
                        <span className="text-[9px] font-mono font-bold bg-amber-700 text-white px-1.5 py-0.2 rounded uppercase">
                          INSPECTING
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                      <div className="p-1.5 rounded bg-stone-100 dark:bg-stone-800">
                        <span className="text-red-700 dark:text-red-400 font-bold mr-1">A:</span>
                        <span className="text-stone-900 dark:text-stone-100 font-bold">I10 (Essential HTN)</span>
                      </div>
                      <div className="p-1.5 rounded bg-stone-100 dark:bg-stone-800">
                        <span className="text-red-700 dark:text-red-400 font-bold mr-1">B:</span>
                        <span className="text-stone-900 dark:text-stone-100 font-bold">E11.9 (Type 2 DM)</span>
                      </div>
                      <div className="p-1.5 rounded bg-stone-100 dark:bg-stone-800">
                        <span className="text-red-700 dark:text-red-400 font-bold mr-1">C:</span>
                        <span className="text-stone-900 dark:text-stone-100 font-bold">M54.5 (Low Back Pain)</span>
                      </div>
                      <div className="p-1.5 rounded bg-stone-100 dark:bg-stone-800">
                        <span className="text-red-700 dark:text-red-400 font-bold mr-1">D:</span>
                        <span className="text-stone-900 dark:text-stone-100 font-bold">R05.9 (Cough, Unsp)</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Box 22 & 23 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <CmsFormCell num="22" title="Resubmission Code (7=Replace, 8=Void)" sample="Code 7 | Orig ICN: 2026-98812-01" highlight />
                    <CmsFormCell num="23" title="Prior Auth # / CLIA 10-Digit #" sample="AUTH-998241 (CLIA: 14D0982410)" highlight />
                  </div>
                </div>

                {/* SECTION 3: PROFESSIONAL SERVICE LINES TABLE (Box 24A - 24J) */}
                <div className="border-2 border-red-700 dark:border-red-600 rounded-lg p-3 space-y-2 bg-white/60 dark:bg-stone-950/40">
                  <div className="flex items-center justify-between border-b border-red-300 dark:border-red-900/60 pb-1.5">
                    <span className="text-[11px] font-mono font-bold text-red-800 dark:text-red-400 uppercase">
                      SECTION 3: PROFESSIONAL SERVICE LINES TABLE (BOX 24A – 24J)
                    </span>
                    <span className="text-[10px] font-mono text-stone-800 dark:text-stone-200">
                      Click any column header or row to inspect
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono border-collapse">
                      <thead>
                        <tr className="border-b border-red-400 dark:border-red-800 text-[10px] text-red-900 dark:text-red-300 bg-red-100/60 dark:bg-red-950/40 text-left">
                          <th className="p-1.5">24A: DOS (FROM/TO)</th>
                          <th className="p-1.5">24B: POS</th>
                          <th className="p-1.5">24C: EMG</th>
                          <th className="p-1.5">24D: CPT/MODIFIERS</th>
                          <th className="p-1.5">24E: DX PTR</th>
                          <th className="p-1.5 text-right">24F: CHARGES</th>
                          <th className="p-1.5 text-center">24G: UNITS</th>
                          <th className="p-1.5">24J: RENDERING NPI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-red-200 dark:divide-red-900/40 font-mono text-xs">
                        <tr 
                          onClick={() => handleSelectBox('24D')}
                          className="hover:bg-amber-100/60 dark:hover:bg-amber-950/40 cursor-pointer transition-colors"
                        >
                          <td className="p-1.5 text-stone-900 dark:text-stone-100">10/18/26 - 10/18/26</td>
                          <td className="p-1.5 font-bold text-stone-900 dark:text-stone-100">11</td>
                          <td className="p-1.5 text-stone-800 dark:text-stone-200">N</td>
                          <td className="p-1.5 font-bold text-blue-700 dark:text-blue-400">99214 - 25</td>
                          <td className="p-1.5 font-bold text-stone-900 dark:text-stone-100">A, B</td>
                          <td className="p-1.5 text-right font-bold text-stone-900 dark:text-stone-100">$185.00</td>
                          <td className="p-1.5 text-center text-stone-900 dark:text-stone-100">1</td>
                          <td className="p-1.5 text-stone-900 dark:text-stone-100 font-bold">1982740192</td>
                        </tr>

                        <tr 
                          onClick={() => handleSelectBox('24D')}
                          className="hover:bg-amber-100/60 dark:hover:bg-amber-950/40 cursor-pointer transition-colors"
                        >
                          <td className="p-1.5 text-stone-900 dark:text-stone-100">10/18/26 - 10/18/26</td>
                          <td className="p-1.5 font-bold text-stone-900 dark:text-stone-100">11</td>
                          <td className="p-1.5 text-stone-800 dark:text-stone-200">N</td>
                          <td className="p-1.5 font-bold text-blue-700 dark:text-blue-400">93000</td>
                          <td className="p-1.5 font-bold text-stone-900 dark:text-stone-100">A</td>
                          <td className="p-1.5 text-right font-bold text-stone-900 dark:text-stone-100">$65.00</td>
                          <td className="p-1.5 text-center text-stone-900 dark:text-stone-100">1</td>
                          <td className="p-1.5 text-stone-900 dark:text-stone-100 font-bold">1982740192</td>
                        </tr>

                        <tr 
                          onClick={() => handleSelectBox('24D')}
                          className="hover:bg-amber-100/60 dark:hover:bg-amber-950/40 cursor-pointer transition-colors"
                        >
                          <td className="p-1.5 text-stone-900 dark:text-stone-100">10/18/26 - 10/18/26</td>
                          <td className="p-1.5 font-bold text-stone-900 dark:text-stone-100">11</td>
                          <td className="p-1.5 text-stone-800 dark:text-stone-200">N</td>
                          <td className="p-1.5 font-bold text-blue-700 dark:text-blue-400">36415</td>
                          <td className="p-1.5 font-bold text-stone-900 dark:text-stone-100">B</td>
                          <td className="p-1.5 text-right font-bold text-stone-900 dark:text-stone-100">$25.00</td>
                          <td className="p-1.5 text-center text-stone-900 dark:text-stone-100">1</td>
                          <td className="p-1.5 text-stone-900 dark:text-stone-100 font-bold">1982740192</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SECTION 4: BILLING TOTALS & SUPPLIER INFO (Boxes 25 - 33) */}
                <div className="border-2 border-red-700 dark:border-red-600 rounded-lg p-3 space-y-3 bg-white/60 dark:bg-stone-950/40">
                  <div className="flex items-center gap-2 border-b border-red-300 dark:border-red-900/60 pb-1.5">
                    <span className="text-[11px] font-mono font-bold text-red-800 dark:text-red-400 uppercase">
                      SECTION 4: BILLING TOTALS, SIGNATURES & PROVIDER INFO (BOXES 25 – 33)
                    </span>
                  </div>

                  {/* Row 1: Box 25, 26, 27, 28, 29 */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <CmsFormCell num="25" title="Federal Tax ID (EIN)" sample="EIN: 36-1928401" />
                    <CmsFormCell num="26" title="Patient Account #" sample="ACCT-99214-J" />
                    <CmsFormCell num="27" title="Accept Assign?" sample="YES (Checked)" />
                    <CmsFormCell num="28" title="Total Charge" sample="$275.00" highlight />
                    <CmsFormCell num="29" title="Amount Paid" sample="$25.00 (Copay)" />
                  </div>

                  {/* Row 2: Box 31, 32, 33 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <CmsFormCell num="31" title="Physician Signature & Date" sample="DR. MEREDITH GREY, MD | 10/18/2026" />
                    <CmsFormCell num="32" title="Service Facility Location & NPI" sample="METRO MEDICAL CLINIC | NPI: 1827491028" />
                    <CmsFormCell num="33" title="Billing Provider Info & NPI" sample="GREY HEALTH GROUP | NPI: 1992019482 (Type 2)" highlight />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interactive' && formType === 'ub04' && (
              // UB-04 REALISTIC INTERACTIVE FORM
              <div className="skeuo-paper p-4 sm:p-6 rounded-2xl border-2 border-blue-700 dark:border-blue-600 shadow-skeuo-raised space-y-4">
                {/* Authentic Blue Header */}
                <div className="border-b-2 border-blue-700 dark:border-blue-600 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-blue-800 dark:text-blue-400 font-bold uppercase tracking-wider">
                    <span>UNIFORM BILL (UB-04 / FORM CMS-1450)</span>
                    <span>APPROVED BY NATIONAL UNIFORM BILLING COMMITTEE (NUBC)</span>
                  </div>
                  <div className="text-[10px] font-sans text-stone-800 dark:text-stone-200 mt-0.5">
                    Click any Form Locator (FL) to inspect side-by-side institutional rules, revenue codes, and Jobs Notes 💼 interview insights.
                  </div>
                </div>

                {/* Section 1: Facility Provider & Bill Classification */}
                <div className="border-2 border-blue-700 dark:border-blue-600 rounded-lg p-3 space-y-3 bg-white/60 dark:bg-stone-950/40">
                  <div className="flex items-center gap-2 border-b border-blue-300 dark:border-blue-900/60 pb-1.5">
                    <span className="text-[11px] font-mono font-bold text-blue-800 dark:text-blue-400 uppercase">
                      SECTION 1: FACILITY IDENTIFICATION & TYPE OF BILL (FL 01 – FL 04)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <UbFormCell fl="FL 01" title="Provider Name & Address" sample="CHICAGO GENERAL HOSPITAL, 500 N MICHIGAN AVE" />
                    <UbFormCell fl="FL 02" title="Pay-to Name & Address" sample="SAME AS FL 01" />
                    <UbFormCell fl="FL 03" title="Patient Control Number" sample="MRN-2026-08819" />
                    <UbFormCell fl="FL 04" title="Type of Bill (TOB)" sample="0111 (Hospital Inpatient Admit)" />
                  </div>
                </div>

                {/* Section 2: Patient Demographics & Admission */}
                <div className="border-2 border-blue-700 dark:border-blue-600 rounded-lg p-3 space-y-3 bg-white/60 dark:bg-stone-950/40">
                  <div className="flex items-center gap-2 border-b border-blue-300 dark:border-blue-900/60 pb-1.5">
                    <span className="text-[11px] font-mono font-bold text-blue-800 dark:text-blue-400 uppercase">
                      SECTION 2: PATIENT DEMOGRAPHICS & ADMISSION DETAILS (FL 05 – FL 17)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <UbFormCell fl="FL 05" title="Federal Tax ID" sample="EIN: 36-9921481" />
                    <UbFormCell fl="FL 06" title="Statement Covers Period" sample="10/10/26 TO 10/14/26" />
                    <UbFormCell fl="FL 08" title="Patient Name" sample="HARRISON, GEORGE K." />
                    <UbFormCell fl="FL 09" title="Patient Address" sample="120 ABBEY ROAD, CHICAGO, IL" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <UbFormCell fl="FL 12" title="Admission Date" sample="10/10/2026" />
                    <UbFormCell fl="FL 13" title="Admission Hour" sample="14 (2:00 PM)" />
                    <UbFormCell fl="FL 14" title="Admission Type" sample="1 (Emergency)" />
                    <UbFormCell fl="FL 17" title="Patient Discharge Status" sample="01 (Routine Disch to Home)" />
                  </div>
                </div>

                {/* Section 3: Revenue Codes & Service Matrix (FL 42 - FL 49) */}
                <div className="border-2 border-blue-700 dark:border-blue-600 rounded-lg p-3 space-y-2 bg-white/60 dark:bg-stone-950/40">
                  <div className="flex items-center justify-between border-b border-blue-300 dark:border-blue-900/60 pb-1.5">
                    <span className="text-[11px] font-mono font-bold text-blue-800 dark:text-blue-400 uppercase">
                      SECTION 3: REVENUE CODES & INSTITUTIONAL CHARGES (FL 42 – FL 49)
                    </span>
                    <span className="text-[10px] font-mono text-stone-800 dark:text-stone-200">
                      Mandatory 4-digit revenue codes
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono border-collapse">
                      <thead>
                        <tr className="border-b border-blue-400 dark:border-blue-800 text-[10px] text-blue-900 dark:text-blue-300 bg-blue-100/60 dark:bg-blue-950/40 text-left">
                          <th className="p-1.5">FL 42: REV CD</th>
                          <th className="p-1.5">FL 43: REVENUE DESCRIPTION</th>
                          <th className="p-1.5">FL 44: HCPCS/RATES</th>
                          <th className="p-1.5">FL 45: SERV DATE</th>
                          <th className="p-1.5 text-center">FL 46: UNITS</th>
                          <th className="p-1.5 text-right">FL 47: TOTAL CHARGES</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-200 dark:divide-blue-900/40 font-mono text-xs">
                        <tr 
                          onClick={() => handleSelectBox('FL 42')}
                          className="hover:bg-amber-100/60 dark:hover:bg-amber-950/40 cursor-pointer transition-colors"
                        >
                          <td className="p-1.5 font-bold text-blue-800 dark:text-blue-400">0110</td>
                          <td className="p-1.5 text-stone-900 dark:text-stone-100">ROOM & BOARD - PRIVATE MEDICAL</td>
                          <td className="p-1.5 text-stone-800 dark:text-stone-200">N/A</td>
                          <td className="p-1.5 text-stone-700 dark:text-stone-300">10/10/2026</td>
                          <td className="p-1.5 text-center text-stone-900 dark:text-stone-100">4</td>
                          <td className="p-1.5 text-right font-bold text-stone-900 dark:text-stone-100">$5,800.00</td>
                        </tr>

                        <tr 
                          onClick={() => handleSelectBox('FL 42')}
                          className="hover:bg-amber-100/60 dark:hover:bg-amber-950/40 cursor-pointer transition-colors"
                        >
                          <td className="p-1.5 font-bold text-blue-800 dark:text-blue-400">0250</td>
                          <td className="p-1.5 text-stone-900 dark:text-stone-100">PHARMACY - GENERAL</td>
                          <td className="p-1.5 text-stone-800 dark:text-stone-200">N/A</td>
                          <td className="p-1.5 text-stone-700 dark:text-stone-300">10/11/2026</td>
                          <td className="p-1.5 text-center text-stone-900 dark:text-stone-100">12</td>
                          <td className="p-1.5 text-right font-bold text-stone-900 dark:text-stone-100">$1,450.00</td>
                        </tr>

                        <tr 
                          onClick={() => handleSelectBox('FL 42')}
                          className="hover:bg-amber-100/60 dark:hover:bg-amber-950/40 cursor-pointer transition-colors"
                        >
                          <td className="p-1.5 font-bold text-blue-800 dark:text-blue-400">0360</td>
                          <td className="p-1.5 text-stone-900 dark:text-stone-100">OPERATING ROOM SERVICES</td>
                          <td className="p-1.5 text-stone-800 dark:text-stone-200">47562</td>
                          <td className="p-1.5 text-stone-700 dark:text-stone-300">10/11/2026</td>
                          <td className="p-1.5 text-center text-stone-900 dark:text-stone-100">1</td>
                          <td className="p-1.5 text-right font-bold text-stone-900 dark:text-stone-100">$8,900.00</td>
                        </tr>

                        <tr 
                          onClick={() => handleSelectBox('FL 42')}
                          className="hover:bg-amber-100/60 dark:hover:bg-amber-950/40 cursor-pointer transition-colors"
                        >
                          <td className="p-1.5 font-bold text-blue-800 dark:text-blue-400">0450</td>
                          <td className="p-1.5 text-stone-900 dark:text-stone-100">EMERGENCY ROOM</td>
                          <td className="p-1.5 text-stone-800 dark:text-stone-200">99284</td>
                          <td className="p-1.5 text-stone-700 dark:text-stone-300">10/10/2026</td>
                          <td className="p-1.5 text-center text-stone-900 dark:text-stone-100">1</td>
                          <td className="p-1.5 text-right font-bold text-stone-900 dark:text-stone-100">$2,100.00</td>
                        </tr>

                        <tr 
                          onClick={() => handleSelectBox('FL 47')}
                          className="bg-blue-50/60 dark:bg-blue-950/40 font-bold"
                        >
                          <td className="p-1.5 text-blue-900 dark:text-blue-300">0001</td>
                          <td className="p-1.5 text-stone-900 dark:text-stone-100">TOTAL CHARGES</td>
                          <td className="p-1.5"></td>
                          <td className="p-1.5"></td>
                          <td className="p-1.5 text-center text-stone-900 dark:text-stone-100">18</td>
                          <td className="p-1.5 text-right text-emerald-800 dark:text-emerald-400 text-sm">$18,250.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Payers, Diagnoses & Clinicians */}
                <div className="border-2 border-blue-700 dark:border-blue-600 rounded-lg p-3 space-y-3 bg-white/60 dark:bg-stone-950/40">
                  <div className="flex items-center gap-2 border-b border-blue-300 dark:border-blue-900/60 pb-1.5">
                    <span className="text-[11px] font-mono font-bold text-blue-800 dark:text-blue-400 uppercase">
                      SECTION 4: PAYER DEMOGRAPHICS, DIAGNOSES & CLINICIANS (FL 50 – FL 76)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <UbFormCell fl="FL 50" title="Payer Name (Line A)" sample="MEDICARE PART A (ILLINOIS)" />
                    <UbFormCell fl="FL 56" title="National Provider ID (Billing)" sample="NPI: 1982740192 (Hospital)" />
                    <UbFormCell fl="FL 60" title="Insured's Unique ID / MBI" sample="1EG4-TE5-MK72" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <UbFormCell fl="FL 67" title="Principal Diagnosis Code" sample="K80.00 (Calculus of Gallbladder) | POA: Y" />
                    <UbFormCell fl="FL 74" title="Principal Procedure Code (PCS)" sample="0FT44ZZ (Laparoscopic Cholecystectomy)" />
                    <UbFormCell fl="FL 76" title="Attending Physician NPI" sample="DR. DEREK SHEPHERD | NPI: 1482910482" />
                  </div>
                </div>
              </div>
            )}

            {/* Official Scanned PDF View Tab */}
            {activeTab === 'official' && (
              <div className="skeuo-paper p-4 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-md space-y-3">
                {/* Zoom & Download Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-100 dark:bg-stone-800 p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-stone-700 dark:text-stone-300 font-bold">
                      Zoom: {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(200, prev + 25))}
                      className="p-1.5 rounded bg-white dark:bg-stone-700 border hover:bg-stone-200 text-stone-800 dark:text-stone-200"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(75, prev - 25))}
                      className="p-1.5 rounded bg-white dark:bg-stone-700 border hover:bg-stone-200 text-stone-800 dark:text-stone-200"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(100)}
                      className="p-1.5 rounded bg-white dark:bg-stone-700 border hover:bg-stone-200 text-stone-800 dark:text-stone-200"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <a
                    href={formType === 'cms1500' ? '/forms/cms1500_original.png' : '/forms/ub04_original.png'}
                    download={formType === 'cms1500' ? 'CMS-1500-Official-Form.png' : 'UB-04-Official-Form.png'}
                    className="skeuo-btn px-3.5 py-1.5 rounded text-xs font-serif font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official PNG Scan</span>
                  </a>
                </div>

                {/* Scanned Image Canvas */}
                <div className="overflow-auto max-h-[750px] border-2 border-stone-300 dark:border-stone-700 rounded-lg p-2 bg-stone-100 dark:bg-stone-950 flex justify-center">
                  <img
                    src={formType === 'cms1500' ? '/forms/cms1500_original.png' : '/forms/ub04_original.png'}
                    alt={formType === 'cms1500' ? 'Official CMS-1500 Form Scan' : 'Official UB-04 Form Scan'}
                    style={{ width: `${zoomLevel}%`, maxWidth: 'none' }}
                    className="shadow-lg rounded transition-all duration-200 object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: THE PERSISTENT SIDE-BY-SIDE INSPECTOR DOSSIER (40% on desktop) */}
          <div className={`lg:col-span-5 lg:sticky lg:top-20 space-y-4 ${mobileActiveView === 'inspector' ? 'block' : 'hidden lg:block'}`}>
            <div className="skeuo-manila p-5 sm:p-6 rounded-2xl border-2 border-amber-600/80 dark:border-amber-700 shadow-skeuo-raised space-y-4">
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
                <div className="flex items-center gap-2">
                  <span className="skeuo-badge bg-amber-800 text-white font-mono text-xs px-2.5 py-0.5 rounded">
                    INSPECTOR DOSSIER
                  </span>
                  <span className="text-xs font-mono text-stone-800 dark:text-stone-200 font-bold uppercase">
                    {formType === 'cms1500' ? 'CMS-1500' : 'UB-04'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevBox}
                    className="skeuo-btn p-1.5 rounded hover:bg-stone-200"
                    title="Previous Element"
                  >
                    <ArrowLeft className="w-4 h-4 text-stone-800 dark:text-stone-200" />
                  </button>
                  <button
                    onClick={handleNextBox}
                    className="skeuo-btn p-1.5 rounded hover:bg-stone-200"
                    title="Next Element"
                  >
                    <ArrowRight className="w-4 h-4 text-stone-800 dark:text-stone-200" />
                  </button>
                </div>
              </div>

              {/* Active Box Identity Header */}
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded text-white ${
                    formType === 'cms1500' ? 'bg-rose-800' : 'bg-blue-800'
                  }`}>
                    {formType === 'cms1500' ? `BOX ${selectedCmsBox.boxNumber}` : selectedUbBox.locatorNumber}
                  </span>
                  <span className="text-xs font-mono uppercase text-stone-700 dark:text-stone-300 font-bold">
                    Category: {formType === 'cms1500' ? selectedCmsBox.category : selectedUbBox.category}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mt-1.5">
                  {formType === 'cms1500' ? selectedCmsBox.name : selectedUbBox.name}
                </h3>
              </div>

              {/* Plain-English Definition */}
              <div className="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 space-y-1">
                <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-400 uppercase block">
                  Purpose & Description:
                </span>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                  {formType === 'cms1500' ? selectedCmsBox.description : selectedUbBox.description}
                </p>
              </div>

              {/* Sample Real-World Value */}
              <div className="p-3 bg-amber-50 dark:bg-stone-950/80 rounded-xl border border-amber-300 dark:border-amber-900/60 font-mono text-xs">
                <span className="text-stone-700 dark:text-stone-300 font-bold block mb-1">
                  Sample Real-World Form Value:
                </span>
                <code className="text-stone-900 dark:text-stone-100 font-bold text-sm block bg-white dark:bg-stone-800 p-2 rounded border border-stone-300 dark:border-stone-700">
                  {formType === 'cms1500' ? selectedCmsBox.sampleValue : selectedUbBox.sampleValue}
                </code>
              </div>

              {/* Electronic EDI Equivalent */}
              {(formType === 'cms1500' ? selectedCmsBox.ediMapping : selectedUbBox.ediMapping) && (
                <div className="p-3 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 text-xs">
                  <span className="font-mono font-bold text-stone-800 dark:text-stone-200 block mb-0.5">
                    Electronic EDI Equivalent ({formType === 'cms1500' ? '837P' : '837I'}):
                  </span>
                  <code className="text-emerald-800 dark:text-emerald-400 font-mono text-xs font-bold block">
                    {formType === 'cms1500' ? selectedCmsBox.ediMapping : selectedUbBox.ediMapping}
                  </code>
                </div>
              )}

              {/* Jobs Notes 💼 Highlight (If relevant to this box) */}
              {jobNotesInsight && (
                <div className="skeuo-postit rounded-xl border space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-950 dark:text-amber-200">
                    <span>💼 JOBS NOTES INTERVIEW INSIGHT:</span>
                  </div>
                  <p className="text-xs leading-relaxed text-stone-900 dark:text-amber-100 font-sans font-medium">
                    {jobNotesInsight}
                  </p>
                </div>
              )}

              {/* Official CMS Rules */}
              <div className="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase block">
                  Official Billing & Coding Rules:
                </span>
                <ul className="text-xs text-stone-800 dark:text-stone-200 space-y-1.5 list-disc pl-4 font-sans">
                  {(formType === 'cms1500' ? selectedCmsBox.rules : selectedUbBox.rules).map((r, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clearinghouse Rejections & Audit Traps */}
              <div className="p-3.5 bg-rose-50/80 dark:bg-rose-950/30 rounded-xl border border-rose-300 dark:border-rose-900/60 space-y-2">
                <span className="text-xs font-mono font-bold text-rose-900 dark:text-rose-400 uppercase flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Clearinghouse Rejections & Audit Traps:</span>
                </span>
                <ul className="text-xs text-stone-800 dark:text-stone-200 space-y-1 list-disc pl-4 font-sans">
                  {(formType === 'cms1500' ? selectedCmsBox.rejectionCauses : selectedUbBox.rejectionCauses).map((cause, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
