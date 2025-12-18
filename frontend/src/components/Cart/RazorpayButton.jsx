import React from "react";

const RazorpayButton = ({ amount, onSuccess, onError }) => {
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    const options = {
      key: "jL0Qvqmo28M7qLYnIZxsQ7ly", // 🔴 Replace with your Razorpay key
      amount: amount * 100, // ✅ Amount in paise (multiply by 100)
      currency: "INR",
      name: "Your Company Name",
      description: "Payment Transaction",
      image: "https://your-logo-url.com/logo.png", // Optional
      handler: function (response) {
        // ✅ Success callback
        onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Transaction Note",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          console.log("Payment modal closed");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    
    paymentObject.on("payment.failed", function (response) {
      // ✅ Error callback
      console.error("Razorpay Error:", response.error);
      onError(response.error);
    });

    paymentObject.open();
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: "#3399cc",
        color: "white",
        padding: "12px 24px",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        width: "100%",
        transition: "background-color 0.3s",
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#2980b9"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#3399cc"}
    >
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;