"use client";

import Image from "next/image";
import { useState } from "react";
import anthropicsServers from "@/public/anthropics.json";
import officialsServers from "@/public/officials.json";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy, ShieldCheck, Grid2X2 } from "lucide-react";

// 给每个服务器添加来源标记
const serversWithSource = [
  ...anthropicsServers.map(server => ({ ...server, source: 'anthropic' })),
  ...officialsServers.map(server => ({ ...server, source: 'official' }))
];

// 按名称字母顺序排序
const allServers = serversWithSource.sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
);

interface Server {
  name: string;
  key: string;
  description: string;
  command: string;
  args?: any[];
  env?: Record<string, any>;
  homepage: string;
  source?: 'anthropic' | 'official';
}

interface ModalProps {
  server: Server;
  onClose: () => void;
}

function Modal({ server, onClose }: ModalProps) {
  // Create a config object that matches Claude client format
  const serverConfig = {
    command: server.command,
    ...(server.args && { args: server.args }),
    ...(server.env && { env: server.env })
  };

  // Create the final config object using the server's key as property name
  const configObject = {
    mcpServers: {
      [server.key.toLowerCase()]: serverConfig
    }
  };

  // Convert the config object to a formatted JSON string
  const formattedConfig = JSON.stringify(configObject, null, 2);

  // State to track if config has been copied
  const [copied, setCopied] = useState(false);

  // Function to copy config to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedConfig)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Copy failed:', err);
      });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => {
        // 只有当点击的是背景元素时才关闭模态框
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-card text-card-foreground p-6 rounded-xl border shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5 pb-3 border-b">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {server.source === 'official' ? (
                <ShieldCheck className="w-5 h-5 text-[#4215cc] flex-shrink-0" />
              ) : (
                <Image
                  src="/anthropic.svg"
                  alt="Anthropic"
                  width={20}
                  height={20}
                  className="flex-shrink-0"
                />
              )}
              {server.name}
            </h2>
            <p className="text-sm mb-2 text-muted-foreground">{server.description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            ✕
          </Button>
        </div>
        <div className="space-y-5">
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-medium text-muted-foreground mb-1">Homepage</h3>
              <a href={server.homepage} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline block">
                {server.homepage}
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">MCP Server Configuration</h3>
            <div className="relative">
              <pre className="bg-muted p-4 rounded text-xs overflow-x-auto font-mono">
                {formattedConfig}
              </pre>
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className={`absolute top-2 right-2 h-8 w-8 p-0 transition-colors ${copied ? 'bg-green-100 text-green-700 border-green-200' : 'bg-background/80 backdrop-blur-sm'}`}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'official' | 'anthropic'>('all');

  const handleCardClick = (server: Server) => {
    setSelectedServer(server);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 根据筛选条件过滤服务器列表
  const filteredServers = allServers.filter(server => {
    if (filter === 'all') return true;
    return server.source === filter;
  });
  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex-1 w-full max-w-[1600px] mx-auto py-8">
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${filter === 'all' ? 'bg-card shadow-sm' : 'hover:bg-background/50'}`}
            >
              <Grid2X2 className="w-3.5 h-3.5" />
              All
            </button>
            <button
              onClick={() => setFilter('official')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${filter === 'official' ? 'bg-card shadow-sm' : 'hover:bg-background/50'}`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#4215cc]" />
              Official
            </button>
            <button
              onClick={() => setFilter('anthropic')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${filter === 'anthropic' ? 'bg-card shadow-sm' : 'hover:bg-background/50'}`}
            >
              <Image src="/anthropic.svg" alt="Anthropic" width={14} height={14} />
              Anthropic
            </button>
          </div>
        </div>
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
          {filteredServers.map((server) => (
            <Card
              key={server.key}
              className="w-full cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCardClick(server)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {server.source === 'official' ? (
                    <ShieldCheck className="w-4 h-4 text-[#4215cc] flex-shrink-0" />
                  ) : (
                    <Image
                      src="/anthropic.svg"
                      alt="Anthropic"
                      width={16}
                      height={16}
                      className="flex-shrink-0"
                    />
                  )}
                  <span className="truncate">{server.name}</span>
                </CardTitle>
                <CardDescription className="h-16 line-clamp-3">{server.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Badge>{server.command}</Badge>
                <a href={server.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">
                  {new URL(server.homepage).hostname}
                </a>
              </CardFooter>
            </Card>
          ))}
        </main>
      </div>
      <footer className="mt-auto py-6 flex gap-4 sm:gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
      {isModalOpen && selectedServer && (
        <Modal server={selectedServer} onClose={handleCloseModal} />
      )}
    </div>
  );
}
