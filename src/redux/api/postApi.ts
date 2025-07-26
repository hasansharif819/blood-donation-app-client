import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import { IMeta } from "@/types/common";
import { IDonor } from "@/types/donor";

export const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation({
      query: (data) => ({
        url: "posts/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.post],
    }),

    getAllPosts: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/posts",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          donors: response,
          meta,
        };
      },
      providesTags: [tagTypes.post],
    }),

    deletePost: build.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.post],
    }),

    //get single post
    getPost: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.post],
    }),

    // update a post
    updatePost: build.mutation({
      query: (data) => {
        return {
          url: `/posts/${data.id}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.post],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} = postApi;
