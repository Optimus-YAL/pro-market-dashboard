'use client';
import { cn, biasColor } from '@/lib/utils';

interface BiasScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function BiasScore({ score, size = 'md', showLabel = true }: BiasScoreProps) {
  const sizeClass = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-4xl' : 'text-2xl';
  const label = score > 0 ? 'Bullish' : score < 0 ? 'Bearish' : 'Neutral';

  return (
    <div className="flex flex-col items-center gap-1">
      <span className={cn('font-bold font-tabular', sizeClass, biasColor(score))}>
        {score > 0 ? '+' : ''}{score}
      </span>
      {showLabel && (
        <span className={cn('text-xs font-medium', biasColor(score))}>{label}</span>
      )}
    </div>
  );
}

/** Horizontal bias meter visualization */
export function BiasMeter({ score }: { score: number }) {
  const position = ((score + 5) / 10) * 100;
  return (
    <div className="w-full">
      <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-slate-500 to-emerald-500 opacity-30" />
        {/* Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/20 border-2 border-slate-900 transition-all duration-300"
          style={{ left: `${position}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-red-400/60">-5</span>
        <span className="text-[10px] text-slate-500">0</span>
        <span className="text-[10px] text-emerald-400/60">+5</span>
      </div>
    </div>
  );
}
