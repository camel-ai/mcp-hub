# CAMEL MCP Hub
<div align="left">

[![Documentation][docs-image]][docs-url]
[![Discord][discord-image]][discord-url]
[![X][x-image]][x-url]
[![Reddit][reddit-image]][reddit-url]
[![Wechat][wechat-image]][wechat-url]
[![Hugging Face][huggingface-image]][huggingface-url]
[![Star][star-image]][star-url]
[![Package License][package-license-image]][package-license-url]
[![PyPI Download][package-download-image]][package-download-url]

</div>


## 🌐 Discover MCP Servers

**CAMEL MCP Hub** is a community-driven directory for discovering **MCP (Model Context Protocol) servers**.  
This platform is built to help developers find and use:

- [Official MCP servers](https://mcp.camel-ai.org/?filter=official)  
- [CAMEL MCP servers](https://mcp.camel-ai.org/?filter=camel)  
- [Anthropic MCP servers](https://mcp.camel-ai.org/?filter=anthropic)  
- [Community MCP servers](https://mcp.camel-ai.org/?filter=community)

All listed servers are **verified** and curated to ensure a **secure and reliable environment** for building agent-based applications.



## 📦 Contribution Guidelines

To contribute your MCP server to the CAMEL MCP Hub, please follow the guidelines below based on your category:

### 🐫 CAMEL Tool Providers
Add your server configuration to:
[`/public/servers/camel.json`](./public/servers/camel.json)

### 🛡 ️Official Providers
Add your MCP server configurations to:
[`/public/servers/official.json`](./public/servers/official.json)

### 📁 Anthropic Servers
Add your Anthropic server configuration to:  
[`/public/servers/anthropic.json`](./public/servers/anthropic.json)

### 👥 Community Developers
Want to share your own server? Add your configuration to:
[`/public/servers/community.json`](./public/servers/community.json)

---

## 🧾 Configuration Schema

Below is a sample server configuration schema:

```json
{
  "name": "Filesystem",
  "key": "filesystem",
  "description": "Read, write, and manipulate local files through a controlled API.",
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "{{dirs@list::directories you about to access. Trailing slash in path required.}}"
  ],
  "homepage": "https://github.com/modelcontextprotocol/servers/tree/HEAD/src/filesystem"
}
```

<br>

[docs-image]: https://img.shields.io/badge/Documentation-EB3ECC
[docs-url]: https://camel-ai.github.io/camel/index.html
[star-image]: https://img.shields.io/github/stars/camel-ai/camel?label=stars&logo=github&color=brightgreen
[star-url]: https://github.com/camel-ai/camel/stargazers
[package-license-image]: https://img.shields.io/badge/License-Apache_2.0-blue.svg
[package-license-url]: https://github.com/camel-ai/camel/blob/master/licenses/LICENSE
[package-download-image]: https://img.shields.io/pypi/dm/camel-ai

[colab-url]: https://colab.research.google.com/drive/1AzP33O8rnMW__7ocWJhVBXjKziJXPtim?usp=sharing
[colab-image]: https://colab.research.google.com/assets/colab-badge.svg
[huggingface-url]: https://huggingface.co/camel-ai
[huggingface-image]: https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-CAMEL--AI-ffc107?color=ffc107&logoColor=white
[discord-url]: https://discord.camel-ai.org/
[discord-image]: https://img.shields.io/discord/1082486657678311454?logo=discord&labelColor=%20%235462eb&logoColor=%20%23f5f5f5&color=%20%235462eb
[wechat-url]: https://ghli.org/camel/wechat.png
[wechat-image]: https://img.shields.io/badge/WeChat-CamelAIOrg-brightgreen?logo=wechat&logoColor=white
[x-url]: https://x.com/CamelAIOrg
[x-image]: https://img.shields.io/twitter/follow/CamelAIOrg?style=social
[twitter-image]: https://img.shields.io/twitter/follow/CamelAIOrg?style=social&color=brightgreen&logo=twitter
[reddit-url]: https://www.reddit.com/r/CamelAI/
[reddit-image]: https://img.shields.io/reddit/subreddit-subscribers/CamelAI?style=plastic&logo=reddit&label=r%2FCAMEL&labelColor=white
[ambassador-url]: https://www.camel-ai.org/community
[package-download-url]: https://pypi.org/project/camel-ai