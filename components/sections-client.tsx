"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { m, useInView, useReducedMotion } from "motion/react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { TransitionPanel } from "@/components/ui/transition-panel";
import { Frame } from "@/components/frame";
import { SCOPES, STACK, STEPS, TRIGGERS } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const PANEL = {
  transition: { duration: 0.5, ease: EASE },
  variants: {
    enter: { opacity: 0, y: 12, filter: "blur(4px)" },
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -12, filter: "blur(4px)" },
  },
};

function arrowNav(event: KeyboardEvent, count: number, index: number, select: (next: number) => void) {
  const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[event.key] ?? 0;
  if (!step) return;
  event.preventDefault();
  const next = (index + step + count) % count;
  select(next);
  const tabs = event.currentTarget.querySelectorAll<HTMLElement>("[role=tab]");
  tabs[next]?.focus();
}

export function Marquee() {
  const reduce = useReducedMotion();
  const items = STACK.map((item) => (
    <span key={item} className="flex items-center gap-2 text-sm font-medium whitespace-nowrap text-mute">
      <span className="size-1.5 bg-periwinkle" />
      {item}
    </span>
  ));
  if (reduce) return <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">{items}</div>;
  return (
    <div className="relative min-w-0">
      <InfiniteSlider gap={40} speed={36} speedOnHover={12}>
        {items}
      </InfiniteSlider>
      <ProgressiveBlur
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas"
        direction="left"
        blurIntensity={1}
      />
      <ProgressiveBlur
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas"
        direction="right"
        blurIntensity={1}
      />
    </div>
  );
}

