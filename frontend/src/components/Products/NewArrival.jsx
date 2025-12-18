import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrival = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0); // corrected: initialize as number (was false)
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: "120",
      images: [
        {
          url: "https://picsum.photos/200?random=1",
          altText: "Stlish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylish jeans",
      price: "110",
      images: [
        {
          url: "https://picsum.photos/200?random=2",
          altText: "Stlish Jacket",
        },
      ],
    },
    {
      _id: "3",
      name: "Stylish Cap",
      price: "100",
      images: [
        {
          url: "https://picsum.photos/200?random=3",
          altText: "Stlish Jacket",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylish Shirt",
      price: "50",
      images: [
        {
          url: "https://picsum.photos/200?random=4",
          altText: "Stlish Jacket",
        },
      ],
    },
    {
      _id: "5",
      name: "Stylish Jacket",
      price: "160",
      images: [
        {
          url: "https://picsum.photos/200?random=5",
          altText: "Stlish Jacket",
        },
      ],
    },
    {
      _id: "6",
      name: "Shoes",
      price: "110",
      images: [
        {
          url: "https://picsum.photos/200?random=6",
          altText: "Stlish Jacket",
        },
      ],
    },
    {
      _id: "7",
      name: "Stylish Jacket",
      price: "140",
      images: [
        {
          url: "https://picsum.photos/200?random=7",
          altText: "Stlish Jacket",
        },
      ],
    },
    {
      _id: "8",
      name: "Stylish Jacket",
      price: "90",
      images: [
        {
          url: "https://picsum.photos/200?random=8",
          altText: "Stlish Jacket",
        },
      ],
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    // corrected: store the starting X and the current scrollLeft (number)
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current ? scrollRef.current.scrollLeft : 0); // corrected: set scrollLeft number
    setCanScrollLeft(scrollRef.current ? scrollRef.current.scrollLeft > 0 : false); // corrected: set boolean
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = x - startX;
    // corrected: use previously saved scrollLeft (number) to compute new scroll
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    if (scrollRef.current) {
      // corrected: "behavior" spelling (was "behaviour")
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // update the scroll Buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth; // corrected: use container.scrollWidth

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
      // corrected: improved log values and guard against null
      // console.log({
      //   scrollLeft: container.scrollLeft,
      //   clientWidth: container.clientWidth,
      //   containerScrollWidth: container.scrollWidth, // corrected: show actual scrollWidth
      //   offsetLeft: container.offsetLeft,
      // });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      // corrected: use the same function reference for add/remove
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => {
        container.removeEventListener("scroll", updateScrollButtons); // corrected: fixed typo removeEventListener (was removeEventListner)
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // keep empty deps to run once

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>

        {/* scroll button */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-50 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight} // corrected: disable when cannot scroll right (was not disabled)
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-50 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      {/* scrollable content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              className="w-full h-[500px] object-cover rounded-lg"
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              draggable={false} // corrected: proper JSX boolean syntax
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1 ">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrival;
