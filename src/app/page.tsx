"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import { TodoItem } from "./components/todo-item";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todo")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const onDelete = (id: string) => {
    const newTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col gap-4">
      <form className="flex gap-2 w-[400px]">
        <Input autoFocus className="w-full" />
        <Button>Save</Button>
      </form>
      <ul className="pl-4 list-disc w-full max-w-[400px]">
        {todos.map((todo) => (
          <TodoItem onDelete={onDelete} todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}
