import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jennifer Slade — Luxury Real Estate, Austin",
  description:
    "A quiet-luxury authority for high-end residential real estate in Westlake, Tarrytown, Lake Austin, Barton Creek, and Dripping Springs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#faf6f0] text-[#1a1716]">{children}</body>
    </html>
  );
}
