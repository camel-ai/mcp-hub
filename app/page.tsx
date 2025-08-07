"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { anthropicServers, officialServers, camelServers, communityServers } from "@/public/servers";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Check, Copy, ShieldCheck, Grid2X2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";

const serversWithSource = [
  ...anthropicServers.map(server => ({ ...server, source: 'anthropic' as const })),
  ...officialServers.map(server => ({ ...server, source: 'official' as const })),
  ...camelServers.map(server => ({ ...server, source: 'camel' as const })),
  ...communityServers.map(server => ({ ...server, source: 'community' as const }))
];

const allServers = serversWithSource.sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
);

interface Server {
  name: string;
  key: string;
  description: string;
  command: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  env?: Record<string, any>;
  homepage: string;
  source?: 'anthropic' | 'official' | 'camel' | 'community';
}

interface ModalProps {
  server: Server;
  onClose: () => void;
}

function Modal({ server, onClose }: ModalProps) {
  const serverConfig = {
    command: server.command,
    ...(server.args && { args: server.args }),
    ...(server.env && { env: server.env })
  };

  const configObject = {
    mcpServers: {
      [server.key.toLowerCase()]: serverConfig
    }
  };

  const formattedConfig = JSON.stringify(configObject, null, 2);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedConfig)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(err => {
        console.error('Copy failed:', err);
      });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(2px)' }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-card text-card-foreground p-6 rounded-xl border shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-4 border-b">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-4 mb-2">
                {server.source === 'official' ? (
                  <ShieldCheck className="w-6 h-6 text-[#4215cc] flex-shrink-0" />
                ) : server.source === 'camel' ? (
                  <Image
                    src="https://mcp.camel-ai.org/camel-icon.svg"
                    alt="Camel"
                    width={24}
                    height={24}
                    className="flex-shrink-0"
                  />
                ) : (
                  <Image
                    src="https://mcp.camel-ai.org/anthropic.svg"
                    alt="Anthropic"
                    width={24}
                    height={24}
                    className="flex-shrink-0"
                  />
                )}
                {server.name}
              </h2>
              <p className="text-sm text-muted-foreground">{server.description}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 p-0">
              ✕
            </Button>
          </div>
          <div className="flex justify-between items-center pb-6 border-t ">
              <Badge
                variant={server.command === 'uvx' ? 'default' : server.command === 'npx' ? 'pink' : undefined}
              >
                {server.command}
              </Badge>
              <Button
                variant="link"
                size="sm"
                className="text-xs p-0 h-auto"
                onClick={() => window.open(server.homepage, '_blank')}
              >
                {new URL(server.homepage).hostname}
              </Button>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-md font-bold mb-2">MCP Server Configuration</h3>
              <div className="relative">
                <pre className="bg-background p-6 rounded-lg text-xs overflow-x-auto font-mono">
                  {formattedConfig}
                </pre>
                <Button
                  variant="default"
                  size="icon"
                  onClick={copyToClipboard}
                  className={`absolute top-2 right-2 h-8 w-8 p-0 transition-colors ${copied ? 'bg-green-100 text-green-700 border-green-200' : ''}`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'official' | 'anthropic' | 'camel' | 'community'>('all');

  // Update filter based on URL search params
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam && ['official', 'anthropic', 'camel', 'community'].includes(filterParam)) {
      setFilter(filterParam as 'official' | 'anthropic' | 'camel' | 'community');
    } else {
      setFilter('all');
    }
  }, [searchParams]);

  const handleFilterChange = (newFilter: 'all' | 'official' | 'anthropic' | 'camel' | 'community') => {
    setFilter(newFilter);
    
    // Use browser History API directly
    const params = new URLSearchParams(window.location.search);
    if (newFilter === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', newFilter);
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    
    // Use History API instead of Next.js router
    window.history.replaceState({}, '', newUrl);
  };

  const handleCardClick = (server: Server) => {
    setSelectedServer(server);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredServers = allServers.filter(server => {
    if (filter === 'all') return true;
    return server.source === filter;
  });

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 font-[family-name:var(--font-main)]">
      <Nav/>
      <Header/>
      <div className="flex-1 w-full max-w-[1600px] mx-auto py-8">
        <div className="flex justify-start mb-6">
          <div className="inline-flex bg-muted rounded-lg p-1">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${filter === 'all' ? 'bg-card shadow-sm' : 'hover:bg-background/50'}`}
            >
              <Grid2X2 className="w-4 h-4" />
              All
            </button>
            <button
              onClick={() => handleFilterChange('camel')}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${filter === 'camel' ? 'bg-card shadow-sm' : 'hover:bg-background/50'}`}
            >
              <Image src="https://mcp.camel-ai.org/camel-icon.svg" alt="Camel" width={16} height={16} />
              CAMEL
            </button> 
            <button
              onClick={() => handleFilterChange('official')}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${filter === 'official' ? 'bg-card shadow-sm' : 'hover:bg-background/50'}`}
            >
              <ShieldCheck className="w-4 h-4 text-[#4215cc]" />
              Official
            </button>
            <button
              onClick={() => handleFilterChange('anthropic')}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${filter === 'anthropic' ? 'bg-card shadow-sm' : 'hover:bg-background/50'}`}
            >
              <Image src="https://mcp.camel-ai.org/anthropic.svg" alt="Anthropic" width={16} height={16} />
              Anthropic
            </button>
            <button
              onClick={() => handleFilterChange('community')}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${filter === 'community' ? 'bg-card shadow-sm' : 'hover:bg-background/50'}`}
            >
              <Image src="https://mcp.camel-ai.org/community.svg" alt="Community" width={16} height={16} />
              Community
            </button>
          </div>
        </div>
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
          {filteredServers.map((server) => (
            <Card
              key={`${server.source}-${server.key}`}
              className="w-full shadow-card cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCardClick(server as Server)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {server.source === 'official' ? (
                    <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
                  ) : server.source === 'camel' ? (
                    <Image
                      src="https://mcp.camel-ai.org/camel-icon.svg"
                      alt="Camel"
                      width={24}
                      height={24}
                      className="flex-shrink-0"
                    />
                  ) : server.source === 'community' ? (
                    <Image
                      src="https://mcp.camel-ai.org/community.svg"
                      alt="Community"
                      width={24}
                      height={24}
                      className="flex-shrink-0"
                    />
                  ) : (
                    <Image
                      src="https://mcp.camel-ai.org/anthropic.svg"
                      alt="Anthropic"
                      width={24}
                      height={24}
                      className="flex-shrink-0"
                    />
                  )}
                  <span className="truncate">{server.name}</span>
                </CardTitle>
                <CardDescription className="h-20 line-clamp-4">{server.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Badge
                  variant={server.command === 'uvx' ? 'secondary' : server.command === 'npx' ? 'pink' : undefined}
                >
                  {server.command}
                </Badge>
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs p-0 h-auto"
                  onClick={() => window.open(server.homepage, '_blank')}
                >
                  {new URL(server.homepage).pathname.split('/')[1] || 'home'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </main>
      </div>
      <Footer />
      <AnimatePresence>
        {isModalOpen && selectedServer && (
          <Modal server={selectedServer} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
