import nodemailer from 'nodemailer'
import type { Reservation } from '@/types/reservation'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'nadirkadri099@gmail.com'

function normalizeSiteUrl(value: string): string {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  return withProtocol.replace(/\/$/, '')
}

function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ]

  for (const candidate of candidates) {
    if (candidate && candidate.trim()) {
      return normalizeSiteUrl(candidate.trim())
    }
  }

  throw new Error(
    'Configuration URL manquante: définir NEXT_PUBLIC_SITE_URL, SITE_URL ou une variable Vercel.',
  )
}

function assertMailConfig(): void {
  const missing: string[] = []
  if (!process.env.SMTP_HOST) missing.push('SMTP_HOST')
  if (!process.env.SMTP_USER) missing.push('SMTP_USER')
  if (!process.env.SMTP_PASS) missing.push('SMTP_PASS')
  const hasSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL
  if (!hasSiteUrl) {
    missing.push(
      'NEXT_PUBLIC_SITE_URL|SITE_URL|VERCEL_PROJECT_PRODUCTION_URL|VERCEL_URL',
    )
  }
  if (missing.length > 0) {
    throw new Error(`Configuration email manquante: ${missing.join(', ')}`)
  }
}

export async function sendAdminNotification(res: Reservation) {
  assertMailConfig()
  const baseUrl = getSiteUrl()
  const adminUrl = `${baseUrl}/admin`

  await transporter.sendMail({
    from: `"Système Réservation" <${process.env.SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `🔔 Nouvelle demande — ${res.clientName} · ${res.date} à ${res.time}`,
    html: `
      <div style="font-family: Georgia, serif; background: #0A0A0A;
                  color: #E8E0D8; padding: 40px; max-width: 620px;">

        <h2 style="color: #E8E0D8; border-bottom: 1px solid #8B1A1A;
                   padding-bottom: 1rem; margin-bottom: 2rem;">
          Nouvelle demande de séance
        </h2>

        <table style="width:100%; border-collapse: collapse;
                      color: #A09890; margin-bottom: 2.5rem;">
          <tr>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;
                       color: #E8E0D8; width: 40%;">Client</td>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;">
              ${res.clientName}</td>
          </tr>
          <tr>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;
                       color: #E8E0D8;">Téléphone</td>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;">
              ${res.clientPhone}</td>
          </tr>
          <tr>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;
                       color: #E8E0D8;">Email</td>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;">
              ${res.clientEmail}</td>
          </tr>
          <tr>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;
                       color: #E8E0D8;">Formule</td>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;">
              ${res.formula} · ${res.duration}</td>
          </tr>
          <tr>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;
                       color: #E8E0D8;">Date souhaitée</td>
            <td style="padding: 0.7rem 0; border-bottom: 1px solid #1E1E1E;">
              ${res.date} à ${res.time}</td>
          </tr>
          <tr>
            <td style="padding: 0.7rem 0; color: #E8E0D8;">
              Message client</td>
            <td style="padding: 0.7rem 0;">
              ${res.message || '—'}</td>
          </tr>
        </table>

        <p style="font-family: sans-serif; font-size: 0.7rem;
                  letter-spacing: 0.2em; text-transform: uppercase;
                  color: #5A5250; margin-bottom: 1rem;">
          Répondre à cette demande
        </p>

        <a href="${baseUrl}/api/reservations/${res.id}/action?action=accepted"
           style="display: inline-block; background: #1A4A1A; color: #F0EAE0;
                  padding: 0.8rem 1.6rem; text-decoration: none;
                  font-family: sans-serif; font-size: 0.7rem;
                  letter-spacing: 0.15em; text-transform: uppercase;
                  margin-right: 0.5rem; margin-bottom: 0.5rem;">
          ✓ Accepter
        </a>

        <a href="${baseUrl}/api/reservations/${res.id}/action?action=refused"
           style="display: inline-block; background: #8B1A1A; color: #F0EAE0;
                  padding: 0.8rem 1.6rem; text-decoration: none;
                  font-family: sans-serif; font-size: 0.7rem;
                  letter-spacing: 0.15em; text-transform: uppercase;
                  margin-right: 0.5rem; margin-bottom: 0.5rem;">
          ✗ Refuser
        </a>

        <a href="${adminUrl}?openReschedule=${res.id}"
           style="display: inline-block; background: #2A2A2A; color: #F0EAE0;
                  padding: 0.8rem 1.6rem; text-decoration: none;
                  font-family: sans-serif; font-size: 0.7rem;
                  letter-spacing: 0.15em; text-transform: uppercase;
                  margin-right: 0.5rem; margin-bottom: 0.5rem;
                  border: 1px solid #3D3D3D;">
          ↻ Proposer un autre créneau
        </a>

        <a href="${adminUrl}"
           style="display: inline-block; background: transparent; color: #A09890;
                  padding: 0.8rem 1.6rem; text-decoration: none;
                  font-family: sans-serif; font-size: 0.7rem;
                  letter-spacing: 0.15em; text-transform: uppercase;
                  margin-bottom: 0.5rem; border: 1px solid #2A2A2A;">
          ⚙ Gérer dans l'admin
        </a>

        <p style="margin-top: 2rem; font-size: 0.65rem; color: #3D3D3D;
                  font-family: sans-serif;">
          Reçue le ${new Date(res.createdAt).toLocaleString('fr-FR')}
        </p>
      </div>
    `,
  })
}

export async function sendPendingEmail(
  to: string,
  clientName: string,
  res: Reservation,
) {
  assertMailConfig()
  await transporter.sendMail({
    from: `"Réservation" <${process.env.SMTP_USER}>`,
    to,
    subject: '✓ Demande reçue — en attente de confirmation',
    html: `
      <div style="font-family: Georgia, serif; background: #0A0A0A;
                  color: #E8E0D8; padding: 40px; max-width: 600px;">
        <h2 style="color: #E8E0D8; border-bottom: 1px solid #8B1A1A;
                   padding-bottom: 1rem;">
          Demande bien reçue
        </h2>
        <p style="margin-top: 2rem; color: #A09890; line-height: 1.8;">
          Bonjour <strong style="color:#E8E0D8">${clientName}</strong>,<br>
          Votre demande de séance a bien été enregistrée.
        </p>
        <p style="color:#A09890; line-height:1.8;">
          Une confirmation ou un refus vous sera envoyé par email sous 48h.
        </p>
        <table style="width:100%;border-collapse:collapse;margin-top:1.5rem;">
          <tr>
            <td style="padding:0.6rem 0;border-bottom:1px solid #1E1E1E;color:#E8E0D8;width:40%">Date</td>
            <td style="padding:0.6rem 0;border-bottom:1px solid #1E1E1E;color:#A09890">${res.date} à ${res.time}</td>
          </tr>
          <tr>
            <td style="padding:0.6rem 0;color:#E8E0D8">Formule</td>
            <td style="padding:0.6rem 0;color:#A09890">${res.formula} · ${res.duration}</td>
          </tr>
        </table>
      </div>
    `,
  })
}

export async function sendRefusalEmail(to: string, clientName: string) {
  assertMailConfig()
  const baseUrl = getSiteUrl()
  await transporter.sendMail({
    from: `"Duo de Petons" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Votre demande de séance — Suite à donner',
    html: `
      <div style="font-family: Georgia, serif; background: #0A0A0A; color: #E8E0D8; padding: 40px; max-width: 600px; margin: 0 auto;">
        <h1 style="font-size: 1.5rem; color: #E8E0D8; border-bottom: 1px solid #8B1A1A; padding-bottom: 1rem;">
          Duo de Petons
        </h1>
        <p style="margin-top: 2rem; line-height: 1.8; color: #A09890;">
          Bonjour <strong style="color: #E8E0D8;">${clientName}</strong>,
        </p>
        <p style="line-height: 1.8; color: #A09890;">
          Votre demande de séance n'a pas pu être confirmée pour ce créneau.
        </p>
        <p style="line-height: 1.8; color: #A09890;">
          Vous pouvez soumettre une nouvelle demande en choisissant un autre créneau disponible.
        </p>
        <a href="${baseUrl}/reservation"
           style="display: inline-block; margin-top: 2rem; background: #8B1A1A; color: #F0EAE0;
                  padding: 0.8rem 2rem; text-decoration: none; font-family: sans-serif;
                  font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;">
          Prendre un nouveau rendez-vous
        </a>
        <p style="margin-top: 3rem; font-size: 0.75rem; color: #5A5250;">
          © 2026 Duo de Petons
        </p>
      </div>
    `,
  })
}

