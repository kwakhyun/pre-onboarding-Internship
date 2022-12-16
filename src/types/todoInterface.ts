export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
}

type ITodoData = {
  data: ITodo;
};

type ITodoList = {
  data: ITodo[];
};

export interface ITodoApiProps {
  createTodo: (todo: string) => Promise<ITodoData>;
  getTodos: () => Promise<ITodoList>;
  updateTodo: (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => Promise<ITodoData>;
  deleteTodo: (id: number) => Promise<ITodoData>;
}
