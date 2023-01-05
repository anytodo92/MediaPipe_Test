import { baseApi } from './baseApi';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({ url: `/posts`, method: 'GET' }),
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `/posts`,
        method: 'POST',
        body: data,
      }),
    }),
    editPost: builder.mutation({
      query: (data) => ({
        url: `/posts/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
