"use client"
import Image from "next/image";
import React, { useState } from "react";
import rocket from "./rocket.png";
import AddTodoForm from "@/components/AddTodoForm";
import { Roboto } from "@next/font/google";
import TodoList from "@/components/TodoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Home = () => {
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
        className={`bg-gray-800 h-screen text-white pt-14 px-4 ${roboto.className}`}
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
