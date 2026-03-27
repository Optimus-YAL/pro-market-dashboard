'use client';

import { SAMPLE_PRESETS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function PresetsPage() {
  const [activeId, setActiveId] = useState('1');
  const presets = SAMPLE_PRESETS;
  const active = presets.find(p => p.id === activeId)!;

  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tighter text-text-primary font-headline uppercase">Presets</h2>
          <div className="h-4 w-px bg-white/[0.06]" />
          <span className="text-text-muted text-xs uppercase tracking-widest">Watchlist Engine</span>
        </div>
        <button className="flex items-center gap-2 bg-accent text-on-accent px-6 py-2 rounded-sm font-black uppercase text-xs tracking-[0.15em] hover:brightness-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-base">add</span>
          New Preset
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Preset List */}
        <div className="lg:col-span-4 space-y-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setActiveId(preset.id)}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 rounded-sm border text-left transition-all',
                preset.id === activeId
                  ? 'bg-accent/10 border-accent/30 text-accent'
                  : 'bg-surface-secondary border-white/[0.04] text-text-secondary hover:bg-surface-elevated'
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn('material-symbols-outlined text-lg', preset.id === activeId ? 'text-accent' : 'text-text-muted')}>layers</span>
                <div>
                  <p className="text-sm font-bold">{preset.label}</p>
                  <p className="text-[10px] text-text-muted">{preset.markets.length} markets</p>
                </div>
              </div>
              {preset.isDefault && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-bullish bg-bullish/10 px-2 py-0.5 rounded-sm">Default</span>
              )}
            </button>
          ))}
        </div>

        {/* Preset Editor */}
        <div className="lg:col-span-8">
          <section className="bg-surface-secondary rounded-sm border border-white/[0.04]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-lg">edit</span>
                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Editing: {active.label}</h3>
              </div>
              <button className="flex items-center gap-2 bg-accent text-on-accent px-4 py-1.5 rounded-sm font-bold uppercase text-[10px] tracking-wider hover:brightness-110 transition-all">
                <span className="material-symbols-outlined text-sm">save</span>
                Save
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Preset Name</label>
                <input
                  key={active.id + '-name'}
                  defaultValue={active.label}
                  className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Markets</label>
                <p className="text-[10px] text-text-muted/60 mb-1">Comma-separated market codes</p>
                <input
                  key={active.id + '-markets'}
                  defaultValue={active.markets.join(', ')}
                  className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Panel Order</label>
                <p className="text-[10px] text-text-muted/60 mb-1">Comma-separated panel names</p>
                <input
                  key={active.id + '-panels'}
                  defaultValue={active.panelOrder.join(', ')}
                  className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none"
                />
              </div>

              {/* Focus & Caution Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-sm bg-accent/5 border border-accent/15">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-accent text-base">center_focus_strong</span>
                    <label className="text-[10px] font-bold text-accent uppercase tracking-widest">Focus Note</label>
                  </div>
                  <textarea
                    key={active.id + '-focus'}
                    rows={2}
                    defaultValue={active.focusNote}
                    placeholder="Key focus for this preset..."
                    className="w-full p-3 bg-surface-elevated border-none rounded-sm resize-none text-xs text-text-primary focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>
                <div className="p-4 rounded-sm bg-caution/5 border border-caution/15">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-caution text-base">warning</span>
                    <label className="text-[10px] font-bold text-caution uppercase tracking-widest">Caution Note</label>
                  </div>
                  <textarea
                    key={active.id + '-caution'}
                    rows={2}
                    defaultValue={active.cautionNote}
                    placeholder="Risk warnings for this preset..."
                    className="w-full p-3 bg-surface-elevated border-none rounded-sm resize-none text-xs text-text-primary focus:ring-1 focus:ring-accent outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-white/[0.06] rounded-sm text-text-secondary hover:bg-surface-elevated transition-colors">
                  <span className="material-symbols-outlined text-base">star</span>
                  Set as Default
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-error/80 hover:text-error hover:bg-error/5 rounded-sm transition-colors">
                  <span className="material-symbols-outlined text-base">delete</span>
                  Delete
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
