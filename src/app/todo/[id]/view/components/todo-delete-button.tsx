"use client";

import { Todo } from "@/app/home/components/todo-item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteTodo } from "@/lib/todos";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TodoDeleteButton({ todo }: { todo: Todo }) {
  const router = useRouter();
  const { toast } = useToast();

  async function handleDelete() {
    try {
      router.push("/home");
      await deleteTodo(todo.id);
      toast({ description: "Todo deleted successfully." });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to delete todo. Please try again.",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive/90 hover:text-destructive-foreground"
        >
          <Trash className="h-4 w-4 mr-2" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Todo?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} asChild>
            <AlertDialogAction>Delete</AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
