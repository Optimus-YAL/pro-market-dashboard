import { TrendingUp, Search, Download, Rocket } from "lucide-react";

export function DecisionBar() {
  return (
    <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:ml-32 w-full max-w-2xl px-4 pointer-events-none">
      <div className="bg-[#0A0A0F]/90 backdrop-blur-xl px-6 py-3 rounded-full flex items-center justify-between border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] pointer-events-auto shadow-primary/5">
        
        {/* Market Status Tickers */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Equity</span>
            <span className="text-sm font-bold tabular-nums text-foreground">$124,500.00</span>
          </div>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Daily P/L</span>
            <span className="text-sm font-bold tabular-nums text-primary">+$842.12</span>
          </div>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-2 text-primary/80 font-headline uppercase tracking-widest text-[10px] font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            BTC +2.41%
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white flex items-center justify-center transition-all">
            <Search className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white flex items-center justify-center transition-all">
            <Download className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 ml-2 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:brightness-110 active:scale-95">
            <Rocket className="w-4 h-4" />
          </button>
        </div>
        
      </div>
    </footer>
  );
}
