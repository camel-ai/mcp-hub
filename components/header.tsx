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
              CAMEL with MCP
            </motion.span>
          </motion.div>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover and compare Model Context Protocol Servers to build your Agents
        </p>
      </header>
  )
}