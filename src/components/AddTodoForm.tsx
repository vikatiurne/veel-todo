"use client";
import { ITodo } from "@/types/types";
import { fetchCreateTodo } from "@/utils/api";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddTodoForm = () => {
  const { register, handleSubmit, reset, formState } = useForm<ITodo>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<ITodo> = async (data: ITodo) => {
    console.log(data);
    await fetchCreateTodo({ title: data.title, body: data.body });
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
            placeholder="Title of task..."
          />

          <p className="text-red-500 text-sm pl-4">{errors.title?.message}</p>
        </div>

        <div className="flex justify-between items-start  gap-3 flex-wrap  w-full">
          <div className="w-full md:w-4/5">
            <input
              {...register("body", { required: "this field is required" })}
              className="p-4 border border-gray-400 rounded-2xl w-full"
              type="text"
              placeholder="Add new task..."
            />

            <p className="text-red-500 text-sm pl-4">{errors.body?.message}</p>
          </div>

          <button
            className="bg-gray-400 text-gray-900 rounded-2xl p-4 hover:bg-gray-900 hover:text-white cursor-pointer"
            type="submit"
          >
            + Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoForm;
