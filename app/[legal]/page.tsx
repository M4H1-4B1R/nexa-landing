import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/shell";
import { LEGAL } from "@/lib/content";

type Params = { legal: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return Object.keys(LEGAL).map((legal) => ({ legal }));
}

function pageFor(legal: string) {
  return legal in LEGAL ? LEGAL[legal as keyof typeof LEGAL] : undefined;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = pageFor((await params).legal);
  return { title: page ? `${page.title} | Nexagents` : "Nexagents" };
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const page = pageFor((await params).legal);
  if (!page) notFound();
  return (
    <PageShell>
      <h1 className="heading-1">{page.title}</h1>
      <p className="body-1">{page.body}</p>
      <a href="/" className="btn btn-md btn-ghost">
        Back to home
      </a>
    </PageShell>
  );
}
