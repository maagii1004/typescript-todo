import { NextRequest, NextResponse } from "next/server";
import { todos } from "../route";


export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const { title, checked } = await req.json();

  const existingTodo = todos.find((todo) => todo.id === id);
  if (!existingTodo) {
    return NextResponse.json({ message: "Todo not found!" }, { status: 404 });
  }

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  const updatingTodo = { id: existingTodo.id, title, checked };
  todos.splice(todoIndex, 1, updatingTodo);

  return NextResponse.json(updatingTodo);
};


export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return NextResponse.json({ message: "Todo not found!" }, { status: 404 });
  }

  const deletedTodo = todos.splice(todoIndex, 1);

  return NextResponse.json({
    message: "Todo deleted successfully!",
    deletedTodo,
  });
};


export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return NextResponse.json({ message: "Todo not found!" }, { status: 404 });
  }

  return NextResponse.json(todo);
};
