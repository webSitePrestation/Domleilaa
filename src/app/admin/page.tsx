'use client'

import {
  useCallback,
  Suspense,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
  type JSX,
} from 'react'
import { useSearchParams } from 'next/navigation'
import type { Duration, Formula, Reservation } from '@/types/reservation'
import { PRICES } from '@/types/reservation'

const AUTH_KEY = 'adminAuth'

function parseISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formulaLabel(f: Formula): string {
  return f === 'duo' ? 'Duo' : 'Trio'
}

function durationLabel(d: Duration): string {
  if (d === '30min') return '30 min'
  return '1 h'
}

function formatEUR(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
}

const cardBase: CSSProperties = {
  border: '1px solid var(--grey-border)',
  borderRadius: 4,
}

function AdminPageInner(): JSX.Element {
  const searchParams = useSearchParams()
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [reservations, setReservations] = useState<Reservation[]>([])
  const [resLoading, setResLoading] = useState(false)
  const [resError, setResError] = useState('')
  const [actionId, setActionId] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState('')
  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [rescheduleId, setRescheduleId] = useState<string | null>(null)
  const [proposedDate, setProposedDate] = useState('')
  const [proposedTime, setProposedTime] = useState('')
  const [rescheduleMessage, setRescheduleMessage] = useState('')
  const [rescheduleLoading, setRescheduleLoading] = useState(false)

  useEffect(() => {
    setAuthed(typeof window !== 'undefined' && sessionStorage.getItem(AUTH_KEY) === 'true')
  }, [])

  const loadReservations = useCallback(async () => {
    setResLoading(true)
    setResError('')
    try {
      const res = await fetch('/api/reservations')
      if (!res.ok) throw new Error('Chargement impossible.')
      const data: unknown = await res.json()
      if (!Array.isArray(data)) throw new Error('Données invalides.')
      setReservations(data as Reservation[])
    } catch (e) {
      setResError(e instanceof Error ? e.message : 'Erreur')
    } finally {
      setResLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed !== true) return
    void loadReservations()
  }, [authed, loadReservations])

  useEffect(() => {
    if (authed !== true || reservations.length === 0) return
    const openReschedule = searchParams.get('openReschedule')
    if (!openReschedule) return
    const target = reservations.find((r) => r.id === openReschedule)
    if (!target) return
    setRescheduleId(target.id)
    setProposedDate(target.date ?? '')
    setProposedTime(target.time ?? '')
    setRescheduleMessage('')
    setRescheduleOpen(true)
  }, [authed, reservations, searchParams])

  const pending = useMemo(
    () => reservations.filter((r) => r.status === 'pending'),
    [reservations],
  )
  const accepted = useMemo(
    () => reservations.filter((r) => r.status === 'accepted'),
    [reservations],
  )
  const refused = useMemo(
    () => reservations.filter((r) => r.status === 'refused' || r.status === 'rescheduled'),
    [reservations],
  )

  const login = async (e: FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setLoginError('Mot de passe incorrect.')
        return
      }
      sessionStorage.setItem(AUTH_KEY, 'true')
      setAuthed(true)
      setPassword('')
    } catch {
      setLoginError('Erreur réseau.')
    } finally {
      setLoginLoading(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
  }

  const patchStatus = async (id: string, status: 'accepted' | 'refused') => {
    const previousReservations = reservations
    setResError('')
    setActionMessage(status === 'accepted' ? 'Demande acceptée.' : 'Demande refusée.')
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation,
      ),
    )
    setActionId(id)
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Mise à jour impossible.')
    } catch (e) {
      setReservations(previousReservations)
      setResError(e instanceof Error ? e.message : 'Erreur')
      setActionMessage('')
    } finally {
      setActionId(null)
    }
  }

  const sendReschedule = async () => {
    if (!rescheduleId) return
    setRescheduleLoading(true)
    setResError('')
    try {
      const res = await fetch(`/api/reservations/${rescheduleId}/reschedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposedDate,
          proposedTime,
          customMessage: rescheduleMessage,
        }),
      })
      if (!res.ok) throw new Error('Envoi de proposition impossible.')
      setRescheduleOpen(false)
      setRescheduleId(null)
      setProposedDate('')
      setProposedTime('')
      setRescheduleMessage('')
      await loadReservations()
    } catch (e) {
      setResError(e instanceof Error ? e.message : 'Erreur')
    } finally {
      setRescheduleLoading(false)
    }
  }

  const ReservationCard = ({ r, column }: { r: Reservation; column: 'pending' | 'accepted' | 'refused' }) => {
    const price = PRICES[r.formula][r.duration]
    const bg =
      column === 'pending'
        ? 'rgba(139, 26, 26, 0.14)'
        : column === 'accepted'
          ? 'rgba(46, 125, 50, 0.14)'
          : 'rgba(255, 255, 255, 0.04)'

    return (
      <article
        className="p-4 text-sm"
        style={{
          ...cardBase,
          background: bg,
          fontFamily: 'var(--font-jost), Jost, sans-serif',
          color: 'var(--text-primary)',
        }}
      >
        <p className="text-base font-medium" style={{ fontFamily: 'var(--font-playfair)' }}>
          {r.clientName}
        </p>
        <p className="mt-1">
          <a className="text-[var(--text-secondary)] underline hover:text-[var(--red-bright)]" href={`mailto:${r.clientEmail}`}>
            {r.clientEmail}
          </a>
        </p>
        <p className="mt-1">
          <a className="text-[var(--text-secondary)] underline hover:text-[var(--red-bright)]" href={`tel:${r.clientPhone.replace(/\s/g, '')}`}>
            {r.clientPhone}
          </a>
        </p>
        <p className="mt-3 text-[var(--text-secondary)]">
          {formulaLabel(r.formula)} · {durationLabel(r.duration)} · {formatEUR(price)}
        </p>
        <p className="mt-2 text-[var(--text-secondary)]">
          {new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(parseISODate(r.date))}{' '}
          à {r.time}
        </p>
        {r.message?.trim() ? (
          <p className="mt-3 border-t border-[var(--grey-border)] pt-3 text-[var(--text-muted)] italic">
            « {r.message.trim()} »
          </p>
        ) : null}
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Demande :{' '}
          {new Intl.DateTimeFormat('fr-FR', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(r.createdAt))}
        </p>
        {column === 'pending' && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={actionId === r.id}
              className="rounded px-3 py-2 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
              style={{ background: '#2A2A2A', color: '#F0EAE0', border: '1px solid #3D3D3D' }}
              onClick={() => {
                setRescheduleId(r.id)
                setProposedDate(r.date)
                setProposedTime(r.time)
                setRescheduleMessage('')
                setRescheduleOpen(true)
              }}
            >
              ↻ Proposer
            </button>
            <button
              type="button"
              disabled={actionId === r.id}
              className="rounded px-3 py-2 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
              style={{ background: '#2e7d32', color: '#fff' }}
              onClick={() => void patchStatus(r.id, 'accepted')}
            >
              ✓ Accepter
            </button>
            <button
              type="button"
              disabled={actionId === r.id}
              className="rounded px-3 py-2 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
              style={{ background: 'var(--red-primary)', color: 'var(--ivory)' }}
              onClick={() => void patchStatus(r.id, 'refused')}
            >
              ✗ Refuser
            </button>
          </div>
        )}
      </article>
    )
  }

  const Column = ({
    title,
    list,
    column,
  }: {
    title: string
    list: Reservation[]
    column: 'pending' | 'accepted' | 'refused'
  }) => (
    <div className="space-y-3">
      <h3
        className="text-lg"
        style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
      >
        {title}{' '}
        <span className="text-sm font-normal text-[var(--text-muted)]">({list.length})</span>
      </h3>
      <div className="space-y-3">
        {list.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Aucune demande.</p>
        ) : (
          list.map((r) => <ReservationCard key={r.id} r={r} column={column} />)
        )}
      </div>
    </div>
  )

  if (authed === null) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: '#111111' }}
      />
    )
  }

  if (!authed) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center px-4"
        style={{ background: '#111111', fontFamily: 'var(--font-jost), Jost, sans-serif' }}
      >
        <div
          className="w-full max-w-md p-8"
          style={{ ...cardBase, background: '#161616' }}
        >
          <h1
            className="mb-6 text-center text-2xl"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
          >
            Administration
          </h1>
          <form onSubmit={login} className="space-y-4">
            <label className="block text-sm text-[var(--text-secondary)]">
              Mot de passe
              <input
                type="password"
                autoComplete="current-password"
                className="mt-1 w-full rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
                style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {loginError ? (
              <p className="text-sm text-[var(--red-bright)]">{loginError}</p>
            ) : null}
            <button
              type="submit"
              disabled={loginLoading || !password}
              className="w-full rounded py-3 text-sm font-medium uppercase tracking-widest disabled:opacity-50"
              style={{ background: 'var(--red-primary)', color: 'var(--ivory)' }}
            >
              {loginLoading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: '#111111',
        fontFamily: 'var(--font-jost), Jost, sans-serif',
        color: 'var(--text-primary)',
      }}
    >
      <header
        className="sticky top-0 z-20 border-b px-4 py-4 md:px-8"
        style={{
          background: '#0d0d0d',
          borderColor: 'var(--grey-border)',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1
              className="text-xl md:text-2xl"
              style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
            >
              Tableau de bord
            </h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              1) Ouvrir une demande en attente · 2) Cliquer sur Accepter, Refuser ou Proposer.
            </p>
          </div>
          <button
            type="button"
            className="rounded border px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--red-primary)] hover:text-[var(--ivory)]"
            style={{ borderColor: 'var(--grey-border)' }}
            onClick={logout}
          >
            Se déconnecter
          </button>
        </div>

        <div className="mx-auto mt-4 max-w-6xl border-t border-[var(--grey-border)] pt-4">
          <span className="rounded border border-[var(--red-primary)] bg-[var(--red-primary)] px-4 py-2 text-sm font-medium text-[var(--ivory)]">
            Demandes
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <section>
          {actionMessage && !resError ? (
            <p className="mb-3 rounded border border-[#2e7d32] bg-[#1f2a20] px-3 py-2 text-sm text-[#c8e6c9]">
              {actionMessage}
            </p>
          ) : null}
          {resLoading && <p className="text-sm text-[var(--text-muted)]">Chargement…</p>}
          {resError && <p className="mb-4 text-sm text-[var(--red-bright)]">{resError}</p>}

          <div className="hidden gap-6 lg:grid lg:grid-cols-3">
            <Column title="En attente" list={pending} column="pending" />
            <Column title="Acceptées" list={accepted} column="accepted" />
            <Column title="Refusées" list={refused} column="refused" />
          </div>

          <div className="space-y-3 lg:hidden">
            <details className="rounded border border-[var(--grey-border)] bg-[#161616] p-3" open>
              <summary
                className="cursor-pointer text-lg font-medium"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
              >
                En attente ({pending.length})
              </summary>
              <div className="mt-3 space-y-3 border-t border-[var(--grey-border)] pt-3">
                {pending.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)]">Aucune demande.</p>
                ) : (
                  pending.map((r) => <ReservationCard key={r.id} r={r} column="pending" />)
                )}
              </div>
            </details>
            <details className="rounded border border-[var(--grey-border)] bg-[#161616] p-3">
              <summary
                className="cursor-pointer text-lg font-medium"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
              >
                Acceptées ({accepted.length})
              </summary>
              <div className="mt-3 space-y-3 border-t border-[var(--grey-border)] pt-3">
                {accepted.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)]">Aucune demande.</p>
                ) : (
                  accepted.map((r) => <ReservationCard key={r.id} r={r} column="accepted" />)
                )}
              </div>
            </details>
            <details className="rounded border border-[var(--grey-border)] bg-[#161616] p-3">
              <summary
                className="cursor-pointer text-lg font-medium"
                style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
              >
                Refusées ({refused.length})
              </summary>
              <div className="mt-3 space-y-3 border-t border-[var(--grey-border)] pt-3">
                {refused.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)]">Aucune demande.</p>
                ) : (
                  refused.map((r) => <ReservationCard key={r.id} r={r} column="refused" />)
                )}
              </div>
            </details>
          </div>
        </section>
      </main>

      {rescheduleOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 p-4 flex items-center justify-center">
          <div
            className="w-full max-w-xl rounded p-6"
            style={{ background: '#161616', border: '1px solid var(--grey-border)' }}
          >
            <h2
              className="text-xl mb-5"
              style={{ fontFamily: 'var(--font-playfair)', color: 'var(--ivory)' }}
            >
              Proposer un autre créneau
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="text-sm text-[var(--text-secondary)]">
                Date proposée (optionnel)
                <input
                  type="date"
                  className="mt-1 w-full rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
                  style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                />
              </label>
              <label className="text-sm text-[var(--text-secondary)]">
                Heure proposée (optionnel)
                <input
                  type="time"
                  className="mt-1 w-full rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
                  style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
                  value={proposedTime}
                  onChange={(e) => setProposedTime(e.target.value)}
                />
              </label>
            </div>
            <label className="mt-4 block text-sm text-[var(--text-secondary)]">
              Message libre
              <textarea
                rows={4}
                className="mt-1 w-full rounded border bg-transparent px-3 py-2 outline-none focus:border-[var(--red-primary)]"
                style={{ borderColor: 'var(--grey-border)', color: 'var(--text-primary)' }}
                placeholder="Je suis libre en semaine à partir de 14h, les weekends je suis indisponible ce mois-ci"
                value={rescheduleMessage}
                onChange={(e) => setRescheduleMessage(e.target.value)}
              />
            </label>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                className="rounded border px-4 py-2 text-sm text-[var(--text-secondary)]"
                style={{ borderColor: 'var(--grey-border)' }}
                onClick={() => setRescheduleOpen(false)}
                disabled={rescheduleLoading}
              >
                Annuler
              </button>
              <button
                type="button"
                className="rounded px-4 py-2 text-sm font-medium"
                style={{ background: 'var(--red-primary)', color: 'var(--ivory)' }}
                onClick={() => void sendReschedule()}
                disabled={rescheduleLoading}
              >
                {rescheduleLoading ? 'Envoi…' : 'Envoyer la proposition'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminPage(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center"
          style={{ background: '#111111' }}
        />
      }
    >
      <AdminPageInner />
    </Suspense>
  )
}
