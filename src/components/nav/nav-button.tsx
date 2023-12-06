import Link from "next/link";
import { Url } from "url";

import { Button, ButtonProps } from "@/components/ui/button";

import { cn } from "@/utils/utils";

interface NavButtonProps extends ButtonProps {
  href: string | Url;
}

export default function NavButton({
  className,
  href,
  children,
}: NavButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn("w-full justify-start", className)}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
