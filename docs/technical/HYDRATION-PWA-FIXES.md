# Stabilizzazione PWA e Idratazione (v3.7.0)

Questo documento descrive le sfide tecniche e le soluzioni adottate per risolvere gli errori di **Hydration** e i problemi di **installabilità PWA** riscontrati nella versione 3.6.0.

## 1. Problema: Hydration Error #418
In Next.js, l'errore di idratazione si verifica quando il contenuto renderizzato sul server differisce da quello renderizzato sul client nel primo avvio.

### Cause identificate:
- Registrazione del Service Worker tramite script manuale inserito nel body.
- Componenti client-side complessi (`ParticlesBackground`, `GlobalAudioPlayer`) che venivano caricati troppo presto o in modo non isolato.
- Utilizzo di `ssr: false` direttamente nel Server Component `layout.tsx` (non consentito in Next.js 16 Turbopack).

### Soluzione: ClientLayout Wrapper
Abbiamo introdotto un componente "ponte" chiamato `ClientLayout.tsx`:
1. **Mounting Guard**: Utilizza uno stato `mounted` (`useEffect`) per assicurarsi che i componenti client vengano renderizzati solo dopo che il browser ha preso il controllo.
2. **Isolation**: Sposta tutta la logica "non-statica" (Audio, Particelle, Registrazione SW) fuori dal file di root del server.

## 2. Problema: PWA non installabile
Il browser non proponeva l'installazione ("Aggiungi a schermata home") a causa di discrepanze negli asset.

### Correzioni apportate:
- **Percorsi Asset**: Allineati i riferimenti delle icone nei metadati alla cartella `/icons/` (standard).
- **Dominio**: Aggiornata la `metadataBase` al dominio definitivo `.it`.
- **Favicon 404**: Corretto il puntamento alla favicon che causava l'invalidazione dei requisiti PWA su alcuni browser.

## 3. Ottimizzazione Console (RSC Status 204)
In un export statico, Next.js tenta di recuperare file di pre-fetching (RSC) con estensione `.txt` che non esistono fisicamente.

### Soluzione:
Il Service Worker (`sw.js`) è stato istruito per intercettare le richieste che contengono il parametro `_rsc` e rispondere direttamente con un **Status 204 (No Content)**. 
- **Effetto**: La console rimane pulita da inutili errori 404, ma la navigazione rimane veloce grazie al sistema di routing interno di Next.js.

---
*Documentazione aggiornata il 13/03/2026 dal team di sviluppo.*
