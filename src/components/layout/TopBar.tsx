'use client';

import { useState, useEffect } from 'react';

export function TopBar() {
  const [clock, setClock] = useState('--:--:--');

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-12 bg-surface-primary flex justify-between items-center px-6 border-b border-white/[0.04]">
      <div className="flex items-center gap-8">
        <span className="text-lg font-black text-accent tracking-tighter font-headline">Pro Market</span>
        <nav className="hidden md:flex gap-6 items-center">
          <a href="/dashboard" className="text-accent border-b-2 border-accent pb-1 text-[0.6875rem] font-bold uppercase tracking-[0.05em]">Execute</a>
          <a href="/dashboard/review" className="text-text-secondary hover:text-text-primary text-[0.6875rem] font-bold uppercase tracking-[0.05em] transition-colors">Watchlist</a>
        </nav>
        <div className="hidden lg:flex items-center">
          <div className="h-4 w-px bg-white/[0.06] mx-4" />
          <span className="text-text-muted font-mono tracking-widest uppercase text-[10px]">Market Clock: {clock} UTC</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center bg-surface-card rounded-sm px-3 py-1.5 gap-2">
          <span className="material-symbols-outlined text-text-muted text-sm">search</span>
          <input type="text" placeholder="Search Symbols..." className="bg-transparent text-xs text-text-primary placeholder:text-text-muted outline-none w-32" />
        </div>

        <div className="flex items-center gap-1 ml-2">
          <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-card rounded transition-colors">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-card rounded transition-colors">
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>
          <button className="p-1.5 text-accent hover:text-text-primary hover:bg-surface-card rounded transition-colors">
            <span className="material-symbols-outlined text-xl">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}
