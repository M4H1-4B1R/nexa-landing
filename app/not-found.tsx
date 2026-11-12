import type { Metadata } from "next";
import { PageShell } from "@/components/shell";
import { LOGIN_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found | Nexagents",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageShell center>
      <p className="font-mono text-[0.8125rem] text-periwinkle">404</p>
      <h1 className="heading-1">That page does not exist</h1>
      <p className="body-1">The link may be old or mistyped. Head back to the home page, or log in to your workspace.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="/" className="btn btn-lg btn-ghost">
          Back to home
        </a>
        <a href={LOGIN_URL} className="btn btn-lg btn-primary">
          Log in
        </a>
      </div>
    </PageShell>
  );
}