export async function sendAcceptanceEmail(
  to: string,
  clientName: string,
  res: Reservation,
) {
  assertMailConfig()
  await transporter.sendMail({
    from: `"Réservation" <${process.env.SMTP_USER}>`,
    to,
    subject: '✓ Votre séance est confirmée',
    html: `
      <div style="font-family: Georgia, serif; background: #0A0A0A;
                  color: #E8E0D8; padding: 40px; max-width: 600px;">
        <h2 style="color: #4CAF50; border-bottom: 1px solid #4CAF50;
                   padding-bottom: 1rem;">
          Séance confirmée
        </h2>
        <p style="margin-top: 2rem; color: #A09890; line-height: 1.8;">
          Bonjour <strong style="color:#E8E0D8">${clientName}</strong>,<br>
          Votre demande a été acceptée.
        </p>
        <table style="width:100%;border-collapse:collapse;margin-top:1.5rem;">
          <tr>
            <td style="padding:0.6rem 0;border-bottom:1px solid #1E1E1E;
                       color:#E8E0D8;width:40%">Date</td>
            <td style="padding:0.6rem 0;border-bottom:1px solid #1E1E1E;
                       color:#A09890">${res.date} à ${res.time}</td>
          </tr>
          <tr>
            <td style="padding:0.6rem 0;color:#E8E0D8">Formule</td>
            <td style="padding:0.6rem 0;color:#A09890">
              ${res.formula} · ${res.duration}</td>
          </tr>
        </table>
        <p style="margin-top:2rem;color:#5A5250;font-size:0.8rem;
                  font-family:sans-serif;">
          En cas de question, répondez à cet email.
        </p>
      </div>
    `,
  })
}

