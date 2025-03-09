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

  test("renders a only mark as in progress button when PENDING", async () => {
    const todo = {
      id: "some-unique-id",
      content: "Something to be done",
      status: "PENDING" as TodoStatus,
    };
    render(<TodoItem todo={todo} />);

    expect(
      await screen.getByRole("button", { name: "Mark as In Progress" })
    ).toBeInTheDocument();
    expect(
      await screen.queryByRole("button", { name: "Mark as Pending" })
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByRole("button", { name: "Mark as Complete" })
    ).not.toBeInTheDocument();
  });

  test("renders a only return to pending and mark as complete buttons when IN PROGRESS", async () => {
    const todo = {
      id: "some-unique-id",
      content: "Something to be done",
      status: "IN PROGRESS" as TodoStatus,
    };
    render(<TodoItem todo={todo} />);

    expect(
      await screen.getByRole("button", { name: "Return to Pending" })
    ).toBeInTheDocument();
    expect(
      await screen.getByRole("button", { name: "Mark as Complete" })
    ).toBeInTheDocument();
    expect(
      await screen.queryByRole("button", { name: "Mark as In Progress" })
    ).not.toBeInTheDocument();
  });
});
