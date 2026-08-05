import { Gift, HandCoins, UserPlus } from "lucide-react"

import { Reveal } from "@/components/shared/Reveal"
import { Seo } from "@/components/shared/Seo"
import { ReferralForm } from "@/components/referral/ReferralForm"

const steps = [
  {
    icon: UserPlus,
    title: "Refer",
    body: "Tell us who to contact below, or have them mention your name when they reach out.",
  },
  {
    icon: HandCoins,
    title: "They become a client",
    body: "They choose a package and pay for it in full — no partial or pending payments.",
  },
  {
    icon: Gift,
    title: "You get paid",
    body: "PHP 1,000 sent your way once their payment clears. We will message you to confirm.",
  },
]

const terms = [
  "PHP 1,000 per successful referral.",
  "Paid once the referred client's payment is received in full.",
  "The referred business must be new to LaunchSite PH.",
  "No limit on how many people you can refer.",
  "Paid via GCash, Maya, or bank transfer — your choice.",
]

const faqItems = [
  {
    question: "When do I get paid?",
    answer:
      "Within a few business days of the referred client's payment clearing. We will message you to confirm before sending it.",
  },
  {
    question: "Does the person I refer need to mention me?",
    answer:
      "It helps, but as long as we can match them to your submission below, you're covered either way.",
  },
  {
    question: "Is there a limit to how many people I can refer?",
    answer: "No. Refer as many businesses as you like.",
  },
]

export default function Referral() {
  return (
    <div className="py-14 md:py-20">
      <Seo
        title="Refer a Client, Earn PHP 1,000 | LaunchSite PH"
        description="Know a business that needs a real website? Refer them to LaunchSite PH. When they become a paying client, you get paid PHP 1,000."
        path="/referral"
      />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-foreground">Refer a client. Earn PHP 1,000.</h1>
          <p className="mt-4 text-muted-foreground">
            Know a business that needs a real website? Send them our way.
            When they become a paying client, you get paid too.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i}>
              <div className="h-full rounded-[14px] border border-border bg-surface p-6 md:p-8">
                <step.icon
                  className="text-primary-glow"
                  size={28}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-foreground">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3} className="mt-16">
          <div className="mx-auto max-w-3xl rounded-[14px] border border-border bg-surface p-8 md:p-10">
            <h2 className="text-foreground">How it works, in detail</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {terms.map((term) => (
                <li
                  key={term}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-foreground">Refer someone now</h2>
            <div className="mt-8 rounded-[14px] border border-border bg-surface p-6 md:p-8">
              <ReferralForm />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="text-center text-foreground">Quick questions.</h2>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-6">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-[14px] border border-border bg-surface p-6"
              >
                <p className="font-medium text-foreground">
                  {item.question}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
