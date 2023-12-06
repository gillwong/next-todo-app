"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import type { Todo, TodoJSON } from "@/server/models/todo";
import todoServices from "@/utils/todo/services";

export default function TodoDeleteButton({ todo }: { todo: Todo | TodoJSON }) {
  const router = useRouter();
  const { toast } = useToast();

  async function handleDelete() {
    try {
      await todoServices.remove(todo.id);
      router.push("/home");
      router.refresh();
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
