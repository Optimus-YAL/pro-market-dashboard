'use client';

import { useState } from 'react';
import { SAMPLE_KEY_LEVELS } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';
import { TradeReadinessModal } from '@/components/dashboard/TradeReadinessModal';

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const levels = SAMPLE_KEY_LEVELS;

  const crossMarket = [
    { asset: 'NQ', trend: 'down', change: '-43.50' },
    { asset: 'DXY', trend: 'up', change: '+0.12' },
    { asset: 'US10Y', trend: 'level', change: '4.21%' },
  ];

  const sessionPulse = [
    { session: 'Asia', status: 'Closed', active: false },
    { session: 'London', status: 'Active', active: true },
    { session: 'New York', status: 'Pre-Market', active: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up pb-8">
      {/* ────────────────────────────────────────────────
          DECISION BAR (Sticky)
         ──────────────────────────────────────────────── */}
      <section className="sticky top-12 z-30 bg-surface-card/80 backdrop-blur-xl border-t border-white/[0.06] shadow-2xl shadow-black/40 flex flex-wrap items-center justify-between px-6 py-3 gap-4">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Bias Score</span>
            <span className="text-3xl font-black text-accent tracking-tighter font-headline">8.4</span>
          </div>
          <div className="h-8 w-px bg-white/[0.06]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Regime</span>
            <span className="font-headline text-lg font-bold text-accent">Bullish Expansion</span>
          </div>
          <div className="h-8 w-px bg-white/[0.06] hidden lg:block" />
          <div className="flex-col hidden lg:flex">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Macro Environment</span>
            <span className="font-headline text-lg font-bold text-text-primary">Risk-On</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Active Preset</span>
            <span className="text-sm font-bold text-text-primary">Trend-Following Alpha</span>
          </div>
          <div className="h-8 w-px bg-white/[0.06] hidden md:block" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-text-muted uppercase block">Trade Status</span>
            <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-sm tracking-wider uppercase">MONITORING SETUP</span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-accent text-on-accent font-headline text-xs font-bold px-6 py-2 rounded-sm tracking-wide uppercase transition-transform active:scale-95 hover:brightness-110"
          >
            Execute Trade
          </button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────
          MAIN GRID (9 col center + 3 col right)
         ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6">
        {/* ──── LEFT / CENTER (col-span-9) ──── */}
        <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
          {/* ROW 1: Key Levels | Cross-Market | Session Pulse */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Key Levels */}
            <div className="bg-surface-secondary p-5 rounded-lg border border-white/[0.04]">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[0.6875rem] font-black uppercase tracking-widest text-text-muted">Key Price Levels</h3>
                <span className="text-[10px] text-text-muted font-mono">ES MAR-24</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { label: 'PDH', value: levels.pdh },
                  { label: 'PDL', value: levels.pdl },
                  { label: 'PC', value: levels.pc },
                  { label: 'VWAP', value: levels.vwap, accent: true },
                  { label: 'GH', value: levels.globexHigh },
                  { label: 'GL', value: levels.globexLow },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                    <span className={`text-xs font-bold ${accent ? 'text-accent' : 'text-text-muted'}`}>{label}</span>
                    <span className={`font-headline font-bold text-sm font-tabular ${accent ? 'text-accent' : ''}`}>{formatPrice(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Cross-Market Context */}
            <div className="bg-surface-secondary p-5 rounded-lg border border-white/[0.04]">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[0.6875rem] font-black uppercase tracking-widest text-text-muted">Cross-Market</h3>
                <span className="material-symbols-outlined text-text-muted text-sm">sync_alt</span>
              </div>
              <div className="space-y-1">
                {crossMarket.map((market, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 bg-transparent hover:bg-white/[0.03] transition-colors rounded-sm px-2 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        market.trend === 'up' ? "bg-accent" : market.trend === 'down' ? "bg-[#ef5350]" : "bg-text-muted"
                      )}></span>
                      <span className="text-text-secondary font-semibold text-[11px] group-hover:text-white transition-colors">{market.asset}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "font-mono text-[10px]",
                        market.trend === 'up' ? "text-accent" : market.trend === 'down' ? "text-[#ef5350]" : "text-text-muted"
                      )}>{market.change}</span>
                      <span className={cn(
                        "material-symbols-outlined text-[14px]",
                        market.trend === 'up' ? "text-accent" : market.trend === 'down' ? "text-[#ef5350]" : "text-text-muted"
                      )}>
                        {market.trend === 'up' ? 'trending_up' : market.trend === 'down' ? 'trending_down' : 'horizontal_rule'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Session Pulse */}
            <div className="bg-surface-secondary p-5 rounded-lg border border-white/[0.04]">
              <div className="flex justify-between items-center mb-4 cursor-pointer group hover:bg-white/[0.03] p-1 rounded-sm transition-colors">
                <h3 className="text-text-muted text-[10px] tracking-[0.15em] font-black uppercase group-hover:text-white">Session Pulse</h3>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#8b9dff]"></span>
                  <span className="text-accent text-[9px] font-bold uppercase tracking-widest">Aligned</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {sessionPulse.map((pulse, idx) => (
                  <div key={idx} className="flex justify-between items-center cursor-pointer group hover:bg-white/[0.03] p-1.5 rounded-sm transition-colors">
                    <span className="text-text-secondary font-semibold text-[11px] group-hover:text-white">{pulse.session}</span>
                    <span className={cn(
                      "text-[9px] font-bold tracking-widest uppercase border rounded-sm px-2 py-0.5",
                      pulse.active
                        ? "text-accent border-accent/30 bg-accent/10"
                        : "text-text-muted border-white/10"
                    )}>{pulse.status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04]">
                <div className="bg-surface-card p-2 text-center rounded-sm">
                  <span className="block text-[9px] uppercase text-text-muted font-black">Alignment</span>
                  <span className="text-xs font-bold text-accent uppercase">FULL SYNC</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2: Catalyst Panel (Wide) */}
          <div className="bg-surface-secondary p-5 rounded-lg border border-white/[0.04] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined" style={{ fontSize: '6rem' }}>event_note</span>
            </div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-[0.6875rem] font-black uppercase tracking-widest text-text-muted mb-1">Catalyst Panel</h3>
                <p className="text-xs text-text-muted">High-impact events expected in next 24 hours</p>
              </div>
              <button className="text-[10px] font-black uppercase text-accent border border-accent/20 px-3 py-1 rounded-sm hover:bg-accent/10 transition-colors">Full Calendar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-surface-card p-3 border-l-2 border-error/50">
                <div className="bg-error/10 text-error p-2 flex flex-col items-center min-w-[50px]">
                  <span className="text-[10px] font-black uppercase">TUE</span>
                  <span className="text-lg font-black font-tabular">08:30</span>
                </div>
                <div>
                  <span className="text-xs font-black uppercase block tracking-tighter">CPI m/m Release</span>
                  <span className="text-[10px] text-error font-bold uppercase">HIGH IMPACT VOLATILITY</span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-surface-card p-3 border-l-2 border-accent/30">
                <div className="bg-accent/10 text-accent p-2 flex flex-col items-center min-w-[50px]">
                  <span className="text-[10px] font-black uppercase">TUE</span>
                  <span className="text-lg font-black font-tabular">10:00</span>
                </div>
                <div>
                  <span className="text-xs font-black uppercase block tracking-tighter">Fed Chair Testimony</span>
                  <span className="text-[10px] text-text-muted font-bold uppercase">MEDIUM IMPACT</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: TERMINAL EXECUTION BLOCK */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left: Pre-Execution Checklist & Notes */}
            <div className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04] space-y-5 flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(184,195,255,0.4)]" />
                <h3 className="text-xs font-black uppercase tracking-widest text-text-muted">Pre-Execution</h3>
              </div>
              <div className="space-y-4 pt-2">
                {[
                  'Context Alignment Validated',
                  'Setup Meets Minimum Grade',
                  'Risk Per Trade < 1.0%',
                  'Stop Loss Defined & Accepted'
                ].map(c => (
                  <div key={c} className="flex items-start gap-3 group">
                    <input type="checkbox" className="mt-0.5 rounded-sm border-white/20 bg-surface-elevated text-accent cursor-pointer focus:ring-accent focus:ring-offset-0 transition-colors" />
                    <span className="text-[11px] font-medium text-text-secondary leading-tight group-hover:text-white transition-colors cursor-pointer">{c}</span>
                  </div>
                ))}
              </div>
              <textarea
                className="w-full flex-1 min-h-[80px] mt-4 bg-surface-elevated border border-white/[0.06] rounded-sm p-3 text-xs font-mono text-text-primary focus:outline-none focus:border-accent/40 resize-none placeholder:text-text-muted transition-colors"
                placeholder="Tactical session notes..."
              />
            </div>

            {/* Center: Active Exposure & Data */}
            <div className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04] space-y-6 flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <h3 className="text-xs font-black uppercase tracking-widest text-text-muted">Active Exposure</h3>
                <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm text-text-muted font-mono uppercase font-bold tracking-widest">FLAT</span>
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-center opacity-30 z-10 transition-opacity hover:opacity-100">
                <span className="material-symbols-outlined text-[48px] mb-4">monitoring</span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">No Active Positions</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/[0.04] pt-5 z-10">
                <div>
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block mb-1">Realized PNL</span>
                  <span className="text-[15px] font-black font-mono text-text-primary">$0.00</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block mb-1">Session Vol</span>
                  <span className="text-[15px] font-black font-mono text-text-primary">0 LOTS</span>
                </div>
              </div>

              {/* Decorative grid background */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>

            {/* Right: Order Entry Terminal */}
            <div className="bg-[#14151a] p-6 rounded-sm border border-white/[0.06] flex flex-col justify-between relative shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-20 xl:-mr-4 xl:scale-[1.02] transition-transform">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-white">Order Entry</h3>
                <div className="flex gap-1 bg-white/[0.03] rounded-sm p-1 border border-white/[0.05]">
                  <button className="bg-white/10 text-white text-[9px] font-bold uppercase py-1 px-3 rounded-sm shadow-sm">LMT</button>
                  <button className="text-text-muted hover:text-white text-[9px] font-bold uppercase py-1 px-3 rounded-sm transition-colors">MKT</button>
                  <button className="text-text-muted hover:text-white text-[9px] font-bold uppercase py-1 px-3 rounded-sm transition-colors">STP</button>
                </div>
              </div>

              <div className="space-y-5 mb-8">
                {/* Price */}
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-widest text-text-muted mb-1.5 block">Entry Price</label>
                  <div className="relative group">
                    <input type="text" className="w-full h-11 px-3 bg-white/[0.02] border border-white/5 rounded-sm text-sm font-bold font-mono text-right text-white focus:border-accent/50 outline-none transition-colors" defaultValue="5120.50" />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted font-bold font-mono uppercase">USD</span>
                  </div>
                </div>
                {/* Quantity */}
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Quantity</label>
                    <span className="text-[9px] text-text-muted font-mono font-bold">Max: 10 Lots</span>
                  </div>
                  <input type="text" className="w-full h-11 px-3 bg-white/[0.02] border border-white/5 rounded-sm text-sm font-bold font-mono text-right text-white focus:border-accent/50 outline-none mb-3 transition-colors" defaultValue="2" />
                  
                  <div className="flex gap-2">
                    {['25%', '50%', '75%', 'MAX'].map(pct => (
                      <button key={pct} className="flex-1 py-1.5 bg-white/[0.03] hover:bg-white/10 text-text-muted hover:text-white border border-white/5 hover:border-white/20 text-[9px] font-black uppercase tracking-wider rounded-sm transition-all active:scale-95">{pct}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button className="h-16 group bg-[#26a69a]/10 hover:bg-[#26a69a]/20 border border-[#26a69a]/30 hover:border-[#26a69a]/50 text-[#26a69a] hover:text-[#4db6ac] font-black text-sm uppercase tracking-widest rounded-sm transition-all flex items-center justify-center shadow-[0_0_20px_rgba(38,166,154,0.05)] hover:shadow-[0_0_30px_rgba(38,166,154,0.15)] active:scale-95">
                  BUY LMT
                </button>
                <button className="h-16 group bg-[#ef5350]/10 hover:bg-[#ef5350]/20 border border-[#ef5350]/30 hover:border-[#ef5350]/50 text-[#ef5350] hover:text-[#e57373] font-black text-sm uppercase tracking-widest rounded-sm transition-all flex items-center justify-center shadow-[0_0_20px_rgba(239,83,80,0.05)] hover:shadow-[0_0_30px_rgba(239,83,80,0.15)] active:scale-95">
                  SELL LMT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ──── RIGHT UTILITY PANEL (col-span-3) ──── */}
        <aside className="hidden xl:flex col-span-3 flex-col gap-6">
          {/* Chart Snapshot */}
          <div className="bg-surface-card p-4 rounded-lg aspect-square relative group overflow-hidden border border-white/[0.04]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <div className="flex justify-between items-start relative z-10 mb-4">
              <div>
                <h4 className="font-headline text-xs font-bold">ES1! 1H</h4>
                <p className="text-[10px] text-accent font-tabular">4894.25 (+0.12%)</p>
              </div>
              <span className="material-symbols-outlined text-text-muted text-sm cursor-pointer hover:text-text-primary">open_in_full</span>
            </div>
            {/* Mock Chart */}
            <div className="w-full h-48 flex items-end gap-1 px-2 relative">
              {[50, 66, 75, 83, 100, 90, 75].map((h, i) => (
                <div key={i} className={`flex-1 rounded-t-sm ${i >= 3 && i <= 5 ? 'bg-accent' : 'bg-surface-elevated'}`} style={{ height: `${h}%`, opacity: i >= 3 ? 0.4 + (i - 3) * 0.2 : 1 }} />
              ))}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-surface-card/60 backdrop-blur-sm">
                <button className="px-4 py-2 border border-accent/40 rounded-sm text-[10px] font-bold uppercase tracking-widest text-accent">Open Terminal</button>
              </div>
            </div>
          </div>

          {/* Bias Breakdown */}
          <div className="bg-surface-card p-6 rounded-lg border border-white/[0.04]">
            <h3 className="text-text-muted text-[10px] tracking-[0.15em] font-black uppercase mb-6">Bias Vectors</h3>
            <div className="flex flex-col gap-5">
              <div className="cursor-pointer group">
                <div className="flex justify-between text-[10px] mb-2">
                  <span className="text-white font-bold tracking-widest uppercase group-hover:text-accent transition-colors">Trend Alignment</span>
                  <span className="font-mono font-bold text-white group-hover:text-accent transition-colors">92%</span>
                </div>
                <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
                  <div className="h-full bg-white group-hover:bg-accent transition-colors w-[92%]"></div>
                </div>
              </div>
              <div className="cursor-pointer group">
                <div className="flex justify-between text-[10px] mb-2">
                  <span className="text-white font-bold tracking-widest uppercase group-hover:text-accent transition-colors">Volume Profile</span>
                  <span className="font-mono font-bold text-white group-hover:text-accent transition-colors">78%</span>
                </div>
                <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
                  <div className="h-full bg-white group-hover:bg-accent transition-colors w-[78%]"></div>
                </div>
              </div>
              <div className="cursor-pointer group">
                <div className="flex justify-between text-[10px] mb-2">
                  <span className="text-white font-bold tracking-widest uppercase group-hover:text-accent transition-colors">Orderflow Delta</span>
                  <span className="font-mono font-bold text-white group-hover:text-accent transition-colors">54%</span>
                </div>
                <div className="h-1.5 bg-surface-primary rounded-full overflow-hidden">
                  <div className="h-full bg-white/40 group-hover:bg-accent transition-colors w-[54%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Execution Presets */}
          <div className="bg-surface-card p-6 rounded-lg border border-white/[0.04]">
            <h3 className="text-text-muted text-[10px] tracking-[0.15em] font-black uppercase mb-4">Execution Presets</h3>
            <div className="border border-accent/20 bg-accent/5 rounded-sm p-4 cursor-pointer hover:bg-accent/10 hover:border-accent/40 transition-colors group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white font-bold text-[11px] group-hover:text-accent transition-colors">Standard</span>
                <span className="material-symbols-outlined text-accent text-[16px]">check_circle</span>
              </div>
              <span className="text-text-muted text-[9px] group-hover:text-text-secondary transition-colors">Risk 1.0% | Risk/Reward 1:2</span>
            </div>
          </div>

          {/* Live Signal */}
          <div className="mt-auto bg-surface-card-hover p-4 border border-accent/20 shadow-xl shadow-black/40 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="animate-pulse w-2 h-2 rounded-full bg-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Live Signal</span>
            </div>
            <p className="text-[11px] font-bold mb-3 italic leading-relaxed">&quot;Volume spike detected on 1m ES. Divergence emerging at 4515 resistance.&quot;</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-accent text-on-accent text-[10px] font-black uppercase py-2 rounded-sm hover:brightness-110 transition-all active:scale-95">Trade</button>
              <button className="bg-surface-card px-3 text-text-muted hover:text-text-primary transition-colors rounded-sm">
                <span className="material-symbols-outlined text-sm">reviews</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
      <TradeReadinessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
