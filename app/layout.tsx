import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({   
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://mcp.camel-ai.org'),
  title: {
    default: "CAMEL-AI MCP Hub – Official MCP Servers & Integrations",
    template: "%s | CAMEL-AI MCP Hub"
  },
  description: "Explore CAMEL-AI's MCP Hub: your directory of official MCP (Model Context Protocol) servers and integrations designed to supercharge AI agents and multi-agent workflows.",
  keywords: ["mcp servers", "ai agents", "model context protocol", "mcp client", "CAMEL-AI", "MCP Hub", "integrations"],
  authors: [{ name: "Camel-AI.org" }],
  creator: "Camel-AI.org",
  publisher: "Camel-AI.org",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: 'https://camel-ai.github.io/camel_asset/mcp/favicon.ico', sizes: '32x32' },
      { url: 'https://camel-ai.github.io/camel_asset/mcp/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: 'https://camel-ai.github.io/camel_asset/mcp/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: 'https://camel-ai.github.io/camel_asset/mcp/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: 'https://camel-ai.github.io/camel_asset/mcp/favicon.ico'
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_UK",
    url: "https://mcp.camel-ai.org",
    title: "CAMEL-AI MCP Hub – Official MCP Servers & Integrations",
    description: "Explore CAMEL-AI's MCP Hub: your directory of official MCP (Model Context Protocol) servers and integrations designed to supercharge AI agents and multi-agent workflows.",
    siteName: "CAMEL-AI MCP Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAMEL-AI MCP Hub – Official MCP Servers & Integrations",
    description: "Explore CAMEL-AI's MCP Hub: your directory of official MCP (Model Context Protocol) servers and integrations designed to supercharge AI agents and multi-agent workflows.",
    creator: "@CamelAIOrg",
    images: [
      {
        url: "https://camel-ai.github.io/camel_asset/mcp/twitter-card.png",
        width: 1200,
        height: 628,
        alt: "CAMEL-AI MCP Hub - Official MCP Servers & Integrations"
      }
    ],
    site: "@CamelAIOrg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
