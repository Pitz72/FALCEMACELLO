# Guida Tecnica - FALCE e MACELLO v2.1.0

## 🏗️ Architettura del Progetto

### Overview Tecnologico

Il sito FALCE e MACELLO è costruito con un'architettura moderna basata su React 18, TypeScript e Vite, progettata per offrire performance ottimali e un'esperienza di sviluppo superiore. La versione 2.1.0 introduce l'audio player integrato e ottimizzazioni UX.

```
┌─────────────────────────────────────────────────────────────┐
│                    FALCE e MACELLO v2.1.0                  │
├─────────────────────────────────────────────────────────────┤
│  Frontend Framework: React 18 + TypeScript                 │
│  Build Tool: Vite 5.x                                      │
│  UI Library: Chakra UI 2.x                                 │
│  Animations: Framer Motion 11.x                            │
│  Audio: HTML5 Audio API + React Hooks                      │
│  Styling: CSS-in-JS (Emotion)                              │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Struttura Dettagliata

### Directory Tree
```
falce-macello-react/
├── public/
│   ├── audio/                    # [NEW v2.1] File audio MP3
│   │   └── 01-la-voglia-di.mp3  # Traccia "La Voglia Di"
│   ├── images/
│   │   ├── logo.svg              # Logo principale SVG
│   │   ├── ep-cover-official.png # [NEW v2.1] Cover EP ufficiale
│   │   ├── album-covers/         # Cover degli album
│   │   └── backgrounds/          # Immagini di sfondo
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.tsx            # [CORE] Navigazione principale
│   │   ├── Hero.tsx              # [CORE] Sezione hero animata
│   │   ├── About.tsx             # [CORE] Informazioni band
│   │   ├── Music.tsx             # [UPDATED v2.1] Audio player integrato
│   │   ├── Contact.tsx           # [UPDATED v2.1] Sezione semplificata
│   │   ├── Footer.tsx            # [UPDATED v2.1] Social links nascosti
│   │   └── index.ts              # [CORE] Export centralizzati
│   ├── App.tsx                   # [CORE] Componente principale
│   ├── main.tsx                  # [CORE] Entry point
│   └── vite-env.d.ts            # Definizioni TypeScript Vite
├── docs/                         # Documentazione progetto
│   ├── README.md                 # [UPDATED v2.1] Guida completa
│   ├── CHANGELOG-v2.1.md         # [NEW v2.1] Changelog versione
│   ├── ANTI-REGRESSION-v2.1.md   # [NEW v2.1] Test suite
│   └── TECHNICAL-GUIDE.md        # [UPDATED v2.1] Questa guida
├── package.json                  # Dipendenze e script
├── tsconfig.json                 # Configurazione TypeScript
├── vite.config.ts               # Configurazione Vite
└── .gitignore
```

## 🔧 Configurazioni Tecniche

### 1. Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@chakra-ui/react', '@emotion/react'],
          animations: ['framer-motion']
        }
      }
    }
  }
})
```

### 2. TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3. Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist node_modules/.vite"
  }
}
```

## 🎵 Nuove Funzionalità v2.1.0

### 1. Audio Player Integrato

#### Architettura Audio
```typescript
// Music.tsx - Audio Player Implementation
interface AudioTrack {
  id: string;
  title: string;
  duration: string;
  audioFile: string;
}

const useAudioPlayer = (audioFile: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return { isPlaying, togglePlay, audioRef };
};
```

#### Gestione Stati Audio
- **Lazy Loading**: File audio caricato solo al primo play
- **Error Handling**: Gestione graceful di errori di caricamento
- **Performance**: Preload="none" per ottimizzare il caricamento iniziale
- **Accessibility**: ARIA labels per screen readers

#### File Audio Supportati
```
public/audio/
└── 01-la-voglia-di.mp3  # 12MB, 320kbps, 4:23 durata
```

### 2. EP "The Hopeful Children of Mr. Brandt"

#### Struttura Dati
```typescript
const albumData = {
  title: "EP 01: The Hopeful Children of Mr. Brandt",
  year: "2025",
  coverImage: "/images/ep-cover-official.png",
  description: "Il primo EP della band...",
  tracklist: [
    {
      id: "track-01",
      title: "La Voglia Di",
      duration: "4:23",
      audioFile: "/audio/01-la-voglia-di.mp3"
    }
  ]
};
```

#### UI Components
- **Album Cover**: Immagine ottimizzata 500x500px
- **Track List**: Layout responsive con controlli audio
- **Metadata**: Anno, descrizione, highlight animato
- **Disabled Buttons**: Spotify e Download temporaneamente disabilitati

### 3. Sezione Contact Semplificata

#### Modifiche Implementate
```typescript
// Contact.tsx - Conditional Rendering
{false && (
  // Form originale nascosto ma preservato
  <ContactForm />
)}

// Nuovo contenuto semplificato
<MotionBox>
  <Text>Contattaci alla mail</Text>
  <Link href="mailto:contatti@falcemacello.it">
    contatti@falcemacello.it
  </Link>
