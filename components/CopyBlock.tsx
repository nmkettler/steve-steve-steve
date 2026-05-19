"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyBlock({
  text,
  label,
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // noop
    }
  };

  return (
    <div className="group relative rounded-lg border border-default bg-surface">
      {label && (
        <div className="border-b border-default px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 pr-12 font-mono text-sm leading-relaxed text-[color:var(--foreground)]">
        {text}
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        className="absolute right-2 top-2 inline-flex h-8 items-center gap-1.5 rounded-md border border-default bg-[color:var(--background)] px-2 text-xs text-muted transition-colors hover:text-[color:var(--foreground)]"
      >
        {copied ? (
          <>
            <Check size={12} className="text-accent" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy size={12} />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
