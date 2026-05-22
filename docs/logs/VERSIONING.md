# Gestione Versioni - FALCE e MACELLO

## Panoramica

Il progetto FALCE e MACELLO ha attraversato un'importante evoluzione architetturale, culminata con il passaggio a React 19 / Vite 6 e l'aggiunta di effetti sonori e equalizzatori grafici real-time:

1.  **Versione React v3.9.1** (Attiva - "Cyber-Soviet Premium") in `falcemacello-react-vite/`
2.  **Versione Next.js v3.7.0** (Archiviata/Legacy) in `falcemacello-next/`
3.  **Versione React v2.1.0** (Legacy - Manutenzione) in `falce-macello-react/`
4.  **Versione HTML Statica** (Legacy - Backup) in `legacy/`

---

## Decisioni Architetturali

### Maggio 2026 - Cyber-Soviet Premium v3.9.1 (React 19 + Vite 6)

**Obiettivo:**
Superare le limitazioni di idratazione lato server di Next.js in un contesto di Progressive Web App (PWA) e Single Page Application (SPA) pura con audio persistente, aggiungendo un livello di immersività grafica ed acustica sbalorditivo ("WOW") e risolvendo ogni problema di localizzazione della lingua nei browser.

**Soluzione Implementata:**
- Ricostruzione e migrazione totale da Next.js a **React 19 + Vite 6** (v3.8.0).
- Adozione di **Tailwind CSS v4** per uno styling ultra-veloce.
- Creazione del sintetizzatore di effetti sonori nativo (`soundEffects.ts`) offline via **Web Audio API**.
- Integrazione di uno spettro di frequenza canvas (`AudioVisualizer.tsx`) in tempo reale collegato all'analizzatore di Zustand.
- Filtro analogico scanline CRT globale (`.crt-overlay`) ed effetti 3D di inclinazione con **Framer Motion**.
- Aggiornamento dell'etichetta contatti in "NOME DEL COMPAGNO / COMPAGNA" per la parità di genere.
- Forzatura e allineamento della lingua in **Italiano (`lang="it"`)** sia in `index.html` sia in `SEO.tsx` tramite Helmet per prevenire traduzioni automatiche errate nei browser.

---

## Versioni Dettagliate

### React v3.9.1 - VERSIONE ATTIVA (Premium Sound & Visuals & Localized) ✅

**Data:** 22 Maggio 2026  
**Percorso:** `falcemacello-react-vite/`  

**Tecnologie:**
- React 19 + Vite 6
- TypeScript
- Tailwind CSS v4
- Zustand (Stato Globale Audio & Analizzatore)
- Web Audio API (Sintetizzatore retro)
- HTML5 Canvas (Equalizzatore grafico)
- Wavesurfer.js
- Framer Motion (Inclinazione 3D e vinile rotante)
- PWA (Service Worker per ascolto offline)

**Stato Funzionalità:**
- ✅ Design "Cyber-Soviet" Premium con CRT Scanlines
- ✅ Effetti sonori fisici e meccanici attivi/disattivabili
- ✅ Equalizzatore canvas fluttuante animato a tempo di musica
- ✅ Waveform interattiva perfettamente sincronizzata nella pagina EP
- ✅ Pagina Manifesto in griglia asimmetrica costruttivista
- ✅ Terminale di sicurezza con logs cifrati nel form di contatto
- ✅ Modulo contatti neutrale rispetto al genere (Compagno / Compagna)
- ✅ Localizzazione nativa browser forzata in Italiano (`lang="it"`)

---

## Confronto Funzionalità

| Funzionalità | React v3.9.1 (Attivo) | Next.js v3.7.0 (Legacy) | React v2.1.0 (Legacy) |
|--------------|-----------------------|-------------------------|-----------------------|
| **Framework** | React 19 + Vite 6 | Next.js 14 | React 18 + Vite |
| **Rendering** | Client-Side SPA (Pura) | SSR / SSG | Client-Side |
| **Styling** | Tailwind CSS v4 | Tailwind CSS v3 | Chakra UI |
| **Audio Player** | Waveform + Canvas Spectrum | Waveform standard | Standard HTML5 |
| **Effetti FX** | Web Audio API Retro | Nessuno | Nessuno |
| **Overlay CRT** | Sì (Fosfori Analogici) | No | No |
| **Localizzazione**| Nativamente in Italiano | Parziale (Browser default) | Parziale (Browser default) |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## Workflow di Sviluppo

### Sviluppo e Integrazione
1. Sviluppare in `falcemacello-react-vite/`
2. Avviare localmente tramite `npm run dev` (avviato manualmente dall'utente)
3. Modificare componenti in `src/components/` e registrare le versioni in `docs/logs/history/`