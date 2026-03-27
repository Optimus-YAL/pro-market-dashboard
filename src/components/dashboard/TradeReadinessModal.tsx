'use client';

import { useState, useCallback } from 'react';

const CHECKLIST = [
  { id: 'key-level', label: 'At Key Level', icon: 'diamond' },
  { id: 'bias', label: 'Bias Aligned', icon: 'analytics' },
  { id: 'confirmation', label: 'Confirmation Present', icon: 'verified' },
  { id: 'risk', label: 'Risk Defined', icon: 'shield' },
  { id: 'stop', label: 'Stop Defined', icon: 'block' },
  { id: 'target', label: 'Target Defined', icon: 'flag' },
] as const;

type ChecklistState = Record<string, boolean>;
type Verdict = 'approved' | 'caution' | 'no-trade';

function getVerdict(checks: ChecklistState): Verdict {
  const total = CHECKLIST.length;
  const checked = Object.values(checks).filter(Boolean).length;
  if (checked === total) return 'approved';
  if (checked >= 4) return 'caution';
  return 'no-trade';
}

const VERDICT_CONFIG = {
  approved: {
    label: 'APPROVED',
    sublabel: 'ALL CONDITIONS MET — CLEAR TO EXECUTE',
    color: 'text-bullish',
    bg: 'bg-bullish/10',
    border: 'border-bullish/30',
    ring: 'ring-bullish/20',
    icon: 'check_circle',
    glow: 'shadow-[0_0_30px_rgba(34,197,94,0.15)]',
  },
  caution: {
    label: 'CAUTION',
    sublabel: 'PARTIAL CONDITIONS — PROCEED WITH CAUTION',
    color: 'text-caution',
    bg: 'bg-caution/10',
    border: 'border-caution/30',
    ring: 'ring-caution/20',
    icon: 'warning',
    glow: 'shadow-[0_0_30px_rgba(234,179,8,0.15)]',
  },
  'no-trade': {
    label: 'NO TRADE',
    sublabel: 'CONDITIONS NOT MET',
    color: 'text-error',
    bg: 'bg-error/10',
    border: 'border-error/30',
    ring: 'ring-error/20',
    icon: 'cancel',
    glow: 'shadow-[0_0_30px_rgba(238,125,119,0.15)]',
  },
};

interface TradeReadinessModalProps {
  open: boolean;
  onClose: () => void;
}

export function TradeReadinessModal({ open, onClose }: TradeReadinessModalProps) {
  const [checks, setChecks] = useState<ChecklistState>(
    Object.fromEntries(CHECKLIST.map((c) => [c.id, false]))
  );

  const toggle = useCallback((id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Reset on close
  const handleClose = useCallback(() => {
    setChecks(Object.fromEntries(CHECKLIST.map((c) => [c.id, false])));
    onClose();
  }, [onClose]);

  if (!open) return null;

  const verdict = getVerdict(checks);
  const v = VERDICT_CONFIG[verdict];
  const checkedCount = Object.values(checks).filter(Boolean).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={`fixed z-[101] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md animate-fade-in-up ${v.glow}`}>
        <div className="bg-surface-secondary border border-white/[0.06] rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-white/[0.04]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-accent/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent text-lg">checklist</span>
                </div>
                <div>
                  <h2 className="font-headline text-sm font-black uppercase tracking-widest">Trade Readiness</h2>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">Pre-Execution Validation</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-text-muted hover:text-text-primary hover:bg-surface-card rounded transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          {/* Checklist */}
          <div className="px-6 py-5">
            <div className="space-y-2">
              {CHECKLIST.map((item) => {
                const isChecked = checks[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-sm transition-all duration-200 ${
                      isChecked
                        ? 'bg-bullish/8 border border-bullish/20'
                        : 'bg-surface-card/50 border border-white/[0.04] hover:border-white/[0.08] hover:bg-surface-card'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isChecked
                        ? 'border-bullish bg-bullish text-surface-primary'
                        : 'border-white/20'
                    }`}>
                      {isChecked && (
                        <span className="material-symbols-outlined text-sm font-bold" style={{ fontSize: '14px' }}>check</span>
                      )}
                    </div>

                    {/* Icon */}
                    <span className={`material-symbols-outlined text-base transition-colors ${
                      isChecked ? 'text-bullish' : 'text-text-muted'
                    }`}>{item.icon}</span>

                    {/* Label */}
                    <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                      isChecked ? 'text-text-primary' : 'text-text-secondary'
                    }`}>{item.label}</span>

                    {/* Status */}
                    <span className={`ml-auto text-[9px] font-black uppercase tracking-widest ${
                      isChecked ? 'text-bullish' : 'text-text-muted/50'
                    }`}>
                      {isChecked ? 'PASS' : '—'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Progress */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    verdict === 'approved' ? 'bg-bullish' : verdict === 'caution' ? 'bg-caution' : 'bg-error'
                  }`}
                  style={{ width: `${(checkedCount / CHECKLIST.length) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-text-muted font-tabular">{checkedCount}/{CHECKLIST.length}</span>
            </div>
          </div>

          {/* Verdict */}
          <div className={`mx-6 mb-5 p-4 rounded-sm border ${v.border} ${v.bg} transition-all duration-300`}>
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined text-2xl ${v.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{v.icon}</span>
              <div>
                <span className={`text-sm font-black font-headline uppercase tracking-widest ${v.color}`}>{v.label}</span>
                <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${verdict === 'no-trade' ? 'text-error/70' : 'text-text-muted'}`}>
                  {verdict === 'no-trade' ? 'NO TRADE — CONDITIONS NOT MET' : v.sublabel}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider bg-surface-card text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-sm transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={verdict === 'no-trade'}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider rounded-sm transition-all active:scale-[0.98] ${
                verdict === 'no-trade'
                  ? 'bg-surface-card text-text-muted cursor-not-allowed opacity-50'
                  : verdict === 'caution'
                    ? 'bg-caution text-surface-primary hover:brightness-110'
                    : 'bg-bullish text-surface-primary hover:brightness-110'
              }`}
            >
              {verdict === 'no-trade' ? 'BLOCKED' : verdict === 'caution' ? 'PROCEED WITH CAUTION' : 'EXECUTE TRADE'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
