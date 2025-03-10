import { API_ROOT } from "./config";
import { CreateTodoPayload, UpdateTodoPayload } from "./shared/types";

/*
  This module separates out the logic for making requests to the API
*/
export const createTodo = async (data: CreateTodoPayload) => {
  const res = await fetch(`${API_ROOT}/todo`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    // React Query needs us to actively throw an exception here
    throw new Error("Failed to create todo");
  }

  return res.json();
};

export const listTodos = async () => {
  const res = await fetch(`${API_ROOT}/todo`);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
};

export const updateTodo = async (todoId: string, data: UpdateTodoPayload) => {
  const res = await fetch(`${API_ROOT}/todo/${todoId}`, {
    method: "PATCH", // allow for partial data payloads rather tha PUT
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }

  return res.json();
};

export const deleteTodo = async (todoId: string) => {
  const res = await fetch(`${API_ROOT}/todo/${todoId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }

  return res.json();
};
