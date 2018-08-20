const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://m.xinhehui.com', {waitUntil: 'networkidle2'});

  const res = await page.evaluate(() => {
    function assetParser(url) {
      const { host, pathname } = new URL(url)
    
      const assetName = pathname.split('/').pop()
    
      return { assetType: assetName.includes('.') ? assetName.split('.').pop() : null, name: assetName || host, host }
    }

    // 获取页面加载的资源信息
    return performance.timing.toJSON()
  })

  console.log(res)

  await browser.close();
})();
