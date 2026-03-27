'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SAMPLE_ZONES } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';
import { Layers } from 'lucide-react';

const ZONE_COLORS: Record<string, { badge: 'bullish' | 'bearish' | 'caution' | 'active'; bar: string }> = {
  demand:          { badge: 'bullish', bar: 'bg-emerald-500' },
  supply:          { badge: 'bearish', bar: 'bg-red-500' },
  'liquidity-sweep': { badge: 'caution', bar: 'bg-amber-500' },
  breakout:        { badge: 'active',  bar: 'bg-blue-500' },
};

const ZONE_LABELS: Record<string, string> = {
  demand: 'Demand',
  supply: 'Supply',
  'liquidity-sweep': 'Liq Sweep',
  breakout: 'Breakout',
};

export function SupplyDemandZones() {
  const zones = SAMPLE_ZONES;

  return (
    <Card id="supply-demand">
      <CardHeader>
        <CardTitle>Supply & Demand Zones</CardTitle>
        <Layers className="w-4 h-4 text-text-muted" />
      </CardHeader>

      <div className="space-y-2">
        {zones.map((zone) => {
          const colors = ZONE_COLORS[zone.type];
          return (
            <div
              key={zone.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-primary border border-border-primary"
            >
              {/* Color bar */}
              <div className={cn('w-1 h-8 rounded-full shrink-0', colors?.bar || 'bg-slate-500')} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant={colors?.badge || 'neutral'}>{ZONE_LABELS[zone.type]}</Badge>
                  <span className="text-[10px] text-text-muted">P{zone.priority}</span>
                </div>
                {zone.notes && <p className="text-[11px] text-text-muted mt-1 truncate">{zone.notes}</p>}
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs font-tabular text-text-primary">
                  {formatPrice(zone.priceLow)} — {formatPrice(zone.priceHigh)}
                </p>
                <p className="text-[10px] text-text-muted font-tabular">
                  {((zone.priceHigh - zone.priceLow) * 4).toFixed(0)} ticks
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
