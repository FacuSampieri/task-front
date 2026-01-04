"use client"

import Link from "next/link"
import type { Task } from "@/lib/features/tasks/tasks-api"
import { cn } from "@/lib/utils"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  isToday,
} from "date-fns"
import { es } from "date-fns/locale"

import type { Group } from "@/lib/features/groups/groups-api"

interface CalendarViewProps {
  tasks: Task[]
  currentDate: Date
  groups: Group[]
}

export function CalendarView({ tasks, currentDate, groups }: CalendarViewProps) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart, { locale: es })
  const calendarEnd = endOfWeek(monthEnd, { locale: es })

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false
      let dueDate: Date
      if (task.dueDate.includes('T')) {
        // Parse as UTC and shift to local date (ignore time zone offset)
        const d = new Date(task.dueDate)
        dueDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
      } else {
        // Fallback for 'YYYY-MM-DD'
        const [year, month, dayStr] = task.dueDate.split("-")
        dueDate = new Date(Number(year), Number(month) - 1, Number(dayStr))
      }
      return isSameDay(dueDate, day)
    })
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30"
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30"
      case "LOW":
        return "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30"
    }
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayTasks = getTasksForDay(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isDayToday = isToday(day)

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-30 border-r border-b p-2 transition-colors hover:bg-accent/5",
                !isCurrentMonth && "bg-muted/30",
                index % 7 === 6 && "border-r-0",
              )}
            >
              <div className="mb-1 flex items-center justify-center">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-sm",
                    !isCurrentMonth && "text-muted-foreground",
                    isDayToday && "bg-primary text-primary-foreground font-semibold",
                  )}
                >
                  {format(day, "d")}
                </span>
              </div>

              <div className="space-y-2">
                {dayTasks.slice(0, 3).map((task) => {
                  const group = groups.find(g => g.id === task.groupId)
                  return (
                    <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
                      <div
                        className={cn(
                          "rounded border px-1.5 py-1 text-xs font-medium transition-all hover:shadow-sm cursor-pointer mb-1",
                          getPriorityColor(task.priority),
                        )}
                        style={group ? { background: group.color, color: "#fff" } : undefined}
                      >
                        <p className="truncate">{task.title}</p>
                        {group && (
                          <span className="ml-1 text-xs">{group.name}</span>
                        )}
                      </div>
                    </Link>
                  )
                })}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center">+{dayTasks.length - 3} más</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
