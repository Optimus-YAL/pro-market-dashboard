'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function TopBar() {
  const pathname = usePathname();

  /* Top-bar tabs from institutional reference */
  const TOP_TABS = [
    { label: 'Direct Execution', href: '/dashboard' },
    { label: 'Order Flow',       href: '#' },
    { label: 'Risk Manager',     href: '#' },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-12 bg-surface-primary flex justify-between items-center px-6">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-lg font-black text-text-primary tracking-tighter font-headline hover:opacity-90 transition-opacity">Pro Market</Link>
        <nav className="hidden md:flex gap-6 items-center">
          {TOP_TABS.map((tab) => {
            const isActive = tab.href === '/dashboard'
              ? pathname === '/dashboard' || pathname.startsWith('/dashboard/') && tab.label === 'Direct Execution'
              : false;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={cn(
                  "font-headline font-semibold text-[11px] tracking-wide uppercase pb-[18px] pt-[18px] transition-colors border-b-[3px]",
                  isActive
                    ? "text-white border-accent"
                    : "text-text-secondary border-transparent hover:text-white"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Trade Status Context Indicator */}
        <div className="hidden lg:flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mr-2 relative group cursor-pointer">
          <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Trade Status:</span>
          <span className="text-[9px] font-black text-[#22C55E] uppercase animate-pulse">Active</span>
          
          {/* Popover Menu Reference Implementation */}
          <div className="absolute top-[120%] right-0 w-48 bg-[#121212] border border-white/10 rounded-md shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50 overflow-hidden flex flex-col">
            <button className="flex items-center justify-between px-4 py-2 hover:bg-white/5 text-xs text-white transition-colors w-full text-left">
              <span className="font-semibold">Focus</span>
              <span className="text-[10px] text-text-muted font-mono tracking-widest">F</span>
            </button>
            <div className="px-4 py-1 text-[9px] uppercase font-bold tracking-widest text-text-muted">Edit</div>
            <button className="flex items-center justify-between px-4 py-2 hover:bg-white/5 text-xs text-text-secondary hover:text-white transition-colors w-full text-left">
              <span>Edit</span>
              <span className="text-[10px] text-text-muted font-mono tracking-widest">E</span>
            </button>
            <button className="flex items-center justify-between px-4 py-2 hover:bg-white/5 text-xs text-text-secondary hover:text-white transition-colors w-full text-left">
              <span>Download</span>
              <span className="text-[10px] text-text-muted font-mono tracking-widest">⇧D</span>
            </button>
          </div>
        </div>

        {/* Improved Search Input matching reference */}
        <div className="hidden sm:flex items-center bg-[#121212] px-3 py-2 rounded-md border border-white/10 hover:border-white/20 focus-within:border-[#3B82F6]/50 transition-colors w-64 shadow-inner relative">
          <span className="material-symbols-outlined text-[16px] text-text-muted mr-2">search</span>
          <input type="text" placeholder="Search" className="bg-transparent border-none text-[12px] text-white font-medium focus:ring-0 w-full placeholder:text-text-muted outline-none" />
          <div className="absolute right-2 px-1.5 py-0.5 rounded-sm border border-white/10 bg-white/5 text-[9px] text-text-muted font-mono pointer-events-none">⌘K</div>
        </div>

        {/* Primary Account Actions */}
        <div className="flex items-center gap-2 bg-[#121212] px-2 py-1.5 rounded-md border border-white/5">
          <Link href="/dashboard/settings" className="w-8 h-8 rounded-sm text-text-muted hover:text-white flex items-center justify-center transition-colors" title="Account">
            <span className="material-symbols-outlined text-[16px]">person</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
