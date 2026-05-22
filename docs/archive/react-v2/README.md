# FALCE e MACELLO - Sito Web Ufficiale v2.0

## 🎸 Panoramica del Progetto

Sito web ufficiale della band **FALCE e MACELLO**, versione 2.0 con **Hero Section completamente ridisegnata** per massimizzare l'impatto visivo e migliorare l'esperienza utente attraverso un design pulito e performante.

## 🚀 Stack Tecnologico

### Frontend Framework
- **React 18** - Libreria per interfacce utente moderne e reattive
- **TypeScript** - Tipizzazione statica per codice più robusto e manutenibile
- **Vite** - Build tool ultra-veloce con Hot Module Replacement

### Design System & UI
- **Chakra UI** - Sistema di design modulare e accessibile
- **Framer Motion** - Libreria per animazioni fluide e coinvolgenti
- **Custom Theme** - Tema personalizzato con palette colori brand

### Caratteristiche Tecniche
- **Responsive Design** - Ottimizzato per desktop, tablet e mobile
- **Dark Mode Nativo** - Tema scuro professionale
- **Performance Ottimizzate** - Lazy loading e animazioni GPU-accelerated
- **Accessibilità WCAG** - Componenti conformi agli standard di accessibilità
- **SEO Friendly** - Meta tags ottimizzati per motori di ricerca

## 📁 Struttura del Progetto

```
falce-macello-react/
├── public/
│   ├── images/          # Asset grafici e loghi
│   └── index.html       # Template HTML principale
├── src/
│   ├── components/      # Componenti React riutilizzabili
│   │   ├── Header.tsx   # Navigazione principale
│   │   ├── Hero.tsx     # Sezione hero con logo fisso centrato (v2.0)
│   │   ├── About.tsx    # Informazioni sulla band
│   │   ├── Music.tsx    # Discografia e streaming
│   │   ├── Contact.tsx  # Form contatti e social
│   │   ├── Footer.tsx   # Footer con link e info
│   │   └── index.ts     # Export centralizzati
│   ├── App.tsx          # Componente principale
│   └── main.tsx         # Entry point dell'applicazione
├── docs/                # Documentazione del progetto
└── package.json         # Dipendenze e script
```

## 🎨 Design System

### Palette Colori
- **Brand Primary**: #e60000 (Rosso FALCE e MACELLO)
- **Dark Theme**: Gradazioni di grigio scuro (#222222 - #3b3b3b)
- **Accenti**: Variazioni del rosso brand per hover e focus

### Tipografia
- **Heading**: Orbitron (Font futuristico per titoli)
- **Body**: Inter (Font leggibile per testi)

### Animazioni
- **Scroll Animations**: Elementi che appaiono durante lo scroll
- **Hover Effects**: Micro-interazioni sui componenti interattivi
- **Logo Rotation**: Logo principale con rotazione continua
- **Stagger Animations**: Animazioni sequenziali per liste di elementi

## 🛠️ Sviluppo

### Prerequisiti
- Node.js 18+
- npm o yarn

### Installazione
```bash
cd falce-macello-react
npm install
```

### Avvio Sviluppo
```bash
npm run dev
```
Il sito sarà disponibile su `http://localhost:3000`

### Build Produzione
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📱 Sezioni del Sito

### Header
- Logo animato della band
- Navigazione responsive
- Effetti hover eleganti

### Hero
- Logo principale rotante
- Titolo con gradiente animato
- Call-to-action per la musica
- Effetti di sfondo dinamici

### About
- Storia della band
- Filosofia musicale
- Missione artistica
- Cards animate con hover effects

### Music
- Discografia completa
- Cover degli album interattive
- Link a piattaforme streaming
- Descrizioni dettagliate degli EP

### Contact
- Form di contatto funzionale
- Link ai social media
- Informazioni per booking
- Animazioni sui campi input

### Footer
- Link social centralizzati
- Informazioni copyright
- Contatti email
- Credits tecnici

## 🔧 Configurazione

### Vite Config
- Plugin React configurato
- Server di sviluppo su porta 3000
- Auto-apertura browser

### TypeScript Config
- Strict mode abilitato
- Path mapping configurato
- Supporto JSX

### Chakra UI Theme
- Modalità scura di default
- Colori brand personalizzati
- Font personalizzati
- Stili globali

## 🚀 Performance

- **Bundle Size Ottimizzato**: Tree shaking automatico
- **Lazy Loading**: Componenti caricati on-demand
- **Image Optimization**: Formati ottimizzati (SVG, WebP)
- **CSS-in-JS**: Stili ottimizzati e purged
- **Hot Reload**: Sviluppo ultra-veloce

## 📈 SEO & Analytics

- Meta tags ottimizzati
- Open Graph tags per social sharing
- Structured data per motori di ricerca
- Sitemap automatica
- Performance monitoring ready

## 🔒 Sicurezza

- Dipendenze aggiornate
- Nessun secret esposto
- Sanitizzazione input form
- HTTPS ready

## 📞 Supporto

Per supporto tecnico o domande sul progetto:
- **Email**: dev@falcemacello.com
- **Issues**: GitHub Issues
- **Documentazione**: `/docs` folder

---

**FALCE e MACELLO** - Powered by React, TypeScript & Chakra UI 🎸🔥