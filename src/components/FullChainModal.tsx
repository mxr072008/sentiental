import React from 'react';
import { NodeEntity, FlowEdge } from '../types/aml';

interface FullChainModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: NodeEntity[];
  edges: FlowEdge[];
  onFreezeAllInChain: () => void;
}

export const FullChainModal: React.FC<FullChainModalProps> = ({
  isOpen,
  onClose,
  nodes,
  edges,
  onFreezeAllInChain,
}) => {
  if (!isOpen) return null;

  const chainNodes = ['A102', 'B204', 'W204', 'C315', 'M102'].map(
    (id) => nodes.find((n) => n.id === id) || nodes[0]
  );

  const chainHops = [
    {
      hop: 1,
      from: 'A102',
      to: 'B204',
      value: '₹2,50,000',
      time: '10:42:18 IST',
      rail: 'IMPS Fast Settle',
      notes: 'Initial capital injection from dormant high-net-worth account (HDFC Bengaluru).',
      flag: 'ORIGIN INJECTION',
    },
    {
      hop: 2,
      from: 'B204',
      to: 'W204',
      value: '₹2,35,000',
      time: '10:48:02 IST (+6 min)',
      rail: 'Crypto Ramp',
      notes: 'Synthetic mule escrow forwarding funds downstream with zero retention buffer.',
      flag: 'RAPID VELOCITY',
    },
    {
      hop: 3,
      from: 'W204',
      to: 'C315',
      value: '₹2,20,000',
      time: '11:02:44 IST (+14 min)',
      rail: 'RTGS Off-ramp',
      notes: 'Non-custodial darknet wallet intermediary routing to offshore shell entity.',
      flag: 'SANCTIONS HIT',
    },
    {
      hop: 4,
      from: 'C315',
      to: 'M102',
      value: '₹2,10,000',
      time: '11:15:39 IST (+13 min)',
      rail: 'POS Merchant Settle',
      notes: 'Terminal cash liquidation through fictitious wholesale billing receipts.',
      flag: 'FINAL CASHOUT SINK',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="bg-[#161b29] border border-[#3e484f] rounded-xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#3e484f]/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab] animate-pulse"></span>
              <span className="font-code-sm text-[10px] text-[#ffb4ab] uppercase font-bold tracking-wider">
                END-TO-END RECONSTRUCTION
              </span>
            </div>
            <h2 className="font-headline-lg text-[20px] font-bold text-[#dee2f5] mt-1">
              CHAIN-001: 5-Hop Layering &amp; Liquidation Anatomy
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#252a38] hover:bg-[#343948] text-[#87929a] hover:text-[#dee2f5] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 font-code-sm text-[11px]">
          <div className="p-3 rounded bg-[#1a1f2d] border border-[#3e484f]/30">
            <span className="text-[#87929a] block text-[10px]">INJECTED SUM</span>
            <span className="text-[#dee2f5] font-bold text-[14px]">₹2,50,000</span>
          </div>
          <div className="p-3 rounded bg-[#1a1f2d] border border-[#3e484f]/30">
            <span className="text-[#87929a] block text-[10px]">TERMINAL EXTRACTED</span>
            <span className="text-[#ffb4ab] font-bold text-[14px]">₹2,10,000 (84%)</span>
          </div>
          <div className="p-3 rounded bg-[#1a1f2d] border border-[#3e484f]/30">
            <span className="text-[#87929a] block text-[10px]">NETWORK DELTA</span>
            <span className="text-amber-300 font-bold text-[14px]">-₹40,000 (Fees)</span>
          </div>
          <div className="p-3 rounded bg-[#1a1f2d] border border-[#3e484f]/30">
            <span className="text-[#87929a] block text-[10px]">TOTAL VELOCITY TIME</span>
            <span className="text-[#ffb4ab] font-bold text-[14px]">33m 21s</span>
          </div>
        </div>

        {/* Visual Node Flow Strip */}
        <div className="p-4 rounded-lg bg-[#090e1b] border border-[#3e484f]/30 my-4 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] px-2">
            {chainNodes.map((node, i) => (
              <React.Fragment key={node.id}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-[#252a38] border border-[#ffb4ab]/60 flex flex-col items-center justify-center text-[#ffdad7] shadow">
                    <span className="font-code-sm font-bold">{node.id}</span>
                  </div>
                  <span className="font-code-sm text-[10px] text-[#bdc8d1] mt-1 text-center truncate max-w-[80px]">
                    {node.roleTitle}
                  </span>
                  <span className="font-code-sm text-[9px] text-[#ffb4ab]">
                    {node.riskScore}/100
                  </span>
                </div>

                {i < chainNodes.length - 1 && (
                  <div className="flex-1 flex flex-col items-center px-2">
                    <div className="w-full h-0.5 bg-[#ffb4ab] relative">
                      <span className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-[#ffb4ab] rotate-45"></span>
                    </div>
                    <span className="font-code-sm text-[9px] text-[#87929a] mt-1">
                      Hop {i + 1}
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Hop Details List */}
        <div className="space-y-2.5 my-4">
          {chainHops.map((h) => (
            <div
              key={h.hop}
              className="p-3 rounded-lg bg-[#1a1f2d] border border-[#3e484f]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded bg-[#93000a]/40 text-[#ffb4ab] font-code-sm text-[11px] font-bold flex items-center justify-center shrink-0">
                  #{h.hop}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-code-md font-bold text-[#8ed5ff]">{h.from}</span>
                    <span className="text-[#87929a]">➔</span>
                    <span className="font-code-md font-bold text-[#ffb4ab]">{h.to}</span>
                    <span className="font-code-sm text-[11px] font-bold text-[#ffb4ab]">
                      ({h.value})
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-code-sm bg-[#93000a]/20 text-[#ffdad7] border border-[#ffb4ab]/30">
                      {h.flag}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#bdc8d1] mt-0.5">{h.notes}</p>
                </div>
              </div>

              <div className="text-right shrink-0 font-code-sm text-[10px] text-[#87929a]">
                <div className="text-[#dee2f5] font-medium">{h.time}</div>
                <div>{h.rail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#3e484f]/40 mt-4">
          <span className="font-code-sm text-[10px] text-[#87929a]">
            Mandate: Section 54 Prevention of Money Laundering Act, 2002
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#252a38] text-[#dee2f5] hover:bg-[#343948] font-label-md text-[12px] cursor-pointer"
            >
              Close Window
            </button>
            <button
              onClick={() => {
                onFreezeAllInChain();
                onClose();
              }}
              className="px-4 py-2 rounded bg-[#93000a] text-[#ffdad7] hover:bg-red-700 font-label-md text-[12px] font-bold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <span className="material-symbols-outlined text-[16px]">gavel</span>
              Freeze All 5 Nodes In Chain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
