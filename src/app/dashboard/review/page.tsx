'use client';

import { SAMPLE_REVIEW } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ReviewPage() {
  const review = SAMPLE_REVIEW;
  const [score, setScore] = useState(review.executionScore);

  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tighter text-text-primary font-headline uppercase">Post-Market Review</h2>
          <div className="h-4 w-px bg-white/[0.06]" />
          <span className="text-error text-xs font-bold uppercase tracking-widest">* Mandatory</span>
        </div>
        <button className="flex items-center gap-2 bg-accent text-on-accent px-6 py-2 rounded-sm font-black uppercase text-xs tracking-[0.15em] hover:brightness-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-base">save</span>
          Submit Review
        </button>
      </header>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-secondary p-5 rounded-sm border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-accent text-base">speed</span>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Execution Score</p>
          </div>
          <p className="text-3xl font-black text-accent font-tabular">{score}<span className="text-lg text-text-muted">/10</span></p>
        </div>

        <div className="bg-surface-secondary p-5 rounded-sm border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-text-muted text-base">checklist</span>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Followed Plan</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {review.followedPlan ? (
              <>
                <span className="material-symbols-outlined text-bullish" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm font-bold text-bullish uppercase">Yes</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
                <span className="text-sm font-bold text-error uppercase">No</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-surface-secondary p-5 rounded-sm border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-text-muted text-base">psychology</span>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Emotional State</p>
          </div>
          <p className="text-sm font-bold text-text-primary capitalize mt-1">{review.emotionalState}</p>
        </div>

        <div className="bg-surface-secondary p-5 rounded-sm border border-white/[0.04]">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-text-muted text-base">military_tech</span>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Discipline</p>
          </div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className={cn('w-2.5 h-5 rounded-sm transition-colors', i < score ? 'bg-accent' : 'bg-surface-elevated')} />
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      <section className="bg-surface-secondary p-6 rounded-sm border border-white/[0.04]">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-accent text-lg">rate_review</span>
          <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">Daily Review Form</h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider mb-1.5 block">Did you follow the plan?</label>
            <select
              defaultValue={review.followedPlan ? 'yes' : 'no'}
              className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none"
            >
              <option value="yes">Yes — Followed plan</option>
              <option value="no">No — Deviated</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider mb-1.5 block">Best Trade</label>
            <textarea
              defaultValue={review.bestTrade}
              placeholder="What was your best execution today?"
              className="w-full min-h-[80px] p-4 bg-surface-elevated border-none rounded-sm resize-none text-xs leading-relaxed text-text-primary focus:ring-1 focus:ring-accent outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-error tracking-wider mb-1.5 block">Worst Mistake *</label>
            <textarea
              defaultValue={review.worstMistake}
              placeholder="Be honest — what was your worst mistake?"
              className="w-full min-h-[80px] p-4 bg-surface-elevated border-none rounded-sm resize-none text-xs leading-relaxed text-text-primary focus:ring-1 focus:ring-accent outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-error tracking-wider mb-1 block">One Improvement *</label>
            <p className="text-[10px] text-text-muted/60 mb-1.5">You must identify one concrete improvement. This is mandatory.</p>
            <textarea
              defaultValue={review.oneImprovement}
              placeholder="One thing you will do differently tomorrow..."
              className="w-full min-h-[80px] p-4 bg-surface-elevated border-none rounded-sm resize-none text-xs leading-relaxed text-text-primary focus:ring-1 focus:ring-accent outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider mb-1.5 block">Emotional State</label>
            <select
              defaultValue={review.emotionalState}
              className="w-full h-10 px-3 bg-surface-elevated border-none rounded-sm text-sm text-text-primary focus:ring-1 focus:ring-accent outline-none"
            >
              {['focused', 'confident', 'calm', 'anxious', 'frustrated', 'distracted'].map((e) => (
                <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-text-muted tracking-wider mb-2 block">Execution Score (1-10)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={10}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="flex-1 accent-[var(--accent)] h-1.5"
              />
              <span className="text-2xl font-black text-accent font-tabular w-10 text-center">{score}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
