import Button from "carbon-react/lib/components/button";
import { Todo } from "../../shared/types";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

export const TodoItem = ({
  todo,
  onClickMarkInProgress,
  onClickMarkComplete,
  onClickMarkPending,
}: {
  todo: Todo;
  onClickMarkInProgress?: () => void;
  onClickMarkComplete?: () => void;
  onClickMarkPending?: () => void;
}) => {
  return (
    <Box>
      <Box>
        <Typography>{todo.content}</Typography>
      </Box>
      <Box flexDirection={"row"}>
        {todo.status === "PENDING" && (
          <Button size="small" onClick={onClickMarkInProgress}>
            Mark as In Progress
          </Button>
        )}
        {todo.status === "IN PROGRESS" && (
          <>
            <Button size="small" onClick={onClickMarkPending}>
              Return to Pending
            </Button>
            <Button size="small" onClick={onClickMarkComplete}>
              Mark as Complete
            </Button>
          </>
        )}
        {todo.status === "COMPLETE" && (
          <Button size="small" onClick={onClickMarkPending}>
            Mark as Pending
          </Button>
        )}
      </Box>
    </Box>
  );
};
