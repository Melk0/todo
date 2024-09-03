import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Убедитесь, что /api корректен
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
      providesTags: ['Todo'], // Добавьте теги для кэширования
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Todo'], // Инвалидируйте кэш после добавления
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Todo'], // Инвалидируйте кэш после обновления
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'], // Инвалидируйте кэш после удаления
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi;
