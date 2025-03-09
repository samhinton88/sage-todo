import ButtonMinor from "carbon-react/lib/components/button-minor";
import { Todo } from "../../shared/types";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

export const TodoItem = ({
  todo,
  onClickMarkInProgress,
  onClickMarkComplete,
  onClickMarkPending,
  onClickDelete,
}: {
  todo: Todo;
  onClickMarkInProgress?: () => void;
  onClickMarkComplete?: () => void;
  onClickMarkPending?: () => void;
  onClickDelete?: () => void;
}) => {
  return (
    <Box
      flexDirection={"column"}
      width={"full"}
      display={"flex"}
      justifyContent={"space-between"}
      p={4}
      gap={2}
      borderRadius="borderRadius200"
      backgroundColor="white"
    >
      <Box>
        <Typography variant="h2">{todo.content}</Typography>
      </Box>
      <Box
        flexDirection={"row"}
        justifyContent={"flex-end"}
        display={"flex"}
        width={"full"}
        gap={1}
      >
        <ButtonMinor
          iconType="bin"
          aria-label="Delete Todo"
          iconTooltipMessage="Delete"
          size="small"
          onClick={onClickDelete}
        />
        {todo.status === "PENDING" && (
          <ButtonMinor
            // TODO: I'm not sure how intuitive this icon is, consider other options
            iconType="target"
            aria-label="Mark as In Progress"
            iconTooltipMessage="Mark as In Progress"
            size="small"
            onClick={onClickMarkInProgress}
          ></ButtonMinor>
        )}
        {todo.status === "IN PROGRESS" && (
          <>
            <ButtonMinor
              iconType="undo"
              aria-label="Return to Pending"
              iconTooltipMessage="Return to Pending"
              size="small"
              onClick={onClickMarkPending}
            ></ButtonMinor>
            <ButtonMinor
              iconType="tick_thick"
              iconTooltipMessage="Mark as Complete"
              aria-label="Mark as Complete"
              size="small"
              onClick={onClickMarkComplete}
            ></ButtonMinor>
          </>
        )}
        {todo.status === "COMPLETE" && (
          <ButtonMinor
            iconType="undo"
            aria-label="Return to Pending"
            iconTooltipMessage="Return to Pending"
            size="small"
            onClick={onClickMarkPending}
          ></ButtonMinor>
        )}
      </Box>
    </Box>
  );
};
