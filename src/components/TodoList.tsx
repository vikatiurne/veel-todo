"use client";
import React from "react";
import { ITodo } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

import TodoItem from "./TodoItem";

import { fetchGetTodos } from "@/utils/api";

const todoQueryOptions = () => {
  return {
    queryKey: ["todos"],
    queryFn: fetchGetTodos,
  };
};

const TodoList: React.FC = () => {
  const query = useQuery(todoQueryOptions());

  const { isPending, isError, data, error } = query;

  if (isPending) return <p className="pt-8 text-center text-xl">Loading...</p>;
  if (isError)
    return (
      <p className="pt-8 text-center text-xl text-red-500">
        Error: {error.message}
      </p>
    );

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
