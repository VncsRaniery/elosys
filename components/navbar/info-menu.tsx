import {
  BookIcon,
  InfoIcon,
  LifeBuoyIcon,
  MessageCircleMoreIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function InfoMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="size-8 rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <InfoIcon
            className="text-muted-foreground"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Need help?</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          asChild
        >
          <Link href="#">
            <BookIcon size={16} className="opacity-60" aria-hidden="true" />
            Documentação
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          asChild
        >
          <Link href="#">
            <LifeBuoyIcon size={16} className="opacity-60" aria-hidden="true" />
            Suporte
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          asChild
        >
          <Link href="#">
            <MessageCircleMoreIcon
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            Contacte-nos
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
