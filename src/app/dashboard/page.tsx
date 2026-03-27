'use client';

import { useState } from 'react';
import { SAMPLE_KEY_LEVELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { TradeReadinessModal } from '@/components/dashboard/TradeReadinessModal';

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const levels = SAMPLE_KEY_LEVELS;

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
              <div className="space-y-3">
                {[
                  { name: 'Nasdaq (NQ)', pct: '+1.24%', dir: 'up' },
                  { name: 'US Dollar (DXY)', pct: '-0.15%', dir: 'down' },
                  { name: 'Gold (GC)', pct: 'FLAT', dir: 'flat' },
                  { name: '10Y Yield (TNX)', pct: '+0.04', dir: 'up' },
                ].map((m) => (
                  <div key={m.name} className={`flex items-center justify-between ${m.dir === 'flat' ? 'opacity-60' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${m.dir === 'up' ? 'bg-accent shadow-[0_0_6px_rgba(184,195,255,0.4)]' : m.dir === 'down' ? 'bg-error shadow-[0_0_6px_rgba(238,125,119,0.4)]' : 'bg-text-muted'}`} />
                      <span className="text-xs font-medium">{m.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase ${m.dir === 'up' ? 'text-accent' : m.dir === 'down' ? 'text-error' : 'text-text-muted'}`}>{m.pct}</span>
                      <span className={`material-symbols-outlined text-sm ${m.dir === 'up' ? 'text-accent' : m.dir === 'down' ? 'text-error' : 'text-text-muted'}`}>
                        {m.dir === 'up' ? 'trending_up' : m.dir === 'down' ? 'trending_down' : 'horizontal_rule'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Session Pulse */}
            <div className="bg-surface-secondary p-5 rounded-lg border border-white/[0.04]">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[0.6875rem] font-black uppercase tracking-widest text-text-muted">Session Pulse</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(184,195,255,0.4)]" />
                  <span className="text-[10px] text-accent uppercase font-bold">Aligned</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { zone: 'Tokyo Session', status: 'CONSOLIDATED', highlight: false },
                  { zone: 'London Session', status: 'TRENDING-LONG', highlight: true },
                  { zone: 'Globex', status: 'BULLISH BREAKOUT', highlight: true },
                ].map((s) => (
                  <div key={s.zone} className="flex justify-between items-center">
                    <span className="text-xs font-bold">{s.zone}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${s.highlight ? 'bg-accent/10 text-accent' : 'bg-white/[0.04] text-text-muted'}`}>
                      {s.status}
                    </span>
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

          {/* ROW 3: Execution Workflow */}
          <div className="bg-surface-secondary p-6 rounded-lg border border-white/[0.04]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline text-sm font-bold text-text-muted uppercase tracking-widest">Execution Workflow</h3>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-accent text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-[10px] font-bold text-accent uppercase">Strategy Validated</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-10 px-4">
              {['Context', 'Structure', 'Bias', 'Plan', 'Ready'].map((label, i) => {
                const isCompleted = i < 3;
                const isLast = i === 4;
                return (
                  <div key={label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-accent text-accent bg-accent/10' : 'border-white/10 text-text-muted opacity-40'}`}>
                        <span className="material-symbols-outlined text-xl">
                          {i === 0 ? 'dataset' : i === 1 ? 'layers' : i === 2 ? 'analytics' : i === 3 ? 'edit_note' : 'play_arrow'}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-accent' : ''}`}>{label}</span>
                    </div>
                    {!isLast && (
                      <div className={`h-px flex-1 mx-4 ${i < 2 ? 'bg-accent/30' : 'bg-white/[0.06]'}`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/[0.04] pt-6">
              <div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-3">Primary Setup: Long</span>
                <p className="text-xs text-text-primary leading-relaxed">
                  Look for reaction at <span className="font-bold text-accent">{formatPrice(levels.vwap)} (VWAP)</span> during NY Open. Confirmation requires 5m value area shift and delta divergence. Target <span className="font-bold">{formatPrice(levels.pdh)}</span> (PDH).
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-error uppercase tracking-widest block mb-3">Risk Scenario: Short</span>
                <p className="text-xs text-text-primary leading-relaxed">
                  If VWAP fails to hold on retest, monitor for aggressive sell-side imbalance toward <span className="font-bold">{formatPrice(levels.globexLow)}</span>. Neutralize bias if price sustains below IB Low.
                </p>
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
            <h3 className="font-headline text-xs font-bold text-text-muted uppercase tracking-widest mb-6">Bias Vectors</h3>
            <div className="space-y-5">
              {[
                { label: 'Trend Alignment', pct: 92, color: 'bg-accent' },
                { label: 'Volume Profile', pct: 78, color: 'bg-accent' },
                { label: 'Orderflow Delta', pct: 54, color: 'bg-text-muted' },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                    <span>{label}</span>
                    <span className={pct > 70 ? 'text-accent' : 'text-text-muted'}>{pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-elevated rounded-full">
                    <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Presets */}
          <div className="bg-surface-card p-6 rounded-lg border border-white/[0.04]">
            <h3 className="font-headline text-xs font-bold text-text-muted uppercase tracking-widest mb-5">Active Presets</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Scaling Long', desc: 'Risk 0.5% | 3 Profit Targets', icon: 'rocket_launch', active: true },
                { name: 'Standard Breakout', desc: 'Risk 1.0% | Fixed R:R 1:2', icon: 'bolt', active: false },
                { name: 'Mean Reversion', desc: 'Contrarian | ATR Based Stop', icon: 'settings_backup_restore', active: false },
              ].map(({ name, desc, icon, active }) => (
                <div key={name} className={`p-4 rounded-sm cursor-pointer transition-colors ${active ? 'bg-surface-elevated/60 border-l-2 border-accent' : 'bg-surface-elevated/20 hover:bg-surface-elevated/40 border-l-2 border-transparent'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold">{name}</span>
                    <span className={`material-symbols-outlined text-sm ${active ? 'text-accent' : 'text-text-muted'}`}>{icon}</span>
                  </div>
                  <p className="text-[10px] text-text-muted">{desc}</p>
                </div>
              ))}
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
