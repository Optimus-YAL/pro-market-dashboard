'use client';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  children: ReactNode;
  className?: string;
  hint?: string;
}

export function FormField({ label, id, children, className, hint }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="block text-xs font-medium text-text-secondary uppercase tracking-wider">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-text-muted">{hint}</p>}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full bg-surface-primary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary',
        'placeholder:text-text-muted focus:border-active-accent focus:ring-1 focus:ring-active-accent/30',
        'transition-colors font-tabular',
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full bg-surface-primary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary',
        'placeholder:text-text-muted focus:border-active-accent focus:ring-1 focus:ring-active-accent/30',
        'transition-colors resize-none',
        className
      )}
      rows={3}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full bg-surface-primary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary',
        'focus:border-active-accent focus:ring-1 focus:ring-active-accent/30 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500/30',
  secondary: 'bg-slate-700/50 hover:bg-slate-700 text-slate-300 border-slate-600/30',
  danger: 'bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-500/30',
  ghost: 'bg-transparent hover:bg-slate-800 text-slate-400 border-transparent',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-sm',
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
