'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: 'terminal', label: 'Terminal', href: '/dashboard' },
  { icon: 'insights', label: 'Analytics', href: '/dashboard/performance' },
  { icon: 'query_stats', label: 'Strategy', href: '/dashboard/plan' },
  { icon: 'edit_note', label: 'Journal', href: '/dashboard/journal' },
  { icon: 'school', label: 'Prep', href: '/dashboard/prep' },
  { icon: 'rate_review', label: 'Review', href: '/dashboard/review' },
  { icon: 'layers', label: 'Presets', href: '/dashboard/presets' },
  { icon: 'security', label: 'Risk', href: '/dashboard/sessions' },
  { icon: 'mail', label: 'Messages', href: '#' },
  { icon: 'settings', label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-12 bottom-0 z-40 flex flex-col py-4 bg-surface-secondary w-16 hover:w-64 transition-all duration-300 group shadow-[4px_0_24px_rgba(184,195,255,0.04)]">
      <div className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
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
        })}
      </div>

      {/* Bottom System Badge */}
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
