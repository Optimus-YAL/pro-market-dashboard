'use client';

import { cn, formatPnL } from '@/lib/utils';
import { SAMPLE_JOURNAL_ENTRIES } from '@/lib/constants';

export default function PerformancePage() {
  const entries = SAMPLE_JOURNAL_ENTRIES;
  const totalPnL = entries.reduce((sum, e) => sum + (e.pnl || 0), 0);
  const wins = entries.filter(e => (e.pnl || 0) > 0).length;
  const losses = entries.filter(e => (e.pnl || 0) < 0).length;
  const winRate = entries.length ? Math.round((wins / entries.length) * 100) : 0;
  const grossProfit = entries.filter(e => (e.pnl || 0) > 0).reduce((s, e) => s + (e.pnl || 0), 0);
  const grossLoss = entries.filter(e => (e.pnl || 0) < 0).reduce((s, e) => s + (e.pnl || 0), 0);
  const profitFactor = grossLoss !== 0 ? Math.abs(grossProfit / grossLoss) : 0;
  const avgWin = wins > 0 ? grossProfit / wins : 0;
  const avgLoss = losses > 0 ? grossLoss / losses : 0;

  // Build equity curve data
  let cumPnL = 0;
  const equityCurve = entries.map(e => {
    cumPnL += e.pnl || 0;
    return cumPnL;
  });
  const maxEquity = Math.max(...equityCurve, 0);
  const minEquity = Math.min(...equityCurve, 0);
  const range = maxEquity - minEquity || 1;

  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tighter text-text-primary font-headline uppercase">Performance</h2>
          <div className="h-4 w-px bg-white/[0.06]" />
          <span className="text-text-muted text-xs uppercase tracking-widest">Analytics</span>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-text-secondary border border-white/[0.06] rounded-sm hover:bg-surface-elevated transition-colors">
            <span className="material-symbols-outlined text-base">download</span>
            Export
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total P/L', value: formatPnL(totalPnL).text, icon: 'account_balance', color: formatPnL(totalPnL).className },
          { label: 'Win Rate', value: `${winRate}%`, icon: 'speed', color: winRate >= 50 ? 'text-bullish' : 'text-error' },
          { label: 'Profit Factor', value: profitFactor.toFixed(2), icon: 'trending_up', color: profitFactor >= 1 ? 'text-bullish' : 'text-error' },
          { label: 'Total Trades', value: entries.length.toString(), icon: 'receipt_long', color: 'text-text-primary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-secondary p-5 rounded-sm border border-white/[0.04]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-text-muted text-base">{stat.icon}</span>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
            </div>
            <p className={cn('text-2xl font-black font-tabular', stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Equity Curve (8 col) */}
        <div className="col-span-12 xl:col-span-8">
          <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-lg">show_chart</span>
                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Equity Curve</h3>
              </div>
              <span className={cn('text-xs font-bold uppercase', formatPnL(totalPnL).className)}>{formatPnL(totalPnL).text}</span>
            </div>

            {/* SVG Chart */}
            <div className="h-48 relative">
              {equityCurve.length > 1 ? (
                <svg viewBox={`0 0 ${equityCurve.length * 40} 200`} className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line key={y} x1="0" y1={y} x2={equityCurve.length * 40} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}
                  {/* Area fill */}
                  <path
                    d={`M0,${200 - ((equityCurve[0] - minEquity) / range) * 180 - 10} ${equityCurve.map((v, i) => `L${i * 40},${200 - ((v - minEquity) / range) * 180 - 10}`).join(' ')} L${(equityCurve.length - 1) * 40},200 L0,200 Z`}
                    fill="url(#equityGradient)"
                  />
                  {/* Line */}
                  <path
                    d={`M0,${200 - ((equityCurve[0] - minEquity) / range) * 180 - 10} ${equityCurve.map((v, i) => `L${i * 40},${200 - ((v - minEquity) / range) * 180 - 10}`).join(' ')}`}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <div className="flex items-center justify-center h-full text-text-muted text-xs">No trade data yet</div>
              )}
            </div>
          </section>
        </div>

        {/* Breakdown Panel (4 col) */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          {/* Win/Loss Breakdown */}
          <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary mb-5">Win / Loss Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Wins</span>
                <span className="text-sm font-black text-bullish font-tabular">{wins}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Losses</span>
                <span className="text-sm font-black text-error font-tabular">{losses}</span>
              </div>
              {/* Win/Loss Bar */}
              <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden flex">
                <div className="bg-bullish h-full transition-all" style={{ width: `${winRate}%` }} />
                <div className="bg-error h-full transition-all" style={{ width: `${100 - winRate}%` }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Avg Win</span>
                <span className="text-xs font-bold text-bullish font-tabular">{formatPnL(avgWin).text}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Avg Loss</span>
                <span className="text-xs font-bold text-error font-tabular">{formatPnL(avgLoss).text}</span>
              </div>
            </div>
          </section>

          {/* Daily P/L Table */}
          <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
            <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary mb-5">Daily P/L</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {entries.map((entry) => {
                const pnl = formatPnL(entry.pnl);
                return (
                  <div key={entry.id} className="flex justify-between items-center py-1.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-xs font-mono text-text-muted">{entry.date}</span>
                    <span className={cn('text-xs font-bold font-tabular', pnl.className)}>{pnl.text}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
