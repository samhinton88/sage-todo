import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Todo, TodoPayload } from "./shared/types";
import { createTodo, listTodos, updateTodo } from "./transport";

type CreateTodoResult = Todo;
type UpdateTodoResult = Todo;

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateTodoResult, Error, TodoPayload>({
    mutationFn: (data) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useListTodos = () => {
  return useQuery<Todo[]>({ queryKey: ["todos"], queryFn: listTodos });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateTodoResult,
    Error,
    { id: string; data: TodoPayload }
  >({
    mutationFn: ({ id, data }) => updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
