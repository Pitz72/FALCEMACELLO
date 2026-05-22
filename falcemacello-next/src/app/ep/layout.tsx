import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Hopeful Children of Mr. Brandt (EP)",
  description: "Ascolta l'ultimo EP di FALCE e MACELLO. Un viaggio musicale tra rivoluzione digitale e eredità politica.",
  openGraph: {
    images: [
      {
        url: "/images/the-hopeful-children-ep-cover.png",
        width: 1024,
        height: 1536,
        alt: "The Hopeful Children of Mr. Brandt EP Cover",
      },
    ],
  },
};

export default function EPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
