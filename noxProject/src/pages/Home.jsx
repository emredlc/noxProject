import React, { useEffect, useState } from "react";
import bannerImage from "../../public/assets/HomePageBanner.png";
import aboutSmallImage from "../../public/assets/AboutUsSmallImage.png";
import ProductCard from "../components/ProductCard";

function Home() {

  
  const [oneEach, setOneEach] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();

        const gettingOneEach = data.filter((item) => {
          return (
            item.productId === 1 ||
            item.productId === 10 ||
            item.productId === 4 ||
            item.productId === 13 ||
            item.productId === 7
          );
        });

        setOneEach(gettingOneEach);
      } catch (error) {
        console.log("Data error:", error);
      }
    };

    fetchAll();
  }, []);

  return (
    <main className="mb-5">
      {/* BANNER */}
      <section className="pt-12">
        <img src={bannerImage} alt="HomePageBanner" />
      </section>

      {/* ABOUT CONTENT */}
      <section>
        {/* Başlık */}
        <div className="flex items-center justify-center pt-8 pb-8">
          <h1 className="text-5xl font-bold">About Us</h1>
        </div>

        {/* Görsel + Metin */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <img
            src={aboutSmallImage}
            alt="AboutSmallImage"
            className="ml-5 mr-5 mb-10 w-full md:w-1/5 max-w-md rounded-lg object-cover"
          />
          <p className="max-w-prose md:w-1/4 max-w-md px-1 leading-relaxed">
            Nox is a technology brand focused on clarity, performance, and
            intentional design. We create refined, minimalist products that feel
            natural to use while delivering powerful, reliable performance.
            Built as a connected ecosystem, Nox devices are designed for
            seamless interaction, long-term durability, and thoughtful
            engineering rather than short-lived trends. Every detail reflects
            our commitment to quality, simplicity, and quiet
            confidence—technology that integrates effortlessly into everyday
            life and stands the test of time.
            <br />
            <br />
            <br />
          </p>
        </div>

        {/* PRODUCTS */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap gap-16 justify-center">
              {oneEach.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Home;
