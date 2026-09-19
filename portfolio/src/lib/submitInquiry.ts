export interface InquiryPayload {
  name: string
  email: string
  service: string
  message: string
  sourceForm: string
  honeypot: string
}

/** Posts an inquiry to the serverless email endpoint. Throws on any non-2xx
 *  response or network failure — callers decide how to present that as an error. */
export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const res = await fetch('/api/send-inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, pageUrl: window.location.href }),
  })

  if (!res.ok) {
    throw new Error('Inquiry request failed')
  }
}
