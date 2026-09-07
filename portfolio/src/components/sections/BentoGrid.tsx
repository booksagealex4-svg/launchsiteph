import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  FolderKanban,
  CircleUserRound,
  ShieldCheck,
  Mail,
  Layers,
  ArrowUpRight,
  ImageIcon,
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
        'group relative flex flex-col overflow-hidden rounded-lg border border-slate-300/70 bg-white p-6',
        'shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition-all duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_20px_36px_rgba(15,23,42,0.1)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

function CardHeader({
  icon: Icon,
  label,
  tint = 'blue',
}: {
  icon: LucideIcon
  label: string
  tint?: 'blue' | 'mint'
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
            tint === 'blue' ? 'bg-blue-50 text-[#1F6FEB]' : 'bg-[#eafaf4] text-[#1f9d7c]',
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <h3 className="text-sm font-bold tracking-[0.06em] text-[#1F6FEB] uppercase">{label}</h3>
      </div>
      <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1F6FEB]" />
    </div>
  )
}

const placeholderProjects = [
  { name: 'Project Title Placeholder', tag: 'Category Placeholder' },
  { name: 'Project Title Placeholder', tag: 'Category Placeholder' },
  { name: 'Project Title Placeholder', tag: 'Category Placeholder' },
]

const services = [
  { name: 'Service Placeholder 01', descriptor: 'Short descriptor placeholder', icon: Layers },
  { name: 'Service Placeholder 02', descriptor: 'Short descriptor placeholder', icon: FolderKanban },
  { name: 'Service Placeholder 03', descriptor: 'Short descriptor placeholder', icon: ShieldCheck },
  { name: 'Service Placeholder 04', descriptor: 'Short descriptor placeholder', icon: Mail },
]

const contactMethods = [
  { label: 'Email', value: 'email@placeholder.com', icon: Mail },
  { label: 'WhatsApp', value: '+00 000 000 0000', icon: FaWhatsapp },
  { label: 'LinkedIn', value: '/in/placeholder', icon: FaLinkedinIn },
]

export function BentoGrid() {
  return (
    <section
      aria-label="Overview"
      className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {/* Projects — dominant, top-left */}
      <CardShell id="projects" className="order-1 sm:col-span-2 lg:col-span-2">
        <CardHeader icon={FolderKanban} label="Projects" />
        <p className="mt-4 text-sm text-slate-500">
          Selected work placeholder — replace with real case studies.
        </p>

        <ul className="mt-5 flex flex-col divide-y divide-slate-100">
          {placeholderProjects.map((project, i) => (
            <li key={i} className="first:pt-0 last:pb-0">
              <a
                href="#"
                aria-label={`${project.name} — ${project.tag}`}
                className="flex items-center gap-4 rounded-md px-2 py-3 transition-colors duration-200 hover:bg-blue-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <span
                  className="flex h-12 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-md border border-slate-200 bg-slate-50 text-slate-300"
                  aria-hidden="true"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span className="text-[0.55rem] font-medium tracking-wide uppercase">16:9</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-slate-800">{project.name}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{project.tag}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1F6FEB]" />
              </a>
            </li>
          ))}
        </ul>
      </CardShell>

      {/* About — medium */}
      <CardShell id="about" className="order-2 lg:col-span-1">
        <CardHeader icon={CircleUserRound} label="About" />
        <p className="mt-4 text-sm text-slate-500">Who I am and how I like to work.</p>
        <div
          className="mt-5 flex h-24 w-full items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-[0.65rem] font-medium tracking-wide text-slate-500 uppercase"
          aria-label="Portrait placeholder"
        >
          Portrait
        </div>
        <p className="mt-3 text-xs text-slate-500">Short profile summary placeholder</p>
      </CardShell>

      {/* Contact — medium */}
      <CardShell id="contact" className="order-5 sm:order-3 lg:col-span-1">
        <CardHeader icon={Mail} label="Contact" tint="mint" />
        <p className="mt-4 text-sm text-slate-500">Reach out placeholder.</p>
        <div className="mt-5 flex flex-col gap-2">
          {contactMethods.map(({ label, value, icon: Icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="flex items-center gap-3 rounded-md border border-transparent px-2.5 py-2.5 transition-colors duration-200 hover:border-blue-100 hover:bg-blue-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#1F6FEB]">
                <Icon className="h-[15px] w-[15px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.7rem] font-medium tracking-wide text-slate-500 uppercase">{label}</span>
                <span className="block truncate text-sm text-slate-700">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </CardShell>

      {/* Credentials — smaller */}
      <CardShell id="credentials" className="order-3 sm:order-4 lg:col-span-1">
        <CardHeader icon={ShieldCheck} label="Credentials" />
        <p className="mt-4 text-sm text-slate-500">Certifications and education placeholder.</p>
        <div className="mt-5 flex items-center gap-3.5">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50 text-[#1F6FEB]"
            aria-label="Credential badge placeholder"
          >
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Credential Placeholder</p>
            <p className="mt-0.5 text-xs leading-snug text-slate-500">Certification detail placeholder</p>
          </div>
        </div>
      </CardShell>

      {/* Featured Services — wide, dominant */}
      <CardShell id="services" className="order-4 sm:order-5 lg:col-span-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardHeader icon={Layers} label="Featured Services" tint="mint" />
            <p className="mt-4 max-w-md text-sm text-slate-500">
              Services overview placeholder — summarize your core offering here.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {services.map(({ name, descriptor, icon: Icon }, i) => (
            <div
              key={name}
              className="flex items-start gap-3.5 rounded-md border border-slate-200 px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-[0_8px_16px_rgba(15,23,42,0.06)]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#1F6FEB]">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1 pt-0.5">
                <span className="block text-sm font-semibold text-slate-800">{name}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{descriptor}</span>
              </span>
              <span className="shrink-0 pt-0.5 text-xs font-semibold text-slate-300">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </CardShell>
    </section>
  )
}
