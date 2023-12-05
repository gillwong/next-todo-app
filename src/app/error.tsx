"use client";

import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";

export default function Error({ error }: { error: Error }) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Error!",
      description: error.message,
    });
  }, [error]);

  return <div>Please refresh and try again.</div>;
}
