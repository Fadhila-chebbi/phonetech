  import ProductFilter from "./ProductFilter";
export const dynamic = "force-dynamic";
async function getProducts() {
  const res = await fetch( 
process.env.STRAPI_INTERNAL_URL + "/api/products?populate=*",
  {
    cache: "no-store",
  }
);

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des produits");
  }

  return res.json();
}

export default async function Home() {
  const { data: products } = await getProducts();

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              PhoneTech
            </h1>

            <p className="text-xs text-gray-500">
              Accessoires téléphoniques
            </p>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#" className="text-gray-900 hover:text-blue-600">
              Accueil
            </a>

            <a href="#produits" className="text-gray-600 hover:text-blue-600">
              Produits
            </a>

            <a href="#contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </a>
          </nav>

          <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
            🛒 Panier
          </button>

        </div>
      </header>


      {/* HERO */}
      <section className="bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <p className="text-blue-400 font-semibold mb-3">
            BIENVENUE CHEZ PHONETECH
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Les meilleurs accessoires
            <br />
            pour votre smartphone
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Découvrez notre sélection de coques, chargeurs et écouteurs
            pour protéger et améliorer votre expérience mobile.
          </p>

          <a
            href="#produits"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg font-semibold"
          >
            Découvrir les produits
          </a>

        </div>

      </section>


      {/* PRODUITS */}
      <section
        id="produits"
        className="max-w-7xl mx-auto px-6 py-16"
      >

        <div className="text-center mb-10">

          <p className="text-blue-600 font-semibold text-sm">
            NOTRE COLLECTION
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Nos produits
          </h2>

          <p className="text-gray-500 mt-3">
            Découvrez tous nos accessoires téléphoniques.
          </p>

        </div>

        <ProductFilter products={products} />

      </section>


      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-gray-900 text-gray-300"
      >

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row justify-between gap-6">

            <div>

              <h3 className="text-xl font-bold text-white">
                PhoneTech
              </h3>

              <p className="text-sm mt-2">
                Votre boutique d'accessoires téléphoniques.
              </p>

            </div>

            <div className="text-sm">

              <p>
                📧 contact@phonetech.tn
              </p>

              <p className="mt-2">
                📞 +216 55 250 848
              </p>

            </div>

          </div>


          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-500">
            © 2026 PhoneTech — Tous droits réservés.
          </div>

        </div>

      </footer>

    </main>
  );
}