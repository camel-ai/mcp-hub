import * as React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/button"

export function Footer() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("camel-ai@eigent.ai")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="bg-lavender/10 py-12 font-serif">
      <div className="w-full max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left column - Logo and contact (spans 2 columns) */}
          <div className="col-span-1 md:col-span-2 space-y-4 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Image
                src="/logo.svg"
                alt="CAMEL AI Logo"
                width={0}
                height={40}
                className="text-primary w-auto h-[40px]"
                style={{ width: 'auto' }}
              />
            </div>
            <p className="text-base font-regular text-background-foreground px-4">
              Finding the Scaling Laws of Agents
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={copyEmail}
              className="rounded-full w-[300px] mx-auto md:mx-0"
            >
              <span className="items-center justify-center">
                {copied ? "Copied!" : "camel-ai@eigent.ai"}
              </span>
            </Button>
            <div className="flex gap-4 pt-8 justify-center md:justify-start">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://discord.camel-ai.org', '_blank')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://github.com/camel-ai', '_blank')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://linkedin.com/company/camel-ai', '_blank')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://x.com/CamelAIOrg', '_blank')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://www.youtube.com/@CamelAI', '_blank')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('https://www.reddit.com/r/CamelAI/', '_blank')}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547l-.8 3.747c1.824.07 3.48.632 4.674 1.488c.308-.309.73-.491 1.207-.491c.968 0 1.754.786 1.754 1.754c0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87c-3.874 0-7.004-2.176-7.004-4.87c0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754c.463 0 .898.196 1.207.49c1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197a.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248c.687 0 1.248-.561 1.248-1.249c0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25c0 .687.561 1.248 1.249 1.248c.688 0 1.249-.561 1.249-1.249c0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094a.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913c.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463a.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73c-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Center-left column - Products */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-primary mb-4 uppercase">Products</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://bot.eigent.ai/', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                EigentBot
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://matrix.eigent.ai/x', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                Matrix
              </Button>
            </div>
          </div>

          {/* Center column - Research */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-primary mb-4 uppercase">Research</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com/camel-ai/camel', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                CAMEL
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com/camel-ai/owl', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                OWL
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com/camel-ai/loong', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                LOONG
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com/camel-ai/oasis', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                OASIS
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com/camel-ai/crab', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                CRAB
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com/camel-ai/agenttrust', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                AgentTrust
              </Button>
            </div>
          </div>

          {/* Center-right column - Resources */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-primary mb-4 uppercase">Resources</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://www.camel-ai.org/blogs', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                Blog
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://www.camel-ai.org/community', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                Community
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://docs.camel-ai.org/', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                Documents
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://mcp.camel-ai.org/', '_blank')}
                className="px-0 w-full justify-center md:justify-start hover:underline"
              >
                MCP
              </Button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          Copyright © {new Date().getFullYear()} Eigent AI – All Rights Reserved
        </div>
      </div>
    </footer>
  )
}
