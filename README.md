# Life Coach AI 项目

这是一个基于火山方舟DeepSeek R1 API的AI人生教练网站，通过与用户对话提供建议和成长支持。

## 项目结构

```
├── README.md          # 项目说明文档
├── server.js          # Node.js后端服务器
└── index.html         # 前端页面
```

## 功能说明

1. **对话界面**：用户可以与AI人生教练进行文字对话
2. **AI回应**：基于DeepSeek R1模型提供智能回答和建议
3. **流式输出**：AI回复采用流式输出，提升用户体验
4. **响应式设计**：适配不同设备屏幕尺寸

## 技术实现

### 前端
- HTML5 + CSS3 + JavaScript
- 响应式设计，使用Flexbox布局
- 实时对话界面，支持流式输出

### 后端
- Node.js + Express
- 处理API请求，解决CORS问题
- 集成火山方舟DeepSeek R1 API

## 环境配置

1. 确保已安装Node.js
2. 安装依赖：`npm install express node-fetch`
3. 启动服务器：`node server.js`
4. 打开浏览器访问：`http://localhost:3000`

## API配置

- API密钥：edcd629e-b44c-4fba-9d7f-5223c4bd61fe
- API端点：https://ark.cn-beijing.volces.com/api/v3/responses
- 模型：doubao-seed-1-8-251228
- 温度设置：0.6
- 超时设置：60秒

## 使用说明

1. 在输入框中输入你的问题或分享你的想法
2. 点击发送按钮或按Control+Enter键
3. AI人生教练会实时回复你，提供建议和支持
4. 继续对话，深入探讨你的问题

## 注意事项

- 请确保网络连接稳定
- API调用可能会有一定延迟，请耐心等待
- 对话内容仅用于AI处理，不会被存储
