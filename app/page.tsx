import { Bot, Database, Globe, KeyRound, NotebookPen, ShieldCheck, SquareTerminal, Workflow } from "lucide-react";
import { Header, Reveal, Tagline } from "@/components/site";
import {
  BarsMock,
  Handoff,
  Marquee,
  ModelPicker,
  PixelField,
  PostureAudit,
  ScopeExplorer,
  StepTabs,
  TerminalMock,
  Tile,
  TriggerKeys,
} from "@/components/sections";
import { ApprovalCard, Logo, LoginButton } from "@/components/shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Magnetic } from "@/components/ui/magnetic";
import { TextEffect } from "@/components/ui/text-effect";
import { BorderTrail } from "@/components/ui/border-trail";
import { FAQ, LOGIN_URL, NAV_LINKS, PRINCIPLES, ROLES } from "@/lib/content";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-10 grid max-w-[760px] gap-4 ${center ? "mx-auto justify-items-center text-center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading-2">{title}</h2>
      {lede && <p className="body-1">{lede}</p>}
    </Reveal>
  );
}

function SessionTile() {
  return (
    <div
      role="img"
      aria-label="Illustration of a Nexagents session. A person asks an analyst agent for Search Console numbers, the agent works, then asks for approval before posting a summary to a channel."
      className="relative mt-12 w-full max-w-[1040px] rounded-xl border border-hairline-strong bg-elevated text-left"
    >
      <BorderTrail size={120} className="bg-linear-to-l from-ai via-periwinkle to-transparent" transition={{ repeat: Infinity, duration: 9, ease: "linear" }} />
      <div aria-hidden="true" className="grid gap-4 p-4 min-[480px]:p-6">
        <div className="flex items-center gap-2 border-b border-hairline pb-3">
          <span className="dot" />
          <span className="caption-1">Online</span>
          <span className="caption-1 ml-auto">Illustrative session</span>
        </div>
        <div className="grid grid-cols-[32px_1fr] gap-3">
          <span className="grid size-8 place-items-center rounded-lg border border-hairline-strong bg-card text-xs font-medium text-ink">
            PN
          </span>
          <div className="grid min-w-0 gap-2">
            <p className="text-sm font-medium text-ink">Priya Nair</p>
            <p className="body-2">@seo-analyst Pull last week&apos;s Search Console numbers and flag pages that lost clicks.</p>
          </div>
        </div>
        <div className="grid grid-cols-[32px_1fr] gap-3">
          <span className="grid size-8 place-items-center rounded-lg border border-ai/40 bg-card text-xs font-medium text-ai-text">
            SA
          </span>
          <div className="grid min-w-0 gap-2">
            <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
              seo-analyst <span className="pill pill-ai">AI</span>
            </p>
            <div className="well code-md">
              <span>read search_console · last 28 days</span>
              <span>compare previous 28 days</span>
              <span className="text-ok">done · pages with fewer clicks listed</span>
            </div>
            <ApprovalCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function SurfacesMock() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {["Slack", "Web app"].map((surface) => (
        <div key={surface} className="grid gap-3 rounded-lg border border-hairline bg-deep p-3">
          <span className="caption-1">{surface}</span>
          <span className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md border border-hairline-strong bg-card text-[0.625rem] font-medium text-ink">
              PN
            </span>
            <span className="truncate text-xs text-ink">Priya Nair</span>
          </span>
          <span className="caption-1 flex items-center gap-1.5">
            <span className="dot" /> same access
          </span>
        </div>
      ))}
    </div>
  );
}

function NotebookMock() {
  const lines = ["Weekly report goes to #growth on Mondays", "Compare against the previous 28 days", "Ask before posting outside the channel"];
  return (
    <div className="grid gap-2 rounded-lg border border-hairline bg-deep p-4">
      <span className="caption-1 font-mono">notebook · #growth</span>
      {lines.map((line) => (
        <span key={line} className="flex gap-2 text-sm text-body">
          <span className="mt-2 size-1.5 flex-none bg-periwinkle" />
          {line}
        </span>
      ))}
    </div>
  );
}

function AgentsMock() {
  return (
    <div className="grid gap-2 rounded-lg border border-hairline bg-deep p-4 font-mono text-xs">
      <span className="w-fit rounded-md border border-ai/40 px-2 py-1 text-ai-text">@team plan the launch post</span>
      <span className="ml-4 h-3 w-px bg-hairline-strong" />
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md border border-hairline-strong px-2 py-1 text-ink">@seo-analyst</span>
        <span className="rounded-md border border-hairline-strong px-2 py-1 text-ink">@release-notes</span>
      </div>
    </div>
  );
}

