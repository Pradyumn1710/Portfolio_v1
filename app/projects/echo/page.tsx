"use client";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const projectData = {
  title: "Echo – Real-time Chat & Communication Engine",
  subtitle: "A fast, scalable chat backend supporting real-time messaging & state sync",
  date: "2024-11-01",
  techStack: ["Node.js", "WebSocket", "Redis", "MongoDB", "Express", "React", "Tailwind CSS"],
  githubUrl: "https://github.com/Pradyumn1710/echo",
  websiteUrl: "", // Add if deployed
  content: `
# What is Echo?

**Echo** is a lightweight, highly responsive **real-time chat backend** built for messaging platforms, collaborative tools, or anything needing instant sync and state reflection.

## Core Features

- Real-time communication via **WebSockets**
- Persistent message storage using **MongoDB**
- **Redis** used for pub/sub across services
- Seamless session management and presence detection
- Optional REST API layer for message history & user lookup

## Sample WebSocket Handler

\`\`\`ts
// Echo WebSocket flow
ws.on("message", (msg) => {
  const data = JSON.parse(msg);
  broadcastToRoom(data.roomId, data.message);
});
\`\`\`

## Infrastructure Overview

- Backend: Express + WS
- DB: MongoDB for persistence
- Cache/Sync: Redis pub-sub to broadcast messages
- Frontend: React-based UI with message threads

## Challenges Faced

- **Race conditions** in multi-client sync
- Latency tuning for smooth UX
- Handling **reconnects** and **state sync** gracefully

## Use Cases

- Chat systems
- Multiplayer games
- Collaborative editors (paired with OT/CRDTs)

## Future Plans

- Add rate-limiting, moderation controls
- User-to-user encryption
- Offline-first message syncing
`,
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { title, subtitle, date, techStack, githubUrl, websiteUrl, content } = projectData;

  return (
    <div className="relative min-h-screen px-6 py-24 mx-auto max-w-4xl">
      <button
        onClick={() => router.back()}
        className="flex items-center text-zinc-400 hover:text-zinc-100 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to projects
      </button>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-100 mb-2">{title}</h1>
        <p className="text-xl text-zinc-400 mb-6">{subtitle}</p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            <time dateTime={new Date(date).toISOString()}>
              {Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(new Date(date))}
            </time>
          </p>
          <div className="flex gap-4">
            {githubUrl && (
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-100 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
              >
                <Github className="w-4 h-4" /> GitHub
              </Link>
            )}
            {websiteUrl && (
              <Link href={websiteUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-100 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold text-zinc-200 mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium text-zinc-200 bg-zinc-800/50 rounded-full border border-zinc-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="prose prose-invert prose-zinc max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(props.className || "");
              return !inline && match ? (
                <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={props.className} {...props}>{children}</code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
