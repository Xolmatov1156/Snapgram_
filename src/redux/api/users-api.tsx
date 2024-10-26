import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getUser: build.query({
      query: (name) => ({
        url: `/api/user/profile/${name}`,
      }),
      providesTags: ["User"],
    }),
    getAllUser: build.query({
      query: () => ({
        url: `/api/user/all?limit=1000`,
      }),
      providesTags: ["User"],
    }),
    follow: build.mutation({
      query: (username) => ({
        url: `/api/user/${username}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getCurrentUserDatas: build.query({
      query:() => ({
        url: '/api/user/profile',
      }),
      providesTags: [{ type: 'User' }],
    }),
    updateUser: build.mutation({
      query:(body) => ({
        url:'/api/user/profile',
        method: "PUT",
        body
      }),
      invalidatesTags: [{type: 'User'}]
    }),

  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useFollowMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useGetCurrentUserDatasQuery,
  useUpdateUserMutation
} = userApi;
