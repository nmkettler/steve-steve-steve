import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-default bg-[color:var(--background)] p-6 transition-colors hover:bg-surface/50">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon size={20} />
      </div>
      <h3 className="mb-2 text-base font-semibold tracking-tight">{title}</h3>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}
