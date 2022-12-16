import { useState } from "react";
import { todoAPI } from "../../shared/httpRequest";
import styled from "styled-components";

import { ITodo } from "../../types/todoInterface";

import Input from "../common/Input";
import Button from "../common/Button";

type TodoFormProps = {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

export default function TodoForm({ todos, setTodos }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    todoAPI.createTodo(newTodo.trim()).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo("");
    });
  };

  return (
    <StyledTodoForm>
      <Input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <Button
        type="button"
        onClick={handleAddTodo}
        disabled={newTodo.trim().length > 0 ? false : true}
        text="추가"
        width="60px"
        margin="0 0 0 10px"
      />
    </StyledTodoForm>
  );
}

const StyledTodoForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
