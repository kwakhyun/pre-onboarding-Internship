export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
}

type TodoData = {
  data: ITodo;
};

type TodoList = {
  data: ITodo[];
};

export interface ITodoApiProps {
  createTodo: (todo: string) => Promise<TodoData>;
  getTodos: () => Promise<TodoList>;
  updateTodo: (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => Promise<TodoData>;
  deleteTodo: (id: number) => Promise<TodoData>;
}
