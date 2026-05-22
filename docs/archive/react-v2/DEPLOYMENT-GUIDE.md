# Guida al Deployment - FALCE e MACELLO v2.1.0

## 🚀 Overview Deployment

Questa guida fornisce istruzioni complete per il deployment del sito FALCE e MACELLO v2.1.0, dalla preparazione del build alla messa in produzione e monitoraggio. Include considerazioni specifiche per l'audio player integrato.

## 📋 Pre-requisiti

### 1. Ambiente di Sviluppo
- **Node.js**: v18.0.0 o superiore
- **npm**: v9.0.0 o superiore
- **Git**: Ultima versione stabile
- **Editor**: VS Code con estensioni TypeScript/React

### 2. Accessi Richiesti
- Repository GitHub
- Server di hosting (Netlify/Vercel/AWS)
- Dominio falcemacello.com
- Certificati SSL
- Analytics accounts (Google Analytics, etc.)

### 3. Verifiche Pre-Deployment

```bash
# Verifica versione Node.js
node --version  # >= 18.0.0

# Verifica versione npm
npm --version   # >= 9.0.0

# Verifica dipendenze
npm audit

# Type checking
npm run type-check

# Build test
npm run build

# [NEW v2.1] Verifica file audio
ls -la public/audio/01-la-voglia-di.mp3

# [NEW v2.1] Test audio player (dev server)
npm run dev
# Testare manualmente il play/pause
```

## 🔧 Processo di Build

### 1. Preparazione Build

```bash
# 1. Pulire cache e dipendenze
npm run clean
rm -rf node_modules
npm install

# [NEW v2.1] Verifica integrità file audio
file public/audio/01-la-voglia-di.mp3
# Output atteso: MP3 file, ~12MB

# [NEW v2.1] Verifica MIME types per audio
# Assicurarsi che il server serva .mp3 come audio/mpeg

# 2. Verificare configurazione
cat package.json | grep version
cat vite.config.ts

# 3. Controlli qualità
npm run lint
npm run type-check

# 4. Test (se implementati)
npm run test
```

### 2. Build di Produzione

```bash
# Build ottimizzato per produzione
npm run build

# Verifica output
ls -la dist/
du -sh dist/

# Test build locale
npm run preview
```

### 3. Analisi Bundle

```bash
# Analizzare dimensioni bundle
npx vite-bundle-analyzer dist/

# Verificare performance
lighthouse http://localhost:4173 --output=json --output-path=./lighthouse-report.json
```

## 🌐 Opzioni di Hosting

### 1. Netlify (Raccomandato)

#### Setup Iniziale
```bash
# Installare Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inizializzare sito
netlify init
```

#### Configurazione netlify.toml
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### Deploy Manuale
```bash
# Build e deploy
npm run build
netlify deploy --prod --dir=dist

# Deploy con preview
netlify deploy --dir=dist
```

### 2. Vercel

#### Setup Iniziale
```bash
# Installare Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Configurazione vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. AWS S3 + CloudFront

#### Setup S3 Bucket
```bash
# Creare bucket
aws s3 mb s3://falcemacello-website

# Configurare website hosting
aws s3 website s3://falcemacello-website --index-document index.html --error-document index.html

