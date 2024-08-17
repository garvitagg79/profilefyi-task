"use client";

import { useEffect, useState } from "react";
import { NavBar } from "../_components/navbar";
import { CartProduct } from "../_components/cartProducts/cartProduct";
import productsData from "@/data/data.json";
import { useCart } from "../contexts/CartContext";
import { CartBox } from "../_components/cartBox/cartBox";
import { CartProvider } from "../contexts/CartContext";

interface Product {
  id: number;
  Brand: string;
  Image: string;
  Price: string;
}

const CartContent = () => {
  const { cartItems } = useCart();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // Update cartProducts and total when cartItems changes
    const updatedCartProducts = productsData.products.filter((product) =>
      cartItems.some((cartItem) => cartItem.id === product.id)
    );
    setCartProducts(updatedCartProducts);

    const updatedTotal = updatedCartProducts.reduce((acc, product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (cartItem) {
        const productPrice = parseFloat(product.Price.replace(/[^\d.]/g, ""));
        acc += productPrice * cartItem.quantity;
      }
      return acc;
    }, 0);
    setTotal(updatedTotal);
  }, [cartItems]);

  return (
    <div>
      <NavBar />
      <div className="pt-20 min-h-screen bg-white flex flex-col lg:flex-row">
        {/* Main content (cart products) */}
        <div className="flex flex-col w-full lg:w-[73%] bg-white overflow-y-auto lg:order-1">
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center py-4">Your cart is empty.</p>
          )}
        </div>

        {/* Cart summary */}
        <div className="w-full lg:w-[27%] bg-white lg:bg-gray-100 flex justify-center lg:justify-start lg:items-start p-4 lg:order-2 lg:mt-4 lg:mb-4">
          <CartBox total={total} />
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}