export function ScopeExplorer() {
  const [active, setActive] = useState(0);
  const select = (index: number) => setActive(index);

  return (
    <div className="tile-notch bg-hairline-strong p-px">
      <div className="tile-notch grid gap-6 bg-elevated p-4 min-[480px]:p-6">
        <div
          role="tablist"
          aria-label="Choose a scope"
          onKeyDown={(event) => arrowNav(event, SCOPES.length, active, select)}
          className="flex flex-wrap gap-1 rounded-lg border border-hairline bg-deep p-1"
        >
          <AnimatedBackground
            defaultValue={SCOPES[0].id}
            className="rounded-md border border-hairline-strong bg-card"
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            onValueChange={(id) => {
              const index = SCOPES.findIndex((scope) => scope.id === id);
              if (index >= 0) select(index);
            }}
          >
            {SCOPES.map((scope, index) => (
              <button
                key={scope.id}
                data-id={scope.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                className={cn(
                  "h-9 cursor-pointer px-3 text-sm font-medium transition-colors duration-300 ease-base",
                  active === index ? "text-ink" : "text-mute hover:text-ink",
                )}
              >
                {scope.label}
              </button>
            ))}
          </AnimatedBackground>
        </div>

        <div className="grid items-center gap-6 min-[560px]:grid-cols-[9rem_1fr]">
          <div aria-hidden="true" className="relative mx-auto aspect-square w-36">
            {SCOPES.map((scope, index) => (
              <span
                key={scope.id}
                style={{ inset: `${(SCOPES.length - 1 - index) * 14}px` }}
                className={cn(
                  "absolute border transition-[border-color,background-color] duration-500 ease-base",
                  index === active ? "border-periwinkle bg-primary/10" : "border-hairline-strong",
                  index < active && "border-periwinkle/40",
                )}
              />
            ))}
            <span className="absolute inset-[66px] bg-periwinkle" />
          </div>

          <div role="tabpanel">
            <TransitionPanel activeIndex={active} {...PANEL}>
              {SCOPES.map((scope) => (
                <div key={scope.id} className="grid gap-3">
                  <p className="caption-1 font-mono">
                    scope · <span className="text-ink">{scope.name}</span>
                  </p>
                  <dl className="grid divide-y divide-hairline rounded-lg border border-hairline bg-deep">
                    {scope.rows.map(([term, detail]) => (
                      <div key={term} className="grid gap-1 px-4 py-2.5 min-[480px]:grid-cols-[6.5rem_1fr]">
                        <dt className="text-xs font-medium text-periwinkle">{term}</dt>
                        <dd className="text-sm text-body">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </TransitionPanel>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StepTabsClient({ mocks }: { mocks: { title: string; body: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const running = inView && !hover;

  return (
    <div ref={ref} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} className="grid gap-6">
      <div
        role="tablist"
        aria-label="Steps"
        onKeyDown={(event) => arrowNav(event, STEPS.length, active, setActive)}
        className="grid gap-2 tab:grid-cols-3"
      >
        {STEPS.map((step, index) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            id={`step-tab-${index}`}
            aria-selected={active === index}
            aria-controls="step-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            className={cn(
              "grid cursor-pointer content-start gap-2 rounded-xl border p-5 text-left transition-[border-color,background-color] duration-500 ease-base",
              active === index ? "border-hairline-strong bg-elevated" : "border-transparent hover:bg-card",
            )}
          >
            <span className="font-mono text-xs text-periwinkle">{String(index + 1).padStart(2, "0")}</span>
            <span className={cn("heading-4 transition-colors duration-500", active !== index && "text-mute")}>
              {step.title}
            </span>
            <span className="body-2">{step.body}</span>
            <span className="mt-2 block h-px overflow-hidden bg-hairline-strong">
              {active === index && !reduce && (
                <span
                  key={active}
                  onAnimationEnd={() => setActive((active + 1) % STEPS.length)}
                  style={{ animationPlayState: running ? "running" : "paused" }}
                  className="block h-full origin-left animate-progress bg-periwinkle"
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <Frame title={mocks[active].title} className="mx-auto w-full max-w-5xl">
        <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${active}`}>
          <TransitionPanel activeIndex={active} {...PANEL}>
            {mocks.map((mock) => (
              <div key={mock.title}>{mock.body}</div>
            ))}
          </TransitionPanel>
        </div>
      </Frame>
    </div>
  );
}

export function TriggerKeys() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-center gap-10 tab:grid-cols-2">
      <div
        role="tablist"
        aria-label="Background triggers"
        onKeyDown={(event) => arrowNav(event, TRIGGERS.length, active, setActive)}
        className="grid grid-cols-2 gap-3 rounded-2xl border border-hairline-strong bg-deep p-3"
      >
        {TRIGGERS.map((trigger, index) => (
          <button
            key={trigger.key}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="trigger-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            className="group/key h-28 cursor-pointer rounded-xl bg-hairline-strong pb-1.5 text-left tab:h-32"
          >
            <span
              className={cn(
                "flex h-full flex-col justify-between rounded-xl border bg-elevated p-4 transition-[transform,border-color,background-color] duration-300 ease-base group-active/key:translate-y-1.5 motion-reduce:transition-colors",
                active === index
                  ? "translate-y-1.5 border-periwinkle bg-card motion-reduce:translate-y-0"
                  : "border-hairline-strong group-hover/key:-translate-y-0.5 motion-reduce:group-hover/key:translate-y-0",
              )}
            >
              <span className="flex items-center justify-between">
                <span className="font-mono text-xs text-ash">{index + 1}</span>
                <span
                  className={cn(
                    "size-2 transition-colors duration-300",
                    active === index ? "bg-ok" : "bg-hairline-strong",
                  )}
                />
              </span>
              <span className="text-lg font-medium text-ink">{trigger.key}</span>
            </span>
          </button>
        ))}
      </div>

      <div id="trigger-panel" role="tabpanel">
        <TransitionPanel activeIndex={active} {...PANEL}>
          {TRIGGERS.map((trigger) => (
            <div key={trigger.key} className="grid gap-4">
              <span className="caption-1 font-mono">{trigger.what}</span>
              <h3 className="heading-3">{trigger.key}</h3>
              <p className="body-1">{trigger.body}</p>
              <ol className="mt-2 grid gap-0">
                {trigger.example.map((line, index) => (
                  <m.li
                    key={line}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.12, duration: 0.5, ease: EASE }}
                    className="grid grid-cols-[1rem_1fr] gap-3"
                  >
                    <span className="flex flex-col items-center">
                      <span
                        className={cn(
                          "mt-1.5 size-2 flex-none",
                          index === trigger.example.length - 1 ? "bg-ok" : "bg-periwinkle",
                        )}
                      />
                      {index < trigger.example.length - 1 && <span className="w-px flex-1 bg-hairline-strong" />}
                    </span>
                    <span className="pb-4 text-sm text-body">{line}</span>
                  </m.li>
                ))}
              </ol>
            </div>
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}

const TERMINAL = [
  { cmd: "pip install pandas", out: "installed · stays installed for this scope", tone: "text-ok" },
  { cmd: "curl https://searchconsole.googleapis.com/…", out: "egress allowed by scope policy", tone: "text-ok" },
  { cmd: "rm -rf ./exports", out: "command policy · requires approval", tone: "text-ai-text" },
];

export function TerminalMock() {
  return (
    <div className="rounded-lg border border-hairline bg-deep p-4 font-mono text-[0.8125rem] leading-relaxed">
      {TERMINAL.map((line, index) => (
        <m.div
          key={line.cmd}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: index * 0.35, duration: 0.5, ease: EASE }}
          className="grid gap-0.5 pb-2"
        >
          <span className="truncate text-ink">
            <span className="text-periwinkle">$ </span>
            {line.cmd}
          </span>
          <span className={line.tone}>{line.out}</span>
        </m.div>
      ))}
      <span className="inline-block h-4 w-2 animate-pulse bg-periwinkle align-middle" />
    </div>
  );
}

export function ModelPicker() {
  const harnesses = [
    ["Pi", "Default"],
    ["OpenCode", "Allowed"],
    ["Codex", "Allowed"],
    ["Claude Code", "Allowed"],
  ];
  return (
    <div className="grid gap-3">
      <div className="grid gap-1 rounded-lg border border-hairline bg-deep p-1">
        <AnimatedBackground
          enableHover
          className="rounded-md border border-hairline-strong bg-elevated"
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          {harnesses.map(([name, state]) => (
            <div key={name} data-id={name} className="w-full px-3 py-2.5 [&>div]:flex [&>div]:w-full [&>div]:items-center [&>div]:justify-between [&>div]:gap-3">
              <span className="flex items-center gap-2 text-sm text-ink">
                <span className={cn("size-2", state === "Default" ? "bg-ok" : "bg-periwinkle")} />
                {name}
              </span>
              <span className="caption-1">{state}</span>
            </div>
          ))}
        </AnimatedBackground>
      </div>
      <div className="grid gap-1 rounded-lg border border-hairline bg-deep px-4 py-3">
        <span className="caption-1">Providers</span>
        <span className="text-sm text-body">Anthropic · OpenAI · OpenRouter</span>
      </div>
      <div className="grid gap-2 rounded-lg border border-hairline bg-deep px-4 py-3">
        <span className="caption-1">Usage is metered per person and per org</span>
        <span className="flex h-1 bg-hairline-strong">
          <m.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="h-full w-[62%] origin-left bg-periwinkle"
          />
        </span>
      </div>
    </div>
  );
}

const POSTURES = [
  { id: "strict", note: "Every tool call waits for approval" },
  { id: "auto", note: "Command policy decides, risky actions wait" },
  { id: "dangerous", note: "Agents act without approval prompts" },
];

const AUDIT = [
  ["09:02", "seo-analyst", "read search_console", "allowed"],
  ["09:04", "seo-analyst", "post #growth", "approved by Priya"],
  ["09:11", "release-notes", "rm -rf ./exports", "declined"],
];

export function PostureAudit() {
  const [posture, setPosture] = useState("auto");
  const note = POSTURES.find((item) => item.id === posture)?.note;

  return (
    <div className="grid gap-4 min-[640px]:grid-cols-[minmax(0,14rem)_1fr]">
      <div className="grid content-start gap-3">
        <span className="caption-1">Security posture</span>
        <div
          role="radiogroup"
          aria-label="Security posture"
          className="flex gap-1 rounded-lg border border-hairline bg-deep p-1"
        >
          <AnimatedBackground
            defaultValue="auto"
            className={cn(
              "rounded-md border",
              posture === "dangerous" ? "border-ai/60 bg-ai/15" : "border-hairline-strong bg-elevated",
            )}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            onValueChange={(id) => id && setPosture(id)}
          >
            {POSTURES.map((item) => (
              <button
                key={item.id}
                data-id={item.id}
                type="button"
                role="radio"
                aria-checked={posture === item.id}
                className={cn(
                  "h-8 flex-1 cursor-pointer justify-center px-2 text-center text-xs [&>div]:w-full font-medium capitalize transition-colors duration-300",
                  posture === item.id ? "text-ink" : "text-mute hover:text-ink",
                )}
              >
                {item.id}
              </button>
            ))}
          </AnimatedBackground>
        </div>
        <p aria-live="polite" className="caption-1 min-h-10">
          {note}. Narrower scopes can only tighten it.
        </p>
      </div>
      <div className="overflow-hidden rounded-lg border border-hairline bg-deep">
        <div className="caption-1 grid grid-cols-[3rem_1fr_auto] gap-3 border-b border-hairline px-4 py-2">
          <span>Time</span>
          <span>Action</span>
          <span>Decision</span>
        </div>
        {AUDIT.map(([time, actor, action, decision]) => (
          <div
            key={time}
            className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-hairline px-4 py-2.5 last:border-b-0"
          >
            <span className="font-mono text-xs text-ash">{time}</span>
            <span className="min-w-0 truncate text-sm text-body">
              <span className="text-ink">{actor}</span> {action}
            </span>
            <span
              className={cn(
                "text-xs whitespace-nowrap",
                ({ declined: "text-ai-text", allowed: "text-ok" } as Record<string, string>)[decision] ?? "text-periwinkle",
              )}
            >
              {decision}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarsMock() {
  const bars = [38, 52, 47, 61, 44, 70, 58, 66, 49, 74, 63, 81];
  return (
    <div className="grid gap-3 rounded-lg border border-hairline bg-deep p-4">
      <span className="caption-1 flex justify-between">
        Search Console clicks <span>Sample data</span>
      </span>
      <div className="flex h-24 items-end gap-1.5">
        {bars.map((height, index) => (
          <m.span
            key={index}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: EASE }}
            style={{ height: `${height}%` }}
            className={cn("flex-1 origin-bottom", index === bars.length - 1 ? "bg-ai" : "bg-periwinkle/70")}
          />
        ))}
      </div>
    </div>
  );
}

const FIELD_COLS = 21;
const FIELD_ROWS = 9;
const N_ROWS = ["1000001", "1100001", "1010001", "1001001", "1000101", "1000011", "1000001"];

export function PixelField() {
  const offsetX = (FIELD_COLS - 7) / 2;
  const cells = Array.from({ length: FIELD_COLS * FIELD_ROWS }, (_, index) => {
    const x = (index % FIELD_COLS) - offsetX;
    const y = Math.floor(index / FIELD_COLS) - 1;
    return N_ROWS[y]?.[x] === "1";
  });
  const order = cells.map((on, index) => (on ? cells.slice(0, index).filter(Boolean).length : 0));

  return (
    <div
      aria-hidden="true"
      className="mx-auto grid w-full max-w-xl gap-1"
      style={{ gridTemplateColumns: `repeat(${FIELD_COLS}, minmax(0, 1fr))` }}
    >
      {cells.map((on, index) =>
        on ? (
          <m.span
            key={index}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: order[index] * 0.03, duration: 0.5, ease: EASE }}
            className="aspect-square bg-periwinkle transition-colors duration-1000 ease-base hover:bg-ai hover:duration-0"
          />
        ) : (
          <span
            key={index}
            className="aspect-square bg-hairline transition-colors duration-1000 ease-base hover:bg-ai/60 hover:duration-0"
          />
        ),
      )}
    </div>
  );
}

const LEGWORK = ["Read Search Console for last week", "Compare against the previous 28 days", "Draft the summary for #growth"];

export function Handoff() {
  const step = (index: number) => ({
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { delay: 0.2 + index * 0.35, duration: 0.6, ease: EASE },
  });

  return (
    <div aria-hidden="true" className="grid gap-3">
      <span className="caption-1 flex items-center gap-2">
        <span className="size-2 bg-ai" />
        Legwork · agent
      </span>
      <div className="grid gap-2">
        {LEGWORK.map((line, index) => (
          <m.div
            key={line}
            {...step(index)}
            className="flex items-center gap-3 rounded-lg border border-hairline bg-card px-4 py-3"
          >
            <span className="font-mono text-xs text-ash">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 flex-1 truncate text-sm text-body">{line}</span>
            <span className="text-xs text-ok">done</span>
          </m.div>
        ))}
      </div>
      <m.span {...step(3)} className="ml-8 h-6 w-px bg-hairline-strong" />
      <span className="caption-1 flex items-center gap-2">
        <span className="size-2 bg-periwinkle" />
        Judgment · you
      </span>
      <m.div {...step(3.5)} className="grid gap-3 rounded-xl border border-periwinkle bg-elevated p-4">
        <span className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-medium text-ink">Post summary to #growth</span>
          <span className="pill pill-ai">Needs you</span>
        </span>
        <span className="flex gap-2">
          <span className="btn btn-md btn-ghost">Decline</span>
          <span className="btn btn-md btn-ghost border-periwinkle">Approve</span>
        </span>
      </m.div>
      <m.span {...step(4.5)} className="caption-1 flex items-center gap-2">
        <span className="dot" />
        Approved by Priya · posted and recorded in the audit log
      </m.span>
    </div>
  );
}
