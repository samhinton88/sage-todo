import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import { Todo, TodoFlowActionType, TodoStatus } from "../../shared/types";
import { TodoItem } from "../TodoItem";

const TodoList = ({
  title,
  todos,
  onTodoClick,
}: {
  title: TodoStatus;
  todos: Todo[];
  onTodoClick: (id: string, action: TodoFlowActionType) => void;
}) => {
  return (
    <Box display={"flex"} flexDirection="column" marginBottom={4} gap={2}>
      <Typography marginY={1} variant="segment-header">
        {title}
      </Typography>
      {todos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            onClickMarkComplete={() => onTodoClick(todo.id, "MARK AS COMPLETE")}
            onClickMarkInProgress={() =>
              onTodoClick(todo.id, "MARK AS IN PROGRESS")
            }
            onClickMarkPending={() => onTodoClick(todo.id, "MARK AS PENDING")}
          />
        );
      })}
    </Box>
  );
};

export const TodoFlow = ({
  todos,
  onTodoClick,
}: {
  todos: Todo[];
  onTodoClick: (id: string, action: TodoFlowActionType) => void;
}) => {
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
          <TodoList
            key={status}
            todos={todos}
            title={status as TodoStatus}
            onTodoClick={onTodoClick}
          />
        );
      })}
    </Box>
  );
};
