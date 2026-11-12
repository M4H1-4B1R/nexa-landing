import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MotionRoot } from "@/components/site";
import { SITE_URL } from "@/lib/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "swap" });

const description =
  "Nexagents is one shared workspace for your organization. Talk to AI agents in Slack or on the web. They read files, run commands, call your systems and ask before they act.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Nexagents | A workspace where people and AI agents work side by side",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Nexagents",
    title: "Nexagents | People and AI agents, working side by side",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexagents | People and AI agents, working side by side",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
