# FALCE e MACELLO - Versione HTML Statica (Legacy)

## Descrizione

Questa directory contiene la versione HTML statica originale del sito web FALCE e MACELLO. Questa versione è stata spostata qui per mantenere la compatibilità e servire come fallback robusto.

## Stato del Progetto

- **Stato**: Versione legacy completa e funzionale
- **Ultima modifica**: Gennaio 2025
- **Tecnologie**: HTML5, CSS3, JavaScript ES6, Particles.js
- **Funzionalità**: Completamente implementata con effetti avanzati

## Struttura

```
legacy/
├── index.html          # Pagina principale
├── css/
│   └── style.css      # Stili (1043 righe)
├── js/
│   └── script.js      # JavaScript (525 righe)
└── images/            # Asset grafici completi
    ├── logo-*.png
    ├── ep-cover-*.png
    └── favicon.*
```

## Funzionalità Implementate

### ✅ Completamente Funzionali
- Hero section con animazioni glitch
- Effetti particellari (Particles.js)
- Sezione Manifesto completa
- Sezione Musica con card interattive
- Sezione EP "The Hopeful Children of Mr. Brandt"
- Sezione Contatti con form
- Footer con informazioni
- Animazioni CSS avanzate
- Responsive design
- Effetti typewriter
- Rotazione vinile
- Navigazione smooth scroll

### ⚠️ Limitazioni Identificate
- Link social puntano a '#' (non funzionali)
- Pulsanti EP non hanno implementazione backend
- Form contatti non ha backend di invio

## Confronto con Versione React v2.1.0

| Funzionalità | Legacy HTML | React v2.1.0 |
|--------------|-------------|---------------|
| Hero Section | ✅ Completa | ✅ Completa |
| Manifesto | ✅ Completa | ✅ Completa |
| Musica | ✅ Completa | ⚠️ Link disabilitati |
| EP Section | ✅ Completa | ✅ Completa |
| Contatti | ✅ Form visibile | ⚠️ Form nascosto |
| Social Links | ⚠️ Puntano a '#' | ⚠️ Puntano a '#' |
| Effetti | ✅ Particles.js | ✅ Framer Motion |
| Performance | ✅ Veloce | ✅ Ottimizzata |

## Utilizzo

### Come Fallback
Questa versione può essere utilizzata come fallback in caso di problemi con la versione React:

```bash
# Servire localmente
cd legacy
python -m http.server 8000
# Oppure
npx serve .
```

### Per Sviluppo
Utile per testare funzionalità o come riferimento per l'implementazione React.

## Raccomandazioni

1. **Mantenimento**: Mantenere questa versione come backup funzionale
2. **Aggiornamenti**: Non aggiornare attivamente, ma correggere bug critici se necessario
3. **Migrazione**: Utilizzare come riferimento per completare le funzionalità mancanti in React
4. **Deploy**: Non deployare come versione principale

## Note Tecniche

- **CSS**: 1043 righe di stili ben organizzati con variabili CSS
- **JavaScript**: 525 righe con gestione eventi, animazioni e interazioni
- **Asset**: Tutti i file immagine necessari sono presenti
- **Compatibilità**: Supporta tutti i browser moderni
- **Performance**: Ottimizzata per caricamento veloce

## Versione Attiva

⚠️ **IMPORTANTE**: La versione attiva del sito è quella React v2.1.0 in `../falce-macello-react/`

Questa versione legacy è mantenuta solo per compatibilità e riferimento.