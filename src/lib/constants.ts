// ============================================================
// Pro Market Dashboard — Constants & Sample Data
// ============================================================
import {
  MarketContext, SessionSummary, CatalystEvent, SupplyDemandZone,
  KeyLevels, DailyPrep, TradePlan, JournalEntry, ReviewEntry,
  Preset, TradeChecklist, WorkflowStep, RiskState
} from '@/types';

// ─── Color Tokens ───────────────────────────────────────────
export const STATUS_COLORS = {
  bullish:  { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
  bearish:  { bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-500/30',     dot: 'bg-red-400' },
  caution:  { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/30',   dot: 'bg-amber-400' },
  neutral:  { bg: 'bg-slate-500/10',   text: 'text-slate-400',   border: 'border-slate-500/30',   dot: 'bg-slate-400' },
  active:   { bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-500/30',    dot: 'bg-blue-400' },
} as const;

// ─── Nav Items ──────────────────────────────────────────────
export const NAV_ITEMS = [
  { href: '/dashboard',       label: 'Dashboard',   icon: 'LayoutDashboard' },
  { href: '/dashboard/prep',  label: 'Daily Prep',  icon: 'ClipboardList' },
  { href: '/dashboard/sessions', label: 'Sessions', icon: 'Clock' },
  { href: '/dashboard/plan',  label: 'Trade Plan',  icon: 'Target' },
  { href: '/dashboard/journal', label: 'Journal',   icon: 'BookOpen' },
  { href: '/dashboard/review', label: 'Review',     icon: 'BarChart3' },
  { href: '/dashboard/presets', label: 'Presets',   icon: 'Layers' },
  { href: '/dashboard/settings', label: 'Settings', icon: 'Settings' },
] as const;

// ─── Sample: Daily Prep ─────────────────────────────────────
export const SAMPLE_DAILY_PREP: DailyPrep = {
  id: '1',
  date: new Date().toISOString().split('T')[0],
  marketRegime: 'trending',
  macroEnv: 'risk-on',
  biasScore: 3,
  activePreset: 'default',
  tradeStatus: 'trade',
};

// ─── Sample: Key Levels ─────────────────────────────────────
export const SAMPLE_KEY_LEVELS: KeyLevels = {
  pdh: 5285.75,
  pdl: 5251.00,
  pc: 5268.50,
  spikeHigh: 5292.00,
  spikeBase: 5278.00,
  globexHigh: 5289.25,
  globexLow: 5260.50,
  tokyoHigh: 5275.00,
  tokyoLow: 5262.50,
  londonHigh: 5282.00,
  londonLow: 5258.75,
  vwap: 5271.30,
};

// ─── Sample: Markets ────────────────────────────────────────
export const SAMPLE_MARKETS: MarketContext[] = [
  { id: '1', market: 'S&P 500 (ES)',  direction: 'up',   contribution: 'bullish', notes: 'Holding above VWAP' },
  { id: '2', market: 'Nasdaq (NQ)',   direction: 'up',   contribution: 'bullish', notes: 'Leading with tech strength' },
  { id: '3', market: 'DXY',           direction: 'down', contribution: 'bullish', notes: 'Dollar weakness supports equities' },
  { id: '4', market: 'Gold',          direction: 'up',   contribution: 'neutral', notes: 'Safe haven bid present' },
  { id: '5', market: '10Y Yield',     direction: 'down', contribution: 'bullish', notes: 'Yields falling, risk-on signal' },
  { id: '6', market: 'Crude Oil',     direction: 'flat', contribution: 'neutral', notes: 'Consolidating near $78' },
];

// ─── Sample: Sessions ───────────────────────────────────────
export const SAMPLE_SESSIONS: SessionSummary[] = [
  { id: '1', session: 'tokyo',  classification: 'range',    high: 5275.00, low: 5262.50, notes: 'Quiet session, tight range' },
  { id: '2', session: 'london', classification: 'trend-up', high: 5282.00, low: 5258.75, notes: 'Broke above Tokyo range' },
  { id: '3', session: 'globex', classification: 'trend-up', high: 5289.25, low: 5260.50, notes: 'Follow-through from London' },
];

// ─── Sample: Catalysts ──────────────────────────────────────
export const SAMPLE_CATALYSTS: CatalystEvent[] = [
  { id: '1', type: 'economic', description: 'CPI Data Release', impact: 'high', time: '08:30 ET' },
  { id: '2', type: 'fed',      description: 'Fed Chair Speech', impact: 'high', time: '14:00 ET' },
  { id: '3', type: 'economic', description: 'Initial Jobless Claims', impact: 'medium', time: '08:30 ET' },
];

// ─── Sample: Supply/Demand ──────────────────────────────────
export const SAMPLE_ZONES: SupplyDemandZone[] = [
  { id: '1', type: 'demand',   priceHigh: 5265.00, priceLow: 5258.00, priority: 1, notes: 'Strong demand zone — prev session low' },
  { id: '2', type: 'supply',   priceHigh: 5295.00, priceLow: 5290.00, priority: 1, notes: 'Overhead supply — prev week high' },
  { id: '3', type: 'breakout', priceHigh: 5285.00, priceLow: 5283.00, priority: 2, notes: 'Breakout level — PDH' },
];

// ─── Sample: Checklist ──────────────────────────────────────
export const SAMPLE_CHECKLIST: TradeChecklist = {
  regimeIdentified: true,
  sessionAligned: true,
  crossMarketAligned: true,
  catalystReviewed: true,
  atKeyLevel: false,
  confirmationPresent: false,
  riskDefined: false,
  entryPlanDefined: false,
  exitPlanDefined: false,
};

// ─── Sample: Trade Plan ─────────────────────────────────────
export const SAMPLE_TRADE_PLAN: TradePlan = {
  id: '1',
  date: new Date().toISOString().split('T')[0],
  dailyBias: 'Cautiously bullish — trending regime with risk-on macro, but CPI risk ahead',
  longScenarios: 'Buy pullback to 5265 demand zone if held with volume confirmation. Target 5285 PDH then 5295.',
  shortScenarios: 'Short rejection at 5295 supply if ES fails to hold above with divergence. Target 5275.',
  entryZones: '5265 demand, 5295 supply',
  stopLevels: '5255 for longs, 5300 for shorts',
  targetLevels: '5285, 5295 for longs. 5275, 5260 for shorts.',
  invalidation: 'CPI surprise causes gap move beyond all levels',
};

// ─── Sample: Journal ────────────────────────────────────────
export const SAMPLE_JOURNAL_ENTRIES: JournalEntry[] = [
  { id: '1', date: '2026-03-26', setup: 'Demand Zone Bounce', direction: 'long', entry: 5265.25, exit: 5283.50, stop: 5258.00, target: 5285.00, pnl: 912.50, notes: 'Clean entry at demand. Exited near PDH.', lesson: 'Trust the level — don\'t second-guess.' },
  { id: '2', date: '2026-03-26', setup: 'Supply Rejection', direction: 'short', entry: 5293.00, exit: 5288.50, stop: 5300.00, target: 5275.00, pnl: 225.00, notes: 'Partial fill. Exited early on bounce.', lesson: 'Let runners run — scale out properly.' },
  { id: '3', date: '2026-03-25', setup: 'VWAP Reclaim', direction: 'long', entry: 5248.00, exit: 5240.00, stop: 5242.00, target: 5265.00, pnl: -400.00, notes: 'Stopped out. VWAP reclaim failed.', lesson: 'Avoid fighting the trend after failed reclaim.' },
];

// ─── Sample: Review ─────────────────────────────────────────
export const SAMPLE_REVIEW: ReviewEntry = {
  id: '1',
  date: '2026-03-26',
  followedPlan: true,
  bestTrade: 'Demand zone bounce — clean execution, held for target',
  worstMistake: 'Early exit on short — left $600 on the table',
  oneImprovement: 'Use scaling exits instead of all-or-nothing',
  emotionalState: 'focused',
  executionScore: 8,
};

// ─── Sample: Presets ────────────────────────────────────────
export const SAMPLE_PRESETS: Preset[] = [
  { id: '1', name: 'default', label: 'Default', markets: ['ES', 'NQ', 'DXY', 'Gold', '10Y', 'Oil'], panelOrder: ['overview', 'levels', 'markets', 'sessions', 'catalysts', 'zones'], focusNote: 'Standard market analysis flow', cautionNote: 'Review all panels before trading', isDefault: true },
  { id: '2', name: 'risk-on', label: 'Risk-On', markets: ['ES', 'NQ', 'DXY', '10Y'], panelOrder: ['overview', 'markets', 'levels', 'sessions', 'catalysts', 'zones'], focusNote: 'Focus on equity momentum and yield direction', cautionNote: 'Watch for reversal signals in correlations', isDefault: false },
  { id: '3', name: 'risk-off', label: 'Risk-Off', markets: ['ES', 'Gold', 'DXY', '10Y', 'Oil'], panelOrder: ['catalysts', 'overview', 'markets', 'levels', 'sessions', 'zones'], focusNote: 'Defense first — watch safe havens and VIX', cautionNote: 'Reduce size. Tighter stops.', isDefault: false },
  { id: '4', name: 'trend', label: 'Trend Day', markets: ['ES', 'NQ'], panelOrder: ['overview', 'sessions', 'levels', 'markets', 'catalysts', 'zones'], focusNote: 'Follow the trend. Add on pullbacks.', cautionNote: 'Don\'t fade trend days.', isDefault: false },
  { id: '5', name: 'range', label: 'Range Day', markets: ['ES', 'NQ', 'Oil'], panelOrder: ['levels', 'zones', 'overview', 'sessions', 'markets', 'catalysts'], focusNote: 'Fade extremes. Trade S/D zones.', cautionNote: 'Avoid breakout traps in ranges.', isDefault: false },
  { id: '6', name: 'high-volatility', label: 'High Volatility', markets: ['ES', 'NQ', 'Gold', 'DXY'], panelOrder: ['catalysts', 'overview', 'markets', 'levels', 'zones', 'sessions'], focusNote: 'Wider stops. Smaller size. Wait for clarity.', cautionNote: 'High vol = high risk. Stay disciplined.', isDefault: false },
  { id: '7', name: 'event-day', label: 'Event Day', markets: ['ES', 'NQ', 'DXY', '10Y', 'Gold'], panelOrder: ['catalysts', 'overview', 'markets', 'sessions', 'levels', 'zones'], focusNote: 'Pre-event: reduce. Post-event: wait for setup.', cautionNote: 'FOMC/CPI. Do not trade into the number.', isDefault: false },
];

// ─── Workflow Steps ─────────────────────────────────────────
export const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: 'context', label: 'Context', completed: false },
  { id: 'levels',  label: 'Levels',  completed: false },
  { id: 'bias',    label: 'Bias',    completed: false },
  { id: 'plan',    label: 'Plan',    completed: false },
  { id: 'ready',   label: 'Ready',   completed: false },
];

// ─── Risk State ─────────────────────────────────────────────
export const INITIAL_RISK_STATE: RiskState = {
  tradesUsed: 0,
  maxTrades: 3,
  dailyPnL: 0,
  maxDailyLoss: -1500,
  consecutiveLosses: 0,
  lockAfterLosses: 2,
  isLocked: false,
};

// ─── Label Maps ─────────────────────────────────────────────
export const REGIME_LABELS: Record<string, string> = {
  'trending': 'Trending',
  'range-bound': 'Range-Bound',
  'high-volatility': 'High Volatility',
  'low-volatility': 'Low Volatility',
};

export const MACRO_LABELS: Record<string, string> = {
  'risk-on': 'Risk-On',
  'risk-off': 'Risk-Off',
  'mixed': 'Mixed',
};

export const TRADE_STATUS_LABELS: Record<string, string> = {
  'trade': 'TRADE',
  'caution': 'CAUTION',
  'no-trade': 'NO TRADE',
};
