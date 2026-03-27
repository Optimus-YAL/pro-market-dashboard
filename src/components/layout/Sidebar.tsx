import Link from "next/link";
import { Terminal, BarChart2, Lightbulb, Shield, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col p-4 py-8 space-y-2 bg-[#0A0A0F] w-64 border-r border-white/5 z-50 hidden lg:flex">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-primary/10 rounded-sm flex items-center justify-center">
          <Terminal className="text-primary w-4 h-4" />
        </div>
        <div>
          <h1 className="font-headline font-bold text-primary text-base leading-none tracking-tight uppercase">Terminal 01</h1>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1">Institutional Access</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <NavItem icon={Terminal} label="Trading Journal" href="/journal" />
        <NavItem icon={BarChart2} label="Performance Tracker" href="/performance" />
        <NavItem icon={Lightbulb} label="Presets" href="/presets" />
        <NavItem icon={Shield} label="Risk Manager" href="#" />
        <NavItem icon={MessageSquare} label="Comms" href="#" />
      </nav>
      <div className="mt-auto space-y-2">
        <NavItem icon={Settings} label="Settings" href="/settings" />
        <div className="pt-4 mt-4 border-t border-white/5">
          <button className="w-full py-3 bg-primary text-primary-foreground font-bold text-xs tracking-widest rounded-sm hover:brightness-110 active:scale-[0.98] transition-all">
            EXECUTE TRADE
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, href, active }: { icon: React.ElementType; label: string; href: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 transition-all text-sm rounded-sm group",
        active 
          ? "bg-white/5 text-primary" 
          : "text-muted-foreground hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon className={cn("w-4 h-4", active ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
      <span className="font-medium tracking-tight">{label}</span>
    </Link>
  );
}
