import React, { useState, useRef, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Move,
  Contrast,
  SlidersHorizontal,
  Columns2
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
  isWideLayout?: boolean;
  onToggleWideLayout?: () => void;
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
  inspectorElementId,
  isWideLayout = false,
  onToggleWideLayout
}: OfficialFormViewerProps<T>) {
  // Adjustable Controls State
  const [zoom, setZoom] = useState<number>(1.1);
  const [viewportHeight, setViewportHeight] = useState<'standard' | 'large' | 'tall' | 'full'>('large');
  const [displayFilter, setDisplayFilter] = useState<'normal' | 'high-contrast' | 'dark-mode'>('normal');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [boxSearch, setBoxSearch] = useState<string>('');

  // Drag-to-Pan State
  const viewportRef = useRef<HTMLDivElement>(null);
  const fullscreenViewportRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Keyboard shortcut: ESC to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Section & Box Filtering
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

  // Zoom Helpers
  const handleZoomIn = () => setZoom(z => Math.min(2.5, +(z + 0.15).toFixed(2)));
  const handleZoomOut = () => setZoom(z => Math.max(0.5, +(z - 0.15).toFixed(2)));
  const handleResetZoom = () => setZoom(1.1);
  const handlePresetZoom = (val: number) => setZoom(val);

  // Drag-to-Pan Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, isFs = false) => {
    const target = isFs ? fullscreenViewportRef.current : viewportRef.current;
    if (!target) return;
    setIsMouseDown(true);
    setStartX(e.pageX - target.offsetLeft);
    setStartY(e.pageY - target.offsetTop);
    setScrollLeft(target.scrollLeft);
    setScrollTop(target.scrollTop);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, isFs = false) => {
    if (!isMouseDown) return;
    const target = isFs ? fullscreenViewportRef.current : viewportRef.current;
    if (!target) return;
    e.preventDefault();
    const x = e.pageX - target.offsetLeft;
    const y = e.pageY - target.offsetTop;
    const walkX = (x - startX) * 1.4;
    const walkY = (y - startY) * 1.4;
    target.scrollLeft = scrollLeft - walkX;
    target.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => setIsMouseDown(false);

  const isRose = badgeColor === 'rose';

  // Height preset styling
  const heightStyles = {
    standard: 'h-[620px]',
    large: 'h-[850px]',
    tall: 'h-[1080px]',
    full: 'h-auto max-h-none'
  };

  // Filter effect styling
  const filterStyles = {
    'normal': 'none',
    'high-contrast': 'contrast(1.4) brightness(0.97)',
    'dark-mode': 'invert(0.92) hue-rotate(180deg) contrast(1.25)'
  };

  const baseImageWidth = formType === 'cms1500' ? 940 : 920;

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
            <span className="text-xs font-black text-slate-800 dark:text-slate-200">
              {officialSubtitle}
            </span>
            <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
              300 DPI Ultra HD Vector Scan
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {officialTitle}
          </h2>
          <p className="text-xs text-slate-700 dark:text-slate-300 max-w-2xl mt-0.5 font-medium leading-relaxed">
            Ultra-sharp official blank document. Use the zoom slider, presets, or mouse drag-to-pan below to inspect all box boundaries, fine-print instructions, and form locators.
          </p>
        </div>

        {/* Action Buttons: Fullscreen & Download */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {onToggleWideLayout && (
            <button
              type="button"
              onClick={onToggleWideLayout}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                isWideLayout
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title={isWideLayout ? "Switch to Split 60/40 View" : "Expand Document to 100% Full-Width"}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>{isWideLayout ? 'Split View' : 'Full-Width View'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
            title="Expand into full-screen theater mode"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Theater Fullscreen</span>
          </button>

          <a
            href={imageSrc}
            download={downloadFilename}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
            title="Download full 300 DPI high-resolution PNG"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save HD Form</span>
          </a>
        </div>
      </div>

      {/* 2. Adjustable Document View Controls Toolbar */}
      <div className="bg-slate-100 dark:bg-slate-800/90 p-3 rounded-2xl border border-slate-300 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Zoom Controls with Slider */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>Zoom:</span>
          </span>

          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-200 transition-colors border border-slate-300 dark:border-slate-600"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.05"
            value={zoom}
            onChange={e => setZoom(parseFloat(e.target.value))}
            className="w-24 sm:w-32 accent-emerald-600 cursor-pointer"
            title={`Zoom Level: ${Math.round(zoom * 100)}%`}
          />

          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-200 transition-colors border border-slate-300 dark:border-slate-600"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 font-mono font-black text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 min-w-[50px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          {/* Quick Presets */}
          <div className="hidden sm:flex items-center gap-1 ml-1">
            <button
              type="button"
              onClick={() => handlePresetZoom(0.85)}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                zoom === 0.85
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200'
              }`}
            >
              Fit
            </button>
            <button
              type="button"
              onClick={() => handlePresetZoom(1.0)}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                zoom === 1.0
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200'
              }`}
            >
              100%
            </button>
            <button
              type="button"
              onClick={() => handlePresetZoom(1.4)}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                zoom === 1.4
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200'
              }`}
            >
              140% Large
            </button>
            <button
              type="button"
              onClick={() => handlePresetZoom(1.8)}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                zoom === 1.8
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200'
              }`}
            >
              180% Ultra HD
            </button>
          </div>
        </div>

        {/* Viewport Height & Display Filter Adjustments */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Height Adjuster */}
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-700 dark:text-slate-300 hidden md:inline">Height:</span>
            {(['standard', 'large', 'tall'] as const).map(h => (
              <button
                key={h}
                type="button"
                onClick={() => setViewportHeight(h)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold capitalize border transition-all ${
                  viewportHeight === h
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200'
                }`}
              >
                {h === 'standard' ? '600px' : h === 'large' ? '850px' : '1080px'}
              </button>
            ))}
          </div>

          {/* Contrast & Paper Filter Toggle */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setDisplayFilter(f => f === 'normal' ? 'high-contrast' : f === 'high-contrast' ? 'dark-mode' : 'normal')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                displayFilter !== 'normal'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200'
              }`}
              title="Toggle Document Contrast / Invert Paper Mode"
            >
              <Contrast className="w-3.5 h-3.5" />
              <span>
                {displayFilter === 'normal' ? 'Normal Ink' : displayFilter === 'high-contrast' ? 'Deep Contrast' : 'Inverted Paper'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Interactive Box Navigator Strips */}
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
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700/80">
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

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 font-normal hidden lg:inline flex items-center gap-1">
              <Move className="w-3 h-3 text-slate-400" />
              <span>Click & drag document to pan</span>
            </span>
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
      </div>

      {/* 4. Interactive Scalable Document Viewport with Mouse Drag-to-Pan */}
      <div 
        ref={viewportRef}
        onMouseDown={e => handleMouseDown(e, false)}
        onMouseMove={e => handleMouseMove(e, false)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative overflow-auto rounded-2xl border-2 border-slate-300 dark:border-slate-700 p-6 flex justify-center items-start shadow-inner select-none transition-all ${
          heightStyles[viewportHeight]
        } ${isMouseDown ? 'cursor-grabbing' : 'cursor-grab'} bg-slate-900/10 dark:bg-slate-950`}
      >
        <div 
          style={{ 
            transform: `scale(${zoom})`, 
            transformOrigin: 'top center',
            transition: isMouseDown ? 'none' : 'transform 0.15s ease-out',
            filter: filterStyles[displayFilter]
          }}
          className="pb-24 pointer-events-none"
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            draggable={false}
            className="max-w-none shadow-2xl rounded-sm border-2 border-slate-400 dark:border-slate-700 bg-white"
            style={{ 
              width: `${baseImageWidth}px`, 
              height: 'auto'
            }}
          />
        </div>

        {/* Floating Quick Action Footer inside Viewport */}
        <div className="sticky bottom-3 left-0 right-0 max-w-xl mx-auto bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-between gap-3 z-10 pointer-events-auto">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="truncate">
              <span className="font-black font-mono text-emerald-400 text-xs">
                {getItemNumber(selectedItem)}
              </span>
              <span className="text-xs text-slate-200 ml-2 truncate font-medium">
                {getItemShortName(selectedItem)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById(inspectorElementId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition-colors shadow-sm flex items-center gap-1"
            >
              <span>Explain Box</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. FULLSCREEN / THEATER VIEWPORT MODAL */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl p-4 sm:p-6 flex flex-col space-y-3 animate-in fade-in duration-200">
          {/* Fullscreen Header Controls */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider text-white ${
                isRose ? 'bg-rose-700' : 'bg-amber-700'
              }`}>
                {badgeText}
              </span>
              <span className="text-sm font-bold text-white hidden sm:inline">
                {officialTitle}
              </span>
            </div>

            {/* Fullscreen Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold text-emerald-400 min-w-[45px] text-center">
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 ml-1"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => handlePresetZoom(1.8)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 ml-1"
              >
                180% HD
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold ml-3"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Viewport */}
          <div 
            ref={fullscreenViewportRef}
            onMouseDown={e => handleMouseDown(e, true)}
            onMouseMove={e => handleMouseMove(e, true)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex-1 overflow-auto bg-slate-900 rounded-2xl border border-slate-800 p-6 flex justify-center items-start shadow-2xl select-none ${
              isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            <div 
              style={{ 
                transform: `scale(${zoom})`, 
                transformOrigin: 'top center',
                transition: isMouseDown ? 'none' : 'transform 0.15s ease-out',
                filter: filterStyles[displayFilter]
              }}
              className="pb-24 pointer-events-none"
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                draggable={false}
                className="max-w-none shadow-2xl rounded-sm border-2 border-slate-700 bg-white"
                style={{ 
                  width: `${baseImageWidth + 100}px`, 
                  height: 'auto'
                }}
              />
            </div>
          </div>

          {/* Fullscreen Bottom Quick Info Bar */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="font-mono font-bold text-emerald-400">
                Inspecting: {getItemNumber(selectedItem)}
              </span>
              <span className="text-slate-300 truncate">
                — {getItemName(selectedItem)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsFullscreen(false);
                setTimeout(() => {
                  const el = document.getElementById(inspectorElementId);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs shrink-0"
            >
              Close & View Teaching Details →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
