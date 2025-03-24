"use client";
import { ITodo } from "@/types/types";
import { fetchDeleteTodo, fetchUpdateTodo } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const TodoItem = (props: ITodo) => {
  const { title, completed, id } = props;

  const [newCompleted, setNewCompleted] = useState(completed);

  const queryClient = useQueryClient();

  const todoCompleteMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ITodo }) =>
      fetchUpdateTodo(id, data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos: ITodo[] = queryClient.getQueryData(["todos"]) ?? [];

      const optimisticTodos: ITodo[] = [
        { id: 14588, title: title, completed: newCompleted },
        ...prevTodos,
      ];

      queryClient.setQueryData(["todos"], optimisticTodos);

      return { prevTodos };
    },
    onError: (err, completed, context) => {
      queryClient.setQueryData(["todos"], context?.prevTodos);
    },
  });

  const todoDeleteMutation = useMutation({
    mutationFn: (id: number) => fetchDeleteTodo(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos: ITodo[] = queryClient.getQueryData(["todos"]) ?? [];

      const optimisticTodos: ITodo[] = prevTodos.filter(
        (todo) => todo.id !== id
      );

      queryClient.setQueryData(["todos"], optimisticTodos);

      return { prevTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["todos"], context?.prevTodos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCompleted = () => {
    setNewCompleted((prev) => !prev);

    todoCompleteMutation.mutate({
      id: id ?? 0,
      data: { title, completed: newCompleted },
    });
  };

  const handleDeleteTodo = () => {
    const todoId = id ?? 0;
    todoDeleteMutation.mutate(todoId);
  };

  return (
    <div className="mx-auto flex justify-between items-center border rounded-2xl bg-gray-400 text-gray-900 p-2 mb-4 w-full md:w-2/3">
      <h5 className={`${newCompleted ? "text-gray-500" : "text-gray-900"}`}>
        {title}
      </h5>
      <div className="flex gap-4">
        <input
          type="checkbox"
          checked={newCompleted}
          onChange={handleCompleted}
        />
        <button
          onClick={handleDeleteTodo}
          className="py-2 px-4 h-10 rounded-2xl bg-gray-500 text-gray-400 cursor-pointer hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
