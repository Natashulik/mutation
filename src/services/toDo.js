// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const toDoApi = createApi({
  reducerPath: "toDoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-redev.herokuapp.com/api/",
  }),
  endpoints: (builder) => ({
    getToDos: builder.query({
      query: () => {
        return {
          url: `todos?isCompleted=false`,
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWQ4QG1haWwucnUiLCJJRCI6IjYzNDYwYmE2ZjBiNjdjMWMzOGZlZGNlNSIsImlhdCI6MTY2ODMxMzQwMH0.9AAfnpTVdu4sUQjm7RXrqQkf0e_BgyL9iVeCuR6nD1s",
          },
        };
      },
    }),
    createToDo: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `todos`,
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWQ4QG1haWwucnUiLCJJRCI6IjYzNDYwYmE2ZjBiNjdjMWMzOGZlZGNlNSIsImlhdCI6MTY2ODMxMzQwMH0.9AAfnpTVdu4sUQjm7RXrqQkf0e_BgyL9iVeCuR6nD1s",
          },
          body: body,
        };
      },
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
      invalidatesTags: ["todos"],
    }),
    deleteToDo: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `todos/${id}`,
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZsYWQ4QG1haWwucnUiLCJJRCI6IjYzNDYwYmE2ZjBiNjdjMWMzOGZlZGNlNSIsImlhdCI6MTY2ODMxMzQwMH0.9AAfnpTVdu4sUQjm7RXrqQkf0e_BgyL9iVeCuR6nD1s",
          },
        };
      },
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
      invalidatesTags: ["deleteTosha"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetToDosQuery,
  useCreateToDoMutation,
  useDeleteToDoMutation,
} = toDoApi;