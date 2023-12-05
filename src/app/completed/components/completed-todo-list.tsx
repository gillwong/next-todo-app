import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import CompletedTodoListBody from "./completed-todo-list-body";

export default function CompletedTodoList({
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
      <CompletedTodoListBody />
    </ul>
  );
}
