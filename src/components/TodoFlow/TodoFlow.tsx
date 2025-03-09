import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import { Todo, TodoStatus } from "../../shared/types";
import { TodoItem } from "../TodoItem";

const TodoList = ({ title, todos }: { title: TodoStatus; todos: Todo[] }) => {
  return (
    <Box display={"flex"} flexDirection="column">
      <Typography variant="segment-header">{title}</Typography>
      {todos.map((todo) => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </Box>
  );
};

export const TodoFlow = ({ todos }: { todos: Todo[] }) => {
  const todosBySection = todos.reduce(
    (acc, todo) => {
      acc[todo.status].push(todo);

      return acc;
    },
    {
      PENDING: [],
      "IN PROGRESS": [],
      COMPLETE: [],
    } as Record<TodoStatus, Todo[]>
  );

  return (
    <Box display={"flex"} flexDirection="column">
      {Object.entries(todosBySection).map(([status, todos]) => {
        return (
          <TodoList key={status} todos={todos} title={status as TodoStatus} />
        );
      })}
    </Box>
  );
};
