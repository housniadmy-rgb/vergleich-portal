import Link from 'next/link'
import { Cpu, Twitter, Youtube, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span>TechVergleich</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Deutschlands führendes Elektronik-Vergleichsportal. Unabhängig, aktuell, kostenlos.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'YouTube' },
                { icon: Instagram, label: 'Instagram' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Kategorien */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Kategorien</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/category/smartphones', label: 'Smartphones' },
                { href: '/category/laptops', label: 'Laptops' },
                { href: '/category/tablets', label: 'Tablets' },
                { href: '/category/kopfhoerer', label: 'Kopfhörer' },
                { href: '/category/smartwatches', label: 'Smartwatches' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Mehr Kategorien */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Mehr Kategorien</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/category/monitore', label: 'Monitore' },
                { href: '/category/gaming', label: 'Gaming' },
                { href: '/category/zubehoer', label: 'Zubehör' },
                { href: '/blog', label: 'Blog & Tests' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Top Vergleiche */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Top Vergleiche</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/compare/iphone-16-pro-vs-samsung-galaxy-s25-ultra', label: 'iPhone vs. Samsung' },
                { href: '/compare/beste-laptops-2026', label: 'Beste Laptops' },
                { href: '/compare/beste-noise-cancelling-kopfhoerer-2026', label: 'Beste Kopfhörer' },
                { href: '/compare/ipad-pro-m4-vs-samsung-galaxy-tab-s9-ultra', label: 'iPad vs. Galaxy Tab' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/impressum', label: 'Impressum' },
                { href: '/datenschutz', label: 'Datenschutz' },
                { href: '/agb', label: 'AGB' },
                { href: '/affiliate', label: 'Affiliate-Hinweis' },
                { href: '/sitemap.xml', label: 'Sitemap' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} TechVergleich. Alle Rechte vorbehalten.</p>
          <p className="text-xs text-gray-700 max-w-md">
            * Affiliate-Hinweis: Diese Seite enthält Amazon PartnerNet-Links. Beim Kauf über diese Links erhalten wir eine Provision ohne Mehrkosten für dich.
          </p>
        </div>
      </div>
    </footer>
  )
}
