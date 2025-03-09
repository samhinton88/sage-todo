import { describe, test, expect, afterAll, afterEach, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

import { server } from "./mocks/node";
import { seedTodos, dropTodos } from "./mocks/handlers";
import { AppWithProviders } from "./Providers";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  dropTodos();
});
afterAll(() => server.close());

describe("Todo", () => {
  test("renders a list of todos from an api", async () => {
    seedTodos({ content: "My test todo", status: "PENDING" });
    render(<AppWithProviders />);
    const todo = await screen.findByText("My test todo");

    expect(todo).toBeVisible();
  });
});
