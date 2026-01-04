import { apiSlice } from "../../api/api-slice"

export interface Task {
  id: string
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
  priority: "LOW" | "MEDIUM" | "HIGH"
  dueDate?: string
  groupId?: string
  createdAt: string
  updatedAt: string
}

interface CreateTaskRequest {
  title: string
  description?: string
  status?: Task["status"]
  priority?: Task["priority"]
  dueDate?: string
  groupId?: string
}

interface UpdateTaskRequest {
  title?: string
  description?: string
  status?: Task["status"]
  priority?: Task["priority"]
  dueDate?: string
  groupId?: string
}

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], [{priority?: Task["priority"], status?: Task["status"], groupId?: Task["groupId"]}]>({
      query: ([{priority, status, groupId}]) => ({
        url: "/tasks/all",
        params: { priority, status, groupId }
      }),
      providesTags: ["Task"],
    }),
    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task, { id: string; data: UpdateTaskRequest }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Task", id }, "Task"],
    }),
    completeTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Task", id }, "Task"],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    })
  }),
})

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation
} = tasksApi
