import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TechVergleich – Beste Elektronik 2026 im Test & Vergleich",
    template: "%s | TechVergleich",
  },
  description:
    "Vergleiche Smartphones, Laptops, Tablets, Kopfhörer und Smartwatches. Echte Bewertungen, aktuelle Preise und die besten Amazon-Angebote 2026.",
  keywords: ["Smartphone Vergleich", "Laptop Test", "Kopfhörer", "Smartwatch", "Elektronik 2026", "Amazon"],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "TechVergleich",
    url: "https://techvergleich.de",
  },
  twitter: {
    card: "summary_large_image",
    site: "@techvergleich",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://techvergleich.de"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Google AdSense – in Produktion aktivieren:
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
