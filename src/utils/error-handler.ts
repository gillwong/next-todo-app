import { TodoError } from "@/models/todo";
import { NextResponse } from "next/server";

export default function todoErrorHandler(error: unknown) {
  console.error((error as Error).message);
  if (error instanceof TodoError)
    return NextResponse.json({error: error.message}, {status: 500})
  return NextResponse.json({error: "Error occurred"}, {status: 500})
}