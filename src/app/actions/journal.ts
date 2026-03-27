'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export async function addJournalEntry(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const asset = formData.get('asset') as string
  const setup = formData.get('setup') as string
  const direction = formData.get('direction') as string || 'Long'
  const entry = parseFloat(formData.get('entry') as string)
  const exitStr = formData.get('exit') as string
  const exit = exitStr ? parseFloat(exitStr) : null
  const stop = parseFloat(formData.get('stop') as string) || 0
  const target = parseFloat(formData.get('target') as string) || 0
  const notes = formData.get('notes') as string

  // Temporarily store the Asset/Pair in the notes because it's not in the 1.0 Prisma schema
  const combinedNotes = `[${asset}] ${notes}`

  let pnl = null
  if (exit !== null) {
    pnl = direction === 'Long' ? exit - entry : entry - exit
  }

  await prisma.journalEntry.create({
    data: {
      userId: user.id,
      date: new Date().toISOString().split('T')[0],
      setup,
      direction,
      entry,
      exit,
      stop,
      target,
      pnl,
      notes: combinedNotes,
    },
  })

  revalidatePath('/journal')
}
