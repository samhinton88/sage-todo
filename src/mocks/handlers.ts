import { http, HttpResponse } from "msw";
import { API_ROOT } from "../config";
import { Todo, TodoStatus, UpdateTodoPayload } from "../shared/types";

const createId = () => crypto.randomUUID();
const createTodo = (data: Omit<Todo, "id" | "status">) => ({
  ...data,
  id: createId(),
  status: "PENDING" as TodoStatus,
});

let todos: Todo[] = [createTodo({ content: "test" })];
const addTodo = (data: Omit<Todo, "id">) => {
  const newTodo = createTodo(data);
  todos.push(newTodo);
};

const updateTodo = (id: string, data: UpdateTodoPayload) => {
  const toUpdateIndex = todos.findIndex((todo) => todo.id === id);
  const toUpdate = todos[toUpdateIndex];

  const updated = { ...toUpdate, ...data };
  // this is very inefficient but it's for development only
  todos = [
    ...todos.slice(0, toUpdateIndex),
    updated,
    ...todos.slice(toUpdateIndex + 1),
  ];

  return updated;
};

export const dropTodos = () => {
  todos = [];
};

export const seedTodos = (...todoData: Omit<Todo, "id">[]) => {
  const newTodos = todoData.map(createTodo);

  todos = newTodos;

  return newTodos;
};

export const handlers = [
  http.get(`${API_ROOT}/todo`, () => {
    return HttpResponse.json(todos);
  }),
  http.post<{}, Omit<Todo, "id">>(`${API_ROOT}/todo`, async ({ request }) => {
    // Read the intercepted request body as JSON.
    const todoData = await request.json();

    const newTodo = createTodo(todoData);
    addTodo(newTodo);

    return HttpResponse.json(newTodo, { status: 201 });
  }),
  http.patch<{ id: string }, UpdateTodoPayload>(
    `${API_ROOT}/todo/:id`,
    async ({ request, params }) => {
      // Read the intercepted request body as JSON.
      const todoData = await request.json();

      const updatedTodo = updateTodo(params.id, todoData);

      return HttpResponse.json(updatedTodo, { status: 201 });
    }
  ),
];
