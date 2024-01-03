import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "./NavBar/NavBar";
import Footer from "./Footer";
import SessionProvider  from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AviMart",
  description: "Get everything you have ever dreamed of.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="{inter.className} bg-base-300">
        <SessionProvider>
        <NavBar/>
        <main className="p-6 max-w-7xl m-auto min-w-[300px] min-h-screen">{children}</main>
        <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}
