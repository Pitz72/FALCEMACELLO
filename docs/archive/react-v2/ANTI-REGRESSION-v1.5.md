# ANTI-REGRESSION DOCUMENT - FALCE e MACELLO v1.5

## 🔒 Stato Immutabile del Sito - Versione 1.5.0

**Data di Riferimento**: 20 Agosto 2025  
**Versione**: 1.5.0  
**Status**: PRODUCTION READY - STATO IMMUTABILE  
**Autorizzazione Richiesta**: ✅ OBBLIGATORIA per qualsiasi modifica

---

## ⚠️ AVVISO IMPORTANTE

**QUESTO DOCUMENTO DEFINISCE LO STATO ATTUALE DEL SITO COME IMMUTABILE**

Qualsiasi modifica ai componenti, funzionalità, design o comportamenti descritti in questo documento **DEVE** essere preventivamente autorizzata dall'autore del progetto.

**Contatto per Autorizzazioni**: dev@falcemacello.com

---

## 🎯 Condizioni Immutabili - Core Functionality

### 1. Stack Tecnologico PROTETTO

#### Framework e Librerie IMMUTABILI
- **React**: v18.x.x (MINIMO)
- **TypeScript**: v5.x.x (MINIMO)
- **Vite**: v5.x.x (MINIMO)
- **Chakra UI**: v2.x.x (ESATTO)
- **Framer Motion**: v11.x.x (MINIMO)

**⚠️ DIVIETO ASSOLUTO**:
- Downgrade di React sotto v18
- Rimozione di TypeScript
- Sostituzione di Chakra UI con altre librerie
- Rimozione di Framer Motion
- Migrazione a framework diversi (Vue, Angular, etc.)

### 2. Architettura Componenti PROTETTA

#### Struttura File IMMUTABILE
```
src/
├── components/
│   ├── Header.tsx      [PROTETTO]
│   ├── Hero.tsx        [PROTETTO]
│   ├── About.tsx       [PROTETTO]
│   ├── Music.tsx       [PROTETTO]
│   ├── Contact.tsx     [PROTETTO]
│   ├── Footer.tsx      [PROTETTO]
│   └── index.ts        [PROTETTO]
├── App.tsx             [PROTETTO]
└── main.tsx            [PROTETTO]
```

**⚠️ DIVIETO ASSOLUTO**:
- Eliminazione di qualsiasi componente esistente
- Modifica della struttura di export in `index.ts`
- Spostamento di componenti fuori dalla cartella `components`
- Rinominazione dei file componenti principali

---

## 🎨 Design System IMMUTABILE

### 1. Palette Colori PROTETTA

#### Colori Brand IMMUTABILI
```css
/* COLORI CHE NON POSSONO ESSERE MODIFICATI */
--brand-primary: #e60000;     /* Rosso FALCE e MACELLO */
--brand-dark: #222222;        /* Background principale */
--brand-darker: #1a1a1a;      /* Background secondario */
--brand-accent: #3b3b3b;      /* Elementi UI */
```

