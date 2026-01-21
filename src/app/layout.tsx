import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shoaib | Anti-Gravity E-Commerce",
  description: "Defy the ordinary. Experience technology that transcends boundaries. Welcome to the future of lifestyle.",
  keywords: ["e-commerce", "tech", "lifestyle", "accessories", "anti-gravity", "premium"],
  authors: [{ name: "Shoaib" }],
  openGraph: {
    title: "Shoaib | Anti-Gravity E-Commerce",
    description: "Defy the ordinary. Experience technology that transcends boundaries.",
    url: "https://shoaib.tech",
    siteName: "Shoaib",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shoaib | Anti-Gravity E-Commerce",
    description: "Defy the ordinary. Experience technology that transcends boundaries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark lenis lenis-smooth">
      <body
        className={`${inter.variable} antialiased noise-overlay bg-[#0a0a0f] text-gray-100`}
      >
        <SmoothScrollProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen bg-[#0a0a0f]">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
