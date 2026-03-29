import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface TerminalState {
  // Account/Risk Settings (from /dashboard/settings)
  dailyLossLimit: number;
  maxDrawdown: number;
  dataMode: 'TCP Direct' | 'WebSocket' | 'REST Polling';
  theme: 'Dark' | 'Light' | 'System';
  
  // Session/Global State
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  tradeStatus: 'Monitoring' | 'Active' | 'Flat';
  tacticalNotes: string;

  // Actions
  setRiskLimits: (daily: number, max: number) => void;
  setDataMode: (mode: 'TCP Direct' | 'WebSocket' | 'REST Polling') => void;
  setTheme: (theme: 'Dark' | 'Light' | 'System') => void;
  setBias: (bias: 'Bullish' | 'Bearish' | 'Neutral') => void;
  setTradeStatus: (status: 'Monitoring' | 'Active' | 'Flat') => void;
  setTacticalNotes: (notes: string) => void;
}

export const useTerminalStore = create<TerminalState>()(
  persist(
    (set) => ({
      // Initial defaults
      dailyLossLimit: 2.5,
      maxDrawdown: 5.0,
      dataMode: 'TCP Direct',
      theme: 'Dark',
      
      bias: 'Bullish',
      tradeStatus: 'Monitoring',
      tacticalNotes: '',

      // Mutators
      setRiskLimits: (daily, max) => set({ dailyLossLimit: daily, maxDrawdown: max }),
      setDataMode: (mode) => set({ dataMode: mode }),
      setTheme: (theme) => set({ theme }),
      setBias: (bias) => set({ bias }),
      setTradeStatus: (status) => set({ tradeStatus: status }),
      setTacticalNotes: (notes) => set({ tacticalNotes: notes }),
    }),
    {
      name: 'obsidian-terminal-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
