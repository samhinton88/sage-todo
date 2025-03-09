import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Todo, TodoPayload, UpdateTodoPayload } from "./shared/types";
import { createTodo, deleteTodo, listTodos, updateTodo } from "./transport";

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
    { id: string; data: UpdateTodoPayload }
  >({
    mutationFn: ({ id, data }) => updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<true, Error, string>({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useTodoActions = () => {
  const { mutateAsync: udpateTodoAsync } = useUpdateTodo();
  const { mutateAsync: deleteTodoAsync } = useDeleteTodo();

  const markAsPending = (id: string) =>
    udpateTodoAsync({ id, data: { status: "PENDING" } });
  const markAsComplete = (id: string) =>
    udpateTodoAsync({ id, data: { status: "COMPLETE" } });
  const markAsInProgress = (id: string) =>
    udpateTodoAsync({ id, data: { status: "IN PROGRESS" } });
  const deleteTodo = (id: string) => deleteTodoAsync(id);

  return { markAsComplete, markAsInProgress, markAsPending, deleteTodo };
};
