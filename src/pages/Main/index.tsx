import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoForm from "../../components/todo/TodoForm";
import TodoItem from "../../components/todo/TodoItem";
import { todoAPI } from "../../shared/httpRequest";

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
}

export default function MainPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const navigate = useNavigate();

  const handleGetTodos = () => {
    todoAPI.getTodos().then(({ data }) => {
      setTodos(data);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleGetTodos();
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <StyledMain>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>

      <div className="todo-form">
        <div className="title">To-do list</div>
        <TodoForm todos={todos} setTodos={setTodos} />
      </div>

      <div className="todo-list">
        {todos.filter((todo) => todo.isCompleted === false).length > 0 && (
          <div className="title section">📝 To-do</div>
        )}
        {todos?.map((todo) => {
          return !todo.isCompleted ? (
            <TodoItem
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
            />
          ) : null;
        })}

        {todos.filter((todo) => todo.isCompleted === true).length > 0 && (
          <div className="title section">✅ Done</div>
        )}
        {todos?.map((todo) => {
          return todo.isCompleted ? (
            <TodoItem
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
            />
          ) : null;
        })}
      </div>
    </StyledMain>
  );
}

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  max-width: 600px;
  min-width: 400px;

  .title {
    font-size: 24px;
    font-weight: 600;
    margin: 20px 0;
    &.section {
      width: 90%;
      margin-top: 30px;
    }
  }

  .logout {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: #f5f5f5;
    font-size: 14px;
    font-weight: 600;
  }

  .todo-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;
