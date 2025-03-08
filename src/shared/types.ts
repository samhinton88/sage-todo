export type TodoPayload = {
  content: string;
};

export type TodoStatus = "PENDING" | "COMPLETE";

export type Todo = TodoPayload & { id: string; status: TodoStatus };
