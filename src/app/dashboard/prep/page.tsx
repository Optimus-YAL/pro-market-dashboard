'use client';

import { SAMPLE_KEY_LEVELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

export default function DailyPrepPage() {
  const [saved, setSaved] = useState(false);
  const levels = SAMPLE_KEY_LEVELS;

  return (
    <div className="animate-fade-in-up pb-24">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tighter text-text-primary font-headline uppercase">Pre-Market Preparation</h2>
          <div className="h-4 w-px bg-white/[0.06]" />
          <div className="flex items-center gap-6">
            <span className="font-headline tracking-wide uppercase text-sm font-bold text-accent border-b-2 border-accent pb-1 cursor-pointer">Markets</span>
            <span className="font-headline tracking-wide uppercase text-sm font-bold text-text-muted hover:text-text-primary cursor-pointer transition-colors">Orders</span>
            <span className="font-headline tracking-wide uppercase text-sm font-bold text-text-muted hover:text-text-primary cursor-pointer transition-colors">Portfolio</span>
          </div>
        </div>
      </header>

      {/* Main Grid: 4-col left / 8-col right */}
      <div className="grid grid-cols-12 gap-6">
        {/* ──── LEFT COLUMN (4 cols): Context + Summary ──── */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* 01 Contextual Regime */}
          <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent text-lg">analytics</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">01 Contextual Regime</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase font-bold text-text-muted mb-1.5 tracking-wider">Market Regime</label>
                <select className="w-full h-10 px-3 rounded-sm bg-surface-elevated border-none text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none">
                  <option>Trending</option>
                  <option>Ranging</option>
                  <option>Volatile</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-text-muted mb-1.5 tracking-wider">Macro Environment</label>
                <select className="w-full h-10 px-3 rounded-sm bg-surface-elevated border-none text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none">
                  <option>Risk-On</option>
                  <option>Risk-Off</option>
                  <option>Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-text-muted mb-1.5 tracking-wider">Preset Strategy</label>
                <div className="flex gap-px bg-white/[0.04] p-1 rounded-sm">
                  <button className="flex-1 py-1.5 text-[10px] font-bold uppercase bg-surface-elevated text-accent border border-accent/20 rounded-sm">Scalp</button>
                  <button className="flex-1 py-1.5 text-[10px] font-bold uppercase text-text-muted hover:bg-surface-elevated transition-colors rounded-sm">Intraday</button>
                  <button className="flex-1 py-1.5 text-[10px] font-bold uppercase text-text-muted hover:bg-surface-elevated transition-colors rounded-sm">Swing</button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-text-muted tracking-wider">Event Risk</label>
                  <p className="text-[10px] text-text-muted/60">Tier-1 Data Pending</p>
                </div>
                <div className="relative inline-flex h-5 w-10 cursor-pointer items-center rounded-full bg-surface-elevated">
                  <span className="absolute left-0.5 inline-block h-4 w-4 rounded-full bg-error shadow transition-transform" />
                </div>
              </div>
            </div>
          </section>

          {/* 04 Executive Summary */}
          <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04] border-t-2 border-t-accent-container">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent text-lg">summarize</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">04 Executive Summary</h3>
            </div>
            <div className="space-y-8">
              <div className="text-center py-4 bg-surface-elevated rounded-sm">
                <label className="block text-[10px] uppercase font-bold text-text-muted mb-2 tracking-widest">Aggregate Bias Score</label>
                <div className="text-5xl font-black text-text-primary tracking-tighter font-headline">
                  7.4<span className="text-lg text-text-muted font-medium ml-1">/10</span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] uppercase font-bold text-text-muted tracking-wider">Execution Status</label>
                <div className="flex items-center justify-between bg-bullish-bg border border-bullish/20 p-4 rounded-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-bullish animate-pulse" />
                    <span className="text-sm font-bold uppercase text-bullish tracking-widest">Active Long</span>
                  </div>
                  <span className="material-symbols-outlined text-bullish" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ──── RIGHT COLUMN (8 cols): Key Levels + Cross-Market ──── */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* 02 Key Tactical Levels */}
          <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-lg">layers</span>
                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">02 Key Tactical Levels</h3>
              </div>
              <span className="text-[10px] text-text-muted font-mono uppercase">Updated: 08:31 EST</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'PDH', value: formatPrice(levels.pdh), tag: 'Active', tagColor: 'text-bullish' },
                { label: 'PDL', value: formatPrice(levels.pdl), tag: 'Support', tagColor: 'text-error' },
                { label: 'PC', value: formatPrice(levels.pc), tag: 'Neutral', tagColor: 'text-text-muted' },
                { label: 'VWAP', value: formatPrice(levels.vwap), tag: 'Dynamic', tagColor: 'text-accent' },
                { label: 'Session High', value: '', placeholder: 'Pending' },
                { label: 'Session Bottom', value: '', placeholder: 'Pending' },
                { label: 'Globex High', value: formatPrice(levels.globexHigh) },
                { label: 'Globex Low', value: formatPrice(levels.globexLow) },
              ].map((level) => (
                <div key={level.label} className="space-y-1.5">
                  <label className="flex justify-between items-center text-[10px] uppercase font-bold text-text-muted px-1">
                    <span>{level.label}</span>
                    {level.tag && <span className={`text-[9px] font-normal ${level.tagColor}`}>{level.tag}</span>}
                  </label>
                  <input
                    className="w-full h-11 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono tracking-tight text-text-primary focus:ring-1 focus:ring-accent outline-none"
                    type="text"
                    defaultValue={level.value}
                    placeholder={level.placeholder}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 03 Cross-Asset Correlation */}
          <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-accent text-lg">compare_arrows</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">03 Cross-Asset Correlation</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Direction Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { ticker: 'ES', dir: 'up', icon: 'arrow_upward', color: 'border-bullish text-bullish' },
                  { ticker: 'NQ', dir: 'up', icon: 'arrow_upward', color: 'border-bullish text-bullish' },
                  { ticker: 'DXY', dir: 'flat', icon: 'horizontal_rule', color: 'border-text-muted text-text-muted' },
                  { ticker: 'GC', dir: 'down', icon: 'arrow_downward', color: 'border-error text-error' },
                  { ticker: '10Y', dir: 'up', icon: 'arrow_upward', color: 'border-bullish text-bullish' },
                  { ticker: 'CL', dir: 'flat', icon: 'horizontal_rule', color: 'border-text-muted text-text-muted' },
                ].map((m) => (
                  <div key={m.ticker} className={`flex items-center justify-between p-3 bg-surface-elevated rounded-sm border-l-2 ${m.color.split(' ')[0]}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-primary">{m.ticker}</span>
                    <span className={`material-symbols-outlined text-lg ${m.color.split(' ')[1]}`}>{m.icon}</span>
                  </div>
                ))}
              </div>

              {/* Correlation Notes */}
              <div className="flex flex-col">
                <label className="block text-[10px] uppercase font-bold text-text-muted mb-2 tracking-wider">Correlation Notes</label>
                <textarea
                  className="flex-1 min-h-[140px] p-4 bg-surface-elevated border-none rounded-sm resize-none text-xs leading-relaxed text-text-primary focus:ring-1 focus:ring-accent outline-none"
                  placeholder="Market divergence observed in NQ/ES. Yield curve steepening continues to put pressure on tech..."
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ──── FIXED ACTION FOOTER ──── */}
      <footer className="fixed bottom-0 left-16 right-0 flex justify-center items-center gap-8 px-12 py-3 bg-accent-container/80 backdrop-blur-md z-50 h-16 shadow-[0_-24px_48px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8 max-w-7xl w-full justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-text-primary px-6 py-2 hover:bg-white/10 transition-colors rounded-sm">
              <span className="material-symbols-outlined text-lg">arrow_upward</span>
              <span className="font-bold text-xs uppercase tracking-widest">Buy LMT</span>
            </button>
            <button className="flex items-center gap-2 text-text-primary px-6 py-2 hover:bg-white/10 transition-colors rounded-sm">
              <span className="material-symbols-outlined text-lg">arrow_downward</span>
              <span className="font-bold text-xs uppercase tracking-widest">Sell LMT</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-text-primary hover:bg-white/5 transition-colors">Continue to Plan</button>
            <button
              onClick={() => setSaved(true)}
              className="flex items-center gap-2 bg-accent text-on-accent px-8 py-2.5 rounded-sm font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-base">save</span>
              {saved ? 'Saved!' : 'Save Prep'}
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-text-primary px-6 py-2 hover:bg-white/10 transition-colors rounded-sm">
              <span className="material-symbols-outlined text-lg">close_fullscreen</span>
              <span className="font-bold text-xs uppercase tracking-widest">Cancel All</span>
            </button>
            <button className="flex items-center gap-2 text-text-primary px-6 py-2 hover:bg-white/10 transition-colors rounded-sm">
              <span className="material-symbols-outlined text-lg">layers_clear</span>
              <span className="font-bold text-xs uppercase tracking-widest">Flatten</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
