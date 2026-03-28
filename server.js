import express from 'express';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

// 启用CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 解析JSON请求体
app.use(express.json());

// 静态文件服务
app.use(express.static(__dirname));

// API密钥
const API_KEY = 'edcd629e-b44c-4fba-9d7f-5223c4bd61fe';

// 处理AI对话请求
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // 构建API请求
    const apiResponse = await fetch('https://ark.cn-beijing.volces.com/api/v3/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'doubao-seed-1-8-251228',
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: message
              }
            ]
          }
        ],
        temperature: 0.6,
        stream: true
      }),
      timeout: 60000 // 60秒超时
    });

    if (!apiResponse.ok) {
      throw new Error(`API请求失败: ${apiResponse.status} ${apiResponse.statusText}`);
    }

    // 检查响应类型
    const contentType = apiResponse.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      // 非流式响应，直接返回JSON
      const data = await apiResponse.json();
      res.json(data);
    } else {
      // 流式输出
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      try {
        if (apiResponse.body && typeof apiResponse.body.getReader === 'function') {
          const reader = apiResponse.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            res.write(chunk);
            
            // 检查是否有结束标记
            if (chunk.includes('data: [DONE]')) {
              break;
            }
          }
        } else {
          // 非流式响应
          const text = await apiResponse.text();
          res.send(text);
        }
      } catch (streamError) {
        console.error('流式处理错误:', streamError);
        // 回退到非流式处理
        const text = await apiResponse.text();
        res.send(text);
      }

      res.end();
    }
  } catch (error) {
    console.error('错误:', error);
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
  console.log(`请打开浏览器访问: http://localhost:${port}`);
});
