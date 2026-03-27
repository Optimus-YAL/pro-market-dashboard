'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SAMPLE_DAILY_PREP, REGIME_LABELS, MACRO_LABELS } from '@/lib/constants';
import { BiasScore, BiasMeter } from '@/components/ui/biasscore';
import { StatusIndicator } from '@/components/ui/statusindicator';
import { Activity, Globe, Gauge } from 'lucide-react';

export function DailyOverview() {
  const prep = SAMPLE_DAILY_PREP;

  return (
    <Card id="daily-overview">
      <CardHeader>
        <CardTitle>Daily Market Overview</CardTitle>
        <span className="text-xs text-text-muted">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </CardHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Regime */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Activity className="w-3.5 h-3.5" />
            Regime
          </div>
          <Badge variant={prep.marketRegime === 'trending' ? 'bullish' : 'neutral'} dot>
            {REGIME_LABELS[prep.marketRegime]}
          </Badge>
        </div>

        {/* Macro */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Globe className="w-3.5 h-3.5" />
            Macro
          </div>
          <Badge
            variant={prep.macroEnv === 'risk-on' ? 'bullish' : prep.macroEnv === 'risk-off' ? 'bearish' : 'caution'}
            dot
          >
            {MACRO_LABELS[prep.macroEnv]}
          </Badge>
        </div>

        {/* Bias */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Gauge className="w-3.5 h-3.5" />
            Bias Score
          </div>
          <BiasScore score={prep.biasScore} size="sm" showLabel={false} />
          <BiasMeter score={prep.biasScore} />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <div className="text-xs text-text-muted">Trade Status</div>
          <StatusIndicator status={prep.tradeStatus} />
        </div>
      </div>
    </Card>
  );
}
