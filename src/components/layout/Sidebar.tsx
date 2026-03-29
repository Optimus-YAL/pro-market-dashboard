'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/* ── Main navigation items ── */
const MAIN_NAV = [
  { icon: 'dashboard',     label: 'Dashboard',          href: '/dashboard' },
  { icon: 'edit_document', label: 'Daily Prep',         href: '/dashboard/prep' },
  { icon: 'description',   label: 'Trade Plan',         href: '/dashboard/plan' },
  { icon: 'menu_book',     label: 'Trading Journal',    href: '/dashboard/journal' },
  { icon: 'star',          label: 'Post-Market Review', href: '/dashboard/review' },
  { icon: 'bar_chart',     label: 'Performance',        href: '/dashboard/performance' },
];

/* ── Tools section items ── */
const TOOLS_NAV = [
  { icon: 'tune',          label: 'Presets',   href: '/dashboard/presets' },
  { icon: 'schedule',      label: 'Sessions',  href: '/dashboard/sessions' },
  { icon: 'chat',          label: 'Comms',     href: '/dashboard/comms' },
  { icon: 'settings',      label: 'Settings',  href: '/dashboard/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  const renderLink = (item: { icon: string; label: string; href: string }) => {
    const isActive = item.href === '/dashboard'
      ? pathname === '/dashboard'
      : pathname.startsWith(item.href) && item.href !== '#';

    return (
      <Link
        key={item.label}
        href={item.href}
        className={cn(
          "flex items-center gap-4 p-2 rounded-sm cursor-pointer transition-all duration-200 ease-in-out",
          isActive
            ? "text-accent bg-surface-card border-r-2 border-accent"
            : "text-text-secondary hover:bg-surface-card hover:text-text-primary"
        )}
      >
        <span className="material-symbols-outlined min-w-[24px]">{item.icon}</span>
        <span className="opacity-0 group-hover:opacity-100 text-xs font-medium whitespace-nowrap transition-opacity duration-300">
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <aside className="peer fixed left-0 top-12 bottom-8 z-40 flex flex-col py-4 bg-surface-secondary w-16 hover:w-64 transition-all duration-300 group shadow-[4px_0_24px_rgba(184,195,255,0.04)]">
      {/* ── Main Navigation ── */}
      <div className="flex flex-col gap-1 px-3">
        {MAIN_NAV.map(renderLink)}
      </div>

      {/* ── TOOLS Separator ── */}
      <div className="px-3 mt-5 mb-2">
        <div className="border-t border-white/[0.06]" />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-black uppercase tracking-[0.2em] text-text-muted mt-3 block px-2">
          Tools
        </span>
      </div>

      {/* ── Tools Navigation ── */}
      <div className="flex flex-col gap-1 px-3">
        {TOOLS_NAV.map(renderLink)}
      </div>

      {/* ── Action Button ── */}
      <div className="mt-auto px-2 pb-4 pt-4">
        <button className="w-full h-10 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-black text-[10px] uppercase rounded-sm transition-all shadow-[0_0_15px_rgba(30,64,175,0.4)] hover:shadow-[0_0_20px_rgba(30,64,175,0.6)] active:scale-95 flex items-center justify-center overflow-hidden whitespace-nowrap relative">
          <span className="material-symbols-outlined text-[18px] group-hover:opacity-0 transition-opacity absolute">add</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest">NEW ORDER</span>
        </button>
      </div>

      {/* ── Bottom System Badge ── */}
      <div className="mt-auto px-3 border-t border-border-primary/10 pt-4 overflow-hidden">
        <div className="flex items-center gap-4 p-2">
          <div className="w-8 h-8 rounded-full bg-accent-container flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-accent">SYS</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
            <p className="text-[10px] font-bold text-text-primary truncate uppercase tracking-widest">Institutional</p>
            <p className="text-[8px] text-text-secondary truncate uppercase">Terminal 1</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
