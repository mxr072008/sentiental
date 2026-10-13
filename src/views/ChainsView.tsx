import React, { useState } from 'react';
import { SuspiciousChain } from '../types/aml';

interface ChainsViewProps {
  chains: SuspiciousChain[];
  onToggleFreezeChain: (chainId: string) => void;
  onInspectChain: (chainId: string) => void;
}

export const ChainsView: React.FC<ChainsViewProps> = ({
  chains,
  onToggleFreezeChain,
  onInspectChain,
}) => {
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredChains = chains.filter((c) => {
    if (filterSeverity === 'ALL') return true;
    if (filterSeverity === 'CRITICAL') return c.threatStatus === 'CRITICAL RISK';
    if (filterSeverity === 'HIGH') return c.threatStatus === 'HIGH RISK';
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb4ab] text-[20px]">warning</span>
            <h1 className="font-headline-lg text-[20px] font-bold text-[#dee2f5]">
              Active Suspicious Money Chains ({chains.length})
            </h1>
          </div>
          <p className="text-[12px] text-[#bdc8d1] mt-0.5">
            Clustered Directed Acyclic Graph (DAG) structures exhibiting synthetic layering, circular feedback loops, and rapid off-ramping.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1a1f2d] p-1 rounded border border-[#3e484f]/40 font-code-sm text-[11px]">
            <button
              onClick={() => setFilterSeverity('ALL')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterSeverity === 'ALL' ? 'bg-[#38bdf8] text-[#004965] font-bold' : 'text-[#87929a] hover:text-[#dee2f5]'
              }`}
            >
              All Chains
            </button>
            <button
              onClick={() => setFilterSeverity('CRITICAL')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterSeverity === 'CRITICAL' ? 'bg-[#93000a] text-[#ffdad7] font-bold' : 'text-[#87929a] hover:text-[#dee2f5]'
              }`}
            >
              Critical Risk
            </button>
            <button
              onClick={() => setFilterSeverity('HIGH')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterSeverity === 'HIGH' ? 'bg-amber-900/50 text-amber-200 font-bold' : 'text-[#87929a] hover:text-[#dee2f5]'
              }`}
            >
              High Risk
            </button>
          </div>
        </div>
      </div>

      {/* Chain Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30">
          <span className="text-[10px] font-code-sm text-[#87929a] uppercase">TOTAL AGGREGATE RISK EXPOSURE</span>
          <div className="font-headline-xl text-[26px] font-bold text-[#ffb4ab] mt-1">₹39.62 Lakhs</div>
          <span className="text-[11px] text-[#bdc8d1] block mt-1">14 tracked laundering pipelines</span>
        </div>
        <div className="p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30">
          <span className="text-[10px] font-code-sm text-[#87929a] uppercase">FROZEN PIPELINES</span>
          <div className="font-headline-xl text-[26px] font-bold text-[#38bdf8] mt-1">
            {chains.filter(c => c.status === 'FROZEN').length} of {chains.length}
          </div>
          <span className="text-[11px] text-[#bdc8d1] block mt-1">Court orders active under PMLA 2002</span>
        </div>
        <div className="p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30">
          <span className="text-[10px] font-code-sm text-[#87929a] uppercase">MEAN EXTRACTION VELOCITY</span>
          <div className="font-headline-xl text-[26px] font-bold text-amber-300 mt-1">18.4 Minutes</div>
          <span className="text-[11px] text-[#bdc8d1] block mt-1">Fastest hop recorded: 06m 12s</span>
        </div>
      </div>

      {/* Chain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChains.map((chain) => {
          const isCritical = chain.threatStatus === 'CRITICAL RISK';
          const isFrozen = chain.status === 'FROZEN';

          return (
            <div
              key={chain.id}
              className={`p-5 rounded-xl bg-[#161b29] border transition-all ${
                isFrozen
                  ? 'border-amber-500/50 bg-[#161b29]/80'
                  : isCritical
                  ? 'border-[#ffb4ab]/40 hover:border-[#ffb4ab]'
                  : 'border-[#3e484f]/30 hover:border-[#38bdf8]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-code-md font-bold text-[#8ed5ff] text-[15px]">
                      {chain.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-code-sm text-[10px] font-bold ${
                      isCritical ? 'bg-[#93000a] text-[#ffdad7]' : 'bg-amber-900/40 text-amber-200'
                    }`}>
                      {chain.threatStatus}
                    </span>
                    {isFrozen && (
                      <span className="px-2 py-0.5 rounded font-code-sm text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        FROZEN
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline-md text-[14px] font-semibold text-[#dee2f5] mt-1">
                    {chain.primaryTypology}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-code-sm text-[#87929a] block">AGGREGATE TRACED</span>
                  <span className="font-code-lg font-bold text-[#ffb4ab] text-[15px]">
                    {chain.aggregateTraced}
                  </span>
                </div>
              </div>

              {/* Hop Entities Pipeline */}
              <div className="my-4 p-3 rounded-lg bg-[#090e1b] border border-[#3e484f]/30">
                <span className="text-[10px] font-code-sm text-[#87929a] uppercase block mb-1.5">
                  Topology Path ({chain.hops} Hops):
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {chain.entities.map((ent, idx) => (
                    <React.Fragment key={ent}>
                      <span className="px-2 py-0.5 rounded bg-[#252a38] text-[#dee2f5] font-code-sm text-[11px] font-bold border border-[#3e484f]/40">
                        {ent}
                      </span>
                      {idx < chain.entities.length - 1 && (
                        <span className="text-[#ffb4ab] text-[12px]">➔</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#3e484f]/20">
                <span className="font-code-sm text-[10px] text-[#87929a]">
                  Risk Index: <strong className="text-[#dee2f5]">{chain.riskIndex}/100</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onInspectChain(chain.id)}
                    className="px-3 py-1.5 rounded bg-[#252a38] hover:bg-[#343948] text-[#8ed5ff] font-code-sm text-[11px] border border-[#3e484f]/40 cursor-pointer"
                  >
                    Inspect in Graph
                  </button>
                  <button
                    onClick={() => onToggleFreezeChain(chain.id)}
                    className={`px-3 py-1.5 rounded font-code-sm text-[11px] font-semibold cursor-pointer transition-colors ${
                      isFrozen
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                        : 'bg-[#93000a]/20 hover:bg-[#93000a] text-[#ffb4ab] hover:text-white border border-[#ffb4ab]/30'
                    }`}
                  >
                    {isFrozen ? 'Unfreeze' : 'Freeze Chain'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
