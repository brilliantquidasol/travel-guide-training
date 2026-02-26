"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, Compass, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { getStoredUserId, clearStoredUserId } from "@/lib/auth"

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return
    setIsLoggedIn(!!getStoredUserId())
  }, [mounted, pathname])

  const handleLogout = () => {
    clearStoredUserId()
    setIsLoggedIn(false)
    router.replace("/")
    router.refresh()
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/tours", label: "Tours" },
    { href: "/hotels", label: "Hotels" },
    { href: "/travel-tips", label: "Travel Tips" },
    { href: "/photo-journal", label: "Photo Journal" },
    { href: "/plan-trip", label: "Plan Trip" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  const isHome = pathname === "/"
  const useLightNav = isHome && mounted && !isScrolled

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        mounted && isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className={cn(
                "p-2 rounded-xl transition-all duration-300 group-hover:scale-110",
                useLightNav ? "bg-white/20 text-white" : "bg-primary text-primary-foreground",
              )}
            >
              <Compass className="w-6 h-6" />
            </div>
            <span
              className={cn(
                "font-heading font-bold text-2xl transition-colors duration-300",
                useLightNav ? "text-white" : "text-foreground",
              )}
            >
              Wanderlust
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium transition-colors duration-300 hover:text-primary relative py-2",
                  useLightNav
                    ? pathname === link.href
                      ? "text-white"
                      : "text-white/90 hover:text-white"
                    : pathname === link.href
                      ? "text-primary"
                      : "text-foreground/70",
                )}
              >
                {link.label}
                {pathname === link.href && !useLightNav && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
                {pathname === link.href && useLightNav && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </Link>
            ))}
            {mounted && isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className={cn(
                  "font-medium transition-colors duration-300 hover:opacity-80 relative py-2 flex items-center gap-1.5",
                  useLightNav ? "text-white/90 hover:text-white" : "text-foreground/70 hover:text-foreground",
                )}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "md:hidden p-2 transition-colors duration-300",
              useLightNav ? "text-white hover:text-white/80" : "text-foreground hover:text-primary",
            )}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-border pb-6 pt-4 animate-slide-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "font-medium transition-colors hover:text-primary px-2 py-2",
                    pathname === link.href ? "text-primary bg-primary/10 rounded-lg" : "text-foreground/70",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {mounted && isLoggedIn && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-2 py-2 font-medium text-foreground/70 hover:text-primary"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
