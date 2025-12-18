import Hero from "@/components/Layout/Hero";
import FeaturedCollection from "@/components/Products/FeaturedCollection";
import FeaturesSection from "@/components/Products/FeaturesSection";
import GenderCollectionSection from "@/components/Products/GenderCollectionSection";
import NewArrival from "@/components/Products/NewArrival";
import ProductDetails from "@/components/Products/ProductDetails";
import ProductGrid from "@/components/Products/ProductGrid";
import React from "react";

const placeholderProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/200?random=1",
        altText: "Product 1",
      },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/200?random=2",
        altText: "Product 2",
      },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/200?random=3",
        altText: "Product 3",
      },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/200?random=4",
        altText: "Product 1",
      },
    ],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/200?random=5",
        altText: "Product 5",
      },
    ],
  },
  {
    _id: 6,
    name: "Product 6",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/200?random=6",
        altText: "Product 6",
      },
    ],
  },
  {
    _id: 7,
    name: "Product 7",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/200?random=7",
        altText: "Product 7",
      },
    ],
  },
  {
    _id: 8,
    name: "Product 8",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/200?random=8",
        altText: "Product 8",
      },
    ],
  },
];

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrival />
      {/* Best seller */}
      <h1 className="text-3xl text-center font-bold mb-4">Best Seller</h1>{" "}
      {/* corrected: fixed typo "b=mb-4" -> "mb-4" */}
      <ProductDetails />
      {/* Top Wears for Women */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturedCollection />
      <FeaturesSection/>
    </div>
  );
};

export default Home;
