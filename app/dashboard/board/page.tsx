"use client"

import { useState } from "react"
import { useGetTasksQuery } from "@/lib/features/tasks/tasks-api"
import type { Task } from "@/lib/features/tasks/tasks-api"
import { useGetGroupsQuery } from "@/lib/features/groups/groups-api"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskFilters } from "@/components/tasks/task-filters"
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog"
import { KanbanBoard } from "@/components/tasks/kanban-board"
import { Skeleton } from "@/components/ui/skeleton"

export default function BoardPage() {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tablero</h1>
          <p className="text-muted-foreground">Vista kanban de tus tareas</p>
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
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
          <p className="text-destructive">Error al cargar las tareas. Por favor, intenta de nuevo.</p>
        </div>
      ) : (
        <KanbanBoard tasks={tasks} groups={groups} />
      )}

      <CreateTaskDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  )
}
