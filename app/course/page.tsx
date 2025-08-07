import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Unit {
  slug: string
  title: string
  excerpt: string
  unitNumber: number
}

async function getCourseUnits(): Promise<Unit[]> {
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
      const { content } = matter(source)
      
      // Extract title from the first heading or use filename
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1] : file.replace('.mdx', '')
      
      // Extract excerpt from the first paragraph
      const excerptMatch = content.match(/^#\s+.+?\n\n([\s\S]+?)(?=\n\n|$)/)
      const excerpt = excerptMatch ? excerptMatch[1].substring(0, 150) + '...' : 'Course content...'
      
      const unitNumber = parseInt(unitDir.match(/unit(\d+)/)?.[1] || '0')
      
      units.push({
        slug: `${unitDir}/${file.replace('.mdx', '')}`,
        title,
        excerpt,
        unitNumber
      })
    }
  }

  // Sort units by their directory number
  return units.sort((a, b) => a.unitNumber - b.unitNumber)
}

export default async function CoursePage() {
  const units = await getCourseUnits()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Mastering CAMEL AI with Model Context Protocol (MCP)
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn how to build powerful AI agents with advanced tooling capabilities. 
            From basic tooling in CAMEL AI to mastering the Model Context Protocol (MCP), 
            this comprehensive course will transform your AI development skills.
          </p>
          <div className="mt-8">
            <Link 
              href="/course/units"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>

        {/* Course Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What You&apos;ll Learn</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Understanding tooling in CAMEL AI</li>
                <li>• Model Context Protocol (MCP) fundamentals</li>
                <li>• Building custom MCP servers</li>
                <li>• Integrating MCP with CAMEL AI agents</li>
                <li>• Creating versatile, tool-augmented AI systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Prerequisites</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Basic Python programming skills</li>
                <li>• Understanding of functions and imports</li>
                <li>• Familiarity with AI concepts (optional)</li>
                <li>• Eagerness to learn advanced tooling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Course Units */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Units</h2>
          <div className="grid gap-6">
            {units.map((unit, index) => (
              <div key={unit.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-800 text-lg font-bold rounded-full">
                        {index + 1}
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {unit.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {unit.excerpt}
                      </p>
                      <Link 
                        href={`/course/${unit.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read Unit →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Master MCP?</h2>
          <p className="text-xl mb-6 opacity-90">
            Start your journey into advanced AI tooling and interoperability
          </p>
          <Link 
            href="/course/units"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Begin Course
          </Link>
        </div>
      </div>
    </div>
  )
} 