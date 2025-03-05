"use client"

import { useState, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { cn } from '~/lib/utils'
import { Rocket, Clock, Calendar } from 'lucide-react'
import React from 'react'

const CountdownDialog = () => {
  const [open, setOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (!open) return

    let totalSeconds = 45 * 24 * 60 * 60
    const interval = setInterval(() => {
      totalSeconds -= 1
      
      const days = Math.floor(totalSeconds / (24 * 3600))
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      setTimeLeft({ days, hours, minutes, seconds })

      if (totalSeconds <= 0) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "animate-[pulse_2s_ease-in-out_infinite]",
            "ml-4 backdrop-blur-sm bg-white/10 hover:bg-white/20",
            "border-2 border-white/30 text-white",
            "rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold",
            "shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          )}
        >
          <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="whitespace-nowrap">MSNS-LMS Launch</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-xs sm:max-w-md md:max-w-2xl xl:max-w-4xl border-0 bg-transparent backdrop-blur-xl">
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/20 to-green-500/20 p-6 sm:p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 rounded-3xl bg-white/5 backdrop-blur-3xl" />
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-2">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
              <span>LMS Launching Soon!</span>
            </DialogTitle>
          </DialogHeader>

          <div className="relative z-10 text-center py-4 sm:py-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <TimeCard value={timeLeft.days} label="Days" icon={<Calendar />} />
              <TimeCard value={timeLeft.hours} label="Hours" />
              <TimeCard value={timeLeft.minutes} label="Minutes" />
              <TimeCard value={timeLeft.seconds} label="Seconds" />
            </div>

            <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000"
                style={{ width: `${(timeLeft.days / 45) * 100}%` }}
              />
            </div>

            <p className="text-xs sm:text-sm md:text-base text-white/80">
              Until the official launch of our next-generation<br />
              MSNS® Learning Management System
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const TimeCard = ({ value, label, icon }: { value: number; label: string; icon?: React.ReactNode }) => (
  <div className="p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-100">
      {String(value).padStart(2, '0')}
    </div>
    <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/80 flex items-center justify-center gap-1">
      {icon && React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ className: string; }>, { 
        className: "h-3 w-3 sm:h-4 sm:w-4" 
      })}
      {label}
    </div>
  </div>
)

export default CountdownDialog