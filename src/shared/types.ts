/*
  It generally makes sense to create single source of truth
  for any shared types in the system.
*/
export type CreateTodoPayload = {
  content: string;
};

export type UpdateTodoPayload = {
  content?: string;
  status?: TodoStatus;
};

export type TodoStatus = "PENDING" | "COMPLETE" | "IN PROGRESS";
export type TodoFlowActionType = `MARK AS ${TodoStatus}` | "DELETE";

export type Todo = CreateTodoPayload & { id: string; status: TodoStatus };
