import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Body font (better numbers)
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-mm-sans",
});

// Display font (brand)
const blushingRose = localFont({
  src: [{ path: "../../public/fonts/blushing-rose.ttf", weight: "400", style: "normal" }],
  variable: "--font-mm-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Milhas Mágicas • Consultoria",
  description: "Consultoria de emissão e estratégia de milhas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${blushingRose.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
