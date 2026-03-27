'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, Select, Textarea } from '@/components/ui/formelements';
import { SAMPLE_SESSIONS } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';
import { Save, CheckCircle, AlertTriangle } from 'lucide-react';

const SESSION_COLORS: Record<string, { accent: string; bg: string }> = {
  tokyo:  { accent: 'border-l-purple-500', bg: 'from-purple-500/5' },
  london: { accent: 'border-l-orange-500', bg: 'from-orange-500/5' },
  globex: { accent: 'border-l-blue-500',   bg: 'from-blue-500/5' },
};

const SESSION_EMOJI: Record<string, string> = { tokyo: '🇯🇵', london: '🇬🇧', globex: '🌐' };

export default function SessionsPage() {
  const sessions = SAMPLE_SESSIONS;
  const allAligned = sessions.every(s => s.classification.includes('up')) || sessions.every(s => s.classification.includes('down'));

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-text-primary uppercase tracking-tight">Sessions</h1>
          <p className="text-xs text-text-muted mt-0.5">Session analysis and alignment</p>
        </div>
        <Button size="sm"><Save className="w-3.5 h-3.5" /> Save</Button>
      </div>

      {/* Session Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sessions.map((session) => {
          const colors = SESSION_COLORS[session.session];
          return (
            <Card key={session.id} className={cn('border-l-2', colors.accent)}>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-text-primary">
                    {SESSION_EMOJI[session.session]} {session.session.charAt(0).toUpperCase() + session.session.slice(1)} Session
                  </h3>
                  <Badge variant={
                    session.classification.includes('up') ? 'bullish' :
                    session.classification.includes('down') ? 'bearish' :
                    session.classification === 'range' ? 'neutral' : 'caution'
                  }>
                    {session.classification.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-surface-primary border border-border-primary">
                    <p className="text-[10px] text-text-muted uppercase font-bold">High</p>
                    <p className="text-sm font-bold font-tabular text-emerald-400">{formatPrice(session.high)}</p>
                  </div>
                  <div className="p-3 rounded bg-surface-primary border border-border-primary">
                    <p className="text-[10px] text-text-muted uppercase font-bold">Low</p>
                    <p className="text-sm font-bold font-tabular text-red-400">{formatPrice(session.low)}</p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest block mb-1.5">Classification</label>
                  <Select defaultValue={session.classification}>
                    <option value="trend-up">Trend Up</option>
                    <option value="trend-down">Trend Down</option>
                    <option value="range">Range</option>
                    <option value="reversal">Reversal</option>
                    <option value="expansion">Expansion</option>
                  </Select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest block mb-1.5">Notes</label>
                  <Textarea defaultValue={session.notes} placeholder="Session notes..." />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Alignment Summary */}
      <Card className={cn('border', allAligned ? 'border-emerald-500/30' : 'border-amber-500/30')}>
        <div className="p-5 flex items-center gap-4">
          {allAligned ? (
            <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
          )}
          <div>
            <h3 className={cn('text-sm font-bold', allAligned ? 'text-emerald-400' : 'text-amber-400')}>
              {allAligned ? 'Sessions Aligned' : 'Sessions Mixed'}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              {allAligned
                ? 'All sessions trending in the same direction. Higher conviction for directional trades.'
                : 'Sessions show mixed signals. Consider reduced size or range-bound strategies.'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
