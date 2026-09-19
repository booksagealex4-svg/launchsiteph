import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  FolderKanban,
  BadgeCheck,
  ShieldCheck,
  GraduationCap,
  Monitor,
  Handshake,
  MapPin,
  Mail,
  Layers,
  LayoutGrid,
  Code2,
  ArrowUpRight,
  ImageIcon,
  Clock,
  Sparkles,
  Eye,
} from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
import { certifications } from '@/data/certifications'
import { cn } from '@/lib/utils'

function CardShell({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      id={id}
      className={cn(
        'group relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-slate-300 bg-[#F6F9FA] p-5',
        'shadow-[0_1px_3px_rgba(15,23,42,0.07),0_6px_14px_rgba(15,23,42,0.05)] transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_20px_36px_rgba(15,23,42,0.1)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

function CardHeader({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center justify-between">
      {/* Heading badge — styled like the Client Login pill (solid color, white icon + text), not a button.
          TEST VARIANT: stronger WhatsApp-family green in place of the blue version. */}
      <div className="flex items-center gap-2 rounded-md bg-[#128C4A] py-1.5 pr-3.5 pl-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.15)] transition-all duration-200 ease-out group-hover:bg-[#0F7A3F] group-hover:shadow-[0_4px_10px_rgba(18,140,74,0.35)]">
        <Icon className="h-[18px] w-[18px] shrink-0 text-white" />
        <h3 className="text-sm font-bold tracking-[0.06em] text-white uppercase">{label}</h3>
      </div>
      <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--card-border-accent)]" />
    </div>
  )
}

type HomeProject = {
  id: string
  title: string
  type: string
  description: string
  thumbnail: string | null
  href: string
  status: 'placeholder' | 'in-progress' | 'ready'
}

// Homepage-featured projects (max 3 — the full collection lives on /projects).
// Replace `title`, `type`, `description`, `thumbnail`, and `href` per entry once
// real case studies are ready; flip `status` to 'ready' once populated. The row
// layout above does not need to change to accept real content.
const homeProjects: HomeProject[] = [
  {
    id: 'ipa-author-directory',
    title: 'Author Directory',
    type: 'Author Directory / Web Platform',
    description:
      'A professional author and book discovery platform designed to make author profiles, books, and membership information easy to explore.',
    thumbnail: '/thumbnails/author-directory.svg',
    href: '/projects',
    status: 'in-progress',
  },
  {
    id: 'ipa-book-depository',
    title: 'Book Depository',
    type: 'Book Discovery / Catalog Platform',
    description:
      'A digital book catalog designed to organize, showcase, and make published titles easier to discover through a clean and accessible browsing experience.',
    thumbnail: '/thumbnails/book-depository.svg',
    href: '/projects',
    status: 'in-progress',
  },
  {
    id: 'client-crm-portal',
    title: 'Client CRM Portal',
    type: 'CRM / Client Management Platform',
    description:
      'A client management workspace designed to organize contacts, projects, messages, files, payments, and progress updates in one clear and practical dashboard.',
    thumbnail: '/thumbnails/crm-portal.svg',
    href: '/projects',
    status: 'in-progress',
  },
]

// Honest, homepage-appropriate trust signals — each grounded in real facts
// already documented on the About page and in the certifications data.
// Each icon uses a solid brand-relevant backplate with a white glyph for
// stronger contrast than a pale tinted background would give at this size.
const credentialHighlights = [
  {
    title: 'LinkedIn Learning',
    detail: 'AI & digital-skills certifications',
    icon: GraduationCap,
    bg: '#1D4ED8',
  },
  {
    title: 'Digital Build',
    detail: 'Websites, web apps & client portals',
    icon: Monitor,
    bg: '#128C4A',
  },
  {
    title: 'Working Style',
    detail: 'Clear communication & organized workflow',
    icon: Handshake,
    bg: '#D97757',
  },
  {
    title: 'Remote',
    detail: 'Based in the Philippines · Available for remote work · GMT+8',
    icon: MapPin,
    bg: '#4F46E5',
  },
]

const services = [
  {
    name: 'Website Design',
    descriptor: 'Clean, responsive sites built to represent you well.',
    icon: LayoutGrid,
  },
  {
    name: 'Web App Creation',
    descriptor: 'Interactive tools and apps tailored to a specific need.',
    icon: Code2,
  },
  {
    name: 'Client Portal / Personal Tracker',
    descriptor: 'Private dashboards for tracking projects and updates.',
    icon: Eye,
  },
]

// Real destinations reused from the sidebar's social icons and the FAQ/Contact page —
// only the visible copy differs here (a CTA phrase instead of the raw address/number/name).
// Icon backplates use each brand's real solid color with a white glyph for strong
// recognition, rather than a pale tint of the brand color.
const contactMethods = [
  {
    label: 'Email',
    action: 'Message Me',
    href: 'mailto:booksage.alex5@gmail.com',
    icon: Mail,
    bg: '#E14F45',
    hoverBg: '#FDF1EF',
    hoverBorder: '#F3C7BD',
  },
  {
    label: 'WhatsApp',
    action: 'Start a Chat',
    href: 'https://wa.me/639096439567',
    icon: FaWhatsapp,
    bg: '#25D366',
    hoverBg: '#EAFBF1',
    hoverBorder: '#BEEAD1',
  },
  {
    label: 'LinkedIn',
    action: 'View Profile',
    href: 'https://www.linkedin.com/in/alexis-sarip-a46442428/',
    icon: FaLinkedinIn,
    bg: '#0A66C2',
    hoverBg: '#EAF3FC',
    hoverBorder: '#BFDCF3',
  },
]

export function BentoGrid() {
  return (
    <section
      aria-label="Overview"
      className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch"
    >
      {/* Projects — dominant, top-left */}
      <CardShell
        id="projects"
        className="order-1 border-[var(--card-border-accent)] bg-[#F4F7F9] sm:col-span-2 lg:col-span-2"
      >
        <CardHeader icon={FolderKanban} label="Projects" />

        <ul className="mt-4 flex flex-1 flex-col justify-center gap-2.5">
          {homeProjects.map((project) => (
            <li key={project.id}>
              <a
                href={project.href}
                aria-label={`${project.title} — ${project.type}`}
                className="group/row flex items-center gap-4 rounded-md border border-[var(--card-border-nested)] bg-white/70 px-3 py-2.5 transition-all duration-200 ease-out hover:-translate-y-px hover:border-[#B8C2CC] hover:bg-[#EAEEF1] hover:shadow-[0_4px_10px_rgba(15,23,42,0.06)] focus-visible:-translate-y-px focus-visible:border-[#B8C2CC] focus-visible:bg-[#EAEEF1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <span
                  className="flex h-12 w-16 shrink-0 flex-col items-center justify-center gap-0.5 overflow-hidden rounded-md border border-[#93B4E8] bg-[#E6F0FF] text-[#1D4ED8]"
                  aria-hidden="true"
                >
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-[0.55rem] font-medium tracking-wide uppercase">16:9</span>
                    </>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover/row:text-[#0B1220]">
                    {project.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-slate-500">{project.type}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-all duration-200 ease-out group-hover/row:translate-x-1 group-hover/row:text-slate-600" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-md border border-[#BFDCF3] bg-[#EAF3FC] px-3 py-2 text-xs font-medium text-[#1F6FEB]">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span>
            <span className="font-bold text-[#123E91]">Free</span> concept mockup available for every project
            idea.
          </span>
        </div>
      </CardShell>

      {/* Credentials — medium (professional-credibility summary, distinct from the small
          single-item Credentials card below — see homepage revision notes) */}
      <CardShell id="about" className="order-2 border-[var(--card-border-accent)] bg-[#F4F7F9] lg:col-span-1">
        <CardHeader icon={BadgeCheck} label="Credentials" />
        <div className="mt-4 flex flex-1 flex-col justify-center gap-2">
          {credentialHighlights.map(({ title, detail, icon: Icon, bg }) => (
            <div
              key={title}
              className="flex items-center gap-2.5 rounded-md border border-[var(--card-border-nested)] bg-white/70 px-2.5 py-2"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white shadow-[0_1px_2px_rgba(15,23,42,0.15)]"
                style={{ backgroundColor: bg }}
              >
                <Icon className="h-[16px] w-[16px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-slate-800">{title}</span>
                <span className="block text-[0.7rem] leading-snug text-slate-500">{detail}</span>
              </span>
            </div>
          ))}
        </div>
      </CardShell>

      {/* Contact — medium */}
      <CardShell id="contact" className="order-5 border-[var(--card-border-accent)] bg-[#F4F7F9] sm:order-3 lg:col-span-1">
        <CardHeader icon={Mail} label="Contact" />
        <div className="mt-4 flex flex-1 flex-col justify-center gap-3">
          {contactMethods.map(({ label, action, href, icon: Icon, bg, hoverBg, hoverBorder }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={`${label} — ${action}`}
              style={{ '--hover-bg': hoverBg, '--hover-border': hoverBorder } as CSSProperties}
              className="group/row flex items-center gap-3 rounded-md border border-[var(--card-border-nested)] bg-white/70 px-3 py-2.5 transition-all duration-200 ease-out hover:-translate-y-px hover:border-[var(--hover-border)] hover:bg-[var(--hover-bg)] hover:shadow-[0_3px_8px_rgba(15,23,42,0.05)] focus-visible:-translate-y-px focus-visible:border-[var(--hover-border)] focus-visible:bg-[var(--hover-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white shadow-[0_1px_2px_rgba(15,23,42,0.15)]"
                style={{ backgroundColor: bg }}
              >
                <Icon className="h-[15px] w-[15px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.7rem] font-medium tracking-wide text-slate-500 uppercase">{label}</span>
                <span className="block truncate text-sm font-semibold text-slate-800 transition-colors duration-200 group-hover/row:text-slate-900">
                  {action}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-all duration-200 ease-out group-hover/row:translate-x-1 group-hover/row:text-slate-600" />
            </a>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-md border border-[#BFDCF3] bg-[#EAF3FC] px-3 py-2 text-xs font-medium text-[#1F6FEB]">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          Usually replies within 24 hours
        </div>
      </CardShell>

      {/* Credentials — smaller */}
      <CardShell
        id="credentials"
        className="order-3 border-[var(--card-border-accent)] bg-[#F4F7F9] sm:order-4 lg:col-span-1"
      >
        <CardHeader icon={ShieldCheck} label="Certifications" />
        <p className="mt-4 text-sm text-slate-500">
          Professional learning and certifications that support my digital work.
        </p>
        <div className="mt-5 flex items-center gap-3.5 rounded-md border border-[var(--card-border-nested)] bg-white/70 px-3 py-3">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-[#1D4ED8] text-white shadow-[0_1px_2px_rgba(15,23,42,0.15)]"
            aria-hidden="true"
          >
            <BadgeCheck className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{certifications[0].title}</p>
            <p className="mt-0.5 truncate text-xs leading-snug text-slate-500">
              {certifications[0].issuer} · {certifications[0].date}
            </p>
          </div>
        </div>
      </CardShell>

      {/* Featured Services — wide, dominant */}
      <CardShell id="services" className="order-4 border-[var(--card-border-accent)] bg-[#F4F7F9] sm:order-5 lg:col-span-3 lg:self-start">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardHeader icon={Layers} label="Featured Services" />
            <p className="mt-4 max-w-md text-sm text-slate-500">
              A few of the ways I can help bring ideas to life.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {services.map(({ name, descriptor, icon: Icon }) => (
            <a
              key={name}
              href="/services"
              className="group/row flex items-start gap-3 rounded-md border border-[var(--card-border-nested)] bg-white/70 px-4 py-3.5 transition-all duration-200 ease-out hover:-translate-y-px hover:border-[#B8C2CC] hover:bg-[#EAEEF1] hover:shadow-[0_4px_10px_rgba(15,23,42,0.06)] focus-visible:-translate-y-px focus-visible:border-[#B8C2CC] focus-visible:bg-[#EAEEF1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#1F6FEB] text-white shadow-[0_1px_2px_rgba(15,23,42,0.15)] transition-shadow duration-200 ease-out group-hover/row:shadow-[0_4px_10px_rgba(31,111,235,0.3)]">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1 pt-0.5">
                <span className="block text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover/row:text-[#0B1220]">
                  {name}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">{descriptor}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-all duration-200 ease-out group-hover/row:translate-x-1 group-hover/row:text-slate-600" />
            </a>
          ))}
        </div>
      </CardShell>
    </section>
  )
}
