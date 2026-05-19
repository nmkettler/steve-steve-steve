"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { LucideIcon, ArrowLeft } from "lucide-react";

export type Module = {
  id: string;
  number: number;
  title: string;
  blurb: string;
  icon: LucideIcon;
  content: ReactNode;
};

export function ModuleGrid({ modules }: { modules: Module[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const active = modules.find((m) => m.id === activeId) ?? null;

  useEffect(() => {
    if (active && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [active]);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="mb-1 text-2xl font-semibold tracking-tight">
          The modules
        </h2>
        <p className="mb-6 text-sm text-muted">
          Pick a module to open it. Close it to come back here.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = m.id === activeId;
            return (
              <button
                key={m.id}
                onClick={() => setActiveId(isActive ? null : m.id)}
                className={`group flex flex-col items-start rounded-xl border p-5 text-left transition-all ${
                  isActive
                    ? "border-accent bg-accent/5 shadow-sm"
                    : "border-default bg-[color:var(--background)] hover:border-neutral-300 hover:bg-surface/60 hover:shadow-sm"
                }`}
              >
                <div className="mb-3 flex w-full items-center justify-between">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-accent text-white"
                        : "bg-surface text-muted group-hover:text-[color:var(--foreground)]"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span
                    className={`text-xs font-medium tracking-wide ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    0{m.number}
                  </span>
                </div>
                <h3 className="mb-1 text-base font-semibold tracking-tight">
                  {m.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{m.blurb}</p>
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          ref={panelRef}
          className="scroll-mt-8 rounded-2xl border border-default bg-[color:var(--background)] p-5 shadow-sm sm:p-8 lg:p-10"
        >
          <div className="mb-6 flex items-start justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-accent">
                Module 0{active.number}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {active.title}
              </h2>
            </div>
            <button
              onClick={() => setActiveId(null)}
              aria-label="Close module"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-default bg-[color:var(--background)] px-2.5 py-2 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-[color:var(--foreground)] sm:px-3"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          <div className="space-y-6 text-[15px] leading-relaxed text-[color:var(--foreground)]">
            {active.content}
          </div>

          <div className="mt-10 flex flex-col-reverse items-stretch gap-3 border-t border-default pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => setActiveId(null)}
              className="inline-flex items-center justify-center gap-1.5 text-sm text-muted transition-colors hover:text-[color:var(--foreground)] sm:justify-start"
            >
              <ArrowLeft size={14} />
              Back to modules
            </button>

            {(() => {
              const idx = modules.findIndex((m) => m.id === active.id);
              const next = modules[idx + 1];
              if (!next) return null;
              return (
                <button
                  onClick={() => setActiveId(next.id)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  <span className="sm:hidden">Next module</span>
                  <span className="hidden sm:inline">
                    Next: {next.title}
                  </span>
                </button>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
