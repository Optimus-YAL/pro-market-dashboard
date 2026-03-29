'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function TopBar() {
  const pathname = usePathname();

  /* Top-bar tabs – "Execute" enters the trading workflow, "Watchlist" is a placeholder */
  const TOP_TABS = [
    { label: 'Execute',   href: '/dashboard' },
    { label: 'Watchlist', href: '#' },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-12 bg-surface-primary flex justify-between items-center px-6">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-lg font-black text-text-primary tracking-tighter font-headline hover:opacity-90 transition-opacity">Pro Market</Link>
        <nav className="hidden md:flex gap-6 items-center">
          {TOP_TABS.map((tab) => {
            const isActive = tab.href === '/dashboard'
              ? pathname === '/dashboard' || pathname.startsWith('/dashboard/')
              : false;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={cn(
                  "font-headline font-semibold tracking-tight pb-1 transition-colors",
                  isActive
                    ? "text-accent border-b-2 border-accent"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-surface-secondary px-3 py-1 rounded-sm">
          <span className="material-symbols-outlined text-xs text-text-secondary mr-2">search</span>
          <input type="text" placeholder="Search Symbols..." className="bg-transparent border-none text-xs text-text-primary focus:ring-0 w-48 placeholder:text-text-secondary outline-none" />
        </div>
        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-text-secondary text-xl cursor-pointer hover:text-text-primary transition-colors" title="Notifications">notifications</button>
          <Link href="/dashboard/settings" className="material-symbols-outlined text-text-secondary text-xl cursor-pointer hover:text-text-primary transition-colors" title="Settings">settings</Link>
          <Link href="/dashboard/settings" className="material-symbols-outlined text-accent text-xl cursor-pointer hover:text-text-primary transition-colors" title="Account">account_circle</Link>
        </div>
      </div>
    </header>
  );
}
