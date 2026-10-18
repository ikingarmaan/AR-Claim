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
  ExternalLink,
  ChevronRight,
  Maximize2,
  Download
} from 'lucide-react';
import { CMS_1500_BOXES, UB_04_BOXES, FORM_COMPARISONS } from '../../../data/claimForms';
import { ClaimBoxDetail, Ub04BoxDetail } from '../../../types/rcm';

export const ModernSkeuoClaimStudio: React.FC = () => {
  const [formType, setFormType] = useState<'cms1500' | 'ub04'>('cms1500');
  const [viewMode, setViewMode] = useState<'visual' | 'official'>('visual');
  const [mobileActiveView, setMobileActiveView] = useState<'form' | 'inspector'>('form');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Selected Box IDs
  const [selectedCmsBox, setSelectedCmsBox] = useState<ClaimBoxDetail>(
    () => CMS_1500_BOXES.find(b => b.boxNumber === '23') || CMS_1500_BOXES[0]
  );
  const [selectedUbBox, setSelectedUbBox] = useState<Ub04BoxDetail>(
    () => UB_04_BOXES.find(b => b.locatorNumber === 'FL 04') || UB_04_BOXES[0]
  );

  // Zoom for official PNG
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Category filters for CMS-1500
  const cmsCategories = [
    { id: 'all', label: 'All 33 Boxes' },
    { id: 'patient', label: 'Patient & Insured (1–13)' },
    { id: 'clinical', label: 'Encounter & Auth (14–23)' },
    { id: 'billing', label: 'Service Lines & Billing (24–33)' }
  ];

  // Category filters for UB-04
  const ubCategories = [
    { id: 'all', label: 'All 81 Locators' },
    { id: 'provider', label: 'Facility & Patient (FL 01–17)' },
    { id: 'codes', label: 'Condition & Occurrence (FL 18–38)' },
    { id: 'charges', label: 'Revenue & Charges (FL 39–49)' },
    { id: 'payer', label: 'Payer & Prior Auth (FL 50–65)' },
    { id: 'clinical', label: 'Diagnoses & Procedures (FL 66–75)' }
  ];

  // Filtered CMS items
  const filteredCmsBoxes = useMemo(() => {
    return CMS_1500_BOXES.filter((box) => {
      const matchCat = selectedCategory === 'all' || box.category === selectedCategory;
      const matchSearch =
        box.boxNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Filtered UB-04 items
  const filteredUbBoxes = useMemo(() => {
    return UB_04_BOXES.filter((box) => {
      const matchCat = selectedCategory === 'all' || box.category === selectedCategory;
      const matchSearch =
        box.locatorNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Navigation handlers
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

  // OneNote specific insights for key boxes
  const getJobNotesInsight = (boxNumber: string, isUb: boolean) => {
    if (isUb) {
      if (boxNumber === 'FL 04') {
        return 'Job Interview Core Rule: Type of Bill (TOB) is a 3 or 4-digit code. 1st digit: Type of Facility (1=Hospital), 2nd digit: Bill Classification (1=Inpatient), 3rd digit: Frequency Code (1=Admit through discharge, 7=Replacement/Corrected claim).';
      }
      if (boxNumber === 'FL 42') {
        return 'Job Interview Core Rule: Revenue Code is a 4-digit code identifying the hospital department or accommodation (e.g. 0110 Room & Board, 0250 Pharmacy, 0360 Operating Room, 0450 Emergency Room). Required on every UB-04 institutional service line.';
      }
      if (boxNumber === 'FL 67') {
        return 'Job Interview Core Rule: Principal Diagnosis is the chief clinical condition established after medical workup to be responsible for occasioning the patient\'s hospital admission. Cannot be an external cause code.';
      }
      if (boxNumber === 'FL 76') {
        return 'Job Interview Core Rule: Attending Physician NPI is mandatory for all inpatient and surgical hospital claims. Must be an individual Type 1 NPI.';
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
        return 'Jobs Notes 💼 Core Q&A: Place of Service (POS) 2-digit code. E.g., POS 11 (Office), POS 21 (Inpatient), POS 22 (Outpatient), POS 23 (ER), POS 24 (ASC). Sets facility vs non-facility fee schedule rate.';
      }
      if (boxNumber === '1a') {
        return 'Jobs Notes 💼 Core Q&A: Subscriber Member ID. For Medicare, must be the 11-digit alphanumeric MBI (Medicare Beneficiary Identifier) without dashes. Never use SSN.';
      }
      if (boxNumber === '11') {
        return 'Jobs Notes 💼 Core Q&A: Insured\'s Policy Group Number. Crucial for Coordination of Benefits (COB) and secondary claims routing.';
      }
      return null;
    }
  };

  const jobNotesInsight = formType === 'cms1500' 
    ? getJobNotesInsight(selectedCmsBox.boxNumber, false)
    : getJobNotesInsight(selectedUbBox.locatorNumber, true);

  return (
    <div className="space-y-6">
      {/* Top Banner & Form Mode Toggle */}
      <div className="skeuo-paper p-4 sm:p-6 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-emerald-800 text-white font-mono text-xs px-2.5 py-0.5 rounded">
                SIDE-BY-SIDE STUDIO
              </span>
              <span className="text-xs font-mono text-stone-800 dark:text-stone-200 font-semibold">
                PROFESSIONAL & INSTITUTIONAL CLAIM MATRIX
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
              Official Claim Forms Studio (CMS-1500 & UB-04)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1">
              Interactive split-screen inspector: view the complete form on the left while exploring comprehensive box-by-box rules, EDI 837 mappings, and OneNote interview insights on the right.
            </p>
          </div>

          {/* Form Switcher Buttons */}
          <div className="flex items-center gap-2 p-1 bg-stone-200/80 dark:bg-stone-800 rounded-xl border border-stone-300 dark:border-stone-700 self-start md:self-auto">
            <button
              onClick={() => {
                setFormType('cms1500');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2 rounded-lg font-serif font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                formType === 'cms1500'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>CMS-1500 (33 Boxes)</span>
            </button>

            <button
              onClick={() => {
                setFormType('ub04');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2 rounded-lg font-serif font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                formType === 'ub04'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>UB-04 (81 Locators)</span>
            </button>
          </div>
        </div>

        {/* View Mode & Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-stone-300 dark:border-stone-700">
          {/* Mode Switch: Visual vs Official PDF */}
          <div className="flex items-center gap-2 text-xs font-mono font-bold">
            <span className="text-stone-600 dark:text-stone-400">View Mode:</span>
            <div className="flex rounded-lg border border-stone-300 dark:border-stone-700 overflow-hidden bg-white dark:bg-stone-800">
              <button
                onClick={() => setViewMode('visual')}
                className={`px-3 py-1.5 transition-colors ${
                  viewMode === 'visual'
                    ? 'bg-amber-800 text-white'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                }`}
              >
                Interactive Grid
              </button>
              <button
                onClick={() => setViewMode('official')}
                className={`px-3 py-1.5 transition-colors ${
                  viewMode === 'official'
                    ? 'bg-amber-800 text-white'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                }`}
              >
                Official PDF Document
              </button>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder={formType === 'cms1500' ? "Search box (e.g. 23, 24D, CLIA)..." : "Search locator (e.g. FL 04, Revenue)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 text-xs">
          {(formType === 'cms1500' ? cmsCategories : ubCategories).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-all font-serif ${
                selectedCategory === cat.id
                  ? 'bg-stone-800 text-white font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View Switcher Pill (Visible on small screens) */}
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

      {/* Main Studio Side-by-Side Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: The Claim Form (58% width on desktop) */}
        <div className={`lg:col-span-7 space-y-4 ${mobileActiveView === 'form' ? 'block' : 'hidden lg:block'}`}>
          {/* Visual Interactive Form Mode */}
          {viewMode === 'visual' && (
            <div className="skeuo-paper p-4 sm:p-5 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-300 dark:border-stone-700 text-xs font-mono">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  {formType === 'cms1500' ? 'HEALTH INSURANCE CLAIM FORM (CMS-1500 02/12)' : 'UNIFORM BILL (UB-04 / CMS-1450)'}
                </span>
                <span className="text-stone-600 dark:text-stone-400">
                  Click any box to inspect side-by-side
                </span>
              </div>

              {/* Form Grid Container */}
              <div className="space-y-3">
                {formType === 'cms1500' ? (
                  // CMS-1500 Visual Representation
                  <div className="border-2 border-red-700 dark:border-red-600 rounded-lg p-2.5 bg-white dark:bg-stone-950/60 space-y-3 font-sans">
                    {/* Header line of form */}
                    <div className="flex items-center justify-between border-b border-red-300 pb-2 text-[10px] text-red-900 dark:text-red-300 font-serif font-bold uppercase">
                      <span>APPROVED OMB-0938-1197 FORM CMS-1500 (02/12)</span>
                      <span>PHYSICIAN & PROFESSIONAL BILLING</span>
                    </div>

                    {/* Boxes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {filteredCmsBoxes.map((box) => {
                        const isSelected = selectedCmsBox.boxNumber === box.boxNumber;

                        return (
                          <button
                            key={box.boxNumber}
                            onClick={() => {
                              setSelectedCmsBox(box);
                              setMobileActiveView('inspector');
                            }}
                            className={`p-2.5 rounded text-left transition-all border relative flex flex-col justify-between min-h-[75px] ${
                              isSelected
                                ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-600 ring-2 ring-amber-500 shadow-md scale-[1.01]'
                                : 'bg-red-50/20 dark:bg-stone-900/60 border-red-300 dark:border-red-900/60 hover:bg-amber-50/50 hover:border-amber-400'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-red-800 dark:text-red-400 bg-red-100/80 dark:bg-red-950/80 px-1.5 py-0.5 rounded">
                                Box {box.boxNumber}
                              </span>
                              {isSelected && (
                                <span className="text-[9px] font-mono font-bold bg-amber-700 text-white px-1.5 py-0.2 rounded uppercase">
                                  Inspecting
                                </span>
                              )}
                            </div>

                            <div className="mt-1">
                              <div className="text-[11px] font-serif font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                                {box.shortName}
                              </div>
                              <div className="text-[10px] font-mono text-stone-600 dark:text-stone-400 truncate mt-0.5">
                                Sample: <span className="text-stone-900 dark:text-stone-200">{box.sampleValue}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // UB-04 Visual Representation
                  <div className="border-2 border-blue-700 dark:border-blue-600 rounded-lg p-2.5 bg-white dark:bg-stone-950/60 space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b border-blue-300 pb-2 text-[10px] text-blue-900 dark:text-blue-300 font-serif font-bold uppercase">
                      <span>FORM CMS-1450 (UB-04) INSTITUTIONAL BILLING</span>
                      <span>HOSPITAL / SNF / FACILITY</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {filteredUbBoxes.map((box) => {
                        const isSelected = selectedUbBox.locatorNumber === box.locatorNumber;

                        return (
                          <button
                            key={box.locatorNumber}
                            onClick={() => {
                              setSelectedUbBox(box);
                              setMobileActiveView('inspector');
                            }}
                            className={`p-2.5 rounded text-left transition-all border relative flex flex-col justify-between min-h-[75px] ${
                              isSelected
                                ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-600 ring-2 ring-amber-500 shadow-md scale-[1.01]'
                                : 'bg-blue-50/20 dark:bg-stone-900/60 border-blue-300 dark:border-blue-900/60 hover:bg-amber-50/50 hover:border-amber-400'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-blue-800 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-950/80 px-1.5 py-0.5 rounded">
                                {box.locatorNumber}
                              </span>
                              {isSelected && (
                                <span className="text-[9px] font-mono font-bold bg-amber-700 text-white px-1.5 py-0.2 rounded uppercase">
                                  Inspecting
                                </span>
                              )}
                            </div>

                            <div className="mt-1">
                              <div className="text-[11px] font-serif font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                                {box.shortName}
                              </div>
                              <div className="text-[10px] font-mono text-stone-600 dark:text-stone-400 truncate mt-0.5">
                                Sample: <span className="text-stone-900 dark:text-stone-200">{box.sampleValue}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Official Document PDF View */}
          {viewMode === 'official' && (
            <div className="skeuo-paper p-4 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-md space-y-3">
              {/* Zoom Controls */}
              <div className="flex items-center justify-between bg-stone-100 dark:bg-stone-800 p-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-stone-700 dark:text-stone-300 font-bold">Zoom: {zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(200, prev + 25))}
                    className="p-1 rounded bg-white dark:bg-stone-700 border hover:bg-stone-200"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(75, prev - 25))}
                    className="p-1 rounded bg-white dark:bg-stone-700 border hover:bg-stone-200"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(100)}
                    className="p-1 rounded bg-white dark:bg-stone-700 border hover:bg-stone-200"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <a
                  href={formType === 'cms1500' ? '/forms/cms1500_original.png' : '/forms/ub04_original.png'}
                  download={formType === 'cms1500' ? 'CMS-1500-Official-Form.png' : 'UB-04-Official-Form.png'}
                  className="skeuo-btn px-3 py-1 rounded text-xs font-serif font-bold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Form Image</span>
                </a>
              </div>

              {/* Scaled Image Container */}
              <div className="overflow-auto max-h-[750px] border-2 border-stone-300 dark:border-stone-700 rounded-lg p-2 bg-stone-100 dark:bg-stone-950 flex justify-center">
                <img
                  src={formType === 'cms1500' ? '/forms/cms1500_original.png' : '/forms/ub04_original.png'}
                  alt={formType === 'cms1500' ? 'Official CMS-1500 Claim Form' : 'Official UB-04 Claim Form'}
                  style={{ width: `${zoomLevel}%`, maxWidth: 'none' }}
                  className="shadow-lg rounded transition-all duration-200 object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: The Persistent Side-by-Side Inspector Dossier (42% width on desktop) */}
        <div className={`lg:col-span-5 lg:sticky lg:top-20 space-y-4 ${mobileActiveView === 'inspector' ? 'block' : 'hidden lg:block'}`}>
          <div className="skeuo-manila p-5 sm:p-6 rounded-2xl border-2 border-amber-600/80 dark:border-amber-700 shadow-skeuo-raised space-y-4">
            {/* Inspector Header with Stepper Buttons */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
              <div className="flex items-center gap-2">
                <span className="skeuo-badge bg-amber-800 text-white font-mono text-xs px-2.5 py-0.5 rounded">
                  INSPECTOR DOSSIER
                </span>
                <span className="text-xs font-mono text-stone-800 dark:text-stone-200 font-bold uppercase">
                  {formType === 'cms1500' ? 'CMS-1500' : 'UB-04'}
                </span>
              </div>

              {/* Prev / Next Steppers */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevBox}
                  className="skeuo-btn p-1.5 rounded hover:bg-stone-200"
                  title="Previous Box"
                >
                  <ArrowLeft className="w-4 h-4 text-stone-800 dark:text-stone-200" />
                </button>
                <button
                  onClick={handleNextBox}
                  className="skeuo-btn p-1.5 rounded hover:bg-stone-200"
                  title="Next Box"
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
            <div className="p-3.5 bg-white/90 dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 space-y-1">
              <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-400 uppercase block">
                Purpose & Description:
              </span>
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                {formType === 'cms1500' ? selectedCmsBox.description : selectedUbBox.description}
              </p>
            </div>

            {/* Sample Real-World Value */}
            <div className="p-3 bg-amber-50 dark:bg-stone-950/80 rounded-xl border border-amber-300 dark:border-amber-900/60 font-mono text-xs">
              <span className="text-stone-600 dark:text-stone-400 font-bold block mb-1">
                Typical Form Value:
              </span>
              <code className="text-stone-900 dark:text-stone-100 font-bold text-sm block bg-white dark:bg-stone-800 p-2 rounded border">
                {formType === 'cms1500' ? selectedCmsBox.sampleValue : selectedUbBox.sampleValue}
              </code>
            </div>

            {/* EDI 837 ANSI X12 Mapping */}
            {(formType === 'cms1500' ? selectedCmsBox.ediMapping : selectedUbBox.ediMapping) && (
              <div className="p-3 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 text-xs">
                <span className="font-mono font-bold text-stone-800 dark:text-stone-200 block mb-0.5">
                  Electronic EDI Equivalent ({formType === 'cms1500' ? '837P' : '837I'}):
                </span>
                <code className="text-emerald-800 dark:text-emerald-400 font-mono text-xs">
                  {formType === 'cms1500' ? selectedCmsBox.ediMapping : selectedUbBox.ediMapping}
                </code>
              </div>
            )}

            {/* Jobs Notes 💼 Highlight (If relevant to this box) */}
            {jobNotesInsight && (
              <div className="skeuo-postit rounded-xl border space-y-1">
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-950">
                  <span>💼 JOBS NOTES INTERVIEW INSIGHT:</span>
                </div>
                <p className="text-xs leading-relaxed text-stone-900 font-sans">
                  {jobNotesInsight}
                </p>
              </div>
            )}

            {/* Official CMS Rules */}
            <div className="p-3.5 bg-white/90 dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase block">
                CMS Chapter 26 Billing Rules:
              </span>
              <ul className="text-xs text-stone-800 dark:text-stone-200 space-y-1.5 list-disc pl-4 font-sans">
                {(formType === 'cms1500' ? selectedCmsBox.rules : selectedUbBox.rules).map((r, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Rejection Causes & Audit Traps */}
            <div className="p-3.5 bg-rose-50/80 dark:bg-rose-950/30 rounded-xl border border-rose-300 dark:border-rose-900/60 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-900 dark:text-rose-400 uppercase flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Common Clearinghouse Rejections:</span>
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
    </div>
  );
};
