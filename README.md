# ElektronikVergleich – SEO-Vergleichsportal für Elektronik

Ein modernes, produktionsreifes Vergleichsportal für Elektronikgeräte
(Smartphones, Laptops, Tablets, Kopfhörer, Smartwatches, Monitore, Gaming &
Zubehör). Gebaut für organischen Google-Traffic und Monetarisierung über
Google AdSense (CPC) und Amazon-PartnerNet (Affiliate).

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS 3** (Dark & Light Mode)
- SEO-first: Metadata API, JSON-LD, automatische `sitemap.xml` & `robots.txt`
- Mobile-first, responsives Card-Layout
- Statisch vorgerendert (SSG) für Top-Performance

## Schnellstart

```bash
npm install
npm run dev
```

Die Anwendung läuft anschließend unter <http://localhost:3000>.

Produktions-Build:

```bash
npm run build
npm run start
```

## Konfiguration

Lege eine `.env`-Datei an (Vorlage: `.env.example`):

```bash
NEXT_PUBLIC_SITE_URL=https://www.deine-domain.de
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_AMAZON_TAG=deintag-21
```

- Ohne `NEXT_PUBLIC_ADSENSE_CLIENT` werden die AdSense-Flächen als
  Platzhalter angezeigt.
- `NEXT_PUBLIC_AMAZON_TAG` wird automatisch an alle Affiliate-Links angehängt.

## Projektstruktur

```
src/
├── app/                  # Routen (App Router)
│   ├── page.tsx          # Startseite
│   ├── kategorie/[slug]  # Kategorie-Seiten mit Filter & Sortierung
│   ├── produkt/[slug]    # Produkt-/Review-Seiten
│   ├── vergleich/        # Vergleichsseiten + Generator
│   ├── blog/             # Blog & Ratgeber
│   ├── suche/            # Produktsuche
│   ├── sitemap.ts        # Automatische sitemap.xml
│   └── robots.ts         # Automatische robots.txt
├── components/           # Wiederverwendbare UI-Komponenten
├── data/                 # products.json, comparisons.json, blog & Kategorien
├── lib/                  # Datenzugriff, SEO-Helfer, Utilities
└── types/                # TypeScript-Typen
```

## Inhalte pflegen

- **Produkte:** `src/data/products.json`
- **Vergleiche:** `src/data/comparisons.json`
- **Blogartikel:** `src/data/blog.ts`
- **Kategorien:** `src/data/categories.ts`

## Monetarisierung

- **Google AdSense:** Anzeigenflächen im Header, In-Content und in der Sidebar
  (`<AdSlot />`).
- **Amazon-PartnerNet:** Alle CTA-Buttons (`<CtaButton />`) sind Affiliate-Links
  mit `rel="sponsored nofollow"`.

## Rechtliches

`/impressum` und `/datenschutz` sind als Vorlagen enthalten und müssen vor dem
Livegang mit rechtsgültigen Angaben ergänzt werden.
