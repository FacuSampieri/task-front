"use client"


import type { Task } from "@/lib/features/tasks/tasks-api"
import type { Group } from "@/lib/features/groups/groups-api"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskFiltersProps {
  statusFilter: Task["status"] | "all"
  priorityFilter: Task["priority"] | "all"
  groupFilter: string | "all"
  onStatusFilterChange: (status: Task["status"] | "all") => void
  onPriorityFilterChange: (priority: Task["priority"] | "all") => void
  onGroupFilterChange: (groupId: string | "all") => void
  groups: Group[]
}

export function TaskFilters({
  statusFilter,
  priorityFilter,
  groupFilter,
  onStatusFilterChange,
  onPriorityFilterChange,
  onGroupFilterChange,
  groups,
}: TaskFiltersProps) {
  const statusOptions: Array<{ value: Task["status"] | "all"; label: string }> = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "Pendiente" },
    { value: "in-progress", label: "En Progreso" },
    { value: "completed", label: "Completada" },
  ]

  const priorityOptions: Array<{ value: Task["priority"] | "all"; label: string }> = [
    { value: "all", label: "Todas" },
    { value: "LOW", label: "Baja" },
    { value: "MEDIUM", label: "Media" },
    { value: "HIGH", label: "Alta" },
  ]

  return (
    <div className="mb-6 space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">Estado</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusFilterChange(option.value)}
              className={cn(statusFilter === option.value && "shadow-sm")}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Prioridad</p>
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map((option) => (
            <Button
              key={option.value}
              variant={priorityFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onPriorityFilterChange(option.value)}
              className={cn(priorityFilter === option.value && "shadow-sm")}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Grupo</p>
        <Select onValueChange={onGroupFilterChange} defaultValue={groupFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Todos los grupos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: group.color }} />
                  {group.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
