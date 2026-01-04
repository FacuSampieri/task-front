import { apiSlice } from "@/lib/api/api-slice";
import { Task } from "../tasks/tasks-api";

export interface Group {
  id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

interface CreateGroupDto {
  name: string;
  color: string;
}

interface UpdateGroupDto {
  name?: string;
  color?: string;
}

export const groupsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<Group, CreateGroupDto>({
      query: (groupData) => ({
        url: "/groups",
        method: "POST",
        body: groupData,
      }),
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),
    getGroups: builder.query<Group[], void>({
      query: () => "/groups",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Group" as const, id })),
              { type: "Group", id: "LIST" },
            ]
          : [{ type: "Group", id: "LIST" }],
    }),
    getGroupById: builder.query<Group, string>({
      query: (groupId) => `/groups/${groupId}`,
      providesTags: (result, error, groupId) => [
        { type: "Group", id: groupId },
      ],
    }),
    updateGroup: builder.mutation<
      Group,
      { groupId: string; data: UpdateGroupDto }
    >({
      query: ({ groupId, data }) => ({
        url: `/groups/${groupId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: "Group", id: groupId },
      ],
    }),
    deleteGroup: builder.mutation<void, string>({
      query: (groupId) => ({
        url: `/groups/${groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, groupId) => [
        { type: "Group", id: groupId },
      ],
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
