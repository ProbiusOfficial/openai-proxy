# openai-proxy
使用腾讯云函数将Openai的API偷渡到国内x

跟随下面的文档进行搭建 / 或者直接上传封装好的代码包即可x

### 如何部署

在腾讯云中打开云函数列表：https://console.cloud.tencent.com/scf/list

新建一个云函数，选择**从头开始**，类型为**Web函数**，**Nodejs**版本选择**16.13**如图：

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h26m1679628401679.png)

地区选择内陆地区以外的地区：

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h26m1679628416310.png)

注意超时时间的阈值高一点：

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h27m1679628434367.png)

启用多并发：

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h27m1679628449061.png)

配置API触发器：

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h27m1679628459018.png)

点击完成

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h27m1679628472034.png)

等待一段时间 来到**函数管理**选中**函数代码**，将[app.js](https://github.com/ProbiusOfficial/openai-proxy/blob/main/app.js) 和 [package.json](https://github.com/ProbiusOfficial/openai-proxy/blob/main/package.json) 替换为下面内容：

```JavaScript
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

```

```json
{
  "name": "origin",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1",
    "http-proxy-middleware": "^2.0.6"
  }
}
```



![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h28m1679628483083.png)

在部署处下拉，选择**自动配置依赖**

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h28m1679628497091.png)

最后点击部署即可。

访问url/ok返回时，说明部署成功：

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h28m1679628512018.png)

而云函数的访问路径即可用于替换OpenAi的API地址https://api.openai.com

（/release可以加也可以不加，你也可以在API网关里面进一步设置，使用自己的域名）

### 如何使用

云函数的访问路径即可用于替换OpenAi的API地址https://api.openai.com

比如在 OpenAi Translator中 将云函数的url替换原本的openai url即可，亦或

### 效果预览

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h28m1679628525708.png)

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h29m1679628586588.png)

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h29m1679628597249.png)

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h30m1679628613797.png)

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h31m1679628672187.png)

### 其他

感谢文档：https://cloud.tencent.com/document/product/583/37920

本项目代码所用代码由GPT强力驱动生成（x

![](https://fastly.jsdelivr.net/gh/ProbiusOfficial/My_pic@main/2023y-3m-24-d11-h31m1679628687662.png)
