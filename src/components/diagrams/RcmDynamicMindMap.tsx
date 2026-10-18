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
  Compass,
  Maximize2,
  Sparkles,
  HelpCircle,
  Eye,
  Minimize2,
  ListTree,
  Workflow,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Move,
  Info,
  Lightbulb
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

  // Primary View Mode: 'tree' (Google NotebookLM Tree Outline) vs 'canvas' (2D Freeform Graph)
  const [viewMode, setViewMode] = useState<'tree' | 'canvas'>('tree');

  // Canvas pan & zoom state
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 80, y: 150 });
  const [zoom, setZoom] = useState<number>(0.85);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Touch gesture support for canvas on mobile
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [touchStartPan, setTouchStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Search & Phase Filter
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

  // Selected node for NotebookLM Studio Side Inspector / Inline Accordion
  const [selectedNodeId, setSelectedNodeId] = useState<string>('rcm-root');
  const [studioOpen, setStudioOpen] = useState<boolean>(false);
  const [activeStudioTab, setActiveStudioTab] = useState<'overview' | 'edi' | 'kpis' | 'denials' | 'quiz'>('overview');

  // Interactive Quiz state for NotebookLM studio test-yourself
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizExplanation, setShowQuizExplanation] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Find node by ID lookup helper
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

  // Compute breadcrumbs trail from root to selected node
  const breadcrumbs = useMemo(() => {
    const trail: MindMapNode[] = [];
    const findTrail = (curr: MindMapNode): boolean => {
      trail.push(curr);
      if (curr.id === selectedNodeId) return true;
      if (curr.children) {
        for (const child of curr.children) {
          if (findTrail(child)) return true;
        }
      }
      trail.pop();
      return false;
    };
    findTrail(RCM_MIND_MAP_DATA);
    return trail;
  }, [selectedNodeId]);

  // Reset quiz state when selected node changes
  useEffect(() => {
    setSelectedQuizAnswer(null);
    setShowQuizExplanation(false);
  }, [selectedNodeId]);

  // 1-Click Master Handler: When ANY note is clicked:
  // 1. Selects the node
  // 2. Toggles / opens subnotes
  // 3. Gives full description immediately
  const handleNodeClick = (node: MindMapNode, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setSelectedNodeId(node.id);

    // Toggle subnotes if this node has children
    if (node.children && node.children.length > 0) {
      setExpandedNodes(prev => ({
        ...prev,
        [node.id]: !prev[node.id]
      }));
    }

    // On mobile or when user explicitly clicks in Canvas mode, open Studio Inspector
    if (viewMode === 'canvas') {
      setStudioOpen(true);
    }
  };

  // Toggle node expansion specifically
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
    setPan({ x: 80, y: 150 });
    setZoom(0.85);
  };

  // Auto-expand ancestors when searching
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    const toExpand: Record<string, boolean> = {};

    const searchAndExpand = (node: MindMapNode): boolean => {
      let matched = 
        node.title.toLowerCase().includes(q) ||
        node.shortTitle.toLowerCase().includes(q) ||
        node.description.toLowerCase().includes(q) ||
        node.ediTransactions.some(e => e.code.toLowerCase().includes(q) || e.name.toLowerCase().includes(q)) ||
        node.kpis.some(k => k.name.toLowerCase().includes(q) || k.target.toLowerCase().includes(q)) ||
        node.denialRisks.some(d => d.code.toLowerCase().includes(q) || d.reason.toLowerCase().includes(q));

      if (node.children) {
        for (const child of node.children) {
          const childMatched = searchAndExpand(child);
          if (childMatched) {
            matched = true;
            toExpand[node.id] = true;
          }
        }
      }

      if (matched) {
        toExpand[node.id] = true;
      }
      return matched;
    };

    searchAndExpand(RCM_MIND_MAP_DATA);
    setExpandedNodes(prev => ({ ...prev, ...toExpand }));
  }, [searchQuery]);

  // Phase color definitions
  const getPhaseColorTokens = (phase: RcmPhase) => {
    switch (phase) {
      case 'front-end':
        return {
          stroke: '#10b981', // emerald
          glow: 'rgba(16, 185, 129, 0.4)',
          pillBg: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
          badgeBg: 'bg-emerald-700 text-white',
          border: 'border-emerald-400 dark:border-emerald-600',
          hoverBorder: 'hover:border-emerald-500',
          lightBg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
          accentText: 'text-emerald-900 dark:text-emerald-300',
          treeLine: 'border-emerald-400 dark:border-emerald-700'
        };
      case 'mid-cycle':
        return {
          stroke: '#3b82f6', // blue
          glow: 'rgba(59, 130, 246, 0.4)',
          pillBg: 'bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-500/30',
          badgeBg: 'bg-blue-700 text-white',
          border: 'border-blue-400 dark:border-blue-600',
          hoverBorder: 'hover:border-blue-500',
          lightBg: 'bg-blue-50/80 dark:bg-blue-950/30',
          accentText: 'text-blue-900 dark:text-blue-300',
          treeLine: 'border-blue-400 dark:border-blue-700'
        };
      case 'back-end':
        return {
          stroke: '#8b5cf6', // purple
          glow: 'rgba(139, 92, 246, 0.4)',
          pillBg: 'bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/30',
          badgeBg: 'bg-purple-700 text-white',
          border: 'border-purple-400 dark:border-purple-600',
          hoverBorder: 'hover:border-purple-500',
          lightBg: 'bg-purple-50/80 dark:bg-purple-950/30',
          accentText: 'text-purple-900 dark:text-purple-300',
          treeLine: 'border-purple-400 dark:border-purple-700'
        };
      case 'ar-recovery':
        return {
          stroke: '#f43f5e', // rose
          glow: 'rgba(244, 63, 94, 0.4)',
          pillBg: 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30',
          badgeBg: 'bg-rose-700 text-white',
          border: 'border-rose-400 dark:border-rose-600',
          hoverBorder: 'hover:border-rose-500',
          lightBg: 'bg-rose-50/80 dark:bg-rose-950/30',
          accentText: 'text-rose-900 dark:text-rose-300',
          treeLine: 'border-rose-400 dark:border-rose-700'
        };
      default:
        return {
          stroke: '#d97706', // amber
          glow: 'rgba(217, 119, 6, 0.4)',
          pillBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
          badgeBg: 'bg-amber-700 text-white',
          border: 'border-amber-400 dark:border-amber-600',
          hoverBorder: 'hover:border-amber-500',
          lightBg: 'bg-amber-50/80 dark:bg-amber-950/30',
          accentText: 'text-amber-900 dark:text-amber-300',
          treeLine: 'border-amber-400 dark:border-amber-700'
        };
    }
  };

  // Layout calculation for Canvas horizontal tree blooming
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
    const NODE_WIDTH = 280;
    const LEVEL_SPACING = 350;
    const ROW_GAP = 35;

    const passesFilter = (node: MindMapNode): boolean => {
      if (selectedPhase === 'all') return true;
      return node.phase === selectedPhase;
    };

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
        nodeY = currentY;
        currentY += 105 + ROW_GAP;
        const entry: LayoutNode = {
          node,
          x,
          y: nodeY,
          width: depth === 0 ? 310 : NODE_WIDTH,
          height: 105,
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
            toPoint: { x, y: nodeY + 52 },
            phase: node.phase,
            isActive: selectedNodeId === node.id || selectedNodeId === parentId
          });
        }

        return { startY: nodeY, endY: nodeY + 105, centerY: nodeY + 52 };
      } else {
        const childOutputs: { startY: number; endY: number; centerY: number }[] = [];
        const startChildY = currentY;
        const myPoint = { x: x + (depth === 0 ? 310 : NODE_WIDTH), y: 0 };

        filteredChildren.forEach(child => {
          const res = calculatePositions(child, depth + 1, myPoint, node.id);
          childOutputs.push(res);
        });

        const firstChildCenter = childOutputs[0].centerY;
        const lastChildCenter = childOutputs[childOutputs.length - 1].centerY;
        nodeY = (firstChildCenter + lastChildCenter) / 2 - 52;

        myPoint.y = nodeY + 52;

        const entry: LayoutNode = {
          node,
          x,
          y: nodeY,
          width: depth === 0 ? 310 : NODE_WIDTH,
          height: 105,
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
            toPoint: { x, y: nodeY + 52 },
            phase: node.phase,
            isActive: selectedNodeId === node.id || selectedNodeId === parentId
          });
        }

        return { startY: startChildY, endY: currentY, centerY: nodeY + 52 };
      }
    };

    calculatePositions(RCM_MIND_MAP_DATA, 0);

    let maxX = 800;
    let maxY = 800;
    nodesList.forEach(n => {
      if (n.x + n.width > maxX) maxX = n.x + n.width;
      if (n.y + n.height > maxY) maxY = n.y + n.height;
    });

    return { 
      layoutNodes: nodesList, 
      connections: conns, 
      bounds: { width: maxX + 250, height: maxY + 250 } 
    };
  }, [expandedNodes, selectedPhase, selectedNodeId]);

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
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

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom(prev => Math.min(1.8, Math.max(0.4, prev * zoomFactor)));
  };

  // Touch handlers for mobile in Canvas Mode
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.mindmap-node-card')) return;
    if (e.touches.length === 1) {
      setIsPanning(true);
      setStartPan({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(dist);
      setTouchStartPan({ ...pan });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isPanning) {
      setPan({
        x: e.touches[0].clientX - startPan.x,
        y: e.touches[0].clientY - startPan.y
      });
    } else if (e.touches.length === 2 && touchStartDist) {
      const newDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = newDist / touchStartDist;
      setZoom(prev => Math.min(1.8, Math.max(0.4, prev * scale)));
      setTouchStartDist(newDist);
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    setTouchStartDist(null);
  };

  // D-Pad pan adjustments
  const handleDpadPan = (dx: number, dy: number) => {
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Header Card */}
      <div className="skeuo-manila p-4 sm:p-6 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="skeuo-badge bg-indigo-900 text-white font-mono text-xs px-2.5 py-0.5 rounded flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                NOTEBOOKLM KNOWLEDGE SUITE
              </span>
              <span className="text-xs font-mono text-stone-800 dark:text-stone-200 font-bold">
                END-TO-END REVENUE CYCLE GRAPH
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1 flex items-center gap-2">
              <span>🧠 Dynamic RCM Mind Map</span>
            </h1>
            <p className="text-xs text-stone-700 dark:text-stone-300 mt-1">
              Click <strong>ANY</strong> note to instantly read its full operational description and toggle its sub-branches.
            </p>
          </div>

          {/* View Mode Toggle Pill (Tree vs 2D Canvas) */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex rounded-xl p-1 bg-stone-200/90 dark:bg-stone-800/90 border border-stone-400 dark:border-stone-600 shadow-inner">
              <button
                onClick={() => setViewMode('tree')}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'tree'
                    ? 'bg-amber-900 text-white shadow-md'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
                title="Google NotebookLM Tree Outline (Optimized for Mobile & Quick Reading)"
              >
                <ListTree className="w-3.5 h-3.5" />
                <span>Tree Outline</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-amber-700 text-amber-100 font-mono hidden sm:inline">Easy</span>
              </button>

              <button
                onClick={() => setViewMode('canvas')}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'canvas'
                    ? 'bg-amber-900 text-white shadow-md'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
                title="Interactive 2D Infinite Canvas (Visual Flow Graph)"
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>2D Canvas</span>
              </button>
            </div>

            <button
              onClick={() => setStudioOpen(prev => !prev)}
              className="px-3 py-1.5 rounded-xl text-xs font-serif font-bold bg-amber-800 text-white hover:bg-amber-900 transition-all flex items-center gap-1.5 shadow-sm"
              title="Toggle Full Studio Inspector Dossier"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{studioOpen ? 'Hide Dossier' : 'Studio Dossier'}</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search, Filters, Quick Actions */}
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

          {/* Quick Expand / Collapse Actions */}
          <div className="flex items-center gap-1.5 font-mono shrink-0">
            <button
              onClick={handleExpandAll}
              className="p-1.5 px-2.5 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-200 flex items-center gap-1 font-bold"
              title="Expand All Branches"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Expand All</span>
            </button>
            <button
              onClick={handleCollapseAll}
              className="p-1.5 px-2.5 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-200 flex items-center gap-1 font-bold"
              title="Collapse to Root"
            >
              <Minus className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </button>
          </div>
        </div>

        {/* Breadcrumb Trail: Fast 1-Click Ancestor Navigation */}
        <div className="mt-3 pt-2.5 border-t border-stone-300 dark:border-stone-700 flex items-center gap-1.5 overflow-x-auto text-xs font-serif">
          <span className="text-stone-600 dark:text-stone-400 shrink-0 font-bold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            Path:
          </span>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.id}>
                <button
                  onClick={() => {
                    setSelectedNodeId(crumb.id);
                    setExpandedNodes(prev => ({ ...prev, [crumb.id]: true }));
                  }}
                  className={`px-2 py-0.5 rounded transition-all whitespace-nowrap flex items-center gap-1 ${
                    isLast
                      ? 'bg-amber-800 text-white font-bold shadow-xs'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-amber-950 font-medium'
                  }`}
                >
                  <span>{crumb.icon}</span>
                  <span>{crumb.shortTitle}</span>
                </button>
                {!isLast && <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: NOTEBOOKLM TREE OUTLINE (HIGHLY ACCESSIBLE MOBILE & LAPTOP)   */}
      {/* ========================================================================= */}
      {viewMode === 'tree' && (
        <div className="space-y-4">
          <div className="p-3 sm:p-4 bg-amber-50 dark:bg-stone-900 rounded-2xl border-2 border-stone-400 dark:border-stone-700 shadow-md">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-300 dark:border-stone-700">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-amber-800 text-white">
                  <ListTree className="w-4 h-4" />
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                  Interactive Knowledge Hierarchy (Click any note to expand subnotes & read description)
                </span>
              </div>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-400 hidden sm:inline">
                Touch & Trackpad Friendly • Instant Preview
              </span>
            </div>

            {/* Recursive Hierarchical Tree Node Renderer */}
            <div className="space-y-3">
              <MindMapTreeBranch
                node={RCM_MIND_MAP_DATA}
                depth={0}
                selectedNodeId={selectedNodeId}
                expandedNodes={expandedNodes}
                onNodeClick={handleNodeClick}
                onToggleExpand={toggleNodeExpansion}
                searchQuery={searchQuery}
                selectedPhase={selectedPhase}
                onOpenStudio={() => setStudioOpen(true)}
                onStudyStage={(stageId) => setActiveModule(stageId)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: 2D WHITEBOARD CANVAS (FREEFORM GRAPH WITH D-PAD & TOUCH)      */}
      {/* ========================================================================= */}
      {viewMode === 'canvas' && (
        <div className="relative w-full h-[680px] sm:h-[760px] rounded-2xl border-2 border-stone-400 dark:border-stone-600 bg-stone-100 dark:bg-stone-950 overflow-hidden shadow-2xl flex select-none">
          {/* Pan-and-Zoom Canvas Area */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`flex-1 h-full relative overflow-hidden transition-all ${
              isPanning ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              backgroundImage: `radial-gradient(circle, rgba(160, 140, 110, 0.25) 1px, transparent 1px)`,
              backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
              backgroundPosition: `${pan.x}px ${pan.y}px`,
              touchAction: 'none'
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
                  <filter id="canvas-glow" x="-20%" y="-20%" width="140%" height="140%">
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

                  const deltaX = toX - fromX;
                  const cp1X = fromX + deltaX * 0.5;
                  const cp1Y = fromY;
                  const cp2X = fromX + deltaX * 0.5;
                  const cp2Y = toY;

                  const pathData = `M ${fromX} ${fromY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${toX} ${toY}`;

                  return (
                    <g key={idx}>
                      {conn.isActive && (
                        <path
                          d={pathData}
                          fill="none"
                          stroke={colors.stroke}
                          strokeWidth="6"
                          strokeOpacity="0.4"
                          filter="url(#canvas-glow)"
                        />
                      )}
                      <path
                        d={pathData}
                        fill="none"
                        stroke={colors.stroke}
                        strokeWidth={conn.isActive ? '2.8' : '1.8'}
                        strokeDasharray={conn.isActive ? undefined : '5,3'}
                        strokeOpacity={conn.isActive ? 0.95 : 0.65}
                      />
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
                    onClick={(e) => handleNodeClick(node, e)}
                    style={{
                      position: 'absolute',
                      left: layout.x,
                      top: layout.y,
                      width: layout.width
                    }}
                    className={`mindmap-node-card rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'ring-4 ring-amber-500/80 shadow-2xl scale-[1.03] z-30 ' + colors.border + ' ' + colors.lightBg
                        : 'bg-white/95 dark:bg-stone-900/95 shadow-md ' + colors.border + ' ' + colors.hoverBorder + ' hover:scale-[1.01]'
                    } ${isMatch ? 'ring-4 ring-emerald-500 animate-pulse' : ''}`}
                  >
                    <div className="p-3.5 flex flex-col justify-between h-[105px]">
                      <div>
                        {/* Top Header: Badge, Icon & Expansion Indicator */}
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-lg shrink-0">{node.icon}</span>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wide truncate text-stone-800 dark:text-stone-200">
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

                      {/* Footer: EDI & KPI Badges */}
                      <div className="pt-1.5 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[9px] font-mono">
                        <div className="flex items-center gap-1 truncate max-w-[190px]">
                          {node.ediTransactions.length > 0 ? (
                            <span className={`px-1.5 py-0.2 rounded font-bold ${colors.pillBg}`}>
                              EDI {node.ediTransactions[0].code}
                            </span>
                          ) : (
                            <span className="text-stone-600 dark:text-stone-400 truncate">
                              {node.shortTitle}
                            </span>
                          )}
                          {node.kpis.length > 0 && (
                            <span className="text-stone-700 dark:text-stone-300 truncate">
                              • {node.kpis[0].target}
                            </span>
                          )}
                        </div>

                        <span className={`font-serif font-bold shrink-0 ${isSelected ? 'text-amber-800 dark:text-amber-400' : 'text-stone-600'}`}>
                          {isSelected ? 'Active ●' : 'Click to Open'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dedicated Directional D-Pad & Control Station */}
            <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
              {/* D-Pad Directional Pan Buttons */}
              <div className="bg-stone-900/95 text-amber-100 p-2.5 rounded-2xl backdrop-blur-md border border-amber-900/70 shadow-2xl flex flex-col items-center gap-1">
                <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-0.5">
                  PAN CONTROLS
                </span>
                <div className="grid grid-cols-3 gap-1 w-24">
                  <div />
                  <button
                    onClick={() => handleDpadPan(0, 90)}
                    className="p-1.5 bg-stone-800 hover:bg-amber-800 text-white rounded-lg flex items-center justify-center transition-colors shadow-xs"
                    title="Pan Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <div />
                  <button
                    onClick={() => handleDpadPan(100, 0)}
                    className="p-1.5 bg-stone-800 hover:bg-amber-800 text-white rounded-lg flex items-center justify-center transition-colors shadow-xs"
                    title="Pan Left"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleResetView}
                    className="p-1.5 bg-amber-900 hover:bg-amber-700 text-white rounded-lg flex items-center justify-center transition-colors font-mono text-[9px] font-bold"
                    title="Center View"
                  >
                    ⟲
                  </button>
                  <button
                    onClick={() => handleDpadPan(-100, 0)}
                    className="p-1.5 bg-stone-800 hover:bg-amber-800 text-white rounded-lg flex items-center justify-center transition-colors shadow-xs"
                    title="Pan Right"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div />
                  <button
                    onClick={() => handleDpadPan(0, -90)}
                    className="p-1.5 bg-stone-800 hover:bg-amber-800 text-white rounded-lg flex items-center justify-center transition-colors shadow-xs"
                    title="Pan Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <div />
                </div>
              </div>

              {/* Zoom & Fit HUD */}
              <div className="bg-stone-900/95 text-amber-100 p-2 rounded-xl backdrop-blur-md border border-amber-900/70 shadow-2xl flex items-center justify-between gap-1 text-xs font-mono">
                <button
                  onClick={() => setZoom(prev => Math.max(0.4, prev - 0.15))}
                  className="p-1.5 bg-stone-800 hover:bg-amber-800 rounded-lg text-white font-bold"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 font-bold text-[11px] text-amber-200">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(prev => Math.min(1.8, prev + 0.15))}
                  className="p-1.5 bg-stone-800 hover:bg-amber-800 rounded-lg text-white font-bold"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetView}
                  className="ml-1 px-2 py-1 bg-amber-800 hover:bg-amber-700 rounded-lg text-white font-bold text-[10px]"
                >
                  Fit
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Studio Side Panel in Canvas Mode */}
          {studioOpen && (
            <aside className="hidden lg:flex w-[420px] xl:w-[460px] h-full bg-white dark:bg-stone-900 border-l-2 border-stone-400 dark:border-stone-700 flex-col z-30 shadow-2xl overflow-y-auto">
              <StudioInspectorContent
                node={activeNode}
                activeStudioTab={activeStudioTab}
                setActiveStudioTab={setActiveStudioTab}
                selectedQuizAnswer={selectedQuizAnswer}
                setSelectedQuizAnswer={setSelectedQuizAnswer}
                showQuizExplanation={showQuizExplanation}
                setShowQuizExplanation={setShowQuizExplanation}
                onClose={() => setStudioOpen(false)}
                onStudyStage={(stageId) => setActiveModule(stageId)}
              />
            </aside>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM SHEET MODAL (WHEN STUDIO INSPECTOR IS OPEN ON SMALL SCREENS) */}
      {/* ========================================================================= */}
      {studioOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
          {/* Backdrop Tap to Close */}
          <div className="flex-1" onClick={() => setStudioOpen(false)} />

          {/* Bottom Sheet Drawer */}
          <div className="bg-white dark:bg-stone-900 rounded-t-3xl border-t-4 border-amber-800 max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-slideUp">
            {/* Top Drag Handle */}
            <div className="w-full flex items-center justify-center pt-2.5 pb-1">
              <div className="w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full" />
            </div>

            <StudioInspectorContent
              node={activeNode}
              activeStudioTab={activeStudioTab}
              setActiveStudioTab={setActiveStudioTab}
              selectedQuizAnswer={selectedQuizAnswer}
              setSelectedQuizAnswer={setSelectedQuizAnswer}
              showQuizExplanation={showQuizExplanation}
              setShowQuizExplanation={setShowQuizExplanation}
              onClose={() => setStudioOpen(false)}
              onStudyStage={(stageId) => {
                setStudioOpen(false);
                setActiveModule(stageId);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// RECURSIVE TREE BRANCH COMPONENT FOR NOTEBOOKLM TREE VIEW
// =========================================================================

interface MindMapTreeBranchProps {
  node: MindMapNode;
  depth: number;
  selectedNodeId: string;
  expandedNodes: Record<string, boolean>;
  onNodeClick: (node: MindMapNode, e?: React.MouseEvent) => void;
  onToggleExpand: (nodeId: string, e?: React.MouseEvent) => void;
  searchQuery: string;
  selectedPhase: RcmPhase | 'all';
  onOpenStudio: () => void;
  onStudyStage: (stageId: StageId) => void;
}

const MindMapTreeBranch: React.FC<MindMapTreeBranchProps> = ({
  node,
  depth,
  selectedNodeId,
  expandedNodes,
  onNodeClick,
  onToggleExpand,
  searchQuery,
  selectedPhase,
  onOpenStudio,
  onStudyStage
}) => {
  const isSelected = selectedNodeId === node.id;
  const isExpanded = !!expandedNodes[node.id];
  const hasChildren = !!(node.children && node.children.length > 0);

  // Filter children based on selected phase
  const filteredChildren = hasChildren 
    ? node.children!.filter(c => selectedPhase === 'all' || c.phase === selectedPhase) 
    : [];

  const isMatch = searchQuery.trim() !== '' && (
    node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.ediTransactions.some(e => e.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
    node.denialRisks.some(d => d.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Styling tokens per phase
  const getPhaseStyles = (phase: RcmPhase) => {
    switch (phase) {
      case 'front-end':
        return {
          border: 'border-emerald-400 dark:border-emerald-600',
          bg: 'bg-emerald-50/70 dark:bg-emerald-950/20',
          selectedRing: 'ring-2 ring-emerald-500',
          badgeBg: 'bg-emerald-700 text-white',
          pillBg: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
        };
      case 'mid-cycle':
        return {
          border: 'border-blue-400 dark:border-blue-600',
          bg: 'bg-blue-50/70 dark:bg-blue-950/20',
          selectedRing: 'ring-2 ring-blue-500',
          badgeBg: 'bg-blue-700 text-white',
          pillBg: 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300'
        };
      case 'back-end':
        return {
          border: 'border-purple-400 dark:border-purple-600',
          bg: 'bg-purple-50/70 dark:bg-purple-950/20',
          selectedRing: 'ring-2 ring-purple-500',
          badgeBg: 'bg-purple-700 text-white',
          pillBg: 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300'
        };
      case 'ar-recovery':
        return {
          border: 'border-rose-400 dark:border-rose-600',
          bg: 'bg-rose-50/70 dark:bg-rose-950/20',
          selectedRing: 'ring-2 ring-rose-500',
          badgeBg: 'bg-rose-700 text-white',
          pillBg: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300'
        };
      default:
        return {
          border: 'border-amber-400 dark:border-amber-600',
          bg: 'bg-amber-50/70 dark:bg-amber-950/20',
          selectedRing: 'ring-2 ring-amber-500',
          badgeBg: 'bg-amber-700 text-white',
          pillBg: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
        };
    }
  };

  const styles = getPhaseStyles(node.phase);

  return (
    <div className={`transition-all ${depth > 0 ? 'ml-2 sm:ml-6 pl-2 sm:pl-4 border-l-2 border-stone-300 dark:border-stone-700' : ''}`}>
      {/* Node Interactive Card */}
      <div
        onClick={(e) => onNodeClick(node, e)}
        className={`p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer shadow-sm ${
          isSelected
            ? `${styles.border} ${styles.bg} ${styles.selectedRing} shadow-md`
            : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:border-amber-500'
        } ${isMatch ? 'ring-2 ring-emerald-500 animate-pulse' : ''}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            {/* Expansion Arrow Button */}
            {hasChildren ? (
              <button
                onClick={(e) => onToggleExpand(node.id, e)}
                className="mt-0.5 p-1 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-amber-800 hover:text-white transition-colors shrink-0"
                title={isExpanded ? 'Collapse subnotes' : 'Expand subnotes'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <span className="mt-1.5 w-2 h-2 rounded-full bg-stone-400 shrink-0" />
            )}

            {/* Icon & Title Group */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl shrink-0">{node.icon}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${styles.badgeBg}`}>
                  {node.stageNumber ? `GATE #${node.stageNumber}` : (node.badge || node.phase.toUpperCase())}
                </span>
                {node.ediTransactions.length > 0 && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${styles.pillBg}`}>
                    EDI {node.ediTransactions[0].code}
                  </span>
                )}
                {hasChildren && (
                  <span className="text-[10px] font-mono text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                    {filteredChildren.length} subtopics {isExpanded ? '▾' : '▸'}
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 mt-1">
                {node.title}
              </h3>

              <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 font-sans line-clamp-2 leading-relaxed">
                {node.summary}
              </p>
            </div>
          </div>

          {/* Quick Action indicator */}
          <div className="flex items-center gap-1 shrink-0 pt-1">
            <span className={`text-[11px] font-serif font-bold px-2 py-1 rounded ${
              isSelected ? 'bg-amber-800 text-white' : 'text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
            }`}>
              {isSelected ? 'Open Details ▴' : 'Click to Read ▸'}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INLINE RICH OPERATIONAL BREAKDOWN (REVEALED WHEN NOTE IS SELECTED)          */}
        {/* ========================================================================= */}
        {isSelected && (
          <div className="mt-3.5 pt-3.5 border-t-2 border-dashed border-stone-300 dark:border-stone-700 space-y-3 animate-fadeIn">
            {/* AI Executive Synthesis Brief */}
            <div className="p-3 bg-white dark:bg-stone-950 rounded-lg border border-amber-300 dark:border-amber-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-900 dark:text-amber-300 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Operational Synthesis Brief
              </span>
              <p className="text-xs text-stone-900 dark:text-stone-100 font-sans leading-relaxed">
                {node.description}
              </p>
            </div>

            {/* Core Workflow & Golden Rules (Side by side on larger screens) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800">
                <h5 className="font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <span>⚡ Core Workflow:</span>
                </h5>
                <ol className="space-y-1 font-sans text-stone-800 dark:text-stone-200">
                  {node.operationalSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="font-mono text-amber-700 font-bold shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-2.5 bg-white dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800">
                <h5 className="font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <span>🛡️ Compliance & Best Practices:</span>
                </h5>
                <ul className="space-y-1 font-sans text-stone-800 dark:text-stone-200">
                  {node.bestPractices.map((bp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* EDI, Denial Risks & Full Study Jump Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                {node.denialRisks.map((d, dIdx) => (
                  <span key={dIdx} className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 border border-rose-300 dark:border-rose-800">
                    Risk: {d.code}
                  </span>
                ))}
                {node.kpis.map((k, kIdx) => (
                  <span key={kIdx} className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200">
                    KPI: {k.target}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenStudio();
                  }}
                  className="px-2.5 py-1 rounded bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 font-serif font-bold text-xs flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Dossier & Quiz</span>
                </button>

                {node.stageRoute && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStudyStage(node.stageRoute as StageId);
                    }}
                    className="skeuo-btn-primary px-3 py-1 rounded text-xs font-serif font-bold flex items-center gap-1 shadow-xs"
                  >
                    <span>Study Gate #{node.stageNumber}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recursive Render of Sub-Branches when Expanded */}
      {isExpanded && filteredChildren.length > 0 && (
        <div className="mt-2.5 space-y-2.5">
          {filteredChildren.map(child => (
            <MindMapTreeBranch
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedNodeId={selectedNodeId}
              expandedNodes={expandedNodes}
              onNodeClick={onNodeClick}
              onToggleExpand={onToggleExpand}
              searchQuery={searchQuery}
              selectedPhase={selectedPhase}
              onOpenStudio={onOpenStudio}
              onStudyStage={onStudyStage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// STUDIO INSPECTOR CONTENT COMPONENT (USED IN DESKTOP PANEL & MOBILE DRAWER)
// =========================================================================

interface StudioInspectorContentProps {
  node: MindMapNode;
  activeStudioTab: 'overview' | 'edi' | 'kpis' | 'denials' | 'quiz';
  setActiveStudioTab: (tab: 'overview' | 'edi' | 'kpis' | 'denials' | 'quiz') => void;
  selectedQuizAnswer: number | null;
  setSelectedQuizAnswer: (ans: number | null) => void;
  showQuizExplanation: boolean;
  setShowQuizExplanation: (show: boolean) => void;
  onClose: () => void;
  onStudyStage: (stageId: StageId) => void;
}

const StudioInspectorContent: React.FC<StudioInspectorContentProps> = ({
  node,
  activeStudioTab,
  setActiveStudioTab,
  selectedQuizAnswer,
  setSelectedQuizAnswer,
  showQuizExplanation,
  setShowQuizExplanation,
  onClose,
  onStudyStage
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Inspector Header */}
      <div className="p-4 border-b border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-950 flex items-start justify-between gap-3 shrink-0">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className="text-3xl shrink-0 mt-0.5">{node.icon}</span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="skeuo-badge bg-amber-800 text-white font-mono text-[9px] px-2 py-0.5 rounded">
                {node.phase.toUpperCase()}
              </span>
              {node.stageNumber && (
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-rose-800 text-white">
                  GATE #{node.stageNumber}
                </span>
              )}
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-0.5 truncate">
              {node.title}
            </h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 shrink-0"
          title="Close Inspector"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Inspector Navigation Tabs */}
      <div className="flex border-b border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 text-xs font-serif overflow-x-auto shrink-0">
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
            className={`flex-1 py-2.5 px-2 text-center whitespace-nowrap border-b-2 transition-all font-bold ${
              activeStudioTab === tab.id
                ? 'border-amber-700 text-amber-900 dark:text-amber-400 bg-white dark:bg-stone-900'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scrollable Tab Content Area */}
      <div className="p-4 sm:p-5 space-y-4 flex-1 overflow-y-auto">
        {/* TAB 1: BRIEF */}
        {activeStudioTab === 'overview' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-900 dark:text-amber-300 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Executive Synthesis Brief
              </span>
              <p className="text-xs text-stone-900 dark:text-stone-100 font-sans leading-relaxed">
                {node.description}
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                Core Operational Workflow:
              </h5>
              <div className="space-y-1.5">
                {node.operationalSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-stone-50 dark:bg-stone-950 rounded border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200">
                    <span className="font-mono text-amber-700 font-bold shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                Golden Rules & Compliance Checklist:
              </h5>
              <ul className="space-y-1 p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200">
                {node.bestPractices.map((bp, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {node.stageRoute && (
              <button
                onClick={() => onStudyStage(node.stageRoute as StageId)}
                className="w-full skeuo-btn-primary py-2.5 rounded-lg text-xs font-serif font-bold flex items-center justify-center gap-2 shadow"
              >
                <span>Study Full Gate #{node.stageNumber} File</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* TAB 2: EDI TRANSACTIONS */}
        {activeStudioTab === 'edi' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase">
                ANSI X12 EDI Electronic Transactions
              </h5>
              <span className="text-[10px] font-mono text-stone-500">
                {node.ediTransactions.length} Handshakes
              </span>
            </div>

            {node.ediTransactions.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500 font-mono">
                No standalone EDI transaction wire defined for this node.
              </div>
            ) : (
              node.ediTransactions.map((edi, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      EDI {edi.code}
                    </span>
                    <span className="text-[10px] font-mono text-stone-600 dark:text-stone-400 uppercase px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 font-bold">
                      {edi.direction}
                    </span>
                  </div>
                  <h6 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 mt-1">
                    {edi.name}
                  </h6>
                  <p className="text-[11px] text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
                    {edi.description}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: KPIS & BENCHMARKS */}
        {activeStudioTab === 'kpis' && (
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase">
              Industry Target Benchmarks
            </h5>

            {node.kpis.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500 font-mono">
                No standalone KPI metrics attached.
              </div>
            ) : (
              node.kpis.map((kpi, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-bold text-stone-600 dark:text-stone-400">
                      {kpi.name}
                    </span>
                    <span className="text-sm font-mono font-bold text-amber-800 dark:text-amber-400">
                      {kpi.target}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-1">
                    {kpi.definition}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: DENIAL RISKS & CARC CODES */}
        {activeStudioTab === 'denials' && (
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 uppercase">
              Denial Risks & CARC/RARC Codes
            </h5>

            {node.denialRisks.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500 font-mono">
                No high-risk denial codes directly originate from this step.
              </div>
            ) : (
              node.denialRisks.map((risk, idx) => (
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
                  <div className="p-2 bg-white dark:bg-stone-900 rounded border text-stone-800 dark:text-stone-200 font-sans">
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
              {node.stageNumber === 2 
                ? 'Under the NAIC Birthday Rule, which parent\'s health plan is primary for a dependent child?'
                : node.stageNumber === 6
                ? 'When should Modifier 25 be appended to an Evaluation & Management code?'
                : node.stageNumber === 8
                ? 'What is the crucial difference between a Claim Rejection and a Claim Denial?'
                : `What is the primary operational objective of ${node.shortTitle}?`}
            </p>

            <div className="space-y-1.5 text-xs">
              {[
                {
                  text: node.stageNumber === 2
                    ? 'Parent whose birthday month and day falls earlier in the calendar year'
                    : node.stageNumber === 6
                    ? 'When a significant, separately identifiable E/M occurs on the same day as a minor procedure'
                    : node.stageNumber === 8
                    ? 'Rejections occur at clearinghouse before adjudication; denials occur after payer review'
                    : node.operationalSteps[0] || 'Prevent revenue leakage and ensure compliance',
                  isCorrect: true
                },
                {
                  text: node.stageNumber === 2
                    ? 'Parent whose birth year is older'
                    : node.stageNumber === 6
                    ? 'Whenever an office visit is billed, regardless of whether a procedure was done'
                    : node.stageNumber === 8
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
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-300 dark:border-amber-800 text-xs text-stone-800 dark:text-stone-200 animate-fadeIn">
                <strong className="text-amber-900 dark:text-amber-300 block mb-1">
                  Explanation:
                </strong>
                <span>
                  {node.summary}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-950 flex items-center justify-between text-[11px] font-mono text-stone-600 dark:text-stone-400 shrink-0">
        <span>Studio Dossier • RCMclaim</span>
        <button
          onClick={onClose}
          className="hover:text-stone-900 dark:hover:text-stone-100 font-bold"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
};
