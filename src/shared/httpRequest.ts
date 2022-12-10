import { api } from "./httpClient";

interface authApiProps {
  signup: (email: string, password: string) => Promise<any>;
  signin: (email: string, password: string) => Promise<any>;
}

interface todoApiProps {
  createTodo: (todo: string) => Promise<any>;
  getTodos: () => Promise<any>;
  updateTodo: (id: number, todo: string, isCompleted: boolean) => Promise<any>;
  deleteTodo: (id: number) => Promise<any>;
}

export const authAPI: authApiProps = {
  signup: (email, password) => {
    return api.post("/auth/signup", { email, password });
  },
  signin: (email, password) => {
    return api.post("/auth/signin", { email, password });
  },
};

export const todoAPI: todoApiProps = {
  createTodo: (todo) => api.post("/todos", { todo }),
  getTodos: () => api.get("/todos"),
  updateTodo: (id, todo, isCompleted) =>
    api.put(`/todos/${id}`, { todo, isCompleted }),
  deleteTodo: (id) => api.delete(`/todos/${id}`),
};
