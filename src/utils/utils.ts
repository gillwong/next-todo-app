import { PostgrestError } from "@supabase/supabase-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPostgrestError(err: Error | PostgrestError) {
  return "details" in err && "hint" in err && "code" in err;
}
