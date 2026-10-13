import React, { useState } from 'react';

interface ExportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState<'pdf' | 'json' | 'csv'>('pdf');
  const [classification, setClassification] = useState('RESTRICTED LAW ENFORCEMENT SENSITIVE (TIER-3)');
  const [includeTopology, setIncludeTopology] = useState(true);
  const [includeSanctions, setIncludeSanctions] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);

      if (format === 'json') {
        const data = {
          caseId: 'FIU-CASE-2024-8849',
          timestamp: new Date().toISOString(),
          leadAgent: 'E. Vance (#ID-884)',
          classification,
          targetChain: 'CHAIN-001 (5 Hops)',
          aggregateExposure: 915000,
          currency: 'INR',
          nodes: ['A102', 'B204', 'W204', 'C315', 'M102'],
          status: 'STR_SUBMISSION_READY',
          sha256: '9f8a32b17e45c889f012aaecbd776b1580214aed9941efc1',
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CASE_DOSSIER_FIU_2024_8849.json`;
        a.click();
      } else {
        window.print();
      }
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="bg-[#161b29] border border-[#3e484f] rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#3e484f]/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#38bdf8] text-[20px]">
              file_download
            </span>
            <h3 className="font-headline-md text-[16px] font-bold text-[#dee2f5]">
              Export Statutory Case Dossier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded bg-[#252a38] text-[#87929a] hover:text-[#dee2f5] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-4 my-4 font-code-sm text-[11px]">
          <div>
            <label className="text-[#87929a] block mb-1">Target Case File</label>
            <select className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f] cursor-pointer">
              <option>FIU-CASE-2024-8849 (CHAIN-001 • ₹9.15 Lakhs)</option>
              <option>FIU-CASE-2024-8832 (CHAIN-002 • ₹6.80 Lakhs)</option>
              <option>FIU-CASE-2024-8799 (CHAIN-003 • ₹3.25 Lakhs)</option>
            </select>
          </div>

          <div>
            <label className="text-[#87929a] block mb-1">Export Format</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-2 rounded border text-center transition-colors cursor-pointer ${
                  format === 'pdf'
                    ? 'bg-[#38bdf8] text-[#004965] border-[#38bdf8] font-bold'
                    : 'bg-[#1a1f2d] text-[#dee2f5] border-[#3e484f]/40'
                }`}
              >
                Certified PDF / Print
              </button>
              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`p-2 rounded border text-center transition-colors cursor-pointer ${
                  format === 'json'
                    ? 'bg-[#38bdf8] text-[#004965] border-[#38bdf8] font-bold'
                    : 'bg-[#1a1f2d] text-[#dee2f5] border-[#3e484f]/40'
                }`}
              >
                FINnet JSON
              </button>
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-2 rounded border text-center transition-colors cursor-pointer ${
                  format === 'csv'
                    ? 'bg-[#38bdf8] text-[#004965] border-[#38bdf8] font-bold'
                    : 'bg-[#1a1f2d] text-[#dee2f5] border-[#3e484f]/40'
                }`}
              >
                Audit CSV
              </button>
            </div>
          </div>

          <div>
            <label className="text-[#87929a] block mb-1">Classification Marking</label>
            <input
              type="text"
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]"
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#dee2f5]">
              <input
                type="checkbox"
                checked={includeTopology}
                onChange={(e) => setIncludeTopology(e.target.checked)}
                className="accent-[#38bdf8]"
              />
              <span>Include Vector Flow Diagrams &amp; Graph Coordinates</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-[#dee2f5]">
              <input
                type="checkbox"
                checked={includeSanctions}
                onChange={(e) => setIncludeSanctions(e.target.checked)}
                className="accent-[#38bdf8]"
              />
              <span>Include LEA Sanction Hits &amp; IP Geolocation Traces</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#3e484f]/40">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[#252a38] text-[#dee2f5] hover:bg-[#343948] font-label-md text-[12px] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-1.5 rounded bg-[#38bdf8] text-[#004965] font-label-md text-[12px] font-bold cursor-pointer disabled:opacity-50"
          >
            {isExporting ? 'Generating Packet...' : 'Export Dossier'}
          </button>
        </div>
      </div>
    </div>
  );
};
