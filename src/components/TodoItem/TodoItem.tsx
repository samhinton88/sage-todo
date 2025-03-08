import { Todo } from "../../shared/types";
import Box from "carbon-react/lib/components/box";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  return <Box>{todo.content}</Box>;
};
