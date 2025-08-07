import Link from 'next/link'
import { getCourseModules } from './utils'
import { Button } from '@/components/ui/button'

export default function Page() {
  const modules = getCourseModules()

  return (
    <section className="max-w-[900px] mx-auto py-24 font-[family-name:var(--font-main)]">
      <div className="flex justify-between items-center">
        <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          CAMEL MCP Course
        </h1>
        <p className="text-xl text-muted-foreground">
          Master CAMEL-AI with Model Context Protocol (MCP)
        </p>
        </div>
        <Link href="/course/module0">
          <Button className="bg-primary text-primary-foreground font-bold px-4 py-1 rounded-lg cursor-pointer">
            Start Learning
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {modules.map((module) => (
          <Link
            key={module.slug}
            href={`/course/${module.slug}`}
            className="group block p-6 bg-white rounded-lg hover:bg-white/60 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold group-hover:text-foreground/80 transition-colors">
                  {module.metadata.title || `Module ${module.slug}`}
                </h2>
                {module.metadata.summary ? (
                  <p className="text-muted-foreground mt-2">
                    {module.metadata.summary}
                  </p>
                ) : (
                  <p className="text-muted-foreground mt-2">
                    Click to view module content
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
