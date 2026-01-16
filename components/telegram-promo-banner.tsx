"use client"

import { AlertCircle, MessageCircle, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { useGetIntegrationStatusQuery } from "@/lib/features/auth/auth-api"

export function TelegramPromoBanner() {
  const [dismissed, setDismissed] = useState(false)
  const { data: integrationStatus, isLoading } = useGetIntegrationStatusQuery()
  
  const isConnected = integrationStatus?.telegramStatus === "connected"

  if (dismissed || isConnected || isLoading) return null

  return (
    <Alert className="border-cyan-500/20 bg-cyan-500/5 mb-6">
      <MessageCircle className="h-4 w-4 text-cyan-500" />
      <AlertTitle>Conecta con nuestro bot de Telegram</AlertTitle>
      <AlertDescription>
        Gestiona tus tareas directamente desde Telegram. Recibe notificaciones, marca tareas como completadas y crea nuevas tareas sin salir del chat.
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
