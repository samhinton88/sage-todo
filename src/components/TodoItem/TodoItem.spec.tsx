import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TodoItem } from "./TodoItem";
import { TodoStatus } from "../../shared/types";

describe("TodoItem", () => {
  test("renders content for a todo", async () => {
    const todo = {
      id: "some-unique-id",
      content: "Something to be done",
      status: "PENDING" as TodoStatus,
    };
    render(<TodoItem todo={todo} />);

    expect(await screen.findByText("Something to be done")).toBeInTheDocument();
  });
});
