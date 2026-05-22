import { useEffect, useState, Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// Lazy loading dei componenti pesanti o che usano API del browser
const ParticlesBackground = lazy(() => import("@/components/ui/ParticlesBackground"));
const GlobalAudioPlayer = lazy(() => import("@/components/audio/GlobalAudioPlayer"));
const FloatingPlayer = lazy(() => import("@/components/audio/FloatingPlayer"));

export default function ClientLayout() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Registrazione Service Worker per PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  }, []);

  return (
    <>
      {/* Schermo CRT Overlay per un feeling vintage e cibernetico */}
      <div className="crt-overlay" aria-hidden="true" />
      
      <Suspense fallback={null}>
        {mounted && (
          <>
            <ParticlesBackground />
            <GlobalAudioPlayer />
            <FloatingPlayer />
          </>
        )}
      </Suspense>

      <Navbar />

      <main className="min-h-screen relative z-10 pt-24 md:pt-28">
        <Outlet />
      </main>
    </>
  );
}
