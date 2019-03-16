const Koa = require('koa');
const app = new Koa();

app.listen(3000, () => {
  console.log("服务器已启动，请访问http://127.0.0.1:3000")
});
