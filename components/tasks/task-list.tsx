"use client";

import type React from "react";

import Link from "next/link";
import type { Task } from "@/lib/features/tasks/tasks-api";
import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} from "@/lib/features/tasks/tasks-api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isPast } from "date-fns";
import { es } from "date-fns/locale";

import type { Group } from "@/lib/features/groups/groups-api";

interface TaskListProps {
  tasks: Task[];
  groups: Group[];
}

export function TaskList({ tasks, groups }: TaskListProps) {
  const { toast } = useToast();
  const [completeTask] = useCompleteTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleComplete = async (taskId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await completeTask(taskId).unwrap();
      toast({
        title: "Tarea completada",
        description: "La tarea se ha marcado como completada",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la tarea",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (taskId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return;

    try {
      await deleteTask(taskId).unwrap();
      toast({
        title: "Tarea eliminada",
        description: "La tarea se ha eliminado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la tarea",
        variant: "destructive",
      });
    }
  };

  const getPriorityLabel = (priority: Task["priority"]) => {
    switch (priority) {
      case "HIGH":
        return "Alta";
      case "MEDIUM":
        return "Media";
      case "LOW":
        return "Baja";
    }
  };

  const getStatusLabel = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "in-progress":
        return "En Progreso";
      case "completed":
        return "Completada";
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
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
        const group = groups.find((g) => g.id === task.groupId);
        return (
          <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
            <Card
              className={cn(
                "p-4 transition-all hover:shadow-md mb-2.5",
                task.status === "completed" && "opacity-60",
                isOverdue && "border-destructive"
              )}
              style={group ? { borderLeft: `8px solid ${group.color}` } : {}}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1" onClick={(e) => e.preventDefault()}>
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={(checked) => {
                      if (checked)
                        handleComplete(task.id, {} as React.MouseEvent);
                    }}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3
                      className={cn(
                        "font-semibold leading-tight",
                        task.status === "completed" &&
                          "line-through text-muted-foreground"
                      )}
                    >
                      {task.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 items-center">
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
                      <Badge variant="secondary">
                        {getStatusLabel(task.status)}
                      </Badge>
                      {group && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: group.color, color: "#fff" }}
                        >
                          {group.name}
                        </span>
                      )}
                    </div>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {dueDateObj && !isNaN(dueDateObj.getTime()) && (
                        <div
                          className={cn(
                            "flex items-center gap-1",
                            isOverdue && "text-destructive font-medium"
                          )}
                        >
                          {isOverdue ? (
                            <AlertCircle className="h-3 w-3" />
                          ) : (
                            <Calendar className="h-3 w-3" />
                          )}
                          {format(dueDateObj, "d 'de' MMMM, yyyy", {
                            locale: es,
                          })}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDelete(task.id, e)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar tarea</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
