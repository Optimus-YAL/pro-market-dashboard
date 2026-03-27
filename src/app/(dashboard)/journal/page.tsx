import { Plus, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { addJournalEntry } from "@/app/actions/journal";
import { formatPnL } from "@/lib/utils";

import { JournalEntry } from "@prisma/client";

export default async function TradingJournalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let entries: JournalEntry[] = [];
  if (user) {
    entries = await prisma.journalEntry.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Filters */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Trading Journal</h1>
          <p className="text-muted-foreground text-sm">Reviewing execution performance for Terminal 01</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white/5 px-3 py-2 rounded-sm gap-4 border border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">Date Range</span>
              <select className="bg-transparent border-none p-0 text-sm focus:ring-0 text-foreground font-medium cursor-pointer outline-none">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Month to Date</option>
              </select>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">Setup Type</span>
              <select className="bg-transparent border-none p-0 text-sm focus:ring-0 text-foreground font-medium cursor-pointer outline-none">
                <option>All Setups</option>
                <option>Mean Reversion</option>
                <option>Breakout</option>
                <option>Trend Following</option>
              </select>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold">Outcome</span>
              <div className="flex items-center gap-3 mt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="rounded-sm bg-black/40 border-white/20 text-primary focus:ring-0" />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground">Win</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="rounded-sm bg-black/40 border-white/20 text-primary focus:ring-0" />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground">Loss</span>
                </label>
              </div>
            </div>
          </div>
          
          <button className="bg-primary hover:brightness-110 text-primary-foreground font-bold px-6 py-3 rounded-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,107,53,0.2)]">
            <Plus className="w-5 h-5" />
            <span>Add Trade</span>
          </button>
        </div>
      </section>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Journal Table */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="glass-panel rounded-sm overflow-hidden border border-white/10">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Recent Executions</h3>
              <span className="text-xs text-muted-foreground">Showing {entries.length} trades</span>
            </div>
            
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] uppercase tracking-tighter text-muted-foreground bg-white/5">
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Pair / Contract</th>
                    <th className="px-4 py-3 font-semibold">Setup</th>
                    <th className="px-4 py-3 font-semibold text-right">Entry</th>
                    <th className="px-4 py-3 font-semibold text-right">Exit</th>
                    <th className="px-4 py-3 font-semibold text-right">P/L (USD)</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-muted-foreground">
                        No executions logged yet. Add your first trade.
                      </td>
                    </tr>
                  ) : (
                    entries.map((entry) => {
                      // Extract pair from notes bracket e.g. [BTCUSDT]
                      const pairMatch = entry.notes?.match(/^\[(.*?)\]/);
                      const pair = pairMatch ? pairMatch[1] : "UNKNOWN";
                      const cleanNotes = entry.notes?.replace(/^\[.*?\]\s*/, "") || "";
                      const formattedPnl = formatPnL(entry.pnl);

                      return (
                        <TableRow
                          key={entry.id}
                          date={entry.date}
                          pair={pair}
                          setup={entry.setup}
                          entry={entry.entry.toString()}
                          exit={entry.exit ? entry.exit.toString() : "Open"}
                          pnl={formattedPnl.text}
                          notes={cleanNotes}
                          isWin={entry.pnl ? entry.pnl > 0 : undefined}
                          pnlClassName={formattedPnl.className}
                        />
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-white/5 border-t border-white/10 text-center">
              <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Load More History</button>
            </div>
          </div>
        </div>

        {/* Add Trade Form (Slide-in Style Side Panel) & Market Insights */}
        <div className="xl:col-span-4 space-y-6">
          <div className="glass-panel rounded-sm p-6 border-t-2 border-t-primary shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h2 className="text-xl font-extrabold tracking-tight text-foreground">New Execution</h2>
              <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30 uppercase rounded-sm">
                Manual Entry
              </Badge>
            </div>

            <form action={addJournalEntry} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase text-muted-foreground">Asset / Pair</label>
                  <Input name="asset" required className="bg-black/40 border-white/10 h-9" placeholder="e.g. BTCUSDT" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase text-muted-foreground">Setup</label>
                  <select name="setup" className="w-full bg-black/40 border-white/10 text-foreground text-sm rounded-sm h-9 px-3 focus:ring-1 focus:ring-primary outline-none">
                    <option>Mean Reversion</option>
                    <option>Breakout</option>
                    <option>Trend Following</option>
                    <option>High Volatility</option>
                    <option>Scalp</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase text-muted-foreground">Direction</label>
                <select name="direction" className="w-full bg-black/40 border-white/10 text-foreground text-sm rounded-sm h-9 px-3 focus:ring-1 focus:ring-primary outline-none">
                  <option>Long</option>
                  <option>Short</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase text-muted-foreground">Entry Price</label>
                  <Input name="entry" required type="number" step="any" className="bg-black/40 border-white/10 h-9 font-tabular" placeholder="0.00" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase text-muted-foreground">Exit Price</label>
                  <Input name="exit" type="number" step="any" className="bg-black/40 border-white/10 h-9 font-tabular" placeholder="0.00 (Optional)" />
                </div>
              </div>

               <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase text-muted-foreground">Stop Loss</label>
                  <Input name="stop" type="number" step="any" className="bg-black/40 border-white/10 h-9 font-tabular" placeholder="0.00" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase text-muted-foreground">Target</label>
                  <Input name="target" type="number" step="any" className="bg-black/40 border-white/10 h-9 font-tabular" placeholder="0.00" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase text-muted-foreground">Trading Notes</label>
                <textarea 
                  name="notes"
                  className="w-full bg-black/40 border border-white/10 text-foreground text-sm rounded-sm p-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground resize-none" 
                  placeholder="Describe the psychological state, execution logic, and context..." 
                  rows={3}
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" className="flex-1 bg-white/5 hover:bg-white/10 text-muted-foreground font-bold py-3 rounded-sm transition-all text-sm">Cancel</button>
                <button type="submit" className="flex-[2] bg-primary hover:brightness-110 text-primary-foreground font-bold py-3 rounded-sm shadow-[0_0_15px_rgba(255,107,53,0.3)] transition-all text-sm">Log Trade</button>
              </div>
            </form>
          </div>

          {/* Market Insights Widget */}
          <div className="glass-panel border-white/10 rounded-sm p-5 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-primary w-4 h-4" />
              <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-wider">Weekly Performance</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="text-2xl font-extrabold text-foreground tracking-tighter tabular-nums">+8.42%</div>
                <div className="text-[10px] text-primary uppercase font-bold">Current Win Rate: 64%</div>
              </div>
              <div className="flex gap-1 h-12 items-end">
                <div className="w-2.5 bg-primary/20 h-4 rounded-t-[2px]"></div>
                <div className="w-2.5 bg-primary/40 h-8 rounded-t-[2px]"></div>
                <div className="w-2.5 bg-primary/60 h-6 rounded-t-[2px]"></div>
                <div className="w-2.5 bg-primary h-10 rounded-t-[2px]"></div>
                <div className="w-2.5 bg-primary/80 h-12 rounded-t-[2px]"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

interface TableRowProps { date: string; pair: string; setup: string; entry: string; exit: string; pnl: string; notes: string; isWin?: boolean; pnlClassName?: string; }
function TableRow({ date, pair, setup, entry, exit, pnl, notes, isWin, pnlClassName }: TableRowProps) {
  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="px-4 py-4 tabular-nums text-muted-foreground">{date}</td>
      <td className="px-4 py-4 font-bold text-foreground">{pair}</td>
      <td className="px-4 py-4">
        <Badge variant="outline" className={`text-[10px] font-bold uppercase rounded-full ${isWin ? 'border-primary/50 text-primary bg-primary/10' : (isWin === false ? 'border-destructive/50 text-destructive bg-destructive/10' : 'border-muted-foreground/50 text-muted-foreground')}`}>
          {setup}
        </Badge>
      </td>
      <td className="px-4 py-4 text-right tabular-nums text-muted-foreground">{entry}</td>
      <td className="px-4 py-4 text-right tabular-nums text-muted-foreground">{exit}</td>
      <td className={`px-4 py-4 text-right font-bold tabular-nums ${pnlClassName || (isWin ? 'text-primary' : 'text-destructive')}`}>{pnl}</td>
      <td className="px-4 py-4 text-muted-foreground text-xs truncate max-w-[120px]">{notes}</td>
    </tr>
  );
}
