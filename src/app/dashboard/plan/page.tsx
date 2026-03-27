'use client';

import { useState } from 'react';

export default function TradePlanPage() {
  const [quality, setQuality] = useState('A+');
  const [activePreset, setActivePreset] = useState('Trend Following');
  const [bias, setBias] = useState('Bullish');

  return (
    <div className="animate-fade-in-up pb-24 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tighter text-text-primary font-headline uppercase">Trade Plan</h2>
          <div className="h-4 w-px bg-white/[0.06]" />
          <span className="text-text-muted text-xs font-mono uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
        </div>
      </header>

      {/* TOP: Bias, Active preset, Focus note */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">Daily Bias</h3>
          <select 
            value={bias}
            onChange={(e) => setBias(e.target.value)}
            className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono focus:ring-1 focus:ring-accent outline-none"
            style={{ color: bias === 'Bullish' ? 'var(--color-bullish)' : bias === 'Bearish' ? 'var(--color-error)' : 'var(--color-text-primary)' }}
          >
            <option value="Bullish">Bullish</option>
            <option value="Bearish">Bearish</option>
            <option value="Neutral">Neutral</option>
          </select>
        </section>

        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">Active Preset</h3>
          <select 
            value={activePreset}
            onChange={(e) => setActivePreset(e.target.value)}
            className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none"
          >
            <option value="Trend Following">Trend Following</option>
            <option value="Mean Reversion">Mean Reversion</option>
            <option value="Breakout">Breakout</option>
          </select>
        </section>

        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">Focus Note</h3>
          <input 
            type="text" 
            placeholder="Main conceptual focus / reminder..."
            className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none" 
          />
        </section>
      </div>

      {/* SPLIT LAYOUT: Left (Long), Right (Short) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Long Scenario */}
        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04] border-t-2 border-t-bullish">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-bullish text-lg">trending_up</span>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-bullish">Long Scenario</h3>
          </div>
          
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Trigger Condition</label>
              <textarea 
                className="w-full min-h-[60px] p-3 bg-surface-elevated border-none rounded-sm resize-none text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none leading-relaxed" 
                placeholder="What precise action triggers the trade?" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Entry Zone</label>
                <input type="text" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none" placeholder="e.g. 5120.50 - 5122.00" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Stop Zone</label>
                <input type="text" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none" placeholder="e.g. Below 5118" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Target Zone</label>
              <input type="text" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none" placeholder="e.g. 5135 (PDH)" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Invalidation</label>
              <textarea 
                className="w-full min-h-[60px] p-3 bg-surface-elevated border-none rounded-sm resize-none text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none leading-relaxed" 
                placeholder="This setup is invalid if..." 
              />
            </div>
          </div>
        </section>

        {/* Short Scenario */}
        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04] border-t-2 border-t-error">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-error text-lg">trending_down</span>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-error">Short Scenario</h3>
          </div>
          
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Trigger Condition</label>
              <textarea 
                className="w-full min-h-[60px] p-3 bg-surface-elevated border-none rounded-sm resize-none text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none leading-relaxed" 
                placeholder="What precise action triggers the trade?" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Entry Zone</label>
                <input type="text" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none" placeholder="e.g. 5140.00 - 5142.50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Stop Zone</label>
                <input type="text" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none" placeholder="e.g. Above 5145" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Target Zone</label>
              <input type="text" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none" placeholder="e.g. 5120 (PDL)" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Invalidation</label>
              <textarea 
                className="w-full min-h-[60px] p-3 bg-surface-elevated border-none rounded-sm resize-none text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none leading-relaxed" 
                placeholder="This setup is invalid if..." 
              />
            </div>
          </div>
        </section>
      </div>

      {/* BOTTOM: Quality & Summary */}
      <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              Setup Quality
            </h3>
            <div className="flex gap-2">
              {['A+', 'B', 'No Trade'].map(q => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`flex-1 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest border transition-all ${
                    quality === q 
                      ? (q === 'A+' ? 'bg-bullish/10 border-bullish/50 text-bullish' : q === 'B' ? 'bg-accent/10 border-accent/50 text-accent' : 'bg-surface-elevated border-white/20 text-text-muted') 
                      : 'border-white/[0.04] bg-surface-elevated hover:bg-white/5 text-text-muted'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">edit_note</span>
              Final Plan Summary
            </h3>
            <input 
              type="text" 
              className="w-full h-11 px-4 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none" 
              placeholder="Summarize the core plan in one clear sentence..." 
            />
          </div>
        </div>
      </section>

      {/* Fixed Action Footer */}
      <footer className="fixed bottom-0 left-16 right-0 flex justify-center items-center px-12 py-3 bg-accent-container/80 backdrop-blur-md z-50 h-16 shadow-[0_-24px_48px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8 max-w-7xl w-full justify-between">
          <button className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-text-primary hover:bg-white/5 transition-colors">← Back to Prep</button>
          
          <button className="flex items-center gap-2 bg-accent text-on-accent px-10 py-2.5 rounded-sm font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-base">save</span>
            Save Plan
          </button>
          
          <button className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-text-primary hover:bg-white/5 transition-colors">Continue to Journal →</button>
        </div>
      </footer>
    </div>
  );
}
