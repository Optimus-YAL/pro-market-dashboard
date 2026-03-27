'use client';

import { SAMPLE_JOURNAL_ENTRIES } from '@/lib/constants';
import { formatPrice, formatPnL, cn } from '@/lib/utils';
import { useState } from 'react';

export default function JournalPage() {
  const [showAdd, setShowAdd] = useState(false);
  const entries = SAMPLE_JOURNAL_ENTRIES;
  const totalPnL = entries.reduce((sum, e) => sum + (e.pnl || 0), 0);
  const wins = entries.filter(e => (e.pnl || 0) > 0).length;
  const winRate = Math.round((wins / entries.length) * 100);

  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tighter text-text-primary font-headline uppercase">Trade Journal</h2>
          <div className="h-4 w-px bg-white/[0.06]" />
          <span className="text-text-muted text-xs uppercase tracking-widest">{entries.length} Entries</span>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-text-secondary border border-white/[0.06] rounded-sm hover:bg-surface-elevated transition-colors">
            <span className="material-symbols-outlined text-base">filter_alt</span>
            Filter
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-accent text-on-accent px-6 py-2 rounded-sm font-black uppercase text-xs tracking-[0.15em] hover:brightness-110 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Add Trade
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Trades', value: entries.length.toString(), icon: 'receipt_long', color: 'text-text-primary' },
          { label: 'Win Rate', value: `${winRate}%`, icon: 'speed', color: 'text-bullish' },
          { label: 'Total P/L', value: formatPnL(totalPnL).text, icon: 'account_balance', color: formatPnL(totalPnL).className },
          { label: 'Avg P/L', value: formatPnL(totalPnL / entries.length).text, icon: 'analytics', color: formatPnL(totalPnL / entries.length).className },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-secondary p-4 rounded-sm border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-text-muted text-base">{stat.icon}</span>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
            </div>
            <p className={cn('text-xl font-black font-tabular', stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">search</span>
        <input
          type="text"
          placeholder="Search trades by setup, date, or notes..."
          className="w-full bg-surface-secondary border border-white/[0.04] rounded-sm px-3 py-2.5 pl-10 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/30 focus:ring-1 focus:ring-accent/30 transition-colors outline-none"
        />
      </div>

      {/* Journal Table */}
      <div className="bg-surface-secondary rounded-sm border border-white/[0.04] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Date', 'Setup', 'Dir', 'Entry', 'Exit', 'Stop', 'Target', 'P/L', 'Lesson'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const pnl = formatPnL(entry.pnl);
                return (
                  <tr key={entry.id} className="border-b border-white/[0.04] last:border-0 hover:bg-surface-elevated transition-colors cursor-pointer">
                    <td className="px-4 py-3 text-xs font-mono text-text-secondary">{entry.date}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-text-primary">{entry.setup}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={cn('material-symbols-outlined text-base', entry.direction === 'long' ? 'text-bullish' : 'text-error')}>
                          {entry.direction === 'long' ? 'trending_up' : 'trending_down'}
                        </span>
                        <span className={cn('text-xs font-bold uppercase', entry.direction === 'long' ? 'text-bullish' : 'text-error')}>
                          {entry.direction}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono font-bold text-text-primary">{formatPrice(entry.entry)}</td>
                    <td className="px-4 py-3 text-xs font-mono text-text-secondary">{formatPrice(entry.exit)}</td>
                    <td className="px-4 py-3 text-xs font-mono text-error/70">{formatPrice(entry.stop)}</td>
                    <td className="px-4 py-3 text-xs font-mono text-bullish/70">{formatPrice(entry.target)}</td>
                    <td className={cn('px-4 py-3 text-xs font-black font-tabular', pnl.className)}>{pnl.text}</td>
                    <td className="px-4 py-3 text-xs text-text-muted max-w-[200px] truncate">{entry.lesson}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Trade Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowAdd(false)}>
          <div className="bg-surface-secondary border border-white/[0.06] rounded-sm w-full max-w-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-lg">add_circle</span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">Add Trade</h3>
              </div>
              <button onClick={() => setShowAdd(false)} className="text-text-muted hover:text-text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Date</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Setup</label>
                  <input placeholder="e.g. Demand Zone Bounce" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Direction</label>
                  <select className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none">
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Entry Price</label>
                  <input type="number" step="0.25" placeholder="0.00" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Stop', 'Target', 'Exit'].map((label) => (
                  <div key={label} className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">{label}</label>
                    <input type="number" step="0.25" placeholder="0.00" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none" />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">P/L ($)</label>
                <input type="number" step="0.01" placeholder="0.00" className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm font-mono text-text-primary focus:ring-1 focus:ring-accent outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Lesson Learned</label>
                <textarea placeholder="What did you learn?" className="w-full min-h-[60px] p-3 bg-surface-elevated border-none rounded-sm resize-none text-xs text-text-primary focus:ring-1 focus:ring-accent outline-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-accent text-on-accent py-2.5 rounded-sm font-black uppercase text-xs tracking-[0.15em] hover:brightness-110 transition-all">Save Trade</button>
                <button onClick={() => setShowAdd(false)} className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/[0.06] rounded-sm text-text-secondary hover:bg-surface-elevated transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
