import TodoCreateForm from "@/components/todo-forms/todo-create-form";
import { Separator } from "@/components/ui/separator";

export default function NewTodoPage() {
  return (
    <>
      <h1 className="font-bold text-lg">Create a New Todo</h1>
      <Separator className="my-3" />
      <TodoCreateForm />
    </>
  );
}
