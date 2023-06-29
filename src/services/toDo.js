
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hdGljMkB0dXQuYnkiLCJpZCI6NzksImlhdCI6MTY4Nzk0MDYyOX0.IvOXh2bf-auqZrMQEzLovy--vdHGR0xZgCdPsWEWWNQ";
export const toDoApi = createApi({
  reducerPath: "toDoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-redev.herokuapp.com/api/",
  }),
  endpoints: (builder) => ({
    getToDos: builder.query({
      query: () => {
        return {
          url: `todos`,
          method: "GET",
          headers: {
            Authorization:  `Bearer ${token}`
          },
        };
      },
    }),
    createToDo: builder.mutation({
      query: (body) => {
        return {
          url: `todos`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
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
        return {
          url: `todos/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          },
        };
      },
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
      invalidatesTags: ["todos"],
    }),
    editToDo: builder.mutation({
      query: ({ id, newTitle }) => {
       return {
          url: `todos/${id}`,
          method: "PATCH",
          headers: {
            "Content-Type":  "application/json",
            Authorization: `Bearer ${token}`            
          },
          body: JSON.stringify({title: newTitle}),
        };
      },
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
      invalidatesTags: ["todos"],
    }),
    completeToDo: builder.mutation({
      query: ({id, isCompleted}) => {
      console.log({id, isCompleted})   
      return {
          url: `todos/${id}/isCompleted`,
          method: "PATCH",
          headers: {
            "Content-Type":  "application/json",
            Authorization: `Bearer ${token}`            
          },
          body: JSON.stringify({isCompleted: isCompleted}),
     };
      },
      transformResponse: (response, meta, arg) => {
        console.log(response); 
        return  response.data;
      } ,
      transformErrorResponse: (response, meta, arg) => response.status ,
      invalidatesTags: ["todos"],
    }),
  }),
});

export const {
  useGetToDosQuery,
  useCreateToDoMutation,
  useDeleteToDoMutation,
  useEditToDoMutation,
  useCompleteToDoMutation
} = toDoApi;
