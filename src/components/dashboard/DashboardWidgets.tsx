'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressTracker } from '@/components/ui/progresstracker';
import { SAMPLE_TRADE_PLAN, WORKFLOW_STEPS } from '@/lib/constants';
import { FileText, Target } from 'lucide-react';

export function TodaysPlanPreview() {
  const plan = SAMPLE_TRADE_PLAN;

  return (
    <Card id="plan-preview">
      <CardHeader>
        <CardTitle>Today&apos;s Plan</CardTitle>
        <FileText className="w-4 h-4 text-text-muted" />
      </CardHeader>

      <div className="space-y-3">
        <p className="text-sm text-text-secondary leading-relaxed">{plan.dailyBias}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">Long Scenario</p>
            <p className="text-xs text-text-secondary line-clamp-2">{plan.longScenarios}</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/15">
            <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1">Short Scenario</p>
            <p className="text-xs text-text-secondary line-clamp-2">{plan.shortScenarios}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function WorkflowProgress() {
  const steps = WORKFLOW_STEPS.map((s, i) => ({ ...s, completed: i < 3 }));

  return (
    <Card id="workflow">
      <CardHeader>
        <CardTitle>Workflow Progress</CardTitle>
        <Target className="w-4 h-4 text-text-muted" />
      </CardHeader>
      <ProgressTracker steps={steps} />
    </Card>
  );
}

export function QuickNotes() {
  return (
    <Card id="quick-notes">
      <CardHeader>
        <CardTitle>Quick Notes</CardTitle>
      </CardHeader>
      <textarea
        className="w-full h-24 bg-surface-primary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted resize-none focus:border-active-accent focus:ring-1 focus:ring-active-accent/30 transition-colors"
        placeholder="Add quick notes for today..."
        defaultValue="CPI at 8:30 ET — reduce size pre-number. Focus on demand at 5265 post-data pullback."
      />
    </Card>
  );
}
