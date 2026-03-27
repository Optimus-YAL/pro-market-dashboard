import { Search, Bell, Settings, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex justify-between items-center w-full px-6 py-3 bg-[#0A0A0F] border-b border-white/5 sticky top-0 z-40">
      <div className="flex items-center gap-8 lg:hidden">
        <span className="font-headline font-black text-xl tracking-widest text-primary flex items-center gap-2">
          <TerminalSquare className="w-6 h-6" />
          TERMINAL 01
        </span>
      </div>
      
      <nav className="hidden lg:flex items-center gap-6 ml-4">
        <Link href="/journal" className="font-headline tracking-tight font-bold text-sm text-muted-foreground hover:text-white transition-colors duration-150">Journal</Link>
        <Link href="/performance" className="font-headline tracking-tight font-bold text-sm text-primary border-b-2 border-primary pb-1">Performance</Link>
        <Link href="#" className="font-headline tracking-tight font-bold text-sm text-muted-foreground hover:text-white transition-colors duration-150">Strategy</Link>
        <Link href="#" className="font-headline tracking-tight font-bold text-sm text-muted-foreground hover:text-white transition-colors duration-150">Portfolio</Link>
      </nav>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative hidden md:flex items-center w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            className="w-full bg-white/5 border-none h-9 pl-9 text-sm focus-visible:ring-1 focus-visible:ring-primary rounded-sm placeholder:text-muted-foreground" 
            placeholder="Search instrument..." 
            type="text" 
          />
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 text-muted-foreground hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-white hover:bg-white/5 rounded-sm transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden ml-2 cursor-pointer hover:border-primary transition-colors">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_vYpgr0JA1pT0xjFKO-A_rmLkMn4pygNG-xT5GdwnQ5m9m3ojssuwlS6xfjD09JhOwFdEmVX3BrmILsd6gOjyMuAB8ZBydVrrmMU99Mr-a_y40N-pcSHWeAgaDFsLKbBdE2GdOh3wyasvYNRWR6LierUuio0mLsYfFXfL8R_MbW7oLi3-97NJqLx5aicXdWftEsvpvd9nfLcDfMSD7TYwZBlmq12DTC-LuMDGKb3pGCZprE500YfbUuGoOR2-ej3auAq9G7H-N0gN')` }}
          />
        </div>
      </div>
    </header>
  );
}
