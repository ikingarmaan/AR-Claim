import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Maximize2
} from 'lucide-react';

export interface FormSectionFilter<T> {
  id: string;
  label: string;
  filter: (item: T) => boolean;
}

interface OfficialFormViewerProps<T> {
  formType: 'cms1500' | 'ub04';
  imageSrc: string;
  imageAlt: string;
  officialTitle: string;
  officialSubtitle: string;
  badgeText: string;
  badgeColor: 'rose' | 'amber';
  downloadFilename: string;
  items: T[];
  selectedItem: T;
  onSelectItem: (item: T) => void;
  getItemKey: (item: T) => string;
  getItemNumber: (item: T) => string;
  getItemName: (item: T) => string;
  getItemShortName: (item: T) => string;
  sections: FormSectionFilter<T>[];
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  inspectorElementId: string;
}

export function OfficialFormViewer<T>({
  formType,
  imageSrc,
  imageAlt,
  officialTitle,
  officialSubtitle,
  badgeText,
  badgeColor,
  downloadFilename,
  items,
  selectedItem,
  onSelectItem,
  getItemKey,
  getItemNumber,
  getItemName,
  getItemShortName,
  sections,
  activeSection,
  onSelectSection,
  inspectorElementId
}: OfficialFormViewerProps<T>) {
  const [zoom, setZoom] = useState<number>(1.0);
  const [boxSearch, setBoxSearch] = useState<string>('');

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  const filteredBoxes = items.filter(item => {
    const matchesSection = currentSection.filter(item);
    if (!matchesSection) return false;
    if (!boxSearch.trim()) return true;

    const query = boxSearch.toLowerCase();
    const key = getItemKey(item).toLowerCase();
    const name = getItemName(item).toLowerCase();
    const shortName = getItemShortName(item).toLowerCase();
    return key.includes(query) || name.includes(query) || shortName.includes(query);
  });

  const handleZoomIn = () => setZoom(z => Math.min(2.0, +(z + 0.15).toFixed(2)));
  const handleZoomOut = () => setZoom(z => Math.max(0.65, +(z - 0.15).toFixed(2)));
  const handleResetZoom = () => setZoom(1.0);

  const isRose = badgeColor === 'rose';

  return (
    <div className="bg-white dark:bg-health-darkCard border-2 border-slate-300 dark:border-slate-700 rounded-3xl p-4 sm:p-6 shadow-md space-y-4">
      {/* 1. Official Document Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border ${
              isRose
                ? 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-700'
                : 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700'
            }`}>
              {badgeText}
            </span>
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
              {officialSubtitle}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
            {officialTitle}
          </h2>
          <p className="text-xs text-slate-700 dark:text-slate-300 max-w-2xl mt-0.5">
            Original scan of the genuine blank claim document. Click any numbered box button below to zoom, pan, and inspect exact completion rules, EDI 837 mappings, and AR denial triggers.
          </p>
        </div>

        {/* Zoom & Document Action Controls */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {/* Zoom Control Group */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-300 dark:border-slate-700 shadow-inner">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-black text-slate-900 dark:text-slate-100 min-w-[50px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2 py-1 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 ml-1 transition-colors"
              title="Reset Zoom to 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download Original Form Image */}
          <a
            href={imageSrc}
            download={downloadFilename}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
            title="Download full original form image"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Form</span>
          </a>
        </div>
      </div>

      {/* 2. Interactive Box & Form Locator Navigator Strip */}
      <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
        {/* Section Tabs & Search Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {sections.map(sec => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => onSelectSection(sec.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    isActive
                      ? isRose
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'bg-amber-800 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-56 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={boxSearch}
              onChange={e => setBoxSearch(e.target.value)}
              placeholder="Filter boxes (e.g. 24D, NPI)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Interactive Numbered Box Button Strip */}
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700/80">
          {filteredBoxes.map(item => {
            const isSelected = getItemKey(selectedItem) === getItemKey(item);
            return (
              <button
                key={getItemKey(item)}
                type="button"
                onClick={() => onSelectItem(item)}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs font-black transition-all flex items-center gap-1 ${
                  isSelected
                    ? isRose
                      ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300 dark:ring-emerald-500 scale-105'
                      : 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300 dark:ring-amber-500 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 hover:bg-emerald-100 hover:text-emerald-900 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
                title={`${getItemNumber(item)}: ${getItemName(item)}`}
              >
                <span>{getItemNumber(item)}</span>
              </button>
            );
          })}
          {filteredBoxes.length === 0 && (
            <div className="p-2 text-xs text-slate-500 italic">
              No boxes found matching "{boxSearch}".
            </div>
          )}
        </div>

        {/* Selected Box Indicator Banner */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 pt-1">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono font-black text-emerald-700 dark:text-emerald-400">
              Selected: {getItemNumber(selectedItem)}
            </span>
            <span className="text-slate-700 dark:text-slate-300 truncate hidden sm:inline">
              — {getItemName(selectedItem)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById(inspectorElementId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <span>Jump to Explanation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Document Viewport with Scaling */}
      <div className="relative h-[680px] overflow-auto bg-slate-900/10 dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-700 p-4 flex justify-center items-start shadow-inner">
        <div 
          style={{ 
            transform: `scale(${zoom})`, 
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out' 
          }}
          className="pb-12"
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-none shadow-2xl rounded-sm border border-slate-400 dark:border-slate-700 select-none bg-white"
            style={{ width: formType === 'cms1500' ? '770px' : '720px', height: 'auto' }}
          />
        </div>

        {/* Floating Quick Action Footer inside Viewport */}
        <div className="sticky bottom-2 left-0 right-0 max-w-xl mx-auto bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <div className="truncate">
              <span className="font-black font-mono text-emerald-400 text-xs">
                {getItemNumber(selectedItem)}
              </span>
              <span className="text-xs text-slate-200 ml-2 truncate font-medium">
                {getItemShortName(selectedItem)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById(inspectorElementId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition-colors shrink-0 shadow-sm flex items-center gap-1"
          >
            <span>Explain Box</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
