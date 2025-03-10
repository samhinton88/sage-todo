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
  // Review: does this need to be a separate component? Could avoid another level of prop drilling
  // by flattening this out into the parent
  return (
    <Box display={"flex"} flexDirection="column" marginBottom={4} gap={2}>
      <Typography marginY={1} variant="segment-header">
        {title}
      </Typography>
      {todos.map((todo) => {
        // Pass down handlers to the TodoItem on props so the child component can be dumber
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            onClickMarkComplete={() => onTodoClick(todo.id, "MARK AS COMPLETE")}
            onClickMarkInProgress={() =>
              onTodoClick(todo.id, "MARK AS IN PROGRESS")
            }
            onClickMarkPending={() => onTodoClick(todo.id, "MARK AS PENDING")}
            onClickDelete={() => onTodoClick(todo.id, "DELETE")}
          />
        );
      })}
    </Box>
  );
};

/**
 * TodoFlow is responsible for arranging Todos in a column which is divided by
 * todo status.
 *
 * It's a presentation component, so it doesn't manage state or interact with any
 * providers - this means it's easier to test.
 *
 * Currently the data flow pattern relies on prop drilling. I can see a refactor
 * where Todo state is controlled by using React Context - in this case it would
 * still make sense to create 'Display' only versions of components, which can
 * then be wrapped in context-aware parents.
 */
export const TodoFlow = ({
  todos,
  onTodoClick,
}: {
  todos: Todo[];
  onTodoClick: (id: string, action: TodoFlowActionType) => void;
}) => {
  // Divide the todos into different sections
  const todosBySection = todos.reduce(
    (acc, todo) => {
      acc[todo.status].push(todo);

      return acc;
    },
    // Object.entries respects the key order when creating object literals
    // so this will be the order the sections are shown to the user.
    {
      PENDING: [],
      "IN PROGRESS": [],
      COMPLETE: [],
    } as Record<TodoStatus, Todo[]>
  );

  return (
    <Box
      display={"flex"}
      flexGrow={1}
      px={1}
      flexDirection="column"
      overflowY={"scroll"}
    >
      {Object.entries(todosBySection).map(([status, todos]) => {
        return (
          <TodoList
            key={status}
            todos={todos}
            title={status as TodoStatus}
            // pass down the function to allow children to emit data back up tree
            onTodoClick={onTodoClick}
          />
        );
      })}
    </Box>
  );
};
