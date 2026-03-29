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
    <header className="fixed top-0 right-0 left-0 z-50 h-12 bg-surface-primary flex justify-between items-center px-6">
      <div className="flex items-center gap-8">
        <span className="text-lg font-black text-text-primary tracking-tighter font-headline">Pro Market</span>
        <nav className="hidden md:flex gap-6 items-center">
          <a href="/dashboard" className="font-headline font-semibold tracking-tight text-accent border-b-2 border-accent pb-1 hover:text-text-primary transition-colors">Execute</a>
          <a href="/dashboard/review" className="font-headline font-semibold tracking-tight text-text-secondary hover:text-text-primary transition-colors">Watchlist</a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-surface-secondary px-3 py-1 rounded-sm">
          <span className="material-symbols-outlined text-xs text-text-secondary mr-2">search</span>
          <input type="text" placeholder="Search Symbols..." className="bg-transparent border-none text-xs text-text-primary focus:ring-0 w-48 placeholder:text-text-secondary outline-none" />
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-text-secondary text-xl cursor-pointer hover:text-text-primary transition-colors">notifications</span>
          <span className="material-symbols-outlined text-text-secondary text-xl cursor-pointer hover:text-text-primary transition-colors">settings</span>
          <span className="material-symbols-outlined text-accent text-xl cursor-pointer hover:text-text-primary transition-colors">account_circle</span>
        </div>
      </div>
    </header>
  );
}
