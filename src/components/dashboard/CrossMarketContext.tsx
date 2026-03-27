'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SAMPLE_MARKETS } from '@/lib/constants';
import { TrendingUp, TrendingDown, Minus, Globe } from 'lucide-react';

export function CrossMarketContext() {
  const markets = SAMPLE_MARKETS;
  const bullishCount = markets.filter(m => m.contribution === 'bullish').length;
  const bearishCount = markets.filter(m => m.contribution === 'bearish').length;

  return (
    <Card id="cross-market">
      <CardHeader>
        <CardTitle>Cross-Market Context</CardTitle>
        <div className="flex gap-2">
          <Badge variant="bullish">{bullishCount} Bullish</Badge>
          <Badge variant="bearish">{bearishCount} Bearish</Badge>
        </div>
      </CardHeader>

      <div className="space-y-2">
        {markets.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-primary border border-border-primary"
          >
            <Globe className="w-4 h-4 text-text-muted shrink-0" />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">{m.market}</p>
              {m.notes && <p className="text-[11px] text-text-muted truncate">{m.notes}</p>}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Direction */}
              <div className="flex items-center gap-1">
                {m.direction === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
                {m.direction === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
                {m.direction === 'flat' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
              </div>

              {/* Contribution */}
              <Badge
                variant={m.contribution === 'bullish' ? 'bullish' : m.contribution === 'bearish' ? 'bearish' : 'neutral'}
              >
                {m.contribution}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
