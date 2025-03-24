"use client";
import { ITodo } from "@/types/types";
import { fetchGetTodos } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TodoItem from "./TodoItem";

const todoQueryOptions = () => {
  return {
    queryKey: ["todos"],
    queryFn: fetchGetTodos,
  };
};

const TodoList = () => {
  const query = useQuery(todoQueryOptions());

  const { isPending, isError, data, error } = query;

  if (isPending) return <p className="pt-8 text-center text-xl">Loading...</p>;
  if (isError)
    return <p className="pt-8 text-center text-xl text-red-500">Error: {error.message}</p>;

  return data.map((todo: ITodo, idx: number) => (
    <TodoItem
      key={`${todo.id}_${idx}`}
      id={todo.id}
      title={todo.title}
      completed={todo.completed}
    />
  ));
};

export default TodoList;
