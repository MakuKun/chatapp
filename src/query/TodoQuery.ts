import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodo } from "../interface/Todo";

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001",
    }),
    tagTypes: ["Todos"],
    endpoints: (build) => ({
        getTodo: build.query<ITodo[], number | null>({
            query: () => `/todos`,
            providesTags: ["Todos"],
        }),
        addTodo: build.mutation<ITodo, Partial<ITodo>>({
            query: (body) => ({
                url: "/todos",
                method: "POST",
                body,
            }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: build.mutation<ITodo, Partial<ITodo>>({
            query: (body) => ({
                url: `/todos/${body.id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: build.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos'],
        })
    }),
});

export const { useGetTodoQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi;