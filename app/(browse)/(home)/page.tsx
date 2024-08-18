"use client";

import { NavBar } from "../_components/navbar";
import { Product } from "../_components/products/product";
import productsData from "@/data/data.json";
import { useCartStore } from "../contexts/CartContext";
import { FilterBox } from "../_components/filterBox/filterBox";

const HomeContent = () => {
  const { cartItems } = useCartStore();
  const { products } = productsData;

  // Filter products that are in the cart
  const cartProducts = products.filter((product) =>
    cartItems.some((cartItem) => cartItem.id === product.id)
  );

  const total = cartProducts.reduce((acc, product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem) {
      const productPrice = parseFloat(product.Price.replace(/[^\d.]/g, ""));
      acc += productPrice * cartItem.quantity;
    }
    return acc;
  }, 0);

  return (
    <div>
      {/* Fixed Navbar */}
      <NavBar />

      {/* Page Content with top padding to avoid overlap */}
      <div className="pt-20 flex min-h-screen bg-white">
        {/* Left section for FilterBox */}
        <div className="hidden lg:block w-full lg:w-[27%] bg-white lg:bg-gray-100 flex-col lg:justify-start lg:items-start p-4">
          <FilterBox total={total} />
        </div>

        {/* Spacer visible only on large screens */}
        <div className="hidden lg:block lg:w-px lg:bg-gray-300"></div>

        {/* Right section for Products */}
        <div className="w-full lg:w-[73%] bg-white flex flex-col items-center overflow-y-auto">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    
      <HomeContent />
   
  );
}
