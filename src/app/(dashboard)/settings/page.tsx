import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Bolt, History, FlaskConical, X } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-12 animate-in fade-in max-w-5xl mx-auto pb-24 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-extrabold tracking-tight text-foreground mb-2">Account Configuration</h1>
        <p className="text-muted-foreground max-w-2xl font-body">Modify your terminal environment, risk parameters, and regional market preferences.</p>
      </header>

      {/* 1. Profile Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Profile</h3>
          <p className="text-xs text-muted-foreground">Identity and institutional role settings.</p>
        </div>
        <Card className="md:col-span-2 p-6 bg-card border-border rounded-lg shadow-sm">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative group">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq9aLJVk6tX2MMYWmj6B5TPedEXtsUl1m8cK-NJYhqRrgybLKZ0eyaGJKglzXCSBn2M8sck72k5hmq3m8WtywnGLB5r3-Njp_ZKU7SA5uxRkXqOcVJ6hyDyptLhaSDhnFr_KmOhmQ4UfibBkllEsMh9TZxMayEvnQVOdiKfV48-PJh93Z1bgF2v6ny3KhVkhNTM2aWxQbjDSG-O2UEdUb2MEODf7dW44gFg9UAwzQTwlvxZlFRQ5vAyTpz4iZYSslrpGGlIXnkNKMx" alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-primary/20" />
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg active:scale-90 transition-transform">
                <Edit className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h4 className="text-lg font-headline font-semibold text-foreground">Alexander Sterling</h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none rounded uppercase tracking-wider text-[10px]">Institutional Trader</Badge>
                <span className="text-xs text-muted-foreground font-mono">ID: 882-QX-40</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Full Name</Label>
              <Input defaultValue="Alexander Sterling" className="bg-background border-none rounded-md" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Email Address</Label>
              <Input type="email" defaultValue="a.sterling@firm-global.com" className="bg-background border-none rounded-md" />
            </div>
          </div>
        </Card>
      </section>

      {/* 2. Appearance & Theme */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Theme</h3>
          <p className="text-xs text-muted-foreground">Visual interface and contrast profiles.</p>
        </div>
        <div className="md:col-span-2 grid grid-cols-3 gap-4">
          <button className="p-4 rounded-xl border-2 border-primary bg-card flex flex-col items-center gap-3 transition-all relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="w-full h-12 bg-background rounded-md shadow-inner flex flex-col gap-1 p-2 border border-border relative z-10">
              <div className="w-2/3 h-1 bg-primary/50 rounded-full"></div>
              <div className="w-full h-1 bg-white/10 rounded-full"></div>
            </div>
            <span className="text-xs font-headline font-bold text-primary relative z-10">Dark Mode</span>
          </button>
          
          <button className="p-4 rounded-xl border-2 border-transparent bg-card flex flex-col items-center gap-3 hover:border-border transition-all">
            <div className="w-full h-12 bg-white rounded-md shadow-inner flex flex-col gap-1 p-2">
              <div className="w-2/3 h-1 bg-slate-300 rounded-full"></div>
              <div className="w-full h-1 bg-slate-100 rounded-full"></div>
            </div>
            <span className="text-xs font-headline font-bold text-muted-foreground">Light Mode</span>
          </button>

          <button className="p-4 rounded-xl border-2 border-transparent bg-card flex flex-col items-center gap-3 hover:border-border transition-all">
            <div className="w-full h-12 bg-black rounded-md shadow-inner flex flex-col gap-1 p-2 border border-primary/40">
              <div className="w-2/3 h-1 bg-primary rounded-full"></div>
              <div className="w-full h-1 bg-primary/20 rounded-full"></div>
            </div>
            <span className="text-xs font-headline font-bold text-muted-foreground">High Contrast</span>
          </button>
        </div>
      </section>

      {/* 3. Timezone & Localization */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Timezone</h3>
          <p className="text-xs text-muted-foreground">Regional market hour synchronization.</p>
        </div>
        <Card className="md:col-span-2 p-6 bg-card border-border rounded-lg shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Primary Market</Label>
              <Select defaultValue="ny">
                <SelectTrigger className="bg-background border-none rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ny">New York (EST) - UTC-5</SelectItem>
                  <SelectItem value="ldn">London (GMT) - UTC+0</SelectItem>
                  <SelectItem value="tyo">Tokyo (JST) - UTC+9</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Secondary Market</Label>
              <Select defaultValue="utc">
                <SelectTrigger className="bg-background border-none rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC (Universal)</SelectItem>
                  <SelectItem value="cst">Chicago (CST)</SelectItem>
                  <SelectItem value="sgt">Singapore (SGT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-headline font-bold">Use 24-hour Display</p>
              <p className="text-xs text-muted-foreground">Apply ISO 8601 formatting to timestamps.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>
      </section>

      {/* 4. Risk Limits */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Risk Limits</h3>
          <p className="text-xs text-muted-foreground">Hard-coded safety parameters.</p>
        </div>
        <Card className="md:col-span-2 p-6 bg-card border-border rounded-lg shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Max Daily Loss</Label>
                <span className="text-xs font-mono text-primary font-bold">2.50%</span>
              </div>
              <Slider defaultValue={[2.5]} max={10} step={0.1} className="py-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Max Drawdown</Label>
                <span className="text-xs font-mono text-primary font-bold">$15,000</span>
              </div>
              <Slider defaultValue={[15000]} max={50000} step={500} className="py-2" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Max Position Size (Contracts)</Label>
              <Input type="number" defaultValue="25" className="bg-background border-none rounded-md font-mono text-foreground h-10" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-md self-end mt-1">
              <div>
                <p className="text-xs font-headline font-bold text-red-500 uppercase tracking-wider">Auto-Flatten</p>
                <p className="text-[10px] text-red-500/70 font-body">Liquivate all on limit hit</p>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-red-500" />
            </div>
          </div>
        </Card>
      </section>

      {/* 5. Preferred Markets */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Markets</h3>
          <p className="text-xs text-muted-foreground">Default instrument watchlist.</p>
        </div>
        <Card className="md:col-span-2 p-6 bg-card border-border rounded-lg shadow-sm">
          <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter block mb-4">Pinned Instruments</Label>
          <div className="flex flex-wrap gap-2">
            {['ES', 'NQ', 'YM'].map(sym => (
              <Badge key={sym} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold font-mono rounded-full px-3 py-1 gap-1 cursor-pointer">
                {sym} <X className="w-3 h-3 opacity-70 hover:opacity-100" />
              </Badge>
            ))}
            {['GC', 'CL', 'DX'].map(sym => (
              <Badge variant="outline" key={sym} className="font-bold font-mono rounded-full px-3 py-1 gap-1 border-border text-muted-foreground hover:text-foreground hover:border-muted cursor-pointer transition-colors">
                {sym} <X className="w-3 h-3 opacity-50 hover:opacity-100" />
              </Badge>
            ))}
            <button className="px-3 py-1 border border-dashed border-primary/40 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-primary/10 transition-colors ml-2">
              + Add Symbol
            </button>
          </div>
        </Card>
      </section>

      {/* 6. Data Mode */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Data Mode</h3>
          <p className="text-xs text-muted-foreground">Streaming feed and environment.</p>
        </div>
        <div className="md:col-span-2 bg-card p-1.5 rounded-lg flex flex-col sm:flex-row gap-1 border border-border shadow-sm">
          <button className="flex-1 py-3 px-4 rounded-md bg-primary text-primary-foreground text-sm font-headline font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(255,107,53,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.23)] hover:bg-primary/90 transition-all">
            <Bolt className="w-4 h-4 fill-current" /> Live Data
          </button>
          <button className="flex-1 py-3 px-4 rounded-md bg-transparent text-muted-foreground text-sm font-headline font-semibold flex items-center justify-center gap-2 hover:bg-background transition-colors">
            <History className="w-4 h-4" /> Delayed
          </button>
          <button className="flex-1 py-3 px-4 rounded-md bg-transparent text-muted-foreground text-sm font-headline font-semibold flex items-center justify-center gap-2 hover:bg-background transition-colors">
            <FlaskConical className="w-4 h-4" /> Simulation
          </button>
        </div>
      </section>
    </div>
  );
}
