import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { createTodo, listTodos } from "./transport";
import { TodoPayload } from "./shared/types";
import { API_ROOT } from "./config";

const postRequestMock = vi.fn();
const listRequestMock = vi.fn();

const dummyTodos = [
  {
    id: "fake-id-123",
    content: "My test todo",
    status: "PENDING",
  },
  {
    id: "fake-id-456",
    content: "My other test todo",
    status: "COMPLETE",
  },
];

const server = setupServer(
  http.get(`${API_ROOT}/todo`, () => {
    listRequestMock();
    return HttpResponse.json(dummyTodos);
  }),
  http.post(`${API_ROOT}/todo`, async ({ request }) => {
    const todoData = await request.json();
    postRequestMock(todoData);

    return HttpResponse.json(
      {
        id: "fake-id-123",
        content: "My test todo",
        status: "PENDING",
      },
      { status: 201 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

describe("transport", () => {
  describe("createTodo", async () => {
    test("makes a POST request and returns JSON on success", async () => {
      const newTodo: TodoPayload = { content: "My test todo" };

      const response = await createTodo(newTodo);
      expect(postRequestMock).toHaveBeenCalledWith(newTodo);
      // Confirm the returned JSON matches what the MSW handler gave us
      expect(response).toMatchObject({
        id: "fake-id-123",
        content: "My test todo",
        status: "PENDING",
      });
    });

    test("throws a reasonable error when the response is not ok", async () => {
      // Override the default handler to return a 500 error
      server.use(
        http.post(`${API_ROOT}/todo`, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      // Expect createTodo to reject with an error
      await expect(createTodo({ content: "Will fail" })).rejects.toThrowError(
        "Failed to create todo"
      );
    });
  });

  describe("listTodos", () => {
    test("makes a GET request and returns JSON on success", async () => {
      const response = await listTodos();
      expect(listRequestMock).toHaveBeenCalled();
      // Confirm the returned JSON matches what the MSW handler gave us
      expect(response).toMatchObject(dummyTodos);
    });

    test("throws a reasonable error when the response is not ok", async () => {
      // Override the default handler to return a 500 error
      server.use(
        http.get(`${API_ROOT}/todo`, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      // Expect createTodo to reject with an error
      await expect(listTodos()).rejects.toThrowError("Failed to fetch todos");
    });
  });
});
