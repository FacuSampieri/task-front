# 💻 Guía de Código - Integración Telegram

## Componentes Implementados

### 1. `telegram-bot-link.tsx` - Componente Base

```typescript
"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function TelegramBotLink() {
  const TELEGRAM_BOT_URL = "https://t.me/task_manager74_bot"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        window.open(TELEGRAM_BOT_URL, "_blank", "noopener,noreferrer")
      }}
      className="w-full justify-start"
      title="Conectar con bot de Telegram para gestionar tareas desde el chat"
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      <span>Conectar Telegram Bot</span>
    </Button>
  )
}
```

**Uso:**
```tsx
import { TelegramBotLink } from "@/components/telegram-bot-link"

export function MyComponent() {
  return <TelegramBotLink />
}
```

---

### 2. `telegram-promo-banner.tsx` - Banner Promocional

```typescript
"use client"

import { AlertCircle, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"

export function TelegramPromoBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <Alert className="border-cyan-500/20 bg-cyan-500/5 mb-6">
      <MessageCircle className="h-4 w-4 text-cyan-500" />
      <AlertTitle>Conecta con nuestro bot de Telegram</AlertTitle>
      <AlertDescription>
        Gestiona tus tareas directamente desde Telegram. Recibe notificaciones, 
        marca tareas como completadas y crea nuevas tareas sin salir del chat.
      </AlertDescription>
      <div className="mt-4 flex gap-2">
        <Button
          size="sm"
          onClick={() => window.open("https://t.me/task_manager74_bot", "_blank", "noopener,noreferrer")}
          className="bg-cyan-500 hover:bg-cyan-600"
        >
          <MessageCircle className="mr-2 h-3 w-3" />
          Conectar Ahora
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setDismissed(true)}
        >
          Descartar
        </Button>
      </div>
    </Alert>
  )
}
```

**Características:**
- ✅ Estado descartable
- ✅ Colors personalizados
- ✅ Responsive
- ✅ Accesible

---

### 3. Cambios en `dashboard/layout.tsx`

**Antes:**
```typescript
import { LayoutList, LayoutGrid, Calendar, Moon, Sun, LogOut, User } from "lucide-react"
```

**Después:**
```typescript
import { LayoutList, LayoutGrid, Calendar, Moon, Sun, LogOut, User, MessageCircle } from "lucide-react"
```

**Botón en Header (agregado):**
```tsx
<Button
  variant="ghost"
  size="icon"
  onClick={() => window.open("https://t.me/task_manager74_bot", "_blank", "noopener,noreferrer")}
  title="Conectar Telegram Bot"
  className="hidden sm:flex"
>
  <MessageCircle className="h-5 w-5" />
  <span className="sr-only">Conectar Telegram Bot</span>
</Button>
```

**Opción en Dropdown (agregada):**
```tsx
<DropdownMenuItem 
  onClick={() => window.open("https://t.me/task_manager74_bot", "_blank", "noopener,noreferrer")}
>
  <MessageCircle className="mr-2 h-4 w-4" />
  <span>Conectar Telegram Bot</span>
</DropdownMenuItem>
```

---

### 4. Cambios en `dashboard/page.tsx`

**Antes:**
```typescript
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4...">
```

**Después:**
```typescript
import { Skeleton } from "@/components/ui/skeleton"
import { TelegramPromoBanner } from "@/components/telegram-promo-banner"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <TelegramPromoBanner />
      <div className="mb-8 flex flex-col gap-4...">
```

---

### 5. Nueva Página: `dashboard/integrations/page.tsx`

```typescript
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, ExternalLink } from "lucide-react"

export default function IntegrationsPage() {
  const TELEGRAM_BOT_URL = "https://t.me/task_manager74_bot"

  const handleTelegramConnect = () => {
    window.open(TELEGRAM_BOT_URL, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Integraciones</h1>
        <p className="text-muted-foreground">
          Conecta tu cuenta con otros servicios para mejorar tu productividad
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {/* Telegram Bot Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/5 rounded-full -mr-20 -mt-20"></div>
          <CardHeader className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-3">
                  <MessageCircle className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <CardTitle>Telegram Bot</CardTitle>
                  <CardDescription>Gestiona tus tareas desde Telegram</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Beneficios:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
                  Ver tus tareas pendientes sin entrar a la app
                </li>
                {/* ... más items */}
              </ul>
            </div>

            <Button
              onClick={handleTelegramConnect}
              className="w-full bg-cyan-500 hover:bg-cyan-600"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Conectar con Telegram Bot
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

---

## Patrones de Código Utilizados

### 1. Client Component
```typescript
"use client"
// Permite usar state, effects, event listeners del cliente
```

### 2. Apertura Segura de Enlaces
```typescript
window.open(
  "https://t.me/task_manager74_bot",
  "_blank",              // Nueva ventana
  "noopener,noreferrer"  // Seguridad
)
```

### 3. Component Composition
```typescript
// Componente reutilizable
export function TelegramBotLink() { ... }

