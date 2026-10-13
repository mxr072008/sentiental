import React, { useState } from 'react';
import { NodeEntity, FlowEdge } from '../types/aml';
import { GraphCanvas } from '../components/GraphCanvas';
import { TransactionDossier } from '../components/TransactionDossier';

interface MoneyTrailViewProps {
  nodes: NodeEntity[];
  edges: FlowEdge[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  onToggleFreeze: (nodeId: string) => void;
}

export const MoneyTrailView: React.FC<MoneyTrailViewProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  onToggleFreeze,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddHopModal, setShowAddHopModal] = useState(false);
  const [sourceNode, setSourceNode] = useState('A102');
  const [targetNode, setTargetNode] = useState('B204');
  const [hopAmount, setHopAmount] = useState('₹1,50,000');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
  const activeTxn = {
    id: `TXN-TRAIL-${selectedNode.id}`,
    sender: selectedNode.id === 'A102' ? 'A102' : 'Origin',
    senderName: selectedNode.bank,
    receiver: selectedNode.id,
    receiverName: selectedNode.roleTitle,
    amount: selectedNode.inflow,
    rawAmount: 250000,
    timestamp: 'Live Trace Active',
    rail: 'IMPS/Off-ramp Hybrid',
    riskScore: selectedNode.riskScore,
    status: selectedNode.riskScore >= 80 ? ('Suspicious' as const) : ('Cleared' as const),
    ip: selectedNode.ipAddress,
    notes: `Graph node topology classification: ${selectedNode.flags.join('; ')}`,
  };

  const filteredNodes = nodes.filter((n) => {
    if (filterType === 'all') return true;
    if (filterType === 'suspicious') return n.riskScore >= 70;
    if (filterType === 'clean') return n.riskScore < 50;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#38bdf8] text-[20px]">schema</span>
            <h1 className="font-headline-lg text-[20px] font-bold text-[#dee2f5]">
              Interactive Money Trail Topology
            </h1>
          </div>
          <p className="text-[12px] text-[#bdc8d1] mt-0.5">
            Dynamic graph analysis engine. Isolate laundering vectors, evaluate flow velocities, and trace terminal cash sinks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-[#1a1f2d] p-1 rounded border border-[#3e484f]/40">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded text-[11px] font-code-sm transition-colors cursor-pointer ${
                filterType === 'all' ? 'bg-[#38bdf8] text-[#004965] font-bold' : 'text-[#87929a] hover:text-[#dee2f5]'
              }`}
            >
              All Entities ({nodes.length})
            </button>
            <button
              onClick={() => setFilterType('suspicious')}
              className={`px-3 py-1 rounded text-[11px] font-code-sm transition-colors cursor-pointer ${
                filterType === 'suspicious' ? 'bg-[#93000a] text-[#ffdad7] font-bold' : 'text-[#87929a] hover:text-[#dee2f5]'
              }`}
            >
              High Threat Only (5)
            </button>
            <button
              onClick={() => setFilterType('clean')}
              className={`px-3 py-1 rounded text-[11px] font-code-sm transition-colors cursor-pointer ${
                filterType === 'clean' ? 'bg-emerald-600 text-white font-bold' : 'text-[#87929a] hover:text-[#dee2f5]'
              }`}
            >
              Verified Benign (2)
            </button>
          </div>

          <button
            onClick={() => setShowAddHopModal(true)}
            className="px-3 py-1.5 rounded bg-[#252a38] hover:bg-[#343948] text-[#8ed5ff] font-code-sm text-[11px] border border-[#3e484f]/40 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">add_link</span>
            Simulate Hop
          </button>
        </div>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8">
          <GraphCanvas
            nodes={filteredNodes}
            edges={edges}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
          />
        </div>

        <div className="xl:col-span-4">
          <TransactionDossier
            selectedNode={selectedNode}
            activeTransaction={activeTxn}
            onViewFullChain={() => alert('Opening 5-Hop Full Chain Reconstruction...')}
            onToggleFreeze={onToggleFreeze}
            onGenerateReport={() => alert('Generating FIU-IND Dossier Packet...')}
          />
        </div>
      </div>

      {/* Node Catalog Cards */}
      <div className="p-5 rounded-xl bg-[#161b29] border border-[#3e484f]/30">
        <h3 className="font-headline-md text-[16px] font-semibold text-[#dee2f5] mb-3">
          Surveillance Node Fleet Registry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {nodes.map((n) => (
            <div
              key={n.id}
              onClick={() => onSelectNode(n.id)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                n.id === selectedNodeId
                  ? 'bg-[#252a38] border-[#38bdf8] ring-1 ring-[#38bdf8]'
                  : 'bg-[#1a1f2d] border-[#3e484f]/30 hover:border-[#87929a]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-code-md font-bold text-[#8ed5ff]">{n.id}</span>
                <span className={`px-1.5 py-0.2 rounded font-code-sm text-[10px] font-bold ${
                  n.riskScore >= 80 ? 'bg-[#93000a] text-[#ffdad7]' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  {n.riskScore}/100
                </span>
              </div>
              <div className="text-[12px] text-[#dee2f5] font-semibold">{n.roleTitle}</div>
              <div className="text-[11px] text-[#87929a] truncate">{n.bank}</div>
              <div className="mt-2 pt-2 border-t border-[#3e484f]/20 flex justify-between text-[10px] font-code-sm text-[#bdc8d1]">
                <span>In: {n.inflow}</span>
                <span>Out: {n.outflow}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Hop Simulation Modal */}
      {showAddHopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#161b29] border border-[#3e484f] rounded-xl max-w-md w-full p-5 shadow-2xl">
            <h3 className="font-headline-md text-[16px] font-bold text-[#dee2f5] mb-3">
              Simulate New Transfer Hop
            </h3>
            <div className="space-y-3 font-code-sm text-[11px]">
              <div>
                <label className="text-[#87929a] block mb-1">Source Account</label>
                <select
                  value={sourceNode}
                  onChange={(e) => setSourceNode(e.target.value)}
                  className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]"
                >
                  {nodes.map((n) => (
                    <option key={n.id} value={n.id}>{n.id} - {n.roleTitle}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[#87929a] block mb-1">Target Account</label>
                <select
                  value={targetNode}
                  onChange={(e) => setTargetNode(e.target.value)}
                  className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]"
                >
                  {nodes.map((n) => (
                    <option key={n.id} value={n.id}>{n.id} - {n.roleTitle}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[#87929a] block mb-1">Transfer Amount (INR)</label>
                <input
                  type="text"
                  value={hopAmount}
                  onChange={(e) => setHopAmount(e.target.value)}
                  className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowAddHopModal(false)}
                className="px-3 py-1.5 rounded bg-[#252a38] text-[#dee2f5] hover:bg-[#343948] font-label-md text-[12px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Injected simulated hop ${sourceNode} -> ${targetNode} for ${hopAmount}. Risk engine recalibrated.`);
                  setShowAddHopModal(false);
                }}
                className="px-3 py-1.5 rounded bg-[#38bdf8] text-[#004965] font-label-md text-[12px] font-bold cursor-pointer"
              >
                Inject Vector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
