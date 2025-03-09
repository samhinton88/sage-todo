import Box from "carbon-react/lib/components/box";
import { CreateTodo } from "./components/CreateTodo";
import { TodoFlow } from "./components/TodoFlow/TodoFlow";
import { useCreateTodo, useListTodos, useTodoActions } from "./hooks";
import { TodoFlowActionType } from "./shared/types";
import { useState } from "react";
import Button from "carbon-react/lib/components/button";
import Dialog from "carbon-react/lib/components/dialog";
import GlobalHeader from "carbon-react/lib/components/global-header";

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
    <Box backgroundColor="blackOpacity05" pt={8} height={"100vh"}>
      <GlobalHeader aria-label="Default global header component">
        SageTodo
      </GlobalHeader>
      <Box px={2} display={"flex"} justifyContent={"flex-end"}>
        <Button
          buttonType="primary"
          size="large"
          iconType="plus"
          iconTooltipMessage="Create New Todo"
          onClick={() => {
            setCreateDialogueOpen(true);
          }}
        ></Button>
      </Box>
      <Box
        width={"full"}
        flexDirection={"row"}
        justifyItems={"center"}
        px={1}
        py={1}
        marginTop={4}
      >
        <Box minWidth="320px" maxWidth="1024px" width={"full"}>
          {isSuccess && <TodoFlow todos={data} onTodoClick={handleTodoClick} />}
        </Box>
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
    </Box>
  );
};

export default App;
