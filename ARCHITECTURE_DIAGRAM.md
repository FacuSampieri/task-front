# 🎯 Diagrama de Integración - Telegram Bot

## Flujo de Navegación

```
┌─────────────────────────────────────────────────────────────┐
│                    APLICACIÓN PRINCIPAL                      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ /dashboard (DashboardLayout)                         │   │
│  │                                                      │   │
│  │ Header (sticky):                                     │   │
│  │ ┌─────────┬──────────┬──────────┬──────────┐        │   │
│  │ │ "Tareas"│ Nav Menu │ Theme Btn│ Telegram │ User ▼ │   │
│  │ └─────────┴──────────┴──────────┴──────────┘        │   │
│  │                                           ││         │   │
│  │                      Click: Opens Telegram Bot      │   │
│  │                      Link in new window             │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│                              │                               │
│  ┌──────────────────────────▼──────────────────────────┐   │
│  │ /dashboard/page.tsx (DashboardPage)                │   │
│  │                                                      │   │
│  │ [TelegramPromoBanner Component]                     │   │
│  │ ┌──────────────────────────────────────────┐        │   │
│  │ │ ℹ️ Conecta con nuestro bot de Telegram   │        │   │
│  │ │ Beneficios: ...                          │        │   │
│  │ │ [Conectar Ahora] [Descartar]             │        │   │
│  │ └──────────────────────────────────────────┘        │   │
│  │                                                      │   │
│  │ [Tasks List, Filters, etc...]                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ /dashboard/integrations/page.tsx (Integraciones)   │   │
│  │                                                      │   │
│  │ Telegram Bot Card:                                   │   │
│  │ ┌──────────────────────────────────────────┐        │   │
│  │ │ 📱 Telegram Bot                          │        │   │
│  │ │ Gestiona tus tareas desde Telegram       │        │   │
│  │ │                                          │        │   │
│  │ │ Beneficios:                              │        │   │
│  │ │ • Ver tareas pendientes                  │        │   │
│  │ │ • Marcar tareas completadas              │        │   │
│  │ │ • Recibir recordatorios                  │        │   │
│  │ │ • Crear nuevas tareas                    │        │   │
│  │ │                                          │        │   │
│  │ │ [Conectar con Telegram Bot ➜]           │        │   │
│  │ └──────────────────────────────────────────┘        │   │
│  │                                                      │   │
│  │ [Future Integrations...]                            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  User Dropdown Menu (Click User Icon):                       │
│  ┌──────────────────────────────────────────┐               │
│  │ User: Juan Pérez                         │               │
│  │ Email: juan@example.com                  │               │
│  │ ─────────────────────────────────────── │               │
│  │ 📱 Conectar Telegram Bot ◄─────────────┐│               │
│  │ ─────────────────────────────────────── ││               │
│  │ 🌙 Cambiar a oscuro (mobile only)      ││               │
│  │ ◄ Cerrar Sesión                        ││               │
│  └──────────────────────────────────────────┘               │
│                                              │               │
└──────────────────────────────────────────────┼───────────────┘
                                               │
                                    ┌──────────▼────────────┐
                                    │ window.open()          │
                                    │ "_blank"               │
                                    │ "noopener,noreferrer" │
                                    └──────────┬────────────┘
                                               │
                                    ┌──────────▼────────────────────┐
                                    │ https://t.me/task_manager74_bot │
                                    │ (Telegram Bot External)        │
                                    └───────────────────────────────┘
```

---

## Arquitectura de Componentes

```
src/
├── components/
│   ├── telegram-bot-link.tsx
│   │   └── Exports: TelegramBotLink() Component
│   │       Uso: Link reutilizable para conectar
│   │
│   ├── telegram-promo-banner.tsx
│   │   └── Exports: TelegramPromoBanner() Component
│   │       Uso: Banner promocional en dashboard
│   │
│   ├── tasks/
│   │   └── [Componentes existentes]
│   │
│   └── ui/
│       └── [Componentes UI existentes]
│
├── app/
│   └── dashboard/
│       ├── layout.tsx (MODIFICADO)
│       │   ├── Imports: MessageCircle icon
│       │   ├── Header: Botón directo a Telegram
│       │   └── Dropdown Menu: Opción de Telegram
│       │
│       ├── page.tsx (MODIFICADO)
│       │   ├── Imports: TelegramPromoBanner
│       │   └── Renderiza: Banner al inicio
│       │
│       ├── integrations/
│       │   └── page.tsx (NUEVO)
│       │       └── Página dedicada de integraciones
│       │
│       ├── board/
│       ├── calendar/
│       ├── groups/
│       └── tasks/
│
└── [otros archivos]
```

---

## Puntos de Entrada del Usuario

