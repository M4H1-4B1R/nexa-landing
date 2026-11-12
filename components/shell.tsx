import type { ReactNode } from "react";
import { LOGIN_URL } from "@/lib/content";

export function Logo() {
  return (
    <svg viewBox="0 0 5 5" aria-hidden="true" className="size-5 fill-current">
      <path d="M0 0h1v5H0zM1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3zM4 0h1v5H4z" />
    </svg>
  );
}

export function ApprovalCard() {
  return (
    <div className="grid gap-3 rounded-xl border border-hairline-strong bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-ink">Post summary to #growth</p>
        <span className="pill pill-ai">Needs you</span>
      </div>
      <div className="well code-md">
        <span>channel: #growth</span>
        <span>text: &quot;Pages that lost clicks week over week, with the queries behind each drop.&quot;</span>
      </div>
      <div className="flex gap-2">
        <span className="btn btn-md btn-ghost">Edit</span>
        <span className="btn btn-md btn-ghost">Approve</span>
      </div>
    </div>
  );
}

export function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="size-2 rotate-45 border-t-[1.5px] border-r-[1.5px] border-current transition-transform duration-500 ease-base group-hover/btn:translate-x-0.5"
    />
  );
}

export function LoginButton({ children, large = false }: { children: ReactNode; large?: boolean }) {
  return (
    <a href={LOGIN_URL} className={`group/btn btn btn-primary ${large ? "btn-lg" : "btn-md"}`}>
      {children}
      <Arrow />
    </a>
  );
}

export function PageShell({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header className="wrap-x py-6">
        <a href="/" className="brand" aria-label="Nexagents home">
          <Logo />
          Nexagents
        </a>
      </header>
      <main className="wrap-x">
        <div
          className={`grid w-full max-w-[680px] content-center gap-6 pt-12 pb-24 ${center ? "mx-auto justify-items-center text-center" : "justify-items-start"}`}
        >
          {children}
        </div>
      </main>
      <footer className="wrap-x flex flex-wrap justify-between gap-4 border-t border-hairline py-6">
        <p className="caption-1">© 2026 Nexagents</p>
        <a href="/" className="footer-link">
          Home
        </a>
      </footer>
    </div>
  );
}
