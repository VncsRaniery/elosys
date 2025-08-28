import type React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface FormSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  fieldCount?: number;
}

export function FormSkeleton({
  className,
  fieldCount = 2,
  ...props
}: FormSkeletonProps) {
  const FieldSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-12 w-full rounded-2xl" />
    </div>
  );

  return (
    <>
      <div className={cn("p-8 md:p-12", className)} {...props}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <Skeleton className="h-16 w-16 rounded-2xl" />
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-72" />
          </div>

          <div className="space-y-6">
            {Array.from({ length: fieldCount }).map((_, index) => (
              <FieldSkeleton key={index} />
            ))}
          </div>

          <Skeleton className="h-12 w-full rounded-2xl" />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Skeleton className="h-px w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <Skeleton className="h-4 w-32 bg-background px-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>

          <div className="text-center">
            <Skeleton className="mx-auto h-4 w-64" />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted md:block">
        <Skeleton className="h-full w-full" />
      </div>
    </>
  );
}
