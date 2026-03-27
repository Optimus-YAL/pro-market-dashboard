'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  id?: string;
}

export function Card({ children, className, noPadding, id }: CardProps) {
  return (
    <div id={id} className={cn('card', !noPadding && 'p-5', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-sm font-semibold text-text-secondary uppercase tracking-wider', className)}>
      {children}
    </h3>
  );
}
