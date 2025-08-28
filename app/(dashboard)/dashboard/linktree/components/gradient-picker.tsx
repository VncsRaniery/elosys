import { useId } from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const items = [
  {
    id: "claro",
    label: "Claro",
    style: { background: "var(--tema-claro)" },
  },
  {
    id: "escuro",
    label: "Escuro",
    style: { background: "var(--tema-escuro)" },
  },
  {
    id: "ceu-sereno",
    label: "Céu Sereno",
    style: { background: "var(--gradiente-ceu-sereno)" },
  },
  {
    id: "oceano-profundo",
    label: "Oceano Profundo",
    style: { background: "var(--gradiente-oceano-profundo)" },
  },
  {
    id: "frescor-menta",
    label: "Frescor da Menta",
    style: { background: "var(--gradiente-frescor-menta)" },
  },
  {
    id: "aurora-verde",
    label: "Aurora Verde",
    className: "gradiente-aurora-verde",
  },
  {
    id: "por-do-sol",
    label: "Pôr do Sol",
    style: { background: "var(--gradiente-por-do-sol)" },
  },
  {
    id: "noite-nublada",
    label: "Noite Nublada",
    style: { background: "var(--gradiente-noite-nublada)" },
  },
];

interface GradientPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GradientPicker({
  value,
  onChange,
}: GradientPickerProps) {
  const id = useId();

  return (
    <fieldset className="space-y-4">
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-3 gap-4"
      >
        {items.map((item) => (
          <label
            key={`${id}-${item.id}`}
            className="flex flex-col items-center"
          >
            <RadioGroupItem
              id={`${id}-${item.id}`}
              value={item.id}
              className="peer sr-only"
            />
            <div
              style={item.style}
              className={cn(
                `h-[70px] w-[100px] relative cursor-pointer overflow-hidden rounded-md 
                 border-2 border-transparent shadow-sm transition-all outline-none
                 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2
                 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary
                 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50`,
                item.className
              )}
            />
            <span className="group peer-data-[state=unchecked]:text-muted-foreground/70 mt-2 flex items-center gap-1">
              <CheckIcon
                size={16}
                className="group-peer-data-[state=unchecked]:hidden"
                aria-hidden="true"
              />
              <MinusIcon
                size={16}
                className="group-peer-data-[state=checked]:hidden"
                aria-hidden="true"
              />
              <span className="text-xs font-medium">{item.label}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
