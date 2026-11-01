import { NextRequest, NextResponse } from 'next/server'
import { getReservationById, updateReservation } from '@/lib/db'
import { sendRefusalEmail, sendAcceptanceEmail } from '@/lib/email'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const action = req.nextUrl.searchParams.get('action')
  const { id } = await params

  const reservation = await getReservationById(id)

  if (!reservation) {
    return new NextResponse(
      '<h2 style="font-family:sans-serif">Demande introuvable.</h2>',
      { headers: { 'Content-Type': 'text/html' } },
    )
  }

  if (action === 'accepted') {
    await updateReservation(id, { status: 'accepted' })
    await sendAcceptanceEmail(reservation.clientEmail, reservation.clientName, reservation)
    return new NextResponse(`
      <html><body style="font-family:sans-serif;background:#0A0A0A;
        color:#E8E0D8;padding:40px;text-align:center;">
        <h2 style="color:#4CAF50">✓ Séance acceptée</h2>
        <p>Le client a été notifié par email.</p>
        <p style="color:#5A5250;font-size:0.8rem">
          ${reservation.clientName} · ${reservation.date} à ${reservation.time}
        </p>
        <a href="/admin" style="color:#8B1A1A">← Retour à l'admin</a>
      </body></html>
    `, { headers: { 'Content-Type': 'text/html' } })
  }

  if (action === 'refused') {
    await updateReservation(id, { status: 'refused' })
    await sendRefusalEmail(reservation.clientEmail, reservation.clientName)
    return new NextResponse(`
      <html><body style="font-family:sans-serif;background:#0A0A0A;
        color:#E8E0D8;padding:40px;text-align:center;">
        <h2 style="color:#8B1A1A">✗ Séance refusée</h2>
        <p>Le client a été invité à reprendre rendez-vous.</p>
        <a href="/admin" style="color:#8B1A1A">← Retour à l'admin</a>
      </body></html>
    `, { headers: { 'Content-Type': 'text/html' } })
  }

  return new NextResponse(
    '<h2 style="font-family:sans-serif">Action inconnue.</h2>',
    { headers: { 'Content-Type': 'text/html' } },
  )
}
