"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useGetTaskQuery, useCompleteTaskMutation, useDeleteTaskMutation } from "@/lib/features/tasks/tasks-api"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, CheckCircle2, Trash2 } from "lucide-react"
import { TaskDetailView } from "@/components/tasks/task-detail-view"
import { useToast } from "@/hooks/use-toast"

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { toast } = useToast()

  const { data: task, isLoading, error } = useGetTaskQuery(resolvedParams.id)
  const [completeTask, { isLoading: isCompleting }] = useCompleteTaskMutation()
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation()

  const handleComplete = async () => {
    try {
      await completeTask(resolvedParams.id).unwrap()
      toast({
        title: "Tarea completada",
        description: "La tarea se ha marcado como completada",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la tarea",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return

    try {
      await deleteTask(resolvedParams.id).unwrap()
      toast({
        title: "Tarea eliminada",
        description: "La tarea se ha eliminado correctamente",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la tarea",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  if (error || !task) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
          <p className="text-destructive">No se pudo cargar la tarea. Por favor, intenta de nuevo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        <div className="flex gap-2">
          {task.status !== "completed" && (
            <Button onClick={handleComplete} disabled={isCompleting} variant="outline">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {isCompleting ? "Completando..." : "Marcar como Completada"}
            </Button>
          )}
          <Button onClick={handleDelete} disabled={isDeleting} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </div>

      <TaskDetailView task={task} />
    </div>
  )
}
