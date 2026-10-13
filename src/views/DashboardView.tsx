import React, { useState } from 'react';
import { NodeEntity, FlowEdge, TransactionRecord, SuspiciousChain } from '../types/aml';
import { GraphCanvas } from '../components/GraphCanvas';
import { TransactionDossier } from '../components/TransactionDossier';
import { RiskAnalysis } from '../components/RiskAnalysis';
import { LifecycleTimeline } from '../components/LifecycleTimeline';
import { SuspiciousChainsTable } from '../components/SuspiciousChainsTable';
import { TransactionAuditStream } from '../components/TransactionAuditStream';
import { CaseDossierSection } from '../components/CaseDossierSection';
import { FullChainModal } from '../components/FullChainModal';
import { TransactionDetailModal } from '../components/TransactionDetailModal';

interface DashboardViewProps {
  nodes: NodeEntity[];
  edges: FlowEdge[];
  transactions: TransactionRecord[];
  chains: SuspiciousChain[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  onToggleFreezeNode: (nodeId: string) => void;
  onToggleFreezeChain: (chainId: string) => void;
  onUpdateTransactionStatus: (txnId: string, newStatus: TransactionRecord['status']) => void;
  onInspectChain: (chainId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  nodes,
  edges,
  transactions,
  chains,
  selectedNodeId,
  onSelectNode,
  onToggleFreezeNode,
  onToggleFreezeChain,
  onUpdateTransactionStatus,
  onInspectChain,
}) => {
  // Filter bar states
  const [temporalWindow, setTemporalWindow] = useState('Last 72 Hours (Live Trace)');
  const [monitoredFilter, setMonitoredFilter] = useState('All Monitored Accounts (64)');
  const [threatTier, setThreatTier] = useState('All Levels (Critical & High priority)');
  const [topologyFilter, setTopologyFilter] = useState('Active DAG Clusters (Chain 001 - 004)');

  // Modals state
  const [isFullChainModalOpen, setIsFullChainModalOpen] = useState(false);
  const [selectedAuditTxn, setSelectedAuditTxn] = useState<TransactionRecord | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisToast, setAnalysisToast] = useState<string | null>(null);

