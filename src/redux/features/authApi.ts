import { baseApi } from "@/redux/baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER", "AUTH"],
    }),
    
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),
    
    resetPassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: passwordData,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    
    googleAuth: builder.query({
      query: (redirect = "/") => ({
        url: `/auth/google?redirect=${redirect}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation,
  useGoogleAuthQuery,
  useUserInfoQuery
} = authApi;