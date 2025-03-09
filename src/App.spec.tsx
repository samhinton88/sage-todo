import { describe, test, expect, afterAll, afterEach, beforeAll } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

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

  test("allows a user to create a new todo", async () => {
    seedTodos({ content: "My test todo", status: "PENDING" });
    render(<AppWithProviders />);

    fireEvent.click(screen.getByLabelText("plus"));

    const textarea = screen.getByLabelText("Content");
    fireEvent.change(textarea, { target: { value: "my new todo" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    const todo = await screen.findByText("my new todo");

    expect(todo).toBeVisible();
  });
});