```
┌─────────────────────────────────────────────────────────────┐
│ 4 Formas de Acceder al Bot de Telegram                       │
└─────────────────────────────────────────────────────────────┘

① BANNER EN DASHBOARD
   Visible: Siempre en /dashboard
   Action: Click [Conectar Ahora]
   
② ÍCONO EN HEADER
   Visible: sm breakpoint y mayor
   Action: Click ícono de MessageCircle
   
③ MENÚ DROPDOWN
   Visible: Todas las pantallas
   Action: Click usuario → "Conectar Telegram Bot"
   
④ PÁGINA DE INTEGRACIONES
   URL: /dashboard/integrations
   Action: Click botón prominente cyan
```

---

## Estado de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│ COMPONENT STATE MANAGEMENT                                  │
└─────────────────────────────────────────────────────────────┘

TelegramPromoBanner:
├── State: dismissed (boolean)
├── Default: false (mostrar)
├── Trigger: Click [Descartar]
├── Behavior: Oculta banner hasta refresh
└── Persistence: Solo en sesión actual

TelegramBotLink:
├── Stateless: Solo presentación
├── Behavior: Abre en nueva ventana
└── Props: title (accesibilidad)

IntegrationsPage:
├── Stateless: Servidor o página estática
└── Behavior: Información y CTA
```

---

## URLs y Rutas

```
┌─────────────────────────────────────────────────────────────┐
│ RUTAS INTERNAS                                               │
├─────────────────────────────────────────────────────────────┤
│ /dashboard                      → Lista de tareas           │
│ /dashboard/board                → Vista tipo Kanban         │
│ /dashboard/calendar             → Calendario de tareas      │
│ /dashboard/groups               → Gestión de grupos         │
│ /dashboard/integrations    [NEW]→ Página de integraciones  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ URL EXTERNA                                                  │
├─────────────────────────────────────────────────────────────┤
│ https://t.me/task_manager74_bot → Bot de Telegram           │
│ (abierto en nueva ventana)                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Flujo de Datos

```
Usuario en /dashboard
        │
        ├─ Ve TelegramPromoBanner
        │   └─ Click [Conectar Ahora]
        │       └─ Abre Telegram Bot
        │
        ├─ Ve Ícono en Header
        │   └─ Click Ícono
        │       └─ Abre Telegram Bot
        │
        ├─ Abre Menu Dropdown
        │   ├─ Click "Conectar Telegram Bot"
        │   │   └─ Abre Telegram Bot
        │   │
        │   └─ Click Theme / Logout
        │
        └─ Navega a /integrations
            └─ Click [Conectar con Telegram Bot]
                └─ Abre Telegram Bot

                    ↓ (en nueva ventana)

        Telegram Bot (@task_manager74_bot)
        └─ Usuario vincula su cuenta
           └─ Puede gestionar tareas desde Telegram
```

---

## Timeline de Ejecución

```
1. Usuario inicia sesión
   └─ Llega a /dashboard

2. Página carga
   ├─ layout.tsx renderiza header con ícono de Telegram
   └─ page.tsx renderiza banner promocional

3. Usuario interactúa
   ├─ Opción A: Click banner
   ├─ Opción B: Click ícono header
   ├─ Opción C: Click menú usuario
   └─ Opción D: Navega a /integrations y click

4. window.open() se ejecuta
   └─ Nueva pestaña: https://t.me/task_manager74_bot

5. Vinculación ocurre en Telegram (fuera del scope)
   └─ Usuario puede gestionar tareas desde Telegram
```

---

## Seguridad y Privacidad

```
┌─────────────────────────────────────────────────────────────┐
│ MEDIDAS DE SEGURIDAD IMPLEMENTADAS                          │
└─────────────────────────────────────────────────────────────┘

✓ window.open() flags:
  - "_blank"              → Nueva ventana aislada
  - "noopener"           → Desconecta window.opener
  - "noreferrer"         → No envía Referer header

✓ No hay almacenamiento de:
  - Tokens en localStorage
  - Credenciales en cookies
  - IDs de usuario en URLs

✓ HTTPS obligatorio:
  - URL del bot usa HTTPS
  - Conexión segura garantizada

✓ Contexto aislado:
  - El bot se abre en contexto separado
  - No tiene acceso a la app
```

---

## Responsiveness

```
Mobile (<640px)
├─ Banner: ✓ Visible
├─ Ícono Header: ✗ Oculto (hidden sm:flex)
├─ Menú Usuario: ✓ Visible
├─ /integrations: ✓ Stack vertical
└─ Botones: ✓ Touch-friendly

Tablet (640px - 1024px)
├─ Banner: ✓ Visible
├─ Ícono Header: ✓ Visible
├─ Menú Usuario: ✓ Visible
├─ /integrations: ✓ Layout adaptativo
└─ Botones: ✓ Tamaño apropiado

Desktop (>1024px)
├─ Banner: ✓ Visible
├─ Ícono Header: ✓ Visible
├─ Menú Usuario: ✓ Visible
├─ /integrations: ✓ Grid layout
└─ Botones: ✓ Hover effects
```

---

**Arquitectura Completada y Documentada** ✅
