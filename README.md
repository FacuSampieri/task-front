# Task Front – Next.js Task Management App

## Descripción

Task Front es una aplicación web moderna para la gestión de tareas y proyectos, desarrollada con Next.js, TypeScript y Redux Toolkit. Permite a los usuarios registrarse, iniciar sesión, crear y organizar tareas, asignarlas a grupos, visualizarlas en tablero Kanban o calendario, y gestionar archivos adjuntos. Incluye autenticación JWT con refresh token, integración con bot de Telegram para gestionar tareas desde el chat, y una interfaz intuitiva y responsiva.

## Características principales

- ✅ Registro e inicio de sesión de usuarios
- ✅ Autenticación segura con JWT y refresh token
- ✅ CRUD de tareas y grupos
- ✅ Asignación de tareas a grupos y colores personalizados
- ✅ Visualización de tareas en tablero Kanban y calendario
- ✅ Filtros avanzados y búsqueda de tareas
- ✅ Adjuntar archivos a tareas
- ✅ **Integración con bot de Telegram** (@task_manager74_bot)
  - Ver tareas pendientes desde Telegram
  - Marcar tareas como completadas en el chat
  - Crear nuevas tareas desde Telegram
  - Recibir recordatorios automáticos
- ✅ UI moderna y adaptable (mobile friendly)
- ✅ Manejo automático de expiración de sesión y refresh de token
- ✅ Ordenamiento inteligente de tareas por fecha de vencimiento

## Tecnologías utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Zod](https://zod.dev/) (validación de formularios)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## Estructura del proyecto

```
app/
  auth/
    login/          # Página de login
    register/       # Página de registro
  dashboard/
    layout.tsx      # Layout principal del dashboard
    page.tsx        # Lista de tareas
    board/          # Vista Kanban
    calendar/       # Vista calendario
    groups/         # Gestión de grupos
    integrations/   # Página de integraciones (Telegram)
    tasks/
      [id]/         # Detalle de tarea

components/
  tasks/            # Componentes de tareas
  ui/               # Componentes UI reutilizables
  telegram-bot-link.tsx      # Componente botón Telegram
  telegram-promo-banner.tsx  # Banner Telegram en dashboard
  providers/        # Proveedores (Redux, Theme)

lib/
  api/              # Configuración de API
  features/         # Slices de Redux y API endpoints
    auth/           # Autenticación
    tasks/          # Tareas
    files/          # Archivos
    groups/         # Grupos
  hooks.ts          # Custom hooks
  store.ts          # Configuración de Redux
  utils.ts          # Utilidades

public/             # Archivos estáticos
styles/             # Estilos CSS globales
```

## Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/task-front.git
   cd task-front
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   # o
   pnpm install
   ```
3. **Configura las variables de entorno:**
   - Crea un archivo `.env.local` basado en `.env.example` (si existe).
   - Ejemplo:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3001/api
     ```
4. **Inicia la aplicación:**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```
5. **Abre en tu navegador:**
   [http://localhost:3000](http://localhost:3000)

## Scripts útiles

- `dev`: Inicia el servidor de desarrollo
- `build`: Compila la aplicación para producción
- `start`: Inicia la app en modo producción
- `lint`: Ejecuta el linter

## Notas de autenticación

- El access token se almacena en cookies y el refresh token en localStorage.
- El sistema renueva el access token automáticamente al expirar, usando el refresh token.
- Si ambos tokens expiran, el usuario es deslogueado automáticamente.

## Integración con Telegram Bot

La aplicación incluye integración completa con el bot de Telegram **@task_manager74_bot**.

### Cómo acceder al bot

Dentro de la aplicación tienes **4 formas de conectarte**:

1. **Banner en Dashboard** - Verás un banner cyan en la página principal cuando no estés conectado
2. **Ícono en Header** - Botón directo ⚡ en la barra superior en la sección "Integraciones"
3. **Menú de Usuario** - Opción "Conectar Telegram Bot" en el menú desplegable
4. **Página de Integraciones** - Vista completa en `/dashboard/integrations`

### Funcionalidades del Bot

Una vez conectado, puedes desde Telegram:
- 📋 Ver todas tus tareas pendientes
- ✅ Marcar tareas como completadas
- ➕ Crear nuevas tareas
- 🔔 Recibir recordatorios automáticos
- 🎯 Filtrar por grupo o prioridad

**Bot Link:** [https://t.me/task_manager74_bot](https://t.me/task_manager74_bot)

## Estructura de carpetas destacada

- `app/`: Rutas y páginas principales (Next.js App Router)
  - `auth/`: Páginas de autenticación (login, registro)
  - `dashboard/`: Dashboard principal con todas las vistas
    - `integrations/`: Página de integraciones (Telegram, etc)
- `components/`: Componentes reutilizables
  - `tasks/`: Componentes específicos de tareas
  - `ui/`: Componentes base de UI
  - `telegram-*`: Componentes de integración con Telegram
- `lib/`: Lógica de negocio y estado
  - `features/`: Slices de Redux y endpoints de RTK Query
  - `api/`: Configuración de la API
  - `hooks.ts`: Custom hooks
  - `store.ts`: Configuración de Redux Store
  - `utils.ts`: Funciones utilitarias
- `public/`: Archivos estáticos
- `styles/`: Estilos CSS globales y variables

## Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request para sugerencias o mejoras.

## Licencia

MIT
