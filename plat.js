const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// 飞书机器人的配置
const APP_ID = 'your-app-id';
const APP_SECRET = 'your-app-secret';
const OPEN_ID = 'your-open-id';

// 获取飞书access_token
async function getFeishuAccessToken() {
  const url = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal';
  const params = new URLSearchParams({ app_id: APP_ID, app_secret: APP_SECRET });
  const response = await fetch(url + '?' + params);
  const data = await response.json();
  return data.tenant_access_token;
}

// 发送消息到飞书群聊
async function sendFeishuMessage(access_token, message) {
  const url = 'https://open.feishu.cn/open-apis/im/v1/messages';
  const headers = { Authorization: `Bearer ${access_token}` };
  const payload = {
    receive_id: OPEN_ID,
    msg_type: 'text',
    content: JSON.stringify({ text: message })
  };
  await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) });
}

// 处理表单提交的API接口
app.post('/submit-form', async (req, res) => {
  const formData = req.body;
  const message = `新表单提交：\n姓名：${formData.name}\n邮箱：${formData.email}\n消息：${formData.message}`;
  
  try {
    const access_token = await getFeishuAccessToken();
    await sendFeishuMessage(access_token, message);
    res.json({ message: '表单提交成功，消息已发送到飞书群聊' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: '表单提交失败' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));