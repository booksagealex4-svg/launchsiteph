import generativeAi from "@/assets/certificates/generative-ai.jpg"
import marketingLeadsAi from "@/assets/certificates/marketing-leads-ai.jpg"

export interface Certificate {
  title: string
  image: string
  alt: string
}

export const certificates: Certificate[] = [
  {
    title: "How to Generate Marketing Leads with AI",
    image: marketingLeadsAi,
    alt: "LinkedIn Learning certificate: How to Generate Marketing Leads with AI, completed by Alexis Sarip",
  },
  {
    title: "What Is Generative AI?",
    image: generativeAi,
    alt: "LinkedIn Learning certificate: What Is Generative AI?, completed by Alexis Sarip",
  },
]
