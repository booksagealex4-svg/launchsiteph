import { Reveal } from "@/components/shared/Reveal"
import { InquiryForm } from "@/components/contact/InquiryForm"
import { ContactPanel } from "@/components/contact/ContactPanel"

const faqItems = [
  {
    question: "What happens after I send this?",
    answer:
      "You get a written quote with a fixed price and a delivery date, usually within one business day.",
  },
  {
    question: "Do I need to pay anything to get a quote?",
    answer: "No. The quote itself is free, with no obligation.",
  },
  {
    question: "What if I do not know what I need yet?",
    answer:
      "That's fine. Tell us about your business and we will recommend a package.",
  },
]

export default function Contact() {
  return (
    <div className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-foreground">
            Tell us what you do. We will tell you what it costs.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Send a short message or book a free 20-minute call. You will get
            a written quote with a fixed price and a delivery date &mdash;
            usually within one business day.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Reveal>
            <InquiryForm />
          </Reveal>

          <Reveal delay={1}>
            <ContactPanel />
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h2 className="text-center text-foreground">
            Quick questions.
          </h2>
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
