import type { Meta, StoryObj } from "@storybook/react";

import { TodoItem } from "./TodoItem";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "TodoItem",
  component: TodoItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof TodoItem>;
type Story = StoryObj<typeof meta>;

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Pending: Story = {
  args: {
    todo: { content: "Feed the cat", status: "PENDING", id: "0" },
  },
};

export const Complete: Story = {
  args: {
    todo: { content: "Feed the cat", status: "COMPLETE", id: "0" },
  },
};
