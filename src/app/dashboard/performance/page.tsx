'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/* ───────────────────────────────────────────────
   Tab data types
   ─────────────────────────────────────────────── */
type TimeFrame = '1H' | '4H' | '1D' | '1W';

interface CalendarEvent {
  month: string;
  day: string;
  title: string;
  subtitle: string;
  severity: 'high' | 'medium' | 'low';
}

interface Correlation {
  name: string;
  ticker: string;
  value: number;
  price: string;
  change: string;
  direction: 'up' | 'down';
  icon: string;
}

/* ───────────────────────────────────────────────
   Static data
   ─────────────────────────────────────────────── */
const CALENDAR_EVENTS: CalendarEvent[] = [
  { month: 'MAR', day: '15', title: 'Non-Farm Payrolls', subtitle: 'Forecast: 200K', severity: 'high' },
  { month: 'MAR', day: '18', title: 'Core CPI (MoM)', subtitle: 'Forecast: 0.3%', severity: 'high' },
  { month: 'MAR', day: '20', title: 'Fed Decision', subtitle: 'Forecast: 5.50%', severity: 'high' },
  { month: 'MAR', day: '22', title: 'PMI Manufacturing', subtitle: 'Forecast: 49.5', severity: 'medium' },
  { month: 'APR', day: '01', title: 'ISM Services', subtitle: 'Forecast: 52.8', severity: 'medium' },
];

const CORRELATIONS: Correlation[] = [
  { name: 'Currency Gold', ticker: 'XAUUSD', value: -0.78, price: '2,156.40', change: '+0.42%', direction: 'up', icon: 'toll' },
  { name: 'DXY (USD)', ticker: 'DXY', value: -0.82, price: '102.84', change: '-0.71%', direction: 'down', icon: 'currency_exchange' },
  { name: 'US 10Y Yield', ticker: 'TNX', value: 0.65, price: '4.28%', change: '+0.03', direction: 'up', icon: 'trending_up' },
  { name: 'Crude Oil', ticker: 'CL', value: 0.41, price: '78.52', change: '-1.12%', direction: 'down', icon: 'local_gas_station' },
];

/* Candlestick data for charts */
const CANDLE_DATA_1H = [
  { o: 5120, h: 5128, l: 5115, c: 5125 },
  { o: 5125, h: 5133, l: 5121, c: 5130 },
  { o: 5130, h: 5132, l: 5118, c: 5120 },
  { o: 5120, h: 5126, l: 5112, c: 5114 },
  { o: 5114, h: 5122, l: 5110, c: 5119 },
  { o: 5119, h: 5131, l: 5116, c: 5128 },
  { o: 5128, h: 5138, l: 5125, c: 5135 },
  { o: 5135, h: 5140, l: 5129, c: 5132 },
  { o: 5132, h: 5137, l: 5124, c: 5126 },
  { o: 5126, h: 5130, l: 5118, c: 5120 },
  { o: 5120, h: 5128, l: 5117, c: 5125 },
  { o: 5125, h: 5136, l: 5122, c: 5134 },
  { o: 5134, h: 5142, l: 5130, c: 5139 },
  { o: 5139, h: 5145, l: 5135, c: 5137 },
  { o: 5137, h: 5140, l: 5128, c: 5130 },
  { o: 5130, h: 5135, l: 5125, c: 5133 },
  { o: 5133, h: 5140, l: 5129, c: 5138 },
  { o: 5138, h: 5142, l: 5130, c: 5132 },
  { o: 5132, h: 5138, l: 5127, c: 5135 },
  { o: 5135, h: 5143, l: 5132, c: 5140 },
  { o: 5140, h: 5145, l: 5136, c: 5137 },
];

const CANDLE_DATA_4H = [
  { o: 5080, h: 5095, l: 5072, c: 5090 },
  { o: 5090, h: 5105, l: 5085, c: 5100 },
  { o: 5100, h: 5112, l: 5092, c: 5095 },
  { o: 5095, h: 5110, l: 5088, c: 5108 },
  { o: 5108, h: 5120, l: 5102, c: 5115 },
  { o: 5115, h: 5128, l: 5110, c: 5125 },
  { o: 5125, h: 5138, l: 5118, c: 5120 },
  { o: 5120, h: 5135, l: 5115, c: 5133 },
  { o: 5133, h: 5145, l: 5128, c: 5140 },
  { o: 5140, h: 5148, l: 5132, c: 5137 },
];

