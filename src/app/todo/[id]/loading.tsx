import { Skeleton } from "@/components/ui/skeleton";

export default function TodoLoadingPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 space-y-3">
          <Skeleton className="flex h-6 w-2/3" />
          <Skeleton className="flex h-4" />
        </div>
        <div className="flex-1 space-y-3">
          <Skeleton className="flex h-6 w-1/3" />
          <Skeleton className="flex h-4" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="flex h-6 w-1/3" />
        <Skeleton className="flex h-12" />
      </div>
    </div>
  );
}
