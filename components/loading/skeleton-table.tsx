import { CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonTable() {
  return (
    <CardContent className="grid grid-cols-[60px,repeat(3,1fr)] gap-4">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
    </CardContent>
  );
}
