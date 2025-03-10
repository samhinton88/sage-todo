import Box from "carbon-react/lib/components/box";
import { CreateTodo } from "./components/CreateTodo";
import { TodoFlow } from "./components/TodoFlow/TodoFlow";
import { useListTodos, useTodoActions } from "./hooks";
import { TodoFlowActionType } from "./shared/types";
import { useState } from "react";
import Button from "carbon-react/lib/components/button";
import Dialog from "carbon-react/lib/components/dialog";
import GlobalHeader from "carbon-react/lib/components/global-header";

const App = () => {
  /*
    UI control state, for sure this component's responsibility.
  */
  const [createDialogueOpen, setCreateDialogueOpen] = useState(false);
  /*
    I have chosen to raise data fetching and interaction handling to
    the top of the component tree, allowing lower leaf components to
    be 'dumber'
   */

  // fetch our todos from the api
  const { data, isSuccess } = useListTodos();

  // provide the different handlers we need
  const {
    markAsComplete,
    markAsInProgress,
    markAsPending,
    deleteTodo,
    createTodo,
  } = useTodoActions();

  const handleTodoClick = (id: string, action: TodoFlowActionType) => {
    /*
      Lower components are set up to emit data when todos are being
      interacted with. 

      Lower-level components aren’t in charge of the actual business logic.
     
      Review: data is currently emitted with some degree of prop drilling
       consider using React context
      */
    switch (action) {
      case "MARK AS COMPLETE":
        markAsComplete(id);
        break;
      case "MARK AS IN PROGRESS":
        /*
          Here it would be trivial to use the todo state machine to
          block this action if e.g. it was a business requirement that
          only one task should be in progress at once:
          if (data.find(todo => todo.status === "IN PROGRESS")) {
           alert("Don't do two things at once!!")
           return
          }
         
         */
        markAsInProgress(id);
        break;
      case "MARK AS PENDING":
        markAsPending(id);
        break;
      case "DELETE":
        deleteTodo(id);
        break;
      default:
        throw new Error("Unknown Action " + action);
    }
  };
  // Review: consider moving handleTodoClick into the useTodoActions hook

  return (
    <Box backgroundColor="blackOpacity05" pt={8} height={"100vh"}>
      <GlobalHeader aria-label="Default global header component">
        SageTodo
      </GlobalHeader>
      <Box px={2} display={"flex"} justifyContent={"flex-end"}>
        {/* 
        Review: I wonder if it's clear what this button does, perhaps we could
        render text on wider viewports (check with design)
        */}
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
          {/* 
            NB: I attempted to make this list scrollable, but discovered
            strange behaviour https://www.loom.com/share/2c7a0c49716c480390b1a97fa394fc84?sid=15e894da-7529-4581-b167-8903429dcf1e
            where the icons didn't follow their parent buttons with an overflowY scroll. I'll investigate and create an issue on 
            GitHub if I have some time later.
          */}
          {isSuccess && <TodoFlow todos={data} onTodoClick={handleTodoClick} />}
        </Box>
        {/*
          Generally I prefer putting Dialog / modal UI on its own page, but I thought it would
          be fun to use the Carbon Component 
         */}
        <Dialog
          open={createDialogueOpen}
          onCancel={() => setCreateDialogueOpen(false)}
          title="Create New Todo"
          showCloseIcon
        >
          <CreateTodo
            onCancel={() => {
              setCreateDialogueOpen(false);
            }}
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
