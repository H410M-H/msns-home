"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '~/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { User, Menu, X } from 'lucide-react'
import { cn } from "~/lib/utils"
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  forceWhiteBg?: boolean
}

export const Header = ({ className, forceWhiteBg, ...props }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admission' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Campus Life', path: '/campus' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ]

  const normalizedPath = (pathname ? pathname.replace(/\/+$/, '') : '') || '/'

  // Routes that have a full dark hero banner at the very top
  const darkHeroRoutes = ['/', '/contact', '/admission', '/admission/apply']
  const hasDarkHero = darkHeroRoutes.includes(normalizedPath)

  // Header has a white background when scrolled, on pages without a dark hero banner, or when forced
  const isWhiteBg = forceWhiteBg ?? ((className?.includes('bg-white') ?? false) || scrolled || !hasDarkHero)

  const isLinkActive = (linkPath: string) => {
    if (linkPath === '/') {
      return normalizedPath === '/'
    }
    return normalizedPath === linkPath || normalizedPath.startsWith(linkPath + '/')
  }

  return (
    <header
      className={cn(
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300`,
        isWhiteBg
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs'
          : 'bg-transparent',
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="relative z-50" aria-label="M.S. Naz High School Home">
          <Image
            src="/api/images/logos/Official_LOGO_grn_ic9ldd.png"
            alt="Logo"
            width={50}
            height={50}
            priority
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path)
            return (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isWhiteBg
                    ? active
                      ? "text-emerald-950 bg-emerald-100/90 font-semibold shadow-xs"
                      : "text-emerald-900 font-medium hover:text-emerald-950 hover:bg-emerald-50/80"
                    : active
                      ? "text-emerald-950 bg-emerald-100/90 font-semibold shadow-xs"
                      : "text-white hover:bg-white/20 hover:text-emerald-100"
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className={cn(
            "md:hidden p-2 z-50 transition-colors",
            isWhiteBg && !isOpen
              ? "text-emerald-950 hover:bg-emerald-50 hover:text-emerald-900"
              : "text-white hover:bg-white/20 hover:text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 bg-emerald-950/95 backdrop-blur-xl md:hidden pt-20 px-6 flex flex-col justify-between pb-8"
            >
              <nav className="py-2">
                <ul className="flex flex-col space-y-2">
                  {navLinks.map((link) => {
                    const active = isLinkActive(link.path)
                    return (
                      <motion.li
                        key={link.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        <Link
                          href={link.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block px-4 py-3 rounded-xl font-medium text-base transition-colors",
                            active
                              ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30"
                              : "text-white/90 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              <div className="pt-4 border-t border-emerald-800/40">
                <Link
                  href="https://lms.msns.edu.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block w-full"
                >
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-md cursor-pointer"
                  >
                    LMS Portal
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Section */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-full w-10 h-10 p-0 transition-colors",
                    isWhiteBg
                      ? "text-emerald-950 hover:bg-emerald-50"
                      : "text-white hover:bg-white/20 hover:text-white"
                  )}
                  aria-label="User Account"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl shadow-lg border border-gray-100 bg-white"
              >
                <DropdownMenuItem asChild>
                  <Link href="https://lms.msns.edu.pk/sign-in" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="https://lms.msns.edu.pk/sign-in" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 focus:bg-red-50 cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="https://lms.msns.edu.pk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Access MSNS LMS Portal"
              >
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full bg-linear-to-r from-emerald-600 to-teal-600 px-4 text-xs md:text-sm font-semibold text-white shadow-xs hover:shadow-md hover:from-emerald-700 hover:to-teal-700 cursor-pointer"
                >
                  LMS Portal
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}