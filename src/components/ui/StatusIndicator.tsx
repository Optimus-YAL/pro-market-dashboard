'use client';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'trade' | 'caution' | 'no-trade' | 'locked';
  size?: 'sm' | 'md' | 'lg';
}

const STATUS_CONFIG = {
  trade:     { label: 'TRADE',    bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
  caution:   { label: 'CAUTION',  bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/30',   dot: 'bg-amber-400' },
  'no-trade': { label: 'NO TRADE', bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-500/30',     dot: 'bg-red-400' },
  locked:    { label: 'LOCKED',   bg: 'bg-red-500/15',     text: 'text-red-400',     border: 'border-red-500/40',     dot: 'bg-red-500' },
} as const;

export function StatusIndicator({ status, size = 'md' }: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : size === 'lg' ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs';

  return (
    <div className={cn(
      'inline-flex items-center gap-2 rounded-lg border font-bold tracking-wider',
      config.bg, config.text, config.border,
      sizeClasses
    )}>
      <span className={cn('w-2 h-2 rounded-full animate-status-pulse', config.dot)} />
      {config.label}
    </div>
  );
}
