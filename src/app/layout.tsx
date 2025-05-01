import { Inter, Roboto_Mono } from "next/font/google"; 
import "./globals.css";
import ClientLayout from "./clientLayout";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout> {/* Use the ClientLayout here */}
      </body>
    </html>
  );
}
