'use client';

import Link from 'next/link';
import { TrendingUp, ArrowRight, Shield, Zap, BarChart3, Target, BookOpen, Clock, CheckCircle, ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-primary text-text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface-primary/80 backdrop-blur-xl border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-black uppercase tracking-tight">Pro Market</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'About', 'Blog', 'FAQ', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors uppercase tracking-wider">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-status-pulse" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Professional Trading Tools</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
            Trade with
            <span className="text-blue-500"> structure.</span>
            <br />
            Execute with
            <span className="text-emerald-400"> discipline.</span>
          </h1>

          <p className="mt-8 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Professional decision-support dashboard for discretionary futures traders.
            Built for daily preparation, market context, and execution discipline.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Link href="/dashboard" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30">
              Launch Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center gap-2 bg-surface-elevated border border-border-primary hover:border-border-secondary text-text-secondary px-6 py-3 rounded text-sm font-medium transition-colors">
              Learn More <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 border-t border-border-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight">Core Features</h2>
            <p className="text-sm text-text-muted mt-3">Everything you need for structured, disciplined trading</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, title: 'Daily Market Overview', desc: 'Regime, macro environment, bias score, and trade status at a glance.' },
              { icon: Target, title: 'Key Level Mapping', desc: 'PDH, PDL, VWAP, Globex, Tokyo, London — all your levels in one view.' },
              { icon: Zap, title: 'Cross-Market Context', desc: 'Track ES, NQ, DXY, Gold, 10Y, Oil alignment in real time.' },
              { icon: Clock, title: 'Session Analysis', desc: 'Tokyo, London, Globex classification with alignment detection.' },
              { icon: Shield, title: 'Trade Gate', desc: 'Mandatory checklist before execution. No shortcuts allowed.' },
              { icon: BookOpen, title: 'Trade Journal', desc: 'Record, review, and learn from every trade you take.' },
            ].map((f) => (
              <div key={f.title} className="p-6 bg-surface-card border border-border-primary rounded hover:border-border-secondary transition-colors group">
                <f.icon className="w-5 h-5 text-blue-400 mb-4" />
                <h3 className="text-sm font-bold text-text-primary mb-2">{f.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-border-primary bg-surface-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight">How It Works</h2>
            <p className="text-sm text-text-muted mt-3">Five-step workflow enforced by design</p>
          </div>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Context', desc: 'Review market regime, macro environment, and cross-market signals.' },
              { step: '02', title: 'Structure', desc: 'Map key levels, supply/demand zones, and session data.' },
              { step: '03', title: 'Bias', desc: 'Set your daily bias score based on all available evidence.' },
              { step: '04', title: 'Plan', desc: 'Define long and short scenarios with entries, stops, and targets.' },
              { step: '05', title: 'Execute', desc: 'Complete the mandatory checklist. Pass the trade gate. Execute with discipline.' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-6 p-6 bg-surface-card border border-border-primary rounded group hover:border-blue-500/30 transition-colors">
                <span className="text-2xl font-black text-blue-500/30 group-hover:text-blue-400 transition-colors font-tabular">{s.step}</span>
                <div>
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">{s.title}</h3>
                  <p className="text-xs text-text-muted mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 border-t border-border-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight">About</h2>
          <p className="text-sm text-text-secondary mt-6 leading-relaxed">
            Pro Market Dashboard is built for one purpose: to help discretionary futures traders trade better through structure, 
            consistency, and discipline. This is not an automated trading system. It&apos;s a structured tool that enforces 
            a professional workflow from daily preparation through post-market review.
          </p>
          <div className="flex items-center justify-center gap-8 mt-10">
            {['Simplicity over complexity', 'Clarity over quantity', 'Execution over prediction', 'Discipline over activity'].map((p) => (
              <div key={p} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 border-t border-border-primary bg-surface-secondary">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tight text-center mb-12">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Is this an automated trading system?', a: 'No. Pro Market Dashboard is a decision-support tool for discretionary traders. You make all trading decisions.' },
              { q: 'What markets does it support?', a: 'Primary focus is S&P 500 (ES) futures with cross-market context from NQ, DXY, Gold, 10Y Yields, and Crude Oil.' },
              { q: 'Can I customize the dashboard?', a: 'Yes. The preset engine lets you create custom configurations for different market conditions and trading styles.' },
              { q: 'How does risk control work?', a: 'You set daily trade limits and max loss thresholds. The system auto-locks trading when limits are reached.' },
            ].map((faq) => (
              <div key={faq.q} className="p-5 bg-surface-card border border-border-primary rounded">
                <h3 className="text-sm font-bold text-text-primary">{faq.q}</h3>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 border-t border-border-primary">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight">Contact</h2>
          <p className="text-sm text-text-muted mt-3 mb-8">Questions or feedback? Reach out.</p>
          <div className="space-y-3">
            <input type="email" placeholder="Your email" className="w-full bg-surface-elevated border border-border-primary rounded px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors" />
            <textarea placeholder="Your message" rows={4} className="w-full bg-surface-elevated border border-border-primary rounded px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors resize-none" />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded text-sm font-bold uppercase tracking-wider transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border-primary">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Pro Market Dashboard</span>
          </div>
          <span className="text-[10px] text-text-muted">© 2026 — Not financial advice. v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
