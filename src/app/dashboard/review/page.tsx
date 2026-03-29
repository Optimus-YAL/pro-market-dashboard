'use client';

import { SAMPLE_REVIEW, SAMPLE_JOURNAL_ENTRIES } from '@/lib/constants';
import { cn, formatPnL } from '@/lib/utils';
import { useState } from 'react';
import type { EmotionalState } from '@/types';

export default function ReviewPage() {
  const review = SAMPLE_REVIEW;
  const [score, setScore] = useState(review.executionScore);
  const [followedPlan, setFollowedPlan] = useState<boolean | null>(review.followedPlan);
  const [emotion, setEmotion] = useState(review.emotionalState);
  
  const entries = SAMPLE_JOURNAL_ENTRIES;
  const totalTrades = entries.length;
  const netPnL = entries.reduce((sum, e) => sum + (e.pnl || 0), 0);
  const pnlObj = formatPnL(netPnL);

  const emotions = [
    { id: 'calm', label: 'Calm & Collected', icon: 'water_drop', color: 'text-blue-400' },
    { id: 'focused', label: 'In The Zone', icon: 'center_focus_strong', color: 'text-accent' },
    { id: 'anxious', label: 'Anxious / Hesitant', icon: 'water', color: 'text-amber-400' },
    { id: 'impatient', label: 'Impatient / Bored', icon: 'hourglass_empty', color: 'text-error' },
    { id: 'frustrated', label: 'Frustrated / Tilt', icon: 'local_fire_department', color: 'text-red-500' },
  ];

  return (
    <div className="animate-fade-in-up pb-32">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tighter text-text-primary font-headline">Post-Market Review</h2>
          <div className="h-4 w-px bg-white/[0.06]" />
          <span className="text-text-muted text-xs tracking-wider">Session end review for Terminal 01</span>
        </div>
      </header>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-secondary p-5 rounded-sm border border-white/[0.04] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total Trades</span>
            <span className="material-symbols-outlined text-text-muted text-[16px]">receipt_long</span>
          </div>
          <p className="text-3xl font-black text-text-primary font-tabular tracking-tight">{totalTrades}</p>
        </div>

        <div className="bg-surface-secondary p-5 rounded-sm border border-white/[0.04] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Net P/L</span>
            <span className="material-symbols-outlined text-text-muted text-[16px]">account_balance</span>
          </div>
          <p className={cn("text-3xl font-black font-tabular tracking-tight", pnlObj.className)}>{pnlObj.text}</p>
        </div>

        <div className="bg-surface-secondary p-5 rounded-sm border border-white/[0.04] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Plan Adherence</span>
            <span className="material-symbols-outlined text-text-muted text-[16px]">checklist_rtl</span>
          </div>
          <div>
            <p className="text-3xl font-black text-text-primary font-tabular tracking-tight mb-2">90%</p>
            <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden">
              <div className="h-full bg-bullish w-[90%]" />
            </div>
          </div>
        </div>

        <div className="bg-surface-secondary p-5 rounded-sm border border-white/[0.04] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined" style={{ fontSize: '4rem' }}>speed</span>
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Execution Score</span>
            <span className="material-symbols-outlined text-accent text-[16px]">military_tech</span>
          </div>
          <div className="relative z-10">
            <p className="text-3xl font-black text-accent font-tabular tracking-tight flex items-baseline gap-1">
              {score}<span className="text-base text-text-muted">/10</span>
            </p>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className={cn('w-full h-1.5 rounded-sm transition-colors', i < score ? 'bg-accent' : 'bg-surface-elevated')} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Review Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Core Reflection & Emotions */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          
          {/* Plan Question */}
          <div className="bg-surface-secondary border border-white/[0.04] rounded-sm p-6 relative">
            <h3 className="text-sm font-bold text-text-primary font-headline uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-accent">rule</span>
              Did you follow your plan today?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFollowedPlan(true)}
                className={cn(
                  "flex justify-center items-center py-4 border rounded-sm font-black uppercase text-xs tracking-widest transition-all",
                  followedPlan === true 
                    ? "bg-bullish/10 border-bullish/30 text-bullish shadow-[0_0_15px_rgba(74,222,128,0.1)]" 
                    : "bg-surface-card border-white/[0.04] text-text-muted hover:border-white/[0.1] hover:text-text-primary"
                )}
              >
                <span className="material-symbols-outlined mr-2">check_circle</span>
                Yes, Absolutely
              </button>
              <button
                onClick={() => setFollowedPlan(false)}
                className={cn(
                  "flex justify-center items-center py-4 border rounded-sm font-black uppercase text-xs tracking-widest transition-all",
                  followedPlan === false 
                    ? "bg-error/10 border-error/30 text-error shadow-[0_0_15px_rgba(248,113,113,0.1)]" 
                    : "bg-surface-card border-white/[0.04] text-text-muted hover:border-white/[0.1] hover:text-text-primary"
                )}
              >
                <span className="material-symbols-outlined mr-2">cancel</span>
                No, I Deviated
              </button>
            </div>
          </div>

          {/* Reflections */}
          <div className="bg-surface-secondary border border-white/[0.04] rounded-sm flex flex-col">
            <div className="p-4 border-b border-white/[0.04]">
              <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.15em]">Post-Session Analysis</h3>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-bullish tracking-widest flex items-center justify-between">
                  <span>Best Trade Reflection</span>
                  <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
                </label>
                <textarea
                  defaultValue={review.bestTrade}
                  placeholder="What did you do perfectly? Why did the analysis play out?"
                  className="w-full h-32 p-4 bg-surface-card border border-white/[0.04] rounded-sm resize-none text-sm text-text-primary placeholder:text-text-muted/40 focus:border-accent/40 focus:ring-1 focus:ring-accent/40 outline-none transition-all leading-relaxed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-error tracking-widest flex items-center justify-between">
                  <span>Worst Mistake / Gap</span>
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                </label>
                <textarea
                  defaultValue={review.worstMistake}
                  placeholder="Where did you deviate? Was it FOMO, hesitation, or bad analysis?"
                  className="w-full h-32 p-4 bg-surface-card border border-error/20 rounded-sm resize-none text-sm text-text-primary placeholder:text-text-muted/40 focus:border-error focus:ring-1 focus:ring-error outline-none transition-all leading-relaxed"
                />
              </div>
            </div>

            <div className="p-6 border-t border-white/[0.04] grid grid-cols-2 gap-6 bg-surface-primary/20">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-widest block">Mistake To Avoid Tomorrow</label>
                <textarea
                  placeholder="What exact behaviour are you banishing?"
                  className="w-full h-24 p-4 bg-surface-card border border-white/[0.04] rounded-sm resize-none text-xs text-text-primary placeholder:text-text-muted/40 focus:border-accent/30 focus:ring-1 focus:ring-accent/30 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-accent tracking-widest block">Specific Improvement Focus</label>
                <textarea
                  defaultValue={review.oneImprovement}
                  placeholder="One concrete thing you will improve next session..."
                  className="w-full h-24 p-4 bg-surface-card border border-accent/20 rounded-sm resize-none text-xs text-text-primary placeholder:text-text-muted/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Psychological State & Rating */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          
          <div className="bg-surface-secondary border border-white/[0.04] rounded-sm flex flex-col h-full">
            <div className="p-4 border-b border-white/[0.04]">
              <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.15em]">Psychological Review</h3>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Emotions */}
              <div>
                <label className="text-[10px] uppercase font-bold text-text-muted tracking-widest block mb-4">
                  Dominant Emotional State
                </label>
                <div className="flex flex-col gap-2">
                  {emotions.map(e => {
                    const isSelected = emotion === e.id;
                    return (
                      <button
                        key={e.id}
                        onClick={() => setEmotion(e.id as EmotionalState)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-sm border text-xs font-bold uppercase tracking-wider transition-all",
                          isSelected 
                            ? `bg-surface-elevated border-white/[0.1] ${e.color}` 
                            : "bg-surface-card border-white/[0.02] text-text-muted hover:border-white/[0.06] hover:bg-surface-elevated/50"
                        )}
                      >
                        <span className="material-symbols-outlined text-[18px]">{e.icon}</span>
                        {e.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider */}
              <div className="pt-4 border-t border-white/[0.04]">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Self-Rating</label>
                  <span className="text-3xl font-black text-accent font-tabular">{score}<span className="text-sm text-text-muted">/10</span></span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none bg-surface-elevated outline-none slider-thumb-accent"
                  style={{
                    background: `linear-gradient(to right, var(--accent) ${(score - 1) * 11.11}%, rgba(255,255,255,0.05) ${(score - 1) * 11.11}%)`
                  }}
                />
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Poor</span>
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Perfect</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex items-center bg-surface-secondary border border-white/[0.08] shadow-2xl rounded-sm overflow-hidden min-w-[600px] w-full max-w-4xl p-2 gap-2">
        <div className="flex items-center gap-2 px-4 flex-1">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Draft Saved Just Now</span>
        </div>
        
        <button className="px-6 py-3 font-bold uppercase tracking-widest text-[10px] text-text-secondary hover:text-error transition-colors">
          Discard
        </button>
        <button className="flex items-center gap-2 bg-accent text-on-accent px-8 py-3 rounded-sm font-black uppercase text-[10px] tracking-[0.15em] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(184,195,255,0.2)]">
          Save Post-Market Review
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

    </div>
  );
}
