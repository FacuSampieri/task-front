"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { logout } from "@/lib/features/auth/auth-slice"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, LayoutGrid, Calendar, Moon, Sun, LogOut, User, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { theme, setTheme } = useTheme()
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    // Eliminar la cookie 'token' (expiración en el pasado)
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/")
  }

  const navItems = [
    { href: "/dashboard", label: "Lista", icon: LayoutList },
    { href: "/dashboard/board", label: "Tablero", icon: LayoutGrid },
    { href: "/dashboard/calendar", label: "Calendario", icon: Calendar },
    { href: "/dashboard/groups", label: "Grupos", icon: LayoutGrid },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-xl font-bold">
              Tareas
            </Link>
            <nav className="hidden md:flex gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    asChild
                    className={cn(isActive && "font-semibold")}
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:flex"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Cambiar tema</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name} {user?.lastName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    {user?.phone && (
                      <p className="text-xs leading-none text-muted-foreground">{user.phone}</p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.open("https://t.me/task_manager74_bot", "_blank", "noopener,noreferrer")}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Conectar Telegram Bot</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="md:hidden" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  <span>Cambiar a {theme === "dark" ? "claro" : "oscuro"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
