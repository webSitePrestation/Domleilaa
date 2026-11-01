import { NextRequest, NextResponse } from 'next/server'
import { getReservationById, updateReservation } from '@/lib/db'
import { sendRescheduleEmail } from '@/lib/email'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { proposedDate = '', proposedTime = '', customMessage = '' } = await req.json()

  const reservation = await getReservationById(id)
  if (!reservation) {
    return NextResponse.json({ error: 'Demande introuvable.' }, { status: 404 })
  }

  await sendRescheduleEmail(
    reservation.clientEmail,
    reservation.clientName,
    String(proposedDate),
    String(proposedTime),
    String(customMessage),
  )
  await updateReservation(id, { status: 'rescheduled' })

  return NextResponse.json({ success: true })
}
