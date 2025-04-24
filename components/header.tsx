import RotatingText from "@/components/rotating-text"
import { motion } from "framer-motion"

export function Header() {
  return (
    <header className="pt-32 pb-16 text-center">
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center justify-center text-6xl font-bold mb-6">
          <motion.div 
            className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center gap-2"
            layout
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            <motion.span
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              CAMEL with{" "}
            </motion.span>
            <RotatingText
              texts={['Notion', 'Whatsapp', 'Firecrawl']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-primary text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.05}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />
            <motion.span
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              {" "}MCP
            </motion.span>
          </motion.div>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover and compare Model Context Protocol Servers to build your Agents
        </p>
      </header>
  )
}