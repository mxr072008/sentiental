import React from 'react';
import { SuspiciousChain } from '../types/aml';

interface SuspiciousChainsTableProps {
  chains: SuspiciousChain[];
  onInspectChain: (chainId: string) => void;
  onToggleFreezeChain: (chainId: string) => void;
  onAuditNode: (nodeId: string) => void;
}

export const SuspiciousChainsTable: React.FC<SuspiciousChainsTableProps> = ({
  chains,
  onInspectChain,
  onToggleFreezeChain,
  onAuditNode,
}) => {
  return (
    <section className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider">
            Cluster Detection
          </span>
          <h2 className="font-headline-lg text-[22px] font-semibold text-[#dee2f5] tracking-tight">
            Active Suspicious Money Chains
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-code-sm text-[10px] text-[#87929a]">
            AUTO-REFRESHING EVERY 5s
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1a1f2d] text-[#87929a] font-code-sm text-[11px] uppercase tracking-wider border-b border-[#3e484f]/30">
              <th className="py-3 px-4">Chain ID</th>
              <th className="py-3 px-4">Origin Entity</th>
              <th className="py-3 px-4 text-center">Transfers</th>
              <th className="py-3 px-4 text-right">Aggregate Traced</th>
              <th className="py-3 px-4 text-center">Risk Index</th>
              <th className="py-3 px-4">Primary Pattern Typology</th>
              <th className="py-3 px-4 text-center">Threat Status</th>
              <th className="py-3 px-4 text-right">Investigation Action</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-[13px] text-[#dee2f5]">
            {chains.map((chain) => {
              const isCritical = chain.threatStatus === 'CRITICAL RISK';
              const isHigh = chain.threatStatus === 'HIGH RISK';
              const isMedium = chain.threatStatus === 'MEDIUM RISK';
              const isFrozen = chain.status === 'FROZEN';

              return (
                <tr
                  key={chain.id}
                  className="hover:bg-[#1a1f2d] transition-colors border-b border-[#3e484f]/20"
                >
                  <td className="py-3 px-4 font-code-md text-[12px] text-[#8ed5ff] font-bold">
                    {chain.id}
                  </td>

                  <td className="py-3 px-4 font-code-sm text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[#252a38] text-[#dee2f5] font-semibold border border-[#3e484f]/40">
                      {chain.originEntity}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center font-code-sm text-[11px] text-[#bdc8d1]">
                    {chain.hops} hops
                  </td>

                  <td className={`py-3 px-4 text-right font-code-md text-[12px] font-bold ${
                    isCritical ? 'text-[#ffb4ab]' : isHigh ? 'text-amber-300' : 'text-[#8ed5ff]'
                  }`}>
                    {chain.aggregateTraced}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className={`font-code-sm text-[10px] font-bold px-2 py-0.5 rounded ${
                      isCritical
                        ? 'bg-[#93000a] text-[#ffdad7]'
                        : isHigh
                        ? 'bg-amber-900/40 text-amber-200 border border-amber-500/30'
                        : isMedium
                        ? 'bg-yellow-900/40 text-yellow-200'
                        : 'bg-[#38bdf8]/20 text-[#8ed5ff]'
                    }`}>
                      {chain.riskIndex}/100
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[#bdc8d1] font-body-sm text-[12px]">
                    {chain.primaryTypology}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className={`font-code-sm text-[10px] px-2 py-0.5 rounded font-semibold ${
                      isCritical
                        ? 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/30'
                        : isHigh
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : isMedium
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {isFrozen ? 'FROZEN' : chain.threatStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => onInspectChain(chain.id)}
                      className="px-2.5 py-1 rounded bg-[#252a38] hover:bg-[#343948] text-[#8ed5ff] font-code-sm text-[11px] border border-[#3e484f]/40 transition-colors cursor-pointer"
                    >
                      Inspect Graph
                    </button>

                    <button
                      onClick={() => onToggleFreezeChain(chain.id)}
                      className={`px-2.5 py-1 rounded font-code-sm text-[11px] transition-colors cursor-pointer ${
                        isFrozen
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : isCritical || isHigh
                          ? 'bg-[#93000a]/20 hover:bg-[#93000a] text-[#ffb4ab] hover:text-white border border-[#93000a]/40'
                          : 'bg-[#1a1f2d] hover:bg-[#252a38] text-[#dee2f5] border border-[#3e484f]/40'
                      }`}
                    >
                      {isFrozen ? 'Unfreeze' : isCritical || isHigh ? 'Freeze Chain' : 'Audit Node'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
