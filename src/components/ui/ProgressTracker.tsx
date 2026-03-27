'use client';
import { cn } from '@/lib/utils';
import { WorkflowStep } from '@/types';
import { Check } from 'lucide-react';

interface ProgressTrackerProps {
  steps: WorkflowStep[];
  className?: string;
}

export function ProgressTracker({ steps, className }: ProgressTrackerProps) {
  const completed = steps.filter(s => s.completed).length;
  const percent = Math.round((completed / steps.length) * 100);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs font-medium text-text-secondary font-tabular">{percent}%</span>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-1">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-1">
            <div className={cn(
              'flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors',
              step.completed
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-slate-800 text-slate-500'
            )}>
              {step.completed && <Check className="w-3 h-3" />}
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                'w-3 h-px',
                step.completed ? 'bg-emerald-500/30' : 'bg-slate-700'
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
