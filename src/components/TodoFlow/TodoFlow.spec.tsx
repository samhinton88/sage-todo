import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TodoFlow } from "./TodoFlow";
import { TodoStatus } from "../../shared/types";

describe("TodoFlow", () => {
  test("renders a list of todos", async () => {
    const todos = [
      {
        id: "some-unique-id-0",
        content: "Something to be done",
        status: "PENDING" as TodoStatus,
      },
      {
        id: "some-unique-id-1",
        content: "Another thing to be done",
        status: "PENDING" as TodoStatus,
      },
    ];
    render(<TodoFlow todos={todos} onTodoClick={() => {}} />);

    const todoElements = await screen.findAllByText(/to be done/);

    expect(todoElements).toHaveLength(2);
  });

  test("emits the correct data when a child todo item is clicked", async () => {
    const todoItemClickedMock = vi.fn();
    const todos = [
      {
        id: "some-unique-id-0",
        content: "Something to be done",
        status: "PENDING" as TodoStatus,
      },
    ];
    render(<TodoFlow todos={todos} onTodoClick={todoItemClickedMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Mark as/i }));

    expect(todoItemClickedMock).toHaveBeenCalledWith(
      "some-unique-id-0",
      "MARK AS IN PROGRESS"
    );
  });

  test("segments todos by status", async () => {
    const todos = [
      {
        id: "some-unique-id-0",
        content: "Something to be done",
        status: "PENDING" as TodoStatus,
      },
      {
        id: "some-unique-id-0",
        content: "Something currently doing",
        status: "IN PROGRESS" as TodoStatus,
      },
      {
        id: "some-unique-id-1",
        content: "Another thing to be done",
        status: "COMPLETE" as TodoStatus,
      },
    ];
    render(<TodoFlow todos={todos} onTodoClick={() => {}} />);
    // Find the closest container for the "PENDING" segment
    const pendingHeader = screen.getByText("PENDING");
    const pendingSegment = pendingHeader.closest("div")!;

    // Verify that the pending container has "Something to be done"
    expect(
      within(pendingSegment).getByText("Something to be done")
    ).toBeInTheDocument();

    // Find the closest container for the "IN PROGRESS" segment
    const inProgressHeader = screen.getByText("IN PROGRESS");
    const inProgressSegment = inProgressHeader.closest("div")!;

    // Verify that the complete container has "Something currently doing"
    expect(
      within(inProgressSegment).getByText("Something currently doing")
    ).toBeInTheDocument();

    // Find the closest container for the "COMPLETE" segment
    const completeHeader = screen.getByText("COMPLETE");
    const completeSegment = completeHeader.closest("div")!;

    // Verify that the complete container has "Another thing to be done"
    expect(
      within(completeSegment).getByText("Another thing to be done")
    ).toBeInTheDocument();
  });
});
