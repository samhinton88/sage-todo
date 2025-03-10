import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
  useListTodos,
} from "./hooks";
import { createTodo, updateTodo, deleteTodo, listTodos } from "./transport";

// mock the transport layer as it is tested elsewhere
vi.mock("./transport", () => {
  return {
    createTodo: vi.fn(),
    updateTodo: vi.fn(),
    deleteTodo: vi.fn(),
    listTodos: vi.fn(),
  };
});

let queryClient: QueryClient;

beforeEach(() => {
  queryClient = new QueryClient();
});

afterEach(() => {
  vi.resetAllMocks();
});

// A small wrapper that provides the QueryClient context to our hooks
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("hooks", () => {
  describe("useCreateTodo", () => {
    it('should successfully create a todo and invalidate the "todos" query', async () => {
      (createTodo as Mock).mockResolvedValueOnce({
        id: "123",
        content: "New Todo",
      });

      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => useCreateTodo(), { wrapper });
      await act(async () => {
        const response = await result.current.mutateAsync({
          content: "New Todo",
        });

        expect(response).toEqual({ id: "123", content: "New Todo" });
      });

      expect(createTodo).toHaveBeenCalledTimes(1);
      expect(createTodo).toHaveBeenCalledWith({ content: "New Todo" });

      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["todos"],
      });
    });

    it("should throw an error if createTodo fails", async () => {
      (createTodo as Mock).mockRejectedValueOnce(
        new Error("Failed to create todo")
      );

      const { result } = renderHook(() => useCreateTodo(), { wrapper });

      await expect(
        act(async () => {
          await result.current.mutateAsync({ content: "Failed Todo" });
        })
      ).rejects.toThrow("Failed to create todo");
    });
  });

  describe("useUpdateTodo", () => {
    it('should successfully update a todo and invalidate the "todos" query', async () => {
      (updateTodo as Mock).mockResolvedValueOnce({
        id: "123",
        content: "Updated Todo",
      });

      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");
      const { result } = renderHook(() => useUpdateTodo(), { wrapper });

      await act(async () => {
        const response = await result.current.mutateAsync({
          id: "123",
          data: { content: "Updated Todo" },
        });
        expect(response).toEqual({ id: "123", content: "Updated Todo" });
      });

      expect(updateTodo).toHaveBeenCalledTimes(1);

      expect(updateTodo).toHaveBeenCalledWith("123", {
        content: "Updated Todo",
      });

      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["todos"],
      });
    });

    it("should throw an error if updateTodo fails", async () => {
      (updateTodo as Mock).mockRejectedValueOnce(
        new Error("Failed to update todo")
      );

      const { result } = renderHook(() => useUpdateTodo(), { wrapper });

      await expect(
        act(async () => {
          await result.current.mutateAsync({
            id: "123",
            data: { content: "Failed Update" },
          });
        })
      ).rejects.toThrow("Failed to update todo");
    });
  });

  describe("useDeleteTodo", () => {
    it('should successfully delete a todo and invalidate the "todos" query', async () => {
      (deleteTodo as Mock).mockResolvedValueOnce({ success: true });

      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");
      const { result } = renderHook(() => useDeleteTodo(), { wrapper });

      await act(async () => {
        const response = await result.current.mutateAsync("123");
        expect(response).toEqual({ success: true });
      });

      expect(deleteTodo).toHaveBeenCalledTimes(1);
      expect(deleteTodo).toHaveBeenCalledWith("123");

      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["todos"],
      });
    });

    it("should throw an error if deleteTodo fails", async () => {
      (deleteTodo as Mock).mockRejectedValueOnce(
        new Error("Failed to delete todo")
      );

      const { result } = renderHook(() => useDeleteTodo(), { wrapper });

      await expect(
        act(async () => {
          await result.current.mutateAsync("123");
        })
      ).rejects.toThrow("Failed to delete todo");
    });
  });

  describe("useListTodos", () => {
    it("should fetch and return a list of todos", async () => {
      (listTodos as Mock).mockResolvedValueOnce([
        { id: "1", content: "First todo" },
        { id: "2", content: "Second todo" },
      ]);

      const { result } = renderHook(() => useListTodos(), { wrapper });

      await waitFor(() => result.current.isSuccess);

      expect(result.current.data).toEqual([
        { id: "1", content: "First todo" },
        { id: "2", content: "Second todo" },
      ]);
    });

    it.only("should handle errors if listTodos fails", async () => {
      (listTodos as Mock).mockRejectedValueOnce(
        new Error("Failed to fetch todos")
      );

      const { result } = renderHook(() => useListTodos(), { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(new Error("Failed to fetch todos"));
    });
  });
});
