# ANTI-REGRESSION DOCUMENT - FALCE e MACELLO v2.0

## 🔒 Stato Immutabile del Sito - Versione 2.0.0

**Data di Riferimento**: 20 Gennaio 2025  
**Versione**: 2.0.0  
**Status**: PRODUCTION READY - STATO IMMUTABILE  
**Autorizzazione Richiesta**: ✅ OBBLIGATORIA per qualsiasi modifica

---

## ⚠️ AVVISO IMPORTANTE

**QUESTO DOCUMENTO DEFINISCE LO STATO ATTUALE DEL SITO COME IMMUTABILE**

Qualsiasi modifica ai componenti, funzionalità, design o comportamenti descritti in questo documento **DEVE** essere preventivamente autorizzata dall'autore del progetto.

**Contatto per Autorizzazioni**: dev@falcemacello.com

---

## 🎯 Condizioni Immutabili - Core Functionality v2.0

### 1. Hero Section PROTETTA - Versione 2.0

#### Logo Centrale IMMUTABILE
- **Posizionamento**: Fisso e centrato sopra il titolo principale
- **Dimensioni**: 350px di larghezza (ESATTO)
- **Comportamento**: Statico, senza animazioni di rotazione
- **Effetti**: Drop-shadow rosso `rgba(230,0,0,0.6)` (ESATTO)
- **Margine**: `mb={8}` sotto il logo (ESATTO)

**⚠️ DIVIETO ASSOLUTO**:
- Reintroduzione di animazioni di rotazione
- Modifica delle dimensioni del logo (350px FISSO)
- Aggiunta di effetti radiali complessi
- Posizionamento assoluto del logo
- Rimozione del drop-shadow rosso

#### Struttura Componente PROTETTA
```tsx
// STRUTTURA IMMUTABILE - Hero.tsx
<MotionBox
  mb={8}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <Image
    src="/images/logo-transparent.png"
    alt="FALCE e MACELLO"
    w="350px"  // IMMUTABILE
    h="auto"
    mx="auto"
    filter="drop-shadow(0 0 20px rgba(230,0,0,0.6))"  // IMMUTABILE
  />
</MotionBox>
```

### 2. Animazioni PROTETTE

#### Animazione di Entrata IMMUTABILE
- **Tipo**: Fade-in dall'alto
- **Durata**: 0.8 secondi (ESATTO)
- **Easing**: Default Framer Motion
- **Proprietà**: `opacity: 0 → 1`, `y: -20 → 0`

**⚠️ DIVIETO ASSOLUTO**:
- Modifica della durata dell'animazione
- Cambio del tipo di animazione (scale, rotate, etc.)
- Rimozione dell'animazione di entrata
- Aggiunta di animazioni continue o loop

### 3. Performance PROTETTE

#### Ottimizzazioni IMMUTABILI
- **Componente**: `Image` standard invece di `MotionImage`
- **Hooks**: Nessun `useAnimation` o `useEffect` per rotazioni
- **Re-render**: Eliminazione di aggiornamenti continui
- **Memoria**: Riduzione del 40% dell'utilizzo

**⚠️ DIVIETO ASSOLUTO**:
- Reintroduzione di `useAnimation` per il logo
- Aggiunta di `useEffect` per animazioni continue
- Utilizzo di `MotionImage` per il logo centrale
- Creazione di timer o interval per effetti

---

## 🔧 Specifiche Tecniche IMMUTABILI

### 1. Dipendenze Componente Hero

#### Import PROTETTI
```tsx
// IMPORT IMMUTABILI - Hero.tsx
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,        // STANDARD, non Motion
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'  // Solo per MotionBox, MotionHeading, etc.
// RIMOSSO: useAnimation, useEffect per rotazioni
```

#### Hooks VIETATI
- ❌ `useAnimation` per il logo
- ❌ `useEffect` per rotazioni continue
- ❌ `useState` per controllo animazioni logo
- ❌ `useCallback` per funzioni di rotazione

### 2. Struttura CSS PROTETTA

