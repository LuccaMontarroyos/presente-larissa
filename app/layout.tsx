import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"]})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Para o amor da minha vida",
  description: "Um presentinho especial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {/* Camadas de Fundo Global */}
        <div className="bg-gradient-fixed" />
        <div className="bg-noise" />
        
        {/* O conteúdo do site entra aqui por cima */}
        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
