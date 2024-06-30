import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "KREAM Scrapbook",
  description:
    "Discover trending products and track their popularity and sales over time with KREAM Scrapbook.",
};

const nanum = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={nanum.className}>
      <body>{children}</body>
    </html>
  );
}
