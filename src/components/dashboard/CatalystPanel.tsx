'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SAMPLE_CATALYSTS } from '@/lib/constants';
import { AlertTriangle, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const TYPE_ICONS: Record<string, React.ElementType> = {
  economic: Clock,
  fed: Zap,
  geopolitical: AlertTriangle,
  news: AlertTriangle,
};

export function CatalystPanel() {
  const catalysts = SAMPLE_CATALYSTS;
  const hasHighImpact = catalysts.some(c => c.impact === 'high');

  return (
    <Card id="catalysts">
      <CardHeader>
        <CardTitle>Catalysts</CardTitle>
        {hasHighImpact && (
          <Badge variant="caution" dot pulse>High Impact Today</Badge>
        )}
      </CardHeader>

      <div className="space-y-2">
        {catalysts.map((catalyst) => {
          const Icon = TYPE_ICONS[catalyst.type] || AlertTriangle;
          return (
            <div
              key={catalyst.id}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg border',
                catalyst.impact === 'high'
                  ? 'bg-amber-500/5 border-amber-500/20'
                  : 'bg-surface-primary border-border-primary'
              )}
            >
              <Icon className={cn(
                'w-4 h-4 shrink-0',
                catalyst.impact === 'high' ? 'text-amber-400' :
                catalyst.impact === 'medium' ? 'text-blue-400' : 'text-text-muted'
              )} />

              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">{catalyst.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {catalyst.time && (
                  <span className="text-xs text-text-muted font-tabular">{catalyst.time}</span>
                )}
                <Badge
                  variant={catalyst.impact === 'high' ? 'caution' : catalyst.impact === 'medium' ? 'active' : 'neutral'}
                >
                  {catalyst.impact}
                </Badge>
              </div>
            </div>
          );
        })}

        {catalysts.length === 0 && (
          <div className="text-center py-6 text-text-muted text-sm">
            No catalysts scheduled today
          </div>
        )}
      </div>
    </Card>
  );
}
