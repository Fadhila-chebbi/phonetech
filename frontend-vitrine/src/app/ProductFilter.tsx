"use client";
import { useState } from "react";

type Product = {
  id: number;
  Title: string;
  price: number;
  description?: any[];
  image?: {
    url: string;
    alternativeText?: string | null;
  };
  category?: {
    name: string;
  };
};

type Props = {
  products: Product[];
};

export default function ProductFilter({ products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
const categories: string[] = [
  "Toutes",
  ...Array.from(
    new Set(
      products
        .map((product) => product.category?.name)
        .filter((name): name is string => Boolean(name))
    )
  ),
];
  const filteredProducts =
    selectedCategory === "Toutes"
      ? products
      : products.filter(
          (product) => product.category?.name === selectedCategory
        );

  return (
    <>
      {/* CATEGORIES */}

      <div className="flex flex-wrap justify-center gap-3 mb-10">

        {categories.map((category) => {

          const isSelected = selectedCategory === category;

          const buttonClass =
            "px-6 py-3 rounded-full font-medium transition " +
            (isSelected
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200");

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={buttonClass}
            >
              {category === "Toutes" ? "🛍️ " : ""}
              {category}
            </button>
          );
        })}

      </div>


      {/* NOMBRE DE PRODUITS */}

      <div className="mb-6 text-gray-500 text-sm">

        {filteredProducts.length} produit
        {filteredProducts.length > 1 ? "s" : ""}

        {selectedCategory !== "Toutes"
          ? " dans " + selectedCategory
          : ""}

      </div>


      {/* PRODUITS */}

      {filteredProducts.length === 0 ? (

        <div className="text-center py-20">
          <p className="text-gray-500">
            Aucun produit dans cette catégorie.
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredProducts.map((product) => {

            const description = product.description
              ?.map((block: any) =>
                block.children
                  ?.map((child: any) => child.text)
                  .join("")
              )
              .join(" ");

            return (
              <article
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
              >

                {/* IMAGE */}

                <div className="h-64 bg-gray-50 flex items-center justify-center overflow-hidden">

                  {product.image?.url ? (

                    <img
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        product.image.url
                      }
                      alt={
                        product.image.alternativeText ||
                        product.Title
                      }
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition duration-500"
                    />

                  ) : (

                    <div className="text-gray-400">
                      Pas d'image
                    </div>

                  )}

                </div>


                {/* INFORMATIONS */}

                <div className="p-5">

                  {product.category?.name && (
                    <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-2">
                      {product.category.name}
                    </p>
                  )}

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {product.Title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                    {description}
                  </p>


                  {/* PRIX */}

                  <div className="flex items-center justify-between mt-5">

                    <div>

                      <span className="text-2xl font-bold text-gray-900">
                        {product.price}
                      </span>

                      <span className="text-sm text-gray-500 ml-1">
                        DT
                      </span>

                    </div>

                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition">
                      Ajouter
                    </button>

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      )}

    </>
  );
}

