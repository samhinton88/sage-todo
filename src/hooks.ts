import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ROOT } from "./config";
import { Todo, TodoPayload } from "./shared/types";

const createTodo = async (data: TodoPayload) => {
  const res = await fetch(`${API_ROOT}/todo`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }

  return res.json();
};

type CreateTodoResult = Todo;

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateTodoResult, Error, TodoPayload>({
    mutationFn: (data) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const listTodos = async () => {
  const res = await fetch(`${API_ROOT}/todo`);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
};

export const useListTodos = () => {
  return useQuery({ queryKey: ["todos"], queryFn: listTodos });
};
