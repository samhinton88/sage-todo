import { fireEvent, render, screen } from "@testing-library/react";

import { describe, expect, test, vi } from "vitest";
import { CreateTodo } from "./CreateTodo";

describe("<CreateTodo/>", () => {
  test("renders a form", async () => {
    // Provide an empty mock for onSubmit
    render(<CreateTodo onSubmit={() => {}} />);

    // Check for the labeled textarea and the buttons
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  test("captures data to create a todo on submit", () => {
    const onSubmitMock = vi.fn();
    render(<CreateTodo onSubmit={onSubmitMock} />);

    const textarea = screen.getByLabelText("Content");
    fireEvent.change(textarea, { target: { value: "my new todo" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({ content: "my new todo" });
    expect(textarea).toHaveValue("");
  });
});
