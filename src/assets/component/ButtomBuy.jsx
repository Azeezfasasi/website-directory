import React from "react";

const ButtomBuy = () => {
  const phoneNumber = "2348117256648"; // Replace with your WhatsApp number
  const message = encodeURIComponent("Hi, I'm interested in buying this web template. Can you share more details?");

  return (
    <>
      {/* For small screen */}
      <a 
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block lg:hidden fixed top-[160px] right-0 transform -translate-y-1/2 bg-[#ff6600] text-white px-4 py-2 rounded-l-lg shadow-lg text-sm font-semibold hover:bg-[#cc5200] transition-all animate-bounce"
      >
        <i class="fa-solid fa-cart-shopping"></i> Buy This Web Template
      </a>

      {/* For large screen */}
      <a 
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:block fixed top-1/2 right-0 transform -translate-y-1/2 bg-[#ff6600] text-white px-4 py-2 rounded-l-lg shadow-lg text-sm font-semibold hover:bg-[#cc5200] transition-all animate-bounce"
      >
        <i class="fa-solid fa-cart-shopping"></i> Buy This Web Template
      </a>
    </>
  );
};

export default ButtomBuy;
