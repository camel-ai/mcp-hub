import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Unit {
  slug: string
  title: string
  content: string
  frontmatter: Record<string, unknown>
}

async function getUnits(): Promise<Unit[]> {
  const unitsDir = path.join(process.cwd(), 'app/course/units')
  const unitDirs = fs.readdirSync(unitsDir).filter(dir => 
    fs.statSync(path.join(unitsDir, dir)).isDirectory() && dir.startsWith('unit')
  )

  const units: Unit[] = []

  for (const unitDir of unitDirs) {
    const unitPath = path.join(unitsDir, unitDir)
    const files = fs.readdirSync(unitPath).filter(file => file.endsWith('.mdx'))
    
    for (const file of files) {
      const filePath = path.join(unitPath, file)
      const source = fs.readFileSync(filePath, 'utf8')
      const { data: frontmatter, content } = matter(source)
      
      // Extract title from the first heading or use filename
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1] : file.replace('.mdx', '')
      
      units.push({
        slug: `${unitDir}/${file.replace('.mdx', '')}`,
        title,
        content,
        frontmatter
      })
    }
  }

  // Sort units by their directory number
  return units.sort((a, b) => {
    const aNum = parseInt(a.slug.match(/unit(\d+)/)?.[1] || '0')
    const bNum = parseInt(b.slug.match(/unit(\d+)/)?.[1] || '0')
    return aNum - bNum
  })
}

export default async function CourseUnitsPage() {
  const units = await getUnits()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CAMEL AI with Model Context Protocol (MCP) Course
          </h1>
          <p className="text-lg text-gray-600">
            Master the art of building AI agents with advanced tooling capabilities
          </p>
        </div>

        <div className="space-y-8">
          {units.map((unit, index) => (
            <article key={unit.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mr-3">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {unit.title}
                  </h2>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {unit.content}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
