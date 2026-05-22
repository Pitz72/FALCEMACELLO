import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://falcemacello.it"),
  title: {
    default: "FALCE e MACELLO | Musica AI & Ideologia",
    template: "%s | FALCE e MACELLO",
  },
  description: "Duo musicale AI ispirato all'eredità del PCI e alle sonorità anni 80/90. Estetica di rottura, testi politici, musica elettronica.",
  keywords: ["FALCE e MACELLO", "Musica AI", "PCI", "Comunismo", "Musica Politica", "Elettronica", "Cyberpunk"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FALCE e MACELLO",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://falcemacello.it",
    siteName: "FALCE e MACELLO",
    title: "FALCE e MACELLO | Musica AI & Ideologia",
    description: "Duo musicale AI ispirato all'eredità del PCI e alle sonorità anni 80/90.",
    images: [
      {
        url: "/images/cyber-soviet-banner.png",
        width: 1200,
        height: 630,
        alt: "FALCE e MACELLO - Banner Ufficiale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FALCE e MACELLO | Musica AI & Ideologia",
    description: "Duo musicale AI ispirato all'eredità del PCI e alle sonorità anni 80/90.",
    images: ["/images/cyber-soviet-banner.png"],
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${orbitron.variable} ${inter.variable}`}>
      <body className="antialiased bg-brand-dark text-brand-light selection:bg-brand-red selection:text-white relative min-h-screen">
        <ClientLayout>
          <div className="relative z-[1]">
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
