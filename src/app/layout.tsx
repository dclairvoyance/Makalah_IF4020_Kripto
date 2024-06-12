import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donanonim",
  description: "Donasi secara anonim!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <link rel="icon" href="icon.ico" sizes="any" />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
