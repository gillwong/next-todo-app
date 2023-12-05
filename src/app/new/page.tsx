import { Separator } from "@/components/ui/separator";
import TodoForm from "./components/todo-form";

export default function NewTodoPage() {
  return (
    <>
      <h1 className="font-bold text-lg">Create a New Todo</h1>
      <Separator className="my-3" />
      <TodoForm />
    </>
  );
}
