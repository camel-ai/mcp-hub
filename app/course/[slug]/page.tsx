import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { getCourseModules } from '../utils'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateStaticParams() {
  const modules = getCourseModules()

  return modules.map((module) => ({
    slug: module.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const courseModule = getCourseModules().find((module) => module.slug === params.slug)
  if (!courseModule) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = courseModule.metadata
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/course/${courseModule.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function CourseModule({ params }: { params: { slug: string } }) {
  const courseModule = getCourseModules().find((module) => module.slug === params.slug)

  if (!courseModule) {
    notFound()
  }

  return (
    <section className="items-center justify-center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            headline: courseModule.metadata.title,
            datePublished: courseModule.metadata.publishedAt,
            dateModified: courseModule.metadata.publishedAt,
            description: courseModule.metadata.summary,
            image: courseModule.metadata.image
              ? `${baseUrl}${courseModule.metadata.image}`
              : `/og?title=${encodeURIComponent(courseModule.metadata.title)}`,
            url: `${baseUrl}/course/${courseModule.slug}`,
            author: {
              '@type': 'Person',
              name: 'CAMEL MCP Course',
            },
          }),
        }}
      />
      <div className="max-w-[900px] min-h-screen mx-auto justify-center items-center py-24">
        <div className="flex flex-col items-center rounded-xl gap-8 w-full">
        <h1 className="title font-semibold text-4xl tracking-tighter leading-tight text-center font-[family-name:var(--font-main)]">
          {courseModule.metadata.title || `Module ${courseModule.slug}`}
        </h1>
        {courseModule.metadata.publishedAt && (
          <div className="flex flex-row justify-center gap-8 w-full items-center mt-2 mb-8 text-sm border-b border-neutral-200 pt-2 pb-8 font-[family-name:var(--font-mono)]">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-bold italic mr-2">Written by</span> {courseModule.metadata.author || 'CAMEL-AI'}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-bold italic mr-2">Reviewed by</span> {courseModule.metadata.reviewer || 'CAMEL-AI'}
            </p>
          </div>
        )}
        </div>
        <article className="prose prose-lg max-w-none font-[family-name:var(--font-sans)]">
          {await CustomMDX({ source: courseModule.content })}
        </article>
      </div>
    </section>
  )
}
