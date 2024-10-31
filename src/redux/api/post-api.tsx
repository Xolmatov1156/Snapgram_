import { api } from "./index";

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    like: build.mutation({
      query: (username) => ({
        url: `/api/post/${username}/like`,
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
        url: "/api/upload/files",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getAllPostByUser: build.query({
      query: (username) => ({
        url: `/api/post/${username}`,
      }),
      providesTags: ["User"],
    }),
    comment: build.mutation({
      query: (username) => ({
        url: `/api/comment/${username}`,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetFeedQuery,
  useCreatePostMutation,
  useUploadFilesMutation,
  useGetAllPostByUserQuery,
  useLikeMutation,
  useCommentMutation,
} = postApi;
