import { ITodo } from "@/types/types";
import axios from "axios";

export const fetchGetTodos = async (): Promise<ITodo[]> => {
  const responce = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}?_limit=10`
  );
  return responce.data;
};

export const fetchCreateTodo = async (todo: ITodo): Promise<ITodo> => {
  const responce = await axios.post(process.env.NEXT_PUBLIC_API_URL!, { todo });
  return responce.data;
};

export const fetchUpdateTodo = async (
  id: number,
  todo: ITodo
): Promise<ITodo[]> => {
  const responce = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
    todo,
  });
  return responce.data;
};
export const fetchDeleteTodo = async (id: number) => {
  const responce = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
  return responce.data;
};
