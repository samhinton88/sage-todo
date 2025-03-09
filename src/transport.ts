import { API_ROOT } from "./config";
import { TodoPayload, UpdateTodoPayload } from "./shared/types";

export const createTodo = async (data: TodoPayload) => {
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

export const listTodos = async () => {
  const res = await fetch(`${API_ROOT}/todo`);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
};

export const updateTodo = async (todoId: string, data: UpdateTodoPayload) => {
  const res = await fetch(`${API_ROOT}/todo/${todoId}`, {
    method: "PATCH", // allow for partial data payloads rather that PUT
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }

  return res.json();
};
