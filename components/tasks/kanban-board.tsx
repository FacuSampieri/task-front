"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import type { Task } from "@/lib/features/tasks/tasks-api"
import { useUpdateTaskMutation, useDeleteTaskMutation } from "@/lib/features/tasks/tasks-api"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Calendar, AlertCircle, Trash2, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, isPast } from "date-fns"
import { es } from "date-fns/locale"

import type { Group } from "@/lib/features/groups/groups-api"

interface KanbanBoardProps {
  tasks: Task[]
  groups: Group[]
}

interface Column {
  status: Task["status"]
  title: string
  color: string
}

const columns: Column[] = [
  { status: "pending", title: "Pendiente", color: "bg-gray-100 dark:bg-gray-900" },
  { status: "in-progress", title: "En Progreso", color: "bg-blue-50 dark:bg-blue-950/30" },
  { status: "completed", title: "Completada", color: "bg-green-50 dark:bg-green-950/30" },
]

export function KanbanBoard({ tasks, groups }: KanbanBoardProps) {
  const { toast } = useToast()
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (status: Task["status"]) => {
    if (!draggedTask) return

    try {
      await updateTask({
        id: draggedTask,
        data: { status },
      }).unwrap()

      toast({
        title: "Tarea actualizada",
        description: "El estado de la tarea se ha actualizado",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la tarea",
        variant: "destructive",
      })
    } finally {
      setDraggedTask(null)
    }
  }

  const handleDelete = async (taskId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return

    try {
      await deleteTask(taskId).unwrap()
      toast({
        title: "Tarea eliminada",
        description: "La tarea se ha eliminado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la tarea",
        variant: "destructive",
      })
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

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.status)

        return (
          <div
            key={column.status}
            className={cn("rounded-lg p-4", column.color)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.status)}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">{column.title}</h3>
              <Badge variant="secondary" className="ml-2">
                {columnTasks.length}
              </Badge>
            </div>

            <div className="space-y-4">
              {columnTasks.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">No hay tareas aquí</p>
              ) : (
                columnTasks.map((task) => {
                  let isOverdue = false;
                  let dueDateObj: Date | undefined = undefined;
                  if (task.dueDate) {
                    if (task.dueDate.includes('T')) {
                      // Parse as UTC and shift to local date (ignore time zone offset)
                      const d = new Date(task.dueDate);
                      dueDateObj = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
                    } else {
                      const [year, month, dayStr] = task.dueDate.split("-");
                      dueDateObj = new Date(Number(year), Number(month) - 1, Number(dayStr));
                    }
                    if (dueDateObj && !isNaN(dueDateObj.getTime())) {
                      isOverdue = isPast(dueDateObj) && task.status !== "completed";
                    } else {
                      dueDateObj = undefined;
                    }
                  }
                  const group = groups.find(g => g.id === task.groupId)

                  return (
                    <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
                      <Card
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        className={cn(
                          "cursor-move p-3 transition-all hover:shadow-md mb-2",
                          isOverdue && "border-destructive",
                        )}
                        style={group ? { borderLeft: `8px solid ${group.color}` } : {}}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2 flex-1">
                              <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <h4 className="font-medium leading-tight text-sm">{task.title}</h4>
                              {group && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ml-2" style={{ background: group.color, color: "#fff" }}>
                                  {group.name}
                                </span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleDelete(task.id, e)}
                              className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>

                          {task.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                          )}

                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            {/* Priority as a tab/label */}
                            <span
                              className={cn(
                                "rounded-t-md px-3 py-1 text-xs font-semibold border-b-2",
                                task.priority === "HIGH" && "border-red-500 bg-red-600/80",
                                task.priority === "MEDIUM" && "border-yellow-500 bg-yellow-600/80",
                                task.priority === "LOW" && "border-green-500 bg-green-600/80"
                              )}
                              style={{ color: '#fff' }}
                            >
                              {getPriorityLabel(task.priority)}
                            </span>

                            {dueDateObj && (
                              <div
                                className={cn(
                                  "flex items-center gap-1 text-xs",
                                  isOverdue ? "text-destructive font-medium" : "text-muted-foreground",
                                )}
                              >
                                {isOverdue ? <AlertCircle className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
                                {format(dueDateObj, "d MMM", { locale: es })}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  )
                })
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
