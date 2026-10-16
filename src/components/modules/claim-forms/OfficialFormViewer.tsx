import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Search, 
  Sparkles, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Move,
  Contrast,
  SlidersHorizontal,
  Columns2,
  Maximize,
  Check,
  Expand
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
  // Fit Mode: 'fit-width' (100% responsive width), 'fit-page' (entire sheet in viewport), 'custom' (zoom slider)
  const [fitMode, setFitMode] = useState<'fit-width' | 'fit-page' | 'custom'>('fit-width');
  const [zoom, setZoom] = useState<number>(1.0);
  const [viewportHeight, setViewportHeight] = useState<'screen' | 'standard' | 'large' | 'full'>('screen');
  const [displayFilter, setDisplayFilter] = useState<'normal' | 'high-contrast' | 'dark-mode'>('normal');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [boxSearch, setBoxSearch] = useState<string>('');

  // Viewport Container Refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const fullscreenViewportRef = useRef<HTMLDivElement>(null);

  // Drag-to-Pan State
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

  // Fit & Zoom Handlers
  const handleSetFitWidth = () => {
    setFitMode('fit-width');
    setZoom(1.0);
  };

  const handleSetFitPage = () => {
    setFitMode('fit-page');
    setZoom(1.0);
  };

  const handleCustomZoomChange = (val: number) => {
    setFitMode('custom');
    setZoom(val);
  };

  const handleZoomIn = () => {
    setFitMode('custom');
    setZoom(z => Math.min(2.5, +(z + 0.15).toFixed(2)));
  };

  const handleZoomOut = () => {
    setFitMode('custom');
    setZoom(z => Math.max(0.5, +(z - 0.15).toFixed(2)));
  };

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
    const walkX = (x - startX) * 1.3;
    const walkY = (y - startY) * 1.3;
    target.scrollLeft = scrollLeft - walkX;
    target.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => setIsMouseDown(false);

  const isRose = badgeColor === 'rose';

  // Responsive Height Presets
  const heightStyles = {
    screen: 'h-[75vh] min-h-[550px] max-h-[850px]',
    standard: 'h-[600px]',
    large: 'h-[850px]',
    full: 'h-auto max-h-none'
  };

  // Filter effect styling
  const filterStyles = {
    'normal': 'none',
    'high-contrast': 'contrast(1.4) brightness(0.97)',
    'dark-mode': 'invert(0.92) hue-rotate(180deg) contrast(1.25)'
  };

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
              300 DPI Official Vector Scan
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {officialTitle}
          </h2>
          <p className="text-xs text-slate-700 dark:text-slate-300 max-w-2xl mt-0.5 font-medium leading-relaxed">
            Auto-fitted to your screen. The form scales dynamically so all boxes from left to right are 100% visible. Use the toolbar below to switch to Full Page, zoom in, or expand to Full-Width.
          </p>
        </div>

        {/* Action Buttons: Full-Width, Theater Fullscreen, & Download */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {onToggleWideLayout && (
            <button
              type="button"
              onClick={onToggleWideLayout}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all border ${
                isWideLayout
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs ring-2 ring-emerald-200'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title={isWideLayout ? "Switch back to Split 60/40 View" : "Expand Form to 100% Full-Width (12 Columns)"}
            >
              <Columns2 className="w-4 h-4" />
              <span>{isWideLayout ? 'Split View' : 'Full-Width View'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-colors shadow-xs"
            title="Open theater fullscreen mode"
          >
            <Maximize2 className="w-4 h-4" />
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
            <Download className="w-4 h-4" />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* 2. AUTO-FIT & SCREEN ADJUSTMENT TOOLBAR */}
      <div className="bg-slate-100 dark:bg-slate-800/90 p-3 rounded-2xl border border-slate-300 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Fit to Screen Mode Switchers */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1 shrink-0">
            <Maximize className="w-4 h-4 text-emerald-600" />
            <span>Screen Fitting:</span>
          </span>

          <div className="flex items-center bg-white dark:bg-slate-900 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs">
            <button
              type="button"
              onClick={handleSetFitWidth}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                fitMode === 'fit-width'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Fit entire form width into available screen with zero horizontal overflow"
            >
              <Expand className="w-3.5 h-3.5" />
              <span>Fit to Width (100%)</span>
            </button>

            <button
              type="button"
              onClick={handleSetFitPage}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                fitMode === 'fit-page'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Fit entire single page in viewport height and width without scrolling"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fit Entire Page</span>
            </button>

            <button
              type="button"
              onClick={() => handleCustomZoomChange(1.35)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                fitMode === 'custom'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Custom Zoom with Slider & Mouse Pan"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Zoom & Pan</span>
            </button>
          </div>
        </div>

        {/* Zoom Slider (available when zooming or fine-tuning) */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2 py-1 rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
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
              onChange={e => handleCustomZoomChange(parseFloat(e.target.value))}
              className="w-20 sm:w-28 accent-emerald-600 cursor-pointer"
              title={`Zoom Level: ${Math.round(zoom * 100)}%`}
            />

            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <span className="px-1.5 py-0.5 rounded font-mono font-black text-slate-900 dark:text-white text-xs min-w-[44px] text-center">
              {fitMode === 'fit-width' ? 'Auto' : fitMode === 'fit-page' ? 'Page' : `${Math.round(zoom * 100)}%`}
            </span>
          </div>

          {/* Quick Zoom Presets */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleCustomZoomChange(1.0)}
              className={`px-2 py-1 rounded-lg text-xs font-bold border transition-colors ${
                fitMode === 'custom' && zoom === 1.0
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200'
              }`}
            >
              100%
            </button>
            <button
              type="button"
              onClick={() => handleCustomZoomChange(1.4)}
              className={`px-2 py-1 rounded-lg text-xs font-bold border transition-colors ${
                fitMode === 'custom' && zoom === 1.4
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200'
              }`}
            >
              140%
            </button>
            <button
              type="button"
              onClick={() => handleCustomZoomChange(1.8)}
              className={`px-2 py-1 rounded-lg text-xs font-bold border transition-colors ${
                fitMode === 'custom' && zoom === 1.8
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-200'
              }`}
            >
              180% HD
            </button>
          </div>

          {/* Viewport Height Preset Selector */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700">
            {(['screen', 'large', 'full'] as const).map(h => (
              <button
                key={h}
                type="button"
                onClick={() => setViewportHeight(h)}
                className={`px-2 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  viewportHeight === h
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={`Set Viewport Height to ${h}`}
              >
                {h === 'screen' ? 'Auto Screen' : h === 'large' ? '850px' : 'Full'}
              </button>
            ))}
          </div>

          {/* Contrast & Paper Mode Toggle */}
          <button
            type="button"
            onClick={() => setDisplayFilter(f => f === 'normal' ? 'high-contrast' : f === 'high-contrast' ? 'dark-mode' : 'normal')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              displayFilter !== 'normal'
                ? 'bg-purple-600 text-white border-purple-500 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-100'
            }`}
            title="Toggle Document Contrast / Invert Paper Mode"
          >
            <Contrast className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {displayFilter === 'normal' ? 'Normal' : displayFilter === 'high-contrast' ? 'High Contrast' : 'Inverted'}
            </span>
          </button>
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
            {fitMode === 'custom' && (
              <span className="text-[11px] text-slate-500 font-normal hidden lg:inline flex items-center gap-1">
                <Move className="w-3 h-3 text-slate-400" />
                <span>Click & drag to pan</span>
              </span>
            )}
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

      {/* 4. RESPONSIVE AUTO-FITTING DOCUMENT VIEWPORT */}
      <div 
        ref={viewportRef}
        onMouseDown={e => {
          if (fitMode === 'custom') handleMouseDown(e, false);
        }}
        onMouseMove={e => {
          if (fitMode === 'custom') handleMouseMove(e, false);
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative overflow-auto rounded-2xl border-2 border-slate-300 dark:border-slate-700 p-3 sm:p-5 flex justify-center items-start shadow-inner select-none transition-all ${
          heightStyles[viewportHeight]
        } ${fitMode === 'custom' ? (isMouseDown ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'} bg-slate-900/10 dark:bg-slate-950`}
      >
        {/* Responsive Paper Container */}
        <div 
          className={`flex justify-center transition-all duration-200 ${
            fitMode === 'fit-width'
              ? 'w-full max-w-full'
              : fitMode === 'fit-page'
              ? 'w-full h-full items-center'
              : 'w-auto'
          }`}
          style={{
            filter: filterStyles[displayFilter]
          }}
        >
          {fitMode === 'fit-width' ? (
            /* 100% CONTAINER WIDTH - COMPLETELY VISIBLE HORIZONTALLY */
            <img
              src={imageSrc}
              alt={imageAlt}
              draggable={false}
              className="w-full max-w-full h-auto shadow-2xl rounded-sm border-2 border-slate-400 dark:border-slate-700 bg-white"
            />
          ) : fitMode === 'fit-page' ? (
            /* FIT FULL PAGE (BOTH HEIGHT & WIDTH WITHOUT SCROLLING) */
            <img
              src={imageSrc}
              alt={imageAlt}
              draggable={false}
              className="max-h-[calc(75vh-100px)] max-w-full w-auto h-auto object-contain shadow-2xl rounded-sm border-2 border-slate-400 dark:border-slate-700 bg-white"
            />
          ) : (
            /* CUSTOM ZOOM LEVEL WITH DRAG-TO-PAN */
            <div 
              style={{ 
                width: `${Math.round(850 * zoom)}px`,
                transition: isMouseDown ? 'none' : 'width 0.15s ease-out'
              }}
              className="pointer-events-none pb-20"
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                draggable={false}
                className="w-full max-w-none shadow-2xl rounded-sm border-2 border-slate-400 dark:border-slate-700 bg-white"
              />
            </div>
          )}
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
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
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

            {/* Fullscreen Fit & Zoom Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={handleSetFitWidth}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    fitMode === 'fit-width' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Fit Width
                </button>
                <button
                  type="button"
                  onClick={handleSetFitPage}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    fitMode === 'fit-page' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Fit Page
                </button>
              </div>

              <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1 rounded text-white hover:bg-slate-700"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-mono font-bold text-emerald-400 min-w-[45px] text-center">
                  {fitMode === 'fit-width' ? 'Width' : fitMode === 'fit-page' ? 'Page' : `${Math.round(zoom * 100)}%`}
                </span>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1 rounded text-white hover:bg-slate-700"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black ml-2 transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Viewport */}
          <div 
            ref={fullscreenViewportRef}
            onMouseDown={e => {
              if (fitMode === 'custom') handleMouseDown(e, true);
            }}
            onMouseMove={e => {
              if (fitMode === 'custom') handleMouseMove(e, true);
            }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex-1 overflow-auto bg-slate-900 rounded-2xl border border-slate-800 p-6 flex justify-center items-start shadow-2xl select-none ${
              fitMode === 'custom' ? (isMouseDown ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
            }`}
          >
            <div 
              className={`flex justify-center transition-all duration-200 ${
                fitMode === 'fit-width'
                  ? 'w-full max-w-5xl'
                  : fitMode === 'fit-page'
                  ? 'h-full items-center'
                  : 'w-auto'
              }`}
              style={{
                filter: filterStyles[displayFilter]
              }}
            >
              {fitMode === 'fit-width' ? (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  draggable={false}
                  className="w-full max-w-full h-auto shadow-2xl rounded-sm border-2 border-slate-700 bg-white"
                />
              ) : fitMode === 'fit-page' ? (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  draggable={false}
                  className="max-h-[calc(100vh-170px)] max-w-full w-auto h-auto object-contain shadow-2xl rounded-sm border-2 border-slate-700 bg-white"
                />
              ) : (
                <div 
                  style={{ 
                    width: `${Math.round(1100 * zoom)}px`,
                    transition: isMouseDown ? 'none' : 'width 0.15s ease-out'
                  }}
                  className="pointer-events-none pb-20"
                >
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    draggable={false}
                    className="w-full max-w-none shadow-2xl rounded-sm border-2 border-slate-700 bg-white"
                  />
                </div>
              )}
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
