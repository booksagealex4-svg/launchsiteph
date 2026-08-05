import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export const faqItems = [
  {
    question: 'What does "7 days" actually mean?',
    answer:
      "Seven days from content handoff — the day you send your logo, photos and text. We will tell you exactly what we need before you commit.",
  },
  {
    question: "What if I do not have photos or text?",
    answer:
      "Authority includes full copywriting. For the other packages we can guide you, and we will point you to stock options where needed.",
  },
  {
    question: "Who owns the website?",
    answer: "You do. Domain, content and site are yours.",
  },
  {
    question: "What happens after the first year?",
    answer:
      "Domain and hosting renewal becomes yours to handle, or you can move to a Care Plan and we handle it.",
  },
  {
    question: "Can I upgrade later?",
    answer: "Yes. You pay the difference plus any additional build work.",
  },
  {
    question: "Do you do e-commerce?",
    answer:
      "Not in these packages. Tell us what you need and we will quote it separately.",
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-border rounded-[14px] border border-border bg-surface">
      {faqItems.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex min-h-12 w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-medium text-foreground">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "shrink-0 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                size={20}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
