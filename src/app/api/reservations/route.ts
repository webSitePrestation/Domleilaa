import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getReservations, saveReservation } from '@/lib/db'
import { sendAdminNotification, sendPendingEmail } from '@/lib/email'
import type { Reservation } from '@/types/reservation'

// GET : liste toutes les réservations (admin uniquement)
export async function GET() {
  const reservations = await getReservations()
  return NextResponse.json(reservations)
}

// POST : créer une nouvelle réservation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { clientName, clientEmail, clientPhone, duration, formula, date, time, message } =
      body

    if (!clientName || !clientEmail || !clientPhone || !duration || !formula || !date || !time) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const reservation: Reservation = {
      id: randomUUID(),
      clientName,
      clientEmail,
      clientPhone,
      duration,
      formula,
      date,
      time,
      status: 'pending',
      createdAt: new Date().toISOString(),
      message: message || '',
    }

    await saveReservation(reservation)
    const warnings: string[] = []
    try {
      await sendAdminNotification(reservation)
    } catch (error) {
      console.error('Admin notification failed:', error)
      warnings.push(
        `Email admin non envoyé: ${
          error instanceof Error ? error.message : "Erreur d'envoi inconnue."
        }`,
      )
    }
    try {
      await sendPendingEmail(reservation.clientEmail, reservation.clientName, reservation)
    } catch (error) {
      console.error('Pending confirmation email failed:', error)
      warnings.push(
        `Email de confirmation client non envoyé: ${
          error instanceof Error ? error.message : "Erreur d'envoi inconnue."
        }`,
      )
    }

    return NextResponse.json(
      {
        success: true,
        id: reservation.id,
        ...(warnings.length > 0 ? { warning: warnings.join(' | ') } : {}),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Reservation creation failed:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Envoi impossible: erreur serveur inattendue.',
      },
      { status: 500 },
    )
  }
}
