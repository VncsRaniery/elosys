import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkFormData } from "@/types";

type SortableLinkItemProps = {
  link: LinkFormData;
  handleLinkChange: (
    id: number | string,
    field: "title" | "description" | "url",
    value: string
  ) => void;
  removeLink: (id: number | string) => void;
};

export function SortableLinkItem({
  link,
  handleLinkChange,
  removeLink,
}: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanUrl = e.target.value.replace("https://", "");
    handleLinkChange(link.id, "url", cleanUrl);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-2 p-3 border rounded-lg bg-background"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none p-2 mt-1.5"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>

      <div className="flex-grow space-y-2">
        <Input
          placeholder="Título do link"
          value={link.title}
          onChange={(e) => handleLinkChange(link.id, "title", e.target.value)}
        />
        <Input
          placeholder="Descrição (opcional)"
          value={link.description}
          onChange={(e) =>
            handleLinkChange(link.id, "description", e.target.value)
          }
        />

        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-background px-3 text-sm text-muted-foreground">
            https://
          </span>
          <Input
            type="text"
            placeholder="google.com"
            value={link.url.replace("https://", "")}
            onChange={handleUrlChange}
            className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeLink(link.id)}
        className="text-red-500 hover:text-red-700 mt-1.5"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
