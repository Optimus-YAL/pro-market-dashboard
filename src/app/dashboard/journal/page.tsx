'use client';

import { SAMPLE_JOURNAL_ENTRIES } from '@/lib/constants';
import { formatPrice, formatPnL, cn } from '@/lib/utils';

export default function JournalPage() {
  const entries = SAMPLE_JOURNAL_ENTRIES;

  return (
    <div className="animate-fade-in-up pb-20">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tighter text-text-primary font-headline">Trading Journal</h2>
          <div className="h-4 w-px bg-white/[0.06]" />
          <span className="text-text-muted text-xs tracking-wider">Reviewing execution performance for Terminal 01</span>
        </div>
        <div className="flex gap-4 items-center bg-surface-secondary border border-white/[0.04] p-2 rounded-sm">
          <div className="flex flex-col px-3 border-r border-white/[0.06]">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">Date Range</span>
            <span className="text-xs font-bold font-headline select-none cursor-pointer flex items-center justify-between min-w-[120px]">
              Last 30 Days <span className="material-symbols-outlined text-[14px] text-text-muted">keyboard_arrow_down</span>
            </span>
          </div>
          <div className="flex flex-col px-3 border-r border-white/[0.06]">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">Setup Type</span>
            <span className="text-xs font-bold font-headline select-none cursor-pointer flex items-center justify-between min-w-[120px]">
              All Setups <span className="material-symbols-outlined text-[14px] text-text-muted">keyboard_arrow_down</span>
            </span>
          </div>
          <div className="flex flex-col px-3">
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest mb-1">Outcome</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-3 h-3 accent-accent bg-surface-elevated border-white/[0.1] rounded-sm cursor-pointer" />
                <span className="text-xs text-text-secondary select-none">Win</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-3 h-3 accent-accent bg-surface-elevated border-white/[0.1] rounded-sm cursor-pointer" />
                <span className="text-xs text-text-secondary select-none">Loss</span>
              </label>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-accent/10 text-accent hover:bg-accent hover:text-on-accent px-4 py-2 rounded-sm font-bold uppercase text-[10px] tracking-widest transition-all ml-2">
            <span className="material-symbols-outlined text-sm">add</span>
            Add Trade
          </button>
        </div>
      </header>

      {/* Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Executions Table */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="bg-surface-secondary border border-white/[0.04] rounded-sm flex flex-col flex-1">
            <div className="flex justify-between items-center p-5 border-b border-white/[0.04]">
              <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.15em]">Recent Executions</h3>
              <span className="text-[10px] text-text-muted">Showing {entries.length} trades</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    <th className="px-5 py-4 text-left text-[9px] font-bold text-text-muted uppercase tracking-widest w-[120px]">Date</th>
                    <th className="px-5 py-4 text-left text-[9px] font-bold text-text-muted uppercase tracking-widest w-[140px]">Pair / Contract</th>
                    <th className="px-5 py-4 text-left text-[9px] font-bold text-text-muted uppercase tracking-widest">Setup</th>
                    <th className="px-5 py-4 text-right text-[9px] font-bold text-text-muted uppercase tracking-widest">Entry</th>
                    <th className="px-5 py-4 text-right text-[9px] font-bold text-text-muted uppercase tracking-widest">Exit</th>
                    <th className="px-5 py-4 text-right text-[9px] font-bold text-text-muted uppercase tracking-widest">P/L (USD)</th>
                    <th className="px-5 py-4 text-center text-[9px] font-bold text-text-muted uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => {
                    const pnl = formatPnL(entry.pnl);
                    return (
                      <tr key={entry.id} className="border-b border-white/[0.02] hover:bg-surface-elevated/40 transition-colors group cursor-pointer">
                        <td className="px-5 py-4">
                          <span className="text-xs text-text-secondary font-mono block">{entry.date.split(' ')[0]}</span>
                          <span className="text-[10px] text-text-muted font-mono">{entry.date.split(' ')[1] || '14:02'}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-bold text-text-primary block">{entry.pair || 'ESZ3'}</span>
                          <span className="text-[10px] text-text-muted">({entry.marketType || 'S&P 500'})</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-block px-2 py-0.5 bg-surface-card border border-white/[0.05] rounded-full text-[9px] font-bold text-text-secondary tracking-widest uppercase truncate max-w-[120px]">
                            {entry.setup}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right text-xs font-mono font-medium text-text-secondary">{formatPrice(entry.entry)}</td>
                        <td className="px-5 py-4 text-right text-xs font-mono font-medium text-text-secondary">{formatPrice(entry.exit)}</td>
                        <td className={cn('px-5 py-4 text-right text-xs font-black font-tabular', pnl.className)}>{pnl.text}</td>
                        <td className="px-5 py-4 text-center">
                          <button className="text-text-muted hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100">
                            <span className="material-symbols-outlined text-[18px]">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-auto border-t border-white/[0.04]">
              <button className="w-full py-4 text-[10px] font-bold text-accent uppercase tracking-[0.2em] hover:bg-surface-elevated transition-colors text-center">
                Load More History
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Persistent New Execution Panel & Weekly Performance */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* New Execution Form */}
          <div className="bg-surface-secondary border border-white/[0.04] rounded-sm flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-white/[0.04]">
              <h3 className="text-[15px] font-bold text-text-primary tracking-tight font-headline">New Execution</h3>
              <span className="text-[9px] bg-white/[0.06] text-text-muted px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold">Manual Entry</span>
            </div>
            
            <div className="p-5 space-y-5 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-text-muted tracking-widest block">Asset / Pair</label>
                  <input placeholder="e.g. BTCUSDT" className="w-full h-10 px-3 bg-surface-card border border-white/[0.04] rounded-sm text-sm text-text-primary focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none transition-all placeholder:text-text-muted/40 font-mono" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-text-muted tracking-widest block">Setup</label>
                  <div className="relative">
                    <select className="appearance-none w-full h-10 pl-3 pr-8 bg-surface-card border border-white/[0.04] rounded-sm text-sm text-text-primary focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none transition-all">
                      <option>Mean Reversion</option>
                      <option>Breakout</option>
                      <option>Trend Following</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted text-[18px] pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-text-muted tracking-widest block">Entry Price</label>
                  <input type="number" step="0.01" placeholder="0.00" className="w-full h-10 px-3 bg-surface-card border border-white/[0.04] rounded-sm text-sm font-mono text-text-primary focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none transition-all placeholder:text-text-muted/40" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-text-muted tracking-widest block">Exit Price</label>
                  <input type="number" step="0.01" placeholder="0.00" className="w-full h-10 px-3 bg-surface-card border border-white/[0.04] rounded-sm text-sm font-mono text-text-primary focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none transition-all placeholder:text-text-muted/40" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-text-muted tracking-widest block">P/L Calculation (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                  <input readOnly placeholder="Auto-calculates" className="w-full h-10 pl-7 pr-3 bg-surface-card/50 border border-white/[0.04] rounded-sm text-sm font-mono text-text-muted focus:outline-none placeholder:text-text-muted/40 cursor-not-allowed" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-text-muted tracking-widest block">Trading Notes</label>
                <textarea placeholder="Describe the psychological state, execution logic, and context..." className="w-full h-24 p-3 bg-surface-card border border-white/[0.04] rounded-sm resize-none text-xs text-text-primary placeholder:text-text-muted/40 focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none transition-all leading-relaxed" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-text-muted tracking-widest block mb-2">Screenshot Upload</label>
                <div className="border border-dashed border-white/[0.1] rounded-sm bg-surface-card/30 p-6 flex flex-col items-center justify-center gap-2 hover:bg-surface-card/60 transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-[28px] text-text-muted group-hover:text-accent transition-colors">cloud_upload</span>
                  <span className="text-[10px] text-text-secondary text-center">Drag and drop chart screenshot<br/>or <span className="text-accent font-bold">browse files</span></span>
                  <span className="text-[8px] text-text-muted uppercase tracking-widest mt-1">PNG, JPG UP TO 10MB</span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-white/[0.04] flex gap-3 mt-auto">
              <button className="flex-1 py-3 bg-surface-card text-text-primary font-bold uppercase text-[10px] tracking-[0.15em] border border-white/[0.04] rounded-sm hover:bg-surface-elevated transition-colors">Cancel</button>
              <button className="flex-[2] py-3 bg-accent text-on-accent font-black uppercase text-xs tracking-[0.1em] rounded-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(184,195,255,0.2)]">Log Trade</button>
            </div>
          </div>

          {/* Weekly Performance Widget */}
          <div className="bg-surface-secondary border border-white/[0.04] rounded-sm p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined" style={{ fontSize: '4rem' }}>monitoring</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-text-muted text-[14px]">timeline</span>
              <h4 className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Weekly Performance</h4>
            </div>
            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="text-2xl font-black text-text-primary tracking-tight font-headline mb-1">+8.42%</p>
                <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Current Win Rate: 64%</p>
              </div>
              <div className="flex items-end gap-1 h-8">
                {[40, 60, 30, 80, 100].map((h, i) => (
                  <div key={i} className={`w-2 rounded-t-sm ${i === 4 ? 'bg-accent' : 'bg-surface-elevated'}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Bottom Equity Bar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-stretch bg-surface-elevated/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl rounded-full overflow-hidden w-max">
        <div className="flex flex-col justify-center px-6 py-2 border-r border-white/[0.08]">
          <span className="text-[8px] font-bold text-text-muted uppercase tracking-[0.15em] mb-0.5">Equity</span>
          <span className="text-sm font-black text-text-primary font-tabular">$124,500.00</span>
        </div>
        <div className="flex flex-col justify-center px-6 py-2 border-r border-white/[0.08]">
          <span className="text-[8px] font-bold text-text-muted uppercase tracking-[0.15em] mb-0.5">Daily P/L</span>
          <span className="text-sm font-black text-accent font-tabular">+$842.12</span>
        </div>
        <div className="flex flex-col justify-center px-6 py-2 border-r border-white/[0.08]">
          <span className="text-[8px] font-bold text-text-muted uppercase tracking-[0.15em] mb-0.5">Open Risk</span>
          <span className="text-sm font-black text-text-primary font-tabular">1.2%</span>
        </div>
        <div className="flex items-center gap-1.5 px-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_0_10px_rgba(184,195,255,0.4)] hover:brightness-110 active:scale-95 transition-all ml-1">
            <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
          </button>
        </div>
      </div>
    </div>
  );
}
