import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/repos/camel-ai/camel', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub data')
    }

    const data = await response.json()
    return NextResponse.json({ stars: data.stargazers_count })
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return NextResponse.json({ stars: 0 }, { status: 500 })
  }
} 