  // Active selected node & active transaction for inspector
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1]; // default B204
  const activeTxn = transactions.find(
    (t) => t.sender === selectedNode.id || t.receiver === selectedNode.id
  ) || transactions[0];

  const handleResetFilters = () => {
    setTemporalWindow('Last 72 Hours (Live Trace)');
    setMonitoredFilter('All Monitored Accounts (64)');
    setThreatTier('All Levels (Critical & High priority)');
    setTopologyFilter('Active DAG Clusters (Chain 001 - 004)');
    onSelectNode('B204');
    setAnalysisToast('Filters reset to default surveillance state.');
    setTimeout(() => setAnalysisToast(null), 3000);
  };

  const handleAnalyzeTrail = () => {
    setIsAnalyzing(true);
    setAnalysisToast('⚡ Running Graph Heuristic Pipeline: AML-HYDRA-v4.1...');
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisToast('✓ Analysis Complete: 5 Hops verified. Smurfing risk confirmed at 98.4%.');
      setTimeout(() => setAnalysisToast(null), 4000);
    }, 1200);
  };

  const scrollToDossier = () => {
    const el = document.getElementById('report-dossier-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Toast Notification */}
      {analysisToast && (
        <div className="fixed top-20 right-6 z-50 p-3 rounded-lg bg-[#161b29] border border-[#38bdf8] shadow-2xl font-code-sm text-[12px] text-[#dee2f5] flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping"></span>
          <span>{analysisToast}</span>
        </div>
      )}

      {/* 1. DASHBOARD HEADER & FILTER TOOLBAR */}
      <header className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#93000a]/20 text-[#ffb4ab] font-code-sm text-[10px] tracking-wider uppercase border border-[#93000a]/40 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-ping"></span>
                SURVEILLANCE NODE #402 // LIVE FEED
              </span>
              <span className="text-[#87929a] font-code-sm text-[10px]">
                SYNC INTERVAL: 850ms
              </span>
            </div>
            <h1 className="font-headline-xl text-[28px] md:text-[32px] text-[#dee2f5] tracking-tight font-semibold">
              Money Trail Explorer
            </h1>
            <p className="font-body-md text-[14px] text-[#bdc8d1] mt-0.5">
              Visualize money movement, structural layering patterns, and identify suspicious transaction chains in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleResetFilters}
              id="reset-filters-btn"
              className="px-3 py-2 rounded bg-[#1a1f2d] hover:bg-[#252a38] text-[#bdc8d1] hover:text-[#dee2f5] font-label-md text-[12px] transition-colors flex items-center gap-1.5 border border-[#3e484f]/40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              Reset Filters
            </button>

            <button
              onClick={scrollToDossier}
              className="px-3 py-2 rounded bg-[#252a38] hover:bg-[#343948] text-[#dee2f5] font-label-md text-[12px] transition-colors flex items-center gap-1.5 border border-[#3e484f]/50 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">lab_profile</span>
              Export Dossier
            </button>

            <button
              onClick={handleAnalyzeTrail}
              disabled={isAnalyzing}
              className="px-4 py-2 rounded bg-[#38bdf8] text-[#004965] hover:brightness-110 font-label-md text-[12px] transition-all shadow-md shadow-[#38bdf8]/20 flex items-center gap-2 font-bold cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isAnalyzing ? 'rotate_right' : 'bolt'}
              </span>
              <span>{isAnalyzing ? 'Analyzing Network...' : '⚡ Analyze Trail'}</span>
            </button>
          </div>
        </div>

        {/* Filter Control Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3 rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm">
          {/* Temporal Window */}
          <div className="flex flex-col gap-1">
            <label className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span> Temporal Window
            </label>
            <div className="relative">
              <select
                value={temporalWindow}
                onChange={(e) => setTemporalWindow(e.target.value)}
                className="w-full bg-[#1a1f2d] text-[#dee2f5] font-code-sm text-[11px] rounded px-3 py-2 border border-[#3e484f]/40 appearance-none focus:outline-none focus:border-[#38bdf8] cursor-pointer"
              >
                <option>Last 72 Hours (Live Trace)</option>
                <option>Last 24 Hours (Spike Audit)</option>
                <option>Last 7 Days (Consolidated)</option>
                <option>Custom Epoch Range...</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-[#87929a] text-[16px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Monitored Accounts */}
          <div className="flex flex-col gap-1">
            <label className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span> Monitored Accounts
            </label>
            <div className="relative">
              <select
                value={monitoredFilter}
                onChange={(e) => setMonitoredFilter(e.target.value)}
                className="w-full bg-[#1a1f2d] text-[#dee2f5] font-code-sm text-[11px] rounded px-3 py-2 border border-[#3e484f]/40 appearance-none focus:outline-none focus:border-[#38bdf8] cursor-pointer"
              >
                <option>All Monitored Accounts (64)</option>
                <option>Only Initiators (12)</option>
                <option>Identified Escrow/Mules (19)</option>
                <option>Terminal Liquidation Points (9)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-[#87929a] text-[16px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Threat Tier */}
          <div className="flex flex-col gap-1">
            <label className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">shield</span> Threat Tier
            </label>
            <div className="relative">
              <select
                value={threatTier}
                onChange={(e) => setThreatTier(e.target.value)}
                className="w-full bg-[#1a1f2d] text-[#dee2f5] font-code-sm text-[11px] rounded px-3 py-2 border border-[#3e484f]/40 appearance-none focus:outline-none focus:border-[#38bdf8] cursor-pointer"
              >
                <option>All Levels (Critical &amp; High priority)</option>
                <option>Critical Only (&gt; 90 Score)</option>
                <option>Elevated Only (60 - 89)</option>
                <option>Normal / Audited (&lt; 40)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-[#87929a] text-[16px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Topology Filter */}
          <div className="flex flex-col gap-1">
            <label className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">hub</span> Topology Filter
            </label>
            <div className="relative">
              <select
                value={topologyFilter}
                onChange={(e) => setTopologyFilter(e.target.value)}
                className="w-full bg-[#1a1f2d] text-[#dee2f5] font-code-sm text-[11px] rounded px-3 py-2 border border-[#3e484f]/40 appearance-none focus:outline-none focus:border-[#38bdf8] cursor-pointer"
              >
                <option>Active DAG Clusters (Chain 001 - 004)</option>
                <option>Mixer Ingress Points</option>
                <option>Rapid Velocity Bursts (&lt; 10 min)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-[#87929a] text-[16px]">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. SUMMARY STATISTIC CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#38bdf8]/10 blur-xl group-hover:bg-[#38bdf8]/20 transition-all"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="font-code-sm text-[10px] uppercase tracking-wider text-[#87929a]">
                Total Transactions
              </span>
              <div className="font-headline-xl text-[28px] text-[#dee2f5] font-bold tracking-tight mt-1">
                12,482
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#252a38] flex items-center justify-center text-[#8ed5ff]">
              <span className="material-symbols-outlined text-[22px]">swap_calls</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#3e484f]/20 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 font-code-sm text-[11px] text-[#8ed5ff]">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +14.2% vs 24h avg
            </span>
            <svg className="w-20 h-5 text-[#38bdf8] opacity-80" fill="none" viewBox="0 0 100 24">
              <path
                d="M0 20 L20 16 L40 18 L60 8 L80 12 L100 2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#0053db]/20 blur-xl group-hover:bg-[#0053db]/30 transition-all"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="font-code-sm text-[10px] uppercase tracking-wider text-[#87929a]">
                Total Amount Traced
              </span>
              <div className="font-headline-xl text-[28px] text-[#8ed5ff] font-bold tracking-tight mt-1">
                ₹8.42 Cr
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#252a38] flex items-center justify-center text-[#b4c5ff]">
              <span className="material-symbols-outlined text-[22px]">account_balance</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#3e484f]/20 flex items-center justify-between">
            <span className="font-code-sm text-[11px] text-[#bdc8d1] truncate">
              ~ $1.01M equiv traced
            </span>
            <span className="font-code-sm text-[10px] px-1.5 py-0.5 rounded bg-[#252a38] text-[#8ed5ff] font-medium border border-[#3e484f]/30">
              +₹1.85 Cr flagged
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#93000a]/30 blur-xl group-hover:bg-[#93000a]/40 transition-all"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="font-code-sm text-[10px] uppercase tracking-wider text-[#ffb4ab]">
                Suspicious Transactions
              </span>
              <div className="font-headline-xl text-[28px] text-[#ffb4ab] font-bold tracking-tight mt-1">
                126
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#93000a]/30 flex items-center justify-center text-[#ffb4ab] border border-[#ffb4ab]/20">
              <span className="material-symbols-outlined text-[22px]">warning</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#3e484f]/20 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 font-code-sm text-[11px] text-[#ffb4ab]">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +28.4% surge spike
            </span>
            <span className="font-code-sm text-[11px] text-[#bdc8d1]">98.4% Confidence</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-[#ff938c]/30 blur-xl group-hover:bg-[#ff938c]/40 transition-all"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="font-code-sm text-[10px] uppercase tracking-wider text-[#87929a]">
                High-Risk Chains
              </span>
              <div className="font-headline-xl text-[28px] text-[#dee2f5] font-bold tracking-tight mt-1">
                18
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#252a38] flex items-center justify-center text-[#ffbcb7]">
              <span className="material-symbols-outlined text-[22px]">hub</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#3e484f]/20 flex items-center justify-between">
            <span className="font-code-sm text-[11px] text-[#ffb4ab] font-medium">+4 detected last 2h</span>
            <span className="font-code-sm text-[10px] px-1.5 py-0.5 rounded bg-[#93000a]/20 text-[#ffb4ab] font-semibold border border-[#93000a]/40">
              Active Smurfing
            </span>
          </div>
        </div>
      </section>

      {/* 3. MAIN MONEY FLOW VISUALIZATION & 4. RIGHT-SIDE TRANSACTION DETAILS PANEL */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8 items-start">
        {/* Network Graph (8 cols) */}
        <div className="xl:col-span-8">
          <GraphCanvas
            nodes={nodes}
            edges={edges}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {/* Forensic Inspector (4 cols) */}
        <div className="xl:col-span-4">
          <TransactionDossier
            selectedNode={selectedNode}
            activeTransaction={activeTxn}
            onViewFullChain={() => setIsFullChainModalOpen(true)}
            onToggleFreeze={onToggleFreezeNode}
            onGenerateReport={scrollToDossier}
          />
        </div>
      </section>

      {/* 5. RISK ANALYSIS PANEL & DETECTION REASONS */}
      <RiskAnalysis />

      {/* 6. ACTIVITY TIMELINE & EXECUTION SPEED */}
      <LifecycleTimeline onSelectHop={(idx) => {
        // Automatically selects the corresponding node on the DAG
        const nodeMap = ['A102', 'B204', 'W204', 'M102'];
        if (nodeMap[idx]) onSelectNode(nodeMap[idx]);
      }} />

      {/* 7. SUSPICIOUS CHAINS SECTION */}
      <SuspiciousChainsTable
        chains={chains}
        onInspectChain={onInspectChain}
        onToggleFreezeChain={onToggleFreezeChain}
        onAuditNode={onSelectNode}
      />

      {/* 8. DETAILED TRANSACTION AUDIT TABLE */}
      <TransactionAuditStream
        transactions={transactions}
        onSelectTransaction={(txn) => setSelectedAuditTxn(txn)}
      />

      {/* 9. REPORT GENERATION / DEDICATED PREVIEW SECTION */}
      <CaseDossierSection />

      {/* Modals */}
      <FullChainModal
        isOpen={isFullChainModalOpen}
        onClose={() => setIsFullChainModalOpen(false)}
        nodes={nodes}
        edges={edges}
        onFreezeAllInChain={() => {
          ['A102', 'B204', 'W204', 'C315', 'M102'].forEach((id) => onToggleFreezeNode(id));
          setAnalysisToast('All 5 entities in CHAIN-001 frozen under emergency statutory mandate.');
          setTimeout(() => setAnalysisToast(null), 3000);
        }}
      />

      {selectedAuditTxn && (
        <TransactionDetailModal
          transaction={selectedAuditTxn}
          onClose={() => setSelectedAuditTxn(null)}
          onUpdateStatus={onUpdateTransactionStatus}
        />
      )}
    </div>
  );
};
