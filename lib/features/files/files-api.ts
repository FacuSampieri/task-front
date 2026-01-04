import { apiSlice } from "@/lib/api/api-slice";

interface TaskFile {
  id: string;
  filename: string;
  path: string;
  mimeType: string;
  size: number;
  taskId: string;
  uploadedAt: string;
}

export const filesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<TaskFile, { taskId: string; file: File }>({
      query: ({ taskId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `files/${taskId}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { taskId }) => [
        { type: "File", id: taskId },
      ],
    }),
    getFiles: builder.query<TaskFile[], string>({
      query: (taskId) => `files/${taskId}`,
      providesTags: (result, error, taskId) => [{ type: "File", id: taskId }],
    }),
    downloadFile: builder.mutation<Blob, { taskId: string; fileId: string }>({
      query: ({ taskId, fileId }) => ({
        url: `files/download/${fileId}`,
        method: "GET",
      }),
      transformResponse: async (response: Response) => {
        const blob = await response.blob();
        return blob;
      },
    }),
    deleteFile: builder.mutation<void, { taskId: string; fileId: string }>({
      query: ({ fileId }) => ({
        url: `/files/delete/${fileId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFilesQuery,
  useDownloadFileMutation,
  useDeleteFileMutation,
} = filesApi;
