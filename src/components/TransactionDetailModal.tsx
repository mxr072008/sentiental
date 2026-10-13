import React, { useState } from 'react';
import { TransactionRecord } from '../types/aml';

interface TransactionDetailModalProps {
  transaction: TransactionRecord | null;
  onClose: () => void;
  onUpdateStatus: (txnId: string, newStatus: TransactionRecord['status']) => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
  onUpdateStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'raw_payload' | 'audit_trail'>('overview');
  const [copied, setCopied] = useState(false);

  if (!transaction) return null;

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(transaction, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="bg-[#161b29] border border-[#3e484f] rounded-xl max-w-2xl w-full p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#3e484f]/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-code-sm text-[10px] text-[#38bdf8] uppercase tracking-wider font-semibold">
                FORENSIC TRANSACTION RECORD
              </span>
              <span className={`font-code-sm text-[10px] px-1.5 py-0.2 rounded font-bold ${
                transaction.riskScore >= 80 ? 'bg-[#93000a] text-[#ffdad7]' : 'bg-[#252a38] text-[#8ed5ff]'
              }`}>
                RISK {transaction.riskScore}/100
              </span>
            </div>
            <h2 className="font-headline-lg text-[18px] font-bold text-[#dee2f5] mt-0.5">
              {transaction.id}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#252a38] hover:bg-[#343948] text-[#87929a] hover:text-[#dee2f5] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#3e484f]/30 my-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-1 font-label-md text-[12px] border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#38bdf8] text-[#8ed5ff] font-semibold'
                : 'border-transparent text-[#87929a] hover:text-[#dee2f5]'
            }`}
          >
            Forensic Overview
          </button>
          <button
            onClick={() => setActiveTab('raw_payload')}
            className={`pb-2 px-1 font-label-md text-[12px] border-b-2 transition-colors cursor-pointer ${
              activeTab === 'raw_payload'
                ? 'border-[#38bdf8] text-[#8ed5ff] font-semibold'
                : 'border-transparent text-[#87929a] hover:text-[#dee2f5]'
            }`}
          >
            Raw Ledger Payload
          </button>
          <button
            onClick={() => setActiveTab('audit_trail')}
            className={`pb-2 px-1 font-label-md text-[12px] border-b-2 transition-colors cursor-pointer ${
              activeTab === 'audit_trail'
                ? 'border-[#38bdf8] text-[#8ed5ff] font-semibold'
                : 'border-transparent text-[#87929a] hover:text-[#dee2f5]'
            }`}
          >
            Compliance Log
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-3 font-code-sm text-[11px]">
            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[#090e1b] border border-[#3e484f]/30">
              <div>
                <span className="text-[#87929a] block text-[10px]">TRANSFER AMOUNT</span>
                <span className="text-[#ffb4ab] font-bold text-[16px]">{transaction.amount} INR</span>
              </div>
              <div>
                <span className="text-[#87929a] block text-[10px]">PAYMENT RAIL</span>
                <span className="text-[#dee2f5] font-semibold text-[13px]">{transaction.rail}</span>
              </div>
              <div>
                <span className="text-[#87929a] block text-[10px]">SENDER ENTITY</span>
                <span className="text-[#8ed5ff] font-semibold">{transaction.sender}</span>
                <span className="text-[#87929a] block text-[10px]">{transaction.senderName}</span>
              </div>
              <div>
                <span className="text-[#87929a] block text-[10px]">RECEIVER ENTITY</span>
                <span className="text-[#ffb4ab] font-semibold">{transaction.receiver}</span>
                <span className="text-[#87929a] block text-[10px]">{transaction.receiverName}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#1a1f2d] border border-[#3e484f]/30 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#87929a]">Ingress IP Address &amp; Origin:</span>
                <span className="text-[#dee2f5]">{transaction.ip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#87929a]">Associated Cluster:</span>
                <span className="text-[#8ed5ff]">{transaction.chainId || 'Unclustered Single Flow'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#87929a]">Timestamp Recorded:</span>
                <span className="text-[#dee2f5]">{transaction.timestamp} IST</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#252a38]/40 border border-[#3e484f]/30">
              <span className="text-[#87929a] block text-[10px] uppercase font-bold mb-1">
                Forensic Analysis Notes:
              </span>
              <p className="text-[#dee2f5] text-[12px] leading-relaxed">
                {transaction.notes}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'raw_payload' && (
          <div className="relative">
            <pre className="p-3 rounded-lg bg-[#090e1b] border border-[#3e484f]/30 font-code-sm text-[11px] text-[#8ed5ff] max-h-60 overflow-y-auto">
              {JSON.stringify(transaction, null, 2)}
            </pre>
            <button
              onClick={copyJson}
              className="absolute top-2 right-2 px-2 py-1 rounded bg-[#252a38] text-[10px] text-[#dee2f5] hover:bg-[#343948] flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">content_copy</span>
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
          </div>
        )}

        {activeTab === 'audit_trail' && (
          <div className="space-y-2 p-3 rounded-lg bg-[#090e1b] border border-[#3e484f]/30 font-code-sm text-[11px]">
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              <span>10:42:19 - Core Banking IMPS Switch Acknowledgement (RRN: 428910029)</span>
            </div>
            <div className="flex items-center gap-2 text-amber-300">
              <span className="material-symbols-outlined text-[15px]">warning</span>
              <span>10:42:20 - Automated Risk Rule #14 Fired: Velocity step-down threshold exceeded</span>
            </div>
            <div className="flex items-center gap-2 text-[#ffb4ab]">
              <span className="material-symbols-outlined text-[15px]">flag</span>
              <span>10:42:21 - Transaction placed under Statutory Auto-Hold (PMLA Sec 12 Rule 7)</span>
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#3e484f]/40 mt-4">
          <div className="flex items-center gap-1">
            <span className="font-code-sm text-[10px] text-[#87929a] mr-1">Modify Status:</span>
            {(['Suspicious', 'Flagged', 'Under Review', 'Cleared'] as const).map((st) => (
              <button
                key={st}
                onClick={() => onUpdateStatus(transaction.id, st)}
                className={`px-2 py-1 rounded font-code-sm text-[10px] transition-colors cursor-pointer ${
                  transaction.status === st
                    ? 'bg-[#38bdf8] text-[#004965] font-bold'
                    : 'bg-[#252a38] text-[#bdc8d1] hover:text-[#dee2f5]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#252a38] text-[#dee2f5] hover:bg-[#343948] font-label-md text-[12px] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
