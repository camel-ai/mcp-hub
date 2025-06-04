# CAMEL MCP 中心

## 🌐 探索 MCP 服务器

**CAMEL MCP 中心**是一个社区驱动的目录，用于发现 **MCP（模型上下文协议）服务器**。  
该平台旨在帮助开发者发现和使用：

- 官方 MCP 服务器  
- CAMEL MCP 服务器  
- Anthropic MCP 服务器  
- 社区 MCP 服务器

所有列出的服务器均经过**验证和筛选**，确保为构建基于代理的应用提供**安全可靠的环境**。

---

## 📦 贡献指南

请根据您的类别遵循以下指南提交 MCP 服务器：

### 🛠 CAMEL 工具提供方
添加服务器配置至：  
[`/public/servers/camel.json`](./public/servers/camel.json)

### 🏢 官方提供方
添加 MCP 服务器配置至：  
[`/public/servers/officials.json`](./public/servers/officials.json)

### 📁 Anthropic 服务器
添加 Anthropic 服务器配置至：  
[`/public/servers/anthropic.json`](./public/servers/anthropic.json)

### 👥 社区开发者
分享您的服务器？添加配置至：  
[`/public/servers/community.json`](./public/servers/community.json)

---

## 🧾 配置架构示例

服务器配置架构范例如下：

```json
{
  "name": "文件系统",
  "key": "filesystem",
  "description": "通过受控API读写和操作本地文件",
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "{{dirs@list::即将访问的目录。路径结尾需添加斜杠}}"
  ],
  "homepage": "https://github.com/modelcontextprotocol/servers/tree/HEAD/src/filesystem"
}