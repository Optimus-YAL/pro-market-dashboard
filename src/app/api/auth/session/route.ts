import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Optionally fetch fresh user data
  let user = null;
  if (prisma) {
    user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  }

  return NextResponse.json({
    authenticated: true,
    user: user || { id: session.userId, email: session.email },
  });
}
