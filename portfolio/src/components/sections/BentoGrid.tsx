import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  FolderKanban,
  UserRound,
  ShieldCheck,
  Mail,
  Layers,
  LayoutGrid,
  Code2,
  ArrowUpRight,
  ImageIcon,
  Eye,
} from 'lucide-react'
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa6'
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
        'group relative flex flex-col overflow-hidden rounded-lg border border-slate-300 bg-[#F6F9FA] p-5',
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
    title: 'IPA Author Directory',
    type: 'Author Directory / Web Platform',
    description:
      'A professional author and book discovery platform designed to make profiles, books, and membership information easy to explore.',
    thumbnail: null,
    href: '/projects',
    status: 'in-progress',
  },
  {
    id: 'project-02',
    title: 'Project 02',
    type: 'Project type to be added',
    description: '',
    thumbnail: null,
    href: '/projects',
    status: 'placeholder',
  },
  {
    id: 'project-03',
    title: 'Project 03',
    type: 'Project type to be added',
    description: '',
    thumbnail: null,
    href: '/projects',
    status: 'placeholder',
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

const contactMethods = [
  {
    label: 'Email',
    value: 'email@placeholder.com',
    icon: Mail,
    color: '#D6362F',
    iconBg: '#FBEEEC',
    iconBorder: '#F0B4AC',
    hoverBg: '#FDF1EF',
    hoverBorder: '#F3C7BD',
  },
  {
    label: 'WhatsApp',
    value: '+00 000 000 0000',
    icon: FaWhatsapp,
    color: '#1A9F4D',
    iconBg: '#E9FAF0',
    iconBorder: '#9FDDB8',
    hoverBg: '#EAFBF1',
    hoverBorder: '#BEEAD1',
  },
  {
    label: 'LinkedIn',
    value: '/in/placeholder',
    icon: FaLinkedinIn,
    color: '#0A66C2',
    iconBg: '#EAF3FC',
    iconBorder: '#9CC5EF',
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
        <p className="mt-3 text-sm text-slate-500">
          Selected work placeholder: replace with real case studies.
        </p>

        <ul className="mt-4 flex flex-col gap-2">
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
      </CardShell>

      {/* About — medium */}
      <CardShell id="about" className="order-2 border-[var(--card-border-accent)] bg-[#F4F7F9] lg:col-span-1">
        <CardHeader icon={UserRound} label="About" />
        <p className="mt-3 text-sm text-slate-500">Who I am and how I like to work.</p>
        <div
          className="mt-4 flex min-h-20 w-full flex-1 items-center justify-center rounded-md border border-[#C7D0DA] bg-[#F1F4F7] text-[0.65rem] font-medium tracking-wide text-slate-500 uppercase"
          aria-label="Portrait placeholder"
        >
          Portrait
        </div>
        <p className="mt-2.5 text-xs text-slate-500">Short profile summary placeholder</p>
      </CardShell>

      {/* Contact — medium */}
      <CardShell id="contact" className="order-5 border-[var(--card-border-accent)] bg-[#F4F7F9] sm:order-3 lg:col-span-1">
        <CardHeader icon={Mail} label="Contact" />
        <p className="mt-3 text-sm text-slate-500">Reach out placeholder.</p>
        <div className="mt-4 flex flex-1 flex-col justify-center gap-2.5">
          {contactMethods.map(({ label, value, icon: Icon, color, iconBg, iconBorder, hoverBg, hoverBorder }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              style={{ '--hover-bg': hoverBg, '--hover-border': hoverBorder } as CSSProperties}
              className="group/row flex items-center gap-3 rounded-md border border-[var(--card-border-nested)] bg-white/70 px-2.5 py-2 transition-all duration-200 ease-out hover:-translate-y-px hover:border-[var(--hover-border)] hover:bg-[var(--hover-bg)] hover:shadow-[0_3px_8px_rgba(15,23,42,0.05)] focus-visible:-translate-y-px focus-visible:border-[var(--hover-border)] focus-visible:bg-[var(--hover-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border"
                style={{ backgroundColor: iconBg, color, borderColor: iconBorder }}
              >
                <Icon className="h-[15px] w-[15px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.7rem] font-medium tracking-wide text-slate-500 uppercase">{label}</span>
                <span className="block truncate text-sm text-slate-700 transition-colors duration-200 group-hover/row:text-slate-900">
                  {value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </CardShell>

      {/* Credentials — smaller, with a companion portal-preview CTA below it */}
      <div className="order-3 flex flex-col gap-3 sm:order-4 lg:col-span-1 lg:justify-between">
        <CardShell id="credentials" className="border-[var(--card-border-accent)] bg-[#F4F7F9]">
          <CardHeader icon={ShieldCheck} label="Credentials" />
          <p className="mt-4 text-sm text-slate-500">
            Professional learning and certifications that support my digital work.
          </p>
          <div className="mt-5 flex items-center gap-3.5 rounded-md border border-[var(--card-border-nested)] bg-white/70 px-3 py-3">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#93B4E8] bg-[#E6F0FF] text-[#1D4ED8]"
              aria-label="Credential badge placeholder"
            >
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Credential Placeholder 01</p>
              <p className="mt-0.5 text-xs leading-snug text-slate-500">Certification detail placeholder</p>
            </div>
          </div>
        </CardShell>

        <a
          href="#"
          className="flex items-center justify-center gap-2 rounded-md bg-[#1F6FEB] px-4 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1a5fc9] hover:shadow-[0_10px_20px_rgba(31,111,235,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F6FEB]"
        >
          <Eye className="h-4 w-4 shrink-0" />
          Preview Client Portal
        </a>
      </div>

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