function KeychainMock() {
  const keys = [
    ["Search Console", "personal", true],
    ["GitHub MCP", "shared", true],
    ["Analytics", "personal", false],
  ] as const;
  return (
    <div className="grid divide-y divide-hairline rounded-lg border border-hairline bg-deep">
      {keys.map(([name, kind, connected]) => (
        <div key={name} className="flex items-center justify-between gap-3 px-4 py-2.5">
          <span className="flex items-center gap-2 text-sm text-ink">
            <KeyRound className="size-3.5 text-mute" aria-hidden="true" />
            {name}
          </span>
          <span className={`caption-1 ${connected ? "" : "text-ai-text"}`}>{connected ? kind : "reconnect"}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-2 left-2 z-[100] -translate-y-[200%] rounded-lg bg-primary px-4 py-2 text-white transition-transform duration-500 ease-base focus:translate-y-0"
      >
        Skip to content
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main id="main">
        <section id="top" className="relative overflow-hidden pt-32 pb-12 text-center tab:pt-40">
          <div aria-hidden="true" className="hero-grid" />
          <div aria-hidden="true" className="hero-glow" />
          <div className="wrap-x relative z-10 grid justify-items-center gap-6">
            <span className="pill pill-ai">Agents that work as your team</span>
            <TextEffect as="h1" per="word" preset="fade-in-blur" speedReveal={1.4} className="heading-1 max-w-[680px]">
              People and AI agents, working side by side
            </TextEffect>
            <p className="body-1 max-w-[680px] animate-fade-up [animation-delay:400ms]">
              Nexagents is one shared workspace for your organization. Talk to agents in Slack or on the web. They read
              files, run commands, call your systems and remember what happened last week.
            </p>
            <div className="flex w-full animate-fade-up flex-wrap justify-center gap-3 [animation-delay:550ms] min-[480px]:w-auto">
              <LoginButton large>Open your workspace</LoginButton>
              <a href="#how" className="btn btn-lg btn-ghost">
                See how it works
              </a>
            </div>
            <SessionTile />
          </div>
          <div className="wrap-x relative z-10 mt-16 grid grid-cols-[minmax(0,1fr)] gap-4">
            <p className="caption-1">Works across your surfaces, harnesses and models</p>
            <Marquee />
          </div>
        </section>

        <section id="what" className="section-y">
          <div className="wrap-x grid gap-12 tab:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] tab:gap-16 tab:items-start">
            <div className="grid gap-10 tab:sticky tab:top-28">
              <Reveal className="grid gap-4">
                <span className="eyebrow">What it is</span>
                <h2 className="heading-2">One workspace where agents do real work for your whole organization</h2>
                <p className="body-1">
                  Most assistants are built for one person. Nexagents is built for a company. One deployment serves
                  everyone, and each person and each room keeps its own state.
                </p>
              </Reveal>
              <Reveal>
                <ol className="grid divide-y divide-hairline border-y border-hairline">
                  {PRINCIPLES.map((item, index) => (
                    <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-2 py-5">
                      <span className="font-mono text-xs leading-7 text-periwinkle">{String(index + 1).padStart(2, "0")}</span>
                      <span className="grid gap-1">
                        <span className="heading-4">{item.title}</span>
                        <span className="body-2">{item.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
            <Reveal className="grid gap-3">
              <ScopeExplorer />
              <p className="caption-1">Pick a scope to see what belongs to it. Examples are illustrative.</p>
            </Reveal>
          </div>
        </section>

        <section aria-label="Our promise" className="relative overflow-hidden py-20 tab:py-28">
          <div aria-hidden="true" className="hero-grid [mask-image:radial-gradient(ellipse_50%_70%_at_70%_50%,#000,transparent_80%)]" />
          <div className="wrap-x relative grid items-center gap-12 tab:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] tab:gap-20">
            <div className="grid gap-6">
              <span className="eyebrow">Our promise</span>
              <Tagline text="Your team keeps the judgment. Agents take the legwork, and they ask before they act." />
            </div>
            <Handoff />
          </div>
        </section>

        <section id="how" className="section-y">
          <div aria-hidden="true" className="section-glow" />
          <div className="wrap-x relative">
            <SectionHead center eyebrow="How it works" title="From sign in to approved work in three steps" />
            <Reveal>
              <StepTabs />
            </Reveal>
          </div>
        </section>

        <section id="background" className="section-y">
          <div className="wrap-x">
            <SectionHead
              eyebrow="Background work"
              title="Work that starts on its own"
              lede="Four triggers start turns while nobody is watching. Each runs on behalf of the person who owns it, and the result waits in Slack or the web."
            />
            <Reveal>
              <TriggerKeys />
            </Reveal>
          </div>
        </section>

        <section id="features" className="section-y">
          <div className="wrap-x">
            <SectionHead
              eyebrow="Features"
              title="Everything an agent needs to finish the job"
              lede="Each capability is built to be controlled by your admins and used by your team. Interface examples are illustrative."
            />
            <Reveal className="grid gap-4 tab:grid-cols-3">
              <Tile
                className="tab:col-span-2"
                icon={<SquareTerminal />}
                title="A computer for every scope"
                body="Agents run commands in a sandbox that persists, so installed tools stay installed. Outbound network access is policed."
              >
                <TerminalMock />
              </Tile>
              <Tile
                className="tab:row-span-2"
                icon={<Workflow />}
                title="Your choice of model"
                body="Pi, OpenCode, Codex and Claude Code drive the same workspace. Access narrows from organization to person."
              >
                <ModelPicker />
              </Tile>
              <Tile icon={<NotebookPen />} title="Memory, files and projects" body="A notebook per scope remembers context between conversations.">
                <NotebookMock />
              </Tile>
              <Tile icon={<Bot />} title="Agents and skills your team builds" body="Address agents by @handle and let them hand work to each other.">
                <AgentsMock />
              </Tile>
              <Tile
                className="tab:col-span-2"
                icon={<ShieldCheck />}
                title="Control, approvals and audit"
                body="Security postures, command policy, approvals and screening, with every action in the audit log. Try the posture switch."
              >
                <PostureAudit />
              </Tile>
              <Tile icon={<KeyRound />} title="Credentials and integrations" body="A keychain, MCP servers, OAuth apps and connectors. Agents use your access, not a shared key.">
                <KeychainMock />
              </Tile>
              <Tile icon={<Globe />} title="Slack and web, one identity" body="The same person, access and settings follow you across both.">
                <SurfacesMock />
              </Tile>
              <Tile
                className="tab:col-span-2"
                icon={<Database />}
                title="Analytics and data stores"
                body="Connect Search Console and analytics sources, and give agents grants to the data stores your admins create."
              >
                <BarsMock />
              </Tile>
            </Reveal>
          </div>
        </section>

        <section id="who" className="section-y">
          <div className="wrap-x">
            <SectionHead eyebrow="Who it is for" title="Built for the people who use it and the people who answer for it" />
            <div className="grid divide-y divide-hairline border-y border-hairline tab:grid-cols-3 tab:divide-x tab:divide-y-0">
              {ROLES.map((item, index) => (
                <Reveal key={item.role} className="group/role grid content-start gap-6 py-8 tab:px-8 tab:first:pl-0 tab:last:pr-0">
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-xs text-periwinkle">{String(index + 1).padStart(2, "0")}</span>
                    <span className="pill">{item.where}</span>
                  </span>
                  <h3 className="heading-3 transition-transform duration-500 ease-base group-hover/role:translate-x-1 motion-reduce:group-hover/role:translate-x-0">
                    {item.role}
                  </h3>
                  <ul className="grid gap-3">
                    {item.does.map((line) => (
                      <li key={line} className="flex gap-3 text-sm text-body">
                        <span className="mt-1.5 size-2 flex-none bg-hairline-strong transition-colors duration-500 group-hover/role:bg-periwinkle" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-y">
          <div className="wrap-x">
            <SectionHead center eyebrow="FAQ" title="Questions teams ask before they sign in" />
            <Reveal className="mx-auto max-w-[960px]">
              <Accordion className="gap-2">
                {FAQ.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="rounded-xl border border-hairline-strong bg-card transition-colors duration-500 ease-base hover:border-periwinkle/60 data-open:border-periwinkle"
                  >
                    <AccordionTrigger className="heading-4 cursor-pointer text-lg items-center gap-4 rounded-xl px-6 py-4 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-mute">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5">
                      <p className="body-1">{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        <section id="start" className="section-y">
          <div aria-hidden="true" className="section-glow" />
          <div className="wrap-x relative">
            <Reveal className="grid justify-items-center gap-8 rounded-2xl border border-hairline-strong bg-card px-4 py-16 text-center min-[480px]:px-8">
              <PixelField />
              <div className="grid justify-items-center gap-4">
                <h2 className="heading-2 max-w-[680px]">Put your first agent to work</h2>
                <p className="body-1 max-w-[680px]">
                  Sign in with your work email and open your workspace. Your admin decides what agents can reach, so
                  nothing runs outside the approvals you have set.
                </p>
              </div>
              <Magnetic intensity={0.25} range={120}>
                <LoginButton large>Open your workspace</LoginButton>
              </Magnetic>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="overflow-hidden border-t border-hairline pt-16">
        <div className="wrap-x">
          <div className="grid grid-cols-2 gap-8 tab:grid-cols-[2fr_1fr_1fr_1fr]">
            <div className="col-span-2 grid content-start gap-2 tab:col-span-1">
              <a href="#top" className="brand" aria-label="Back to top">
                <Logo />
                Nexagents
              </a>
              <p className="body-2">A workspace where people and AI agents work side by side.</p>
            </div>
            <div className="grid content-start gap-2">
              <p className="caption-1 mb-1 text-mute">Product</p>
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="grid content-start gap-2">
              <p className="caption-1 mb-1 text-mute">Account</p>
              <a href={LOGIN_URL} className="footer-link">
                Log in
              </a>
            </div>
            <div className="grid content-start gap-2">
              <p className="caption-1 mb-1 text-mute">Legal</p>
              <a href="/privacy" className="footer-link">
                Privacy
              </a>
              <a href="/terms" className="footer-link">
                Terms
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-hairline pt-6">
            <p className="caption-1">© 2026 Nexagents</p>
            <a href="#top" className="footer-link">
              Back to top
            </a>
          </div>
        </div>
        <p
          aria-hidden="true"
          className="mt-8 -mb-[0.22em] text-center text-[clamp(4.5rem,19vw,16rem)] leading-none font-medium tracking-[-0.06em] text-elevated select-none"
        >
          Nexagents
        </p>
      </footer>
    </>
  );
}
