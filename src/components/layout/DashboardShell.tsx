'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useTerminalStore } from '@/store/useTerminalStore';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [nyClock, setNyClock] = useState('--:--:--');
  const { bias, tradeStatus } = useTerminalStore();

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

      <main className="ml-16 peer-hover:ml-64 mt-12 min-h-[calc(100vh-3rem)] pb-14 transition-all duration-300">
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
              Bias: 
              <span className={
                bias === 'Bullish' ? 'text-accent font-bold' :
                bias === 'Bearish' ? 'text-[#ef5350] font-bold' :
                'text-text-primary font-bold'
              }>{bias}</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-text-muted flex items-center gap-1.5 border-l border-white/[0.06] pl-4">
              Trade Status: 
              <span className={
                tradeStatus === 'Active' ? 'text-accent font-bold flex items-center gap-1' :
                tradeStatus === 'Monitoring' ? 'text-warning font-bold flex items-center gap-1' :
                'text-text-primary font-bold flex items-center gap-1'
              }>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  tradeStatus === 'Active' ? 'bg-accent animate-pulse' :
                  tradeStatus === 'Monitoring' ? 'bg-warning animate-pulse' :
                  'bg-text-muted'
                }`} />
                {tradeStatus}
              </span>
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
