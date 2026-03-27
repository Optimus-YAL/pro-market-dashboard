'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

import { prisma } from '@/lib/prisma'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/performance')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  // Ensure user exists in Prisma db
  if (authData.user) {
    try {
      await prisma.user.upsert({
        where: { id: authData.user.id },
        update: {},
        create: {
          id: authData.user.id,
          email: authData.user.email ?? data.email,
          passwordHash: 'supabase-managed',
        },
      })
    } catch (dbError) {
      console.error(dbError)
      // Non-blocking catch
    }
  }

  revalidatePath('/', 'layout')
  redirect('/performance')
}
