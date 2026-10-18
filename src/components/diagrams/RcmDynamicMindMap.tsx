import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  Maximize2,
  Sparkles,
  HelpCircle,
  Eye,
  Minimize2,
  Share2,
  Bookmark
} from 'lucide-react';
import { RCM_MIND_MAP_DATA, MindMapNode, RcmPhase } from '../../data/rcmMindMapData';
import { useAcademy } from '../../context/AcademyContext';
import { StageId } from '../../types/rcm';

interface LayoutNode {
  node: MindMapNode;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  parentId?: string;
  parentPoint?: { x: number; y: number };
}

export const RcmDynamicMindMap: React.FC = () => {
  const { setActiveModule } = useAcademy();

  // Canvas pan & zoom state
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 80, y: 150 });
  const [zoom, setZoom] = useState<number>(0.85);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPhase, setSelectedPhase] = useState<RcmPhase | 'all'>('all');

  // Expanded nodes map: default expand root and first level (4 phases)
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'rcm-root': true,
    'phase-frontend': true,
    'phase-midcycle': true,
    'phase-backend': true,
    'phase-ar-recovery': true,
    'node-stage2': true,
    'node-stage6': true,
    'node-stage8': true,
    'node-stage10-denials': true
  });

  // Selected node for NotebookLM Studio Side Inspector
  const [selectedNodeId, setSelectedNodeId] = useState<string>('rcm-root');
  const [studioOpen, setStudioOpen] = useState<boolean>(true);
  const [activeStudioTab, setActiveStudioTab] = useState<'overview' | 'edi' | 'kpis' | 'denials' | 'quiz'>('overview');

  // Interactive Quiz state for NotebookLM studio test-yourself
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizExplanation, setShowQuizExplanation] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle expansion
  const toggleNodeExpansion = (nodeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const handleExpandAll = () => {
    const allExp: Record<string, boolean> = {};
    const traverse = (node: MindMapNode) => {
      allExp[node.id] = true;
      if (node.children) node.children.forEach(traverse);
    };
    traverse(RCM_MIND_MAP_DATA);
    setExpandedNodes(allExp);
  };

  const handleCollapseAll = () => {
    setExpandedNodes({ 'rcm-root': true });
  };

  const handleResetView = () => {
    setPan({ x: 80, y: 180 });
    setZoom(0.85);
  };

  // Find node by ID lookup
  const findNodeById = (node: MindMapNode, id: string): MindMapNode | null => {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNodeById(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeNode = useMemo(() => {
    return findNodeById(RCM_MIND_MAP_DATA, selectedNodeId) || RCM_MIND_MAP_DATA;
  }, [selectedNodeId]);

  // Reset quiz state when selected node changes
  useEffect(() => {
    setSelectedQuizAnswer(null);
    setShowQuizExplanation(false);
  }, [selectedNodeId]);

  // Layout calculation for horizontal tree blooming
  const { layoutNodes, connections, bounds } = useMemo(() => {
    const nodesList: LayoutNode[] = [];
    const conns: {
      fromId: string;
      toId: string;
      fromPoint: { x: number; y: number };
      toPoint: { x: number; y: number };
      phase: RcmPhase;
      isActive: boolean;
    }[] = [];

    let currentY = 80;
    const NODE_WIDTH = 270;
    const LEVEL_SPACING = 340;
    const ROW_GAP = 30;

    // Helper: does node pass phase filter?
    const passesFilter = (node: MindMapNode): boolean => {
      if (selectedPhase === 'all') return true;
      return node.phase === selectedPhase;
    };

    // Calculate layout recursively
    const calculatePositions = (
      node: MindMapNode, 
      depth: number, 
      parentPt?: { x: number; y: number }, 
      parentId?: string
    ): { startY: number; endY: number; centerY: number } => {
      const isExpanded = !!expandedNodes[node.id];
      const hasChildren = node.children && node.children.length > 0;
      const filteredChildren = hasChildren 
        ? node.children!.filter(c => passesFilter(c)) 
        : [];

      const x = depth * LEVEL_SPACING + 60;
      let nodeY: number;

      if (!isExpanded || filteredChildren.length === 0) {
        // Leaf or collapsed node
        nodeY = currentY;
        currentY += 105 + ROW_GAP;
        const entry: LayoutNode = {
          node,
          x,
          y: nodeY,
          width: depth === 0 ? 300 : NODE_WIDTH,
          height: 100,
          depth,
          parentId,
          parentPoint: parentPt
        };
        nodesList.push(entry);

        if (parentPt && parentId) {
          conns.push({
            fromId: parentId,
            toId: node.id,
            fromPoint: parentPt,
            toPoint: { x, y: nodeY + 50 },
            phase: node.phase,
            isActive: selectedNodeId === node.id || selectedNodeId === parentId
          });
        }

        return { startY: nodeY, endY: nodeY + 100, centerY: nodeY + 50 };
      } else {
        // Parent node with expanded children
        const childOutputs: { startY: number; endY: number; centerY: number }[] = [];
        const startChildY = currentY;

        const myPoint = { x: x + (depth === 0 ? 300 : NODE_WIDTH), y: 0 }; // temporary y

        // Recursively lay out children
        filteredChildren.forEach(child => {
          const res = calculatePositions(child, depth + 1, myPoint, node.id);
          childOutputs.push(res);
        });

        const firstChildCenter = childOutputs[0].centerY;
        const lastChildCenter = childOutputs[childOutputs.length - 1].centerY;
        nodeY = (firstChildCenter + lastChildCenter) / 2 - 50;

        myPoint.y = nodeY + 50; // update actual parent anchor point

        const entry: LayoutNode = {
          node,
          x,
          y: nodeY,
          width: depth === 0 ? 300 : NODE_WIDTH,
          height: 100,
          depth,
          parentId,
          parentPoint: parentPt
        };
        nodesList.push(entry);

        if (parentPt && parentId) {
          conns.push({
            fromId: parentId,
            toId: node.id,
            fromPoint: parentPt,
            toPoint: { x, y: nodeY + 50 },
            phase: node.phase,
            isActive: selectedNodeId === node.id || selectedNodeId === parentId
          });
        }

        return { startY: startChildY, endY: currentY, centerY: nodeY + 50 };
      }
    };

    calculatePositions(RCM_MIND_MAP_DATA, 0);

    // Compute bounding box
    let maxX = 800;
    let maxY = 800;
    nodesList.forEach(n => {
      if (n.x + n.width > maxX) maxX = n.x + n.width;
      if (n.y + n.height > maxY) maxY = n.y + n.height;
    });

    return { 
      layoutNodes: nodesList, 
      connections: conns, 
      bounds: { width: maxX + 200, height: maxY + 200 } 
    };
  }, [expandedNodes, selectedPhase, selectedNodeId]);

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking on canvas background or SVG
    if ((e.target as HTMLElement).closest('.mindmap-node-card')) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom(prev => Math.min(1.8, Math.max(0.4, prev * zoomFactor)));
  };

  // Phase styling definitions
  const getPhaseColorTokens = (phase: RcmPhase) => {
    switch (phase) {
      case 'front-end':
        return {
          stroke: '#10b981', // emerald
          glow: 'rgba(16, 185, 129, 0.4)',
          pillBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
          badgeBg: 'bg-emerald-700 text-white',
          border: 'border-emerald-400 dark:border-emerald-600',
          hoverBorder: 'hover:border-emerald-500',
          lightBg: 'bg-emerald-50/80 dark:bg-emerald-950/30'
        };
      case 'mid-cycle':
        return {
          stroke: '#3b82f6', // blue
          glow: 'rgba(59, 130, 246, 0.4)',
          pillBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30',
          badgeBg: 'bg-blue-700 text-white',
          border: 'border-blue-400 dark:border-blue-600',
          hoverBorder: 'hover:border-blue-500',
          lightBg: 'bg-blue-50/80 dark:bg-blue-950/30'
        };
      case 'back-end':
        return {
          stroke: '#8b5cf6', // purple
          glow: 'rgba(139, 92, 246, 0.4)',
          pillBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30',
          badgeBg: 'bg-purple-700 text-white',
          border: 'border-purple-400 dark:border-purple-600',
          hoverBorder: 'hover:border-purple-500',
          lightBg: 'bg-purple-50/80 dark:bg-purple-950/30'
        };
      case 'ar-recovery':
        return {
          stroke: '#f43f5e', // rose
          glow: 'rgba(244, 63, 94, 0.4)',
          pillBg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
          badgeBg: 'bg-rose-700 text-white',
          border: 'border-rose-400 dark:border-rose-600',
          hoverBorder: 'hover:border-rose-500',
          lightBg: 'bg-rose-50/80 dark:bg-rose-950/30'
        };
      default:
        return {
          stroke: '#d97706', // amber
          glow: 'rgba(217, 119, 6, 0.4)',
          pillBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
          badgeBg: 'bg-amber-700 text-white',
          border: 'border-amber-400 dark:border-amber-600',
          hoverBorder: 'hover:border-amber-500',
          lightBg: 'bg-amber-50/80 dark:bg-amber-950/30'
        };
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Header Card */}
      <div className="skeuo-manila p-4 sm:p-6 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-indigo-900 text-white font-mono text-xs px-2.5 py-0.5 rounded flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                NOTEBOOKLM CANVAS EDITION
              </span>
              <span className="text-xs font-mono text-stone-700 dark:text-stone-300 font-bold">
                DYNAMIC REVENUE CYCLE KNOWLEDGE GRAPH
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1 flex items-center gap-2">
              <span>🧠 Dynamic RCM Mind Map</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStudioOpen(prev => !prev)}
              className="px-3 py-1.5 rounded-lg text-xs font-serif font-bold bg-amber-800 text-white hover:bg-amber-900 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{studioOpen ? 'Hide Studio Inspector' : 'Open Studio Inspector'}</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search, Filters, Pan & Zoom */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between mt-3 text-xs">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder="Search concepts, EDI loops (270, 837, 835), KPIs, or denial codes (CO-16, CO-22)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-sans focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
            />
          </div>

          {/* Phase Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 font-serif">
            {[
              { id: 'all', label: 'All 4 Clusters' },
              { id: 'front-end', label: '🟢 Front-End' },
              { id: 'mid-cycle', label: '🔵 Mid-Cycle' },
              { id: 'back-end', label: '🟣 Back-End' },
              { id: 'ar-recovery', label: '🔴 A/R & Recovery' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedPhase(tab.id as RcmPhase | 'all')}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                  selectedPhase === tab.id
                    ? 'bg-amber-900 text-white font-bold shadow-sm ring-1 ring-amber-500'
                    : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Canvas Actions */}
          <div className="flex items-center gap-1.5 font-mono shrink-0">
            <button
              onClick={handleExpandAll}
              className="p-1.5 px-2.5 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 flex items-center gap-1"
              title="Expand All Branches"
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
                onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))}
                className="p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-[11px] font-bold text-stone-800 dark:text-stone-200">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(prev => Math.min(1.8, prev + 0.1))}
                className="p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={handleResetView}
              className="p-1.5 px-2.5 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 flex items-center gap-1"
              title="Center & Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Fit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage & Studio Split Screen */}
      <div className="relative w-full h-[720px] sm:h-[780px] rounded-2xl border-2 border-stone-400 dark:border-stone-600 bg-stone-100 dark:bg-stone-950 overflow-hidden shadow-2xl flex select-none">
        {/* Pan-and-Zoom Canvas Area */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className={`flex-1 h-full relative overflow-hidden transition-all ${
            isPanning ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle, rgba(160, 140, 110, 0.25) 1px, transparent 1px)`,
            backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}
        >
          {/* Canvas Transform Container */}
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              width: bounds.width,
              height: bounds.height,
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            {/* SVG Connecting Bezier Curves */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ width: bounds.width, height: bounds.height }}
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {connections.map((conn, idx) => {
                const colors = getPhaseColorTokens(conn.phase);
                const fromX = conn.fromPoint.x;
                const fromY = conn.fromPoint.y;
                const toX = conn.toPoint.x;
                const toY = conn.toPoint.y;

                // Smooth cubic bezier S-curve
                const deltaX = toX - fromX;
                const cp1X = fromX + deltaX * 0.5;
                const cp1Y = fromY;
                const cp2X = fromX + deltaX * 0.5;
                const cp2Y = toY;

                const pathData = `M ${fromX} ${fromY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${toX} ${toY}`;

                return (
                  <g key={idx}>
                    {/* Shadow / Glow path if active */}
                    {conn.isActive && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke={colors.stroke}
                        strokeWidth="5"
                        strokeOpacity="0.4"
                        filter="url(#glow)"
                      />
                    )}
                    {/* Main connector curve */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={colors.stroke}
                      strokeWidth={conn.isActive ? '2.5' : '1.8'}
                      strokeDasharray={conn.isActive ? undefined : '5,3'}
                      strokeOpacity={conn.isActive ? 0.95 : 0.65}
                    />
                    {/* Small anchor dot on child */}
                    <circle
                      cx={toX}
                      cy={toY}
                      r="3.5"
                      fill={colors.stroke}
                    />
                  </g>
                );
              })}
            </svg>

            {/* DOM Nodes Overlay */}
            {layoutNodes.map(layout => {
              const node = layout.node;
              const isSelected = selectedNodeId === node.id;
              const isExpanded = !!expandedNodes[node.id];
              const hasChildren = node.children && node.children.length > 0;
              const colors = getPhaseColorTokens(node.phase);

              const isMatch = searchQuery.trim() !== '' && (
                node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                node.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                node.ediTransactions.some(e => e.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
                node.denialRisks.some(d => d.code.toLowerCase().includes(searchQuery.toLowerCase()))
              );

              return (
                <div
                  key={node.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(node.id);
                  }}
                  style={{
                    position: 'absolute',
                    left: layout.x,
                    top: layout.y,
                    width: layout.width
                  }}
                  className={`mindmap-node-card rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'ring-4 ring-amber-500/70 shadow-2xl scale-[1.03] z-30 ' + colors.border + ' ' + colors.lightBg
                      : 'bg-white/95 dark:bg-stone-900/95 shadow-md ' + colors.border + ' ' + colors.hoverBorder + ' hover:scale-[1.01]'
                  } ${isMatch ? 'ring-4 ring-emerald-500 animate-pulse' : ''}`}
                >
                  <div className="p-3.5 flex flex-col justify-between h-[100px]">
                    <div>
                      {/* Top Header: Badge & Icon */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-lg shrink-0">{node.icon}</span>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wide truncate text-stone-700 dark:text-stone-300">
                            {node.stageNumber ? `GATE #${node.stageNumber}` : (node.badge || node.phase.toUpperCase())}
                          </span>
                        </div>

                        {/* Expansion Pill Badge */}
                        {hasChildren && (
                          <button
                            onClick={(e) => toggleNodeExpansion(node.id, e)}
                            className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-amber-800 hover:text-white transition-colors flex items-center gap-1"
                            title={isExpanded ? 'Collapse sub-nodes' : 'Expand sub-nodes'}
                          >
                            <span>{isExpanded ? '−' : `+${node.children!.length}`}</span>
                          </button>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 mt-1 line-clamp-1">
                        {node.title}
                      </h4>
                    </div>

                    {/* Footer Pills: EDI & KPIs */}
                    <div className="pt-1.5 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[9px] font-mono">
                      <div className="flex items-center gap-1 truncate max-w-[190px]">
                        {node.ediTransactions.length > 0 ? (
                          <span className={`px-1.5 py-0.2 rounded font-bold ${colors.pillBg}`}>
                            EDI {node.ediTransactions[0].code}
                          </span>
                        ) : (
                          <span className="text-stone-500 truncate">
                            {node.shortTitle}
                          </span>
                        )}
                        {node.kpis.length > 0 && (
                          <span className="text-stone-600 dark:text-stone-400 truncate">
                            • {node.kpis[0].target}
                          </span>
                        )}
                      </div>

                      <span className={`font-serif font-bold shrink-0 ${isSelected ? 'text-amber-800 dark:text-amber-400' : 'text-stone-500'}`}>
                        {isSelected ? 'Active ●' : 'Inspect →'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Canvas Floating Overlay Controls */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-stone-900/90 text-amber-100 p-2 rounded-xl backdrop-blur-md border border-amber-900/60 shadow-xl text-xs font-mono">
            <span className="text-stone-400 pl-1">Canvas:</span>
            <span>Drag to Pan</span>
            <span>•</span>
            <span>Scroll to Zoom</span>
            <span>•</span>
            <button
              onClick={handleResetView}
              className="px-2 py-0.5 rounded bg-amber-800 text-white font-bold hover:bg-amber-700"
            >
              Center
            </button>
          </div>
        </div>

        {/* NotebookLM Studio & Sources Side Panel */}
        {studioOpen && (
          <aside className="w-full sm:w-[420px] lg:w-[460px] h-full bg-white dark:bg-stone-900 border-l-2 border-stone-400 dark:border-stone-700 flex flex-col z-30 shadow-2xl overflow-y-auto">
            {/* Studio Header */}
            <div className="p-4 border-b border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-950 flex items-start justify-between gap-3 sticky top-0 z-20">
              <div className="flex items-start gap-2.5">
                <span className="text-3xl shrink-0 mt-0.5">{activeNode.icon}</span>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="skeuo-badge bg-amber-800 text-white font-mono text-[9px] px-2 py-0.5 rounded">
                      {activeNode.phase.toUpperCase()}
                    </span>
                    {activeNode.stageNumber && (
                      <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-rose-800 text-white">
                        GATE #{activeNode.stageNumber}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-0.5">
                    {activeNode.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setStudioOpen(false)}
                className="p-1 rounded-md text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800"
                title="Collapse Studio Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Studio Navigation Tabs */}
            <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-xs font-serif overflow-x-auto">
              {[
                { id: 'overview', label: 'Brief' },
                { id: 'edi', label: 'EDI Data' },
                { id: 'kpis', label: 'KPIs' },
                { id: 'denials', label: 'Denials' },
                { id: 'quiz', label: 'Study Q&A' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveStudioTab(tab.id as any)}
                  className={`flex-1 py-2 px-2 text-center whitespace-nowrap border-b-2 transition-all font-bold ${
                    activeStudioTab === tab.id
                      ? 'border-amber-700 text-amber-900 dark:text-amber-400 bg-white dark:bg-stone-900'
                      : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Studio Tab Content */}
            <div className="p-4 sm:p-5 space-y-4 flex-1">
              {/* TAB 1: OVERVIEW & SYNTHESIS */}
              {activeStudioTab === 'overview' && (
                <div className="space-y-4">
                  {/* AI NotebookLM Style Synthesis Brief */}
                  <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-amber-900 dark:text-amber-300 uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Executive Synthesis Brief
                    </span>
                    <p className="text-xs text-stone-900 dark:text-stone-100 font-sans leading-relaxed">
                      {activeNode.description}
                    </p>
                  </div>

                  {/* Operational Steps */}
                  <div className="space-y-2">
                    <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                      Core Operational Workflow:
                    </h5>
                    <div className="space-y-1.5">
                      {activeNode.operationalSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 bg-stone-50 dark:bg-stone-950 rounded border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200">
                          <span className="font-mono text-amber-700 font-bold shrink-0">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="space-y-2">
                    <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                      Golden Rules & Compliance Checklist:
                    </h5>
                    <ul className="space-y-1 p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200">
                      {activeNode.bestPractices.map((bp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Jump Action */}
                  {activeNode.stageRoute && (
                    <button
                      onClick={() => setActiveModule(activeNode.stageRoute as StageId)}
                      className="w-full skeuo-btn-primary py-2.5 rounded-lg text-xs font-serif font-bold flex items-center justify-center gap-2 shadow"
                    >
                      <span>Study Full Stage #{activeNode.stageNumber} File</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* TAB 2: EDI DATA WIRE */}
              {activeStudioTab === 'edi' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase">
                      ANSI X12 EDI Electronic Transactions
                    </h5>
                    <span className="text-[10px] font-mono text-stone-500">
                      {activeNode.ediTransactions.length} Handshakes
                    </span>
                  </div>

                  {activeNode.ediTransactions.length === 0 ? (
                    <div className="p-6 text-center text-xs text-stone-500 font-mono">
                      No standalone EDI wire defined for this node.
                    </div>
                  ) : (
                    activeNode.ediTransactions.map((edi, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                            EDI {edi.code}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500 uppercase px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800">
                            {edi.direction}
                          </span>
                        </div>
                        <h6 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 mt-1">
                          {edi.name}
                        </h6>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400 font-sans">
                          {edi.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: KPIS & TARGET BENCHMARKS */}
              {activeStudioTab === 'kpis' && (
                <div className="space-y-3">
                  <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase">
                    Industry Target Benchmarks
                  </h5>

                  {activeNode.kpis.length === 0 ? (
                    <div className="p-6 text-center text-xs text-stone-500 font-mono">
                      No standalone KPI metrics attached.
                    </div>
                  ) : (
                    activeNode.kpis.map((kpi, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase font-bold text-stone-500">
                            {kpi.name}
                          </span>
                          <span className="text-sm font-mono font-bold text-amber-800 dark:text-amber-400">
                            {kpi.target}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                          {kpi.definition}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 4: DENIAL RISKS & RECOVERY */}
              {activeStudioTab === 'denials' && (
                <div className="space-y-3">
                  <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase">
                    Denial Risks & CARC/RARC Codes
                  </h5>

                  {activeNode.denialRisks.length === 0 ? (
                    <div className="p-6 text-center text-xs text-stone-500 font-mono">
                      No high-risk denial codes directly originate from this step.
                    </div>
                  ) : (
                    activeNode.denialRisks.map((risk, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-lg border border-rose-200 dark:border-rose-900 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-800 text-white text-[11px]">
                            {risk.code}
                          </span>
                          <span className="font-serif font-bold text-stone-900 dark:text-stone-100">
                            {risk.reason}
                          </span>
                        </div>
                        <div className="p-2 bg-white dark:bg-stone-900 rounded border text-stone-700 dark:text-stone-300 font-sans">
                          <strong className="text-emerald-800 dark:text-emerald-400 font-serif">Recovery Playbook: </strong>
                          {risk.prevention}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 5: STUDY Q&A FLASHCARD */}
              {activeStudioTab === 'quiz' && (
                <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💡</span>
                    <span className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase">
                      Self-Test Flashcard:
                    </span>
                  </div>

                  <p className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                    {activeNode.stageNumber === 2 
                      ? 'Under the NAIC Birthday Rule, which parent\'s health plan is primary for a dependent child?'
                      : activeNode.stageNumber === 6
                      ? 'When should Modifier 25 be appended to an Evaluation & Management code?'
                      : activeNode.stageNumber === 8
                      ? 'What is the crucial difference between a Claim Rejection and a Claim Denial?'
                      : `What is the primary operational objective of ${activeNode.shortTitle}?`}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    {[
                      {
                        text: activeNode.stageNumber === 2
                          ? 'Parent whose birthday month and day falls earlier in the calendar year'
                          : activeNode.stageNumber === 6
                          ? 'When a significant, separately identifiable E/M occurs on the same day as a minor procedure'
                          : activeNode.stageNumber === 8
                          ? 'Rejections occur at clearinghouse before adjudication; denials occur after payer review'
                          : activeNode.operationalSteps[0] || 'Prevent revenue leakage and ensure compliance',
                        isCorrect: true
                      },
                      {
                        text: activeNode.stageNumber === 2
                          ? 'Parent whose birth year is older'
                          : activeNode.stageNumber === 6
                          ? 'Whenever an office visit is billed, regardless of whether a procedure was done'
                          : activeNode.stageNumber === 8
                          ? 'There is no difference; both stop the timely filing clock immediately'
                          : 'Manual paper filing at end of fiscal year',
                        isCorrect: false
                      }
                    ].map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setSelectedQuizAnswer(oIdx);
                          setShowQuizExplanation(true);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs ${
                          selectedQuizAnswer === oIdx
                            ? opt.isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950 dark:text-emerald-200'
                              : 'bg-rose-100 border-rose-500 text-rose-950 font-bold dark:bg-rose-950 dark:text-rose-200'
                            : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-400'
                        }`}
                      >
                        <span>{opt.text}</span>
                      </button>
                    ))}
                  </div>

                  {showQuizExplanation && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-300 dark:border-amber-800 text-xs text-stone-800 dark:text-stone-200">
                      <strong className="text-amber-900 dark:text-amber-300 block mb-1">
                        Explanation:
                      </strong>
                      <span>
                        {activeNode.summary}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Studio Footer */}
            <div className="p-3 border-t border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-950 flex items-center justify-between text-[11px] font-mono text-stone-500">
              <span>Studio Dossier • RCMclaim</span>
              <button
                onClick={() => setStudioOpen(false)}
                className="hover:text-stone-800 dark:hover:text-stone-200 font-bold"
              >
                Close Studio
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
