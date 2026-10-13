/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, ScreenId } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { MoneyTrailView } from './views/MoneyTrailView';
import { TransactionsView } from './views/TransactionsView';
import { ChainsView } from './views/ChainsView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { ExportDossierModal } from './components/ExportDossierModal';
import {
  INITIAL_NODES,
  INITIAL_EDGES,
  INITIAL_TRANSACTIONS,
  INITIAL_CHAINS,
} from './data/mockData';
import { NodeEntity, FlowEdge, TransactionRecord, SuspiciousChain } from './types/aml';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [nodes, setNodes] = useState<NodeEntity[]>(INITIAL_NODES);
  const [edges] = useState<FlowEdge[]>(INITIAL_EDGES);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [chains, setChains] = useState<SuspiciousChain[]>(INITIAL_CHAINS);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('B204');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Freeze/unfreeze node toggle
  const handleToggleFreezeNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, isFrozen: !n.isFrozen } : n))
    );
  };

  // Freeze/unfreeze chain toggle
  const handleToggleFreezeChain = (chainId: string) => {
    setChains((prev) =>
      prev.map((c) =>
        c.id === chainId
          ? {
              ...c,
              status: c.status === 'FROZEN' ? 'ACTIVE' : 'FROZEN',
            }
          : c
      )
    );
  };

  // Update transaction status
  const handleUpdateTransactionStatus = (
    txnId: string,
    newStatus: TransactionRecord['status']
  ) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txnId ? { ...t, status: newStatus } : t))
    );
  };

  // Add new transaction
  const handleAddTransaction = (newTxn: TransactionRecord) => {
    setTransactions((prev) => [newTxn, ...prev]);
  };

  // Quick search selection jump
  const handleSearchSelect = (query: string) => {
    const foundNode = nodes.find(
      (n) => n.id.toLowerCase() === query.toLowerCase()
    );
    if (foundNode) {
      setSelectedNodeId(foundNode.id);
      setCurrentScreen('dashboard');
      return;
    }

    const foundChain = chains.find(
      (c) => c.id.toLowerCase() === query.toLowerCase()
    );
    if (foundChain) {
      setCurrentScreen('suspicious-chains');
      return;
    }

    const foundTxn = transactions.find(
      (t) => t.id.toLowerCase() === query.toLowerCase()
    );
    if (foundTxn) {
      setCurrentScreen('transactions');
      return;
    }

    // Default fallback to dashboard
    setCurrentScreen('dashboard');
  };

  return (
    <div className="bg-[#0e1320] text-[#dee2f5] min-h-screen font-sans selection:bg-[#38bdf8] selection:text-[#004965]">
      {/* Fixed Header */}
      <Header
        onSearchSelect={handleSearchSelect}
        onExportDossierClick={() => setIsExportModalOpen(true)}
        activeScreen={currentScreen}
      />

      {/* Fixed Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        chainsCount={chains.length}
      />

      {/* Main Content Area */}
      <div className="pl-64">
        <main className="relative pt-20 min-h-screen bg-[#0e1320] w-full px-6 md:px-8">
          {currentScreen === 'dashboard' && (
            <DashboardView
              nodes={nodes}
              edges={edges}
              transactions={transactions}
              chains={chains}
              selectedNodeId={selectedNodeId}
              onSelectNode={(id) => setSelectedNodeId(id)}
              onToggleFreezeNode={handleToggleFreezeNode}
              onToggleFreezeChain={handleToggleFreezeChain}
              onUpdateTransactionStatus={handleUpdateTransactionStatus}
              onInspectChain={(chainId) => {
                setSelectedNodeId('B204');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            />
          )}

          {currentScreen === 'money-trail' && (
            <MoneyTrailView
              nodes={nodes}
              edges={edges}
              selectedNodeId={selectedNodeId}
              onSelectNode={(id) => setSelectedNodeId(id)}
              onToggleFreeze={handleToggleFreezeNode}
            />
          )}

          {currentScreen === 'transactions' && (
            <TransactionsView
              transactions={transactions}
              onUpdateStatus={handleUpdateTransactionStatus}
              onAddTransaction={handleAddTransaction}
            />
          )}

          {currentScreen === 'suspicious-chains' && (
            <ChainsView
              chains={chains}
              onToggleFreezeChain={handleToggleFreezeChain}
              onInspectChain={(chainId) => {
                setCurrentScreen('dashboard');
                setSelectedNodeId('B204');
              }}
            />
          )}

          {currentScreen === 'reports' && <ReportsView />}

          {currentScreen === 'system-settings' && <SettingsView />}
        </main>
      </div>

      {/* Export Dossier Modal */}
      <ExportDossierModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
