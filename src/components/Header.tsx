import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onSearchSelect: (query: string) => void;
  onExportDossierClick: () => void;
  activeScreen: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearchSelect, onExportDossierClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const notifications = [
    {
      id: 1,
      title: 'Active Smurfing Velocity Detected',
      desc: 'Account B204 routed ₹2,35,000 to Shadow Wallet W204 in 6 minutes.',
      time: '2m ago',
      level: 'CRITICAL',
    },
    {
      id: 2,
      title: 'Sanctions Match on Node W204',
      desc: 'Matches LEA flagged entity linked to crypto fraud seizure #4109.',
      time: '14m ago',
      level: 'HIGH',
    },
    {
      id: 3,
      title: 'Automated Freeze Enforced',
      desc: 'TXN-48291 held under PMLA 2002 statutory emergency hold.',
      time: '32m ago',
      level: 'NORMAL',
    },
  ];

  const quickSearchItems = [
    { type: 'Node', id: 'A102', label: 'Origin Initiator (HDFC Pvt, BLR)', score: 'Risk 92' },
    { type: 'Node', id: 'B204', label: 'Mule Escrow (NeoFin Shell, DL)', score: 'Risk 94' },
    { type: 'Transaction', id: 'TXN-48291', label: '₹2,50,000 (A102 -> B204)', score: 'IMPS' },
    { type: 'Chain', id: 'CHAIN-001', label: 'Rapid Layering (5 Hops)', score: '₹9.15 Lakhs' },
    { type: 'Case', id: 'FIU-CASE-2024-8849', label: 'STR Submission Ready', score: 'PMLA 2002' },
  ];

  const filteredItems = quickSearchItems.filter(item =>
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#090e1b]/90 backdrop-blur-xl border-b border-[#3e484f]/30">
      <div className="w-full h-full px-6 flex items-center justify-between gap-4">
        {/* Brand & Live Node indicator */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <img
              alt="Money Trail Explorer Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UqH45zYfaFkULuln_CL-I7NUYfZdPW6WGPuVL1wdgvFcguLKFlrw4nhZRlS71VWMtLoRikN5zSIXOavBQpH4QAVi1VD5nC_FEySnGJh0ylKkHkzr_tvULQSEA5tv1qkQGcQjDl-vAKP6MUOU26N0kgGtNYSN84MAsoXGsraQGjWkzo445scHFsruXBmXzX5IcyRzsOoBavc360ysl45GV4btXP6udhSbYN8bvlxNYxc5NNha2ZfvPukfI"
              onError={(e) => {
                // Fallback icon if network blocks image
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-headline-md text-[18px] font-semibold tracking-tight text-[#dee2f5]">
              Money Trail Explorer
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-[#252a38]/60 border border-[#3e484f]/40">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
            <span className="font-code-sm text-[11px] text-[#8ed5ff] tracking-wide">
              AML INTELLIGENCE NODE v2.4 (LIVE)
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block relative">
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3 text-[#87929a] pointer-events-none text-[18px]">
              search
            </span>
            <input
              ref={searchInputRef}
              className="w-full h-9 pl-10 pr-16 bg-[#161b29] border border-[#3e484f]/50 rounded text-[#dee2f5] font-code-sm text-[11px] placeholder:text-[#87929a] focus:border-[#38bdf8] focus:outline-none transition-colors"
              placeholder="Search target address (0x...), transaction hash, entity ID, or case ref..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 250)}
            />
            <kbd className="absolute right-2 px-2 py-0.5 bg-[#252a38] rounded text-[#bdc8d1] font-code-sm text-[10px] border border-[#3e484f]/40">
              Ctrl+K
            </kbd>
          </div>

          {/* Quick search popup */}
          {showSearchResults && (
            <div className="absolute top-11 left-0 right-0 bg-[#161b29] border border-[#3e484f] rounded-lg shadow-2xl p-2 z-50">
              <div className="text-[10px] font-code-sm text-[#87929a] uppercase tracking-wider px-2 py-1">
                Quick Forensic Results ({filteredItems.length})
              </div>
              <div className="space-y-1 mt-1 max-h-60 overflow-y-auto">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onMouseDown={() => {
                      onSearchSelect(item.id);
                      setSearchQuery(item.id);
                      setShowSearchResults(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#252a38] flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-code-sm bg-[#090e1b] text-[#38bdf8] border border-[#3e484f]/40">
                        {item.type}
                      </span>
                      <span className="font-code-sm font-semibold text-[#dee2f5] group-hover:text-[#8ed5ff]">
                        {item.id}
                      </span>
                      <span className="text-[11px] text-[#87929a] truncate max-w-[200px]">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-code-sm text-[10px] text-[#ffb4ab]">
                      {item.score}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Tools & User Info */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[#1a1f2d] border border-[#3e484f]/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-code-sm text-[11px] text-[#bdc8d1]">
              Feed: <span className="text-[#8ed5ff] font-medium">Online</span>
            </span>
          </div>

          <button
            onClick={onExportDossierClick}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1a1f2d] hover:bg-[#252a38] hover:text-[#dee2f5] text-[#bdc8d1] border border-[#3e484f]/40 font-label-md text-[12px] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Export Case Dossier
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              aria-label="Notifications"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (showNotifications) setNotificationCount(0);
              }}
              className="p-1.5 rounded bg-[#161b29] hover:bg-[#252a38] hover:text-[#dee2f5] text-[#bdc8d1] border border-[#3e484f]/30 relative flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ffb4ab] ring-2 ring-[#090e1b]"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-11 w-80 bg-[#161b29] border border-[#3e484f] rounded-lg shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#3e484f]/40">
                  <span className="font-code-sm text-[11px] font-bold text-[#dee2f5]">
                    AML SURVEILLANCE ALERTS
                  </span>
                  <button
                    onClick={() => setNotificationCount(0)}
                    className="text-[10px] text-[#8ed5ff] hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2 mt-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2 rounded bg-[#1a1f2d] border border-[#3e484f]/30 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#dee2f5] truncate">
                          {n.title}
                        </span>
                        <span className="font-code-sm text-[9px] text-[#ffb4ab] bg-[#93000a]/40 px-1 py-0.5 rounded">
                          {n.level}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#87929a]">{n.desc}</p>
                      <span className="font-code-sm text-[9px] text-[#87929a]/80 self-end">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#3e484f]/30">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#38bdf8]/40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuqTPwDhlwIZDcGEYYqXue1yMp7txg_jSq3XSlQYiNs4kB7NdHO3sg-F4GDbWO7Y0mizSv5-gCm1p1kw-UzZpweHCB1YULfiNv_YdhaL4vIK5TV2pad0uoeCJ8ecsjL4ic_4SSuSvbGeoU_UtkXdIXBouFgYBDBrBJgjqSD9Tx1CC4XOu8nsqfS8NQn4Sw9wpctgZ9KTJrj_EVEGO9o6qKP-VhY6U_UWtcdV6gU1uXXSKiQn6u2UFu"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="hidden 2xl:flex flex-col text-left">
              <span className="font-label-md text-[12px] text-[#dee2f5] font-medium leading-tight">
                E. Vance
              </span>
              <span className="font-code-sm text-[10px] text-[#bdc8d1] leading-tight">
                Senior Lead Agent (#884)
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
