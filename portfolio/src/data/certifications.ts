export interface Certification {
  id: string
  title: string
  issuer: string
  date?: string
}

/**
 * Shell placeholders only — real LinkedIn Learning credential titles/dates to be
 * added later. Shared here (rather than inline in a page) so About and the
 * homepage Credentials card can both read from one source without duplication.
 */
export const certifications: Certification[] = [
  { id: 'cert-1', title: 'AI Certification Placeholder 1', issuer: 'LinkedIn Learning' },
  { id: 'cert-2', title: 'AI Certification Placeholder 2', issuer: 'LinkedIn Learning' },
  { id: 'cert-3', title: 'AI Certification Placeholder 3', issuer: 'LinkedIn Learning' },
  { id: 'cert-4', title: 'AI Certification Placeholder 4', issuer: 'LinkedIn Learning' },
  { id: 'cert-5', title: 'AI Certification Placeholder 5', issuer: 'LinkedIn Learning' },
  { id: 'cert-6', title: 'AI Certification Placeholder 6', issuer: 'LinkedIn Learning' },
]
