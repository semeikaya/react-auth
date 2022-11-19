import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Todo from "../components/Todo";
import {
  addTodo,
  completeTodo,
  fetchTodos,
  removeTodo,
} from "../features/todos/todosSlice";

function Todos() {
  const [input, setInput] = useState("");
  const todos = useSelector((state) => state.todosReducer.todos);
  const loading = useSelector((state) => state.todosReducer.loading);
  const error = useSelector((state) => state.todosReducer.error);
  const dispatch = useDispatch();

  function handleRemove(id) {
    dispatch(removeTodo(id));
  }
  function hadleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit() {
    dispatch(addTodo(input));
    setInput("");
  }

  function makeMark(id) {
    dispatch(completeTodo(id));
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <div>"Загрузка..."</div>;
  }

  return (
    <>
      <Input
        handleSubmit={handleSubmit}
        hadleChange={hadleChange}
        input={input}
        setInput={setInput}
      />
      <div className="error" >{error}</div>
      <Todo
        handleRemove={handleRemove}
        makeMark={makeMark}
        todos={todos}
        error={error}
      />
    </>
  );
}

export default Todos;
