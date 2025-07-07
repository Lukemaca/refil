import type React from "react"
import { cn } from "@/app/lib/utils"

interface FinanLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
  backgroundColor?: string
  textColor?: string
}

export const FinanLogo = ({
  className,
  width = 300,
  height = 100,
  backgroundColor = "#3B82F6",
  textColor = "#ffffff",
  ...props
}: FinanLogoProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-[300px] h-[100px] rounded-lg bg-primary text-white font-bold text-5xl",
        className,
      )}
      style={{ width: `${width}px`, height: `${height}px`, backgroundColor }}
      {...props}
    >
      finan
    </div>
  )
}

export default FinanLogo
