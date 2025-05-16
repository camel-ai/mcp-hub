import { motion } from "framer-motion"
import SwipeCard from "./swipe.card"
export function Header() {
  return (
    <header className="pt-22 pb-8">
      <div className="flex flex-col lg:flex-row items-center justify-between flex-1 w-full max-w-[1600px] mx-auto py-8">
        {/* Left: Text Content */}
        <div className="flex-1 min-w-0 text-center mb-8 lg:mb-0 lg:w-1/2">
          <div className="text-6xl font-bold mb-6">
            <motion.div 
              className="flex flex-col gap-2 items-center"
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              <motion.span
                layout
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                CAMEL with MCP
              </motion.span>
            </motion.div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover and compare Model Context Protocol Servers to build your Agents
          </p>
        </div>
        {/* Right: Blog Thumbnail Card */}
        <div className="flex-1 min-w-0 lg:w-1/2 flex items-center justify-center">
          <SwipeCard />
        </div>
      </div>
    </header>
  )
}