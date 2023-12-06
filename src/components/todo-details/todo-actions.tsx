import { Edit } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { Todo } from "@/server/models/todo";
import { simplify } from "@/utils/todo/utils";

import TodoDeleteButton from "./todo-delete-button";

export default function TodoActions({ todo }: { todo: Todo }) {
  return (
    <div className="flex justify-between">
      <Button asChild>
        <Link href="/home">Ok</Link>
      </Button>
      <div className="flex space-x-4">
        <TodoDeleteButton todo={simplify(todo)} />
        <Button variant="secondary" asChild>
          <Link href={`/todo/${todo.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Link>
        </Button>
      </div>
    </div>
  );
}
