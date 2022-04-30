import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    // const newTodos = [...incompleteTodos];
    // newTodos.splice(index, 1);
    const newTodos = removeOneItem([...incompleteTodos], index);
    setIncompleteTodos(newTodos);
  };

  const onClickDone = (index) => {
    // const newIncompleteTodos = [...incompleteTodos];
    // newIncompleteTodos.splice(index, 1);

    const newIncompleteTodos = removeOneItem([...incompleteTodos], index);
    setIncompleteTodos(newIncompleteTodos);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    // const newCompleteTodos = [...completeTodos];
    // newCompleteTodos.splice(index, 1);

    const newCompleteTodos = removeOneItem([...completeTodos], index);
    setCompleteTodos(newCompleteTodos);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  };

  const removeOneItem = (array, index) => {
    array.splice(index, 1);
    return array;
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length > 5 && (
        <p style={{ color: "red" }}>5個以上は登録できないですよ</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickDone={onClickDone}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
