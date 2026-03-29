import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { DashboardShellWrapper } from '@/components/layout/DashboardShellWrapper';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <DashboardShellWrapper>{children}</DashboardShellWrapper>;
}
