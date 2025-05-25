import { ReactNode } from "react";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import { Providers } from "@components/Providers";
import { NavBar } from "@components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-body",
});

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="de" className={`${playfair.variable} ${inter.variable} h-full`}>
    <body className="font-body text-gray-800 flex flex-col h-full">
      <NavBar />
      <Providers>
        <main className="flex-1 flex flex-col overflow-auto">{children}</main>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
