import type { ReactNode } from "react";
import { Frame } from "@/components/frame";
import { Spotlight } from "@/components/ui/spotlight";
import { ApprovalCard, Logo } from "@/components/shell";
import { StepTabsClient } from "@/components/sections-client";
import { cn } from "@/lib/utils";

export { Frame } from "@/components/frame";
export {
  Handoff,
  Marquee,
  ModelPicker,
  PixelField,
  PostureAudit,
  BarsMock,
  ScopeExplorer,
  TerminalMock,
  TriggerKeys,
} from "@/components/sections-client";

function SignInMock() {
  return (
    <div className="mx-auto grid w-full max-w-sm gap-4 px-4 py-8 min-[480px]:py-10">
      <span className="flex items-center gap-2 text-ink">
        <Logo />
        <span className="font-medium">Sign in to your workspace</span>
      </span>
      <div className="grid gap-2">
        <span className="caption-1">Work email</span>
        <span className="flex h-10 items-center rounded-lg border border-periwinkle bg-deep px-3 text-sm text-ink">
          priya@yourcompany.com
          <span className="ml-px h-4 w-px animate-pulse bg-periwinkle" />
        </span>
      </div>
      <span className="btn btn-md btn-ghost w-full">Email me a sign in link</span>
      <span className="caption-1 flex items-center gap-2">
        <span className="dot" />
        On the roster · single use link, valid 15 minutes
      </span>
    </div>
  );
}

function ComposerMock() {
  const agents = [
    ["seo-analyst", "Search Console and analytics"],
    ["release-notes", "Drafts notes from merged work"],
    ["team", "Plans and hands work to other agents"],
  ];
  return (
    <div className="grid gap-4 p-4 min-[480px]:p-6">
      <div className="grid gap-1 rounded-lg border border-hairline bg-deep p-1">
        {agents.map(([handle, role], index) => (
          <div
            key={handle}
            className={cn(
              "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm",
              index === 0 ? "border border-hairline-strong bg-card text-ink" : "border border-transparent text-mute",
            )}
          >
            <span className="font-mono">@{handle}</span>
            <span className="caption-1 hidden min-[480px]:inline">{role}</span>
          </div>
        ))}
      </div>
      <div className="grid gap-3 rounded-xl border border-hairline-strong bg-deep p-4">
        <p className="text-sm text-ink">
          <span className="text-ai-text">@seo-analyst</span> every Monday, flag pages that lost clicks and post to
          #growth
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="pill">cron · Mondays 09:00</span>
          <span className="pill">#growth</span>
          <span className="caption-1 ml-auto">Enter to send</span>
        </div>
      </div>
    </div>
  );
}

const STEP_MOCKS = [
  { title: "app.nexagents.cloud/auth/login", body: <SignInMock /> },
  { title: "#growth · new message", body: <ComposerMock /> },
  {
    title: "seo-analyst · waiting for you",
    body: (
      <div className="p-4 min-[480px]:p-6">
        <ApprovalCard />
      </div>
    ),
  },
];

export function StepTabs() {
  return <StepTabsClient mocks={STEP_MOCKS} />;
}

export function Tile({
  title,
  body,
  icon,
  className,
  children,
}: {
  title: string;
  body: string;
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={cn(
        "flex flex-col gap-6 overflow-hidden rounded-xl border border-hairline-strong bg-card p-5 transition-colors duration-500 ease-base hover:border-periwinkle/60 min-[480px]:p-6",
        className,
      )}
    >
      <Spotlight size={360} className="from-primary/30 via-ai/10 to-transparent blur-3xl" />
      <div className="relative flex-1">{children}</div>
      <div className="relative grid gap-2">
        <h3 className="heading-4 flex items-center gap-2">
          <span className="text-periwinkle [&_svg]:size-4">{icon}</span>
          {title}
        </h3>
        <p className="body-2">{body}</p>
      </div>
    </article>
  );
}

