import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// ─── Types ──────────────────────────────────────────────────
export interface SessionPayload {
  userId: string;
  email: string;
  expiresAt: Date;
}

// ─── Config ─────────────────────────────────────────────────
const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error('SESSION_SECRET environment variable is required');
}
const encodedKey = new TextEncoder().encode(secretKey);
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
const COOKIE_NAME = 'pm-session';

// ─── Encrypt / Decrypt ─────────────────────────────────────
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload, expiresAt: payload.expiresAt.toISOString() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | null> {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

// ─── Session CRUD ───────────────────────────────────────────
export async function createSession(userId: string, email: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const session = await encrypt({ userId, email, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  return decrypt(session);
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function updateSession(): Promise<void> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) return;

  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export { COOKIE_NAME };
