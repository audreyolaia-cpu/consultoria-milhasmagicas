import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cocoGothic = localFont({
  src: [
    { path: "../../public/fonts/coco-gothic.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/coco-gothic-bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-mm-sans",
  display: "swap",
});

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
      <body className={`${cocoGothic.variable} ${blushingRose.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