const CANDLE_DATA_1D = [
  { o: 5020, h: 5045, l: 5010, c: 5040 },
  { o: 5040, h: 5058, l: 5032, c: 5050 },
  { o: 5050, h: 5062, l: 5040, c: 5042 },
  { o: 5042, h: 5070, l: 5038, c: 5065 },
  { o: 5065, h: 5085, l: 5058, c: 5080 },
  { o: 5080, h: 5100, l: 5070, c: 5095 },
  { o: 5095, h: 5120, l: 5088, c: 5115 },
  { o: 5115, h: 5130, l: 5105, c: 5125 },
  { o: 5125, h: 5142, l: 5118, c: 5137 },
];

const CANDLE_DATA_1W = [
  { o: 4920, h: 4985, l: 4900, c: 4970 },
  { o: 4970, h: 5020, l: 4950, c: 5010 },
  { o: 5010, h: 5055, l: 4995, c: 5040 },
  { o: 5040, h: 5090, l: 5025, c: 5080 },
  { o: 5080, h: 5145, l: 5065, c: 5137 },
];

const CANDLE_MAP: Record<TimeFrame, typeof CANDLE_DATA_1H> = {
  '1H': CANDLE_DATA_1H,
  '4H': CANDLE_DATA_4H,
  '1D': CANDLE_DATA_1D,
  '1W': CANDLE_DATA_1W,
};

/* EMA line data (approximate) */
const EMA_200_VALUE = 5042.15;

/* Breadth data */
const BREADTH_BAR_DATA = [62, 55, 70, 48, 80, 65, 72, 58, 85, 60, 75, 50, 68, 78, 45, 82, 55, 90, 40, 75, 65, 88, 52, 70, 60, 72, 80, 45, 85, 58, 75, 62, 68, 55, 78, 42, 90, 65, 72, 55];

/* Oscillator data */
const OSCILLATORS = [
  { name: 'RSI (14)', value: 62.4, signal: 'Neutral', min: 0, max: 100, zones: { oversold: 30, overbought: 70 } },
  { name: 'MACD', value: 12.8, signal: 'Bullish', signalType: 'bullish' as const },
  { name: 'Stochastic %K', value: 78.2, signal: 'Overbought', min: 0, max: 100, zones: { oversold: 20, overbought: 80 } },
  { name: 'ADX', value: 28.5, signal: 'Trending', min: 0, max: 50 },
  { name: 'CCI (20)', value: 145, signal: 'Bullish', min: -200, max: 200 },
  { name: 'Williams %R', value: -18.5, signal: 'Overbought', min: -100, max: 0 },
];

/* ───────────────────────────────────────────────
   Component
   ─────────────────────────────────────────────── */
