"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "../../contexts/CartContext";
import { toast } from "sonner";
import productsData from "@/data/data.json";
import { useRouter } from "next/navigation";

interface FilterBoxProps {
  total: number;
}

export const FilterBox: React.FC<FilterBoxProps> = ({ total }) => {
  const router = useRouter();
  const { cartItems } = useCartStore();
  const [cartTotal, setCartTotal] = useState<number>(total);

  useEffect(() => {
    // Calculate total whenever cartItems changes
    const newTotal = cartItems.reduce((acc, item) => {
      // Find product data based on item id
      const product = productsData.products.find(
        (product) => product.id === item.id
      );
      if (product) {
        const productPrice = parseFloat(product.Price.replace(/[^\d.]/g, ""));
        acc += productPrice * item.quantity;
      }
      return acc;
    }, 0);

    setCartTotal(newTotal);
  }, [cartItems]);

  return (
    <div className="border p-4 m-2 w-[95%] bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-md">
        {/* Filter Options Section */}
        <div className="flex flex-col mb-10">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          {/* Add filter input and options here */}
          <Input placeholder="Search..." className="mb-2" />
          <Button size="lg" className="w-full mb-2 bg-black text-white">
            Apply Filter
          </Button>
        </div>

        {/* Cart Details Section */}
        {cartTotal > 0 ? (
          <div className="flex flex-col mb-4">
            <div className="flex items-center mb-4 justify-between">
              <p className="text-lg font-semibold mr-4">Cart Total:</p>
              <p className="text-lg">{`₹${cartTotal.toLocaleString(
                "en-IN"
              )}`}</p>
            </div>
            <Button
              size="lg"
              className="w-full bg-black text-white"
              onClick={() => router.push("/cart")}
            >
              Checkout
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="w-full bg-black text-white"
            onClick={() => toast("No items in cart")}
          >
            Add Items to Cart
          </Button>
        )}
      </div>
    </div>
  );
};
