import Box from "carbon-react/lib/components/box";
import { CreateTodo } from "./components/CreateTodo";
import { TodoFlow } from "./components/TodoFlow/TodoFlow";
import { useCreateTodo, useListTodos, useTodoActions } from "./hooks";
import { TodoFlowActionType } from "./shared/types";
import { useState } from "react";
import Button from "carbon-react/lib/components/button";
import Dialog from "carbon-react/lib/components/dialog";

const App = () => {
  const { data, isSuccess } = useListTodos();
  const { mutateAsync: createTodo } = useCreateTodo();
  const [createDialogueOpen, setCreateDialogueOpen] = useState(false);
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
      <Button
        buttonType="primary"
        size="large"
        iconType="plus"
        onClick={() => {
          setCreateDialogueOpen(true);
        }}
      ></Button>

      <Dialog
        open={createDialogueOpen}
        onCancel={() => setCreateDialogueOpen(false)}
        title="Create New Todo"
        showCloseIcon
      >
        <CreateTodo
          onSubmit={async (data) => {
            await createTodo(data);
            setCreateDialogueOpen(false);
          }}
        />
      </Dialog>
    </Box>
  );
};

export default App;
