import React, {  useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import useAdd from "../hooks/useAdd";



function ProductDetail() {

  const { addToCart, addedCartRed, addedCart } = useAdd();

  const { id } = useParams();   // useNavigate ile route a yolladım route da id değişkeni ile (/:id) id sini parametre olarak aldım.useParams ile de bu değişkeni product detail içine aldım.


  const [product, setProduct] = useState(null);

  const navigate = useNavigate(); // eğer id si olmayan ürün olursa NotFoun404 sayfasına gitmek için.

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();

        const getProduct = data.find((item) => item.productId == id);
        setProduct(getProduct);

      } catch (error) {
        console.log("Data error:", error);
      }
    };

    getProducts();
  }, []);

  if (!product) {
    return navigate("../*");
  }


  return (
    <main className="min-h-screen bg-neutral-100 px-8 py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* PHONE VISUAL */}
        <div className="relative flex justify-center">
          {/* WAVE / GLOW BEHIND PHONE */}
          <div
            className="absolute w-[520px] h-[520px] rounded-full blur-3xl"
            style={{
              background: `
            radial-gradient(
              circle at 30% 30%,
              rgba(30,30,30,0.9),
              rgba(10,10,10,0.6) 40%,
              rgba(0,0,0,0.2) 65%,
              transparent 70%
            )
          `,
            }}
          />

          <div
            className="absolute w-[420px] h-[420px] rounded-full blur-2xl translate-x-10 translate-y-10"
            style={{
              background: `
            radial-gradient(
              circle at 70% 70%,
              rgba(60,60,60,0.6),
              rgba(20,20,20,0.4) 50%,
              transparent 70%
            )
          `,
            }}
          />

          {/* IMAGE */}
          <img
            src={product.productImg}
            alt={product.productName}
            className="relative z-10 w-[550px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-14">
          <span className="text-xs tracking-[0.4em] uppercase text-neutral-500">
            {product.categoryName}
          </span>

          <h1 className="text-[3.4rem] leading-tight font-medium text-neutral-900">
            {product.productName}
          </h1>

          <p className="text-neutral-600 leading-relaxed max-w-xl">
            {product.productDescription}
          </p>

          {/* FEATURES */}
          <div className="flex flex-col gap-5">
            {product.productFeatures?.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-2 h-px w-8 bg-neutral-400"></div>
                <span className="text-neutral-700 text-sm leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* PRICE + CTA */}
          <div className="flex items-center justify-between pt-10 border-t border-neutral-300">
            <span className="text-3xl font-medium text-neutral-900">
              ${product.productPrice}
            </span>

            {(!addedCart && !addedCartRed) && ( <button onClick={async () => await addToCart(product)} className="w-xs mt-4 py-3 rounded-xl bg-white text-black font-semibold border border-gray-200 hover:bg-gray-50">
              Add to Cart
            </button>)}
            {addedCart && (<div className="w-xs mt-4 py-3 rounded-xl bg-green-50 text-green-700 font-semibold border border-green-200 text-center">
              ✓ Added successfully
            </div>)}
            {addedCartRed && (  <div className="w-xs mt-4 py-3 rounded-xl bg-red-50 text-red-700 font-semibold border border-red-200 text-center">
                ✕ Already in cart
              </div>)}

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
        