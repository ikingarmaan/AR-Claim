import React, { useState, useMemo } from 'react';
import { 
  Network, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  Zap, 
  Layers, 
  X,
  ExternalLink,
  SlidersHorizontal,
  Compass,
  Maximize2
} from 'lucide-react';
import { RCM_MIND_MAP_DATA, MindMapNode, RcmPhase } from '../../data/rcmMindMapData';
import { useAcademy } from '../../context/AcademyContext';
import { StageId } from '../../types/rcm';

export const RcmDynamicMindMap: React.FC = () => {
  const { setActiveModule } = useAcademy();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPhase, setSelectedPhase] = useState<RcmPhase | 'all'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'mindmap' | 'ledger'>('mindmap');

  // Expanded nodes map: default expand root and first level
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'rcm-root': true,
    'phase-frontend': true,
    'phase-midcycle': true,
    'phase-backend': true,
    'phase-ar-recovery': true
  });

  // Selected node for inspector drawer
  const [inspectedNode, setInspectedNode] = useState<MindMapNode>(RCM_MIND_MAP_DATA);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleNode = (nodeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    const traverse = (node: MindMapNode) => {
      allExpanded[node.id] = true;
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    traverse(RCM_MIND_MAP_DATA);
    setExpandedNodes(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedNodes({ 'rcm-root': true });
  };

  const handleSelectNode = (node: MindMapNode) => {
    setInspectedNode(node);
    setDrawerOpen(true);
  };

  // Check if node or its descendants match search & phase
  const filterMatchesNode = (node: MindMapNode): boolean => {
    const matchesPhase = selectedPhase === 'all' || node.phase === selectedPhase;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesPhase;

    const matchesSelf = 
      node.title.toLowerCase().includes(query) ||
      node.shortTitle.toLowerCase().includes(query) ||
      node.summary.toLowerCase().includes(query) ||
      node.ediTransactions.some(e => e.code.toLowerCase().includes(query) || e.name.toLowerCase().includes(query)) ||
      node.denialRisks.some(d => d.code.toLowerCase().includes(query) || d.reason.toLowerCase().includes(query));

    const matchesChildren = node.children ? node.children.some(child => filterMatchesNode(child)) : false;

    return (matchesSelf || matchesChildren) && (selectedPhase === 'all' || node.phase === selectedPhase);
  };

  // Color scheme by phase
  const getPhaseStyles = (phase: RcmPhase) => {
    switch (phase) {
      case 'front-end':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/40',
          border: 'border-emerald-400 dark:border-emerald-700',
          badge: 'bg-emerald-800 text-white',
          text: 'text-emerald-900 dark:text-emerald-200',
          pill: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200'
        };
      case 'mid-cycle':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/40',
          border: 'border-blue-400 dark:border-blue-700',
          badge: 'bg-blue-800 text-white',
          text: 'text-blue-900 dark:text-blue-200',
          pill: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200'
        };
      case 'back-end':
        return {
          bg: 'bg-purple-50 dark:bg-purple-950/40',
          border: 'border-purple-400 dark:border-purple-700',
          badge: 'bg-purple-800 text-white',
          text: 'text-purple-900 dark:text-purple-200',
          pill: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200'
        };
      case 'ar-recovery':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/40',
          border: 'border-rose-400 dark:border-rose-700',
          badge: 'bg-rose-800 text-white',
          text: 'text-rose-900 dark:text-rose-200',
          pill: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200'
        };
      default:
        return {
          bg: 'bg-stone-50 dark:bg-stone-900',
          border: 'border-stone-400 dark:border-stone-600',
          badge: 'bg-stone-800 text-white',
          text: 'text-stone-900 dark:text-stone-100',
          pill: 'bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-200'
        };
    }
  };

  // Render Mind Map Tree Node recursively
  const renderTreeNode = (node: MindMapNode, depth: number = 0) => {
    if (!filterMatchesNode(node)) return null;

    const isExpanded = !!expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = inspectedNode.id === node.id;
    const styles = getPhaseStyles(node.phase);

    return (
      <div key={node.id} className="relative flex flex-col items-start transition-all">
        {/* Node Box */}
        <div 
          onClick={() => handleSelectNode(node)}
          className={`cursor-pointer rounded-xl border-2 transition-all p-3 sm:p-4 shadow-sm hover:shadow-md hover:scale-[1.01] ${styles.bg} ${styles.border} ${
            isSelected ? 'ring-2 ring-amber-500 shadow-md' : ''
          } max-w-sm sm:max-w-md w-full`}
        >
          {/* Node Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl shrink-0">{node.icon}</span>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {node.stageNumber && (
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-800 text-amber-100">
                      GATE #{node.stageNumber}
                    </span>
                  )}
                  {node.badge && (
                    <span className={`font-mono text-[9px] font-bold px-1.5 py-0.2 rounded ${styles.badge}`}>
                      {node.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 mt-0.5">
                  {node.title}
                </h4>
              </div>
            </div>

            {hasChildren && (
              <button
                onClick={(e) => toggleNode(node.id, e)}
                className="p-1 rounded-md bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 shrink-0"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Node Summary */}
          <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-2 line-clamp-2 leading-relaxed">
            {node.summary}
          </p>

          {/* Metadata Badges Footer */}
          <div className="mt-2.5 pt-2 border-t border-stone-300/80 dark:border-stone-700/80 flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-1.5 overflow-hidden">
              {node.ediTransactions.length > 0 && (
                <span className={`px-1.5 py-0.5 rounded font-bold truncate ${styles.pill}`}>
                  EDI: {node.ediTransactions[0].code}
                </span>
              )}
              {node.kpis.length > 0 && (
                <span className="text-stone-800 dark:text-stone-200 truncate">
                  {node.kpis[0].name}: <strong className="text-stone-800 dark:text-stone-200">{node.kpis[0].target}</strong>
                </span>
              )}
            </div>

            <span className="text-amber-800 dark:text-amber-400 font-serif font-bold flex items-center gap-0.5 hover:underline shrink-0">
              Inspect →
            </span>
          </div>
        </div>

        {/* Child Nodes Connected via Tree Lines */}
        {hasChildren && isExpanded && (
          <div className="pl-6 sm:pl-8 border-l-2 border-dashed border-stone-400 dark:border-stone-600 mt-3 space-y-3 relative w-full">
            {node.children!.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* Top Banner */}
      <div className="skeuo-manila p-5 sm:p-7 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-indigo-800 text-white font-mono text-xs px-2.5 py-1 rounded">
                DYNAMIC ARCHITECTURE
              </span>
              <span className="text-xs font-mono text-stone-700 dark:text-stone-300 font-bold">
                END-TO-END HEALTHCARE REVENUE CYCLE MAP
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1.5 flex items-center gap-2">
              <span>🧠 Dynamic RCM Mind Map</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 mt-1 max-w-3xl leading-relaxed">
              Explore the entire US Medical Claim Revenue Cycle Management lifecycle in interactive detail. Click any node to open the Inspector Drawer with step-by-step operational workflows, ANSI X12 EDI transactions, industry KPI benchmarks, and CARC/RARC denial prevention playbooks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-2deg]">
              100% INTERACTIVE
            </div>
          </div>
        </div>

        {/* Toolbar: Search, Filters & Zoom Controls */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between bg-stone-100/90 dark:bg-stone-900/90 p-3.5 rounded-xl border border-stone-300 dark:border-stone-700">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder="Search stages, EDI codes (270, 837, 835), KPIs, or denial codes (CO-16, CO-22)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
            />
          </div>

          {/* Phase Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs font-serif">
            {[
              { id: 'all', label: 'All 4 Phases' },
              { id: 'front-end', label: '🟢 Front-End' },
              { id: 'mid-cycle', label: '🔵 Mid-Cycle' },
              { id: 'back-end', label: '🟣 Back-End' },
              { id: 'ar-recovery', label: '🔴 A/R & Recovery' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedPhase(tab.id as RcmPhase | 'all')}
                className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-all font-medium ${
                  selectedPhase === tab.id
                    ? 'bg-amber-800 text-white font-bold shadow-sm'
                    : 'bg-white/90 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tree Action Controls */}
          <div className="flex items-center gap-1.5 text-xs font-mono shrink-0">
            <button
              onClick={handleExpandAll}
              className="p-1.5 px-2.5 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 flex items-center gap-1"
              title="Expand All Nodes"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Expand</span>
            </button>
            <button
              onClick={handleCollapseAll}
              className="p-1.5 px-2.5 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 flex items-center gap-1"
              title="Collapse to Root"
            >
              <Minus className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </button>
            <div className="flex items-center bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded">
              <button
                onClick={() => setZoomLevel(prev => Math.max(70, prev - 10))}
                className="p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-[11px] font-bold text-stone-800 dark:text-stone-200">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(140, prev + 10))}
                className="p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Mind Map Canvas */}
        <div className="overflow-x-auto p-4 sm:p-6 bg-stone-100/50 dark:bg-stone-950/40 rounded-xl border border-stone-300 dark:border-stone-700 min-h-[500px]">
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
            className="transition-transform duration-200 ease-out"
          >
            {renderTreeNode(RCM_MIND_MAP_DATA)}
          </div>
        </div>
      </div>

      {/* Slide-Over Inspector Drawer for Selected Node */}
      {drawerOpen && inspectedNode && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <aside className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border-l-2 border-stone-400 dark:border-stone-600 shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-950 flex items-start justify-between gap-4 sticky top-0 z-20">
              <div className="flex items-start gap-3">
                <span className="text-3xl shrink-0">{inspectedNode.icon}</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="skeuo-badge bg-amber-800 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                      {inspectedNode.phase.toUpperCase()}
                    </span>
                    {inspectedNode.stageNumber && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-rose-800 text-white">
                        GATE #{inspectedNode.stageNumber}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mt-1">
                    {inspectedNode.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 sm:p-6 space-y-6">
              {/* Summary & Jump Button */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 space-y-3">
                <p className="text-xs sm:text-sm text-stone-900 dark:text-stone-100 font-sans leading-relaxed">
                  {inspectedNode.description}
                </p>

                {inspectedNode.stageRoute && (
                  <button
                    onClick={() => {
                      setActiveModule(inspectedNode.stageRoute as StageId);
                      setDrawerOpen(false);
                    }}
                    className="skeuo-btn-primary px-4 py-2 rounded-lg text-xs font-serif font-bold flex items-center gap-2 shadow-sm"
                  >
                    <span>Launch Stage #{inspectedNode.stageNumber} in Academy</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Operational Steps */}
              {inspectedNode.operationalSteps.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Operational Execution Steps</span>
                  </h4>
                  <div className="p-3 bg-stone-50 dark:bg-stone-950/60 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1.5 text-xs text-stone-800 dark:text-stone-200 font-sans">
                    {inspectedNode.operationalSteps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2">
                        <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">
                          {sIdx + 1}.
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ANSI X12 EDI Transactions */}
              {inspectedNode.ediTransactions.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span>ANSI X12 EDI Electronic Transactions</span>
                  </h4>
                  <div className="space-y-2">
                    {inspectedNode.ediTransactions.map((edi, eIdx) => (
                      <div 
                        key={eIdx}
                        className="p-3 bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                              EDI {edi.code}
                            </span>
                            <span className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                              {edi.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-800 dark:text-stone-200 mt-1">
                            {edi.description}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-stone-500 uppercase px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-900 self-start sm:self-center">
                          {edi.direction}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* KPIs & Target Benchmarks */}
              {inspectedNode.kpis.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                    <span>Key Performance Indicators (KPIs)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {inspectedNode.kpis.map((kpi, kIdx) => (
                      <div 
                        key={kIdx}
                        className="p-3 bg-stone-50 dark:bg-stone-950/60 rounded-lg border border-stone-200 dark:border-stone-800"
                      >
                        <span className="font-mono text-[10px] uppercase text-stone-500 block">
                          {kpi.name}
                        </span>
                        <div className="text-base font-mono font-bold text-amber-800 dark:text-amber-400 mt-0.5">
                          {kpi.target}
                        </div>
                        <p className="text-[11px] text-stone-800 dark:text-stone-200 mt-1">
                          {kpi.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Denial Risks & CARC/RARC Prevention */}
              {inspectedNode.denialRisks.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>Denial Risks Originating in this Gate</span>
                  </h4>
                  <div className="space-y-2">
                    {inspectedNode.denialRisks.map((risk, rIdx) => (
                      <div 
                        key={rIdx}
                        className="p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-lg border border-rose-200 dark:border-rose-900/60 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-800 text-white text-[11px]">
                            {risk.code}
                          </span>
                          <span className="font-serif font-bold text-stone-900 dark:text-stone-100">
                            {risk.reason}
                          </span>
                        </div>
                        <div className="p-2 bg-white dark:bg-stone-900 rounded border border-rose-200 dark:border-rose-900 text-stone-700 dark:text-stone-300 font-sans">
                          <strong className="text-emerald-800 dark:text-emerald-400 font-serif">Prevention: </strong>
                          {risk.prevention}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Best Practices Checklist */}
              {inspectedNode.bestPractices.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Industry Best Practices</span>
                  </h4>
                  <ul className="space-y-1.5 p-3.5 bg-stone-50 dark:bg-stone-950/60 rounded-xl border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 font-sans">
                    {inspectedNode.bestPractices.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="mt-auto p-4 border-t border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-950 flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-500">
                RCMclaim Dynamic Architecture Dossier
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-300 dark:bg-stone-700 text-xs font-serif font-bold text-stone-800 dark:text-stone-200 hover:bg-stone-400"
              >
                Close Drawer
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