// Usado en múltiples lugares
<TelegramBotLink />
<TelegramBotLink />
```

### 4. State Management
```typescript
const [dismissed, setDismissed] = useState(false)

// Renderizado condicional
if (dismissed) return null
```

---

## Estilos Tailwind Utilizados

### Colors
```css
/* Cyan - Color de Telegram */
bg-cyan-500      /* Fondo sólido */
bg-cyan-500/5    /* Fondo muy ligero */
bg-cyan-500/10   /* Fondo ligero */
text-cyan-500    /* Texto */
```

### Spacing & Layout
```css
gap-2            /* Espacio entre elementos */
mr-2             /* Margen derecha */
ml-2             /* Margen izquierda */
mb-6             /* Margen abajo */
p-3              /* Padding */
w-full           /* Ancho completo */
```

### Display & Responsive
```css
hidden sm:flex   /* Oculto en mobile, visible desde sm */
hidden md:flex   /* Oculto en mobile/tablet, visible desde md */
md:grid-cols-1   /* Grid layout en tablet+*/
```

---

## Importaciones Utilizadas

```typescript
// UI Components (shadcn/ui)
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Icons (lucide-react)
import { MessageCircle, ExternalLink } from "lucide-react"

// React Hooks
import { useState } from "react"

// Next.js
import { useRouter } from "next/navigation"
import Link from "next/link"
```

---

## Variables de Configuración

```typescript
// URL del bot (centralizado)
const TELEGRAM_BOT_URL = "https://t.me/task_manager74_bot"

// Usado en:
window.open(TELEGRAM_BOT_URL, "_blank", "noopener,noreferrer")
```

---

## Mejores Prácticas Implementadas

✅ **Componentes Pequeños y Reutilizables**
- `TelegramBotLink` para link simple
- `TelegramPromoBanner` para promoción completa

✅ **Separación de Responsabilidades**
- Componentes en archivos separados
- Página dedicada para integraciones

✅ **Accesibilidad**
```tsx
title="Conectar Telegram Bot"           // Tooltip
<span className="sr-only">texto</span>  // Screen readers
```

✅ **Rendimiento**
- Componentes ligeros sin dependencias extra
- Client components solo donde es necesario

✅ **Seguridad**
- Links con `noopener,noreferrer`
- HTTPS obligatorio
- Sin datos sensibles en URLs

✅ **Responsive Design**
```tsx
className="hidden sm:flex"  // Oculto en mobile
className="md:grid-cols-1"  // Adaptativo
```

---

## Cómo Extender

### Agregar más integraciones en el futuro:

```typescript
// En /dashboard/integrations/page.tsx

<Card>
  {/* Nueva Integración */}
  <CardHeader>
    <CardTitle>Slack Integration</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Contenido */}
  </CardContent>
</Card>
```

### Crear nuevo link de Telegram en otros lugares:

```typescript
// Importar el componente
import { TelegramBotLink } from "@/components/telegram-bot-link"

// Usar en cualquier lugar
export function MiComponente() {
  return (
    <div>
      <TelegramBotLink />
    </div>
  )
}
```

---

## Debugging & Troubleshooting

### Si los links no abren:
```typescript
// Verificar en console:
console.log("URL:", "https://t.me/task_manager74_bot")
window.open("https://t.me/task_manager74_bot", "_blank", "noopener,noreferrer")
```

### Si el banner no aparece:
```typescript
// Verificar que esté en el JSX:
return (
  <div>
    <TelegramPromoBanner /> {/* ← Debe estar aquí */}
    {/* resto del contenido */}
  </div>
)
```

### Si falta el ícono en el header:
```typescript
// Verificar import:
import { MessageCircle } from "lucide-react" {/* ← Debe estar */}
```

---

**Documentación de Código Completa** ✅
