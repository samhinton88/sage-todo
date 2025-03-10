import { fireEvent, render, screen } from "@testing-library/react";

import { describe, expect, test, vi } from "vitest";
import { CreateTodo } from "./CreateTodo";

describe("<CreateTodo/>", () => {
  test("renders a form", async () => {
    // Provide an empty mock for onSubmit
    render(<CreateTodo onSubmit={() => {}} onCancel={() => {}} />);

    // Check for the labeled textarea and the buttons
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  test("captures data to create a todo on submit", () => {
    const onSubmitMock = vi.fn();
    render(<CreateTodo onSubmit={onSubmitMock} onCancel={() => {}} />);

    const textarea = screen.getByLabelText("Content");
    fireEvent.change(textarea, { target: { value: "my new todo" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({ content: "my new todo" });
    expect(textarea).toHaveValue("");
  });

  test("stops form submission when there is no content", async () => {
    const onSubmitMock = vi.fn();
    render(<CreateTodo onSubmit={onSubmitMock} onCancel={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  test("can be dismissed", async () => {
    const onCancelMock = vi.fn();
    render(<CreateTodo onSubmit={() => {}} onCancel={onCancelMock} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancelMock).toHaveBeenCalled();
  });
});
