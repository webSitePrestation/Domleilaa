import { createClient } from '@supabase/supabase-js'
import type { Reservation } from '@/types/reservation'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
let warnedMissingConfig = false

type ReservationRow = {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  duration: Reservation['duration']
  formula: Reservation['formula']
  date: string
  time: string
  status: Reservation['status']
  created_at: string
  message: string | null
}

function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    if (!warnedMissingConfig) {
      warnedMissingConfig = true
      console.error(
        'Configuration Supabase manquante: définir SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.',
      )
    }
    throw new Error(
      'Configuration Supabase manquante: définir SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.',
    )
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

function fromRow(row: ReservationRow): Reservation {
  return {
    id: row.id,
    clientName: row.client_name,
    clientEmail: row.client_email,
    clientPhone: row.client_phone,
    duration: row.duration,
    formula: row.formula,
    date: row.date,
    time: row.time,
    status: row.status,
    createdAt: row.created_at,
    message: row.message ?? '',
  }
}

export async function getReservations(): Promise<Reservation[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Lecture des réservations impossible: ${error.message}`)
  }

  return (data ?? []).map((row) => fromRow(row as ReservationRow))
}

export async function saveReservation(res: Reservation): Promise<void> {
  const supabase = getSupabase()
  const { error } = await supabase.from('reservations').insert({
    id: res.id,
    client_name: res.clientName,
    client_email: res.clientEmail,
    client_phone: res.clientPhone,
    duration: res.duration,
    formula: res.formula,
    date: res.date,
    time: res.time,
    status: res.status,
    created_at: res.createdAt,
    message: res.message || null,
  })

  if (error) {
    throw new Error(`Création réservation impossible: ${error.message}`)
  }
}

export async function updateReservation(
  id: string,
  updates: Partial<Reservation>,
): Promise<void> {
  const supabase = getSupabase()
  const payload: Partial<ReservationRow> = {}

  if (updates.status !== undefined) payload.status = updates.status
  if (updates.date !== undefined) payload.date = updates.date
  if (updates.time !== undefined) payload.time = updates.time
  if (updates.message !== undefined) payload.message = updates.message

  if (Object.keys(payload).length === 0) return

  const { error } = await supabase.from('reservations').update(payload).eq('id', id)

  if (error) {
    throw new Error(`Mise a jour réservation impossible: ${error.message}`)
  }
}

export async function getReservationById(id: string): Promise<Reservation | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(`Lecture réservation impossible: ${error.message}`)
  }

  if (!data) {
    return null
  }

  return fromRow(data as ReservationRow)
}
