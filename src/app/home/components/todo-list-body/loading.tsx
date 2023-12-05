import { Skeleton } from "@/components/ui/skeleton";

export default function TodoListBodyLoading() {
  return (
    <div className="flex py-4 px-2 justify-between">
      <div className="flex space-x-4 w-2/3">
        <Skeleton className="h-4 w-5" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex space-x-4 w-1/4">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
