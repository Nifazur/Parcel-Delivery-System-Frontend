import { baseApi } from "@/redux/baseApi";
import type { IResponse, IDivision } from "@/types";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDivisions: builder.query<IResponse<IDivision[]>, void>({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
    }),
    
    getDivisionById: builder.query<IResponse<IDivision>, string>({
      query: (id) => ({
        url: `/division/${id}`,
        method: "GET",
      }),
      providesTags: ["DIVISION"],
    }),
    
    createDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/register",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    
    updateDivision: builder.mutation({
      query: ({ id, ...divisionData }) => ({
        url: `/division/${id}`,
        method: "PUT",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    
    deleteDivision: builder.mutation({
      query: (id) => ({
        url: `/division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),
  }),
});

export const {
  useGetAllDivisionsQuery,
  useGetDivisionByIdQuery,
  useCreateDivisionMutation,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation,
} = divisionApi;