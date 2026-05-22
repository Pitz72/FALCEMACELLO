# Roadmap Migrazione: da Next.js a React (Vite)

## Obiettivo
Ricostruire il progetto `falcemacello-next` in puro React (tramite Vite) mantenendo in modo **ESATTO e MINUZIOSO** tutto il convenuto, lo stile, il layout, le animazioni e gli effetti (Design System "Cyber-Soviet", PWA, Audio Persistente).

## Fattibilità
**100% Fattibile.** Il progetto Next.js attuale (`output: 'export'`) è di fatto una Single Page Application (SPA) statica. Non utilizza Server Components o API Routes complesse. Le librerie core (Framer Motion, Zustand, tsParticles, Tailwind CSS v4, WaveSurfer.js) sono agnostiche e funzionano perfettamente in React puro. Le dipendenze specifiche di Next.js (`next/link`, `next/image`, `next/font`) sono minime e facilmente rimpiazzabili.

---

## Piano di Implementazione Dettagliato

### FASE 1: Inizializzazione e Architettura Base ✅

1. **Scaffolding del Progetto:** ✅
   - Eseguire: `npm create vite@latest falcemacello-react-vite -- --template react-ts` nella root del progetto (`FALCEMACELLO/`).
   - Copiare il file `.gitignore` standard per Node/React.

2. **Installazione Dipendenze (1:1 con Next.js):** ✅
   - Core UI & Animazioni: `npm install framer-motion @tsparticles/react @tsparticles/slim clsx tailwind-merge lucide-react`
   - Audio & Stato: `npm install wavesurfer.js zustand`
   - Routing & SEO: `npm install react-router-dom react-helmet-async`
   - Setup Tailwind CSS v4: `npm install -D tailwindcss @tailwindcss/vite`

3. **Configurazione Tailwind v4:** ✅
   - Aggiornare `vite.config.ts` per includere il plugin `@tailwindcss/vite`.
   - Copiare fedelmente le direttive e le variabili CSS (Colori "Cyber-Soviet": `#cc0000`, `#ffd700`, `#0a0a0a`) da `falcemacello-next/src/app/globals.css` al nuovo `src/index.css`.

4. **Gestione Tipografia NATIVA:** ✅
   - Rimuovere l'uso di `next/font/google`.
   - Modificare `index.html` per importare nativamente `Orbitron` e `Inter` da Google Fonts, garantendo l'esatta resa tipografica e configurando le variabili CSS (`--font-orbitron`, `--font-inter`) in `index.css`.

---

### FASE 2: Trasposizione Logica Globale, Stato e PWA ✅

1. **Stato Globale dell'Audio (Zustand):** ✅
   - Copiare la cartella `src/lib/` (contenente `audioStore.ts`) in `falcemacello-react-vite/src/lib/`.
   - Questa logica è immutabile. Garantirà che l'audio continui a suonare senza interruzioni tra un componente e l'altro durante il routing client-side.

2. **Gestione PWA e Asset Statici:** ✅
   - Copiare l'intero contenuto della cartella `falcemacello-next/public/` (inclusi `robots.txt`, `sitemap.xml`, cartelle `audio/`, `images/`, `icons/`, e i file chiave del PWA `manifest.json` e `sw.js`) nella cartella `public/` del nuovo progetto Vite.
   - Assicurarsi che la registrazione del Service Worker (presente nei file core o nel layout) venga trasposta correttamente in `main.tsx` o `App.tsx`.

3. **Layout e Idratazione:** ✅
   - Adattare `falcemacello-next/src/components/layout/ClientLayout.tsx`.
   - In React Router, questo componente diventerà il Layout Globale genitore (`<Route element={<ClientLayout />}>`) che avvolge tutte le pagine, mantenendo attivi `ParticlesBackground`, il menu di navigazione mobile e il `GlobalAudioPlayer`.

---

### FASE 3: Migrazione Componenti e Sostituzione API Next.js (Intervento Chirurgico) ✅

1. **Routing (`next/link` ➔ `react-router-dom`):** ✅
   - Sostituire ogni istanza di `import Link from "next/link"` con `import { Link } from "react-router-dom"`.
   - Configurare le rotte in `App.tsx` mappando le pagine attuali: `/` (Home), `/manifesto`, `/ep`.

2. **Ottimizzazione Immagini (`next/image` ➔ `<img>` standard):** ✅
   - In Next.js, `next/image` è usato in `Hero.tsx` e `ep/page.tsx`.
   - Sostituire il componente `<Image src="..." width={x} height={y} alt="..." />` con il tag HTML standard `<img src="..." alt="..." className="..." loading="lazy" width={x} height={y} />`. Senza SSR, Vite gestisce gli asset statici con estrema efficienza.

3. **SEO, Open Graph e Metadata (`next` Metadata ➔ `react-helmet-async`):** ✅
   - Traslare l'oggetto `metadata` presente in `layout.tsx` di Next.js in un componente React dedicato `<SEO />` che utilizza `Helmet`.
   - Inserire `<SEO />` all'interno di ogni pagina (Home, Manifesto, EP) per ripristinare dinamicamente il titolo del documento, le description, le Twitter Cards e i tag Open Graph.

4. **Trasposizione Diretta (Copia-Incolla 1:1):** ✅
   - L'intera cartella `src/components/sections/` (`Hero.tsx`, `About.tsx`, `Manifesto.tsx`, `Contact.tsx`) verrà copiata identica.
   - La cartella `src/components/ui/` (`NewsTicker.tsx`, `GlobalAudioPlayer.tsx`, animazioni) verrà copiata identica.
   - Le classi Tailwind e le animazioni Framer Motion non richiedono alcuna modifica e funzioneranno perfettamente al primo render.

---


### FASE 4: Build, Testing e Sicurezza Anti-Regressione

1. **Test Effetti Visivi:**
   - Verificare rigorosamente che il background (`@tsparticles/react`) e l'effetto glitch (nella Hero e nel floating logo) renderizzino esattamente come nella versione Next.js.
   - Testare le animazioni di *staggered reveal* nel Manifesto.

2. **Test Audio Persistente:**
   - Avviare la riproduzione di un brano dal Player o dalla pagina EP e navigare tra la Home, il Manifesto e l'EP. L'audio **non deve mai interrompersi**.

3. **Verifica PWA (Service Worker):**
   - Controllare la console di Chrome DevTools (Application > Service Workers) per assicurarsi che `sw.js` registri correttamente la cache offline per file audio e asset (Stale-While-Revalidate).
   - Testare l'installabilità (manifest.json).

4. **Controllo con Documento Anti-Regressione (`ANTI-REGRESSION-v3.0.md`):**
   - Eseguire la checklist finale definita nella documentazione del brand:
     - Rispetto rigoroso dei colori (`#cc0000`, `#ffd700`, `#0a0a0a`).
     - Audio non interrotto.
     - Design "Cyber-Soviet" mantenuto fedelmente.
     - PWA funzionante.

5. **Build di Produzione:**
   - Configurare `vite.config.ts` se necessario.
   - Eseguire `npm run build` per generare la cartella `dist/` pronta per il deployment statico, equivalente alla cartella `out/` di Next.js.