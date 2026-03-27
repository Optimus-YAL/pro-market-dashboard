'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type BadgeVariant = 'bullish' | 'bearish' | 'caution' | 'neutral' | 'active' | 'outline';

const variants: Record<BadgeVariant, string> = {
  bullish: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  bearish: 'bg-red-500/10 text-red-400 border-red-500/30',
  caution: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  neutral: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
  active:  'bg-blue-500/10 text-blue-400 border-blue-500/30',
  outline: 'bg-transparent text-slate-400 border-slate-600',
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({ children, variant = 'neutral', className, dot, pulse }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border',
      variants[variant],
      className
    )}>
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant === 'bullish' ? 'bg-emerald-400' :
          variant === 'bearish' ? 'bg-red-400' :
          variant === 'caution' ? 'bg-amber-400' :
          variant === 'active'  ? 'bg-blue-400' :
          'bg-slate-400',
          pulse && 'animate-status-pulse'
        )} />
      )}
      {children}
    </span>
  );
}
