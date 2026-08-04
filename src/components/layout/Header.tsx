import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { navLinks } from "@/lib/nav"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/Reveal"
import { Logo } from "@/components/shared/Logo"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled || menuOpen
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link to="/" onClick={closeMenu} className="rounded-md">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <Link to="/contact">Get a Free Quote</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-12 w-12 items-center justify-center rounded-[10px] text-foreground md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 flex flex-col justify-between overflow-y-auto bg-background md:hidden"
        >
          <nav className="flex flex-col px-5">
            {navLinks.map((link, i) => (
              <Reveal key={link.to} delay={i}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    cn(
                      "font-heading flex min-h-12 items-center border-b border-border py-4 text-2xl font-semibold text-foreground",
                      isActive && "text-primary"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </Reveal>
            ))}
          </nav>
          <div className="p-5">
            <Button asChild className="w-full" size="default">
              <Link to="/contact" onClick={closeMenu}>
                Get a Free Quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
