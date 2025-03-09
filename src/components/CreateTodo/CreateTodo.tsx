import { useState } from "react";
import Form from "carbon-react/lib/components/form";
import Button from "carbon-react/lib/components/button";
import Textarea from "carbon-react/lib/components/textarea";
import { TodoPayload } from "../../shared/types";

export const CreateTodo = ({
  onSubmit,
}: {
  onSubmit: (data: TodoPayload) => void;
}) => {
  const [value, setValue] = useState("");
  const handleValueChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return (
    <Form
      onSubmit={(d) => {
        d.preventDefault();
        setValue("");
        onSubmit({ content: value });
      }}
      leftSideButtons={
        <Button onClick={() => console.log("cancel")}>Cancel</Button>
      }
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter
    >
      <Textarea label="Content" value={value} onChange={handleValueChange} />
    </Form>
  );
};
