'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

// Mock Data
const COMMS_FEED = [
  { id: 1, type: 'trade', title: 'Target 1 Reached', message: 'ES Long scaled out 50% at 4894.25 (+12 ticks). Stop moved to break-even.', time: '10:14 AM', priority: 'high', icon: 'check_circle' },
  { id: 2, type: 'market', title: 'Volatility Alert', message: 'VIX spiked +3.5% in the last 5 minutes. Trend alignment neutralized.', time: '10:05 AM', priority: 'medium', icon: 'show_chart' },
  { id: 3, type: 'trade', title: 'Order Filled', message: 'Bought 2x ES MAR-24 @ 4891.25. Active Preset: Standard Breakout.', time: '09:45 AM', priority: 'low', icon: 'shopping_cart' },
  { id: 4, type: 'system', title: 'Data Feed Restored', message: 'Connection to CQG data feed re-established. Latency: 12ms.', time: '09:12 AM', priority: 'low', icon: 'wifi' },
  { id: 5, type: 'market', title: 'High Impact Event', message: 'CPI Data Release in 5 minutes. Expect elevated spread.', time: '08:25 AM', priority: 'high', icon: 'warning' },
];

export default function CommsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'trade' | 'market' | 'system'>('all');

  const filteredFeed = COMMS_FEED.filter(item => activeTab === 'all' || item.type === activeTab);

  return (
    <div className="space-y-6 animate-fade-in-up pb-8">
      {/* Header */}
      <section className="bg-surface-card/80 backdrop-blur-xl border-y border-white/[0.06] shadow-2xl shadow-black/40 flex flex-wrap items-center justify-between px-6 py-4">
        <div>
          <h1 className="font-headline text-2xl font-black text-text-primary uppercase tracking-tighter">Comms <span className="text-accent">&</span> Alerts</h1>
          <p className="text-xs text-text-muted mt-1 tracking-wide">System messages, trade notifications, and market events</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(184,195,255,0.4)]" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Feed Active</span>
          </div>
          <div className="h-6 w-px bg-white/[0.06]" />
          <button className="text-[10px] font-bold text-text-muted hover:text-text-primary uppercase tracking-widest transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">settings_input_antenna</span>
            Configure
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-6">
        {/* Main Feed Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex bg-surface-secondary border border-white/[0.04] p-1 rounded-sm w-max">
            {[
              { id: 'all', label: 'All Messages', icon: 'all_inbox' },
              { id: 'trade', label: 'Trade Ops', icon: 'currency_exchange' },
              { id: 'market', label: 'Market Events', icon: 'candlestick_chart' },
              { id: 'system', label: 'System', icon: 'dns' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'all' | 'trade' | 'market' | 'system')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all",
                  activeTab === tab.id 
                    ? "bg-accent/10 text-accent border border-accent/20" 
                    : "text-text-muted hover:text-text-primary border border-transparent"
                )}
              >
                <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Feed List */}
          <div className="flex flex-col gap-4">
            {filteredFeed.map((item) => (
              <div 
                key={item.id} 
                className={cn(
                  "bg-surface-secondary border p-5 rounded-lg flex items-start gap-4 group hover:bg-surface-card transition-colors relative overflow-hidden",
                  item.priority === 'high' ? "border-error/30" : "border-white/[0.04]"
                )}
              >
                {item.priority === 'high' && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-error" />
                )}
                
                <div className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  item.type === 'trade' ? "bg-accent/10 border-accent/30 text-accent" :
                  item.type === 'market' ? "bg-warning/10 border-warning/30 text-warning" :
                  "bg-white/[0.04] border-white/10 text-text-muted"
                )}>
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-text-primary tracking-wide">{item.title}</h3>
                    <span className="text-[10px] font-mono text-text-muted">{item.time}</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">{item.message}</p>
                </div>

                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-white/5">
                  <span className="material-symbols-outlined text-sm">more_vert</span>
                </button>
              </div>
            ))}
            
            {filteredFeed.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-white/[0.04] rounded-lg">
                <span className="material-symbols-outlined text-4xl text-text-muted mb-4 block">notifications_paused</span>
                <p className="text-text-muted text-sm font-bold uppercase tracking-widest">No messages found in this category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: System Status */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-card p-6 rounded-lg border border-white/[0.04]">
            <h3 className="font-headline text-xs font-bold text-text-muted uppercase tracking-widest mb-6">System Health</h3>
            
            <div className="space-y-4">
              {[
                { label: 'Broker API (Tradovate)', status: 'Connected', ping: '18ms', color: 'accent' },
                { label: 'Data Feed (CQG)', status: 'Connected', ping: '12ms', color: 'accent' },
                { label: 'AI Analytics Engine', status: 'Syncing', ping: '--', color: 'warning' },
              ].map((sys) => (
                <div key={sys.label} className="flex items-center justify-between p-3 rounded-sm border border-white/[0.02] bg-surface-secondary">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      sys.color === 'accent' ? "bg-accent shadow-[0_0_6px_rgba(184,195,255,0.4)]" : "bg-warning shadow-[0_0_6px_rgba(255,186,8,0.4)] animate-pulse"
                    )} />
                    <span className="text-xs font-bold">{sys.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-text-muted uppercase">{sys.status}</span>
                    <span className="text-[10px] font-mono text-text-muted bg-background px-1.5 py-0.5 rounded-sm">{sys.ping}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-card p-6 rounded-lg border border-white/[0.04]">
            <h3 className="font-headline text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Notification Settings</h3>
            <div className="space-y-3">
              {[
                { label: 'Trade Executions', active: true },
                { label: 'Risk Limit Alerts', active: true },
                { label: 'High Impact News', active: true },
                { label: 'System Updates', active: false },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-muted">{setting.label}</span>
                  <div className={cn(
                    "w-8 h-4 rounded-full flex items-center px-0.5 transition-colors cursor-pointer",
                    setting.active ? "bg-accent" : "bg-white/10"
                  )}>
                    <div className={cn(
                      "w-3 h-3 rounded-full bg-background transition-transform",
                      setting.active ? "translate-x-4 mix-blend-screen" : "translate-x-0" // Using mix-blend-screen to make it appear white if needed, but bg-background is fine
                    )} style={{ backgroundColor: setting.active ? '#ffffff' : '#8A8F9E' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
