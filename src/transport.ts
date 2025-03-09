import { API_ROOT } from "./config";
import { TodoPayload } from "./shared/types";

export const createTodo = async (data: TodoPayload) => {
  const res = await fetch(`${API_ROOT}/todo`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  console.log(res.status);
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
