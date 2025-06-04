import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/button"

export function Nav() {
  const [stars, setStars] = React.useState<number>(0)

  React.useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch('/api/github')
        const data = await response.json()
        setStars(data.stars)
      } catch (error) {
        console.error('Error fetching stars:', error)
      }
    }

    fetchStars()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 h-18 z-50 flex justify-between items-center px-8 py-4 bg-background/80 backdrop-blur-sm">
      <a href="https://github.com/camel-ai/camel" target="_blank" rel="noopener noreferrer">
        <Image
          src="https://camel-ai.github.io/camel_asset/logo/camel_logo.svg"
          alt="CAMEL AI Logo"
          width={140}
          height={36}
        />
      </a>  
      
      <div className="flex flex-row items-center gap-6">
        <Button 
          variant="link" 
          className="hidden md:hidden flex-row items-center gap-2 font-bold text-primary"
          onClick={() => window.open('https://github.com/camel-ai/camel', '_blank')}
        >
          CAMEL GitHub 🌟: {stars.toLocaleString()}
        </Button>
        <Button
          className="bg-primary text-primary-foreground font-bold px-4 py-1 rounded-lg"
          onClick={() => window.open('https://github.com/camel-ai/mcp-hub', '_blank')}
        >
          Contribute
        </Button>
      </div>
    </nav>
  )
}
