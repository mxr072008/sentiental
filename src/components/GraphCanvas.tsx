import React, { useState } from 'react';
import { NodeEntity, FlowEdge } from '../types/aml';

interface GraphCanvasProps {
  nodes: NodeEntity[];
  edges: FlowEdge[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  isAnalyzing?: boolean;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  isAnalyzing = false,
}) => {
  const [zoom, setZoom] = useState(1);
  const [autoLayoutMode, setAutoLayoutMode] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.65));
  const handleZoomReset = () => setZoom(1);

  // Position modifier if auto layout is active
  const getNodePosition = (node: NodeEntity) => {
    if (!autoLayoutMode) {
      return node.coordinates;
    }
    // Alternative organic tree layout
    switch (node.id) {
      case 'A102': return { x: 70, y: 220 };
      case 'B204': return { x: 260, y: 160 };
      case 'W204': return { x: 450, y: 260 };
      case 'C315': return { x: 620, y: 200 };
      case 'M102': return { x: 770, y: 280 };
      case 'D428': return { x: 260, y: 360 };
      case 'E509': return { x: 500, y: 380 };
      default: return node.coordinates;
    }
  };

  return (
    <div className="flex flex-col bg-[#090e1b] rounded-xl shadow-md border border-[#3e484f]/30 overflow-hidden relative min-h-[660px]">
      {/* Canvas Top Bar */}
      <div className="p-3 bg-[#161b29] flex flex-wrap items-center justify-between gap-2 z-20 border-b border-[#3e484f]/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isAnalyzing ? 'bg-amber-400 animate-ping' : 'bg-[#ffb4ab] animate-pulse'}`}></span>
            <span className="font-code-sm text-[11px] font-semibold text-[#dee2f5] tracking-wider uppercase">
              GRAPH TOPOLOGY: DIRECTED ACYCLIC GRAPH
            </span>
          </div>
          <span className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/40 font-semibold">
            5 HOPS DETECTED
          </span>
          {isAnalyzing && (
            <span className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-[#38bdf8] border border-sky-500/40 animate-pulse">
              RE-SCORING VECTOR VELOCITY...
            </span>
          )}
        </div>

        {/* Viewport & Layout Controls */}
        <div className="flex items-center gap-1 bg-[#1a1f2d] border border-[#3e484f]/40 rounded p-1">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#252a38] text-[#bdc8d1] hover:text-[#dee2f5] transition-colors cursor-pointer"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#252a38] text-[#bdc8d1] hover:text-[#dee2f5] transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined text-[16px]">remove</span>
          </button>
          <button
            onClick={handleZoomReset}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#252a38] text-[#bdc8d1] hover:text-[#dee2f5] transition-colors cursor-pointer"
            title="Reset View"
          >
            <span className="material-symbols-outlined text-[16px]">filter_center_focus</span>
          </button>
          <div className="w-px h-4 bg-[#303443] my-auto mx-1"></div>
          <button
            onClick={() => setAutoLayoutMode(!autoLayoutMode)}
            className={`px-2 h-7 flex items-center gap-1 rounded font-code-sm text-[11px] transition-colors cursor-pointer ${
              autoLayoutMode
                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40'
                : 'hover:bg-[#252a38] text-[#bdc8d1] hover:text-[#dee2f5]'
            }`}
            title="Toggle Physics Layout"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span>
            Auto-Layout
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        className="relative w-full flex-1 min-h-[560px] bg-[#090e1b] overflow-hidden select-none transition-transform duration-200"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Ambient Grid Background */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="canvas-grid-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#38bdf8" strokeDasharray="2 4" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#canvas-grid-pattern)" />
        </svg>

        {/* Vectors Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="crimson-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffb4ab" />
              <stop offset="100%" stopColor="#ff938c" />
            </linearGradient>
            <linearGradient id="clean-flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#8ed5ff" />
            </linearGradient>
            <marker id="arrow-crimson" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#ffb4ab" />
            </marker>
            <marker id="arrow-clean" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Safe Branch Links */}
          <path
            d="M 120 180 C 180 80, 260 80, 340 90"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="4 3"
            markerEnd="url(#arrow-clean)"
            opacity={hoveredNodeId && hoveredNodeId !== 'A102' && hoveredNodeId !== 'D428' ? 0.3 : 1}
          />
          <path
            d="M 360 85 C 440 85, 520 70, 600 70"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            markerEnd="url(#arrow-clean)"
            opacity={hoveredNodeId && hoveredNodeId !== 'D428' && hoveredNodeId !== 'E509' ? 0.3 : 1}
          />

          {/* Suspicious Primary Trail Vector Path: A102 -> B204 -> W204 -> C315 -> M102 */}
          {/* Hop 1: A102 to B204 */}
          <path
            className="animate-pulse"
            d="M 120 200 C 180 230, 200 240, 260 250"
            fill="none"
            stroke="url(#crimson-flow-grad)"
            strokeWidth="3"
            strokeDasharray="6 4"
            markerEnd="url(#arrow-crimson)"
          />
          {/* Hop 2: B204 to W204 */}
          <path
            d="M 340 270 C 370 290, 390 320, 430 350"
            fill="none"
            stroke="url(#crimson-flow-grad)"
            strokeWidth="3"
            strokeDasharray="6 4"
            markerEnd="url(#arrow-crimson)"
          />
          {/* Hop 3: W204 to C315 */}
          <path
            d="M 490 370 C 530 370, 550 330, 590 310"
            fill="none"
            stroke="url(#crimson-flow-grad)"
            strokeWidth="3"
            strokeDasharray="6 4"
            markerEnd="url(#arrow-crimson)"
          />
          {/* Hop 4: C315 to M102 */}
          <path
            d="M 660 300 C 690 300, 710 280, 740 270"
            fill="none"
            stroke="url(#crimson-flow-grad)"
            strokeWidth="3"
            strokeDasharray="6 4"
            markerEnd="url(#arrow-crimson)"
          />
        </svg>

        {/* Transfer Badges / Labels on Edges */}
        <div className="absolute left-[160px] top-[215px] z-10 px-2 py-0.5 rounded-full bg-[#93000a] text-[#ffdad7] font-code-sm text-[10px] tracking-tight shadow border border-[#ffb4ab]/30">
          ₹2,50,000 • 10:42 AM
        </div>
        <div className="absolute left-[345px] top-[305px] z-10 px-2 py-0.5 rounded-full bg-[#93000a] text-[#ffdad7] font-code-sm text-[10px] tracking-tight shadow border border-[#ffb4ab]/30">
          ₹2,35,000 • 10:48 AM
        </div>
        <div className="absolute left-[515px] top-[345px] z-10 px-2 py-0.5 rounded-full bg-[#93000a] text-[#ffdad7] font-code-sm text-[10px] tracking-tight shadow border border-[#ffb4ab]/30">
          ₹2,20,000 • 11:02 AM
        </div>
        <div className="absolute left-[670px] top-[270px] z-10 px-2 py-0.5 rounded-full bg-[#93000a] text-[#ffdad7] font-code-sm text-[10px] tracking-tight shadow border border-[#ffb4ab]/30">
          ₹2,10,000 • 11:15 AM
        </div>
        <div className="absolute left-[200px] top-[80px] z-10 px-2 py-0.5 rounded-full bg-[#1a1f2d] text-[#8ed5ff] font-code-sm text-[10px] tracking-tight shadow border border-[#38bdf8]/30">
          ₹45,000 • Clean Payroll
        </div>
        <div className="absolute left-[450px] top-[60px] z-10 px-2 py-0.5 rounded-full bg-[#1a1f2d] text-[#8ed5ff] font-code-sm text-[10px] tracking-tight shadow border border-[#38bdf8]/30">
          ₹1,12,000 • Verified Vendor
        </div>

        {/* Nodes Positioning */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const pos = getNodePosition(node);
          const isCrimson = node.type !== 'clean_payroll' && node.type !== 'verified_vendor';

          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node.id)}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className="absolute z-20 flex flex-col items-center cursor-pointer transition-all duration-300"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
              }}
            >
              <div
                className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center p-2 transition-all relative ${
                  isSelected
                    ? 'bg-[#93000a] text-[#ffdad7] ring-2 ring-[#ffb4ab] shadow-[0_0_20px_rgba(239,68,68,0.45)] scale-110'
                    : isCrimson
                    ? 'bg-[#252a38] text-[#dee2f5] border border-[#3e484f]/60 hover:border-[#ffb4ab] hover:scale-105 shadow-lg'
                    : 'bg-[#1a1f2d] text-[#8ed5ff] border border-[#38bdf8]/40 hover:border-[#8ed5ff] hover:scale-105 shadow'
                }`}
              >
                {/* Node Status Indicator */}
                {node.id === 'A102' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ffb4ab] animate-ping"></span>
                )}
                {node.isFrozen && (
                  <span className="absolute -top-1.5 -left-1.5 px-1 py-0.2 bg-[#93000a] text-[#ffdad7] font-code-sm text-[8px] rounded border border-[#ffb4ab]/60 uppercase">
                    Frozen
                  </span>
                )}

                {/* Node Icon */}
                <span className={`material-symbols-outlined text-[24px] ${
                  isSelected ? 'text-[#ffdad7]' : isCrimson ? 'text-[#ffb4ab]' : 'text-[#38bdf8]'
                }`}>
                  {node.type === 'initiator' && 'account_balance'}
                  {node.type === 'mule' && 'sync_alt'}
                  {node.type === 'shadow_wallet' && 'currency_bitcoin'}
                  {node.type === 'layering' && 'layers'}
                  {node.type === 'terminal_merchant' && 'storefront'}
                  {node.type === 'clean_payroll' && 'badge'}
                  {node.type === 'verified_vendor' && 'domain_verification'}
                </span>

                <span className={`font-code-md font-bold mt-0.5 ${
                  isSelected ? 'text-[#ffdad7]' : isCrimson ? 'text-[#dee2f5]' : 'text-[#8ed5ff]'
                }`}>
                  {node.label}
                </span>
              </div>

              {/* Node Subtitle & Risk Chip */}
              <div className="mt-1 flex flex-col items-center pointer-events-none">
                <span className={`font-label-md text-[11px] font-semibold ${
                  isSelected ? 'text-[#ffdad7]' : isCrimson ? 'text-[#dee2f5]' : 'text-[#bdc8d1]'
                }`}>
                  {node.roleTitle}
                </span>
                <span className={`font-code-sm text-[10px] font-medium ${
                  isCrimson ? 'text-[#ffb4ab]' : 'text-[#8ed5ff]'
                }`}>
                  {isCrimson ? `RISK: ${node.riskScore}/100` : `RISK: 0${node.riskScore}/100`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend Bar */}
      <div className="p-3 bg-[#161b29] flex flex-wrap items-center justify-between gap-3 border-t border-[#3e484f]/30">
        <div className="flex flex-wrap items-center gap-4 font-code-sm text-[11px]">
          <span className="flex items-center gap-1.5 text-[#bdc8d1]">
            <span className="w-3 h-3 rounded-full bg-[#38bdf8]"></span>
            Verified / Benign Node
          </span>
          <span className="flex items-center gap-1.5 text-[#bdc8d1]">
            <span className="w-3 h-3 rounded-full bg-[#ffb4ab]"></span>
            Mule / Suspicious Entity
          </span>
          <span className="flex items-center gap-1.5 text-[#bdc8d1]">
            <span className="w-5 h-0.5 bg-[#38bdf8]"></span>
            Safe Financial Flow
          </span>
          <span className="flex items-center gap-1.5 text-[#ffb4ab] font-medium">
            <span className="w-5 h-1 bg-[#ffb4ab] animate-pulse"></span>
            Active Smurfing / Layering Path
          </span>
        </div>
        <span className="font-code-sm text-[10px] text-[#87929a]">
          CANVAS REF: 1920x1080 RENDERER v2.4
        </span>
      </div>
    </div>
  );
};
