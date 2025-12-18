import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContent = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quentity: 1,
      price: 500,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Shirt",
      size: "M",
      color: "blue",
      quentity: 1,
      price: 700,
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: 3,
      name: "Jeans",
      size: "M",
      color: "black",
      quentity: 1,
      price: 1500,
      image: "https://picsum.photos/200?random=3",
    },
    {
      productId: 4,
      name: "paint",
      size: "XL",
      color: "Blue",
      quentity: 1,
      price: 1100,
      image: "https://picsum.photos/200?random=4",
    },
    {
      productId: 5,
      name: "Shoes",
      size: "L",
      color: "Black",
      quentity: 1,
      price: 2500,
      image: "https://picsum.photos/200?random=5",
    },
    {
      productId: 6,
      name: "Cap",
      size: "L",
      color: "White",
      quentity: 1,
      price: 400,
      image: "https://picsum.photos/200?random=6",
    },
  ];
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-20 sm:w-20 sm:h-24 object-center mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | color:{product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium  ">
                  -
                </button>
                <span className="mx-4">{product.quentity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p> $ {product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin3Line className="w-6 h-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
