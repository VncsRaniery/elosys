import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface FormSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * O número de campos de input a serem renderizados no skeleton.
   * @default 2
   */
  fieldCount?: number;
}

/**
 * Um componente de skeleton reutilizável para formulários de autenticação.
 * Ele renderiza dinamicamente o número de campos especificado via `fieldCount`.
 */
export function FormSkeleton({
  className,
  fieldCount = 2, // Valor padrão de 2 campos (para o login)
  ...props
}: FormSkeletonProps) {
  // Componente auxiliar para não repetir o JSX do skeleton de um campo
  const FieldSkeleton = () => (
    <div className="grid gap-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-10 w-full rounded-full" />
    </div>
  );

  return (
    // A estrutura do skeleton agora ocupa os dois lados do grid
    // para garantir que a imagem também tenha seu espaço coberto durante o loading.
    <>
      <div className={cn("p-6 md:p-8", className)} {...props}>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Renderiza o número de campos dinamicamente */}
          {Array.from({ length: fieldCount }).map((_, index) => (
            <FieldSkeleton key={index} />
          ))}

          {/* Botão de Submit */}
          <Skeleton className="h-10 w-full rounded-full" />

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Skeleton className="h-px w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <Skeleton className="h-4 w-28 bg-background px-2" />
            </div>
          </div>

          {/* Botões Sociais (corrigido para 2 colunas) */}
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Link inferior */}
          <div className="text-center">
            <Skeleton className="mx-auto h-4 w-56" />
          </div>
        </div>
      </div>

      {/* Skeleton para a Imagem */}
      <div className="relative hidden bg-muted md:block">
        <Skeleton className="h-full w-full" />
      </div>
    </>
  );
}