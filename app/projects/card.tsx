import Link from "next/link"
import { Eye } from "lucide-react"
import { Card } from "./card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  project: {
    slug: string
    title: string
    description: string
    date?: string
    published: boolean
    type: "featured" | "common"
  }
  viewCount: number
  variant: "featured" | "common"
}

export function ProjectCard({ project, viewCount, variant }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
      <Link href={`/projects/${project.slug}`} className="flex flex-col h-full">
        <article className="relative w-full h-full p-4 md:p-6 flex flex-col">
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
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(viewCount ?? 0)}
            </span>
          </div>

          <h2
            className={`mt-4 font-bold text-zinc-100 group-hover:text-white font-display ${
              variant === "featured" ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h2>

          <div className={`mt-4 ${variant === "featured" ? "flex-grow" : ""}`}>
            <p
              className={`leading-relaxed text-zinc-400 group-hover:text-zinc-300 ${
                variant === "featured" ? "line-clamp-4 sm:line-clamp-none" : "line-clamp-3 text-sm"
              }`}
            >
              {project.description}
            </p>
          </div>

          <div className="mt-auto pt-4">
            {variant === "featured" ? (
              <Button
                variant="secondary"
                className="mt-2 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700"
              >
                Explore Project
              </Button>
            ) : (
              <Button variant="default" size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                View Details
              </Button>
            )}
          </div>
        </article>
      </Link>
    </Card>
  )
}
