"use client"

import { useState } from "react"
import type { Task } from "@/lib/features/tasks/tasks-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EditTaskForm } from "./edit-task-form"
import { TaskFiles } from "./task-files"
import { Calendar, Clock, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format, isPast } from "date-fns"
import { es } from "date-fns/locale"

interface TaskDetailViewProps {
  task: Task
}

export function TaskDetailView({ task }: TaskDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false)

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500/10 text-red-600 dark:text-red-400"
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      case "LOW":
        return "bg-green-500/10 text-green-600 dark:text-green-400"
    }
  }

  const getPriorityLabel = (priority: Task["priority"]) => {
    switch (priority) {
      case "HIGH":
        return "Alta"
      case "MEDIUM":
        return "Media"
      case "LOW":
        return "Baja"
    }
  }

  const getStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "in-progress":
        return "En Progreso"
      case "completed":
        return "Completada"
    }
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400"
      case "in-progress":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      case "completed":
        return "bg-green-500/10 text-green-600 dark:text-green-400"
    }
  }

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== "completed"

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{task.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {getPriorityLabel(task.priority)}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(task.status)}>
                    {getStatusLabel(task.status)}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? "Cancelar" : "Editar"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <EditTaskForm task={task} onSuccess={() => setIsEditing(false)} />
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Descripción</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{task.description || "Sin descripción"}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <TaskFiles taskId={task.id} />
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Fecha de Vencimiento</p>
                <p className={cn("text-sm", isOverdue && "text-destructive font-medium")}>
                  {task.dueDate
                    ? format(new Date(task.dueDate), "d 'de' MMMM, yyyy", { locale: es })
                    : "Sin fecha de vencimiento"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Última Actualización</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(task.updatedAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
