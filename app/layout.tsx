"use client";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
    //   <html lang="en">
    //     <body className={inter.className}>
    //       <main className="min-h-screen">
    //         <SignedOut>
    //           <div className="flex justify-center items-center min-h-screen">
    //             <SignIn routing="hash" />
    //           </div>
    //         </SignedOut>
    //         <SignedIn>{children}</SignedIn>
    //       </main>
    //       <Toaster />
    //     </body>
    //   </html>
    // </ClerkProvider>

    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