# Upload files
aws s3 sync dist/ s3://falcemacello-website --delete
```

#### CloudFront Distribution
```json
{
  "DistributionConfig": {
    "CallerReference": "falcemacello-2025",
    "Origins": [
      {
        "Id": "S3-falcemacello-website",
        "DomainName": "falcemacello-website.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ],
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3-falcemacello-website",
      "ViewerProtocolPolicy": "redirect-to-https",
      "Compress": true,
      "CachePolicyId": "managed-caching-optimized"
    },
    "Comment": "FALCE e MACELLO Website",
    "Enabled": true
  }
}
```

## 🔄 CI/CD Pipeline

### 1. GitHub Actions

#### .github/workflows/deploy.yml
```yaml
name: Deploy FALCE e MACELLO

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  CACHE_KEY: 'node-modules'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 2. Secrets Configuration

```bash
# GitHub Secrets richiesti
GITHUB_TOKEN          # Auto-generato
NETLIFY_AUTH_TOKEN    # Da Netlify dashboard
NETLIFY_SITE_ID       # Da Netlify dashboard
VERCEL_TOKEN          # Da Vercel dashboard (se usato)
AWS_ACCESS_KEY_ID     # Da AWS IAM (se usato)
AWS_SECRET_ACCESS_KEY # Da AWS IAM (se usato)
```

## 🔒 Configurazione Dominio e SSL

### 1. DNS Configuration

```dns
; DNS Records per falcemacello.com
@     A     104.198.14.52        ; Netlify IP
www   CNAME falcemacello.com.   ; WWW redirect

; Alternative per custom domain
@     CNAME falcemacello.netlify.app.
www   CNAME falcemacello.netlify.app.
```

### 2. SSL Certificate

```bash
# Netlify (automatico)
# Vercel (automatico)

# AWS Certificate Manager
aws acm request-certificate \
  --domain-name falcemacello.com \
  --subject-alternative-names www.falcemacello.com \
  --validation-method DNS
```

### 3. Security Headers

```nginx
# Nginx configuration
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data:; connect-src 'self';" always;
```

## 📊 Monitoraggio e Analytics

### 1. Google Analytics 4

```typescript
// src/analytics.ts
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
```

### 2. Performance Monitoring

```typescript
// src/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

const sendToAnalytics = (metric: any) => {
  // Inviare metriche a servizio di monitoring
  console.log(metric)
}

export const initPerformanceMonitoring = () => {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}
```

### 3. Error Tracking

```typescript
// src/errorTracking.ts
export const initErrorTracking = () => {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
    // Inviare a servizio di error tracking
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    // Inviare a servizio di error tracking
  })
}
```

## 🔍 Testing Post-Deployment

### 1. Smoke Tests

```bash
#!/bin/bash
# smoke-test.sh

URL="https://falcemacello.com"

echo "🧪 Running smoke tests for $URL"

# Test homepage
echo "Testing homepage..."
curl -f -s -o /dev/null $URL || exit 1

# Test critical paths
echo "Testing critical sections..."
curl -f -s -o /dev/null "$URL/#about" || exit 1
curl -f -s -o /dev/null "$URL/#music" || exit 1
curl -f -s -o /dev/null "$URL/#contact" || exit 1

# Test assets
echo "Testing assets..."
curl -f -s -o /dev/null "$URL/images/logo.svg" || exit 1

echo "✅ All smoke tests passed!"
```

### 2. Performance Tests

```bash
# Lighthouse CI
npm install -g @lhci/cli

# lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['https://falcemacello.com'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
}

# Run tests
lhci autorun
```

### 3. Accessibility Tests

```bash
# axe-core testing
npm install -g @axe-core/cli

# Test accessibility
axe https://falcemacello.com --tags wcag2a,wcag2aa
```

## 🚨 Rollback Procedures

### 1. Netlify Rollback

```bash
# Lista deploy precedenti
netlify sites:list
netlify api listSiteDeploys --data='{"site_id":"YOUR_SITE_ID"}'

# Rollback a deploy specifico
netlify api restoreSiteDeploy --data='{"site_id":"YOUR_SITE_ID","deploy_id":"DEPLOY_ID"}'
```

### 2. Git Rollback

```bash
# Rollback a commit precedente
git log --oneline -10
git revert HEAD
git push origin main

# Force rollback (ATTENZIONE)
git reset --hard COMMIT_HASH
git push --force origin main
```

### 3. Emergency Procedures

```bash
# Maintenance page
echo "<!DOCTYPE html><html><head><title>Manutenzione</title></head><body><h1>Sito in manutenzione</h1><p>Torneremo presto online!</p></body></html>" > maintenance.html

# Deploy maintenance page
netlify deploy --prod --dir=. --functions=. --message="Emergency maintenance"
```

## 📋 Checklist Pre-Deployment

### ✅ Controlli Tecnici
- [ ] Build completato senza errori
- [ ] Type checking passato
- [ ] Lint passato
- [ ] Bundle size accettabile (<2MB)
- [ ] Performance test passati
- [ ] Accessibility test passati
- [ ] Cross-browser testing completato

### ✅ Controlli Contenuti
- [ ] Tutti i link funzionanti
- [ ] Immagini caricate correttamente
- [ ] Testi aggiornati
- [ ] Informazioni contatto corrette
- [ ] Link social media aggiornati
- [ ] Discografia aggiornata

### ✅ Controlli SEO
- [ ] Meta tags ottimizzati
- [ ] Open Graph tags configurati
- [ ] Sitemap generata
- [ ] robots.txt configurato
- [ ] Schema markup implementato

### ✅ Controlli Sicurezza
- [ ] HTTPS configurato
- [ ] Security headers implementati
- [ ] Nessun secret esposto
- [ ] Dipendenze aggiornate
- [ ] Vulnerabilità risolte

## 📞 Supporto e Contatti

### Team di Deployment
- **Lead Developer**: dev@falcemacello.com
- **DevOps**: devops@falcemacello.com
- **Emergency**: +39 XXX XXX XXXX

### Risorse Utili
- **Repository**: GitHub FALCE e MACELLO
- **Hosting Dashboard**: Netlify/Vercel
- **Analytics**: Google Analytics
- **Monitoring**: Uptime monitoring service

---

## 🎯 Post-Deployment

### 1. Verifica Immediata
- Testare tutte le funzionalità principali
- Verificare performance con Lighthouse
- Controllare console browser per errori
- Testare su dispositivi mobili

### 2. Monitoraggio 24h
- Controllare metriche performance
- Monitorare error rates
- Verificare analytics traffic
- Controllare uptime

### 3. Comunicazione
- Notificare team del deployment
- Aggiornare documentazione
- Comunicare eventuali breaking changes
- Pianificare prossimi sviluppi

---

**FALCE e MACELLO v1.5** - Deployment Excellence 🚀🎸