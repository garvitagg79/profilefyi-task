"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "../../contexts/CartContext";
import { toast } from "sonner";

interface CartBoxProps {
  total: number;
}

export const CartBox: React.FC<CartBoxProps> = ({ total }) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState<number | null>(null);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  // Handle coupon application
  const applyCoupon = () => {
    // Example logic for applying a coupon
    // Here, you could call an API or use some business logic to determine the discount
    if (coupon === "PROFILEFYI" || coupon === "GARVIT") {
      setDiscount(20);
      toast("Coupon Applied", {
        description: `${coupon} offers you 20% discount`,
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
        className: "bg-black text-white", // Example of custom class, adjust as needed
      });
    } else {
      setDiscount(0);
      toast("Invalid Coupon", {
        description: `Try again`,
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
        className: "bg-black text-white", // Example of custom class, adjust as needed
      });
    }
  };

  // Calculate discounted total
  const discountedTotal = discount ? total - (total * discount) / 100 : total;

  return (
    <div className="border p-4 m-2 w-[95%] bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col mb-4">
          <div className="flex items-center mb-2 justify-between">
            <p className="text-lg font-semibold mr-4">Original Price:</p>
            <p className="text-lg">{`₹${total.toLocaleString("en-IN")}`}</p>
          </div>
          {discount !== null && (
            <div className="flex items-center mb-2 justify-between">
              <p className="text-lg font-semibold mr-4">Discount:</p>
              <p className="text-lg">{discount}%</p>
            </div>
          )}
          <div className="flex items-center mb-4 justify-between">
            <p className="text-lg font-semibold mr-4">Total:</p>
            <p className="text-lg">{`₹${discountedTotal.toLocaleString(
              "en-IN"
            )}`}</p>
          </div>
        </div>

        <div className="flex flex-col w-full mb-4">
          <Input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="mb-2"
          />
          <div className="mt-2 mb-2 flex">
            <p>
              Try coupon{" "}
              <span className="text-[#fe2421] font-bold">
                &quot;PROFILEFYI&quot;
              </span>{" "}
              OR{" "}
              <span className="text-[#fe2421] font-bold">
                &quot;GARVIT&quot;
              </span>{" "}
              for 25% discount
            </p>
          </div>

          <Button onClick={applyCoupon} className="mb-3 mt-4">
            Apply Coupon
          </Button>
        </div>

        <Button
          size="lg"
          className="w-full bg-black text-white"
          onClick={() =>
            toast("Order Placed Successfully", {
              description: `Order placed on ${getCurrentDateTime()}`,
              action: {
                label: "Close",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};
