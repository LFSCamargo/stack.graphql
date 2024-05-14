import { Skeleton } from "@/components/ui/skeleton";

export function TransactionSkeleton() {
  return (
    <div className="flex items-center py-2">
      <div className="flex-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="ml-auto">
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}
