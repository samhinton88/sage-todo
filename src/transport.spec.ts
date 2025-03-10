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
import { createTodo, deleteTodo, listTodos, updateTodo } from "./transport";
import { CreateTodoPayload, UpdateTodoPayload } from "./shared/types";
import { API_ROOT } from "./config";

/* 
  This is the test suite with most bells and whistles so
  I'll put a few thoughts about testing in general.

  I've worked on teams which used the test runner structures
  to build up state via deep nesting, something like:

  describe('module X', () => {
    // logic to provision state X
    describe('case category X.Y', () => {
      // logic to provision state X.Y

      describe('case Z within X.Y', () => {
        // further state
        test() test() test()
      })
    })
  })

  Over time I've tended to prefer more 'anti patterns' such
  as just copy pasting, using string literals and
  repeating code for the sake of readability.
  The pay off is longer files, but in general it 
  seems to make devs happier.

  I enjoy the debate either way.

  Things to avoid:
  - bleeding state between suites
  - testing implementation detail rather than behaviour
  - making writing tests a terrible DevEx
  
  Things to encourage:
  - mocking
  - readability
*/

const postRequestMock = vi.fn();
const listRequestMock = vi.fn();
const patchRequestMock = vi.fn();
const deleteRequestMock = vi.fn();

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
  }),
  http.patch<{ id: string }, UpdateTodoPayload>(
    `${API_ROOT}/todo/:id`,
    async ({ request, params }) => {
      // Read the intercepted request body as JSON.
      const todoData = await request.json();

      patchRequestMock(params.id, todoData);

      return HttpResponse.json(
        { id: "fake-id-123", content: "My updated todo", status: "COMPLETE" },
        { status: 201 }
      );
    }
  ),
  http.delete<{ id: string }, UpdateTodoPayload>(
    `${API_ROOT}/todo/:id`,
    async ({ params }) => {
      // Read the intercepted request body as JSON.

      deleteRequestMock(params.id);

      return HttpResponse.json(true, { status: 201 });
    }
  )
);

// clean everything up so we don't bleed state
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

describe("transport", () => {
  describe("createTodo", async () => {
    test("makes a POST request and returns JSON on success", async () => {
      const newTodo: CreateTodoPayload = { content: "My test todo" };

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

  describe("updateTodo", async () => {
    test("makes a PATCH request and returns JSON on success", async () => {
      const data: UpdateTodoPayload = {
        content: "My updated todo",
        status: "COMPLETE",
      };

      const response = await updateTodo("fake-id-123", data);
      expect(patchRequestMock).toHaveBeenCalledWith("fake-id-123", data);
      // Confirm the returned JSON matches what the MSW handler gave us
      expect(response).toMatchObject({
        id: "fake-id-123",
        content: "My updated todo",
        status: "COMPLETE",
      });
    });

    test("throws a reasonable error when the response is not ok", async () => {
      // Override the default handler to return a 500 error
      server.use(
        http.patch(`${API_ROOT}/todo/:id`, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      // Expect updateTodo to reject with an error
      await expect(
        updateTodo("some-id", { content: "Will fail" })
      ).rejects.toThrowError("Failed to update todo");
    });
  });

  describe("deleteTodo", async () => {
    test("makes a DELETE request and returns true on success", async () => {
      const response = await deleteTodo("fake-id-123");
      expect(deleteRequestMock).toHaveBeenCalledWith("fake-id-123");
      // Confirm the returned JSON matches what the MSW handler gave us
      expect(response).toBe(true);
    });

    test("throws a reasonable error when the response is not ok", async () => {
      // Override the default handler to return a 500 error
      server.use(
        http.delete(`${API_ROOT}/todo/:id`, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      // Expect updateTodo to reject with an error
      await expect(deleteTodo("some-id")).rejects.toThrowError(
        "Failed to delete todo"
      );
    });
  });
});
