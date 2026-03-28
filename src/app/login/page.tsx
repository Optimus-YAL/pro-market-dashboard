'use client';

import { useActionState, useState } from 'react';
import { TrendingUp, Mail, Lock, HelpCircle, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { loginAction, signupAction, magicLinkAction } from './actions';
import type { AuthFormState } from '@/lib/auth/validation';

type AuthMode = 'login' | 'signup';

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('login');

  // Form states via useActionState
  const [loginState, loginFormAction, loginPending] = useActionState<AuthFormState, FormData>(loginAction, undefined);
  const [signupState, signupFormAction, signupPending] = useActionState<AuthFormState, FormData>(signupAction, undefined);
  const [magicState, magicFormAction, magicPending] = useActionState<AuthFormState, FormData>(magicLinkAction, undefined);

  const isLogin = mode === 'login';
  const formState = isLogin ? loginState : signupState;
  const isPending = isLogin ? loginPending : signupPending;

  return (
    <div className="flex h-screen overflow-hidden bg-surface-primary">
      {/* Left Panel — Editorial & Brand Narrative */}
      <section className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0d0e10] p-16 relative overflow-hidden">
        {/* Brand Identity */}
        <div className="z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-primary tracking-tighter">Pro Market</span>
          </div>
          <h1 className="text-6xl font-extrabold tracking-tighter leading-tight text-text-primary max-w-xl mb-6">
            Trade with structure. <br />Execute with discipline.
          </h1>
          <p className="text-text-secondary text-lg max-w-md leading-relaxed">
            Access institutional-grade liquidity, advanced order routing, and real-time
            execution analytics within a single, unified workspace.
          </p>
        </div>

        {/* Dashboard Preview with Tonal Architecture */}
        <div className="relative mt-12 z-10 w-full h-full max-h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-black/60 bg-surface-card border-l border-t border-white/[0.04]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf77NHwu5Fpp-dn5wMapTDs49XmYWRKjNx2CyU4GS0zajnhzSP-KlTzMlNr8UkhZkWHqgWUeXX31KObFMD2TDj0lGiClq7QIbiUf_APQqkppO9CBa7AvBZoshosCrQNQs3kckkkXskbpteSCNrqtrc2JwYqaVlD3PkXnVC2aqeAqmLIUrusB_hqjmtE0fylCqCb3_nTyCZxrSbPnB_S13e8YIFZ8i2wFdXD1YMyu2a8H7zRc9ED29YnGpEha6aLqVtW7ICjGJ-Vr1S"
            alt="Professional dark themed financial dashboard with glowing primary candlesticks and analytical data charts"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e10] via-transparent to-transparent" />
        </div>

        {/* Ambient Background Glow */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </section>

      {/* Right Panel — Interaction Hub */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-primary relative">
        {/* Support link */}
        <div className="absolute top-8 right-8 flex gap-4">
          <button className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Support
          </button>
        </div>

        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-black uppercase tracking-tight">Pro Market</span>
          </div>

          {/* Auth Module */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              {!isLogin && (
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors mb-4"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back to Sign In
                </button>
              )}
              <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-text-muted text-sm">
                {isLogin
                  ? 'Sign in to access your dashboard.'
                  : 'Set up your trading workspace.'}
              </p>
            </div>

            {/* Error / Success Messages */}
            {formState?.message && !formState?.success && (
              <div className="p-4 bg-error/10 border border-error/20 text-error text-sm rounded-sm font-medium animate-fade-in-up">
                {formState.message}
              </div>
            )}

            {/* ─── Login / Signup Form ─── */}
            <form className="space-y-5" key={mode}>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1" htmlFor="email">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-muted/50" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@institution.com"
                    className="w-full bg-surface-elevated border-none rounded-sm py-3.5 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-primary transition-all outline-none"
                  />
                </div>
                {formState?.errors?.email && (
                  <p className="text-xs text-error ml-1">{formState.errors.email[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted" htmlFor="password">
                    {isLogin ? 'Security Key' : 'Password'}
                  </label>
                  {isLogin && (
                    <button type="button" className="text-xs text-primary hover:underline">
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-muted/50" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={isLogin ? undefined : 8}
                    placeholder="••••••••••••"
                    className="w-full bg-surface-elevated border-none rounded-sm py-3.5 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-primary transition-all outline-none"
                  />
                </div>
                {formState?.errors?.password && (
                  <div className="ml-1 space-y-1">
                    {formState.errors.password.map((err) => (
                      <p key={err} className="text-xs text-error">{err}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password — Signup only */}
              {!isLogin && (
                <div className="space-y-2 animate-fade-in-up">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-text-muted/50" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder="••••••••••••"
                      className="w-full bg-surface-elevated border-none rounded-sm py-3.5 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-primary transition-all outline-none"
                    />
                  </div>
                  {formState?.errors?.confirmPassword && (
                    <p className="text-xs text-error ml-1">{formState.errors.confirmPassword[0]}</p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {isLogin ? (
                  <>
                    <button
                      formAction={loginFormAction}
                      disabled={isPending}
                      className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-primary to-orange-600 text-white font-bold rounded-sm tracking-tight hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loginPending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        'Sign In'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="w-full flex items-center justify-center py-4 bg-surface-elevated/50 text-text-primary font-bold rounded-sm tracking-tight hover:bg-surface-elevated active:scale-[0.98] transition-all border border-white/[0.04]"
                    >
                      Create Account
                    </button>
                  </>
                ) : (
                  <button
                    formAction={signupFormAction}
                    disabled={isPending}
                    className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-primary to-orange-600 text-white font-bold rounded-sm tracking-tight hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {signupPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Create Account'
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.04]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-surface-primary px-4 text-text-muted">Alternative Access</span>
              </div>
            </div>

            {/* Magic Link */}
            <form>
              <input type="hidden" name="magicLinkEmail" id="magicLinkEmailHidden" />
              <button
                formAction={magicFormAction}
                disabled={magicPending}
                type="submit"
                onClick={(e) => {
                  // Copy the email from the main form into the magic link form
                  const emailInput = document.getElementById('email') as HTMLInputElement;
                  const hidden = document.getElementById('magicLinkEmailHidden') as HTMLInputElement;
                  if (emailInput && hidden) {
                    hidden.value = emailInput.value;
                  }
                  if (!emailInput?.value) {
                    e.preventDefault();
                    emailInput?.focus();
                  }
                }}
                className="w-full py-3.5 bg-surface-card text-text-primary text-sm font-medium rounded-sm border border-white/[0.03] hover:bg-surface-elevated transition-colors flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
              >
                {magicPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {magicPending ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>

            {/* Magic Link Success */}
            {magicState?.success && (
              <div className="p-4 bg-accent/10 border border-accent/20 text-accent text-sm rounded-sm font-medium animate-fade-in-up">
                ✓ {magicState.message}
              </div>
            )}
            {magicState?.message && !magicState?.success && (
              <div className="p-4 bg-error/10 border border-error/20 text-error text-sm rounded-sm font-medium animate-fade-in-up">
                {magicState.message}
              </div>
            )}
          </div>

          {/* Footer Meta */}
          <div className="mt-20 flex justify-center gap-6 opacity-40">
            <span className="text-[10px] uppercase tracking-widest">SLA Compliant</span>
            <span className="text-[10px] uppercase tracking-widest">SOC2 Type II</span>
            <span className="text-[10px] uppercase tracking-widest">256-bit Encryption</span>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-surface-card/80 backdrop-blur-xl rounded-xl p-4 flex items-center justify-between shadow-2xl z-50 border border-white/[0.05]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Security Layer</span>
        </div>
        <button className="text-xs text-primary font-bold">Help Center</button>
      </div>
    </div>
  );
}
