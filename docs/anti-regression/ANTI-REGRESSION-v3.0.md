# Documento di Protezione Anti-Regressione (v3.0+) - FALCE e MACELLO

**Versione Corrente:** 3.0.1  
**Framework:** Next.js 16  
**Stato:** Immutabile (Design Core)

## 🛡️ Vincoli Immutabili del Brand

### 1. Palette Colori Protetta
I seguenti colori sono stati estratti dall'analisi degli asset ufficiali e NON devono essere modificati senza autorizzazione esplicita:
- **Primary Red**: `#b9363b`
- **Dark Background**: `#101721`
- **Light Text/BG**: `#f7fbfe`

### 2. Elementi della Hero Section
La Hero Section è il cuore visivo del brand. I seguenti elementi sono considerati protetti:
- **Logo Centrale**: Posizione fissa, centrata, con dimensioni proporzionali al viewport.
- **Effetto Glitch**: Deve essere presente sul logo per mantenere l'estetica "Cyber-Soviet".

### 3. Tipografia
- **Titoli (Orbitron)**: Carattere futuristico/sovietico per tutti i titoli principali.
- **Corpo del testo (Inter)**: Carattere ad alta leggibilità per i contenuti.

## 📋 Checklist Anti-Regressione per Nuovi Update

### ✅ UI/UX
- [ ] Il logo è centrato e visibile?
- [ ] L'effetto glitch funziona correttamente?
- [ ] I colori del brand sono rispettati (Tailwind config)?
- [ ] La navigazione mobile è fluida e accessibile?
- [ ] Le animazioni Framer Motion sono performanti?

### ✅ Performance & Technical
- [ ] La build statica (`npm run build`) viene completata senza errori?
- [ ] La dimensione del bundle JS è ottimizzata?
- [ ] L'audio player carica le tracce in modo asincrono (lazy loading)?
- [ ] Le immagini sono ottimizzate via `next/image`?

## 🚫 Divieti Espliciti
- **NO**: Reintrodurre animazioni pesanti che degradano le performance (come nella v1.5).
- **NO**: Modificare i font senza una revisione completa del design system.
- **NO**: Utilizzare palette colori diverse da quelle definite in `BRAND_ANALYSIS.md`.

## 🔄 Procedura di Modifica
Ogni modifica che impatta i vincoli immutabili sopra citati deve essere:
1. Documentata nel log di versione.
2. Motivata tecnicamente o esteticamente.
3. Approvata dopo test di regressione su dispositivi reali.

---

**Ultimo aggiornamento**: 13 Marzo 2026  
**Riferimento**: `docs/branding/BRAND_ANALYSIS.md`
