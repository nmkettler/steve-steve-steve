import { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

export function DemoRound({
  number,
  title,
  prompt,
  response,
  takeaway,
  accent,
}: {
  number: 1 | 2 | 3;
  title: string;
  prompt: ReactNode;
  response: ReactNode;
  takeaway: ReactNode;
  accent?: "low" | "mid" | "high";
}) {
  const dotStyles = {
    low: "bg-neutral-400 text-white",
    mid: "bg-neutral-700 text-white dark:bg-neutral-300 dark:text-neutral-900",
    high: "bg-accent text-white",
  } as const;

  return (
    <div className="relative rounded-2xl border border-default bg-[color:var(--background)] p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
            dotStyles[accent ?? "low"]
          }`}
        >
          {number}
        </span>
        <div className="text-xs font-medium uppercase tracking-wide text-muted">
          Round {number}
        </div>
      </div>

      <h3 className="mb-5 text-xl font-semibold tracking-tight">{title}</h3>

      <div className="space-y-5">
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Prompt
          </div>
          <div className="rounded-lg border border-default bg-surface p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
            {prompt}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Response
          </div>
          <div className="rounded-lg border border-dashed border-default bg-surface/50 p-4 text-[14px] leading-relaxed text-[color:var(--foreground)]">
            {response}
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-accent" />
          <div className="text-[14px] leading-relaxed">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">
              Takeaway
            </div>
            {takeaway}
          </div>
        </div>
      </div>
    </div>
  );
}
