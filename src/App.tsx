import Box from "carbon-react/lib/components/box";
import { CreateTodo } from "./components/CreateTodo";
import { TodoFlow } from "./components/TodoFlow/TodoFlow";
import { useCreateTodo, useListTodos, useTodoActions } from "./hooks";
import { TodoFlowActionType } from "./shared/types";

const App = () => {
  const { data, isSuccess } = useListTodos();
  const { mutateAsync: createTodo } = useCreateTodo();
  const { markAsComplete, markAsInProgress, markAsPending } = useTodoActions();
  const handleTodoClick = (id: string, action: TodoFlowActionType) => {
    switch (action) {
      case "MARK AS COMPLETE":
        markAsComplete(id);
        break;
      case "MARK AS IN PROGRESS":
        markAsInProgress(id);
        break;
      case "MARK AS PENDING":
        markAsPending(id);
        break;

      default:
        throw new Error("Unknown Action " + action);
    }
  };
  return (
    <Box>
      {isSuccess && <TodoFlow todos={data} onTodoClick={handleTodoClick} />}
      <CreateTodo onSubmit={createTodo} />
    </Box>
  );
};

export default App;