**⚠️ DIVIETO ASSOLUTO**:
- Modifica del rosso brand (#e60000)
- Cambio del tema da dark a light come default
- Alterazione dei contrasti per accessibilità
- Rimozione del supporto dark mode

### 2. Tipografia PROTETTA

#### Font IMMUTABILI
- **Headings**: Orbitron (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif

**⚠️ DIVIETO ASSOLUTO**:
- Sostituzione di Orbitron per i titoli
- Sostituzione di Inter per il body text
- Rimozione del fallback system-ui

---

## ⚡ Animazioni e Interazioni IMMUTABILI

### 1. Logo Rotante PROTETTO

#### Comportamento IMMUTABILE
- Rotazione continua 360° in 20 secondi
- Effetto glow rosso (#e60000)
- Hover: pausa rotazione + scale 1.1
- Transizione smooth 0.3s

**⚠️ DIVIETO ASSOLUTO**:
- Rimozione della rotazione del logo
- Modifica della velocità di rotazione
- Eliminazione dell'effetto glow
- Alterazione del comportamento hover

### 2. Scroll Animations PROTETTE

#### Comportamenti IMMUTABILI
- Fade in + slide up per tutti i componenti
- Stagger delay di 0.1s tra elementi
- Threshold di attivazione: 0.1
- Durata animazione: 0.6s

**⚠️ DIVIETO ASSOLUTO**:
- Disabilitazione delle scroll animations
- Modifica dei timing delle animazioni
- Rimozione degli effetti stagger

---

## 📱 Layout e Responsive IMMUTABILI

### 1. Breakpoints PROTETTI

#### Breakpoints IMMUTABILI (Chakra UI)
```javascript
// BREAKPOINTS CHE NON POSSONO ESSERE MODIFICATI
breakpoints: {
  base: '0px',    // Mobile
  sm: '480px',    // Small mobile
  md: '768px',    // Tablet
  lg: '992px',    // Desktop
  xl: '1280px',   // Large desktop
  '2xl': '1536px' // Extra large
}
```

**⚠️ DIVIETO ASSOLUTO**:
- Modifica dei breakpoints standard
- Rimozione del supporto mobile
- Alterazione del comportamento responsive

### 2. Layout Grid PROTETTO

#### Struttura IMMUTABILE
- Header: fixed top, height 80px
- Main: full width, padding responsive
- Footer: full width, background dark
- Sezioni: max-width 1200px, centered

**⚠️ DIVIETO ASSOLUTO**:
- Modifica dell'altezza header
- Rimozione del max-width delle sezioni
- Alterazione del layout centrato

---

## 🎵 Contenuti Specifici IMMUTABILI

### 1. Sezione Music PROTETTA

#### Album/EP IMMUTABILI
1. **"Sangue e Sudore"** (2023) - EP
2. **"Ribellione Urbana"** (2022) - EP
3. **"Notti di Fuoco"** (2021) - Single

#### Link Streaming PROTETTI
- Spotify: spotify.com/artist/falcemacello
- YouTube: youtube.com/@falcemacello
- Bandcamp: falcemacello.bandcamp.com

**⚠️ DIVIETO ASSOLUTO**:
- Rimozione di album/EP esistenti
- Modifica dei link streaming senza autorizzazione
- Alterazione delle descrizioni degli album

### 2. Informazioni Band PROTETTE

#### Testi IMMUTABILI
- **Storia**: "Nati dalle ceneri della scena underground..."
- **Sound**: "Il nostro sound fonde elementi di..."
- **Missione**: "La nostra missione è portare..."

**⚠️ DIVIETO ASSOLUTO**:
- Modifica dei testi informativi senza autorizzazione
- Alterazione della storia della band
- Cambio della descrizione del sound

---

## 🔧 Performance Standards IMMUTABILI

### 1. Metriche Minime PROTETTE

#### Performance IMMUTABILI
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 2MB

**⚠️ DIVIETO ASSOLUTO**:
- Degradazione delle performance sotto questi valori
- Aggiunta di dipendenze che aumentano significativamente il bundle
- Rimozione di ottimizzazioni esistenti

### 2. Accessibilità PROTETTA

#### Standard IMMUTABILI
- **WCAG 2.1 Level AA**: Compliance obbligatoria
- **Contrast Ratio**: Minimo 4.5:1
- **Keyboard Navigation**: Supporto completo
- **Screen Reader**: Compatibilità totale

**⚠️ DIVIETO ASSOLUTO**:
- Riduzione del livello di accessibilità
- Rimozione di attributi ARIA
- Degradazione del contrast ratio

---

## 🚫 Modifiche VIETATE Senza Autorizzazione

### 1. Modifiche CRITICHE
- Cambio di framework (React → altro)
- Rimozione di TypeScript
- Modifica del design system
- Alterazione dei colori brand
- Rimozione di animazioni core
- Degradazione performance
- Riduzione accessibilità

### 2. Modifiche STRUTTURALI
- Eliminazione di componenti esistenti
- Modifica dell'architettura file
- Cambio di build tool (Vite → altro)
- Alterazione della configurazione TypeScript
- Modifica dei breakpoints responsive

### 3. Modifiche CONTENUTI
- Alterazione informazioni band
- Modifica link streaming
- Cambio descrizioni album
- Rimozione sezioni esistenti

---

## ✅ Modifiche CONSENTITE

### 1. Aggiunte PERMESSE
- Nuovi componenti (senza alterare esistenti)
- Nuove pagine/sezioni
- Nuovi album/EP (con autorizzazione contenuti)
- Miglioramenti performance (se non alterano funzionalità)
- Bug fixes (se non alterano comportamenti)

### 2. Ottimizzazioni PERMESSE
- Refactoring interno (senza cambi API)
- Aggiornamenti dipendenze (compatibili)
- Miglioramenti SEO
- Ottimizzazioni bundle

---

## 📋 Processo di Autorizzazione

### 1. Richiesta Modifica
1. **Email**: dev@falcemacello.com
2. **Oggetto**: "[FALCE e MACELLO] Richiesta Modifica v1.5"
3. **Contenuto**:
   - Descrizione dettagliata della modifica
   - Motivazione tecnica/artistica
   - Impatto su funzionalità esistenti
   - Timeline proposta

### 2. Valutazione
- **Tempo di risposta**: 48-72 ore
- **Criteri di valutazione**:
  - Compatibilità con vision artistica
  - Impatto su performance
  - Mantenimento accessibilità
  - Coerenza design system

### 3. Implementazione
- **Solo dopo autorizzazione scritta**
- **Testing obbligatorio**
- **Documentazione aggiornamenti**
- **Backup stato precedente**

---

## 🔍 Monitoraggio Compliance

### 1. Controlli Automatici
- **Build checks**: Verifica dipendenze e configurazioni
- **Performance monitoring**: Controllo metriche Core Web Vitals
- **Accessibility testing**: Validazione WCAG compliance
- **Visual regression**: Confronto screenshot automatici

### 2. Controlli Manuali
- **Code review**: Verifica modifiche vs. stato immutabile
- **Functional testing**: Test di tutte le funzionalità protette
- **Cross-browser testing**: Compatibilità su tutti i browser supportati

---

## 📞 Contatti di Emergenza

### Problemi Critici
- **Email**: emergency@falcemacello.com
- **Telefono**: +39 XXX XXX XXXX
- **Disponibilità**: 24/7 per problemi di sicurezza o downtime

### Supporto Tecnico
- **Email**: dev@falcemacello.com
- **GitHub Issues**: Repository ufficiale
- **Orari**: Lun-Ven 9:00-18:00

---

## 📝 Firma e Validazione

**Documento creato**: 20 Agosto 2025  
**Versione documento**: 1.0  
**Validità**: Fino a nuova autorizzazione scritta  
**Stato**: ATTIVO E VINCOLANTE  

**Firma digitale**: [HASH_DOCUMENTO_SHA256]  
**Checksum**: [CHECKSUM_STATO_SITO]  

---

**⚠️ IMPORTANTE**: Questo documento ha valore legale e tecnico. Qualsiasi violazione delle condizioni immutabili senza autorizzazione costituisce una violazione degli accordi di sviluppo e manutenzione del sito FALCE e MACELLO.

**FALCE e MACELLO v1.5** - Protected State Document 🔒🎸