import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/4 md:[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer} className="w-6 h-6 text-gray-600">
          <IoMdClose />
        </button>
      </div>
      {/* cart contend scrollable Area */}
      <div className="flex-grow p-4 overflow-y-auto-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {/* component for class Contents */}
        <CartContent />
      </div>
      {/* checkout button */}
      <div className="p-4 bg-white sticky bottom-0">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
        >
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping, texes and codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
