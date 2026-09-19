import type { VercelRequest, VercelResponse } from '@vercel/node'

const RECEIVING_EMAIL = 'booksage.alex5@gmail.com'
const RESEND_API_URL = 'https://api.resend.com/emails'

const MAX_NAME_LENGTH = 120
const MAX_EMAIL_LENGTH = 200
const MAX_SERVICE_LENGTH = 80
const MAX_MESSAGE_LENGTH = 5000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Best-effort only: resets on cold start and isn't shared across concurrent
// instances, but it's the cheapest abuse guard available without a database.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  requestLog.set(ip, recent)
  return recent.length > RATE_LIMIT_MAX_REQUESTS
}

interface InquiryRequestBody {
  name?: unknown
  email?: unknown
  service?: unknown
  message?: unknown
  sourceForm?: unknown
  pageUrl?: unknown
  honeypot?: unknown
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const forwardedFor = req.headers['x-forwarded-for']
  const ip = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(',')[0]?.trim() || 'unknown'

  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' })
    return
  }

  const body = req.body as InquiryRequestBody

  // Honeypot: real visitors never see or fill this hidden field. Report a
  // generic success so bots don't learn their submission was detected.
  if (readString(body?.honeypot) !== '') {
    res.status(200).json({ ok: true })
    return
  }

  const name = readString(body?.name)
  const email = readString(body?.email)
  const service = readString(body?.service)
  const message = readString(body?.message)
  const sourceForm = readString(body?.sourceForm) || 'Portfolio'
  const pageUrl = readString(body?.pageUrl)

  const validationErrors: string[] = []
  if (!name) validationErrors.push('Name is required.')
  else if (name.length > MAX_NAME_LENGTH) validationErrors.push('Name is too long.')

  if (!email) validationErrors.push('Email is required.')
  else if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    validationErrors.push('A valid email address is required.')
  }

  if (!service) validationErrors.push('Service is required.')
  else if (service.length > MAX_SERVICE_LENGTH) validationErrors.push('Service value is too long.')

  if (!message) validationErrors.push('Message is required.')
  else if (message.length > MAX_MESSAGE_LENGTH) validationErrors.push('Message is too long.')

  if (validationErrors.length > 0) {
    res.status(400).json({ error: validationErrors.join(' ') })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('send-inquiry: RESEND_API_KEY is not configured')
    res.status(500).json({ error: 'Email delivery is not configured yet.' })
    return
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  const submittedAt = new Date()
  const submittedDate = submittedAt.toLocaleDateString('en-US', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const submittedTime = submittedAt.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
  })

  const subject = `New Portfolio Inquiry — ${name} — ${sourceForm}`

  const textBody = [
    'New Portfolio Inquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service}`,
    '',
    'Message:',
    message,
    '',
    `Source: ${sourceForm}`,
    `Submitted: ${submittedDate}, ${submittedTime} PH Time`,
    `Page: ${pageUrl || 'unknown'}`,
  ].join('\n')

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1e293b; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #102A43;">New Portfolio Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">
      <p style="color: #64748b; font-size: 12px;">
        Source: ${escapeHtml(sourceForm)}<br>
        Submitted: ${submittedDate}, ${submittedTime} PH Time<br>
        Page: ${escapeHtml(pageUrl || 'unknown')}
      </p>
    </div>
  `

  try {
    const emailRes = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Portfolio Inquiries <${fromAddress}>`,
        to: [RECEIVING_EMAIL],
        reply_to: email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    })

    if (!emailRes.ok) {
      const errText = await emailRes.text()
      console.error('send-inquiry: Resend API error', emailRes.status, errText)
      res.status(502).json({ error: 'Failed to send email.' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-inquiry: unexpected error', err)
    res.status(500).json({ error: 'Unexpected server error.' })
  }
}
