"use client"

import { useState, useMemo } from "react"
import { useGetTasksQuery } from "@/lib/features/tasks/tasks-api"
import type { Task } from "@/lib/features/tasks/tasks-api"
import { useGetGroupsQuery } from "@/lib/features/groups/groups-api"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskList } from "@/components/tasks/task-list"
import { TaskFilters } from "@/components/tasks/task-filters"
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { TelegramPromoBanner } from "@/components/telegram-promo-banner"

export default function DashboardPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<Task["status"] | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<Task["priority"] | "all">("all")
  const [groupFilter, setGroupFilter] = useState<string | "all">("all")
  const { data: groups = [] } = useGetGroupsQuery()

  const queryParams = {
    status: statusFilter !== "all" ? statusFilter : undefined,
    priority: priorityFilter !== "all" ? priorityFilter : undefined,
    groupId: groupFilter !== "all" ? groupFilter : undefined,
  }
  const { data: tasks = [], isLoading, error } = useGetTasksQuery([queryParams])

  // Ordenar tareas: primero las que tienen fecha de finalización (ordenadas por fecha),
  // luego las que no tienen fecha
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : null
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : null

      // Si ambas tienen fecha, ordenar por fecha (más cercana primero)
      if (dateA !== null && dateB !== null) {
        return dateA - dateB
      }

      // Si solo una tiene fecha, la que tiene fecha va primero
      if (dateA !== null) return -1
      if (dateB !== null) return 1

      // Si ninguna tiene fecha, mantener orden original
      return 0
    })
  }, [tasks])

  return (
    <div className="container mx-auto px-4 py-8">
      <TelegramPromoBanner />
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Tareas</h1>
          <p className="text-muted-foreground">Organiza y gestiona todas tus tareas</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Button>
      </div>

      <TaskFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        groupFilter={groupFilter}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
        onGroupFilterChange={setGroupFilter}
        groups={groups}
      />

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
          <p className="text-destructive">Error al cargar las tareas. Por favor, intenta de nuevo.</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            {tasks.length === 0
              ? "No tienes tareas aún. ¡Crea tu primera tarea!"
              : "No hay tareas que coincidan con los filtros seleccionados."}
          </p>
        </div>
      ) : (
        <TaskList tasks={sortedTasks} groups={groups} />
      )}

      <CreateTaskDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  )
}