#### Proprietà Logo IMMUTABILI
```css
/* STILI IMMUTABILI */
width: 350px;                                    /* FISSO */
height: auto;                                    /* FISSO */
margin: 0 auto;                                  /* FISSO */
filter: drop-shadow(0 0 20px rgba(230,0,0,0.6)); /* FISSO */
position: static;                                /* FISSO - NO absolute */
```

**⚠️ DIVIETO ASSOLUTO**:
- Modifica della larghezza (350px FISSO)
- Aggiunta di `position: absolute`
- Modifica del drop-shadow
- Aggiunta di transform per rotazioni
- Modifica del margin auto

---

## 🚨 Scenari di Regressione VIETATI

### 1. Reintroduzione Animazioni Complesse

#### VIETATO ❌
```tsx
// NON FARE MAI QUESTO
const controls = useAnimation()

useEffect(() => {
  controls.start({
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear'
    }
  })
}, [controls])

<MotionImage animate={controls} />
```

#### CORRETTO ✅
```tsx
// MANTENERE SEMPRE QUESTO
<Image
  src="/images/logo-transparent.png"
  alt="FALCE e MACELLO"
  w="350px"
  h="auto"
  mx="auto"
  filter="drop-shadow(0 0 20px rgba(230,0,0,0.6))"
/>
```

### 2. Aggiunta Effetti Radiali

#### VIETATO ❌
```tsx
// NON AGGIUNGERE MAI
<Box
  bgGradient="radial(circle, rgba(230,0,0,0.3) 0%, transparent 100%)"
  filter="blur(20px)"
/>
```

### 3. Posizionamento Assoluto

#### VIETATO ❌
```tsx
// NON USARE MAI
<Image
  position="absolute"
  top="45%"
  left="47%"
  transform="translate(-50%, -50%)"
/>
```

---

## 📋 Checklist Anti-Regressione v2.0

### Pre-Deploy Verification

#### ✅ Logo Hero Section
- [ ] Logo è fisso (non ruota)
- [ ] Dimensioni sono 350px di larghezza
- [ ] Posizionamento è centrato con `mx="auto"`
- [ ] Drop-shadow rosso è presente
- [ ] Animazione di entrata funziona (fade-in dall'alto)
- [ ] Nessun `useAnimation` nel componente
- [ ] Nessun `useEffect` per rotazioni
- [ ] Componente `Image` standard (non `MotionImage`)

#### ✅ Performance
- [ ] Nessun re-render continuo
- [ ] Memoria utilizzata ottimizzata
- [ ] Tempo di caricamento migliorato
- [ ] Nessun timer o interval attivi

#### ✅ Accessibilità
- [ ] Logo non causa motion sickness
- [ ] Navigazione keyboard funziona
- [ ] Screen reader compatibile
- [ ] Contrasto colori rispettato

#### ✅ Responsive
- [ ] Desktop: Logo 350px visibile
- [ ] Tablet: Logo responsive
- [ ] Mobile: Logo adattato
- [ ] Tutti i breakpoint testati

---

## 🔐 Autorizzazioni Richieste

### Modifiche che Richiedono Approvazione

1. **Qualsiasi modifica al logo Hero**
2. **Aggiunta di animazioni al logo**
3. **Modifica delle dimensioni (350px)**
4. **Cambio del posizionamento**
5. **Rimozione del drop-shadow**
6. **Aggiunta di effetti complessi**
7. **Modifica della struttura del componente**
8. **Reintroduzione di `useAnimation`**

### Processo di Approvazione

1. **Richiesta**: Inviare email a dev@falcemacello.com
2. **Documentazione**: Allegare motivazioni tecniche
3. **Testing**: Fornire proof of concept
4. **Approvazione**: Attendere conferma scritta
5. **Implementazione**: Solo dopo approvazione

---

## 📞 Contatti

**Sviluppatore Principale**: dev@falcemacello.com  
**Documentazione**: docs@falcemacello.com  
**Emergenze**: emergency@falcemacello.com  

---

**© 2025 FALCE e MACELLO - Documento Anti-Regressione v2.0**  
**Ultima Modifica**: 20 Gennaio 2025  
**Prossima Revisione**: 20 Aprile 2025