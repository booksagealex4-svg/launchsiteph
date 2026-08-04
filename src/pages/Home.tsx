import { Hero } from "@/components/sections/Hero"
import { StatsTrust } from "@/components/sections/StatsTrust"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs"
import { ProcessTimeline } from "@/components/sections/ProcessTimeline"
import { Showcase } from "@/components/sections/Showcase"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsTrust />
      <WhyChooseUs />
      <ProcessTimeline />
      <Showcase />
    </>
  )
}
