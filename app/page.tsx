import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Tareas</h1>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-balance">
            Gestiona tus tareas de forma simple y efectiva
          </h2>
          <p className="mb-8 text-xl text-muted-foreground text-pretty">
            Una aplicación minimalista de gestión de tareas que te ayuda a mantenerte organizado y productivo.
          </p>
          <div className="mb-12 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/auth/register">Comenzar Gratis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold">Múltiples Vistas</h3>
              <p className="text-sm text-muted-foreground">
                Lista, tablero kanban y calendario para visualizar tus tareas
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold">Prioridades y Filtros</h3>
              <p className="text-sm text-muted-foreground">Organiza tus tareas por prioridad y estado</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="h-10 w-10 text-primary" />
              <h3 className="text-lg font-semibold">Archivos Adjuntos</h3>
              <p className="text-sm text-muted-foreground">Adjunta archivos a tus tareas para mejor organización</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Tareas. Construido con Next.js</p>
        </div>
      </footer>
    </div>
  )
}
