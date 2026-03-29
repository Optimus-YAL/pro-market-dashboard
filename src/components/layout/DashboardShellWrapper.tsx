'use client';

import { DashboardShell } from './DashboardShell';

export function DashboardShellWrapper({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
