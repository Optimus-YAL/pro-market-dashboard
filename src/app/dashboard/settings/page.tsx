'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in-up max-w-4xl">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tighter text-text-primary font-headline uppercase">Settings</h2>
          <div className="h-4 w-px bg-white/[0.06]" />
          <span className="text-text-muted text-xs uppercase tracking-widest">Configuration</span>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-accent text-on-accent px-6 py-2 rounded-sm font-black uppercase text-xs tracking-[0.15em] hover:brightness-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-base">{saved ? 'check' : 'save'}</span>
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </header>

      <div className="space-y-6">
        {/* Profile */}
        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-accent text-lg">person</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Profile</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Name</label>
              <input
                defaultValue="Trader"
                className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Email</label>
              <input
                type="email"
                defaultValue="trader@promarket.io"
                className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-accent text-lg">palette</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Appearance</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Theme</label>
              <select className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none">
                <option value="dark">Dark (Obsidian)</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Accent Color</label>
              <select className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none">
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
              </select>
            </div>
          </div>
        </section>

        {/* Timezone */}
        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-accent text-lg">schedule</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Timezone</h3>
          </div>
          <div className="space-y-1 max-w-md">
            <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Timezone</label>
            <select className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none">
              <option value="America/New_York">Eastern (ET)</option>
              <option value="America/Chicago">Central (CT)</option>
              <option value="America/Denver">Mountain (MT)</option>
              <option value="America/Los_Angeles">Pacific (PT)</option>
              <option value="Europe/London">London (GMT)</option>
            </select>
          </div>
        </section>

        {/* Risk Control */}
        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04] border-l-2 border-l-error">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-error text-lg">shield</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-error">Risk Control</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Max Trades/Day</label>
              <input
                type="number"
                defaultValue={3}
                min={1}
                max={10}
                className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Max Daily Loss ($)</label>
              <input
                type="number"
                defaultValue={1500}
                className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Lock After Losses</label>
              <input
                type="number"
                defaultValue={2}
                min={1}
                max={5}
                className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none"
              />
            </div>
          </div>
        </section>

        {/* Preferred Markets */}
        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-accent text-lg">public</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Preferred Markets</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['ES', 'NQ', 'DXY', 'Gold', '10Y Yield', 'Crude Oil'].map((market) => (
              <label key={market} className="flex items-center gap-2 px-3 py-2 rounded-sm bg-surface-elevated border border-white/[0.04] cursor-pointer hover:border-accent/30 transition-colors">
                <input type="checkbox" defaultChecked className="accent-[var(--accent)] w-3.5 h-3.5" />
                <span className="text-xs font-semibold text-text-secondary">{market}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Data */}
        <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-symbols-outlined text-accent text-lg">database</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Data</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Data Mode</label>
              <select className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none">
                <option value="manual">Manual Entry</option>
                <option value="api">API Feed</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Default Preset</label>
              <select className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none">
                <option value="default">Default</option>
                <option value="risk-on">Risk-On</option>
                <option value="risk-off">Risk-Off</option>
                <option value="trend">Trend Day</option>
                <option value="range">Range Day</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
