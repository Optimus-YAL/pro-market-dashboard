'use client';
import { cn } from '@/lib/utils';
import { Check, Circle } from 'lucide-react';

interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function ChecklistItem({ label, checked, onChange, disabled }: ChecklistItemProps) {
  return (
    <label className={cn(
      'flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition-colors',
      checked ? 'bg-emerald-500/5' : 'hover:bg-slate-800/50',
      disabled && 'opacity-50 cursor-not-allowed'
    )}>
      <div className={cn(
        'flex items-center justify-center w-5 h-5 rounded border transition-colors',
        checked
          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
          : 'border-slate-600 text-transparent'
      )}>
        {checked ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3 text-slate-600" />}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />
      <span className={cn(
        'text-sm transition-colors',
        checked ? 'text-slate-300' : 'text-slate-400'
      )}>
        {label}
      </span>
    </label>
  );
}
