'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SAMPLE_SESSIONS } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';


const SESSION_COLORS: Record<string, string> = {
  tokyo: 'border-l-purple-500',
  london: 'border-l-orange-500',
  globex: 'border-l-blue-500',
};

const SESSION_LABELS: Record<string, string> = {
  tokyo: '🇯🇵 Tokyo',
  london: '🇬🇧 London',
  globex: '🌐 Globex',
};

const CLASS_VARIANTS: Record<string, 'bullish' | 'bearish' | 'caution' | 'neutral'> = {
  'trend-up': 'bullish',
  'trend-down': 'bearish',
  'range': 'neutral',
  'reversal': 'caution',
  'expansion': 'active' as 'bullish',
};

const CLASS_LABELS: Record<string, string> = {
  'trend-up':   'Trend Up',
  'trend-down': 'Trend Down',
  'range':      'Range',
  'reversal':   'Reversal',
  'expansion':  'Expansion',
};

export function SessionAnalysis() {
  const sessions = SAMPLE_SESSIONS;
  const allTrendUp = sessions.every(s => s.classification === 'trend-up');
  const allTrendDown = sessions.every(s => s.classification === 'trend-down');
  const aligned = allTrendUp || allTrendDown;

  return (
    <Card id="sessions">
      <CardHeader>
        <CardTitle>Session Analysis</CardTitle>
        <Badge variant={aligned ? 'bullish' : 'caution'} dot>
          {aligned ? 'Aligned' : 'Mixed'}
        </Badge>
      </CardHeader>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={cn(
              'flex items-center justify-between px-4 py-3 rounded-lg bg-surface-primary border border-border-primary border-l-2',
              SESSION_COLORS[session.session]
            )}
          >
            <div>
              <p className="text-sm font-medium text-text-primary">{SESSION_LABELS[session.session]}</p>
              {session.notes && <p className="text-[11px] text-text-muted mt-0.5">{session.notes}</p>}
            </div>

            <div className="flex items-center gap-3">
              {session.high != null && session.low != null && (
                <div className="text-right">
                  <p className="text-[10px] text-text-muted">Range</p>
                  <p className="text-xs font-tabular text-text-secondary">
                    {formatPrice(session.low)} – {formatPrice(session.high)}
                  </p>
                </div>
              )}

              <Badge variant={CLASS_VARIANTS[session.classification] || 'neutral'}>
                {CLASS_LABELS[session.classification]}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
