import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./clientLayout"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata = {
  title: "lcm application",
  icons: {
    icon: "/lcmicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
