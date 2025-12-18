import FilterSidebar from "@/components/Products/FilterSidebar";
import ProductGrid from "@/components/Products/ProductGrid";
import SortOption from "@/components/Products/SortOption";
import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  // ✅ correct event listener logic
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]); // depend on sidebar state

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 121,
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
          price: 122,
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
          price: 123,
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
          price: 124,
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
          price: 125,
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
          price: 126,
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
          price: 127,
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
          price: 128,
          images: [
            {
              url: "https://picsum.photos/200?random=8",
              altText: "Product 8",
            },
          ],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filter
      </button>
      {/* filter sidbar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50: left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
        ref={sidebarRef}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* sort option */}
        <SortOption/>

        {/* Product Grid */}
        <ProductGrid products={products}/>
      </div>
    </div>
  );
};

export default CollectionPage;
