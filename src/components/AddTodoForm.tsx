"use client";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { ITodo } from "@/types/types";
import { fetchCreateTodo } from "@/utils/api";

const AddTodoForm: React.FC = () => {
  const { register, handleSubmit, reset, formState } = useForm<ITodo>();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const todoCreateMutation = useMutation({
    mutationFn: (data: ITodo) => fetchCreateTodo(data),
    onMutate: async (data: ITodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos: ITodo[] = queryClient.getQueryData(["todos"]) ?? [];

      const optimisticTodos: ITodo[] = [...prevTodos, { title: data.title }];

      await queryClient.setQueryData(["todos"], optimisticTodos);

      return { prevTodos };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["todos"], context?.prevTodos);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const onSubmit: SubmitHandler<ITodo> = async (data: ITodo) => {
    todoCreateMutation.mutate(data);
    reset();
  };

  return (
    <div className="flex justify-center mb-8 border-b border-gray-400 pb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full md:w-2/3 gap-3"
      >
        <div className="w-full">
          <input
            {...register("title", { required: "this field is required" })}
            className="p-4 border border-gray-400 rounded-2xl  w-full"
            type="text"
            placeholder="text of task..."
          />

          <p className="text-red-500 text-sm pl-4">{errors.title?.message}</p>
        </div>

        <button
          className="bg-gray-400 text-gray-900 rounded-2xl py-2 px-8 hover:bg-gray-900 hover:text-white cursor-pointer"
          type="submit"
        >
          {todoCreateMutation.isPending ? "Creating..." : "+ Create"}
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
