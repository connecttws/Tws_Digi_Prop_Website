import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATELIER ESTATES — Luxury Real Estate & Architectural Living",
  description:
    "Boutique luxury real estate and architectural advisory. Curated collection of exceptional contemporary residences, architectural villas, and private sanctuaries.",
  keywords: [
    "luxury real estate",
    "architectural living",
    "modernist villas",
    "quiet luxury homes",
    "architectural advisory",
    "contemporary residences",
  ],
  openGraph: {
    title: "ATELIER ESTATES — Luxury Real Estate & Architectural Living",
    description:
      "Boutique luxury real estate and architectural advisory. Curated collection of exceptional contemporary residences, architectural villas, and private sanctuaries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} scroll-smooth`}>
      <body className="bg-[#F7F5F0] text-[#242522] antialiased selection:bg-[#B79A69]/25 selection:text-[#242522] min-h-screen flex flex-col">
        <ModalProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
