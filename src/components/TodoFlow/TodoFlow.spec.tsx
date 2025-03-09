import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TodoFlow } from "./TodoFlow";
import { TodoStatus } from "../../shared/types";

describe("TodoFlow", () => {
  test("renders content for a todo", async () => {
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
    render(<TodoFlow todos={todos} />);

    const todoElements = await screen.findAllByText(/to be done/);

    expect(todoElements).toHaveLength(2);
  });

  test("segments todos by status", async () => {
    const todos = [
      {
        id: "some-unique-id-0",
        content: "Something to be done",
        status: "PENDING" as TodoStatus,
      },
      {
        id: "some-unique-id-1",
        content: "Another thing to be done",
        status: "COMPLETE" as TodoStatus,
      },
    ];
    render(<TodoFlow todos={todos} />);
    // Find the closest container for the "PENDING" segment
    const pendingHeader = screen.getByText("PENDING");
    const pendingSegment = pendingHeader.closest("div")!;

    // Verify that the pending container has "Something to be done"
    expect(
      within(pendingSegment).getByText("Something to be done")
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
