import { Todo } from "@/types/todo";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const todos: Todo[] = [
  { id: nanoid(), title: "Sereerei zaluusai", checked: false},
];

export const GET = () => {
  return NextResponse.json(todos);
};

export const POST = async (req: NextRequest) => {
  const { title } = await req.json();
  const newTodo = { id: nanoid(), title: title, checked: false };
  todos.push(newTodo);
  return NextResponse.json(newTodo);
};
