import type { Meta, StoryObj } from "@storybook/react";

import { CreateTodo } from "./CreateTodo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "CreateTodo",
  component: CreateTodo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof CreateTodo>;
type Story = StoryObj<typeof meta>;

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    onSubmit: () => {},
    onCancel: () => {},
  },
};
