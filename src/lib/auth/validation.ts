import { z } from 'zod';

// ─── Login Schema ───────────────────────────────────────────
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'Password is required.' }),
});

// ─── Signup Schema ──────────────────────────────────────────
export const SignupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Please enter a valid email.' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Must contain at least one number.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

// ─── Magic Link Schema ─────────────────────────────────────
export const MagicLinkSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email.' })
    .trim(),
});

// ─── Form State Types ───────────────────────────────────────
export type AuthFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  success?: boolean;
} | undefined;
