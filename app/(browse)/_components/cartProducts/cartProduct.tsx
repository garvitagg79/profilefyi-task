"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../../contexts/CartContext";

interface ProductProps {
  product: {
    id: number;
    Brand: string;
    Image: string;
    Price: string;
  };
}

export const CartProduct: React.FC<ProductProps> = ({ product }) => {
  const [oldPrice, setOldPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const { cartItems, addToCart, removeFromCart } = useCartStore();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    let currentPrice = parseInt(product.Price.replace(/[^\d]/g, ""));
    let randomPercentage = Math.random() * (0.5 - 0.1) + 0.1; // Random percentage between 10% and 50%
    let calculatedOldPrice = Math.floor(currentPrice * (1 + randomPercentage));
    let formattedOldPrice = `₹${calculatedOldPrice.toLocaleString("en-IN")}`;

    // Calculate discount percentage
    let discount = Math.round(
      ((calculatedOldPrice - currentPrice) / calculatedOldPrice) * 100
    );
    let formattedDiscount = `${discount}% OFF`;

    setOldPrice(formattedOldPrice);
    setDiscountPercent(formattedDiscount);
  }, [product.Price]);

  return (
    <div className="border p-4 m-2 w-[95%] bg-gray-100 flex flex-row items-center justify-between">
      <img src={product.Image} alt={product.Brand} className="w-[10%] h-auto" />
      <div className="flex flex-col ml-6 mr-6 justify-center lg:max-w-[60%]">
        <h2 className="text-lg lg:text-xl font-bold mb-2">{product.Brand}</h2>
        <div className="flex flex-row items-center mb-2">
          <p className="text-lg font-semibold mr-4">{product.Price}</p>

          {oldPrice && (
            <div className="flex flex-row items-center">
              <p className="text-sm text-gray-600 line-through mr-4">
                {oldPrice}
              </p>
              <p className="text-sm text-[#2d5494] font-bold">
                {discountPercent}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mr-4">
        {cartQuantity > 0 ? (
          <div className="flex items-center">
            <Button
              size="sm"
              onClick={() => removeFromCart(product.id)}
              disabled={cartQuantity <= 0}
            >
              -
            </Button>
            <span className="mx-2 ml-4 mr-4">{cartQuantity}</span>
            <Button
              size="sm"
              onClick={() => addToCart(product.id)}
              disabled={cartQuantity >= 5}
            >
              +
            </Button>
          </div>
        ) : (
          <Button size="lg" onClick={() => addToCart(product.id)}>
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};
