import React, { useState } from 'react';
import { TransactionRecord } from '../types/aml';

interface TransactionAuditStreamProps {
  transactions: TransactionRecord[];
  onSelectTransaction: (txn: TransactionRecord) => void;
}

export const TransactionAuditStream: React.FC<TransactionAuditStreamProps> = ({
  transactions,
  onSelectTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRail, setSelectedRail] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.amount.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRail =
      selectedRail === 'ALL' ||
      (selectedRail === 'IMPS' && txn.rail.includes('IMPS')) ||
      (selectedRail === 'UPI' && txn.rail.includes('UPI')) ||
      (selectedRail === 'RTGS' && txn.rail.includes('RTGS')) ||
      (selectedRail === 'NEFT' && txn.rail.includes('NEFT'));

    const matchesStatus =
      selectedStatus === 'ALL' || txn.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesRail && matchesStatus;
  });

  return (
    <section className="flex flex-col gap-4 mb-8">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <span className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider">
            Forensic Ledger
          </span>
          <h2 className="font-headline-lg text-[22px] font-semibold text-[#dee2f5] tracking-tight">
            Real-Time Transaction Audit Stream
          </h2>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[#87929a] text-[16px] pointer-events-none">
              search
            </span>
            <input
              id="txn-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Txn ID, Account, Amount..."
              className="h-9 pl-8 pr-3 bg-[#161b29] text-[#dee2f5] rounded font-code-sm text-[11px] placeholder:text-[#87929a] border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8] transition-colors w-64"
            />
          </div>

          <select
            value={selectedRail}
            onChange={(e) => setSelectedRail(e.target.value)}
            className="h-9 bg-[#161b29] text-[#dee2f5] font-code-sm text-[11px] rounded px-3 border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8] cursor-pointer"
          >
            <option value="ALL">All Rails (IMPS, UPI, NEFT, RTGS)</option>
            <option value="IMPS">IMPS Only</option>
            <option value="UPI">UPI Fast Settlement</option>
            <option value="RTGS">RTGS Wholesale</option>
            <option value="NEFT">NEFT Corporate</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-9 bg-[#161b29] text-[#dee2f5] font-code-sm text-[11px] rounded px-3 border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8] cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="Suspicious">Suspicious</option>
            <option value="Flagged">Flagged</option>
            <option value="Under Review">Under Review</option>
            <option value="Cleared">Cleared</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1a1f2d] text-[#87929a] font-code-sm text-[11px] uppercase tracking-wider border-b border-[#3e484f]/30">
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Sender</th>
              <th className="py-3 px-4">Receiver</th>
              <th className="py-3 px-4 text-right">Amount (INR)</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Rail / Type</th>
              <th className="py-3 px-4 text-center">Risk Score</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-[13px] text-[#dee2f5] font-code-sm">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-[#87929a]">
                  No transactions match the selected filters.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((txn) => {
                const isSuspicious = txn.status === 'Suspicious';
                const isFlagged = txn.status === 'Flagged';
                const isCleared = txn.status === 'Cleared';

                return (
                  <tr
                    key={txn.id}
                    className="hover:bg-[#1a1f2d] transition-colors border-b border-[#3e484f]/20"
                  >
                    <td className="py-3 px-4 font-bold text-[#8ed5ff]">
                      {txn.id}
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#252a38] text-[#dee2f5] font-semibold border border-[#3e484f]/30">
                        {txn.sender}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        isSuspicious || isFlagged
                          ? 'bg-[#93000a] text-[#ffdad7]'
                          : 'bg-[#252a38] text-[#dee2f5]'
                      }`}>
                        {txn.receiver}
                      </span>
                    </td>

                    <td className={`py-3 px-4 text-right font-bold ${
                      isSuspicious || isFlagged ? 'text-[#ffb4ab]' : 'text-[#dee2f5]'
                    }`}>
                      {txn.amount}
                    </td>

                    <td className="py-3 px-4 text-[#bdc8d1]">
                      {txn.timestamp}
                    </td>

                    <td className="py-3 px-4 text-[#dee2f5]">
                      {txn.rail}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`font-bold px-2 py-0.5 rounded ${
                        txn.riskScore >= 80
                          ? 'bg-[#93000a] text-[#ffdad7]'
                          : txn.riskScore >= 30
                          ? 'bg-amber-900/40 text-amber-200'
                          : 'bg-[#38bdf8]/15 text-[#8ed5ff]'
                      }`}>
                        {txn.riskScore}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                        isSuspicious
                          ? 'bg-[#93000a] text-[#ffdad7]'
                          : isFlagged
                          ? 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/30'
                          : isCleared
                          ? 'bg-[#252a38] text-[#8ed5ff]'
                          : 'bg-amber-900/30 text-amber-300'
                      }`}>
                        {txn.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectTransaction(txn)}
                        className="px-2.5 py-1 rounded bg-[#252a38] hover:bg-[#343948] text-[#8ed5ff] transition-colors border border-[#3e484f]/40 cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
