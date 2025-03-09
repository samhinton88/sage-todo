import { CreateTodo } from "./components/CreateTodo";
import { TodoFlow } from "./components/TodoFlow/TodoFlow";
import { useCreateTodo, useListTodos } from "./hooks";

const App = () => {
  const { data, isSuccess } = useListTodos();
  const { mutateAsync: createTodo } = useCreateTodo();
  return (
    <div>
      {isSuccess && <TodoFlow todos={data} />}
      <CreateTodo onSubmit={createTodo} />
    </div>
  );
};

export default App;
