import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import NavButton from "./nav-button";
import Link from "next/link";

export default function NavBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-4 py-2 backdrop-blur-lg bg-white/60 border-b border-slate-200",
        className
      )}
      {...props}
    >
      <h1 className="text-2xl font-bold">
        <Link className="hover:underline underline-offset-2" href="/home">
          Next Todo App
        </Link>
      </h1>
      <Sheet>
        <SheetTrigger className="relative" asChild>
          <Button variant="outline" size="icon" className="aspect-square">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigate</SheetTitle>
          </SheetHeader>
          <Separator className="my-3" />
          <div className="space-y-0">
            <SheetClose asChild>
              <NavButton href="/home">Home</NavButton>
            </SheetClose>
            <SheetClose asChild>
              <NavButton href="/new">New</NavButton>
            </SheetClose>
            <SheetClose asChild>
              <NavButton href="/starred">Starred</NavButton>
            </SheetClose>
            <SheetClose asChild>
              <NavButton href="/completed">Completed</NavButton>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
