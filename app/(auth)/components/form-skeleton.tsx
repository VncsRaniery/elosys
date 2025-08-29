import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthFormSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showNameField?: boolean;
}

export function AuthFormSkeleton({
  showNameField = false,
  className,
  ...props
}: AuthFormSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid gap-6">
        {/* Campo de Nome (Condicional) */}
        {showNameField && (
          <div className="grid gap-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        )}

        {/* Campo de Email */}
        <div className="grid gap-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-10 w-full rounded-full" />
        </div>

        {/* Campo de Senha */}
        <div className="grid gap-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-10 w-full rounded-full" />
        </div>

        {/* Botão de Envio */}
        <Skeleton className="h-10 w-full rounded-full" />

        {/* Divisor */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center">
            <Skeleton className="h-4 w-28 bg-background px-2" />
          </div>
        </div>

        {/* Botões Sociais */}
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Link Inferior */}
      <div className="flex justify-center text-sm">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}
