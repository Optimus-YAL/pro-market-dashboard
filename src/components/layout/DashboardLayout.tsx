import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { DecisionBar } from "./DecisionBar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <Sidebar />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative">
        <Header />
        <main className="flex-1 overflow-x-hidden relative">
          <div className="max-w-[1600px] mx-auto w-full p-4 md:p-6 lg:p-8 pb-32">
            {children}
          </div>
        </main>
        <DecisionBar />
      </div>
    </div>
  );
}
