import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Eye } from "lucide-react";

const experienceProjects = [
  {
    slug: "scoas",
    title: "SCOAS Website",
    description:
      "Developed a responsive portfolio website for a cleaning services business. It showcases their residential, commercial, and specialized services. Includes a contact form to send emails and request quotations.",
    date: "2024-03-22",
    published: true,
    type: "experience",
  },
  {
    slug: "incense",
    title: "Incense Gas Detection Platform",
    description:
      "Created for SNJB college students to visualize real-time gas readings from their patented incense detection medical device. Includes dynamic graph rendering and an educational simulator that shows health effects of excessive gas exposure.",
    date: "2024-03-30",
    published: true,
    type: "experience",
  },
];

export const revalidate = 60;

export default function ExperiencePage() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Experience
          </h2>
          <p className="mt-4 text-zinc-400">
            Some real-world projects I've developed for businesses and institutions.
          </p>
        </div>

        {experienceProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {experienceProjects.map((project) => (
              <Card key={project.slug} className="flex flex-col">
                <article className="relative w-full p-4 md:p-8 flex flex-col group">
                  <Link href={`/projects/${project.slug}`}>
                    <h2 className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display hover:underline">
                      {project.title}
                    </h2>
                  </Link>
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
                      <Eye className="w-4 h-4" /> 80
                    </span>
                  </div>

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
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