</MotionBox>
```

#### Vantaggi Architetturali
- **Preservazione Codice**: Form originale mantenuto per rollback rapido
- **Performance**: Riduzione DOM elements
- **UX**: Focus su contatto diretto via email
- **Manutenibilità**: Facile ripristino modificando `false` in `true`

### 4. Footer Social Links

#### Implementazione
```typescript
// Footer.tsx - Conditional Social Links
{false && (
  <HStack spacing={4}>
    {socialLinks.map(link => (
      <SocialButton key={link.name} {...link} />
    ))}
  </HStack>
)}
// Temporarily hidden - Social Links
```

## 🎨 Design System Implementation

### 1. Chakra UI Theme

```typescript
// main.tsx - Theme Configuration
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#ffe5e5',
      100: '#ffb3b3',
      200: '#ff8080',
      300: '#ff4d4d',
      400: '#ff1a1a',
      500: '#e60000',  // Brand Primary
      600: '#cc0000',
      700: '#b30000',
      800: '#990000',
      900: '#800000',
    },
  },
  fonts: {
    heading: `'Orbitron', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: '#222222',
        color: 'white',
      },
    },
  },
})
```

### 2. Component Patterns

#### Responsive Design Pattern
```typescript
// Esempio da Music.tsx
<SimpleGrid 
  columns={{ base: 1, md: 2, lg: 3 }} 
  spacing={8}
  w="full"
>
  {albums.map((album, index) => (
    <MotionBox
      key={album.title}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Album content */}
    </MotionBox>
  ))}
</SimpleGrid>
```

#### Animation Pattern
```typescript
// Pattern standard per animazioni
const MotionBox = motion(Box)
const MotionText = motion(Text)

// Scroll animation standard
<MotionBox
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true, amount: 0.1 }}
>
```

## 🧩 Componenti Core

### 1. Header Component

**Responsabilità**:
- Navigazione principale
- Logo animato
- Responsive menu
- Scroll effects

**Props Interface**:
```typescript
interface HeaderProps {
  // Nessuna prop esterna richiesta
  // Componente completamente autonomo
}
```

**Funzionalità Chiave**:
- Logo con rotazione continua
- Effetto glow su hover
- Navigation smooth scroll
- Mobile responsive

### 2. Hero Component

**Responsabilità**:
- Sezione principale del sito
- Logo centrale animato
- Call-to-action principale
- Effetti di sfondo

**Animazioni**:
- Logo rotation (360° in 20s)
- Glow effect (#e60000)
- Hover interactions
- Background particles

### 3. About Component

**Responsabilità**:
- Informazioni sulla band
- Cards animate
- Layout responsive
- Contenuti testuali

**Struttura**:
```typescript
const aboutSections = [
  {
    title: "LA NOSTRA STORIA",
    content: "Nati dalle ceneri della scena underground...",
    icon: "🎸"
  },
  {
    title: "IL NOSTRO SOUND",
    content: "Il nostro sound fonde elementi di...",
    icon: "🔥"
  },
  {
    title: "LA NOSTRA MISSIONE",
    content: "La nostra missione è portare...",
    icon: "⚡"
  }
]
```

### 4. Music Component

**Responsabilità**:
- Discografia della band
- Album covers interattive
- Link streaming platforms
- Descrizioni dettagliate

**Data Structure**:
```typescript
interface Album {
  title: string
  type: 'EP' | 'Single' | 'Album'
  year: number
  cover: string
  description: string
  links: {
    spotify: string
    youtube: string
    bandcamp: string
  }
}
```

### 5. Contact Component

**Responsabilità**:
- Form di contatto
- Validazione input
- Social media links
- Toast notifications

**Form Validation**:
```typescript
const validateForm = (data: FormData) => {
  const errors: FormErrors = {}
  
  if (!data.name.trim()) {
    errors.name = 'Nome richiesto'
  }
  
  if (!data.email.trim() || !isValidEmail(data.email)) {
    errors.email = 'Email valida richiesta'
  }
  
  if (!data.message.trim()) {
    errors.message = 'Messaggio richiesto'
  }
  
  return errors
}
```

### 6. Footer Component

**Responsabilità**:
- Social media links
- Copyright information
- Contact details
- Credits

## ⚡ Performance Optimizations

### 1. Bundle Splitting

```typescript
// vite.config.ts - Manual Chunks
manualChunks: {
  vendor: ['react', 'react-dom'],
  ui: ['@chakra-ui/react', '@emotion/react'],
  animations: ['framer-motion']
}
```

### 2. Lazy Loading

```typescript
// Lazy loading per componenti pesanti
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// Uso con Suspense
<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>
```

### 3. Image Optimization

```typescript
// Uso di formati ottimizzati
<Image
  src="/images/album-cover.webp"
  fallbackSrc="/images/album-cover.jpg"
  alt="Album Cover"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 4. Animation Performance

```typescript
// Animazioni GPU-accelerated
<MotionBox
  animate={{ 
    x: 0, 
    y: 0, 
    scale: 1,
    rotate: 360 
  }}
  transition={{ 
    type: "spring",
    stiffness: 100,
    damping: 10
  }}
  style={{ 
    willChange: 'transform' // GPU acceleration hint
  }}
>
```

## 🔍 Testing Strategy

### 1. Unit Testing

```typescript
// Esempio test componente
import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../Header'

test('renders header with logo', () => {
  render(
    <ChakraProvider>
      <Header />
    </ChakraProvider>
  )
  
  const logo = screen.getByAltText('FALCE e MACELLO Logo')
  expect(logo).toBeInTheDocument()
})
```

### 2. Integration Testing

```typescript
// Test integrazione form
test('contact form submission', async () => {
  render(<Contact />)
  
  const nameInput = screen.getByLabelText('Nome')
  const emailInput = screen.getByLabelText('Email')
  const messageInput = screen.getByLabelText('Messaggio')
  const submitButton = screen.getByRole('button', { name: 'Invia' })
  
  await userEvent.type(nameInput, 'Test User')
  await userEvent.type(emailInput, 'test@example.com')
  await userEvent.type(messageInput, 'Test message')
  await userEvent.click(submitButton)
  
  expect(screen.getByText('Messaggio inviato!')).toBeInTheDocument()
})
```

### 3. E2E Testing

```typescript
// Cypress E2E test
describe('FALCE e MACELLO Site', () => {
  it('should navigate through all sections', () => {
    cy.visit('/')
    
    // Test navigation
    cy.get('[data-testid="nav-about"]').click()
    cy.url().should('include', '#about')
    
    // Test animations
    cy.get('[data-testid="logo"]').should('be.visible')
    cy.get('[data-testid="logo"]').should('have.css', 'animation')
    
    // Test form
    cy.get('[data-testid="contact-form"]').within(() => {
      cy.get('input[name="name"]').type('Test User')
      cy.get('input[name="email"]').type('test@example.com')
      cy.get('textarea[name="message"]').type('Test message')
      cy.get('button[type="submit"]').click()
    })
    
    cy.get('[data-testid="success-toast"]').should('be.visible')
  })
})
```

## 🚀 Deployment

### 1. Build Process

```bash
# Build per produzione
npm run build

# Preview build locale
npm run preview

# Type checking
npm run type-check
```

### 2. Environment Variables

```bash
# .env.production
VITE_API_URL=https://api.falcemacello.com
VITE_ANALYTICS_ID=GA_TRACKING_ID
VITE_CONTACT_EMAIL=contact@falcemacello.com
```

### 3. CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: npm run deploy
```

## 🔧 Troubleshooting

### 1. Problemi Comuni

#### TypeScript Errors
```bash
# Pulire cache TypeScript
npm run clean
npm install

# Verificare configurazione
npm run type-check
```

#### Performance Issues
```bash
# Analizzare bundle
npm run build -- --analyze

# Verificare dipendenze
npm audit
npm audit fix
```

#### Animation Problems
```typescript
// Disabilitare animazioni per debug
const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

<MotionBox
  animate={shouldAnimate ? { opacity: 1 } : {}}
  initial={shouldAnimate ? { opacity: 0 } : {}}
>
```

### 2. Debug Tools

```typescript
// React DevTools
// Framer Motion DevTools
// Chakra UI DevTools

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log)
    getFID(console.log)
    getFCP(console.log)
    getLCP(console.log)
    getTTFB(console.log)
  })
}
```

## 📚 Best Practices

### 1. Component Development

- **Single Responsibility**: Ogni componente ha una responsabilità specifica
- **Props Interface**: Sempre definire interfacce TypeScript per le props
- **Default Props**: Utilizzare default values per props opzionali
- **Error Boundaries**: Implementare error boundaries per componenti critici

### 2. State Management

- **Local State**: Utilizzare useState per stato locale
- **Shared State**: Context API per stato condiviso
- **Form State**: React Hook Form per gestione form complessi
- **Server State**: React Query per stato server (future implementation)

### 3. Performance

- **Memoization**: useMemo e useCallback per ottimizzazioni
- **Code Splitting**: Lazy loading per componenti pesanti
- **Image Optimization**: Formati moderni e lazy loading
- **Bundle Analysis**: Monitoraggio regolare delle dimensioni

### 4. Accessibility

- **Semantic HTML**: Utilizzare elementi semantici
- **ARIA Labels**: Attributi ARIA per screen readers
- **Keyboard Navigation**: Supporto completo navigazione da tastiera
- **Color Contrast**: Rispettare ratio di contrasto WCAG

---

## 📞 Supporto Tecnico

**Email**: dev@falcemacello.com  
**GitHub**: Repository ufficiale  
**Documentazione**: `/docs` folder  

---

**FALCE e MACELLO v1.5** - Technical Excellence 🎸⚡