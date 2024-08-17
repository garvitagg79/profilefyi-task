"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Search } from "./search";
import { Logo } from "./logo";
import { Cart } from "./cart";
import Link from "next/link";

export const NavBar = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px for lg breakpoint
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-[49] bg-white px-2 lg:px-4 flex items-center shadow-sm border-b-2 justify-center">
      {/* Logo, visible only on large screens */}
      <div className="hidden lg:flex flex-shrink-0">
        <Logo />
      </div>

      <div className="flex-grow flex items-center">
        <div className="relative w-full flex items-center">
          <div className="absolute left-[10%] right-[10%] sm:left-[20%] sm:right-[10%] lg:left-[26.5%] lg:right-[10%]">
            <Search />
          </div>
        </div>
      </div>

      {/* Cart and UserButton, visible only on large screens */}
      <div className="flex items-center space-x-4 justify-center">
        <div className="flex-shrink-0">
          <Link href="/cart">
            <Cart />
          </Link>
        </div>
        <div className="flex-shrink-0">
          {/* <UserButton showName={isLargeScreen} /> */}
        </div>
      </div>
    </nav>
  );
};
