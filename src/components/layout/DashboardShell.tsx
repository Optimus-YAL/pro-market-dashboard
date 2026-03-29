'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [nyClock, setNyClock] = useState('--:--:--');

  useEffect(() => {
    const tick = () => setNyClock(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/New_York' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-surface-primary overflow-hidden">
      <TopBar />
      <Sidebar />

      <main className="ml-16 mt-12 mb-8 min-h-screen transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 w-full h-8 z-50 bg-surface-primary border-t border-white/[0.04] flex justify-between items-center px-6">
        <div className="flex items-center gap-8">
          <span className="text-[10px] uppercase tracking-widest text-text-muted">
            System: <span className="text-accent font-bold">Operational</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-text-muted">
            Latency: <span className="text-text-primary">12ms</span>
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-text-muted flex items-center gap-1.5">
              Bias: <span className="text-accent font-bold">Bullish</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-text-muted flex items-center gap-1.5 border-l border-white/[0.06] pl-4">
              Trade Status: <span className="text-warning font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />Monitoring</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 border-l border-white/[0.06] pl-4">
            <a href="#" className="text-[10px] uppercase tracking-widest text-text-muted hover:text-accent transition-opacity">Docs</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-text-muted hover:text-accent transition-opacity">Support</a>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-text-primary font-bold font-mono border-l border-white/[0.06] pl-4">
            NY: {nyClock}
          </span>
        </div>
      </footer>
    </div>
  );
}
