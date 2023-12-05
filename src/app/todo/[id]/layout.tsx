import { notFound } from "next/navigation";
import { Suspense } from "react";

import TodoHeader from "@/components/todo-details/todo-header";
import TodoHeaderLoading from "@/components/todo-details/todo-header/loading";
import { Separator } from "@/components/ui/separator";

export default function TodoPageLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  return (
    <>
      <Suspense fallback={<TodoHeaderLoading />}>
        <TodoHeader todoId={id} />
      </Suspense>
      <Separator className="mt-3 mb-4" />
      <div className="px-2 space-y-6">{children}</div>
    </>
  );
}
