interface HomeOnlineLogoProps {
  className?: string
}

export function HomeOnlineLogo({ className = "" }: HomeOnlineLogoProps) {
  return (
    <div
      className={`w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center ${className}`}
    >
      <span className="text-white font-bold text-sm">HO</span>
    </div>
  )
}
