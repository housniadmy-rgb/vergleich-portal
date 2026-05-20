import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Impressum",
    description: `Impressum und Anbieterkennzeichnung von ${siteConfig.name}.`,
    path: "/impressum",
  }),
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="container-page max-w-3xl py-8">
      <Breadcrumbs
        items={[
          { name: "Start", path: "/" },
          { name: "Impressum", path: "/impressum" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Impressum</h1>

      <div className="prose-content mt-6 space-y-6 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-bold">Angaben gemäß § 5 DDG</h2>
          <p className="mt-2 text-sm leading-relaxed">
            [Name des Anbieters]
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ und Ort]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">Kontakt</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Telefon: [Telefonnummer]
            <br />
            E-Mail: [E-Mail-Adresse]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            [Name]
            <br />
            [Anschrift]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">Haftungshinweis</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
            Haftung für die Inhalte externer Links. Für den Inhalt der
            verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich. Preisangaben sind ohne Gewähr; maßgeblich ist stets
            der Preis im Shop zum Zeitpunkt des Kaufs.
          </p>
        </section>

        <p className="rounded-xl bg-amber-50 p-4 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          Hinweis: Dies ist eine Vorlage. Bitte ergänze die mit [ ]
          gekennzeichneten Felder mit deinen rechtsgültigen Angaben, bevor die
          Website online geht.
        </p>
      </div>
    </div>
  );
}
