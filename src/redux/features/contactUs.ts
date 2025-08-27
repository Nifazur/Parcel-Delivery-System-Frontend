import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";

export interface IContactUs {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Contact Message (Public)
    createContactMessage: builder.mutation<IResponse<IContactUs>, Partial<IContactUs>>({
      query: (contactData) => ({
        url: "/contact-us",
        method: "POST",
        data: contactData,
      }),
      invalidatesTags: ["CONTACT_US"],
    }),

    // Get All Messages (Admin Only)
    getAllContactMessages: builder.query<IResponse<IContactUs[]>, void>({
      query: () => ({
        url: "/contact-us/all",
        method: "GET",
      }),
      providesTags: ["CONTACT_US"],
    }),

    // Get Single Message by ID (Admin Only)
    getContactMessageById: builder.query<IResponse<IContactUs>, string>({
      query: (id) => ({
        url: `/contact-us/${id}`,
        method: "GET",
      }),
      providesTags: ["CONTACT_US"],
    }),
  }),
});

export const {
  useCreateContactMessageMutation,
  useGetAllContactMessagesQuery,
  useGetContactMessageByIdQuery,
} = contactUsApi;