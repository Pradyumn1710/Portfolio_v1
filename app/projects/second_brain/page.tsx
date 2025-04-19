"use client";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const projectData = {
  title: "SecondBrainProject – Personal Knowledge OS",
  subtitle: "A Notion-style second brain that stores and retrieves your information with a chat interface",
  date: "2025-01-10",
  techStack: ["Monstack", "TypeScript", "Rack", "Markdown", "React", "Express", "MongoDB"],
  githubUrl: "https://github.com/Pradyumn1710/second-brain-project",
  websiteUrl: "", // Optional demo link if hosted
  content: `
# What is SecondBrainProject?

Inspired by Tiago Forte's book *Building a Second Brain*, this project is a digital personal knowledge system that helps you **store**, **organize**, and **retrieve** thoughts, research, links, markdown notes, and more — even years later.

## Core Idea

> "Your brain wasn’t built to store everything. It was built to think. Let your second brain handle the rest."

SecondBrainProject brings this to life using a **Notion-like interface** backed by powerful bucket-based storage and searchable markdown content.

## Key Features

- Bucket-based knowledge organization system (Projects, Areas, Resources, Archives)
- Markdown file support with live rendering
- Support for:
  - Notes
  - Links
  - Posts
- Integrated **chat interface (Rack)** to query saved content conversationally
- Optimized for long-term use: **retrieve anything, no matter how old**

## Bucket Storage System

Each “bucket” corresponds to a topic or context, with schema like:

\`\`\`ts
interface Bucket {
  id: string;
  title: string;
  type: "note" | "link" | "post";
  content: string; // markdown
  tags?: string[];
  createdAt: Date;
}
\`\`\`

Content is stored in MongoDB, indexed for fast lookup and retrieval via keyword or semantic context.

## Chat Interface (Rack Integration)

Once your second brain grows, it can become overwhelming to scroll/search.

So we built a **chat interface using Rack**, which lets you query in natural language:

> “Find that post about distributed systems I saved last year”  
> “Show me the note where I mentioned CUDA and shared memory”

The system uses embedded context and keyword extraction to return relevant content from the buckets.

## Tech Stack Breakdown

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI Layer**: Rack application (chat interface over structured + unstructured data)
- **Language**: TypeScript (everywhere)

## Why It’s Valuable

- Saves you from losing track of scattered knowledge
- Future-proofs your learning and thinking
- Easy to scale and adapt to personal workflows

## Next Steps

- Sync with Notion API
- Add PDF & image upload support
- Improve chat interface with semantic search and embedding

---
Want to think better? Build a better brain 🧠. This is mine.
`,
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { title, subtitle, date, techStack, githubUrl, websiteUrl, content } = projectData;

  return (
    <div className="relative min-h-screen px-6 py-24 mx-auto max-w-4xl">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-zinc-400 hover:text-zinc-100 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to projects
      </button>

      {/* Project header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-100 mb-2">{title}</h1>
        <p className="text-xl text-zinc-400 mb-6">{subtitle}</p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">
              <time dateTime={new Date(date).toISOString()}>
                {Intl.DateTimeFormat(undefined, {
                  dateStyle: "long",
                }).format(new Date(date))}
              </time>
            </p>
          </div>

          <div className="flex gap-4">
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-100 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
            )}
            {websiteUrl && (
              <Link
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-100 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tech stack */}
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

      {/* Markdown content */}
      <div className="prose prose-invert prose-zinc max-w-none">
      <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
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
