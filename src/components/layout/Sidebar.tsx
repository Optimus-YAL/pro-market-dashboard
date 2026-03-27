'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', icon: 'terminal', label: 'Terminal' },
  { href: '/dashboard/prep', icon: 'insights', label: 'Analytics' },
  { href: '/dashboard/plan', icon: 'query_stats', label: 'Strategy' },
  { href: '/dashboard/sessions', icon: 'security', label: 'Risk' },
  { href: '/dashboard/journal', icon: 'mail', label: 'Messages' },
  { href: '/dashboard/settings', icon: 'settings', label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-12 bottom-0 z-40 flex flex-col py-4 bg-surface-secondary w-16 hover:w-56 transition-all duration-300 group/sidebar border-r border-white/[0.04] shadow-[4px_0_24px_rgba(184,195,255,0.02)]">
      <div className="flex flex-col gap-1 px-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-4 p-2 rounded-sm transition-all duration-200 ease-in-out relative',
                isActive
                  ? 'text-accent bg-surface-card border-r-2 border-accent'
                  : 'text-text-muted hover:bg-surface-card hover:text-text-primary'
              )}
            >
              <span className="material-symbols-outlined min-w-[24px] text-xl">{item.icon}</span>
              <span className="opacity-0 group-hover/sidebar:opacity-100 text-xs font-medium whitespace-nowrap transition-opacity duration-300">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* System Badge */}
      <div className="mt-auto px-2 border-t border-white/[0.04] pt-4">
        <div className="flex items-center gap-4 p-2 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-accent-container flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-accent tracking-wider">SYS</span>
          </div>
          <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 overflow-hidden">
            <p className="text-[10px] font-bold text-text-primary truncate uppercase tracking-widest">Institutional</p>
            <p className="text-[8px] text-text-muted truncate uppercase">Terminal 1</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
