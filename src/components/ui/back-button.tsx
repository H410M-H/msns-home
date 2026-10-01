"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";

export function BackButton({ className }: { className?: string }) {
  return (
    <Button
      onClick={() => window.history.back()}
      variant="outline"
      className={className}
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
    </Button>
  );
}
