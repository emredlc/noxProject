import React from "react";
import bannerImage from "../../public/assets/NoxAboutUsBanner.png";
import aboutSmallImage from "../../public/assets/AboutUsSmallImage.png";

function About() {
  return (
    <main className="mb-8">
      {/* BANNER */}
      <section className="pt-12">
        <img src={bannerImage} alt="NoxBanner" />
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
            className="ml-5 mr-5 w-full md:w-1/2 max-w-md rounded-lg object-cover"
          />
          <p className="max-w-prose px-1 py-2 leading-relaxed">
            Nox is a technology brand built around clarity, performance, and
            intentional design. We believe great technology should feel
            natural—powerful without being overwhelming, refined without being
            complicated. Our products are designed to support modern life with
            precision and confidence, blending advanced engineering with a
            minimalist aesthetic.
            <br />
            <br />
            Every Nox product is developed as part of a connected ecosystem.
            From smartphones and laptops to wearables and audio devices, we
            focus on seamless interaction and consistent performance across all
            platforms. Rather than following short-lived trends, we prioritize
            long-term reliability, thoughtful design decisions, and user-focused
            innovation.
            <br />
            <br />
            At the core of Nox is a commitment to quality in every detail. We
            pay close attention to materials, durability, and performance,
            ensuring that each device meets a high standard of craftsmanship.
            Our goal is not just to create technology that looks premium, but
            technology that feels dependable and purposeful in everyday use.
            <br />
            <br />
            We design for people who value simplicity, efficiency, and trust in
            the tools they use. Nox represents a quiet confidence—technology
            that speaks through experience rather than noise. By setting a
            higher standard for usability and design, we aim to create products
            that integrate seamlessly into life and stand the test of time.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
