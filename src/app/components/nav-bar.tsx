import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import NavButton from "./nav-button";

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
      <h1 className="text-2xl font-bold">Next Todo App</h1>
      <Sheet>
        <SheetTrigger className="relative" asChild>
          <Button variant="outline" className="p-2">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigate</SheetTitle>
          </SheetHeader>
          <Separator className="my-3" />
          <div className="space-y-0">
            <NavButton href="/">Home</NavButton>
            <NavButton href="/new">New</NavButton>
            <NavButton href="/starred">Starred</NavButton>
            <NavButton href="/completed">Completed</NavButton>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
