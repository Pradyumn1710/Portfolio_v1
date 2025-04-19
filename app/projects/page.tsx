import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Eye } from "lucide-react";

// Featured Projects
const featuredProjects = [
  {
    slug: "lu-factorization",
    title: "LU Factorization",
    description:
      "A CUDA and C-based implementation of LU decomposition for efficient matrix factorization, optimized for parallel processing.",
    date: "2024-02-15",
    published: true,
    type: "featured",
  },
  {
    slug: "second-brain",
    title: "Second Brain",
    description:
      "A TypeScript-based backend project designed to manage and organize personal knowledge using the Zettelkasten method.",
    date: "2024-03-10",
    published: true,
    type: "featured",
  },
];

// Common Projects
const commonProjects = [
  {
    slug: "navix",
    title: "Navix",
    description:
      "A React and Vite-based template providing a minimal setup for building modern web applications with fast refresh and ESLint integration.",
    date: "2024-04-05",
    published: true,
    type: "common",
  },
  {
    slug: "echo",
    title: "Echo",
    description:
      "A web application that utilizes machine learning to interpret sign language and includes speech-to-text functionality, built with React and Node.js.",
    date: "2024-04-20",
    published: true,
    type: "common",
  },
  {
    slug: "skillo",
    title: "Skillo",
    description:
      "A web application that utilizes machine learning to interpret sign language and includes speech-to-text functionality, built with React and Node.js.",
    date: "2024-04-20",
    published: true,
    type: "common",
  },
];

const experience = [
  {
    slug: "scoas",
    title: "SCOAS",
    description:
      "A web application that utilizes machine learning to interpret sign language and includes speech-to-text functionality, built with React and Node.js.",
    date: "2024-04-20",
    published: true,
    type: "experience",
  },
  {
    slug: "incence",
    title: "Echo",
    description:
      "A web application that utilizes machine learning to interpret sign language and includes speech-to-text functionality, built with React and Node.js.",
    date: "2024-04-20",
    published: true,
    type: "experience",
  }
]
export const revalidate = 60;

export default function ProjectsPage() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-zinc-300">Featured</h3>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featuredProjects.map((project) => (
                <Card key={project.slug} className="flex flex-col">
                  <Link href={`/projects/${project.slug}`}>
                    <article className="relative w-full p-4 md:p-8 flex flex-col">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs text-zinc-100">
                          {project.date ? (
                            <time dateTime={new Date(project.date).toISOString()}>
                              {Intl.DateTimeFormat(undefined, {
                                dateStyle: "medium",
                              }).format(new Date(project.date))}
                            </time>
                          ) : (
                            <span>SOON</span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Eye className="w-4 h-4" />
                          {/* Replace with actual view count */}
                          150
                        </span>
                      </div>

                      <h2 className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
                        {project.title}
                      </h2>
                      <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                        {project.description}
                      </p>
                      <div className="mt-auto">
                        <a
                          href={`https://github.com/Pradyumn1710/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-zinc-400 hover:text-zinc-300"
                        >
                          Explore
                        </a>
                      </div>
                    </article>
                  </Link>
                </Card>
              ))}
            </div>
          </>
        )}

        <div className="w-full h-px bg-zinc-800 my-8" />

        {/* Common Projects */}
        {commonProjects.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-zinc-300">Common</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {commonProjects.map((project) => (
                <Card key={project.slug} className="flex flex-col">
                  <Link href={`/projects/${project.slug}`}>
                    <article className="p-4 md:p-8 flex flex-col">
                      <div className="flex justify-between gap-2 items-center">
                        <span className="text-xs text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
                          {project.date ? (
                            <time dateTime={new Date(project.date).toISOString()}>
                              {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                                new Date(project.date),
                              )}
                            </time>
                          ) : (
                            <span>SOON</span>
                          )}
                        </span>
                        <span className="text-zinc-500 text-xs flex items-center gap-1">
                          <Eye className="w-4 h-4" />{" "}
                          {/* Replace with actual view count */}
                          100
                        </span>
                      </div>
                      <h2 className="z-20 text-xl font-medium lg:text-3xl text-zinc-200 group-hover:text-white font-display">
                        {project.title}
                      </h2>
                      <p className="z-20 mt-4 text-sm text-zinc-400 group-hover:text-zinc-200">
                        {project.description}
                      </p>
                      <div className="mt-auto">
                        <a
                          href={`https://github.com/Pradyumn1710/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-zinc-400 hover:text-zinc-300"
                        >
                          Explore
                        </a>
                      </div>
                    </article>
                  </Link>
                </Card>
              ))}
            </div>
          </>
        )}
</div>
    </div>
  );
}

