"use client";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const projectData = {
  title: "NAVIX – Smart Maritime Navigation",
  subtitle: "A real-time route optimization platform for greener and safer maritime shipping",
  date: "2024-01-15",
  techStack: ["React.js", "Leaflet.js", "Tailwind CSS", "Python", "Flask", "Node.js"],
  githubUrl: "https://github.com/Pradyumn1710/navix",
  websiteUrl: "", // Add demo link if live
  content: `
# What is NAVIX?

**NAVIX** is a real-time maritime navigation tool that helps shipping vessels plan fuel-efficient, weather-aware routes across oceans. This project was developed as part of **Smart India Hackathon 2024**.

## 🚢 Why NAVIX?

Traditional sea routes don't account for:
- Real-time weather conditions
- Fuel optimization
- Environmental impact

NAVIX uses live weather APIs + intelligent graph-based routing to create **safer, faster, greener** paths.

## Key Features

- Interactive **map UI** powered by Leaflet.js
- Route planning with **A* algorithm**
- Real-time weather data ingestion
- Dynamic risk zones + alerts
- **15% fuel savings** and **20% time reduction**

## Architecture Overview

\`\`\`txt
Frontend (React + Leaflet)
    ↕️ REST APIs
Backend (Flask + Python)
    ↳ Weather API ingestion
    ↳ Graph generation + A* routing
    ↳ Heatmap & route generation
\`\`\`

## Sample A* Algorithm Snippet

\`\`\`python
def a_star(start, goal, graph, weather_map):
    open_set = PriorityQueue()
    open_set.put((0, start))
    came_from = {}
    g_score = {start: 0}

    while not open_set.empty():
        _, current = open_set.get()
        if current == goal:
            return reconstruct_path(came_from, current)
        
        for neighbor in graph.neighbors(current):
            temp_g = g_score[current] + cost(current, neighbor, weather_map)
            if neighbor not in g_score or temp_g < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = temp_g
                open_set.put((temp_g, neighbor))
\`\`\`

## Challenges We Tackled

- Integrating **live weather layers** on top of Leaflet map tiles
- Speed + accuracy balance in route generation
- Managing coordinate system across geospatial APIs
- Collaborating under 48-hour hackathon pressure!

## Impact

- Promotes **green shipping**
- Reduces fuel consumption & emissions
- Improves **crew safety** via smart routing
- Prototype validated with simulated route + weather data

## Future Scope

- Integration with port APIs
- Ship size and cargo-aware route generation
- Full-stack SaaS product for logistics companies

> 🌊 NAVIX is not just about routes — it’s about navigating smarter, greener, and safer.
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
