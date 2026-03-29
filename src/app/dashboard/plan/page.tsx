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

      {/* BOTTOM: Quality, Validation & Commit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Quality & Risk Toggle */}
        <section className="bg-surface-secondary p-8 rounded-sm border border-white/[0.04] flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Setup Quality</h3>
            <div className="flex gap-4">
              {['A', 'B', 'C'].map(q => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`flex-1 aspect-square max-h-24 flex items-center justify-center rounded-sm text-2xl font-black transition-all hover:-translate-y-1 ${
                    quality === q 
                      ? 'bg-primary text-white shadow-[0_8px_32px_rgba(110,153,255,0.2)]' 
                      : 'bg-[#14151a] border border-white/[0.03] text-text-muted hover:text-white hover:bg-[#1a1c23]'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-4 mt-8 pt-8 border-t border-white/[0.04]">
            <input 
              type="checkbox" 
              id="risk-verify"
              className="mt-1 w-4 h-4 rounded-sm border-white/10 bg-surface-elevated text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer" 
            />
            <label htmlFor="risk-verify" className="text-sm text-text-secondary leading-relaxed cursor-pointer select-none">
              <span className="text-white font-bold block mb-1">Risk Management Verification</span>
              I verify all scenarios align with the core risk management framework and maximum capital constraints map perfectly to my stop placement.
            </label>
          </div>
        </section>

        {/* Right: Summary & Action Axis */}
        <section className="flex flex-col gap-6">
          <div className="bg-surface-secondary p-8 rounded-sm border border-white/[0.04] flex-1 flex flex-col">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">Final Plan Summary</h3>
            <textarea 
              className="w-full flex-1 min-h-[120px] p-4 bg-surface-elevated border-none rounded-sm resize-none text-sm text-text-primary focus:ring-1 focus:ring-primary outline-none leading-relaxed" 
              placeholder="Synthesize the execution flow. What are we doing, and precisely when?" 
            />
          </div>

          <button className="h-20 w-full bg-[#6e99ff] hover:bg-[#5b8cff] text-[#0a0f1c] font-black text-lg uppercase tracking-[0.2em] rounded-sm transition-all active:scale-[0.99] flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(110,153,255,0.15)] group">
            COMMIT TO PLAN
            <span className="material-symbols-outlined text-[24px] group-hover:animate-pulse">bolt</span>
          </button>
        </section>
      </div>
    </div>
  );
}
