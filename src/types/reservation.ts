export type Duration = '30min' | '1h'
export type Formula = 'duo' | 'trio'
export type Status = 'pending' | 'accepted' | 'refused' | 'rescheduled'

export interface Reservation {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  duration: Duration
  formula: Formula
  date: string        // ISO date
  time: string        // "14:00"
  status: Status
  createdAt: string
  message?: string    // message optionnel du client
}

export const PRICES: Record<Formula, Record<Duration, number>> = {
  duo: {
    '30min': 110,
    '1h':    180,
  },
  trio: {
    '30min': 165,
    '1h':    270,
  },
}
