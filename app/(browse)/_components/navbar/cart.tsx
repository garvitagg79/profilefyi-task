"use client";

import { useCartStore } from "../../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const Cart = () => {
  const { getCartQuantity } = useCartStore();
  const cartQuantity = getCartQuantity();

  return (
    <div className="relative inline-block">
      <Button
        size="sm"
        className="relative bg-white p-2 hover:bg-white focus:ring-0 focus:outline-none group"
      >
        <ShoppingCart
          className="text-[#1d3966] group-hover:text-[#1d3966] w-6 h-6 group-hover:w-7 group-hover:h-7 transition-all duration-200 ease-in-out"
          fill="#1d3966"
        />
      </Button>
      {cartQuantity > 0 && (
        <div className="absolute -top-1 -right-1 bg-[#fe2421] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {cartQuantity}
        </div>
      )}
    </div>
  );
};
