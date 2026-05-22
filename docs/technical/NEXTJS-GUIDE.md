# Guida Tecnica Next.js (v3.7.0) - FALCE e MACELLO

## 🚀 Panoramica
Questa guida descrive l'architettura e le procedure tecniche per la versione corrente del sito web FALCE e MACELLO, basata su Next.js 16.

## 🛠️ Stack Tecnologico
- **Framework**: Next.js 16 (App Router)
- **Linguaggio**: TypeScript
- **Styling**: Tailwind CSS 4
- **Stato Globale**: Zustand
- **Animazioni**: Framer Motion, tsparticles
- **PWA**: Service Worker nativo (Stale-While-Revalidate + Cache-First Audio)
- **Deployment**: Static Export (SSG) con trailingSlash: true

## 📁 Struttura del Progetto
La versione attiva si trova in `falcemacello-next/`.

```text
falcemacello-next/
├── src/
│   ├── app/            # Routes, layout e configurazioni SEO
│   ├── components/
│   │   ├── layout/     # ClientLayout.tsx (Wrapper per idratazione)
│   │   ├── audio/      # GlobalAudioPlayer
│   │   └── ui/         # ParticlesBackground e componenti visuali
│   ├── hooks/          # Custom React hooks
│   └── lib/            # audioStore.ts (Zustand) e utility
├── public/             # Asset, icone PWA, sw.js e manifest.json
├── out/                # Output della build statica (Deployment)
├── next.config.ts      # Configurazione Next.js (output: export)
└── package.json        # Versione 3.7.0 e dipendenze
```

## 💻 Sviluppo Locale

1.  **Navigazione**:
    ```bash
    cd falcemacello-next
    ```

2.  **Installazione**:
    ```bash
    npm install
    ```

3.  **Avvio Dev Server**:
    ```bash
    npm run dev
    ```

## 🏗️ Build e Deployment
Il progetto è configurato per l'**esportazione statica**.

1.  **Build**:
    ```bash
    npm run build
    ```
    Questo comando genera la cartella `out/`.

2.  **Deployment**:
    Caricare il contenuto della cartella `out/` sul server di destinazione.

## 🎨 Design System "Cyber-Soviet"
- **Colori**:
  - Rosso: `#b9363b`
  - Blu Scuro: `#101721`
  - Bianco/Azzurro: `#f7fbfe`
- **Font**: Orbitron (Titoli), Inter (Testo)

## 🔧 Funzionalità Implementate
- **PWA**: Installabile su mobile/desktop con supporto offline per i file audio.
- **Audio Persistente**: Player globale gestito con Zustand (la musica non si ferma navigando).
- **Hero Section**: Effetto glitch, background parallax, logo floating e analog grain.
- **Particelle Moderne**: Sistema dinamico basato su tsparticles nel background.
- **Manifesto Immersivo**: Comparsa progressiva (staggered) dei contenuti.
- **SEO & Social**: Anteprime personalizzate (Open Graph) per ogni rotta.
- **Accessibilità**: Controlli audio e navigazione conformi agli standard A11y.

## 📝 Note per gli Sviluppatori
- Utilizzare Tailwind CSS per lo styling.
- Tutte le nuove pagine devono supportare l'export statico.
- Mantenere la coerenza con il Design System definito in `docs/branding/BRAND_ANALYSIS.md`.
