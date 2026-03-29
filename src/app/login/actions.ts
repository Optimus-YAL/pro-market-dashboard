'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/auth/session';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import {
  LoginSchema,
  SignupSchema,
  MagicLinkSchema,
  type AuthFormState,
} from '@/lib/auth/validation';
import { randomBytes } from 'crypto';
import { Resend } from 'resend';

// ─── Login ──────────────────────────────────────────────────
export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validated = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;


  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.passwordHash) {
    return { message: 'Invalid credentials.' };
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return { message: 'Invalid credentials.' };
  }

  await createSession(user.id, user.email);
  redirect('/dashboard');
}

// ─── Signup ─────────────────────────────────────────────────
export async function signupAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validated = SignupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;


  // Check for existing user
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { message: 'An account with this email already exists.' };
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
    },
  });

  await createSession(user.id, user.email);
  redirect('/dashboard');
}

// ─── Magic Link ─────────────────────────────────────────────
export async function magicLinkAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validated = MagicLinkSchema.safeParse({
    email: formData.get('magicLinkEmail'),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email } = validated.data;


  // Generate secure token
  const token = randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  // Upsert user — create if doesn't exist (magic-link-only), update token if does
  await prisma.user.upsert({
    where: { email },
    update: { magicLinkToken: token, magicLinkExpiry: expiry },
    create: { email, magicLinkToken: token, magicLinkExpiry: expiry },
  });

  // Build verification URL
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001';
  const verifyUrl = `${baseUrl}/api/auth/verify?token=${token}`;

  // Send email via Resend (or log to console if not configured)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && !resendKey.includes('placeholder')) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'Pro Market <noreply@promarket.app>',
        to: email,
        subject: 'Your Pro Market Login Link',
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
            <h2 style="color: #FF6B35; margin-bottom: 8px;">Pro Market Dashboard</h2>
            <p style="color: #666; margin-bottom: 24px;">Click below to sign in to your account. This link expires in 15 minutes.</p>
            <a href="${verifyUrl}" style="display: inline-block; background: #FF6B35; color: white; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: 600;">
              Sign In to Dashboard
            </a>
            <p style="color: #999; font-size: 12px; margin-top: 32px;">If you didn't request this link, you can safely ignore this email.</p>
          </div>
        `,
      });
    } catch (err) {
      console.error('[magic-link] Failed to send email:', err);
      return { message: 'Failed to send login link. Please try again.' };
    }
  } else {
    // Dev fallback: log to console
    console.log('\n══════════════════════════════════════════════');
    console.log('🔗 MAGIC LINK (dev mode — no RESEND_API_KEY)');
    console.log(`   Email: ${email}`);
    console.log(`   Link:  ${verifyUrl}`);
    console.log('══════════════════════════════════════════════\n');
  }

  return {
    success: true,
    message: 'Login link sent! Check your email.',
  };
}

// ─── Logout ─────────────────────────────────────────────────
export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect('/');
}
