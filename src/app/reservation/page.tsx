'use client'

import {
  useMemo,
  useState,
  type CSSProperties,
  type JSX,
} from 'react'
import Link from 'next/link'
import type { Duration, Formula } from '@/types/reservation'
import { PRICES } from '@/types/reservation'

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const

const DURATION_OPTIONS: { value: Duration; label: string }[] = [
  { value: '30min', label: '30 min' },
  { value: '1h', label: '1 heure' },
]
const FIXED_TIME_OPTIONS = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'] as const

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

function parseISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function monthMatrix(year: number, month: number): (Date | null)[][] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startPad = (first.getDay() + 6) % 7
  const daysInMonth = last.getDate()
  const cells: (Date | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  while (cells.length < 42) cells.push(null)
  const rows: (Date | null)[][] = []
  for (let r = 0; r < cells.length; r += 7) rows.push(cells.slice(r, r + 7))
  return rows
}

function phoneDigitsMin10(phone: string): boolean {
  return phone.replace(/\D/g, '').length >= 10
}

function basicEmailOk(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function ReservationPage(): JSX.Element {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [formula, setFormula] = useState<Formula | null>(null)
  const [duration, setDuration] = useState<Duration | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [customTimeRequest, setCustomTimeRequest] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [message, setMessage] = useState('')
  const [nameFirst, setNameFirst] = useState('')
  const [nameLast, setNameLast] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear())
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth())

  const clientName = useMemo(
    () => `${nameFirst.trim()} ${nameLast.trim()}`.trim(),
    [nameFirst, nameLast],
  )

  const minSelectableDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const maxSelectableDate = useMemo(() => {
    const d = new Date(minSelectableDate)
    d.setDate(d.getDate() + 30)
    d.setHours(0, 0, 0, 0)
    return d
  }, [minSelectableDate])

  const currentPrice =
    formula && duration ? PRICES[formula][duration] : null

  const monthLabel = useMemo(() => {
    return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(
      new Date(calendarYear, calendarMonth, 1),
    )
  }, [calendarYear, calendarMonth])

  const grid = useMemo(
    () => monthMatrix(calendarYear, calendarMonth),
    [calendarYear, calendarMonth],
  )

  const formulaLabel = (f: Formula) => (f === 'duo' ? 'Duo' : 'Trio')
  const durationLabel = (d: Duration) =>
    DURATION_OPTIONS.find((o) => o.value === d)?.label ?? d

  const step3Valid =
    nameFirst.trim().length > 0 &&
    nameLast.trim().length > 0 &&
    basicEmailOk(clientEmail) &&
    phoneDigitsMin10(clientPhone)

  const goStep = (s: 1 | 2 | 3 | 4) => {
    if (s < 4) {
      setIsSuccess(false)
      setIsError(false)
      setErrorMessage('')
    }
    setStep(s)
  }

  const submitReservation = async () => {
    if (!formula || !duration || !selectedDate || !selectedTime) return
    const mergedMessage = [
      message.trim(),
      customTimeRequest.trim()
        ? `Autre horaire souhaité : ${customTimeRequest.trim()}`
        : '',
    ].filter(Boolean).join('\n')
    setIsLoading(true)
    setIsError(false)
    setErrorMessage('')
    setIsSuccess(false)
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim(),
          clientPhone: clientPhone.trim(),
          duration,
          formula,
          date: selectedDate,
          time: selectedTime,
          message: mergedMessage,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Envoi impossible.')
      setIsSuccess(true)
    } catch (e) {
      setIsError(true)
      setErrorMessage(e instanceof Error ? e.message : 'Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  const cardStyle = (selected: boolean): CSSProperties => ({
    border: '1px solid',
    borderColor: selected ? 'var(--red-primary)' : 'var(--grey-border)',
    background: selected ? 'var(--bg-elevated)' : 'transparent',
    color: 'var(--text-primary)',
  })

  const btnPrimary: CSSProperties = {
    background: 'var(--red-primary)',
    color: 'var(--ivory)',
  }

  return (
    <main
      className="relative z-10 mx-auto w-full max-w-[700px] px-8 py-16"
      style={{ color: 'var(--text-primary)', background: 'var(--bg-primary)' }}
    >
      <h1
        className="mb-10 text-center text-3xl tracking-tight md:text-4xl"
        style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
      >
        Réserver une séance
      </h1>
      {!isSuccess && (
        <div className="mb-8 flex justify-center">
          <Link
            href="/"
            className="rounded border px-4 py-2 text-xs uppercase tracking-widest text-[var(--text-secondary)] transition-colors hover:text-[var(--ivory)]"
            style={{ borderColor: 'var(--grey-border)' }}
          >
            Annuler et revenir a l'accueil
          </Link>
        </div>
      )}

      {/* Indicateur d’étapes */}
      <div className="mb-12">
        <div className="relative flex justify-between">
          <div
            className="absolute left-0 top-[15px] z-0 h-0.5 w-full"
            style={{ background: 'var(--grey-border)' }}
            aria-hidden
          />
          <div
            className="absolute left-0 top-[15px] z-0 h-0.5 transition-all duration-300"
            style={{
              background: 'var(--red-primary)',
              width: `${((step - 1) / 3) * 100}%`,
            }}
            aria-hidden
          />
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} className="relative z-10 flex flex-col items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium"
                style={{
                  background: step >= n ? 'var(--red-primary)' : 'var(--bg-elevated)',
                  color: step >= n ? 'var(--ivory)' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: step >= n ? 'var(--red-primary)' : 'var(--grey-border)',
                }}
              >
                {n}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                {n === 1 && 'Formule'}
                {n === 2 && 'Créneau'}
                {n === 3 && 'Coordonnées'}
                {n === 4 && 'Envoi'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ÉTAPE 1 */}
      {step === 1 && (
        <section className="space-y-8">
          <h2
            className="text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
          >
            Formule et durée
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(['duo', 'trio'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormula(f)}
                className="rounded-lg p-6 text-left transition-colors"
                style={cardStyle(formula === f)}
              >
                <span
                  className="text-lg font-medium"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {formulaLabel(f)}
                </span>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {f === 'duo' ? 'Deux dominatrices.' : 'Trois dominatrices.'}
                </p>
              </button>
            ))}
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-widest text-[var(--text-muted)]">
              Durée
            </p>
            <div className="flex flex-wrap gap-3">
              {DURATION_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDuration(value)}
                  className="rounded-lg px-5 py-3 text-sm transition-colors"
                  style={cardStyle(duration === value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {currentPrice !== null && (
            <p className="text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="text-[var(--text-secondary)]">Tarif : </span>
              <span className="text-[var(--ivory)]">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(currentPrice)}
              </span>
            </p>
          )}
          <div
            className="rounded-lg border p-4 text-sm text-[var(--text-secondary)]"
            style={{ borderColor: 'var(--grey-border)', background: 'var(--bg-elevated)' }}
          >
            <p>Sessions réelles à Charenton-le-Pont (métro Liberté), en journée ou début de soirée.</p>
            <p className="mt-2">
              Rappel strict : ni nudité ni masturbation pendant les séances (ni vous ni nous).
            </p>
          </div>

          <button
            type="button"
            disabled={!formula || !duration}
            className="w-full rounded py-3 text-sm font-medium uppercase tracking-widest transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            style={btnPrimary}
            onClick={() => goStep(2)}
          >
            Continuer
          </button>
        </section>
      )}

      {/* ÉTAPE 2 */}
      {step === 2 && (
        <section className="space-y-8">
          <h2
            className="text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
          >
            Choisir un créneau
          </h2>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              className="rounded border px-3 py-2 text-sm text-[var(--text-secondary)]"
              style={{ borderColor: 'var(--grey-border)' }}
              onClick={() => {
                if (calendarMonth === 0) {
                  setCalendarMonth(11)
                  setCalendarYear((y) => y - 1)
                } else setCalendarMonth((m) => m - 1)
                setSelectedDate(null)
                setSelectedTime(null)
              }}
            >
              ←
            </button>
            <span
              className="capitalize"
              style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
            >
              {monthLabel}
            </span>
            <button
              type="button"
              className="rounded border px-3 py-2 text-sm text-[var(--text-secondary)]"
              style={{ borderColor: 'var(--grey-border)' }}
              onClick={() => {
                if (calendarMonth === 11) {
                  setCalendarMonth(0)
                  setCalendarYear((y) => y + 1)
                } else setCalendarMonth((m) => m + 1)
                setSelectedDate(null)
                setSelectedTime(null)
              }}
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--text-muted)]">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-2 font-medium uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {grid.map((row, ri) => (
              <div key={ri} className="grid grid-cols-7 gap-1">
                {row.map((cell, ci) => {
                  if (!cell) {
                    return <div key={ci} className="aspect-square" />
                  }
                  const iso = toISODate(cell)
                  const isSelected = selectedDate === iso
                  const normalized = new Date(cell)
                  normalized.setHours(0, 0, 0, 0)
                  const selectable = normalized >= minSelectableDate && normalized <= maxSelectableDate
                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={!selectable}
                      onClick={() => {
                        setSelectedDate(iso)
                        setSelectedTime(null)
                      }}
                      className="aspect-square rounded text-sm transition-colors disabled:cursor-not-allowed"
                      style={{
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--red-primary)' : 'var(--grey-border)',
                        background: isSelected
                          ? 'var(--bg-elevated)'
                          : selectable
                            ? 'transparent'
                            : 'var(--bg-secondary)',
                        color: selectable ? 'var(--text-primary)' : 'var(--text-muted)',
                        opacity: selectable ? 1 : 0.45,
                      }}
                      onMouseEnter={(e) => {
                        if (!selectable) return
                        e.currentTarget.style.borderColor = 'var(--red-primary)'
                        e.currentTarget.style.background = 'var(--red-glow)'
                      }}
                      onMouseLeave={(e) => {
                        if (!selectable) return
                        e.currentTarget.style.borderColor = isSelected
                          ? 'var(--red-primary)'
                          : 'var(--grey-border)'
                        e.currentTarget.style.background = isSelected
                          ? 'var(--bg-elevated)'
                          : 'transparent'
                      }}
                    >
                      {cell.getDate()}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          {selectedDate && (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">
                Horaires proposés le{' '}
                {new Intl.DateTimeFormat('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                }).format(parseISODate(selectedDate))}
              </p>
              <div className="flex flex-wrap gap-2">
                {FIXED_TIME_OPTIONS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className="rounded-lg px-4 py-2 text-sm"
                    style={cardStyle(selectedTime === time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <label className="block text-sm">
                <span className="mb-1 block text-[var(--text-muted)]">Autre horaire souhaité ?</span>
                <input
                  className="w-full rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
                  style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
                  value={customTimeRequest}
                  onChange={(e) => setCustomTimeRequest(e.target.value)}
                  placeholder="Ex: 11:30 ou soirée tardive"
                />
              </label>
            </div>
          )}

          <p className="text-sm text-[var(--text-secondary)]">
            Cette demande sera confirmée ou refusée sous 48h.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex-1 rounded border py-3 text-sm uppercase tracking-widest text-[var(--text-secondary)]"
              style={{ borderColor: 'var(--grey-border)' }}
              onClick={() => goStep(1)}
            >
              Retour
            </button>
            <button
              type="button"
              disabled={!selectedDate || !selectedTime || isLoading || isError}
              className="flex-1 rounded py-3 text-sm font-medium uppercase tracking-widest transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              style={btnPrimary}
              onClick={() => goStep(3)}
            >
              Continuer
            </button>
          </div>
        </section>
      )}

      {/* ÉTAPE 3 */}
      {step === 3 && (
        <section className="space-y-8">
          <h2
            className="text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
          >
            Vos informations
          </h2>

          <div
            className="rounded-lg border p-4 text-sm"
            style={{
              borderColor: 'var(--grey-border)',
              background: 'var(--bg-elevated)',
            }}
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-[var(--text-muted)]">
              Récapitulatif
            </p>
            <ul className="space-y-1 text-[var(--text-secondary)]">
              <li>
                <span className="text-[var(--text-muted)]">Formule : </span>
                {formula && formulaLabel(formula)}
              </li>
              <li>
                <span className="text-[var(--text-muted)]">Durée : </span>
                {duration && durationLabel(duration)}
              </li>
              {currentPrice !== null && (
                <li>
                  <span className="text-[var(--text-muted)]">Prix : </span>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(currentPrice)}
                </li>
              )}
              {selectedDate && (
                <li>
                  <span className="text-[var(--text-muted)]">Date : </span>
                  {new Intl.DateTimeFormat('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format(parseISODate(selectedDate))}
                </li>
              )}
              {selectedTime && (
                <li>
                  <span className="text-[var(--text-muted)]">Heure : </span>
                  {selectedTime}
                </li>
              )}
              {customTimeRequest.trim() && (
                <li>
                  <span className="text-[var(--text-muted)]">Autre horaire souhaité : </span>
                  {customTimeRequest.trim()}
                </li>
              )}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-[var(--text-muted)]">Prénom</span>
              <input
                className="w-full rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
                style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
                value={nameFirst}
                onChange={(e) => setNameFirst(e.target.value)}
                autoComplete="given-name"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-[var(--text-muted)]">Nom</span>
              <input
                className="w-full rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
                style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
                value={nameLast}
                onChange={(e) => setNameLast(e.target.value)}
                autoComplete="family-name"
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--text-muted)]">Email</span>
            <input
              type="email"
              required
              className="w-full rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
              style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--text-muted)]">Téléphone</span>
            <input
              type="tel"
              className="w-full rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
              style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              autoComplete="tel"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-[var(--text-muted)]">Message (optionnel)</span>
            <textarea
              rows={4}
              className="w-full resize-y rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
              style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex-1 rounded border py-3 text-sm uppercase tracking-widest text-[var(--text-secondary)]"
              style={{ borderColor: 'var(--grey-border)' }}
              onClick={() => goStep(2)}
            >
              Retour
            </button>
            <button
              type="button"
              disabled={!step3Valid}
              className="flex-1 rounded py-3 text-sm font-medium uppercase tracking-widest transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              style={btnPrimary}
              onClick={() => goStep(4)}
            >
              Continuer
            </button>
          </div>
        </section>
      )}

      {/* ÉTAPE 4 */}
      {step === 4 && (
        <section className="space-y-8">
          <h2
            className="text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
          >
            Confirmation
          </h2>

          {isSuccess ? (
            <div className="space-y-6">
              <p
                className="text-center text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
              >
                Demande envoyée — En attente de confirmation
              </p>
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="rounded px-6 py-3 text-sm font-medium uppercase tracking-widest"
                  style={btnPrimary}
                >
                  Terminer
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div
                className="rounded-lg border p-4 text-sm"
                style={{
                  borderColor: 'var(--grey-border)',
                  background: 'var(--bg-elevated)',
                }}
              >
                <ul className="space-y-2 text-[var(--text-secondary)]">
                  <li>
                    {formula && formulaLabel(formula)} · {duration && durationLabel(duration)} ·{' '}
                    {currentPrice !== null &&
                      new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(currentPrice)}
                  </li>
                  {selectedDate && selectedTime && (
                    <li>
                      {new Intl.DateTimeFormat('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }).format(parseISODate(selectedDate))}{' '}
                      à {selectedTime}
                    </li>
                  )}
                  <li>
                    {clientName.trim() || '—'} — {clientEmail.trim() || '—'}
                  </li>
                </ul>
              </div>

              {isError && (
                <p className="text-sm text-[var(--red-bright)]">{errorMessage}</p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex-1 rounded border py-3 text-sm uppercase tracking-widest text-[var(--text-secondary)]"
                  style={{ borderColor: 'var(--grey-border)' }}
                  disabled={isLoading}
                  onClick={() => goStep(3)}
                >
                  Retour
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  className="flex-1 rounded py-3 text-sm font-medium uppercase tracking-widest transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                  style={btnPrimary}
                  onClick={() => void submitReservation()}
                >
                  {isLoading ? 'Envoi…' : 'Envoyer la demande'}
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </main>
  )
}
