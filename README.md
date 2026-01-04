# Task Front – Next.js Task Management App

## Descripción

Task Front es una aplicación web moderna para la gestión de tareas y proyectos, desarrollada con Next.js, TypeScript y Redux Toolkit. Permite a los usuarios registrarse, iniciar sesión, crear y organizar tareas, asignarlas a grupos, visualizarlas en tablero Kanban o calendario, y gestionar archivos adjuntos. Incluye autenticación JWT con refresh token y una interfaz intuitiva y responsiva.

## Características principales

- Registro e inicio de sesión de usuarios
- Autenticación segura con JWT y refresh token
- CRUD de tareas y grupos
- Asignación de tareas a grupos y colores personalizados
- Visualización de tareas en tablero Kanban y calendario
- Filtros avanzados y búsqueda de tareas
- Adjuntar archivos a tareas
- UI moderna y adaptable (mobile friendly)
- Manejo automático de expiración de sesión y refresh de token

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
    login/
    register/
  dashboard/
    board/
    calendar/
    tasks/[id]/
components/
  tasks/
  ui/
hooks/
lib/
public/
styles/
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

## Estructura de carpetas destacada

- `app/`: Rutas y páginas principales (Next.js App Router)
- `components/`: Componentes reutilizables (UI, tareas, formularios)
- `lib/`: Lógica de negocio, slices de Redux, API, utilidades
- `hooks/`: Custom hooks
- `public/`: Archivos estáticos
- `styles/`: Archivos CSS globales

## Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request para sugerencias o mejoras.

## Licencia

MIT