export async function sendRescheduleEmail(
  to: string,
  clientName: string,
  proposedDate: string,
  proposedTime: string,
  customMessage: string,
) {
  assertMailConfig()
  const baseUrl = getSiteUrl()
  await transporter.sendMail({
    from: `"Réservation" <${process.env.SMTP_USER}>`,
    to,
    subject: '↻ Proposition de nouveau créneau',
    html: `
      <div style="font-family: Georgia, serif; background: #0A0A0A;
                  color: #E8E0D8; padding: 40px; max-width: 600px;">
        <h2 style="color: #E8E0D8; border-bottom: 1px solid #8B1A1A;
                   padding-bottom: 1rem;">
          Créneau alternatif proposé
        </h2>
        <p style="margin-top: 2rem; color: #A09890; line-height: 1.8;">
          Bonjour <strong style="color:#E8E0D8">${clientName}</strong>,<br>
          Le créneau demandé n'est pas disponible.
        </p>
        ${proposedDate ? `
        <p style="margin-top:1rem;color:#E8E0D8">
          Créneau proposé :
          <strong>${proposedDate} à ${proposedTime}</strong>
        </p>` : ''}
        ${customMessage ? `
        <p style="margin-top:1rem;padding:1rem 1.5rem;
                  border-left:2px solid #8B1A1A;color:#A09890;
                  font-style:italic;">
          "${customMessage}"
        </p>` : ''}
        <a href="${baseUrl}/reservation"
           style="display:inline-block;margin-top:2rem;
                  background:#8B1A1A;color:#F0EAE0;
                  padding:0.8rem 2rem;text-decoration:none;
                  font-family:sans-serif;font-size:0.7rem;
                  letter-spacing:0.2em;text-transform:uppercase;">
          Modifier ma demande
        </a>
      </div>
    `,
  })
}
