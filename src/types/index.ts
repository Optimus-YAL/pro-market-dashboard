// ============================================================
// Pro Market Dashboard — Core Types
// ============================================================

export type MarketRegime = 'trending' | 'range-bound' | 'high-volatility' | 'low-volatility';
export type MacroEnvironment = 'risk-on' | 'risk-off' | 'mixed';
export type TradeStatus = 'trade' | 'caution' | 'no-trade';
export type MarketDirection = 'up' | 'down' | 'flat';
export type BiasContribution = 'bullish' | 'bearish' | 'neutral';
export type SessionType = 'tokyo' | 'london' | 'globex';
export type SessionClassification = 'trend-up' | 'trend-down' | 'range' | 'reversal' | 'expansion';
export type CatalystType = 'economic' | 'fed' | 'geopolitical' | 'news';
export type CatalystImpact = 'high' | 'medium' | 'low';
export type ZoneType = 'demand' | 'supply' | 'liquidity-sweep' | 'breakout';
export type SetupGrade = 'A+' | 'B' | 'No Trade';
export type TradeDirection = 'long' | 'short';
export type PresetName = 'default' | 'risk-on' | 'risk-off' | 'trend' | 'range' | 'high-volatility' | 'event-day';
export type EmotionalState = 'focused' | 'confident' | 'anxious' | 'frustrated' | 'calm' | 'distracted';

export interface DailyPrep {
  id: string;
  date: string;
  marketRegime: MarketRegime;
  macroEnv: MacroEnvironment;
  biasScore: number;
  activePreset: PresetName;
  tradeStatus: TradeStatus;
}

export interface KeyLevels {
  pdh?: number;
  pdl?: number;
  pc?: number;
  spikeHigh?: number;
  spikeBase?: number;
  globexHigh?: number;
  globexLow?: number;
  tokyoHigh?: number;
  tokyoLow?: number;
  londonHigh?: number;
  londonLow?: number;
  vwap?: number;
}

export interface MarketContext {
  id: string;
  market: string;
  direction: MarketDirection;
  contribution: BiasContribution;
  notes?: string;
}

export interface SessionSummary {
  id: string;
  session: SessionType;
  classification: SessionClassification;
  notes?: string;
  high?: number;
  low?: number;
}

export interface CatalystEvent {
  id: string;
  type: CatalystType;
  description: string;
  impact: CatalystImpact;
  time?: string;
}

export interface SupplyDemandZone {
  id: string;
  type: ZoneType;
  priceHigh: number;
  priceLow: number;
  priority: number;
  notes?: string;
}

export interface TradeChecklist {
  regimeIdentified: boolean;
  sessionAligned: boolean;
  crossMarketAligned: boolean;
  catalystReviewed: boolean;
  atKeyLevel: boolean;
  confirmationPresent: boolean;
  riskDefined: boolean;
  entryPlanDefined: boolean;
  exitPlanDefined: boolean;
  setupGrade?: SetupGrade;
}

export interface TradePlan {
  id: string;
  date: string;
  dailyBias: string;
  longScenarios: string;
  shortScenarios: string;
  entryZones: string;
  stopLevels: string;
  targetLevels: string;
  invalidation?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  setup: string;
  direction: TradeDirection;
  entry: number;
  exit?: number;
  stop: number;
  target: number;
  pnl?: number;
  notes?: string;
  screenshot?: string;
  lesson?: string;
  pair?: string;
  marketType?: string;
}

export interface ReviewEntry {
  id: string;
  date: string;
  followedPlan: boolean;
  bestTrade?: string;
  worstMistake: string;
  oneImprovement: string;
  emotionalState: EmotionalState;
  executionScore: number;
}

export interface Preset {
  id: string;
  name: PresetName;
  label: string;
  markets: string[];
  panelOrder: string[];
  focusNote?: string;
  cautionNote?: string;
  isDefault: boolean;
}

export interface WorkflowStep {
  id: string;
  label: string;
  completed: boolean;
}

export interface RiskState {
  tradesUsed: number;
  maxTrades: number;
  dailyPnL: number;
  maxDailyLoss: number;
  consecutiveLosses: number;
  lockAfterLosses: number;
  isLocked: boolean;
}
