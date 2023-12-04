import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Todo } from "./todo-item";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface PriorityIndicatorProps {
  priority: Todo["priority"];
}

const priorityColor: Map<Todo["priority"], ClassValue> = new Map([
  ["LOW", "bg-green-500"],
  ["MEDIUM", "bg-amber-500"],
  ["HIGH", "bg-red-500"],
  [undefined, "bg-slate-300"],
]);

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function PriorityIndicator({
  priority,
}: PriorityIndicatorProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn("w-2 h-2 rounded-full", priorityColor.get(priority))}
          />
        </TooltipTrigger>
        <TooltipContent>
          {priority ? capitalizeFirstLetter(priority) : "No"} Priority
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
