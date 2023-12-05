import { Skeleton } from "@/components/ui/skeleton";

export default function TodoHeaderLoading() {
  return (
    <div className="flex items-center space-x-4 px-2">
      <Skeleton className="h-6 w-6 aspect-square" />
      <Skeleton className="flex h-6 w-full" />
    </div>
  );
}
