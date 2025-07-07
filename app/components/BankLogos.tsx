"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BankLogosProps {
  className?: string
  variant?: "grid" | "carousel" | "simple"
  size?: "small" | "medium" | "large"
}

const banks = [
  { name: "Commonwealth Bank", abbr: "CBA", color: "#FFCC00" },
  { name: "Westpac", abbr: "WBC", color: "#D5002B" },
  { name: "ANZ", abbr: "ANZ", color: "#0072AC" },
  { name: "NAB", abbr: "NAB", color: "#E50000" },
  { name: "Macquarie Bank", abbr: "MQG", color: "#167A36" },
  { name: "ING", abbr: "ING", color: "#FF6200" },
  { name: "St. George", abbr: "STG", color: "#E30613" },
  { name: "Bendigo Bank", abbr: "BEN", color: "#00529B" },
]

export function BankLogos({ className, variant = "grid", size = "medium" }: BankLogosProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const logoSizes = {
    small: "h-8 w-16",
    medium: "h-12 w-24",
    large: "h-16 w-32",
  }

  const containerSizes = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
  }

  useEffect(() => {
    if (variant === "carousel" && autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (banks.length - (variant === "carousel" ? 3 : 0)))
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [autoplay, variant])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banks.length - 4 : prevIndex - 1))
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (banks.length - 3))
  }

  if (variant === "simple") {
    return (
      <div className={cn("flex flex-wrap justify-center items-center", containerSizes[size], className)}>
        {banks.slice(0, 4).map((bank) => (
          <div
            key={bank.abbr}
            className={cn(
              "bg-white rounded-md border border-gray-200 flex items-center justify-center mx-2",
              logoSizes[size],
            )}
          >
            <div
              className="font-bold text-white rounded-md flex items-center justify-center w-full h-full"
              style={{ backgroundColor: bank.color }}
            >
              {bank.abbr}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "carousel") {
    return (
      <div className={cn("relative", className)}>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 z-10 rounded-full bg-white/80 backdrop-blur-sm"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <div className="flex overflow-hidden mx-8">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {banks.map((bank) => (
                <div
                  key={bank.abbr}
                  className={cn("flex-shrink-0 px-2 flex items-center justify-center", logoSizes[size])}
                >
                  <div
                    className="w-full h-full rounded-md border border-gray-200 flex items-center justify-center"
                    style={{ backgroundColor: bank.color }}
                  >
                    <span className="font-bold text-white">{bank.abbr}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 z-10 rounded-full bg-white/80 backdrop-blur-sm"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    )
  }

  // Default grid layout
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8", containerSizes[size], className)}>
      {banks.map((bank) => (
        <div
          key={bank.abbr}
          className={cn("bg-white rounded-md border border-gray-200 flex items-center justify-center", logoSizes[size])}
        >
          <div
            className="font-bold text-white rounded-md flex items-center justify-center w-full h-full"
            style={{ backgroundColor: bank.color }}
          >
            {bank.abbr}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BankLogos
