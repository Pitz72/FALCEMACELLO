# FALCE e MACELLO - Sito Web Ufficiale

## Panoramica del Progetto

**FALCE e MACELLO** è una realtà musicale basata su Intelligenza Artificiale che si ispira alle idee e ideologie degli anni 80 e 90, combinando sonorità tipiche della musica politica del periodo con suoni più moderni e aggressivi compatibili con l'ascolto contemporaneo.

### Generi Musicali di Riferimento
- Canzone cantautorale italiana
- Rap politico
- Reggamuffin
- Ska
- Punk
- Rock
- Dubstep e Trap aggressive

## Concetto Ideologico

Falce e Macello è un duo di artisti e amici che si esprimono tramite le musiche generate con AI. Il loro lavoro non è di fare semplici generazioni ma di lavorare con cura e struttura alle loro produzioni, con testi originali e di valore politico. 

La loro estrazione è quella ereditata dal vecchio Partito Comunista Italiano e loro, nelle canzoni, vogliono sostenere l'intramontato valore politico, ideale ed ideologico di un certo tipo di sinistra italiana, quella concreta, aderente, con le radici ben piantate nel proprio passato e che esprime la propria eredità in una visione contemporanea.

Falce e Macello vogliono ribadire con forza il fatto che certe idee, un certo modo di pensare, non è e non può essere passato di moda, ma è stato semplicemente spazzato via dalla discussione civile per colpa di una propaganda attiva e scientifica in favore della cancellazione del dissenso e del senso critico reale, oramai estinto.

## 📚 Documentazione

Tutta la documentazione del progetto è centralizzata nella cartella `docs/`. 

