"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, ExternalLink, CheckCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useGetIntegrationStatusQuery } from "@/lib/features/auth/auth-api"

export default function IntegrationsPage() {
  const TELEGRAM_BOT_URL = "https://t.me/task_manager74_bot"
  const { data: integrationStatus, isLoading } = useGetIntegrationStatusQuery()
  
  const isConnected = integrationStatus?.telegramStatus === "connected"

  const handleTelegramConnect = () => {
    window.open(TELEGRAM_BOT_URL, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Integraciones</h1>
        <p className="text-muted-foreground">Conecta tu cuenta con otros servicios para mejorar tu productividad</p>
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
                  <div className="flex items-center gap-2">
                    <CardTitle>Telegram Bot</CardTitle>
                    {isLoading ? (
                      <Badge variant="outline" className="ml-2">
                        <Clock className="h-3 w-3 mr-1" />
                        Verificando...
                      </Badge>
                    ) : isConnected ? (
                      <Badge className="ml-2 bg-green-500/20 text-green-700 border-green-500/30">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Conectado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="ml-2">
                        No conectado
                      </Badge>
                    )}
                  </div>
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
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
                  Marcar tareas como completadas directamente en el chat
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
                  Recibir recordatorios de tareas próximas
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
                  Crear nuevas tareas directamente desde Telegram
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-4">
              {isConnected ? (
                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
                  <p className="text-sm text-green-700 font-medium">
                    ✅ Tu cuenta está conectada con Telegram Bot
                  </p>
                </div>
              ) : (
                <p className="text-sm">
                  Haz clic en el botón de abajo para conectar tu cuenta con nuestro bot de Telegram. Una vez conectado, podrás gestionar todas tus tareas desde la aplicación de Telegram.
                </p>
              )}
              
              <Button
                onClick={handleTelegramConnect}
                className="w-full bg-cyan-500 hover:bg-cyan-600"
                disabled={isLoading}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {isConnected ? "Ir al Bot de Telegram" : "Conectar con Telegram Bot"}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Se abrirá una nueva ventana para conectarte con el bot @task_manager74_bot
              </p>
            </div>
          </CardContent>
        </Card>

        {/* More integrations can be added here in the future */}
        <Card className="opacity-50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-500/10 p-3">
                  <ExternalLink className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <CardTitle>Más integraciones próximamente</CardTitle>
                  <CardDescription>Estamos trabajando en nuevas integraciones</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Estamos desarrollando integraciones con otros servicios populares. Vuelve pronto para más opciones.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
