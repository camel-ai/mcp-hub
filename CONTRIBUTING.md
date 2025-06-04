🐫 **Welcome to CAMEL MCP Hub!** 🐫

Thank you for your interest in contributing to the CAMEL project! 🎉 We're excited to have your support. As an open-source initiative in a rapidly evolving and open-ended field, we wholeheartedly welcome contributions of all kinds. Whether you want to introduce new features, enhance the infrastructure, improve documentation, asking issues, add more examples, implement state-of-the-art research ideas, or fix bugs, we appreciate your enthusiasm and efforts. 🙌  You are welcome to join our [discord](https://discord.camel-ai.org/) for more efficient communication. 💬

## Join Our Community 🌍

### Schedule an Introduction Call 📞 
- English speakers: [here](https://cal.com/wendong-fan-5yu7x5/30min)
- Chinese speakers: [here](https://cal.com/wendong-fan-5yu7x5/30min)

### Developer Meeting Time & Link 💻
- English speakers: Mondays at 5 PM GMT+1. Join via Discord: [Meeting Link](https://discord.gg/FFe4nB8MJj?event=1313319275708289034)
- Chinese Speakers: Mondays at 9 PM UTC+8. Join via TecentMeeting: [Meeting Link](https://meeting.tencent.com/dm/057wap1eeCSY)

### Our Communication Channels 💬
- **Discord:** [Join here](https://discord.camel-ai.org/)
- **WeChat:** Scan the QR code [here](https://ghli.org/camel/wechat.png)
- **Slack:** [Join here](https://join.slack.com/t/camel-ai/shared_invite/zt-2g7xc41gy-_7rcrNNAArIP6sLQqldkqQ)

## Guidelines 📝
### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b servers/new-server`)
3. Commit your changes (`git commit -m 'Add new server'`)
4. Push to the branch (`git push origin servers/new-server`)
5. Open a Pull Request

### Adding New Servers

To add new servers to the catalog:

1. Add the server information to either `community.json`, `anthropic.json` or `official.json`
2. Follow the existing structure for consistency
3. The changes will be automatically reflected in the UI

This collaborative approach allows the community to maintain an up-to-date catalog of MCP servers.

## Quicck Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/camel-ai/mcp-hub.git
cd mcp-hub
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Server Data Structure

The core of this project is the server data stored in JSON files. The application uses two main JSON files to catalog MCP servers:

- `public/servers/anthropic.json`: Contains Anthropic MCP servers
- `public/servers/official.json`: Contains official MCP servers

Each server entry follows this structure:

```json
{
  "name": "Server Name",
  "key": "server-key",
  "description": "Description of the server functionality",
  "command": "npx",
  "args": ["-y", "@package/server-name"],
  "env": {
    "API_KEY": "{{apiKey@string::Your API key}}"
  },
  "homepage": "https://github.com/org/repo"
}
```

## Deployment

### Using Docker

Build and run the Docker image:

```bash
# Build the image
docker build -t mcp-hub:latest .

# Run the container
docker run -p 3000:3000 mcp-hub:latest
```

### Deploying to Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

```bash
npm install -g vercel
vercel
```

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Model Context Protocol](https://github.com/modelcontextprotocol) - For creating the MCP standard
- [Anthropic](https://www.anthropic.com/) - For their contributions to the MCP ecosystem
- [CAMEL-AI](https://camel-ai.org/) - For hosting and maintaining the MCP Hub
