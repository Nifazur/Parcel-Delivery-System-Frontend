import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IResponse<IUser[]>, void>({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: userData,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} = userApi;