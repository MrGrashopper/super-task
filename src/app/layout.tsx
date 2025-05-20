import { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Playfair_Display, Inter } from "next/font/google";

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
  <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
    <body className="font-body bg-white text-gray-800">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
