"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '~/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { User, Menu, X } from 'lucide-react'
import { cn } from "~/lib/utils"
import CountdownDialog from '../landing/CowntdownDialog'

type HeaderProps = React.HTMLAttributes<HTMLElement>

export const Header = ({ className, ...props }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDashboard = pathname === '/dashboard' || pathname === '/academics' || pathname === '/revenue' || pathname === '/account' || pathname === '/userReg';

  return (
    <header
      className={cn(
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`,
        scrolled ? 'bg-transparent backdrop-blur-md py-2' : 'bg-green-100/40 py-2',
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="https://res.cloudinary.com/dvvbxrs55/image/upload/v1729267533/Official_LOGO_grn_ic9ldd.png"
              alt="Logo"
              width={50}
              height={50}
              className="transition-all duration-300 ease-in-out hover:scale-110"
            />
          </Link>
          <Button
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4 text-black font-bold">
            <li>
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
            </li>
            <li>
              <Link href="/admission">
                <Button variant="ghost">Admissions</Button>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Button variant="ghost">Contact</Button>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
            <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
              <nav>
                <ul className="flex flex-col space-y-4">
                  <li>
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">Home</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">About</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">Contact</Button>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

<div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/20 focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all duration-300 ease-in-out"
                >
                  <User className="h-5 w-5 text-red-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-in-out"
              >
                <DropdownMenuItem className="hover:bg-purple-100 focus:bg-purple-200">
                  <Link href="/account">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-100 focus:bg-purple-200">
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-100 focus:bg-purple-200">
                  <Link href="/">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : isDashboard ? (
            <Link href="">
              <Button variant="outline">Profile</Button>
            </Link>
          ) : (
            <>
              <CountdownDialog />
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}