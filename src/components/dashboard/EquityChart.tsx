"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export interface ChartData {
  time: string;
  cumulative: number;
}

export function EquityChart({ data }: { data: ChartData[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-muted-foreground text-[0.6875rem] font-bold tracking-widest uppercase">
        No Trading Data Available
      </div>
    );
  }

  // Calculate min/max domain for better visual scaling
  const minEquity = Math.min(...data.map(d => d.cumulative));
  const maxEquity = Math.max(...data.map(d => d.cumulative));
  const yDomainPadding = (maxEquity - minEquity) * 0.1 || 100;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="time" 
          stroke="#ffffff" 
          strokeOpacity={0.2} 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          minTickGap={30}
        />
        <YAxis 
          domain={[minEquity - yDomainPadding, maxEquity + yDomainPadding]}
          stroke="#ffffff" 
          strokeOpacity={0.2} 
          fontSize={10} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#0A0A0F', 
            border: '1px solid rgba(255,107,53,0.3)', 
            borderRadius: '2px',
            fontSize: '12px'
          }}
          itemStyle={{ color: '#FF6B35', fontWeight: 'bold' }}
          labelStyle={{ color: '#888', marginBottom: '4px' }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Cumulative PnL']}
        />
        <Area 
          type="monotone" 
          dataKey="cumulative" 
          stroke="#FF6B35" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorCumulative)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
