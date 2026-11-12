"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { LOGIN_URL, NAV_LINKS } from "@/lib/content";
import { Logo } from "@/components/shell";

export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const targets = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => el !== null,
    );
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((el) => spy.observe(el));
    return () => spy.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("locked", open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 54rem)");
    const onWide = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const bar = "absolute top-[17px] left-[9px] h-[1.5px] w-[18px] bg-ink transition-transform duration-500 ease-base";

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className="pointer-events-auto flex h-[52px] items-center gap-4 rounded-xl border border-hairline-strong bg-card/60 pr-2 pl-4 backdrop-blur-lg tab:gap-6"
        >
          <a href="#top" className="brand" aria-label="Nexagents home">
            <Logo />
            Nexagents
          </a>
          <div className="hidden items-center gap-1 tab:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                aria-current={active === link.href ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a href={LOGIN_URL} className="btn btn-md btn-ghost hidden tab:inline-flex">
            Log in
          </a>
          <button
            type="button"
            className="relative size-9 cursor-pointer rounded-lg tab:hidden"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`${bar} ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`${bar} ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </nav>
      </div>

      <div
        id="menu"
        inert={!open}
        className={`fixed inset-0 z-40 grid content-center gap-2 bg-black/90 px-4 pt-24 pb-12 backdrop-blur-2xl transition-[opacity,visibility] duration-500 ease-base min-[480px]:px-6 tab:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {[...NAV_LINKS.map((link) => ({ ...link, cta: false })), { href: LOGIN_URL, label: "Log in to your workspace", cta: true }].map(
          (link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={!link.cta && active === link.href ? "true" : undefined}
              style={{ transitionDelay: open ? `${Math.min(index * 60, 400)}ms` : "0ms" }}
              className={`transition-[opacity,transform] duration-500 ease-base motion-reduce:translate-y-0 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${link.cta ? "btn btn-lg btn-primary mt-6" : "heading-3 block border-b border-hairline py-3 aria-[current=true]:text-link"}`}
            >
              {link.label}
            </a>
          ),
        )}
      </div>
    </>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || el.getBoundingClientRect().top < window.innerHeight) return;
    setHidden(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHidden(false);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-700 ease-base motion-reduce:translate-y-0 motion-reduce:transition-opacity ${hidden ? "translate-y-8 opacity-0" : ""}`}
    >
      {children}
    </div>
  );
}

export function Tagline({ text }: { text: string }) {
  const words = text.split(" ");
  const [armed, setArmed] = useState(false);
  const [lit, setLit] = useState<ReadonlySet<number>>(new Set());
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((entry) => entry.isIntersecting);
        if (!hits.length) return;
        setLit((prev) => {
          const next = new Set(prev);
          hits.forEach((entry) => next.add(Number((entry.target as HTMLElement).dataset.i)));
          return next;
        });
        hits.forEach((entry) => observer.unobserve(entry.target));
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <p className="heading-1 max-w-[760px]">
      {words.map((word, i) => (
        <span key={i}>
          <span
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-i={i}
            style={{ transitionDelay: `${(i % 8) * 40}ms` }}
            className={`transition-opacity duration-500 ease-base ${armed && !lit.has(i) ? "opacity-30" : "opacity-100"}`}
          >
            {word}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}
