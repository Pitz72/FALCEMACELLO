"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(
  () => import("@/components/ui/ParticlesBackground"),
  { ssr: false }
);

const GlobalAudioPlayer = dynamic(
  () => import("@/components/audio/GlobalAudioPlayer"),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Registrazione Service Worker per PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    }
  }, []);

  return (
    <>
      {mounted && (
        <>
          <ParticlesBackground />
          <GlobalAudioPlayer />
        </>
      )}
      {children}
    </>
  );
}
