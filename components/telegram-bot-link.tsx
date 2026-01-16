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
