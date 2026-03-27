'use client';

import { Card, CardTitle } from '@/components/ui/Card';
import { BiasScore, BiasMeter } from '@/components/ui/BiasScore';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { Badge } from '@/components/ui/Badge';
import { SAMPLE_DAILY_PREP, SAMPLE_CATALYSTS, INITIAL_RISK_STATE } from '@/lib/constants';
import { AlertTriangle, Zap, StickyNote, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RightPanel({ isOpen, onClose }: RightPanelProps) {
  const prep = SAMPLE_DAILY_PREP;
  const risk = INITIAL_RISK_STATE;
  const hasHighImpact = SAMPLE_CATALYSTS.some(c => c.impact === 'high');

  if (!isOpen) return null;

  return (
    <aside className="fixed top-16 right-0 w-72 h-[calc(100vh-4rem)] bg-surface-secondary border-l border-border-primary z-20 overflow-y-auto animate-slide-in-right">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Today&apos;s Snapshot</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-800 text-text-muted">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bias Score */}
        <Card className="!p-4">
          <CardTitle className="!mb-3">Bias Score</CardTitle>
          <BiasScore score={prep.biasScore} size="lg" />
          <div className="mt-3">
            <BiasMeter score={prep.biasScore} />
          </div>
        </Card>

        {/* Trade Status */}
        <Card className="!p-4">
          <CardTitle className="!mb-3">Trade Status</CardTitle>
          <div className="flex justify-center">
            <StatusIndicator status={prep.tradeStatus} size="lg" />
          </div>
        </Card>

        {/* Risk */}
        <Card className="!p-4">
          <CardTitle className="!mb-3">Risk Control</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Trades Used</span>
              <span className="text-text-primary font-tabular">{risk.tradesUsed}/{risk.maxTrades}</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(risk.tradesUsed / risk.maxTrades) * 100}%` }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Daily P/L</span>
              <span className={cn('font-tabular', risk.dailyPnL >= 0 ? 'text-emerald-400' : 'text-red-400')}>
                {risk.dailyPnL >= 0 ? '+' : ''}${risk.dailyPnL.toFixed(0)}
              </span>
            </div>
          </div>
        </Card>

        {/* Alerts */}
        <Card className="!p-4">
          <CardTitle className="!mb-3">Alerts</CardTitle>
          <div className="space-y-2">
            {hasHighImpact && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-xs text-amber-400">High-impact event today</span>
              </div>
            )}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-xs text-blue-400">Workflow 60% complete</span>
            </div>
          </div>
        </Card>

        {/* Quick Notes */}
        <Card className="!p-4">
          <CardTitle className="!mb-3">Quick Notes</CardTitle>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-800/50">
            <StickyNote className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary leading-relaxed">
              Watch for CPI at 8:30 — reduce size pre-number. Focus on demand at 5265 if pullback occurs post-data.
            </p>
          </div>
        </Card>
      </div>
    </aside>
  );
}
