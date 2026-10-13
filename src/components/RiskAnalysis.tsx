import React, { useState } from 'react';
import { RiskFactor } from '../types/aml';
import { RISK_REASONS } from '../data/mockData';

export const RiskAnalysis: React.FC = () => {
  const [selectedFactor, setSelectedFactor] = useState<RiskFactor | null>(null);

  return (
    <section className="flex flex-col gap-4 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider">
            Algorithmic Heuristics
          </span>
          <h2 className="font-headline-lg text-[22px] font-semibold text-[#dee2f5] tracking-tight">
            Multi-Factor Risk Breakdown
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-code-sm text-[11px] px-2.5 py-1 rounded bg-[#252a38] text-[#bdc8d1] border border-[#3e484f]/40">
            MODEL: AML-HYDRA-v4.1
          </span>
          <span className="font-code-sm text-[11px] px-2.5 py-1 rounded bg-[#93000a] text-[#ffdad7] font-bold border border-[#ffb4ab]/30">
            CONFIDENCE: 98.4%
          </span>
        </div>
      </div>

      {/* Forensic Metric Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm">
        <div>
          <div className="flex justify-between items-center mb-1.5 font-code-sm text-[11px]">
            <span className="text-[#dee2f5] font-medium">Rapid Velocity</span>
            <span className="text-[#ffb4ab] font-bold">98%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#303443] overflow-hidden">
            <div className="h-full bg-[#ffb4ab] rounded-full w-[98%]"></div>
          </div>
          <span className="font-code-sm text-[10px] text-[#87929a] mt-1 block">
            Full sum routed in &lt; 6 min
          </span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5 font-code-sm text-[11px]">
            <span className="text-[#dee2f5] font-medium">Layering &amp; Structuring</span>
            <span className="text-[#ffb4ab] font-bold">94%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#303443] overflow-hidden">
            <div className="h-full bg-[#ffb4ab] rounded-full w-[94%]"></div>
          </div>
          <span className="font-code-sm text-[10px] text-[#87929a] mt-1 block">
            Sub-50K threshold stepping
          </span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5 font-code-sm text-[11px]">
            <span className="text-[#dee2f5] font-medium">Circular Movement</span>
            <span className="text-[#ffbcb7] font-bold">88%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#303443] overflow-hidden">
            <div className="h-full bg-[#ffbcb7] rounded-full w-[88%]"></div>
          </div>
          <span className="font-code-sm text-[10px] text-[#87929a] mt-1 block">
            Nested shell account loop
          </span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5 font-code-sm text-[11px]">
            <span className="text-[#dee2f5] font-medium">Shadow Off-Ramp</span>
            <span className="text-[#ffb4ab] font-bold">91%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#303443] overflow-hidden">
            <div className="h-full bg-[#ffb4ab] rounded-full w-[91%]"></div>
          </div>
          <span className="font-code-sm text-[10px] text-[#87929a] mt-1 block">
            Non-custodial darknet sink
          </span>
        </div>
      </div>

      {/* 6 Interactive Detection Reason Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RISK_REASONS.map((factor, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedFactor(factor)}
            className="p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm flex flex-col justify-between hover:bg-[#1a1f2d] hover:border-[#38bdf8]/40 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">{factor.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-[14px] font-semibold text-[#dee2f5] group-hover:text-[#8ed5ff] transition-colors">
                  {factor.title}
                </h3>
                <p className="font-body-md text-[12px] text-[#bdc8d1] mt-1 leading-relaxed">
                  {factor.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-[#3e484f]/20 flex justify-between items-center font-code-sm text-[10px]">
              <span className={`font-semibold ${
                factor.impactLevel === 'CRITICAL IMPACT' ? 'text-[#ffb4ab]' : 'text-[#8ed5ff]'
              }`}>
                {factor.impactLevel}
              </span>
              <span className="text-[#87929a]">{factor.triggerMeta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Factor Detail Modal */}
      {selectedFactor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#161b29] border border-[#3e484f] rounded-xl max-w-lg w-full p-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedFactor(null)}
              className="absolute top-4 right-4 text-[#87929a] hover:text-[#dee2f5]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-[#93000a]/40 text-[#ffb4ab] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">{selectedFactor.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-[16px] font-bold text-[#dee2f5]">
                  {selectedFactor.title}
                </h3>
                <span className="font-code-sm text-[11px] text-[#ffb4ab] font-semibold">
                  {selectedFactor.impactLevel} • {selectedFactor.triggerMeta}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-[13px] text-[#bdc8d1] font-body-md">
              <p className="p-3 rounded bg-[#090e1b] border border-[#3e484f]/40 text-[#dee2f5]">
                {selectedFactor.description}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-code-sm">
                <div className="p-2 rounded bg-[#1a1f2d]">
                  <span className="text-[#87929a] block text-[10px]">HEURISTIC RISK SCORE</span>
                  <span className="text-[#ffb4ab] font-bold text-[14px]">{selectedFactor.score}/100</span>
                </div>
                <div className="p-2 rounded bg-[#1a1f2d]">
                  <span className="text-[#87929a] block text-[10px]">TAXONOMY CATEGORY</span>
                  <span className="text-[#8ed5ff] font-bold text-[14px]">{selectedFactor.category}</span>
                </div>
              </div>
              <div className="p-3 rounded bg-[#1a1f2d] border border-amber-500/30 text-amber-200 text-[11px]">
                <strong>Statutory Precedent:</strong> Transactions exhibiting this velocity signature are mandated to undergo enhanced due diligence under RBI/FIU AML Master Direction Clause 8.2.
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setSelectedFactor(null)}
                className="px-4 py-2 rounded bg-[#252a38] text-[#dee2f5] hover:bg-[#343948] font-label-md text-[12px]"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
