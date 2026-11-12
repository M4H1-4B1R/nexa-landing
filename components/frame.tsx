import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Frame({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-hairline-strong bg-elevated", className)}>
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
        <span className="size-2 bg-hairline-strong" />
        <span className="size-2 bg-hairline-strong" />
        <span className="size-2 bg-hairline-strong" />
        <span className="caption-1 ml-2 truncate">{title}</span>
      </div>
      {children}
    </div>
  );
}
