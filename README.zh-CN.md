# MCP Hub - 模型上下文协议服务器目录

MCP Hub是一个全面的MCP（模型上下文协议）服务器和集成中心，旨在增强AI代理和多代理工作流程。这个Next.js应用程序提供了一个用户友好的界面，用于浏览、筛选和获取各种MCP服务器的配置详情。

## 功能特点

- **全面的服务器目录**：浏览精选的官方和Anthropic MCP服务器集合
- **筛选功能**：按来源（全部、官方、Anthropic）筛选服务器
- **详细信息**：查看每个服务器的详细信息，包括描述、命令和配置
- **复制配置**：轻松复制JSON格式的服务器配置，便于快速集成
- **响应式设计**：完全响应式的UI，适用于桌面和移动设备
- **现代UI**：使用Tailwind CSS和shadcn/ui构建的现代UI组件

## 开始使用

### 前提条件

- Node.js 20.x或更高版本
- npm或yarn

### 安装

1. 克隆仓库：

```bash
git clone https://github.com/camel-ai/mcp-hub.git
cd mcp-hub
```

2. 安装依赖：

```bash
npm install
# 或
yarn install
```

3. 运行开发服务器：

```bash
npm run dev
# 或
yarn dev
```

4. 在浏览器中打开[http://localhost:3000](http://localhost:3000)查看结果。

## 服务器数据结构

本项目的核心是存储在JSON文件中的服务器数据。应用程序使用两个主要的JSON文件来目录化MCP服务器：

- `public/servers/anthropics.json`：包含Anthropic相关的MCP服务器
- `public/servers/officials.json`：包含官方MCP服务器

每个服务器条目遵循以下结构：

```json
{
  "name": "服务器名称",
  "key": "服务器键名",
  "description": "服务器功能描述",
  "command": "npx",
  "args": ["-y", "@package/server-name"],
  "env": {
    "API_KEY": "{{apiKey@string::您的API密钥}}"
  },
  "homepage": "https://github.com/org/repo"
}
```

## 添加新服务器

要向目录添加新服务器：

1. 将服务器信息添加到`anthropics.json`或`officials.json`
2. 遵循现有结构以保持一致性
3. 更改将自动反映在UI中

这种协作方式允许社区维护一个最新的MCP服务器目录。

## 部署

### 使用Docker

构建并运行Docker镜像：

```bash
# 构建镜像
docker build -t mcp-hub:latest .

# 运行容器
docker run -p 3000:3000 mcp-hub:latest
```

### 部署到Vercel

部署这个Next.js应用的最简单方法是使用[Vercel平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

```bash
npm install -g vercel
vercel
```

## 使用的技术

- [Next.js](https://nextjs.org/) - React框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [shadcn/ui](https://ui.shadcn.com/) - UI组件库
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Lucide React](https://lucide.dev/) - 图标库

## 贡献

欢迎贡献！请随时提交Pull Request。

1. Fork仓库
2. 创建您的功能分支（`git checkout -b feature/amazing-feature`）
3. 提交您的更改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 开启一个Pull Request

## 许可证

本项目采用MIT许可证 - 详情请参阅LICENSE文件。

## 致谢

- [Model Context Protocol](https://github.com/modelcontextprotocol) - 创建MCP标准
- [Anthropic](https://www.anthropic.com/) - 对MCP生态系统的贡献
- [CAMEL-AI](https://camel-ai.org/) - 托管和维护MCP Hub
