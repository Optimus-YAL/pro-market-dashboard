'use client';

export default function SettingsPage() {
  return (
    <div className="animate-fade-in-up w-full pb-20">
      {/* Page Header */}
      <header className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white font-headline mb-2">Account Configuration</h2>
        <p className="text-text-secondary text-sm">Modify your terminal environment, risk parameters, and regional market preferences.</p>
      </header>

      <div className="space-y-12">
        {/* Profile */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-white mb-1">Profile</h3>
            <p className="text-[11px] text-text-muted">Identity and institutional role settings.</p>
          </div>
          <div className="md:w-2/3 bg-surface-secondary p-6 rounded-md border border-white/[0.04]">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-md bg-accent/20 border border-accent/40 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-accent text-3xl">person</span>
                </div>
                <button className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:bg-accent/80 transition-colors">
                  <span className="material-symbols-outlined text-[12px]">edit</span>
                </button>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Alexander Sterling</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[9px] bg-white/10 text-text-secondary font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">Institutional Trader</span>
                  <span className="text-[10px] text-text-muted font-mono">ID: 882-QX-40</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-text-secondary tracking-widest">Full Name</label>
                <input
                  defaultValue="Alexander Sterling"
                  className="w-full h-9 px-3 bg-surface-primary border border-white/[0.04] rounded-sm text-xs text-white focus:border-accent/40 focus:ring-1 focus:ring-accent/20 outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-text-secondary tracking-widest">Email Address</label>
                <input
                  type="email"
                  defaultValue="a.sterling@firm-global.com"
                  className="w-full h-9 px-3 bg-surface-primary border border-white/[0.04] rounded-sm text-xs text-white focus:border-accent/40 focus:ring-1 focus:ring-accent/20 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Theme */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-white mb-1">Theme</h3>
            <p className="text-[11px] text-text-muted">Visual interface and contrast profiles.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex flex-col p-4 bg-surface-secondary border-2 border-accent rounded-md items-center justify-center gap-4 transition-all">
              <div className="w-full h-12 bg-surface-primary border border-white/5 rounded-sm flex flex-col gap-1.5 p-2">
                <div className="h-1.5 w-1/2 bg-white/20 rounded-full" />
                <div className="h-1 w-full bg-white/5 rounded-full" />
              </div>
              <span className="text-[11px] text-white font-semibold">Dark Mode</span>
            </button>
            <button className="flex flex-col p-4 bg-surface-secondary border border-transparent hover:border-white/10 rounded-md items-center justify-center gap-4 transition-all group">
              <div className="w-full h-12 bg-white border border-black/10 rounded-sm flex flex-col gap-1.5 p-2">
                <div className="h-1.5 w-1/2 bg-black/20 rounded-full" />
                <div className="h-1 w-full bg-black/5 rounded-full" />
              </div>
              <span className="text-[11px] text-text-muted group-hover:text-white transition-colors">Light Mode</span>
            </button>
            <button className="flex flex-col p-4 bg-surface-secondary border border-transparent hover:border-white/10 rounded-md items-center justify-center gap-4 transition-all group">
              <div className="w-full h-12 bg-black border border-white/20 rounded-sm flex flex-col gap-1.5 p-2">
                <div className="h-1.5 w-1/2 bg-accent rounded-full" />
                <div className="h-1 w-full bg-accent/30 rounded-full" />
              </div>
              <span className="text-[11px] text-text-muted group-hover:text-white transition-colors">High Contrast</span>
            </button>
          </div>
        </section>

        {/* Timezone */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-white mb-1">Timezone</h3>
            <p className="text-[11px] text-text-muted">Regional market hour synchronization.</p>
          </div>
          <div className="md:w-2/3 bg-surface-secondary p-6 rounded-md border border-white/[0.04]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-text-secondary tracking-widest">Primary Market Time</label>
                <div className="relative">
                  <select className="w-full h-9 px-3 bg-surface-primary border border-white/[0.04] rounded-sm text-xs text-white appearance-none outline-none focus:border-accent cursor-pointer">
                    <option>New York (EST) - UTC-5</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted text-[16px] pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-text-secondary tracking-widest">Secondary Market Time</label>
                <div className="relative">
                  <select className="w-full h-9 px-3 bg-surface-primary border border-white/[0.04] rounded-sm text-xs text-text-secondary appearance-none outline-none focus:border-accent cursor-pointer">
                    <option>UTC (Universal)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted text-[16px] pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/[0.04] pt-6">
              <div>
                <h4 className="text-white text-xs font-bold mb-1">Use 24-hour Display Format</h4>
                <p className="text-[10px] text-text-muted">Apply ISO 8601 formatting to all timestamps.</p>
              </div>
              <div className="w-10 h-5 bg-accent rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Limits */}
        <section className="flex flex-col md:flex-row gap-8 relative group">
          <div className="md:w-1/3">
            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-white mb-1">Risk Limits</h3>
            <p className="text-[11px] text-text-muted">Hard-coded safety parameters for automated halting.</p>
          </div>
          <div className="md:w-2/3 bg-surface-secondary p-6 rounded-md border border-white/[0.04]">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[9px] uppercase font-bold text-text-secondary tracking-widest">Max Daily Loss (%)</span>
                  <span className="text-[10px] font-mono text-white">2.50%</span>
                </div>
                <div className="h-1 bg-surface-primary rounded-full relative">
                  <div className="absolute left-0 top-0 h-full bg-accent rounded-full w-[25%]"></div>
                  <div className="absolute left-[25%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow cursor-pointer"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[9px] uppercase font-bold text-text-secondary tracking-widest">Max Drawdown</span>
                  <span className="text-[10px] font-mono text-white">$15,000</span>
                </div>
                <div className="h-1 bg-surface-primary rounded-full relative">
                  <div className="absolute left-0 top-0 h-full bg-accent rounded-full w-[40%]"></div>
                  <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow cursor-pointer"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-text-secondary tracking-widest">Max Position Size (Contracts)</label>
                <input
                  type="number"
                  defaultValue={25}
                  className="w-full h-9 px-3 bg-surface-primary border border-white/[0.04] rounded-sm text-xs font-mono text-white focus:border-accent/40 focus:ring-1 focus:ring-accent/20 outline-none transition-colors"
                />
              </div>

              <div className="flex justify-between items-center bg-[#ef5350]/10 border border-[#ef5350]/20 p-3 rounded-sm">
                <div>
                  <h4 className="text-[#ef5350] text-[11px] font-black uppercase tracking-wider mb-0.5">Auto-Flatten</h4>
                  <p className="text-[9px] text-text-muted">Liquidate all on limit hit</p>
                </div>
                <div className="w-10 h-5 bg-[#ef5350]/50 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white/50 rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
            </div>

            {/* Hover Floating Save Panel (mimicking the draft changes saved alert from screenshot) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-elevated border border-white/10 rounded-md p-3 px-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-text-muted">info</span>
                <span className="text-white text-xs">Draft changes saved locally</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-text-muted text-xs hover:text-white transition-colors">Discard</button>
                <button className="bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-widest text-[10px] px-4 py-2 rounded-sm shadow-[0_0_15px_rgba(184,195,255,0.2)] transition-all">Commit Changes</button>
              </div>
            </div>

          </div>
        </section>

        {/* Markets */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-white mb-1">Markets</h3>
            <p className="text-[11px] text-text-muted">Default instrument watchlist and data focus.</p>
          </div>
          <div className="md:w-2/3 bg-surface-secondary p-6 rounded-md border border-white/[0.04]">
            <label className="text-[9px] uppercase font-bold text-text-secondary tracking-widest block mb-3">Pinned Instruments</label>
            <div className="flex flex-wrap gap-2">
              {['ES', 'NQ', 'YM', 'GC', 'CL', 'DX'].map((sym) => (
                <div key={sym} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full cursor-pointer hover:bg-accent/20 transition-colors">
                  <span className="text-white text-[10px] font-bold">{sym}</span>
                  <span className="material-symbols-outlined text-[12px] text-text-secondary hover:text-white">close</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-transparent border border-white/10 border-dashed rounded-full cursor-pointer hover:border-white/30 transition-colors">
                <span className="material-symbols-outlined text-[12px] text-text-secondary">add</span>
                <span className="text-text-secondary text-[10px] font-bold">Add Symbol</span>
              </div>
            </div>
          </div>
        </section>

        {/* Data Mode */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h3 className="text-xs font-black uppercase tracking-[0.15em] text-white mb-1">Data Mode</h3>
            <p className="text-[11px] text-text-muted">Streaming feed and execution environment.</p>
          </div>
          <div className="md:w-2/3 bg-surface-secondary p-3 rounded-md border border-white/[0.04] flex md:flex-row flex-col">
            <button className="flex-1 flex items-center justify-center gap-2 bg-accent text-on-accent rounded p-3 transition-colors shadow-[0_0_15px_rgba(184,195,255,0.2)]">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span className="font-bold text-[11px]">Live Data</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 hover:bg-white/[0.04] text-text-secondary hover:text-white rounded p-3 transition-colors">
              <span className="material-symbols-outlined text-[16px]">history</span>
              <span className="font-bold text-[11px]">Delayed</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 hover:bg-white/[0.04] text-text-secondary hover:text-white rounded p-3 transition-colors">
              <span className="material-symbols-outlined text-[16px]">science</span>
              <span className="font-bold text-[11px]">Simulation</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
