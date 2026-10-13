import React from 'react';
import { TIMELINE_HOPS } from '../data/mockData';

interface LifecycleTimelineProps {
  onSelectHop?: (hopIndex: number) => void;
}

export const LifecycleTimeline: React.FC<LifecycleTimelineProps> = ({ onSelectHop }) => {
  return (
    <section className="p-5 rounded-xl bg-[#161b29] border border-[#3e484f]/30 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <span className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider">
            Chronological Execution
          </span>
          <h2 className="font-headline-lg text-[22px] font-semibold text-[#dee2f5] tracking-tight">
            Timeline: Chain-001 Lifecycle
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded bg-[#252a38] border border-[#3e484f]/40 font-code-sm text-[11px] text-[#dee2f5]">
            Total Elapsed Time: <span className="text-[#ffb4ab] font-bold">33 Minutes</span>
          </div>
          <div className="px-3 py-1 rounded bg-[#252a38] border border-[#3e484f]/40 font-code-sm text-[11px] text-[#dee2f5]">
            Extraction Rate: <span className="text-[#ffb4ab] font-bold">84% (₹2.10L)</span>
          </div>
        </div>
      </div>

      {/* Stepper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {TIMELINE_HOPS.map((hop, idx) => (
          <div
            key={idx}
            onClick={() => onSelectHop && onSelectHop(idx)}
            className="flex flex-col relative p-4 rounded-lg bg-[#1a1f2d] border border-[#3e484f]/40 hover:border-[#38bdf8] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-code-lg text-[13px] font-bold text-[#8ed5ff]">
                {hop.time}
              </span>
              <span className={`font-code-sm text-[10px] px-2 py-0.5 rounded font-semibold ${
                hop.velocityHighlight
                  ? 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/40'
                  : 'bg-[#93000a] text-[#ffdad7]'
              }`}>
                {hop.hopLabel}
              </span>
            </div>

            <div className="font-headline-md text-[14px] font-semibold text-[#dee2f5]">
              <span className="text-[#8ed5ff] font-code-md">{hop.sender}</span> ➔{' '}
              <span className="text-[#ffb4ab] font-code-md">{hop.receiver}</span>
            </div>

            <div className="font-headline-md text-[18px] font-bold text-[#ffb4ab] mt-1">
              {hop.amount}
            </div>

            <p className="font-body-md text-[11px] text-[#bdc8d1] mt-2 line-clamp-3 leading-relaxed">
              {hop.description}
            </p>

            <span className="font-code-sm text-[10px] text-[#87929a] mt-3 block pt-2 border-t border-[#3e484f]/20">
              {hop.txnRef} • {hop.hub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
