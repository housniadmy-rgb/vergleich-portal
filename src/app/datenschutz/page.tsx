import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Datenschutzerklärung",
    description: `Informationen zum Datenschutz auf ${siteConfig.name}.`,
    path: "/datenschutz",
  }),
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="container-page max-w-3xl py-8">
      <Breadcrumbs
        items={[
          { name: "Start", path: "/" },
          { name: "Datenschutz", path: "/datenschutz" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
        Datenschutzerklärung
      </h1>

      <div className="prose-content mt-6 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-bold">1. Allgemeines</h2>
          <p className="mt-2">
            Der Schutz deiner personenbezogenen Daten ist uns wichtig. Wir
            verarbeiten Daten ausschließlich auf Grundlage der gesetzlichen
            Bestimmungen (DSGVO, DDG).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">2. Google AdSense</h2>
          <p className="mt-2">
            Diese Website nutzt Google AdSense, einen Dienst zur Einbindung von
            Werbeanzeigen der Google Ireland Ltd. Google AdSense verwendet
            Cookies und Web Beacons, um Anzeigen auszuliefern und deren
            Reichweite zu messen. Die Auslieferung personalisierter Werbung
            erfolgt nur mit deiner Einwilligung über das Consent-Banner.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">3. Amazon-Partnerprogramm</h2>
          <p className="mt-2">
            Wir sind Teilnehmer des Amazon-PartnerNet-Programms. Durch das
            Anklicken eines Affiliate-Links wirst du zu Amazon weitergeleitet.
            Bei einem Kauf erhalten wir eine Provision. Für dich entstehen
            dadurch keine Mehrkosten. Die Datenverarbeitung erfolgt nach den
            Datenschutzbestimmungen von Amazon.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">4. Server-Logfiles</h2>
          <p className="mt-2">
            Beim Aufruf der Website werden automatisch Informationen wie
            Browsertyp, Betriebssystem, Referrer-URL und Uhrzeit in
            Server-Logfiles gespeichert. Diese Daten sind nicht bestimmten
            Personen zuordenbar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">5. Deine Rechte</h2>
          <p className="mt-2">
            Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung sowie das Recht auf
            Datenübertragbarkeit und Widerspruch.
          </p>
        </section>

        <p className="rounded-xl bg-amber-50 p-4 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          Hinweis: Dies ist eine Vorlage und ersetzt keine Rechtsberatung. Bitte
          passe die Datenschutzerklärung an deine konkreten Dienste an und lasse
          sie vor Veröffentlichung rechtlich prüfen.
        </p>
      </div>
    </div>
  );
}
