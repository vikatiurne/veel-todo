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

  const { isPending, isError, data } = query;

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return data.map((todo: ITodo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      title={todo.title}
      body={todo.body}
      completed={todo.completed}
    />
  ));
};

export default TodoList;
