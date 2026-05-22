import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Il Manifesto",
  description: "La visione, i valori e l'ideologia di FALCE e MACELLO. Un'analisi critica della società moderna attraverso la musica AI.",
  openGraph: {
    images: [
      {
        url: "/images/cyber-soviet-banner.png",
        width: 1536,
        height: 1024,
        alt: "FALCE e MACELLO Manifesto Banner",
      },
    ],
  },
};

export default function ManifestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
