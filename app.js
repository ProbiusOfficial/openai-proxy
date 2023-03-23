const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 9000;

app.get('/ok', (req, res) => {
  res.send('Proxy service is running properly！');
});

const openaiApiProxy = createProxyMiddleware('/', {
  target: 'https://api.openai.com',
  changeOrigin: true,
  pathRewrite: {
    '^/': '',
  },
});

app.use(openaiApiProxy);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
