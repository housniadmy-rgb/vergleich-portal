import Link from 'next/link'
import { BarChart2, Twitter, Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <BarChart2 className="w-6 h-6 text-blue-400" />
              <span>VergleichPortal</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              Deutschlands führendes Vergleichsportal für Software, KI-Tools, VPN, Hosting, Smartphones und mehr.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kategorien */}
          <div>
            <h3 className="font-semibold text-white mb-3">Kategorien</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/ki-tools" className="hover:text-white transition-colors">KI Tools</Link></li>
              <li><Link href="/category/vpn" className="hover:text-white transition-colors">VPN</Link></li>
              <li><Link href="/category/hosting" className="hover:text-white transition-colors">Hosting</Link></li>
              <li><Link href="/category/software" className="hover:text-white transition-colors">Software</Link></li>
              <li><Link href="/category/smartphones" className="hover:text-white transition-colors">Smartphones</Link></li>
              <li><Link href="/category/laptops" className="hover:text-white transition-colors">Laptops</Link></li>
              <li><Link href="/category/elektronik" className="hover:text-white transition-colors">Elektronik</Link></li>
            </ul>
          </div>

          {/* Vergleiche */}
          <div>
            <h3 className="font-semibold text-white mb-3">Vergleiche</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/compare/beste-vpn-2026" className="hover:text-white transition-colors">Beste VPN 2026</Link></li>
              <li><Link href="/compare/ki-tools-vergleich-2026" className="hover:text-white transition-colors">KI Tools Vergleich</Link></li>
              <li><Link href="/compare/beste-smartphones-2026" className="hover:text-white transition-colors">Beste Smartphones</Link></li>
              <li><Link href="/compare/beste-laptops-2026" className="hover:text-white transition-colors">Beste Laptops</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="font-semibold text-white mb-3">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
              <li><Link href="/agb" className="hover:text-white transition-colors">AGB</Link></li>
              <li><Link href="/affiliate" className="hover:text-white transition-colors">Affiliate-Hinweis</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} VergleichPortal. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-gray-700 text-center sm:text-right max-w-md">
            * Affiliate-Links: Wenn du über unsere Links kaufst, erhalten wir eine Provision ohne Mehrkosten für dich.
          </p>
        </div>
      </div>
    </footer>
  )
}
