"use client";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const projectData = {
  title: "SKILLO – Course Selling Platform",
  subtitle: "Full-stack platform for instructors and learners with secure authentication & real-time course management",
  date: "2024-12-01",
  techStack: ["React", "Next.js", "Express", "MongoDB", "Mongoose", "JWT", "Tailwind CSS", "ShadCN"],
  githubUrl: "https://github.com/Pradyumn1710/skillo",
  websiteUrl: "https://skillo.vercel.app", // optional live demo
  content: `
# Project Overview

**SKILLO** is a full-featured **course-selling web application** designed for both creators and learners. It enables instructors to upload, manage, and sell courses, while learners can securely enroll, track progress, and access content.

## Key Features

- JWT-based **authentication & session management**
- **Course creation**, editing, and deletion by admins
- Atomic DB operations using **Mongoose transactions**
- Responsive **UI with TailwindCSS + ShadCN components**
- Deployed on **Vercel** for lightning-fast delivery

## Admin Dashboard Example (Simplified)

\`\`\`tsx
const createCourse = async (data) => {
  await mongoose.startSession(async (session) => {
    const course = new Course(data);
    await course.save({ session });
    await Instructor.updateOne({ _id: data.instructor }, { $push: { courses: course._id } }, { session });
  });
};
\`\`\`

## Tech Stack & Tools

- **Frontend**: React, Tailwind CSS, ShadCN
- **Backend**: Express, MongoDB, Mongoose
- **Auth**: JWT + Cookie sessions
- **Deployment**: Vercel (frontend), Railway (backend API)

## Challenges Faced

- Ensuring **atomic transactions** when linking courses to instructors
- Handling **authentication securely** across server and client
- Designing reusable, accessible UI components

## Learnings & Impact

- Deepened understanding of **REST APIs**, **session management**, and **secure backend design**
- Gained hands-on experience with full-stack deployment and stateful sessions
- Used modern UI systems like **ShadCN** for clean and accessible design

## Future Plans

- Add video hosting integration (Mux or Cloudinary)
- Add payment flow (Stripe or Razorpay)
- Role-based dashboards for Admin, Instructors, and Students
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
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
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
