"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Image from "next/image";
import { Roboto } from "@next/font/google";

import rocket from "./rocket.png";
import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Home:React.FC = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 50 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={`bg-gray-800 min-h-screen text-white py-14 px-4 ${roboto.className}`}
      >
        <div className="flex items-center gap-5 justify-center mb-8">
          <Image src={rocket} alt="logo" className="w-8 " />
          <h1 className="text-5xl text-blue-400 font-bold ">
            to<span className="text-purple-500">do</span>
          </h1>
        </div>
        <AddTodoForm />
        <TodoList />
      </main>
    </QueryClientProvider>
  );
};

export default Home;
