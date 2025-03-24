"use client";
import { ITodo } from "@/types/types";
import { fetchUpdateTodo } from "@/utils/api";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const TodoItem = (props: ITodo) => {
  const { title, completed, body, id } = props;

  const [newCompleted, setNewCompleted] = useState(completed);

  const queryClient = new QueryClient();

  const todosMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ITodo }) =>
      fetchUpdateTodo(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos: ITodo[] = queryClient.getQueryData(["todos"]) ?? [];

      const optimisticTodos: ITodo[] = [
        { id: 14588, title: title, body: body, completed: newCompleted },
        ...prevTodos,
      ];

      queryClient.setQueryData(["todos"], optimisticTodos);

      return { prevTodos };
    },
    onError: (err, completed, context) => {
      queryClient.setQueryData(["todos"], context?.prevTodos);
    },
  });

  const handleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompleted((prev) => !prev);

    todosMutation.mutate({
      id: id ?? 0,
      data: { title, body, completed: newCompleted },
    });
  };

  return (
    <div className="flex ">
      <h5>{title}</h5>
      <input
        type="checkbox"
        checked={newCompleted}
        onChange={handleCompleted}
      />
      <button>delete</button>
    </div>
  );
};

export default TodoItem;
