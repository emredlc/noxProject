import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import bannerImage from "../../public/assets/NoxViewBanner.png";

function NoxView() {
  const [views, setViews] = useState([]);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();

        const gettingViews = data.filter((item) => item.categoryId === 5);

        setViews(gettingViews);
      } catch (error) {
        console.log("Data error:", error);
      }
    };

    fetchViews();
  }, []);

  return (
    <main className="mb-5">
      {/* BANNER */}
      <section className="pt-12">
        <img src={bannerImage} alt="NoxViewBanner" />
      </section>

      {/* TITLE */}
      <section className="bg-white">
        <div className="flex justify-center py-12">
          <h1 className="text-5xl font-bold">NOX VIEWS</h1>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-12 justify-center">
            {views.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default NoxView;
