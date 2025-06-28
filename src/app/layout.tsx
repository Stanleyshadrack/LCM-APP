import { Inter, Roboto_Mono } from "next/font/google";
import "@/styles/globals.css";
import ClientProvider from "./context/ClientProvider";
import { AuthProvider } from "./context/AuthContext";
import ClientLayoutWrapper from "./context/ClientLayoutWrapper"; // ✅ use this

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata = {
  title: "lcm application",
  icons: { icon: "/lcmicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <AuthProvider>
          <ClientProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
