import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface UnitData {
  title: string
  content: string
  frontmatter: Record<string, unknown>
}

async function getUnitBySlug(slug: string): Promise<UnitData | null> {
  try {
    // Parse the slug to get unit directory and file name
    const [unitDir, fileName] = slug.split('/')
    
    if (!unitDir || !fileName) {
      return null
    }

    const filePath = path.join(process.cwd(), 'app/course/units', unitDir, `${fileName}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }

    const source = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(source)
    
    // Extract title from the first heading or use filename
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1] : fileName
    
    return {
      title,
      content,
      frontmatter
    }
  } catch (error) {
    console.error('Error reading unit file:', error)
    return null
  }
}

export default async function UnitPage({ params }: PageProps) {
  const { slug } = await params
  const unit = await getUnitBySlug(slug)
  
  if (!unit) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="mb-6">
            <Link 
              href="/course/units" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Course
            </Link>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {unit.title}
          </h1>
        </div>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {unit.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

// Generate static params for all units
export async function generateStaticParams() {
  const unitsDir = path.join(process.cwd(), 'app/course/units')
  const unitDirs = fs.readdirSync(unitsDir).filter(dir => 
    fs.statSync(path.join(unitsDir, dir)).isDirectory() && dir.startsWith('unit')
  )

  const params: { slug: string }[] = []

  for (const unitDir of unitDirs) {
    const unitPath = path.join(unitsDir, unitDir)
    const files = fs.readdirSync(unitPath).filter(file => file.endsWith('.mdx'))
    
    for (const file of files) {
      const fileName = file.replace('.mdx', '')
      params.push({
        slug: `${unitDir}/${fileName}`
      })
    }
  }

  return params
}
