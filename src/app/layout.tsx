import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AV Broker Trainer - Simulatore di Training per Broker Assicurativi",
  description:
    "Pratica le tue abilità di vendita con clienti virtuali dotati di personalità uniche. Impara a riconoscere i tratti psicologici e adatta il tuo approccio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
