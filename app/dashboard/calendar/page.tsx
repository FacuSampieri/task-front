"use client"

import { useState } from "react"
import { useGetTasksQuery } from "@/lib/features/tasks/tasks-api"
import { useGetGroupsQuery } from "@/lib/features/groups/groups-api"
import { Button } from "@/components/ui/button"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog"
import { CalendarView } from "@/components/tasks/calendar-view"
import { TaskFilters } from "@/components/tasks/task-filters"
import { Skeleton } from "@/components/ui/skeleton"
import { addMonths, subMonths, format } from "date-fns"
import { es } from "date-fns/locale"

export default function CalendarPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const [statusFilter, setStatusFilter] = useState<"pending" | "in-progress" | "completed" | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<"LOW" | "MEDIUM" | "HIGH" | "all">("all")
  const [groupFilter, setGroupFilter] = useState<string | "all">("all")
  const { data: groups = [] } = useGetGroupsQuery()
  const queryParams = {
    status: statusFilter !== "all" ? statusFilter : undefined,
    priority: priorityFilter !== "all" ? priorityFilter : undefined,
    groupId: groupFilter !== "all" ? groupFilter : undefined,
  }
  const { data: allTasks = [], isLoading, error } = useGetTasksQuery([queryParams])
  // Solo mostrar tareas con dueDate definido
  const tasks = allTasks.filter(task => !!task.dueDate)

  const handlePreviousMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
          <p className="text-muted-foreground">Vista de calendario de tus tareas</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Mes anterior</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Mes siguiente</span>
          </Button>
          <Button variant="outline" onClick={handleToday} className="ml-2 bg-transparent">
            Hoy
          </Button>
        </div>
        <h2 className="text-xl font-semibold capitalize">{format(currentDate, "MMMM yyyy", { locale: es })}</h2>
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
        <Skeleton className="h-[600px] w-full" />
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
          <p className="text-destructive">Error al cargar las tareas. Por favor, intenta de nuevo.</p>
        </div>
      ) : (
        <CalendarView tasks={tasks} currentDate={currentDate} groups={groups} />
      )}

      <CreateTaskDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  )
}
