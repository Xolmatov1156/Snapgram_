import { api } from "./index";

export const productApi = api.injectEndpoints({
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
    getFeed: build.query({
      query: () => ({
        url: "/api/user/feed?limit=3000",
      }),
      providesTags: ["User"],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: "/api/post",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    uploadFiles: build.mutation({
      query: (body) => ({
        url: '/api/upload/files',
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "User" }]
    }),
    getAllPostByUser: build.query({
      query: (username) => ({
        url: `/api/post/${username}`
      }),
      providesTags: ["User"],
    })
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useFollowMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useGetFeedQuery,
  useCreatePostMutation,
  useUploadFilesMutation,
  useGetAllPostByUserQuery,
} = productApi;
