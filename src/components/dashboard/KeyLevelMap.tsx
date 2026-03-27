// cSpell:ignore globex vwap
'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { SAMPLE_KEY_LEVELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { MapPin } from 'lucide-react';

const LEVEL_GROUPS = [
  {
    title: 'Previous Day',
    levels: [
      { key: 'pdh', label: 'PDH', color: 'text-emerald-400' },
      { key: 'pdl', label: 'PDL', color: 'text-red-400' },
      { key: 'pc',  label: 'PC',  color: 'text-slate-400' },
    ]
  },
  {
    title: 'Spike',
    levels: [
      { key: 'spikeHigh', label: 'Spike High', color: 'text-emerald-400' },
      { key: 'spikeBase', label: 'Spike Base', color: 'text-amber-400' },
    ]
  },
  {
    title: 'Session Levels',
    levels: [
      { key: 'globexHigh', label: 'GH', color: 'text-blue-400' },
      { key: 'globexLow',  label: 'GL', color: 'text-blue-400' },
      { key: 'tokyoHigh',  label: 'Tokyo H', color: 'text-purple-400' },
      { key: 'tokyoLow',   label: 'Tokyo L', color: 'text-purple-400' },
      { key: 'londonHigh', label: 'London H', color: 'text-orange-400' },
      { key: 'londonLow',  label: 'London L', color: 'text-orange-400' },
    ]
  },
  {
    title: 'Anchored',
    levels: [
      { key: 'vwap', label: 'VWAP', color: 'text-cyan-400' },
    ]
  },
] as const;

export function KeyLevelMap() {
  const levels = SAMPLE_KEY_LEVELS;

  return (
    <Card id="key-levels">
      <CardHeader>
        <CardTitle>Key Levels</CardTitle>
        <MapPin className="w-4 h-4 text-text-muted" />
      </CardHeader>

      <div className="space-y-4">
        {LEVEL_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2">{group.title}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {group.levels.map((level) => {
                const value = levels[level.key as keyof typeof levels];
                return (
                  <div
                    key={level.key}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-primary border border-border-primary"
                  >
                    <span className="text-xs text-text-muted">{level.label}</span>
                    <span className={`text-sm font-semibold font-tabular ${level.color}`}>
                      {formatPrice(value || 0)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
