import React from 'react';

export type ScreenId = 'dashboard' | 'money-trail' | 'transactions' | 'suspicious-chains' | 'reports' | 'system-settings';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  chainsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate, chainsCount = 14 }) => {
  const navItems = [
    { id: 'dashboard' as ScreenId, label: 'Dashboard', icon: 'dashboard' },
    { id: 'money-trail' as ScreenId, label: 'Money Trail', icon: 'schema' },
    { id: 'transactions' as ScreenId, label: 'Transactions', icon: 'swap_horiz' },
    { id: 'suspicious-chains' as ScreenId, label: 'Suspicious Chains', icon: 'warning', badge: chainsCount },
    { id: 'reports' as ScreenId, label: 'Reports', icon: 'description' },
    { id: 'system-settings' as ScreenId, label: 'System Settings', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#090e1b]/95 backdrop-blur-md border-r border-[#3e484f]/30 z-40 flex flex-col justify-between py-3">
      <div className="flex flex-col gap-3">
        <div className="px-4">
          <span className="font-code-sm text-[10px] uppercase tracking-wider text-[#87929a]">
            Investigation Suite
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#252a38] text-[#8ed5ff] border-l-2 border-[#38bdf8] font-medium shadow-sm'
                    : 'text-[#bdc8d1] hover:bg-[#1a1f2d] hover:text-[#dee2f5] font-body-md text-[14px]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#38bdf8]' : 'text-[#87929a]'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="font-code-sm text-[11px] px-1.5 py-0.5 rounded bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/40 font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Telemetry Footer */}
      <div className="px-3 flex flex-col gap-2">
        <div className="p-3 rounded bg-[#161b29] border border-[#3e484f]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="font-code-sm text-[10px] text-[#87929a] uppercase tracking-wider">
              TELEMETRY SYNC
            </span>
            <span className="font-code-sm text-[11px] text-[#8ed5ff] font-semibold">
              99.98%
            </span>
          </div>
          <div className="w-full h-1 bg-[#252a38] rounded-full overflow-hidden">
            <div className="h-full bg-[#38bdf8] w-[99.98%] animate-pulse"></div>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="font-code-sm text-[10px] text-[#bdc8d1]">LATENCY</span>
            <span className="font-code-sm text-[10px] text-[#dee2f5] font-mono">14ms</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 text-[#87929a] font-code-sm text-[10px]">
          <span>CLASSIFIED: TIER-3</span>
          <span className="material-symbols-outlined text-[15px]">lock</span>
        </div>
      </div>
    </aside>
  );
};
