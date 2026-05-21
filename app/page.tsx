export default function Home() {
  const categories = [
    "Smartphones",
    "Laptops",
    "Tablets",
    "Kopfhörer",
    "Smartwatches",
    "VPN",
    "Hosting",
    "KI Tools",
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
        <h1 className="text-2xl font-bold">VergleichPortal</h1>

        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          <a href="#">Produkte</a>
          <a href="#">Vergleiche</a>
          <a href="#">Top Deals</a>
          <a href="#">Blog</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <h2 className="text-5xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight">
          Vergleiche die besten Produkte online
        </h2>

        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
          Smartphones, Laptops, KI Tools, Hosting, VPN und mehr.
        </p>

        <div className="mt-10 flex justify-center">
          <input
            type="text"
            placeholder="Produkt suchen..."
            className="w-full max-w-2xl p-5 rounded-2xl bg-white text-black text-lg"
          />
        </div>
      </section>

      {/* KATEGORIEN */}
      <section className="px-6 pb-24">
        <h3 className="text-3xl font-bold mb-10">
          Beliebte Kategorien
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-zinc-900 hover:bg-zinc-800 transition p-8 rounded-3xl"
            >
              <h4 className="text-2xl font-semibold mb-3">
                {category}
              </h4>

              <p className="text-gray-400">
                Produkte vergleichen und beste Angebote finden.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP VERGLEICHE */}
      <section className="px-6 pb-24">
        <h3 className="text-3xl font-bold mb-10">
          Top Vergleiche
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h4 className="text-2xl font-semibold mb-4">
              Beste Smartphones 2026
            </h4>

            <p className="text-gray-400 mb-6">
              Vergleiche die beliebtesten Handys.
            </p>

            <button className="bg-white text-black px-5 py-3 rounded-xl font-medium">
              Jetzt vergleichen
            </button>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h4 className="text-2xl font-semibold mb-4">
              Beste VPN Anbieter
            </h4>

            <p className="text-gray-400 mb-6">
              Sichere und schnelle VPN Dienste.
            </p>

            <button className="bg-white text-black px-5 py-3 rounded-xl font-medium">
              Anbieter ansehen
            </button>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl">
            <h4 className="text-2xl font-semibold mb-4">
              Beste KI Tools
            </h4>

            <p className="text-gray-400 mb-6">
              Die besten AI Tools im Vergleich.
            </p>

            <button className="bg-white text-black px-5 py-3 rounded-xl font-medium">
              Tools entdecken
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}