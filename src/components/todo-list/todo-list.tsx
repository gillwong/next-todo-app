import { HTMLAttributes, Suspense } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/utils/utils";

import TodoListBody from "./todo-list-body";
import TodoListBodyLoading from "./todo-list-body/loading";

export default function TodoList({
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn(className)} {...props}>
      <li className="flex p-2 justify-between">
        <div className="flex space-x-4 items-center">
          <Checkbox className="invisible" disabled />
          <p className="text-lg text-black font-semibold">Title</p>
        </div>
        <div className="flex space-x-4 items-center">
          <p className="text-lg font-semibold me-3">Due</p>
        </div>
      </li>
      <Separator />
      <Suspense fallback={<TodoListBodyLoading />}>
        <TodoListBody />
      </Suspense>
    </ul>
  );
}
