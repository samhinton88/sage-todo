import type { Meta, StoryObj } from "@storybook/react";

import { TodoFlow } from "./TodoFlow";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "TodoFlow",
  component: TodoFlow,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof TodoFlow>;
type Story = StoryObj<typeof meta>;

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    todos: [
      { content: "Eat dinner.", status: "PENDING", id: "0" },
      { content: "Make dinner.", status: "IN PROGRESS", id: "1" },
      {
        content: "Buy ingredients for dinner.",
        status: "COMPLETE",
        id: "2",
      },
    ],
    onTodoClick: () => {},
  },
};
