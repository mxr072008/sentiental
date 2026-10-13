import React, { useState } from 'react';

export const ReportsView: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState('FIU-CASE-2024-8849');
  const [includeGraphVector, setIncludeGraphVector] = useState(true);
  const [includeSanctionAudit, setIncludeSanctionAudit] = useState(true);
  const [includeIPTrace, setIncludeIPTrace] = useState(true);
  const [filingStatus, setFilingStatus] = useState<'DRAFT' | 'SEALED' | 'DISPATCHED'>('SEALED');

  const cases = [
    { id: 'FIU-CASE-2024-8849', title: 'Chain-001 High-Velocity IMPS/Crypto Layering', amount: '₹9,15,000 INR', date: '14 Oct 2024' },
    { id: 'FIU-CASE-2024-8832', title: 'Chain-002 Circular Shell Feedback Loop', amount: '₹6,80,000 INR', date: '13 Oct 2024' },
    { id: 'FIU-CASE-2024-8799', title: 'Chain-003 Dormant Account Activation Surge', amount: '₹3,25,000 INR', date: '12 Oct 2024' },
  ];

  const triggerPrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#38bdf8] text-[20px]">description</span>
            <h1 className="font-headline-lg text-[20px] font-bold text-[#dee2f5]">
              FIU-IND Suspicious Transaction Reports (STR)
            </h1>
          </div>
          <p className="text-[12px] text-[#bdc8d1] mt-0.5">
            Statutory evidence packets compiled in accordance with the Prevention of Money Laundering Act, 2002 (PMLA / Rule 7).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerPrintOrDownload}
            className="px-4 py-2 rounded bg-[#38bdf8] text-[#004965] hover:brightness-110 font-label-md text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer shadow"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            Print / Save Certified Dossier
          </button>
        </div>
      </div>

      {/* Case Selector Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {cases.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCase(c.id)}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${
              selectedCase === c.id
                ? 'bg-[#252a38] border-[#38bdf8] ring-1 ring-[#38bdf8]'
                : 'bg-[#161b29] border-[#3e484f]/30 hover:border-[#87929a]'
            }`}
          >
            <span className="font-code-sm text-[10px] text-[#8ed5ff] block font-bold">{c.id}</span>
            <h4 className="text-[12px] font-semibold text-[#dee2f5] mt-0.5">{c.title}</h4>
            <div className="mt-2 flex justify-between font-code-sm text-[10px] text-[#87929a]">
              <span>{c.date}</span>
              <span className="text-[#ffb4ab] font-bold">{c.amount}</span>
            </div>
          </div>
        ))}
      </div>

      {/* STR Document Preview Container */}
      <div className="p-6 rounded-xl bg-[#090e1b] border border-[#3e484f]/40 shadow-xl font-code-sm text-[12px] space-y-4">
        {/* Formal Header Seal */}
        <div className="border-b border-[#3e484f]/40 pb-4 text-center space-y-1">
          <div className="text-[11px] font-bold text-[#8ed5ff] tracking-widest uppercase">
            GOVERNMENT OF INDIA // FINANCIAL INTELLIGENCE UNIT
          </div>
          <div className="text-[16px] font-bold text-[#dee2f5] font-headline-md tracking-tight">
            SUSPICIOUS TRANSACTION REPORT (STR) - STATUTORY FORM 2A
          </div>
          <div className="text-[10px] text-[#87929a]">
            LEGAL MANDATE: SEC 12 PREVENTION OF MONEY LAUNDERING ACT (PMLA 2002)
          </div>
        </div>

        {/* Case Dossier Specifics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded bg-[#161b29] border border-[#3e484f]/30 text-[11px]">
          <div>
            <span className="text-[#87929a] block text-[10px]">CASE FILE REF</span>
            <span className="text-[#dee2f5] font-bold">{selectedCase}</span>
          </div>
          <div>
            <span className="text-[#87929a] block text-[10px]">EVIDENCE STATUS</span>
            <span className="text-emerald-400 font-bold">{filingStatus}</span>
          </div>
          <div>
            <span className="text-[#87929a] block text-[10px]">REPORTING ENTITY</span>
            <span className="text-[#dee2f5] font-bold">AML NODE #402 (HDFC/NEOFIN)</span>
          </div>
          <div>
            <span className="text-[#87929a] block text-[10px]">LEAD OFFICER</span>
            <span className="text-[#8ed5ff] font-bold">E. Vance (#ID-884)</span>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-3 text-[#bdc8d1] leading-relaxed">
          <h4 className="text-[#8ed5ff] font-bold uppercase text-[11px] border-b border-[#3e484f]/20 pb-1">
            Section A: Typology Classification &amp; Suspicious Indicator
          </h4>
          <p>
            Surveillance telemetry has detected structured fund layering originating from account <strong>A102</strong> (HDFC Bank Bengaluru) involving a rapid dispersal of <strong>₹2,50,000 INR</strong> to intermediary account <strong>B204</strong> (NeoFin Shell New Delhi) with subsequent off-shore conversion into synthetic shadow wallet infrastructure <strong>W204</strong>. Total elapsed velocity was calculated at 33 minutes.
          </p>

          <h4 className="text-[#8ed5ff] font-bold uppercase text-[11px] border-b border-[#3e484f]/20 pb-1 pt-2">
            Section B: Statutory Red Flags Triggered
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[11px]">
            <li>Sudden surge on account dormant for 180 consecutive calendar days.</li>
            <li>Fractional sub-threshold stepping designed to evade mandatory ₹50,000 threshold reporting.</li>
            <li>Direct matching against Law Enforcement Agency (LEA) cyber seizure database (Match ID #4109).</li>
            <li>Proxy IP hopping through anonymized VPN nodes registered in uncooperative jurisdictions.</li>
          </ul>

          <h4 className="text-[#8ed5ff] font-bold uppercase text-[11px] border-b border-[#3e484f]/20 pb-1 pt-2">
            Section C: Evidence Attachments Included
          </h4>
          <div className="flex flex-wrap gap-4 text-[11px]">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#dee2f5]">
              <input
                type="checkbox"
                checked={includeGraphVector}
                onChange={(e) => setIncludeGraphVector(e.target.checked)}
                className="accent-[#38bdf8]"
              />
              Directed Acyclic Graph (DAG) Vector Topology
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-[#dee2f5]">
              <input
                type="checkbox"
                checked={includeSanctionAudit}
                onChange={(e) => setIncludeSanctionAudit(e.target.checked)}
                className="accent-[#38bdf8]"
              />
              Sanctions Database Cross-Match Certificate
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-[#dee2f5]">
              <input
                type="checkbox"
                checked={includeIPTrace}
                onChange={(e) => setIncludeIPTrace(e.target.checked)}
                className="accent-[#38bdf8]"
              />
              TCP/IP Proxy Telemetry Geolocation Audit
            </label>
          </div>
        </div>

        {/* Digital Signature Footer */}
        <div className="pt-4 border-t border-[#3e484f]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[10px] text-[#87929a]">
          <div>
            <div>SHA-256 IMMUTABLE INTEGRITY PROOF:</div>
            <div className="text-[#8ed5ff] font-mono">9f8a32b17e45c889f012aaecbd776b1580214aed9941efc1</div>
          </div>
          <div className="text-right">
            <div>STAMPED: 14-OCT-2024 11:24:09 UTC</div>
            <div className="text-emerald-400 font-bold">VERIFIED LAW ENFORCEMENT PACKET</div>
          </div>
        </div>
      </div>
    </div>
  );
};
