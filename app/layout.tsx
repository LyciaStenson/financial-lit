import type { Metadata } from "next";

import { Montserrat } from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "My Money Confidence",
  description: "Financial Literacy",
  icons: {
    icon: './favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
