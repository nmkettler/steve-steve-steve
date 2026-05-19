import { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

export function Pitfall({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-amber-500/30 bg-amber-50 p-5 dark:border-amber-500/30 dark:bg-amber-500/10">
      <AlertTriangle
        size={20}
        className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
      />
      <div>
        <h3 className="mb-1 text-base font-semibold tracking-tight text-amber-900 dark:text-amber-100">
          {title}
        </h3>
        <div className="text-sm leading-relaxed text-amber-900/80 dark:text-amber-100/80">
          {children}
        </div>
      </div>
    </div>
  );
}
