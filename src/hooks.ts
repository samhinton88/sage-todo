import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Todo, CreateTodoPayload, UpdateTodoPayload } from "./shared/types";
import { createTodo, deleteTodo, listTodos, updateTodo } from "./transport";

type CreateTodoResult = Todo;
type UpdateTodoResult = Todo;

/*
  I've chosen to use react-query from tanstack as it simplifies
  data fetching / caching / polling / status.

  Incidentally their router library is great, too.
*/
export const useListTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: listTodos,
    retry: false, // don't retry if it fails - this is also convenient for testing
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateTodoResult, Error, CreateTodoPayload>({
    mutationFn: (data) => createTodo(data),
    onSuccess: () => {
      /* 
        Invalidating the main get request which hydrates the app
        allows us to drastically simplify state management in the app.
      */
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
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
  /* 
    This hook composes together other hooks to form a single module 
    for handling user interaction with the system.

    Review: There isn't a great deal of error handling going on here,
    we could destructure the error objects from each of the hooks and 
    provided them from the hook:

    const { mutateAsync: createTodoAsync, isError: useCreateIsError } = useCreateTodo();
    
    return {
      // other stuff
      errors: { create: useCreateIsError }
    }

    Review: I don't think I see any tests for this.
  */
  const { mutateAsync: udpateTodoAsync } = useUpdateTodo();
  const { mutateAsync: deleteTodoAsync } = useDeleteTodo();
  const { mutateAsync: createTodoAsync } = useCreateTodo();

  const markAsPending = (id: string) =>
    udpateTodoAsync({ id, data: { status: "PENDING" } });
  const markAsComplete = (id: string) =>
    udpateTodoAsync({ id, data: { status: "COMPLETE" } });
  const markAsInProgress = (id: string) =>
    udpateTodoAsync({ id, data: { status: "IN PROGRESS" } });
  const deleteTodo = (id: string) => deleteTodoAsync(id);
  const createTodo = (data: CreateTodoPayload) => createTodoAsync(data);

  return {
    markAsComplete,
    markAsInProgress,
    markAsPending,
    deleteTodo,
    createTodo,
  };
};