export default function PerformancePage() {
  const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>('1H');
  const [activeChartTool, setActiveChartTool] = useState<string>('cursor');

  const timeFrames: TimeFrame[] = ['1H', '4H', '1D', '1W'];
  const chartTools = [
    { id: 'cursor', icon: 'edit' },
    { id: 'crosshair', icon: 'settings' },
    { id: 'layers', icon: 'layers' },
    { id: 'fullscreen', icon: 'fullscreen' },
  ];

  const candles = CANDLE_MAP[activeTimeFrame];
  const allPrices = candles.flatMap(c => [c.h, c.l]);
  const chartMin = Math.min(...allPrices);
  const chartMax = Math.max(...allPrices);
  const chartRange = chartMax - chartMin || 1;

  /* SVG dimensions */
  const svgW = 700;
  const svgH = 380;
  const paddingTop = 20;
  const paddingBottom = 30;
  const barW = Math.max(6, Math.min(24, (svgW - 60) / candles.length - 4));
  const drawH = svgH - paddingTop - paddingBottom;

  const priceToY = (price: number) => paddingTop + drawH - ((price - chartMin) / chartRange) * drawH;

  /* Sentiment */
  const sentimentScore = 82;
  const sentimentLabel = sentimentScore > 75 ? 'EXTREME GREED' : sentimentScore > 50 ? 'GREED' : sentimentScore > 25 ? 'NEUTRAL' : 'FEAR';

  return (
    <div className="animate-fade-in-up pb-8">
      {/* ─── TICKER BAR ─── */}
      <section className="flex flex-wrap items-start gap-6 lg:gap-0 mb-6">
        {/* Left: Index Info */}
        <div className="flex-1 min-w-[300px]">
          <div className="bg-surface-secondary p-6 rounded-lg border border-white/[0.04]">
            <div className="flex flex-wrap items-end gap-8">
              {/* Price Block */}
              <div>
                <h2 className="text-[0.6875rem] font-black uppercase tracking-[0.2em] text-text-muted mb-1">S&P 500 INDEX (SPX)</h2>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-black font-headline text-text-primary tracking-tighter">5,137.08</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-bullish">
                      <span className="inline-block mr-1">↗</span>+42.12
                    </span>
                    <span className="text-xs font-bold text-bullish">(0.82%)</span>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="h-12 w-px bg-white/[0.06] hidden sm:block" />

              {/* Day Range */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Day Range</span>
                <span className="text-sm font-bold text-text-primary font-mono">5,123.44 -</span>
                <span className="text-sm font-bold text-text-primary font-mono">5,140.02</span>
              </div>

              {/* Volume */}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Volume</span>
                <span className="text-lg font-black text-text-primary font-mono">3.24B</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN GRID ─── */}
      <div className="grid grid-cols-12 gap-6">
        {/* ─── LEFT: CHART AREA (col-span-8) ─── */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
          {/* Chart Card */}
          <div className="bg-surface-secondary rounded-lg border border-white/[0.04] overflow-hidden">
            {/* Time Frame Tabs + Tools */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-1">
                {timeFrames.map(tf => (
                  <button
                    key={tf}
                    onClick={() => setActiveTimeFrame(tf)}
                    className={cn(
                      'px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200',
                      activeTimeFrame === tf
                        ? 'bg-accent text-on-accent shadow-[0_0_12px_rgba(184,195,255,0.2)]'
                        : 'text-text-muted hover:text-text-primary hover:bg-surface-card'
                    )}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {chartTools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveChartTool(tool.id)}
                    className={cn(
                      'w-8 h-8 flex items-center justify-center rounded-sm transition-colors',
                      activeChartTool === tool.id
                        ? 'text-accent bg-accent/10'
                        : 'text-text-muted hover:text-text-primary hover:bg-surface-card'
                    )}
                  >
                    <span className="material-symbols-outlined text-lg">{tool.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Area */}
            <div className="p-5 relative">
              {/* EMA Badge */}
              <div className="absolute top-8 left-8 z-10 bg-surface-card/80 backdrop-blur-sm border border-white/[0.06] px-3 py-1.5 rounded-sm">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">EMA 200</span>
                <span className="text-sm font-bold text-accent font-mono">{EMA_200_VALUE.toFixed(2)}</span>
              </div>

              {/* Main SVG Chart */}
              <div className="w-full overflow-hidden" style={{ minHeight: '380px' }}>
                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  {/* Background Grid */}
                  {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                    const y = paddingTop + drawH * pct;
                    const price = chartMax - pct * chartRange;
                    return (
                      <g key={i}>
                        <line x1="40" y1={y} x2={svgW - 10} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                        <text x="35" y={y + 3} fill="rgba(255,255,255,0.2)" fontSize="8" textAnchor="end" fontFamily="monospace">{price.toFixed(0)}</text>
                      </g>
                    );
                  })}

                  {/* EMA 200 Line */}
                  {EMA_200_VALUE >= chartMin && EMA_200_VALUE <= chartMax && (
                    <line
                      x1="40"
                      y1={priceToY(EMA_200_VALUE)}
                      x2={svgW - 10}
                      y2={priceToY(EMA_200_VALUE)}
                      stroke="var(--color-accent)"
                      strokeWidth="1"
                      strokeDasharray="6 3"
                      opacity="0.5"
                    />
                  )}

                  {/* Candlesticks */}
                  {candles.map((c, i) => {
                    const x = 50 + i * ((svgW - 70) / candles.length) + ((svgW - 70) / candles.length - barW) / 2;
                    const isBullish = c.c >= c.o;
                    const bodyTop = priceToY(Math.max(c.o, c.c));
                    const bodyBot = priceToY(Math.min(c.o, c.c));
                    const bodyH = Math.max(1, bodyBot - bodyTop);
                    const wickX = x + barW / 2;
                    return (
                      <g key={i}>
                        {/* Wick */}
                        <line
                          x1={wickX} y1={priceToY(c.h)}
                          x2={wickX} y2={priceToY(c.l)}
                          stroke={isBullish ? 'var(--color-bullish)' : 'var(--color-error)'}
                          strokeWidth="1"
                        />
                        {/* Body */}
                        <rect
                          x={x} y={bodyTop}
                          width={barW} height={bodyH}
                          fill={isBullish ? 'var(--color-bullish)' : 'var(--color-error)'}
                          opacity={0.85}
                          rx="1"
                        />
                      </g>
                    );
                  })}

                  {/* Volume bars at bottom */}
                  {candles.map((c, i) => {
                    const x = 50 + i * ((svgW - 70) / candles.length) + ((svgW - 70) / candles.length - barW) / 2;
                    const volH = 8 + (Math.abs(Math.sin((c.o + c.c) * (i + 1)))) * 25;
                    const isBullish = c.c >= c.o;
                    return (
                      <rect
                        key={`vol-${i}`}
                        x={x} y={svgH - paddingBottom - volH}
                        width={barW} height={volH}
                        fill={isBullish ? 'var(--color-bullish)' : 'var(--color-error)'}
                        opacity={0.15}
                        rx="1"
                      />
                    );
                  })}

                  {/* Time labels */}
                  {candles.map((_, i) => {
                    if (i % Math.max(1, Math.floor(candles.length / 6)) !== 0) return null;
                    const x = 50 + i * ((svgW - 70) / candles.length) + ((svgW - 70) / candles.length) / 2;
                    const labels: Record<TimeFrame, string[]> = {
                      '1H': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
                      '4H': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                      '1D': ['Mar 1', 'Mar 5', 'Mar 10', 'Mar 15', 'Mar 20', 'Mar 25'],
                      '1W': ['Feb', 'Mar', 'Apr'],
                    };
                    const labelSet = labels[activeTimeFrame];
                    const labelIdx = Math.floor(i / Math.max(1, Math.floor(candles.length / labelSet.length)));
                    const label = labelSet[Math.min(labelIdx, labelSet.length - 1)];
                    return (
                      <text key={`t-${i}`} x={x} y={svgH - 5} fill="rgba(255,255,255,0.2)" fontSize="8" textAnchor="middle" fontFamily="monospace">
                        {label}
                      </text>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* ─── BOTTOM ROW: Market Breadth + Oscillators ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Breadth */}
            <div className="bg-surface-secondary p-5 rounded-lg border border-white/[0.04]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[0.6875rem] font-black uppercase tracking-[0.15em] text-text-muted">Market Breadth (A/D)</h3>
                <span className="text-[10px] font-bold text-bullish uppercase">Advancing</span>
              </div>
              <div className="flex items-end gap-[2px] h-24">
                {BREADTH_BAR_DATA.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all duration-300"
                    style={{
                      height: `${v}%`,
                      backgroundColor: v > 60 ? 'var(--color-bullish)' : v > 40 ? 'var(--color-accent)' : 'var(--color-error)',
                      opacity: 0.4 + (v / 100) * 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[9px] text-text-muted font-mono uppercase">
                <span>A/D Ratio: <span className="text-bullish font-bold">1.82</span></span>
                <span>New Highs: <span className="text-text-primary font-bold">142</span></span>
                <span>New Lows: <span className="text-error font-bold">38</span></span>
              </div>
            </div>

            {/* Technical Oscillators */}
            <div className="bg-surface-secondary p-5 rounded-lg border border-white/[0.04]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[0.6875rem] font-black uppercase tracking-[0.15em] text-text-muted">Technical Oscillators</h3>
                <span className="text-[10px] font-bold text-accent uppercase">6 Indicators</span>
              </div>
              <div className="space-y-3">
                {OSCILLATORS.map((osc) => {
                  const isBullish = osc.signal === 'Bullish' || osc.signal === 'Trending';
                  const isBearish = osc.signal === 'Overbought';
                  return (
                    <div key={osc.name} className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-secondary w-28 truncate">{osc.name}</span>
                      <div className="flex-1 mx-3 h-1 bg-surface-elevated rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            isBullish ? 'bg-bullish' : isBearish ? 'bg-caution' : 'bg-accent'
                          )}
                          style={{
                            width: osc.min !== undefined && osc.max !== undefined
                              ? `${((osc.value - osc.min) / (osc.max - osc.min)) * 100}%`
                              : '50%'
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold font-mono text-text-primary w-14 text-right">{typeof osc.value === 'number' ? osc.value.toFixed(1) : osc.value}</span>
                      <span className={cn(
                        'text-[9px] font-bold uppercase ml-2 px-1.5 py-0.5 rounded-sm w-20 text-center',
                        isBullish ? 'text-bullish bg-bullish/10' : isBearish ? 'text-caution bg-caution/10' : 'text-text-muted bg-surface-card'
                      )}>
                        {osc.signal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANELS (col-span-4) ─── */}
        <aside className="col-span-12 xl:col-span-4 flex flex-col gap-6">
          {/* Market Sentiment */}
          <div className="bg-surface-secondary p-6 rounded-lg border border-white/[0.04]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[0.6875rem] font-black uppercase tracking-[0.15em] text-text-muted">Market Sentiment</h3>
              <div className="flex flex-col items-end">
                <span className="text-3xl font-black text-text-primary font-headline">{sentimentScore}</span>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Score</span>
              </div>
            </div>

            <span className="text-lg font-black text-bullish uppercase tracking-wider font-headline block mb-4">{sentimentLabel}</span>

            {/* Gauge Bar */}
            <div className="relative h-3 w-full rounded-full overflow-hidden mb-3"
              style={{ background: 'linear-gradient(to right, #ef4444, #f59e0b, #4ade80, #22c55e)' }}>
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-surface-primary shadow-lg transition-all duration-500"
                style={{ left: `calc(${sentimentScore}% - 8px)` }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-bold text-text-muted uppercase tracking-widest">
              <span>Fear</span>
              <span>Neutral</span>
              <span>Greed</span>
            </div>
          </div>

          {/* Economic Calendar */}
          <div className="bg-surface-secondary p-6 rounded-lg border border-white/[0.04]">
            <h3 className="text-[0.6875rem] font-black uppercase tracking-[0.15em] text-text-muted mb-5">Economic Calendar</h3>
            <div className="space-y-4">
              {CALENDAR_EVENTS.map((event, i) => (
                <div key={i} className="flex items-center gap-4">
                  {/* Date Block */}
                  <div className="flex flex-col items-center min-w-[40px]">
                    <span className="text-[9px] font-bold text-text-muted uppercase">{event.month}</span>
                    <span className="text-xl font-black text-text-primary font-headline">{event.day}</span>
                  </div>
                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-text-primary truncate">{event.title}</p>
                    <p className="text-[10px] text-text-muted">{event.subtitle}</p>
                  </div>
                  {/* Severity Dots */}
                  <div className="flex gap-1">
                    {[0, 1, 2].map(dot => (
                      <div
                        key={dot}
                        className={cn(
                          'w-2 h-2 rounded-full',
                          event.severity === 'high' ? 'bg-error' :
                          event.severity === 'medium' ? 'bg-caution' : 'bg-text-muted',
                          dot > (event.severity === 'high' ? 2 : event.severity === 'medium' ? 1 : 0) && 'opacity-20'
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Correlations */}
          <div className="bg-surface-secondary p-6 rounded-lg border border-white/[0.04]">
            <h3 className="text-[0.6875rem] font-black uppercase tracking-[0.15em] text-text-muted mb-5">Critical Correlations</h3>

            {/* Correlation Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {CORRELATIONS.slice(0, 2).map((corr, i) => (
                <div key={i} className="bg-surface-card p-3 rounded-sm border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-accent text-sm">{corr.icon}</span>
                    <span className="text-[9px] font-bold text-text-muted uppercase">{corr.ticker}</span>
                  </div>
                  <p className="text-lg font-black text-text-primary font-headline tracking-tight truncate">{corr.name.toUpperCase().replace(' ', '_')}</p>
                </div>
              ))}
            </div>

            {/* Correlation List */}
            <div className="space-y-3">
              {CORRELATIONS.map((corr, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent text-base">{corr.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-text-primary">{corr.name}</p>
                      <p className="text-[10px] text-text-muted">{corr.value.toFixed(2)} Correlation</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={cn(
                      'text-xs font-bold font-mono',
                      corr.direction === 'down' ? 'text-error' : 'text-bullish'
                    )}>
                      {corr.direction === 'down' ? '↓' : '↑'} {corr.price}
                    </span>
                    <span className={cn(
                      'text-[10px] font-bold',
                      corr.direction === 'down' ? 'text-error' : 'text-bullish'
                    )}>
                      {corr.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
