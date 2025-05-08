"use client";

import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this runs only on client to avoid hydration mismatch
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent SSR mismatch

  // Define routes that should NOT use ClientLayout
  const noLayoutRoutes = ["/login", "/signup", "/account-type"];

  const isNoLayout = noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
    <head>
      <title>lcm application</title>
      <link rel="icon" href="/lcmicon.svg" type="image/svg+xml" />
    </head>
    <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
      {isNoLayout ? children : <ClientLayout>{children}</ClientLayout>}
    </body>
  </html>
  
  );
}
