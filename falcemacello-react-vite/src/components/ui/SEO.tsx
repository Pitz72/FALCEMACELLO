import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title, 
  description = "Duo musicale AI ispirato all'eredità del PCI e alle sonorità anni 80/90. Estetica di rottura, testi politici, musica elettronica.",
  image = "/images/cyber-soviet-banner.png",
  url = "https://falcemacello.it"
}: SEOProps) {
  const fullTitle = title ? `${title} | FALCE e MACELLO` : "FALCE e MACELLO | Musica AI & Ideologia";

  return (
    <Helmet>
      <html lang="it" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="FALCE e MACELLO, Musica AI, PCI, Comunismo, Musica Politica, Elettronica, Cyberpunk" />
      
      {/* PWA Tags */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="FALCE e MACELLO" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
