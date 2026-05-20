'use client'

interface AdBannerProps {
  slot: 'header' | 'sidebar' | 'in-content' | 'footer'
  className?: string
}

const slotConfig = {
  header: { height: 'h-24', label: 'Header Banner (728×90)', width: 'w-full max-w-3xl' },
  sidebar: { height: 'h-64', label: 'Sidebar (300×250)', width: 'w-full' },
  'in-content': { height: 'h-28', label: 'In-Content Banner (468×60)', width: 'w-full max-w-lg' },
  footer: { height: 'h-24', label: 'Footer Banner (728×90)', width: 'w-full max-w-3xl' },
}

export function AdBanner({ slot, className = '' }: AdBannerProps) {
  const config = slotConfig[slot]
  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div
        className={`${config.width} ${config.height} bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center gap-1`}
      >
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          Werbung
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-600">{config.label}</span>
        {/* Replace with real AdSense code in production:
            <ins className="adsbygoogle" data-ad-client="ca-pub-XXXXXXXX" data-ad-slot="XXXXXXXX" /> */}
      </div>
    </div>
  )
}
