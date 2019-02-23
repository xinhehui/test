const puppeteer = require('puppeteer');

const url = 'http://localhost/xxwade/openresty/openresty-best-practices-master/_book/'


async function getBooks(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.pdf({path: 'pdf/hn.pdf', format: 'A4'});

  await browser.close();
}

getBooks(url)