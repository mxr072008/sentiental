import React, { useState } from 'react';
import { TransactionRecord } from '../types/aml';
import { TransactionDetailModal } from '../components/TransactionDetailModal';

interface TransactionsViewProps {
  transactions: TransactionRecord[];
  onUpdateStatus: (txnId: string, newStatus: TransactionRecord['status']) => void;
  onAddTransaction: (txn: TransactionRecord) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onUpdateStatus,
  onAddTransaction,
}) => {
  const [selectedTxn, setSelectedTxn] = useState<TransactionRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [railFilter, setRailFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New txn form state
  const [sender, setSender] = useState('A102');
  const [receiver, setReceiver] = useState('M102');
  const [amount, setAmount] = useState('₹1,75,000.00');
  const [rail, setRail] = useState('IMPS (P2P)');

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.receiver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesRail = railFilter === 'ALL' || t.rail.includes(railFilter);
    return matchesSearch && matchesStatus && matchesRail;
  });

  const exportCSV = () => {
    const headers = ['Transaction ID', 'Sender', 'Receiver', 'Amount', 'Timestamp', 'Rail', 'Risk Score', 'Status', 'IP'];
    const rows = filtered.map((t) => [
      t.id,
      t.sender,
      t.receiver,
      `"${t.amount}"`,
      `"${t.timestamp}"`,
      t.rail,
      t.riskScore,
      t.status,
      `"${t.ip}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AML_FORENSIC_LEDGER_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newTxn: TransactionRecord = {
      id: `TXN-${Math.floor(48000 + Math.random() * 2000)}`,
      sender,
      senderName: `Account ${sender}`,
      receiver,
      receiverName: `Account ${receiver}`,
      amount,
      rawAmount: parseFloat(amount.replace(/[^0-9.]/g, '')) || 175000,
      timestamp: 'Just now',
      rail,
      riskScore: 88,
      status: 'Suspicious',
      ip: '103.21.244.99 (Proxy)',
      notes: 'Manually logged forensic inspection transfer.',
    };
    onAddTransaction(newTxn);
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#38bdf8] text-[20px]">swap_horiz</span>
            <h1 className="font-headline-lg text-[20px] font-bold text-[#dee2f5]">
              Forensic Transaction Ledger
            </h1>
          </div>
          <p className="text-[12px] text-[#bdc8d1] mt-0.5">
            Full audit log of high-velocity financial movements, inter-bank rails, and flagged accounts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 rounded bg-[#252a38] hover:bg-[#343948] text-[#dee2f5] font-code-sm text-[11px] border border-[#3e484f]/40 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 rounded bg-[#38bdf8] text-[#004965] hover:brightness-110 font-label-md text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Log Entry
          </button>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-[#161b29] border border-[#3e484f]/30 font-code-sm text-[11px]">
        <div>
          <label className="text-[#87929a] block mb-1">Search ID or Account</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type ID, Sender, Receiver..."
            className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8]"
          />
        </div>

        <div>
          <label className="text-[#87929a] block mb-1">Status Filter</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8] cursor-pointer"
          >
            <option value="ALL">All Statuses ({transactions.length})</option>
            <option value="Suspicious">Suspicious</option>
            <option value="Flagged">Flagged</option>
            <option value="Under Review">Under Review</option>
            <option value="Cleared">Cleared</option>
          </select>
        </div>

        <div>
          <label className="text-[#87929a] block mb-1">Payment Rail</label>
          <select
            value={railFilter}
            onChange={(e) => setRailFilter(e.target.value)}
            className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8] cursor-pointer"
          >
            <option value="ALL">All Payment Rails</option>
            <option value="IMPS">IMPS Only</option>
            <option value="UPI">UPI Fast Settle</option>
            <option value="RTGS">RTGS Wholesale</option>
            <option value="NEFT">NEFT Corporate</option>
            <option value="Crypto">Crypto Ramp</option>
          </select>
        </div>
      </div>

      {/* Main Ledger Table */}
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
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-[#1a1f2d] transition-colors border-b border-[#3e484f]/20">
                <td className="py-3 px-4 font-bold text-[#8ed5ff]">{t.id}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-[#252a38] text-[#dee2f5] font-semibold">
                    {t.sender}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded font-semibold ${
                    t.riskScore >= 80 ? 'bg-[#93000a] text-[#ffdad7]' : 'bg-[#252a38] text-[#dee2f5]'
                  }`}>
                    {t.receiver}
                  </span>
                </td>
                <td className={`py-3 px-4 text-right font-bold ${t.riskScore >= 80 ? 'text-[#ffb4ab]' : 'text-[#dee2f5]'}`}>
                  {t.amount}
                </td>
                <td className="py-3 px-4 text-[#bdc8d1]">{t.timestamp}</td>
                <td className="py-3 px-4">{t.rail}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    t.riskScore >= 80 ? 'bg-[#93000a] text-[#ffdad7]' : 'bg-[#38bdf8]/20 text-[#8ed5ff]'
                  }`}>
                    {t.riskScore}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                    t.status === 'Suspicious'
                      ? 'bg-[#93000a] text-[#ffdad7]'
                      : t.status === 'Flagged'
                      ? 'bg-[#93000a]/30 text-[#ffb4ab]'
                      : t.status === 'Cleared'
                      ? 'bg-emerald-950 text-emerald-300'
                      : 'bg-amber-900/30 text-amber-200'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSelectedTxn(t)}
                    className="px-2.5 py-1 rounded bg-[#252a38] hover:bg-[#343948] text-[#8ed5ff] transition-colors border border-[#3e484f]/40 cursor-pointer"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTxn && (
        <TransactionDetailModal
          transaction={selectedTxn}
          onClose={() => setSelectedTxn(null)}
          onUpdateStatus={(id, st) => {
            onUpdateStatus(id, st);
            setSelectedTxn((prev) => (prev ? { ...prev, status: st } : null));
          }}
        />
      )}

      {/* Add New Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#161b29] border border-[#3e484f] rounded-xl max-w-md w-full p-5 shadow-2xl"
          >
            <h3 className="font-headline-md text-[16px] font-bold text-[#dee2f5] mb-3">
              Log New Transaction Entry
            </h3>
            <div className="space-y-3 font-code-sm text-[11px]">
              <div>
                <label className="text-[#87929a] block mb-1">Sender Account</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]"
                  required
                />
              </div>
              <div>
                <label className="text-[#87929a] block mb-1">Receiver Account</label>
                <input
                  type="text"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]"
                  required
                />
              </div>
              <div>
                <label className="text-[#87929a] block mb-1">Transfer Amount (INR)</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]"
                  required
                />
              </div>
              <div>
                <label className="text-[#87929a] block mb-1">Payment Rail</label>
                <select
                  value={rail}
                  onChange={(e) => setRail(e.target.value)}
                  className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]"
                >
                  <option value="IMPS (P2P)">IMPS (P2P)</option>
                  <option value="UPI Fast Settlement">UPI Fast Settlement</option>
                  <option value="RTGS Wholesale">RTGS Wholesale</option>
                  <option value="NEFT Corporate">NEFT Corporate</option>
                  <option value="Crypto Ramp">Crypto Ramp</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 rounded bg-[#252a38] text-[#dee2f5] hover:bg-[#343948] font-label-md text-[12px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 rounded bg-[#38bdf8] text-[#004965] font-label-md text-[12px] font-bold cursor-pointer"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
