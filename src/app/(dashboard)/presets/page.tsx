import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Filter, Plus, Trash2, Copy, Save, AlertCircle, MoveVertical } from "lucide-react";

export default function PresetsPage() {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] border-t border-border -m-8 mt-0 bg-background overflow-hidden animate-in fade-in">
      {/* Left Column (Preset List) */}
      <section className="w-full md:w-1/3 md:min-w-[320px] md:max-w-md bg-card flex flex-col border-r border-border h-full shrink-0">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold tracking-tight text-foreground">Global Presets</h2>
            <Badge className="bg-primary/10 text-primary border-none font-bold rounded-full px-2 py-0.5 text-[10px]">4 TOTAL</Badge>
          </div>
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
            <Input className="w-full bg-background border-border pl-10 pr-4 py-2 text-sm text-foreground focus-visible:ring-1 focus-visible:ring-primary/50 rounded-md" placeholder="Filter presets..." />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2 no-scrollbar">
          {/* Preset Item (Active/Default) */}
          <div className="p-4 bg-primary/5 border border-primary/30 rounded-md cursor-pointer relative group transition-colors">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-headline font-bold text-foreground group-hover:text-primary transition-colors">Trend Following</h3>
              <Badge className="bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded-sm">Default</Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1 font-body">Optimized for sustained momentum moves in ES and NQ futures during NY session.</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground/60 font-mono tracking-tighter">ID: TRND-882</span>
            </div>
          </div>

          {[
            { name: "Mean Reversion", desc: "Pivot point strategies for range-bound DXY and Treasury assets.", id: "REVR-104" },
            { name: "News/Catalyst", desc: "High volatility scalp configuration for FOMC and NFP releases.", id: "NEWS-559" },
            { name: "Range Bound", desc: "Standard deviations and value area high/low monitoring for low vol periods.", id: "RNGE-221" }
          ].map(preset => (
             <div key={preset.id} className="p-4 bg-transparent hover:bg-muted/50 border border-transparent hover:border-border rounded-md transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-headline font-bold text-muted-foreground group-hover:text-foreground transition-colors">{preset.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1 font-body">{preset.desc}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground/40 font-mono tracking-tighter">ID: {preset.id}</span>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full mt-4 border-dashed border-border text-muted-foreground hover:text-foreground group py-6 rounded-md bg-transparent hover:bg-muted/30">
            <Plus className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
            <span className="text-xs font-bold uppercase tracking-widest">Create New Preset</span>
          </Button>
        </div>
      </section>

      {/* Right Column (Editor Form) */}
      <section className="flex-1 bg-background p-8 overflow-y-auto no-scrollbar relative min-h-[600px]">
        <div className="max-w-3xl mx-auto space-y-10 pb-24">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-6 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-headline font-bold tracking-tight text-foreground">Edit Preset: Trend Following</h2>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 rounded-full px-2">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-body">Last modified by AlphaDesk_Admin 2 hours ago</p>
            </div>
            <div className="flex items-center gap-3">
              <Label className="text-xs font-bold text-foreground uppercase tracking-tighter cursor-pointer flex items-center gap-3">
                <Switch defaultChecked /> Default Parameter
              </Label>
            </div>
          </header>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {/* Name */}
            <div className="md:col-span-2 space-y-2">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Preset Name</Label>
              <Input className="bg-card border-border focus-visible:ring-primary/50 text-foreground rounded-sm px-4 py-6 font-headline font-semibold text-lg" type="text" defaultValue="Trend Following" />
            </div>

            {/* Focus Note */}
            <div className="md:col-span-1 space-y-2">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Focus Note</Label>
              <Textarea className="w-full bg-card border-border focus-visible:ring-primary/50 text-foreground rounded-sm px-4 py-3 text-sm resize-none font-body min-h-[120px]" defaultValue="Optimized for sustained momentum moves in ES and NQ futures during New York session overlap. Focus on VWAP and Volume Profile alignment." />
            </div>

            {/* Caution Note */}
            <div className="md:col-span-1 space-y-2 flex flex-col">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Caution Note</Label>
              <Textarea className="w-full flex-1 bg-destructive/5 border-destructive/20 focus-visible:ring-destructive/50 text-foreground rounded-sm px-4 py-3 text-sm resize-none font-body min-h-[120px] placeholder:text-destructive/50" defaultValue="Avoid execution during low-liquidity periods (Asian Session) or immediately preceding major FED announcements." />
            </div>

            {/* Market Selection */}
            <div className="md:col-span-1 space-y-3">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Market Selection</Label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {['ES', 'NQ', 'DXY', 'GLD', 'USO'].map((sym, i) => (
                  <label key={sym} className={`flex items-center justify-center py-2 border rounded-sm cursor-pointer transition-all ${i < 2 ? 'bg-primary/10 border-primary shadow-[0_0_10px_rgba(255,107,53,0.15)] text-primary' : 'bg-card border-border hover:border-primary/50 text-muted-foreground'}`}>
                    <span className="text-xs font-headline font-bold">{sym}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Panel Priority */}
            <div className="md:col-span-1 space-y-3">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Panel Priority</Label>
              <div className="space-y-2">
                {[
                  { name: "1. Levels", border: "border-primary" },
                  { name: "2. Context", border: "border-primary/50" },
                  { name: "3. Session", border: "border-primary/20" }
                ].map(panel => (
                  <div key={panel.name} className={`flex items-center justify-between px-4 py-3 bg-card rounded-sm text-xs font-medium text-foreground border-l-[3px] ${panel.border} shadow-sm cursor-grab active:cursor-grabbing`}>
                    <span className="font-headline font-semibold">{panel.name}</span>
                    <MoveVertical className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* Sticky Decision Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-md border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive text-xs font-bold uppercase tracking-wider rounded-sm ml-2">
              <Trash2 className="w-4 h-4 mr-2" /> Delete Preset
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="text-foreground text-xs font-bold uppercase tracking-wider rounded-sm border-border bg-card">
                <Copy className="w-4 h-4 mr-2" /> Duplicate
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-sm shadow-[0_4px_14px_0_rgba(255,107,53,0.39)]">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
