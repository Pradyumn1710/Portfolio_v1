"use client";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const projectData = {
  title: "High-Performance Batched LU Factorization on GPU & Multi-Core CPU",
  subtitle: "Solving large systems of linear equations using parallelism (CUDA/OpenMP)",
  date: "2025-02-01",
  techStack: ["CUDA", "OpenMP", "C", "C++", "Parallel Programming", "Numerical Computing"],
  githubUrl: "https://github.com/Pradyumn1710/lu-factorization",
  websiteUrl: "", // optional demo link
  content: `
# Project Overview

This project focuses on solving batched systems of linear equations using LU Factorization — optimized for both **GPUs (via CUDA)** and **multi-core CPUs (via OpenMP)**.

## Key Highlights

- Supported matrix sizes from **50×50 to 500×500**
- Implemented:
  - Sequential LU
  - OpenMP-accelerated LU
  - CUDA kernel for batched LU (1 matrix/thread)
- Focused on **batch-level parallelism** over intra-matrix parallelism

## Performance Metrics

- Accuracy validated using scientific test matrices
- **Infinity norms and reconstruction error:**
  - \`||PA − LU||∞ = 3.45 × 10⁻¹¹\`
  - \`||xtrue − x||∞/||xtrue||∞ = 2.05 × 10⁻¹⁴\`
  - \`||b − Ax||∞ = 4.12 × 10⁻¹¹\`
  - \`Max Δx = 2.60 × 10⁻¹⁴\`

## CUDA Kernel (Example)

\`\`\`cuda
__global__ void batchedLU(float* matrices, int n) {
  int idx = blockIdx.x * blockDim.x + threadIdx.x;
  float* A = &matrices[idx * n * n];

  for (int k = 0; k < n; ++k) {
    for (int i = k+1; i < n; ++i) {
      A[i*n + k] /= A[k*n + k];
      for (int j = k+1; j < n; ++j) {
        A[i*n + j] -= A[i*n + k] * A[k*n + j];
      }
    }
  }
}
\`\`\`

## Challenges Faced

- **Memory Constraints** on device heap required careful tuning
- Dynamic batch sizes to fit VRAM budget
- Matrix CSV parsing on host and flattening for GPU transfer

## Future Scope

- Shared memory optimizations inside CUDA kernel
- Sparse matrix LU support
- Scalability analysis beyond 1000×1000
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
