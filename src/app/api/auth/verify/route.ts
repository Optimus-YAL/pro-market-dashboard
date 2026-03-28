import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth/session';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=Invalid+link', request.url));
  }




  // Find user with matching, unexpired token
  const user = await prisma.user.findFirst({
    where: {
      magicLinkToken: token,
      magicLinkExpiry: { gte: new Date() },
    },
  });

  if (!user) {
    return NextResponse.redirect(
      new URL('/login?error=Link+expired+or+invalid.+Please+request+a+new+one.', request.url)
    );
  }

  // Clear the magic link token (single use)
  await prisma.user.update({
    where: { id: user.id },
    data: { magicLinkToken: null, magicLinkExpiry: null },
  });

  // Create session and redirect
  await createSession(user.id, user.email);
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
