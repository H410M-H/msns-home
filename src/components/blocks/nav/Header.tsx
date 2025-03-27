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
import CountdownDialog from '../landing/CowntdownDialog'

type HeaderProps = React.HTMLAttributes<HTMLElement>

export const Header = ({ className, ...props }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Admissions', path: '/admission' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header
      className={cn(
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300`,
        scrolled 
          ? 'bg-transparent backdrop-blur-md border-b border-gray-100 shadow-sm' 
          : 'bg-transparent',
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267533/Official_LOGO_grn_ic9ldd.png"
            alt="Logo"
            width={50}
            height={50}
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                pathname === link.path 
                  ? "text-green-100 bg-primary/10" 
                  : "text-white hover:bg-green-500 hover:text-green-800"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden p-2 z-50"
          onClick={() => setIsOpen(!isOpen)}
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
              className="fixed inset-0 z-40 bg-green-900/70 md:hidden pt-16"
            >
              <nav className="p-4">
                <ul className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.path}
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-lg font-medium",
                          pathname === link.path
                            ? "bg-green-900 text-white"
                            : "text-green-900 hover:bg-gray-50"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
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
                  className="rounded-full w-10 h-10 p-0 hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl shadow-lg border border-gray-100"
              >
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 focus:bg-red-50">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <CountdownDialog />
              <Link href="/login">
                <Button
                  variant="default"
                  className="rounded-full bg-gradient-to-r from-primary to-emerald-600 hover:shadow-md"
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}