"use client";

import { ArrowDown } from "lucide-react";
import {
  Brain,
  Wand2,
  Sparkles,
  Boxes,
  Wrench,
  AlertTriangle,
  ClipboardList,
  FolderKanban,
  FileText,
  History,
  Globe,
  Plug,
  Palette,
} from "lucide-react";
import { DemoRound } from "@/components/DemoRound";
import { FeatureCard } from "@/components/FeatureCard";
import { Pitfall } from "@/components/Pitfall";
import { CopyBlock } from "@/components/CopyBlock";
import { ModuleGrid, type Module } from "@/components/ModuleGrid";

const cheatSheet = [
  `Before you answer, ask me 3 clarifying questions`,
  `Give me three versions: aggressive, balanced, cautious`,
  `Steelman the opposite view`,
  `What am I missing?`,
  `Rewrite this 30% shorter`,
];

function SkillCategory({
  label,
  items,
}: {
  label: string;
  items: [string, string][];
}) {
  return (
    <div className="rounded-xl border border-default bg-surface/50 p-5">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </div>
      <ul className="space-y-2">
        {items.map(([cmd, desc]) => (
          <li key={cmd} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <code className="shrink-0 self-start rounded bg-[color:var(--background)] px-1.5 py-0.5 font-mono text-[13px] text-accent">
              {cmd}
            </code>
            <span className="text-sm leading-relaxed text-[color:var(--foreground)]">
              {desc}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const modules: Module[] = [
  {
    id: "mental-model",
    number: 1,
    title: "How to think about Claude",
    blurb: "Treat it like a brilliant new hire on day one.",
    icon: Brain,
    content: (
      <>
        <p>
          Treat Claude like a brilliant new hire on day one. Smart, fast,
          eager — but missing every piece of context that lives in your head,
          your inbox, and your company&apos;s shared drive. The quality of
          what you get back is almost entirely a function of what you put in.
        </p>
        <p>Two ideas to anchor on:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Context beats cleverness.</strong> A specific prompt with
            real facts always beats a clever prompt with none.
          </li>
          <li>
            <strong>It&apos;s a conversation, not a search box.</strong>{" "}
            You&apos;re not entering a query — you&apos;re briefing a
            collaborator. Iterate, push back, ask for revisions.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "prompting-basics",
    number: 2,
    title: "What makes a good prompt",
    blurb: "The four ingredients every good prompt has.",
    icon: Wand2,
    content: (
      <>
        <p>
          Good prompts have four ingredients. Skip any of them and the output
          gets generic.
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Role &amp; context:</strong> who you are, what the company
            does, what situation you&apos;re in.
          </li>
          <li>
            <strong>The task:</strong> what you want produced, in plain terms.
          </li>
          <li>
            <strong>The facts:</strong> the actual numbers, names, dates, and
            constraints that make this <em>your</em> task and not a generic
            one.
          </li>
          <li>
            <strong>Audience, tone, length:</strong> who reads it and what
            they expect.
          </li>
        </ul>
        <p>
          The Demo module shows what happens when you go from missing all of
          these to having all of them.
        </p>
      </>
    ),
  },
  {
    id: "demo",
    number: 3,
    title: "Same prompt, three levels of context",
    blurb: "Watch the output quality jump from generic to genuinely useful.",
    icon: Sparkles,
    content: (
      <>
        <p>
          <strong>Scenario:</strong> Drafting a board update. Three rounds.
          Same task. The output quality jumps dramatically as the context
          improves.
        </p>

        <div className="space-y-6">
          <DemoRound
            number={1}
            accent="low"
            title="No context, vanilla prompt"
            prompt={`Write a board update on how the quarter went.`}
            response={
              <>
                <p className="mb-2 italic text-muted">
                  Expected response (paraphrased — try it live to see the
                  actual output):
                </p>
                <p>
                  &ldquo;Dear Board Members, I&apos;m pleased to share an
                  update on our performance this quarter. We made significant
                  progress across key initiatives, including product
                  development, customer acquisition, and operational
                  efficiency. Revenue trends were positive, and the team
                  executed well against our strategic priorities. We faced
                  some challenges in [area], but are taking steps to address
                  them. Looking ahead, we remain focused on…&rdquo;
                </p>
              </>
            }
            takeaway={
              <p>
                Generic. Could be any company, any quarter. You&apos;d never
                send this.
              </p>
            }
          />

          <div className="flex justify-center">
            <ArrowDown size={20} className="text-muted" />
          </div>

          <DemoRound
            number={2}
            accent="mid"
            title="Same prompt, with prompt engineering"
            prompt={`Write a board update for Q1 2026. We're a Series B SaaS company, 80 employees, selling workflow software to mid-market legal teams.

Key facts:
- ARR grew from $8M to $10.2M (28% QoQ)
- Closed 14 new logos, including two Am Law 100 firms
- Churn ticked up to 4.2% (from 2.8%) — two enterprise accounts left over integration issues
- Engineering shipped the Outlook integration 3 weeks late
- Hired a new VP of Customer Success

Audience: board of 5, including 2 founders, 2 VCs, 1 independent. They're sophisticated — skip the throat-clearing.
Tone: confident but honest. Don't bury the churn issue.
Length: 400 words, with clear sections.`}
            response={
              <p>
                A specific, structured 400-word update with real numbers,
                named segments, the churn issue called out rather than buried,
                and a forward-looking section. Clean headings. No filler.
              </p>
            }
            takeaway={
              <p>
                Way better. Specific, honest, structured. But still — Claude
                doesn&apos;t know <em>your</em> company.
              </p>
            }
          />

          <div className="flex justify-center">
            <ArrowDown size={20} className="text-muted" />
          </div>

          <DemoRound
            number={3}
            accent="high"
            title="Add a Project with context"
            prompt={`(Set up a Claude Project beforehand with:)
- Last quarter's actual board deck (or a realistic mock)
- The company's positioning doc or one-pager
- A previous board update you liked
- Custom instructions: "I'm the CEO of [Company]. Write in my voice: direct, lightly self-deprecating, no MBA jargon. Board prefers data over narrative."

Then run the same prompt as Round 2 inside the Project.`}
            response={
              <div className="space-y-2">
                <p>What changes:</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>
                    It references prior quarter&apos;s commitments and whether
                    they were hit
                  </li>
                  <li>Tone matches the previous update</li>
                  <li>
                    Uses internal terminology naturally (product names,
                    customer segments)
                  </li>
                  <li>
                    Compares this quarter&apos;s numbers to last quarter&apos;s
                    stated goals
                  </li>
                </ul>
              </div>
            }
            takeaway={
              <p>
                This is the &ldquo;aha&rdquo; moment. Same prompt. Wildly
                different output. Because the model finally has the context a
                chief of staff would have.
              </p>
            }
          />
        </div>
      </>
    ),
  },
  {
    id: "claude-features",
    number: 4,
    title: "Features worth knowing",
    blurb: "Projects, artifacts, memory, web search, connectors, styles.",
    icon: Boxes,
    content: (
      <>
        <p>
          You don&apos;t need to master all of them — knowing they exist is
          half the battle.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FeatureCard icon={FolderKanban} title="Projects">
            Persistent context across chats — upload once, reference forever.
            Custom instructions per project (different voice for board vs.
            customer-facing). Good rule: one project per recurring workflow
            (board updates, hiring, weekly team email).
          </FeatureCard>

          <FeatureCard icon={FileText} title="Artifacts">
            Claude can produce real deliverables: Word docs, Excel files,
            PowerPoint, PDFs. Also interactive things — working calculators,
            dashboards, mini web apps. You can iterate on them in-chat
            (&ldquo;make the chart blue, add a column for margin&rdquo;).
          </FeatureCard>

          <FeatureCard icon={History} title="Memory & chat history">
            Claude can search past conversations if you enable it in
            settings. Useful for: &ldquo;what was that framework we discussed
            last month for prioritizing hires?&rdquo;
          </FeatureCard>

          <FeatureCard icon={Globe} title="Web search & current info">
            Claude will search the web when needed — recent news, current
            prices, who&apos;s CEO of X. You don&apos;t need to tell it to
            search; it decides.
          </FeatureCard>

          <FeatureCard icon={Plug} title="Connectors (the agent stuff)">
            Claude can connect to Gmail, Calendar, Drive, Slack.
            &ldquo;Summarize unread emails from my board&rdquo; or
            &ldquo;what&apos;s on my calendar Thursday and what should I prep
            for.&rdquo; Claude in Chrome — browses the web on your behalf.
            Claude in Excel — works inside the spreadsheet.
          </FeatureCard>

          <FeatureCard icon={Palette} title="Styles">
            You can save writing styles (e.g., paste 3 of your own memos,
            Claude learns your voice). Toggle on/off per chat.
          </FeatureCard>
        </div>
      </>
    ),
  },
  {
    id: "skills",
    number: 5,
    title: "Skills: spin up an agent for everything",
    blurb: "Build a specialist once, run it forever.",
    icon: Wrench,
    content: (
      <>
        <p>
          The people getting the most out of Claude don&apos;t just chat
          with it — they build <strong>Skills</strong>. A Skill is a small,
          named agent with its own instructions, files, and scope. You
          invoke it with a slash command and it runs that workflow exactly
          the way you want, every time.
        </p>
        <p>
          The mental shift: stop treating Claude as one general assistant.
          Treat it as a <strong>team of specialists</strong> you&apos;ve
          each trained for a specific recurring task. That&apos;s the
          instinct behind &ldquo;spin up an agent for everything&rdquo; —
          every job you do more than twice is a Skill waiting to be built.
        </p>

        <div className="rounded-xl border border-default bg-surface/50 p-5 sm:p-6">
          <h3 className="mb-4 text-base font-semibold tracking-tight">
            How to build one
          </h3>
          <ol className="ml-5 list-decimal space-y-3">
            <li>
              <strong>Pick something you do more than once.</strong> The
              recurring stuff is where Skills pay off.
            </li>
            <li>
              <strong>Brief it.</strong> Write down the task, the context
              the Skill needs, and what the output should look like —
              exactly like briefing a new chief of staff.
            </li>
            <li>
              <strong>Create the Skill in Claude.</strong> Go to{" "}
              <a
                href="https://claude.ai/customize/connectors"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[13px] text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
              >
                claude.ai/customize/connectors
              </a>{" "}
              and create a new Skill. Name it (that name becomes the slash
              command), paste your brief as the instructions, and attach
              any reference files — templates, style guides, prior
              examples, your positioning doc.
            </li>
            <li>
              <strong>Test, fix, iterate.</strong> Run it on a real task.
              Tell the Skill what to change. Update the instructions.
              Repeat until it nails it.
            </li>
            <li>
              <strong>From now on, just type the slash command.</strong>{" "}
              The Skill runs with all that context every time, no
              re-prompting needed.
            </li>
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Tip: the hard part is step 2 — writing the brief. If you can
            describe the job to a person, you can write a Skill. If you
            can&apos;t, that&apos;s a sign the job isn&apos;t crisp enough
            yet.
          </p>
        </div>

        <div className="space-y-5">
          <SkillCategory
            label="Communications & writing"
            items={[
              ["/board-update", "pulls last quarter's deck and drafts the new one in your voice"],
              ["/weekly-readout", "turns raw bullets into your team email"],
              ["/call-debrief", "turns a meeting transcript into a CRM-ready summary"],
              ["/thank-you-note", "quick personalized follow-up notes after meetings"],
              ["/linkedin-reply", "drafts responses to incoming InMail in your voice"],
              ["/memo-from-notes", "turns rough handwritten notes into a polished one-pager"],
            ]}
          />

          <SkillCategory
            label="Research & analysis"
            items={[
              ["/competitor-scan", "checks named competitors' sites weekly for changes and news"],
              ["/pricing-research", "pulls competitor pricing pages and summarizes the deltas"],
              ["/news-brief", "daily AI / industry news roundup, filtered to what matters to you"],
              ["/company-dossier", "one-page brief on any company before a meeting or call"],
            ]}
          />

          <SkillCategory
            label="Hiring & team"
            items={[
              ["/hiring-rubric", "generates a scorecard for any role from your standard rubric"],
              ["/jd-writer", "writes a job description in your house style"],
              ["/1on1-prep", "summarizes the last few weeks for a direct report before your 1:1"],
              ["/reference-call", "generates tailored questions for a reference check"],
            ]}
          />

          <SkillCategory
            label="Decisions & thinking"
            items={[
              ["/steelman", "argues both sides of any decision you're weighing"],
              ["/pre-mortem", "imagines the plan failing and lists the top failure modes"],
              ["/three-versions", "gives you aggressive, balanced, and cautious takes on a choice"],
              ["/what-am-i-missing", "stress-tests a plan or memo for blind spots"],
            ]}
          />

          <SkillCategory
            label="Daily workflow"
            items={[
              ["/inbox-triage", "sorts unread email and flags only what genuinely needs you"],
              ["/calendar-prep", "tells you what's on tomorrow and what to prep for each meeting"],
              ["/weekly-review", "summarizes your week from calendar + email + Slack"],
              ["/expense-categorize", "classifies receipts into your accounting categories"],
            ]}
          />
        </div>

        <p>
          The compounding return on Claude isn&apos;t in being a better
          prompter. It&apos;s in building Skills for everything you do more
          than once. If you catch yourself prompting from scratch on the
          same kind of task — that&apos;s the signal to build a Skill.
        </p>
      </>
    ),
  },
  {
    id: "common-pitfalls",
    number: 6,
    title: "Mistakes that trip people up",
    blurb: "Where Claude lets you down — and how to dodge it.",
    icon: AlertTriangle,
    content: (
      <div className="space-y-4">
        <Pitfall title="Claude can be confidently wrong">
          Claude can be confidently wrong on numbers and citations — verify
          anything load-bearing.
        </Pitfall>

        <Pitfall title="Watch what you paste">
          Don&apos;t paste anything you wouldn&apos;t put in a Google Doc on a
          work account.
        </Pitfall>

        <Pitfall title="Long chats degrade">
          Long chats get worse over time — start fresh chats for new topics.
        </Pitfall>

        <Pitfall title="Iterate, don't restart">
          If output is off, don&apos;t restart — tell it what to fix.
          It&apos;s a conversation.
        </Pitfall>
      </div>
    ),
  },
  {
    id: "cheat-sheet",
    number: 7,
    title: "Phrases to fix bad output",
    blurb: "Five copy-paste moves worth memorizing.",
    icon: ClipboardList,
    content: (
      <>
        <p>
          Five moves worth memorizing. Paste them into any conversation when
          the output isn&apos;t landing.
        </p>
        <div className="space-y-3">
          {cheatSheet.map((line) => (
            <CopyBlock key={line} text={line} />
          ))}
        </div>
      </>
    ),
  },
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen">
      <main>
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          {/* Hero */}
          <section className="relative isolate pt-10 pb-16 sm:pt-14 lg:pt-20">
            {/* Flourish: warm accent aura + subtle grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-32 -z-10 h-[560px] w-[640px] rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(217,119,87,0.22), transparent)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-multiply"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              }}
            />

            <h1 className="mb-6 text-6xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[7rem]">
              Steve Steve Steve
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              A practical guide to getting real work done with Claude.
            </p>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-hover"
            >
              Start with the mental model
              <ArrowDown size={16} />
            </a>
          </section>

          <div id="modules" className="scroll-mt-8 pb-20">
            <ModuleGrid modules={modules} />
          </div>

          <footer className="border-t border-default py-10 text-sm text-muted">
            Built for [friend&apos;s name].
          </footer>
        </div>
      </main>
    </div>
  );
}
