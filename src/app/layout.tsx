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
    default: "VergleichPortal – Beste Produkte & Software vergleichen 2026",
    template: "%s | VergleichPortal",
  },
  description:
    "Vergleiche KI-Tools, VPN, Hosting, Smartphones & Laptops. Finde das beste Produkt mit echten Bewertungen und aktuellen Preisen.",
  keywords: ["vergleich", "test", "beste", "KI tools", "VPN", "Hosting", "Smartphone"],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "VergleichPortal",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://vergleich-portal.de"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* AdSense placeholder - replace with real script in production */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" /> */}
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
