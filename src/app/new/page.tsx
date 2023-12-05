import { Separator } from "@/components/ui/separator";
import TodoForm from "./components/todo-form";

export default function New() {
  return (
    <main className="px-4 mt-3">
      <h1 className="font-bold text-lg">Create a New Todo</h1>
      <Separator className="my-3" />
      <TodoForm />
    </main>
  );
}
