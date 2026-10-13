import React, { useState } from 'react';
import { NodeEntity, TransactionRecord } from '../types/aml';

interface TransactionDossierProps {
  selectedNode: NodeEntity;
  activeTransaction: TransactionRecord;
  onViewFullChain: () => void;
  onToggleFreeze: (entityId: string) => void;
  onGenerateReport: () => void;
}

export const TransactionDossier: React.FC<TransactionDossierProps> = ({
  selectedNode,
  activeTransaction,
  onViewFullChain,
  onToggleFreeze,
  onGenerateReport,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const riskScore = selectedNode.riskScore;
  const isCritical = riskScore >= 80;
  const isMedium = riskScore >= 50 && riskScore < 80;
  const strokeColor = isCritical ? '#ffb4ab' : isMedium ? '#ffbcb7' : '#38bdf8';
  const badgeBg = isCritical ? 'bg-[#93000a] text-[#ffdad7]' : isMedium ? 'bg-amber-900/40 text-amber-200' : 'bg-emerald-900/40 text-emerald-200';

  return (
    <div className="flex flex-col bg-[#161b29] rounded-xl shadow-lg border border-[#3e484f]/30 p-4 gap-3">
      {/* Panel Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider">
            Forensic Inspector
          </span>
          <h2 className="font-headline-md text-[18px] font-semibold text-[#dee2f5] tracking-tight mt-0.5">
            Transaction Dossier
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#303443] text-[#8ed5ff] font-code-sm text-[11px] border border-[#3e484f]/40 font-semibold">
          SELECTED: {activeTransaction.id}
        </span>
      </div>

      {/* Risk Score Gauge */}
      <div className="p-3 rounded-lg bg-[#1a1f2d] border border-[#3e484f]/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            {/* Circular SVG Gauge */}
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#252a38]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={strokeColor}
                strokeDasharray={`${riskScore}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`font-code-lg text-[15px] font-bold ${isCritical ? 'text-[#ffb4ab]' : isMedium ? 'text-amber-300' : 'text-[#8ed5ff]'}`}>
                {riskScore}
              </span>
            </div>
          </div>

          <div>
            <div className="font-label-md text-[12px] text-[#dee2f5] font-semibold">
              Threat Probability
            </div>
            <div className="font-code-sm text-[10px] text-[#bdc8d1]">
              Structuring &amp; Smurfing Vector
            </div>
          </div>
        </div>

        <span className={`px-2 py-1 rounded font-code-sm text-[10px] uppercase tracking-wide font-bold ${badgeBg}`}>
          {isCritical ? 'CRITICAL RISK' : isMedium ? 'ELEVATED RISK' : 'AUDITED BENIGN'}
        </span>
      </div>

      {/* Metadata Spec Grid */}
      <div className="space-y-1.5 py-1 font-code-sm text-[11px]">
        <div className="flex justify-between items-center py-1.5 px-2 rounded bg-[#090e1b] border border-[#3e484f]/20">
          <span className="text-[#87929a]">Transaction ID</span>
          <button
            onClick={() => copyToClipboard(activeTransaction.id, 'txn')}
            className="font-semibold text-[#8ed5ff] flex items-center gap-1 hover:underline cursor-pointer"
          >
            {activeTransaction.id}
            <span className="material-symbols-outlined text-[13px]">
              {copiedField === 'txn' ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>

        <div className="flex justify-between items-center py-1.5 px-2 rounded bg-[#090e1b] border border-[#3e484f]/20">
          <span className="text-[#87929a]">From Account</span>
          <span className="text-[#dee2f5] font-medium text-right">
            {activeTransaction.sender}{' '}
            <span className="text-[#87929a] font-normal text-[10px]">
              ({selectedNode.id === activeTransaction.sender ? selectedNode.bank : 'Initiator BLR'})
            </span>
          </span>
        </div>

        <div className="flex justify-between items-center py-1.5 px-2 rounded bg-[#090e1b] border border-[#3e484f]/20">
          <span className="text-[#87929a]">To Account</span>
          <span className="text-[#ffb4ab] font-medium text-right">
            {activeTransaction.receiver}{' '}
            <span className="text-[#87929a] font-normal text-[10px]">
              ({selectedNode.id === activeTransaction.receiver ? selectedNode.bank : 'NeoFin Shell, DL'})
            </span>
          </span>
        </div>

        <div className="flex justify-between items-center py-1.5 px-2 rounded bg-[#090e1b] border border-[#3e484f]/20">
          <span className="text-[#87929a]">Transfer Value</span>
          <span className="text-[#ffb4ab] font-bold font-headline-md text-[14px]">
            {activeTransaction.amount} INR
          </span>
        </div>

        <div className="flex justify-between items-center py-1.5 px-2 rounded bg-[#090e1b] border border-[#3e484f]/20">
          <span className="text-[#87929a]">Timestamp</span>
          <span className="text-[#dee2f5]">{activeTransaction.timestamp} IST</span>
        </div>

        <div className="flex justify-between items-center py-1.5 px-2 rounded bg-[#090e1b] border border-[#3e484f]/20">
          <span className="text-[#87929a]">Transfer Protocol</span>
          <span className="text-[#bdc8d1]">{activeTransaction.rail}</span>
        </div>

        <div className="flex justify-between items-center py-1.5 px-2 rounded bg-[#090e1b] border border-[#3e484f]/20">
          <span className="text-[#87929a]">Origin Location &amp; IP</span>
          <span className="text-[#ffbcb7] flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">vpn_lock</span>
            {selectedNode.ipAddress} ({selectedNode.isVpn ? 'Mule VPN' : 'Static'})
          </span>
        </div>

        <div className="flex justify-between items-center py-1.5 px-2 rounded bg-[#090e1b] border border-[#3e484f]/20">
          <span className="text-[#87929a]">Automated Flag Status</span>
          <span className="px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad7] font-code-sm text-[10px] font-bold">
            {selectedNode.isFrozen ? 'FROZEN [COURT ORDER]' : activeTransaction.status.toUpperCase() + ' [AUTO-HELD]'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          onClick={onViewFullChain}
          className="w-full py-2.5 px-4 rounded bg-[#38bdf8] text-[#004965] hover:brightness-110 font-label-md text-[12px] font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">visibility</span>
          View Full Chain (5 Hops)
        </button>

        <button
          onClick={() => onToggleFreeze(selectedNode.id)}
          className={`w-full py-2.5 px-4 rounded font-label-md text-[12px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
            selectedNode.isFrozen
              ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-black border border-amber-500/40'
              : 'bg-[#93000a]/20 text-[#ffb4ab] hover:bg-[#93000a] hover:text-white border border-[#ffb4ab]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {selectedNode.isFrozen ? 'lock_open' : 'flag'}
          </span>
          {selectedNode.isFrozen ? `Unfreeze Entity (${selectedNode.id})` : `Flag Transaction & Freeze Account`}
        </button>

        <button
          onClick={onGenerateReport}
          className="w-full py-2.5 px-4 rounded bg-[#252a38] hover:bg-[#343948] text-[#dee2f5] font-label-md text-[12px] transition-colors flex items-center justify-center gap-2 border border-[#3e484f]/40 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">description</span>
          Generate FIU-IND Report
        </button>
      </div>
    </div>
  );
};
