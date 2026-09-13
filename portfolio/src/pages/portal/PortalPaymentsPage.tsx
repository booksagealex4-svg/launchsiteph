import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Wallet, ArrowLeftRight, ShoppingBag, Check, ArrowRight, ShieldCheck } from 'lucide-react'
import { IconChip, StatusPill, CardShell, CardLabel } from '@/components/portal/PortalUI'
import { cn } from '@/lib/utils'

const paymentMethods: { id: string; label: string; description: string; icon: LucideIcon; note?: string }[] = [
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'Pay using your PayPal account or available PayPal options.',
    icon: Wallet,
  },
  {
    id: 'wise',
    label: 'Wise',
    description: 'Continue through Wise for supported payment methods.',
    icon: ArrowLeftRight,
  },
  {
    id: 'gumroad',
    label: 'Gumroad',
    description: 'Additional checkout option, if enabled.',
    icon: ShoppingBag,
    note: 'Available later',
  },
]

function PaymentMethodOption({
  label,
  description,
  note,
  icon: Icon,
  selected,
  onSelect,
}: {
  label: string
  description: string
  note?: string
  icon: LucideIcon
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'flex flex-col gap-2 rounded-lg border p-4 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        selected
          ? 'border-[#1F6FEB]/50 bg-blue-50/60'
          : 'border-slate-300/70 bg-white hover:-translate-y-0.5 hover:border-blue-200',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <IconChip icon={Icon} />
          <p className="text-sm font-bold text-slate-900">{label}</p>
        </div>
        <span
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200',
            selected ? 'border-[#1F6FEB] bg-[#1F6FEB]' : 'border-slate-300',
          )}
          aria-hidden="true"
        >
          {selected ? <Check className="h-3 w-3 text-white" /> : null}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      {note ? <p className="text-xs font-medium text-slate-400">{note}</p> : null}
    </button>
  )
}

export function PortalPaymentsPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [continued, setContinued] = useState(false)

  function handleContinue() {
    setContinued(true)
  }

  return (
    <>
      {/* Compact header */}
      <div className="rounded-lg border border-[var(--card-border-accent)] bg-[#fdfbf7] px-5 py-4">
        <p className="text-[0.6rem] font-medium tracking-[0.2em] text-[#1F6FEB] uppercase">Payments</p>
        <h1 className="mt-1 text-xl leading-snug font-extrabold text-[#122c52] sm:text-2xl">Make a Payment</h1>
        <p className="mt-0.5 text-sm text-slate-600">
          Review your payment details and choose the payment option that works best for you.
        </p>
      </div>

      {/* Payment summary — dominant */}
      <CardShell>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardLabel>Payment Summary</CardLabel>
            <div className="mt-2 flex flex-col gap-2">
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Payment For</p>
                <p className="text-sm font-semibold text-slate-800">Project / Service Placeholder</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-slate-400 uppercase">Amount Due</p>
                <p className="text-lg font-bold text-slate-900">Amount Placeholder</p>
              </div>
            </div>
          </div>
          <StatusPill tone="amber">Payment Pending</StatusPill>
        </div>
      </CardShell>

      {/* Transparency note */}
      <div className="rounded-lg border border-blue-100 bg-blue-50/40 px-5 py-4">
        <p className="text-sm leading-relaxed text-slate-600">
          Please review the payment details before continuing. You will be redirected to your
          selected payment provider to complete the payment securely.
        </p>
      </div>

      {/* Payment methods */}
      <CardShell>
        <CardLabel>Choose How You&apos;d Like to Pay</CardLabel>
        <div role="radiogroup" aria-label="Payment method" className="mt-3 grid gap-3 sm:grid-cols-3">
          {paymentMethods.map((method) => (
            <PaymentMethodOption
              key={method.id}
              label={method.label}
              description={method.description}
              note={method.note}
              icon={method.icon}
              selected={selectedMethod === method.id}
              onSelect={() => setSelectedMethod(method.id)}
            />
          ))}
        </div>

        <div className="mt-5">
          <button
            type="button"
            disabled={!selectedMethod}
            onClick={handleContinue}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto',
              selectedMethod
                ? 'bg-[#1F6FEB] text-white shadow-[0_4px_14px_rgba(31,111,235,0.25)] hover:-translate-y-0.5 hover:bg-[#1a5fc9]'
                : 'cursor-not-allowed bg-slate-100 text-slate-400',
            )}
          >
            Continue to Payment
            <ArrowRight className="h-4 w-4 shrink-0" />
          </button>
          {continued ? (
            <p className="mt-2 text-sm text-slate-500">
              Payment checkout will open here once this payment method is connected.
            </p>
          ) : null}
        </div>
      </CardShell>

      {/* Security / trust language */}
      <div className="flex items-start gap-3 rounded-lg border border-[var(--card-border-accent)] bg-slate-50/60 px-5 py-4">
        <IconChip icon={ShieldCheck} tint="mint" />
        <p className="text-sm leading-relaxed text-slate-600">
          Payment is completed through the selected external provider. This portal does not
          collect or store your card or banking details.
        </p>
      </div>

      {/* Receipt direction — secondary, lightest weight */}
      <p className="px-1 text-sm text-slate-400">
        Payment confirmation and receipt details will appear here after payment is completed.
      </p>
    </>
  )
}
