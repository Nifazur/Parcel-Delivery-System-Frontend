import { baseApi } from "@/redux/baseApi";
import type { IResponse, IParcel, ParcelStatus, Parcel } from "@/types";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation({
      query: (parcelData) => ({
        url: "/parcel/create",
        method: "POST",
        data: parcelData,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    
    getParcelById: builder.query<IResponse<IParcel>, string>({
      query: (id) => ({
        url: `/parcel/${id}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
    
    trackParcel: builder.query<IResponse<Partial<IParcel>>, string>({
      query: (trackingId) => ({
        url: `/parcel/track/${trackingId}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
    
    getMySentParcels: builder.query<IResponse<Parcel[]>, ParcelStatus | undefined>({
      query: (status) => ({
        url: "/parcel/sent",
        method: "GET",
        params: status ? { status } : undefined,
      }),
      providesTags: ["PARCEL"],
    }),
    
    getMyReceivedParcels: builder.query<IResponse<IParcel[]>, ParcelStatus | undefined>({
      query: (status) => ({
        url: "/parcel/received",
        method: "GET",
        params: status ? { status } : undefined,
      }),
      providesTags: ["PARCEL"],
    }),
    
    getAllParcels: builder.query<
      IResponse<{ parcels: IParcel[]; total: number; page: number; pages: number }>,
      { page?: number; limit?: number; status?: ParcelStatus }
    >({
      query: ({ page = 1, limit = 10, status }) => ({
        url: "/parcel/all",
        method: "GET",
        params: { page, limit, ...(status && { status }) },
      }),
      providesTags: ["PARCEL"],
    }),
    
    getMyParcels: builder.query<IResponse<{
      delivered: IParcel[];
      received: IParcel[];
      cancelled: IParcel[];
    }>, void>({
      query: () => ({
        url: "/parcel/my-parcel-history",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
    
    updateParcelStatus: builder.mutation({
      query: ({ id, statusData }) => ({
        url: `/parcel/status/${id}`,
        method: "PATCH",
        data: statusData,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    
    cancelParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    
    confirmDelivery: builder.mutation({
      query: (id) => ({
        url: `/parcel/confirm-delivery/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    
    blockParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    
    unblockParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    
    getParcelStatistics: builder.query<IResponse<{
      total: number;
      byStatus: Array<{ _id: string; count: number; totalFee: number }>;
      totalRevenue: number;
    }>, void>({
      query: () => ({
        url: "/parcel/admin/statistics",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useGetParcelByIdQuery,
  useTrackParcelQuery,
  useGetMySentParcelsQuery,
  useGetMyReceivedParcelsQuery,
  useGetAllParcelsQuery,
  useGetMyParcelsQuery,
  useUpdateParcelStatusMutation,
  useCancelParcelMutation,
  useConfirmDeliveryMutation,
  useBlockParcelMutation,
  useUnblockParcelMutation,
  useGetParcelStatisticsQuery,
} = parcelApi;