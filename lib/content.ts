export const LOGIN_URL = "https://app.nexagents.cloud/auth/login";
export const SITE_URL = "https://nexagents.cloud";

export const NAV_LINKS = [
  { href: "#what", label: "What it is" },
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
] as const;

export const STACK = [
  "Slack",
  "Web app",
  "Pi",
  "OpenCode",
  "Codex",
  "Claude Code",
  "Anthropic",
  "OpenAI",
  "OpenRouter",
  "MCP servers",
  "OAuth connectors",
  "Search Console",
  "Fly",
  "AWS",
  "Docker",
];

export const PRINCIPLES = [
  {
    title: "Everyone's work stays separate",
    body: "Memory, files, credentials and permissions belong to a scope. Only what you may see in that scope reaches the model.",
  },
  {
    title: "Swap the model, keep the workspace",
    body: "The harness, the sandbox, the session store and the memory provider each sit behind an interface. Change one without rebuilding the rest.",
  },
  {
    title: "A deploy does not lose your work",
    body: "Audit, logs, queued work and resolved settings live in a database, not in process memory. Releases leave them where they were.",
  },
];

export const SCOPES = [
  {
    id: "person",
    label: "Person",
    name: "Priya Nair",
    rows: [
      ["Memory", "A notebook only Priya and her agents read"],
      ["Files", "Her uploads, artifacts and projects"],
      ["Credentials", "Her own keychain and personal MCP servers"],
      ["Sandbox", "Her computer, where installed tools stay installed"],
    ],
  },
  {
    id: "channel",
    label: "Channel",
    name: "#growth",
    rows: [
      ["Memory", "What the room has agreed on"],
      ["Files", "Everything shared in the channel"],
      ["Credentials", "Shared access granted to the room"],
      ["Sandbox", "One computer the channel works in together"],
    ],
  },
  {
    id: "team",
    label: "Team",
    name: "Marketing",
    rows: [
      ["Memory", "Team conventions and context"],
      ["Files", "Team projects and environments"],
      ["Credentials", "Connectors the team relies on"],
      ["Crons", "Schedules that report to the team"],
    ],
  },
  {
    id: "org",
    label: "Organization",
    name: "Your company",
    rows: [
      ["Memory", "Facts every agent should know"],
      ["Credentials", "Shared MCP servers and OAuth apps"],
      ["Posture", "The security floor: strict, auto or dangerous"],
      ["Grants", "Which models, harnesses and data stores are allowed"],
    ],
  },
] as const;

export const STEPS = [
  {
    title: "Sign in with your work email",
    body: "Your admin keeps the sign in roster. If you are on it, you get a single use link that lasts 15 minutes by default.",
  },
  {
    title: "Ask, assign or schedule",
    body: "Message an agent by @handle in Slack or the web app. Give it a task now, or set it to run while you are away.",
  },
  {
    title: "Review and approve",
    body: "When an action needs a decision, the agent waits and shows exactly what will run. You approve, edit or decline.",
  },
];

export const TRIGGERS = [
  {
    key: "Cron",
    what: "A schedule",
    body: "Runs a turn on a timetable you set, on behalf of the person who owns it.",
    example: ["Monday 09:00", "Pull last week's Search Console numbers", "Post the summary to #growth"],
  },
  {
    key: "Webhook",
    what: "An inbound HTTP call",
    body: "Another system calls in and an agent picks up the work it describes.",
    example: ["POST from your release pipeline", "Read the changelog and the diff", "Draft release notes for review"],
  },
  {
    key: "Monitor",
    what: "A watch on a process",
    body: "A long job runs in the sandbox and the agent continues when it finishes.",
    example: ["Build starts in the sandbox", "Process exits after 14 minutes", "Agent reports the result in the thread"],
  },
  {
    key: "Wake",
    what: "Routing for new messages",
    body: "Each incoming message either starts a run, steers the live one, or is dropped. Saying stop halts a live run.",
    example: ["Reply lands in an engaged thread", "Live run is steered with the new detail", "No duplicate run is started"],
  },
];

export const ROLES = [
  {
    role: "Members",
    where: "Slack and web",
    does: ["Chat with agents", "Build agents and skills", "Schedule crons", "Connect their own credentials"],
  },
  {
    role: "Org admins",
    where: "Admin panel",
    does: [
      "Set org configuration and security posture",
      "Choose which models and harnesses are available",
      "Manage grants and agent access",
      "Read the audit log and usage",
    ],
  },
  {
    role: "Operators",
    where: "CLI and release deployer",
    does: [
      "Own the cloud account, database and secrets",
      "Deploy on Fly, AWS or Docker",
      "Ship releases",
      "Recover when something fails",
    ],
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is Nexagents?",
    a: "Nexagents is an agent workspace for work, used in Slack and on the web. A person talks to an agent. The agent can read and write files, run commands in its own computer, call connected systems and keep memory between conversations. One deployment serves a whole organization, and every person and every room has its own isolated state.",
  },
  {
    q: "Where do I use it?",
    a: "In Slack and in the web app at app.nexagents.cloud. The same identity and configuration follow you across both, so a conversation, an agent or a skill you set up in one place is the same person and the same access in the other.",
  },
  {
    q: "How do I get access?",
    a: "Sign in with your work email. Your address must be on your organization's sign in roster, which your admin controls. You receive a single use link that lasts 15 minutes by default, and a password sign in is also possible. If you are not on the roster, ask your admin to add you.",
  },
  {
    q: "Can an agent act without asking me?",
    a: "Only where your admin allows it. An agent acts as the person it works for, with that person's credentials and permissions, and every action is audited. Admins set security postures and command policy, and actions that need a decision wait for an approval that shows exactly what will run.",
  },
  {
    q: "Who can see my data?",
    a: "Memory, files, credentials, crons, permissions and the sandbox all belong to a scope: one person, one channel, one team or the organization. A turn runs for a person inside a scope, and only the data that person may see in that scope reaches the model.",
  },
  {
    q: "Which models and harnesses can I use?",
    a: "Pi, OpenCode, Codex and Claude Code can all drive the same workspace. Access narrows from the organization to the person, and usage is metered so admins can see what is being spent.",
  },
  {
    q: "What can an agent actually run?",
    a: "Each scope has a sandboxed computer that stays around between conversations, so installed tools stay installed. Outbound network access from it is policed by your admin's egress rules.",
  },
  {
    q: "Does it work when I am away?",
    a: "Yes. Crons, webhooks, monitors and wakes run turns while nobody is watching, and the results are delivered to Slack or the web when you return.",
  },
  {
    q: "Is it built for customers or guests?",
    a: "No. The interactive surfaces assume one organization of authenticated internal users. Nexagents is not a hardened multitenant service, so guests and external users are outside its boundary.",
  },
];

export const LEGAL = {
  privacy: { title: "Privacy", body: "{{privacy policy text}}" },
  terms: { title: "Terms", body: "{{terms of service text}}" },
} as const;
