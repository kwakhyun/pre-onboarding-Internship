import { api } from "./httpClient";

import { IAuthApiProps } from "../types/authInterface";
import { ITodoApiProps } from "../types/todoInterface";

export const authAPI: IAuthApiProps = {
  signup: (email, password) => {
    return api.post("/auth/signup", { email, password });
  },
  signin: (email, password) => {
    return api.post("/auth/signin", { email, password });
  },
};

export const todoAPI: ITodoApiProps = {
  createTodo: (todo) => api.post("/todos", { todo }),
  getTodos: () => api.get("/todos"),
  updateTodo: (id, todo, isCompleted) =>
    api.put(`/todos/${id}`, { todo, isCompleted }),
  deleteTodo: (id) => api.delete(`/todos/${id}`),
};
