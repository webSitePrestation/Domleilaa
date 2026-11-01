import { NextRequest, NextResponse } from 'next/server'
import { getReservationById, updateReservation } from '@/lib/db'
import { sendAcceptanceEmail, sendRefusalEmail } from '@/lib/email'

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { status } = await req.json()
  const { id } = await context.params

  const reservation = await getReservationById(id)
  if (!reservation) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })

  await updateReservation(id, { status })

  // Les emails ne doivent jamais bloquer le reclassement admin.
  if (status === 'accepted') {
    void sendAcceptanceEmail(
      reservation.clientEmail,
      reservation.clientName,
      reservation,
    ).catch((error) => {
      console.warn('[email] acceptance failed:', error)
    })
  }
  if (status === 'refused') {
    void sendRefusalEmail(reservation.clientEmail, reservation.clientName).catch(
      (error) => {
        console.warn('[email] refusal failed:', error)
      },
    )
  }

  return NextResponse.json({ success: true })
}
