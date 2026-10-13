import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [velocityThreshold, setVelocityThreshold] = useState('10');
  const [structuringThreshold, setStructuringThreshold] = useState('50000');
  const [autoFreezeCritical, setAutoFreezeCritical] = useState(true);
  const [syncInterval, setSyncInterval] = useState('850');
  const [webhookUrl, setWebhookUrl] = useState('https://finnet2.fiu.gov.in/api/v2/ingest/alerts');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#161b29] border border-[#3e484f]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#38bdf8] text-[20px]">settings</span>
            <h1 className="font-headline-lg text-[20px] font-bold text-[#dee2f5]">
              Surveillance Node Configuration
            </h1>
          </div>
          <p className="text-[12px] text-[#bdc8d1] mt-0.5">
            Configure AML heuristics, statutory risk thresholds, and law enforcement gateway links.
          </p>
        </div>

        {savedNotice && (
          <div className="px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 font-code-sm text-[11px] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">check_circle</span>
            Configurations saved to node #402.
          </div>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Algorithmic Heuristics */}
        <div className="p-5 rounded-xl bg-[#161b29] border border-[#3e484f]/30 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#3e484f]/30">
            <span className="material-symbols-outlined text-[#8ed5ff] text-[18px]">tune</span>
            <h3 className="font-headline-md text-[14px] font-semibold text-[#dee2f5]">
              Detection Thresholds
            </h3>
          </div>

          <div className="space-y-3 font-code-sm text-[11px]">
            <div>
              <label className="text-[#87929a] block mb-1">
                Rapid Velocity Window (Minutes)
              </label>
              <input
                type="number"
                value={velocityThreshold}
                onChange={(e) => setVelocityThreshold(e.target.value)}
                className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8]"
              />
              <span className="text-[10px] text-[#87929a] mt-0.5 block">
                Flag transactions forwarded downstream within this duration.
              </span>
            </div>

            <div>
              <label className="text-[#87929a] block mb-1">
                Structuring Mandate Limit (INR)
              </label>
              <input
                type="number"
                value={structuringThreshold}
                onChange={(e) => setStructuringThreshold(e.target.value)}
                className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8]"
              />
              <span className="text-[10px] text-[#87929a] mt-0.5 block">
                Sub-threshold fractional amounts stepping below mandatory reporting floor.
              </span>
            </div>

            <div>
              <label className="text-[#87929a] block mb-1">
                Telemetry Sync Interval (ms)
              </label>
              <input
                type="number"
                value={syncInterval}
                onChange={(e) => setSyncInterval(e.target.value)}
                className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8]"
              />
              <span className="text-[10px] text-[#87929a] mt-0.5 block">
                Core banking IMPS/RTGS switch poll cycle.
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Enforcement & Gateways */}
        <div className="p-5 rounded-xl bg-[#161b29] border border-[#3e484f]/30 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#3e484f]/30">
            <span className="material-symbols-outlined text-[#8ed5ff] text-[18px]">security</span>
            <h3 className="font-headline-md text-[14px] font-semibold text-[#dee2f5]">
              Automated Enforcement &amp; Gateways
            </h3>
          </div>

          <div className="space-y-3 font-code-sm text-[11px]">
            <div>
              <label className="text-[#87929a] block mb-1">
                FIU FINnet 2.0 Webhook Ingest Endpoint
              </label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full bg-[#1a1f2d] text-[#dee2f5] p-2 rounded border border-[#3e484f]/40 focus:outline-none focus:border-[#38bdf8]"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-[#dee2f5]">
                <input
                  type="checkbox"
                  checked={autoFreezeCritical}
                  onChange={(e) => setAutoFreezeCritical(e.target.checked)}
                  className="w-4 h-4 accent-[#38bdf8]"
                />
                <span>Enable Statutory Auto-Hold on Risk Index &gt; 90</span>
              </label>
              <span className="text-[10px] text-[#87929a] mt-0.5 block pl-6">
                Directly triggers an immediate temporary 24h freeze mandate under PMLA Sec 12 Rule 7.
              </span>
            </div>

            <div className="p-3 rounded bg-[#090e1b] border border-[#3e484f]/30 mt-4 text-[11px]">
              <div className="text-[#8ed5ff] font-bold mb-1">Active Cryptographic Keys:</div>
              <div className="text-[#87929a]">
                ECDSA P-256 Signing Key ID: <code>AML-NODE-402-PROD-2024-V2</code>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded bg-[#38bdf8] text-[#004965] hover:brightness-110 font-label-md text-[12px] font-bold cursor-pointer transition-all shadow"
          >
            Apply &amp; Deploy System Settings
          </button>
        </div>
      </form>
    </div>
  );
};