👉 **[CONSULTA L'INDICE DELLA DOCUMENTAZIONE](./docs/INDEX.md)**

---

## Struttura del Progetto

⚠️ **VERSIONE ATTIVA**: La versione principale del sito è quella **Next.js v3.7.0** in `falcemacello-next/`

```
FALCEMACELLO/
├── docs/                  # 📚 HUB DOCUMENTAZIONE CENTRALIZZATO
│   ├── INDEX.md           # Indice Generale (Punto di ingresso)
│   ├── branding/          # Manifesto e Identità Visiva
│   ├── technical/         # Guide Sviluppo e Architettura (Next.js)
│   ├── logs/              # Log Versioni e Strategia di Rilascio
│   ├── anti-regression/   # Vincoli Immutabili e Checklist
│   └── archive/           # Archivio Storico (React v2, Legacy v1)
├── falcemacello-next/     # 🚀 VERSIONE ATTIVA - Next.js v3.7.0
├── falce-macello-react/   # 📦 Versione React v2.1.0 (Legacy)
├── legacy/                # 📦 Versione HTML statica (Backup)
├── import/                # Asset originali
└── README.md              # Questo file
```

### Versioni Disponibili

1. **Next.js v3.7.0 (Attiva)**: Progressive Web App installabile con audio persistente, stato globale (Zustand) e particelle moderne. Supporta export statico e SEO avanzato. Corretti 404 e percorsi icone PWA.
2. **React v2.1.0 (Legacy)**: Versione precedente in React + Vite + Chakra UI.
3. **HTML Statico (Legacy)**: Prima versione del sito, mantenuta come backup.

## Installazione e Sviluppo (v3.6.0)

Per lavorare sulla versione attiva:

1.  Entrare nella directory del progetto:
    ```bash
    cd falcemacello-next
    ```

2.  Installare le dipendenze:
    ```bash
    npm install
    ```

3.  Avviare il server di sviluppo:
    ```bash
    npm run dev
    ```

4.  Aprire [http://localhost:3000](http://localhost:3000) nel browser.

## Deployment (Distribuzione)

Il progetto è configurato per l'**esportazione statica**.

1.  Eseguire la build:
    ```bash
    npm run build
    ```

2.  Il sito compilato verrà generato nella cartella **`out/`**.

3.  Caricare tutto il contenuto della cartella `out/` sul proprio hosting (FTP, GitHub Pages, Netlify, Vercel, ecc.).

## Design System "Cyber-Soviet"

Il nuovo design (v3.0.0) si basa su:
- **Colori**: Rosso Comunista (`#cc0000`), Oro (`#ffd700`), Nero Profondo (`#0a0a0a`).
- **Tipografia**: *Orbitron* (Titoli, futuristico/sovietico), *Inter* (Leggibilità).
- **Elementi**: Parallax, Glitch, Glassmorphism, Waveforms.

## Caratteristiche Tecniche

### Design e UX
- **PWA (Progressive Web App)**: Sito installabile su Android, iOS e Desktop con esperienza full-screen.
- **Audio Persistente**: Navigazione senza interruzioni musicali tra le pagine (Zustand).
- **Supporto Offline**: Canzoni e asset salvati in cache per l'ascolto senza rete via Service Worker.
- **Estetica di rottura**: Floating logo, analog grain overlay e particelle dinamiche.
- **Responsive design**: Ottimizzato per tutti i dispositivi.
- **Accessibilità**: Controlli audio e navigazione conformi agli standard A11y.

### Tecnologie Utilizzate
- **Next.js 16**: Framework React d'avanguardia con App Router.
- **Tailwind CSS 4**: Styling ultra-veloce e moderno.
- **Zustand**: Gestione dello stato globale per la continuità audio.
- **tsparticles**: Sistema di particelle interattivo e performante.
- **WaveSurfer.js**: Player audio con visualizzazione dinamica d'onda.
- **Framer Motion**: Animazioni avanzate e staggered reveal.

### Palette Colori
```css
:root {
    --primary-red: #cc0000;      /* Rosso comunista */
    --accent-gold: #ffd700;      /* Oro */
    --dark-bg: #0a0a0a;          /* Nero profondo */
    --light-text: #f5f5f5;       /* Bianco sporco */
    --gray-medium: #333333;      /* Grigio medio */
    --gray-light: #666666;       /* Grigio chiaro */
}
```

## Sezioni del Sito

### 1. Hero Section
- Logo animato con effetti glitch
- Titolo con effetto typewriter
- Background parallax con pattern
- Call-to-action prominente

### 2. Manifesto
- Presentazione dell'ideologia del gruppo
- Testo formattato con animazioni reveal
- Design tipografico impattante

### 3. Musica
- Showcase dei generi musicali
- Cards animate con hover effects
- Icone rappresentative per ogni genere

### 4. EP "THE HOPEFUL CHILDREN OF MR. BRANDT"
- Copertina dell'EP con animazione vinile
- Player audio integrato con WaveSurfer
- Effetti visivi sincronizzati

### 5. Contatti
- Form di contatto funzionale
- Validazione JavaScript
- Sistema di notifiche
- Link social media

## Funzionalità JavaScript

### Core Features
- **Navigation System**: Menu mobile, smooth scrolling, active highlighting
- **Scroll Animations**: Intersection Observer per animazioni triggered
- **Form Handling**: Validazione e invio con feedback utente
- **Glitch Effects**: Effetti casuali per estetica cyberpunk
- **Audio Player**: Gestione riproduzione, timeline e volume tramite WaveSurfer

### Performance Features
- **Lazy Loading**: Caricamento immagini ottimizzato
- **Debounced Scroll**: Ottimizzazione performance scroll
- **Error Handling**: Gestione errori JavaScript
- **Service Worker**: Caching e funzionalità offline

## Ottimizzazioni Web

### Performance
- Minificazione CSS e JavaScript
- Compressione immagini
- Lazy loading per media
- Critical CSS inline

### SEO
- Meta tags ottimizzati
- Structured data per rich snippets
- Sitemap XML
- Open Graph e Twitter Cards

### Accessibilità
- Contrasto colori WCAG AA compliant
- Navigazione keyboard
- Screen reader support
- Focus indicators visibili

## Asset Grafici

### Logo e Branding
- **Logo principale**: `Logo Falce e Macello - Geometrico Puro.png`
- **Favicon**: `Icona Profilo Social.png`
- **Concept grafico**: `Elementi Grafici Sito Web.png`

### EP "THE HOPEFUL CHILDREN OF MR. BRANDT"
- Copertina EP
- Artwork per diversi formati (CD, Vinile, Cassetta, Streaming)
- Banner digitale promozionale

## Tracklist EP

1. **"La voglia di (mastered)"** - 3:45
2. **"La Ninnananna della Cenere e del Silenzio"** - 4:12
3. **"La Più Bella Canzone"** - 3:58

## Deployment e Manutenzione

### Requisiti Server
- Server web moderno (Apache/Nginx)
- Supporto HTTPS
- Compressione Gzip/Brotli
- Cache headers ottimizzati

### Aggiornamenti Futuri
- [ ] Integrazione player audio reale
- [ ] Sistema CMS per gestione contenuti
- [ ] E-commerce per merchandise
- [ ] Blog/News section
- [ ] Galleria foto/video
- [ ] Sistema newsletter

### Monitoraggio
- Google Analytics 4
- Core Web Vitals monitoring
- Error tracking (Sentry)
- Performance monitoring

## Istruzioni per Sviluppatori

### Setup Locale
1. Clonare il repository
2. Aprire `index.html` in un server locale
3. Per sviluppo avanzato, utilizzare un bundler (Webpack/Vite)

### Modifiche CSS
- Utilizzare le custom properties per colori
- Mantenere la struttura BEM per classi
- Testare su diversi dispositivi

### Modifiche JavaScript
- Seguire ES6+ standards
- Mantenere funzioni modulari
- Testare performance su dispositivi lenti

### Aggiunta Contenuti
- Ottimizzare immagini prima dell'upload
- Utilizzare formati moderni (WebP, AVIF)
- Mantenere alt text descrittivi

## Contatti Tecnici

Per supporto tecnico o modifiche al sito, contattare il team di sviluppo attraverso i canali ufficiali del progetto.

---

**FALCE e MACELLO** - Musica AI • Ideologia Politica • Eredità del PCI

*"Certe idee non passano mai di moda, vengono solo temporaneamente silenziate."*