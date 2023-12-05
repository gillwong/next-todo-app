import { ClassValue } from "clsx";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { Todo } from "@/lib/todos";

import { Separator } from "@/components/ui/separator";

dayjs.extend(localizedFormat);

const priorityColor: Map<Todo["priority"], ClassValue> = new Map([
  ["LOW", "text-green-500"],
  ["MEDIUM", "text-amber-500"],
  ["HIGH", "text-red-500"],
  [undefined, "text-slate-300"],
]);

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function TodoBodyH2({ children }: { children?: React.ReactNode }) {
  return <h2 className="font-medium text-lg">{children}</h2>;
}

export default function TodoBody({ todo }: { todo: Todo }) {
  return (
    <article className="space-y-4">
      <div className="flex items-center space-x-4">
        <section className="flex-1 space-y-2">
          <TodoBodyH2>Priority</TodoBodyH2>
          <p className={priorityColor.get(todo.priority) as string}>
            {todo.priority ? capitalizeFirstLetter(todo.priority) : "No"}{" "}
            Priority
          </p>
        </section>
        <Separator orientation="vertical" />
        <section className="flex-1 space-y-2">
          <TodoBodyH2>Due</TodoBodyH2>
          <p>{todo.due ? dayjs(todo.due).format("ddd, l") : "-"}</p>
        </section>
      </div>
      {todo.description && (
        <section className="space-y-2">
          <TodoBodyH2>Description</TodoBodyH2>
          <p className="px-2 py-1 border rounded-lg border-slate-200 leading-relaxed">
            {todo.description}
          </p>
        </section>
      )}
    </article>
  );
}
