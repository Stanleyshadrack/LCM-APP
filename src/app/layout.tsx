"use client";

import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ConfigProvider, theme as antdTheme } from "antd"; // ⬅️ for AntD theming
import { ThemeProvider, useTheme } from "./context/ThemeContext";


// Fonts
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"] });

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const noLayoutRoutes = ["/login", "/signup", "/account-type"];
  const isNoLayout = noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>lcm application</title>
        <link rel="icon" href="/lcmicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <ThemeProvider>
          <InnerLayout>
            {isNoLayout ? children : <ClientLayout>{children}</ClientLayout>}
          </InnerLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
