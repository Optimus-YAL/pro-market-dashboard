import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Filter, SortDesc, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPnL } from "@/lib/utils";
import { EquityChart, ChartData } from "@/components/dashboard/EquityChart";
import { getSession } from "@/lib/auth/session";

export default async function PerformanceTrackerPage() {
  const session = await getSession();
  const user = session ? { id: session.userId } : null;

  let totalPnL = 0;
  let wins = 0;
  let losses = 0;
  let grossProfit = 0;
  let grossLoss = 0;
  const chartData: ChartData[] = [];

  if (user) {
    const entries = await prisma.journalEntry.findMany({
      where: { userId: user.id },
      orderBy: { date: 'asc' }
    });

    let cumulative = 0;
    entries.forEach((entry: { pnl: number; date: Date }) => {
      cumulative += entry.pnl;
      chartData.push({
        time: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        cumulative
      });

      totalPnL += entry.pnl;
      if (entry.pnl > 0) {
        wins++;
        grossProfit += entry.pnl;
      } else if (entry.pnl < 0) {
        losses++;
        grossLoss += Math.abs(entry.pnl);
      }
    });

    // Handle edge case of one trade
    if (chartData.length === 1) {
      chartData.unshift({ time: 'Start', cumulative: 0 });
    }
  }

  const totalTrades = wins + losses;
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : "0.0";
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : (grossProfit > 0 ? "∞" : "0.00");
  const pnlFormatted = formatPnL(totalPnL);
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Statistics Dashboard (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard 
          title="Net Profit (All Time)" 
          value={pnlFormatted.text} 
          sub="Cumulative realized" 
          subIcon={<TrendingUp className="w-3 h-3" />}
          valueColor={pnlFormatted.className}
        />
        <StatsCard 
          title="Win Rate" 
          value={`${winRate}%`} 
          progress={parseFloat(winRate)}
        />
        <StatsCard 
          title="Profit Factor" 
          value={profitFactor} 
          sub="Gross Profit / Gross Loss" 
          italicSub
        />
        <StatsCard 
          title="Total Executions" 
          value={totalTrades.toString()} 
          sub="Analyzed trades" 
        />
      </section>

      {/* Main Layout: Equity Curve & Sector Performance */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equity Curve Graph Simulation */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline font-bold text-lg text-foreground">Equity Performance Over Time</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-[10px] bg-white/5 text-muted-foreground font-bold border border-white/10 rounded-sm">1W</button>
              <button className="px-3 py-1 text-[10px] bg-primary/20 text-primary font-bold border border-primary/20 rounded-sm">1M</button>
              <button className="px-3 py-1 text-[10px] bg-white/5 text-muted-foreground font-bold border border-white/10 rounded-sm">ALL</button>
            </div>
          </div>
          
          <div className="h-[300px] w-full mt-4">
            <EquityChart data={chartData} />
          </div>
        </div>

        {/* Sector Performance Card */}
        <div className="glass-panel p-6 rounded-sm flex flex-col">
          <h3 className="font-headline font-bold text-lg text-foreground mb-6">Sector Performance</h3>
          <div className="space-y-4 flex-1">
            <SectorRow label="Crypto / BTC" amount="+$8.2k" pct={80} color="bg-primary" />
            <SectorRow label="Tech / NASDAQ" amount="+$3.1k" pct={45} color="bg-primary" />
            <SectorRow label="Forex / EUR" amount="-$1.4k" pct={20} color="bg-destructive" isNegative />
            <SectorRow label="Energy / Oil" amount="+$2.2k" pct={30} color="bg-primary" />
          </div>
          <div className="mt-8 p-4 bg-black/40 rounded-sm text-center border border-white/5">
            <p className="text-[0.6875rem] text-muted-foreground uppercase font-bold tracking-widest">Largest Single Gain</p>
            <p className="text-xl font-headline font-bold text-primary mt-1 glow-primary">BTC Long @ $42,100</p>
          </div>
        </div>
      </section>

      {/* Trade Journal Table */}
      <section className="glass-panel rounded-sm overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10">
          <h3 className="font-headline font-bold text-lg text-foreground">Recent Trade Logs</h3>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-sm border border-white/5">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select className="bg-transparent border-none text-[0.6875rem] font-bold uppercase tracking-widest text-foreground focus:ring-0 cursor-pointer outline-none">
                <option>Filter: ALL TYPES</option>
                <option>LONG</option>
                <option>SHORT</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-sm border border-white/5">
              <SortDesc className="w-4 h-4 text-muted-foreground" />
              <select className="bg-transparent border-none text-[0.6875rem] font-bold uppercase tracking-widest text-foreground focus:ring-0 cursor-pointer outline-none">
                <option>Sort: DATE (DESC)</option>
                <option>PnL (HIGH)</option>
                <option>RISK RATING</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 py-4 text-[0.6875rem] font-bold text-muted-foreground uppercase tracking-widest">Date / Time</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold text-muted-foreground uppercase tracking-widest">Symbol</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold text-muted-foreground uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold text-muted-foreground uppercase tracking-widest">Entry/Exit</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold text-muted-foreground uppercase tracking-widest">PnL ($)</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold text-muted-foreground uppercase tracking-widest">PnL (%)</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold text-muted-foreground uppercase tracking-widest">Rating</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold text-muted-foreground uppercase tracking-widest text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <TradeRow 
                date="24 Oct, 14:20" symbol="BTCUSDT" type="LONG" 
                entry="67,102 → 68,420" pnl="$1,318.00" pnlPct="+1.96%" 
                rating={4} isWin
              />
              <TradeRow 
                date="24 Oct, 09:15" symbol="TSLA" type="SHORT" 
                entry="221.50 → 224.10" pnl="-$420.00" pnlPct="-1.17%" 
                rating={2} isWin={false}
              />
              <TradeRow 
                date="23 Oct, 16:45" symbol="ETHUSDT" type="LONG" 
                entry="2,540 → 2,585" pnl="$842.20" pnlPct="+1.77%" 
                rating={5} isWin
              />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

interface StatsCardProps { title: string; value: string; sub?: string; subIcon?: React.ReactNode; italicSub?: boolean; progress?: number; valueColor?: string; }
function StatsCard({ title, value, sub, subIcon, italicSub, progress, valueColor = "text-foreground" }: StatsCardProps) {
  return (
    <Card className="glass-panel p-6 flex flex-col justify-between min-h-[140px] border border-white/5 rounded-sm bg-transparent">
      <span className="text-muted-foreground text-[0.6875rem] font-bold uppercase tracking-widest">{title}</span>
      <div>
        <div className={`text-3xl font-headline font-bold ${valueColor}`}>{value}</div>
        {progress !== undefined ? (
          <div className="w-full bg-white/5 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-primary h-full glow-primary" style={{ width: `${progress}%` }}></div>
          </div>
        ) : sub ? (
          <div className={`text-[0.6875rem] text-muted-foreground flex items-center gap-1 mt-1 ${italicSub ? 'italic' : ''}`}>
            {subIcon} {sub}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

interface SectorRowProps { label: string; amount: string; pct: number; color: string; isNegative?: boolean; }
function SectorRow({ label, amount, pct, color, isNegative }: SectorRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground/80">{label}</span>
      <div className="flex items-center gap-4 flex-1 ml-4">
        <div className="h-2 bg-white/5 rounded-full flex-1 overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: `${pct}%` }}></div>
        </div>
        <span className={`text-xs font-bold ${isNegative ? 'text-destructive' : 'text-primary'}`}>{amount}</span>
      </div>
    </div>
  );
}

interface TradeRowProps { date: string; symbol: string; type: string; entry: string; pnl: string; pnlPct: string; rating: number; isWin?: boolean; }
function TradeRow({ date, symbol, type, entry, pnl, pnlPct, rating, isWin }: TradeRowProps) {
  return (
    <tr className="hover:bg-white/5 transition-colors group cursor-pointer">
      <td className="px-6 py-4 font-body text-[0.8125rem] text-foreground/90">{date}</td>
      <td className="px-6 py-4 font-bold text-[0.8125rem] text-foreground">{symbol}</td>
      <td className="px-6 py-4">
        <Badge variant="outline" className={`text-[10px] font-bold uppercase rounded-full ${type === 'LONG' ? 'border-primary/50 text-primary bg-primary/10' : 'border-destructive/50 text-destructive bg-destructive/10'}`}>
          {type}
        </Badge>
      </td>
      <td className="px-6 py-4 font-body text-[0.8125rem] text-muted-foreground">{entry}</td>
      <td className={`px-6 py-4 font-bold text-[0.8125rem] ${isWin ? 'text-primary' : 'text-destructive'}`}>{isWin ? '+' : ''}{pnl}</td>
      <td className={`px-6 py-4 font-body text-[0.8125rem] ${isWin ? 'text-primary' : 'text-destructive'}`}>{pnlPct}</td>
      <td className="px-6 py-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={`w-3 h-3 ${star <= rating ? 'text-primary fill-primary' : 'text-white/20'}`} />
          ))}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-primary hover:underline text-[0.6875rem] font-bold uppercase">View Detail</button>
      </td>
    </tr>
  );
}
