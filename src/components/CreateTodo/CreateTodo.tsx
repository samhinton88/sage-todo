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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleValueChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.content) {
      setErrors({});
    }
    setValue(target.value);
  };

  return (
    <Form
      onSubmit={(d) => {
        d.preventDefault();
        if (!value) {
          setErrors({ content: "Content cannot be empty" });
          return;
        }
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
      errorCount={Object.values(errors).length}
    >
      <Textarea
        required
        error={errors.content}
        label="Content"
        value={value}
        onChange={handleValueChange}
      />
    </Form>
  );
};
