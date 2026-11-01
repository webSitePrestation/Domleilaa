import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const password = typeof body.password === 'string' ? body.password : ''

  const admin = process.env.ADMIN_PASSWORD
  if (!admin || password !== admin) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}
