import React, { useState } from 'react';

export const CaseDossierSection: React.FC = () => {
  const [isPushing, setIsPushing] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    ref: string;
    ackTime: string;
    status: string;
  } | null>(null);

  const handleDownloadPDF = () => {
    // Generate an official certified text file or printable document
    const dossierText = `================================================================================
                    FINANCIAL INTELLIGENCE UNIT - INDIA (FIU-IND)
               SUSPICIOUS TRANSACTION REPORT (STR) CASE DOSSIER
================================================================================
STATUTORY MANDATE: Prevention of Money Laundering Act, 2002 (Sec 12 / Rule 7)
CLASSIFICATION   : RESTRICTED LAW ENFORCEMENT SENSITIVE (TIER-3)
CASE REFERENCE ID: FIU-CASE-2024-8849
GENERATED AT     : ${new Date().toISOString()}
INVESTIGATOR     : E. Vance (Senior Lead Agent #ID-884)
SURVEILLANCE NODE: AML-HYDRA-v4.1 // NODE #402

1. SUBJECT SUMMARY & PRIMARY TYPOLOGY
--------------------------------------------------------------------------------
Primary Target   : CHAIN-001 (5 Directed Hops)
Typology         : Rapid Layering, Structuring (<₹50k thresholds), Shadow Off-Ramp
Aggregate Traced : ₹9,15,000.00 INR (~$1,010,000.00 USD equiv portfolio)
Total Duration   : 33 Minutes
Extraction Ratio : 84% Terminal POS Cashout

2. TRANSACTIONAL HOP TRACE
--------------------------------------------------------------------------------
Hop 1: A102 (HDFC Pvt, BLR) -> B204 (NeoFin Shell, DL)
       Amount: ₹2,50,000 | 10:42:18 IST | IMPS | IP: 103.21.244.18 (Mule VPN)
Hop 2: B204 -> W204 (Off-ledger Crypto Ramp, Seychelles)
       Amount: ₹2,35,000 | 10:48:02 IST | Crypto Non-custodial | Elapsed: 6m
Hop 3: W204 -> C315 (Apex Commercial Shell, MH)
       Amount: ₹2,20,000 | 11:02:44 IST | RTGS Off-ramp | Elapsed: 14m
Hop 4: C315 -> M102 (FastPOS Liquidation Merchant, Kolkata)
       Amount: ₹2,10,000 | 11:15:39 IST | POS Settlement Shell

3. COMPLIANCE & SANCTIONS CHECKS
--------------------------------------------------------------------------------
- Origin Account A102: 180 consecutive days dormant prior to capital injection.
- Escrow Node B204: Identified as synthetic proxy with zero buffer balance.
- Intermediary W204: Confirmed match to LEA Cyber Fraud Seizure Ref #4109.
- Off-ramp M102: Shell merchant generating fictitious wholesale goods invoices.

4. STATUTORY RECOMMENDATION & ACTIONS
--------------------------------------------------------------------------------
[X] Immediate Section 12-A Asset Freeze on Accounts A102, B204, C315.
[X] Dispatch Formal FIR Packet to Enforcement Directorate (ED) & State Cyber Cell.
[X] File STR Ingest Reference with FIU-IND FINnet 2.0 Gateway.

DIGITAL SIGNATURE & CRYPTOGRAPHIC SEAL:
SHA-256: 9f8a32b17e45c889f012aaecbd776b1580214aed9941efc1889a7428f52219
ATTESTED BY: AML Surveillance Autonomous Agent Cluster v2.4
================================================================================`;

    const blob = new Blob([dossierText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FIU-IND-CASE-2024-8849-DOSSIER.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePushToLEA = () => {
    setIsPushing(true);
    setTimeout(() => {
      setIsPushing(false);
      setSubmissionReceipt({
        ref: 'LEA-ACK-2024-PMLA-90412',
        ackTime: new Date().toLocaleTimeString(),
        status: 'ACCEPTED FOR STATUTORY INVESTIGATION',
      });
    }, 1200);
  };

  return (
    <section
      id="report-dossier-preview"
      className="p-6 rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-md relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#38bdf8] text-[18px]">
              verified_user
            </span>
            <span className="font-code-sm text-[10px] text-[#38bdf8] uppercase font-bold tracking-wider">
              FIU-IND COMPLIANT EVIDENCE PACKET
            </span>
          </div>
          <h2 className="font-headline-lg text-[22px] font-semibold text-[#dee2f5] tracking-tight">
            Case Dossier &amp; STR Submission Preview
          </h2>
          <p className="font-body-md text-[13px] text-[#bdc8d1] mt-0.5">
            Automated compilation of transactional graphs, node sanctions checks, and chain hops for statutory filing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2.5 rounded bg-[#252a38] hover:bg-[#343948] text-[#dee2f5] font-label-md text-[12px] transition-colors flex items-center gap-2 border border-[#3e484f]/40 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download Certified PDF
          </button>

          <button
            onClick={handlePushToLEA}
            disabled={isPushing}
            className="px-4 py-2.5 rounded bg-[#38bdf8] text-[#004965] hover:brightness-110 font-label-md text-[12px] transition-all shadow-md flex items-center gap-2 font-semibold cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPushing ? 'hourglass_top' : 'send'}
            </span>
            {isPushing ? 'Transmitting to FINnet...' : 'Push to LEA Portal (PMLA / STR)'}
          </button>
        </div>
      </div>

      {/* Case Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg bg-[#1a1f2d] border border-[#3e484f]/30 mb-4 font-code-sm text-[11px]">
        <div>
          <span className="text-[#87929a] uppercase block text-[10px]">CASE REFERENCE ID</span>
          <span className="font-bold text-[#dee2f5] text-[14px]">FIU-CASE-2024-8849</span>
        </div>
        <div>
          <span className="text-[#87929a] uppercase block text-[10px]">TARGET MONEY CHAIN</span>
          <span className="font-bold text-[#ffb4ab] text-[14px]">CHAIN-001 (5 Hops)</span>
        </div>
        <div>
          <span className="text-[#87929a] uppercase block text-[10px]">AGGREGATE TRACED EXPOSURE</span>
          <span className="font-bold text-[#ffb4ab] text-[14px]">₹9,15,000 INR</span>
        </div>
        <div>
          <span className="text-[#87929a] uppercase block text-[10px]">COMPLIANCE MANDATE</span>
          <span className="font-bold text-[#38bdf8] text-[14px]">PMLA 2002 / Sec 12 STR</span>
        </div>
      </div>

      {/* Submission Receipt Alert */}
      {submissionReceipt && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between text-[12px] font-code-sm text-emerald-300">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
            <span>
              TRANSMITTED TO LAW ENFORCEMENT PORTAL: <strong>{submissionReceipt.ref}</strong> (at {submissionReceipt.ackTime})
            </span>
          </div>
          <button
            onClick={() => setSubmissionReceipt(null)}
            className="text-emerald-400 hover:text-emerald-200"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Attestation Monospace Stamp */}
      <div className="p-3 rounded bg-[#090e1b] border border-[#3e484f]/30 font-code-sm text-[10px] text-[#87929a] flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#87929a] text-[15px]">lock</span>
          <span>SHA-256 SIGNATURE: 9f8a32b17e45c889f012aaecbd776b1580214aed9941efc1</span>
        </div>
        <div className="text-[#bdc8d1]">
          LEAD INVESTIGATOR: <span className="text-[#8ed5ff] font-medium">E. Vance (#ID-884)</span> • TIMESTAMP: 14-OCT-2024 11:24:09 UTC
        </div>
      </div>
    </section>
  );
};
