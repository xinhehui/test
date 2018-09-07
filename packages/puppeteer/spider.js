// http://csbun.github.io/blog/2017/09/puppeteer/
const puppeteer = require('puppeteer');

const CREDS = require('./creds');

const spider = async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto('https://github.com/login');

  // dom element selectors
  const USERNAME_SELECTOR = '#login_field';
  const PASSWORD_SELECTOR = '#password';
  const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

  await page.click(USERNAME_SELECTOR);
  await page.type(USERNAME_SELECTOR, CREDS.username);

  await page.click(PASSWORD_SELECTOR);
  await page.type(PASSWORD_SELECTOR, CREDS.password);

  await page.click(BUTTON_SELECTOR);

  await page.waitForNavigation();

  const userToSearch = 'john';
  const searchUrl = 'https://github.com/search?q=' + userToSearch + '&type=Users&utf8=%E2%9C%93';

  await page.goto(searchUrl);
  await page.waitFor(2 * 1000);

  const USER_LIST_INFO_SELECTOR = '.user-list-item';
  const USER_LIST_USERNAME_SELECTOR = '.user-list-info>a:nth-child(1)';
  const USER_LIST_EMAIL_SELECTOR = '.user-list-info>.user-list-meta .muted-link';

  const users = await page.evaluate((sInfo, sName, sEmail) => {
    return Array.prototype.slice.apply(document.querySelectorAll(sInfo))
      .map($userListItem => {
        // 用户名
        const username = $userListItem.querySelector(sName).innerText;
        // 邮箱
        const $email = $userListItem.querySelector(sEmail);
        const email = $email ? $email.innerText : undefined;
        return {
          username,
          email,
        };
      })
      // 不是所有用户都显示邮箱
      .filter(u => !!u.email);
  }, USER_LIST_INFO_SELECTOR, USER_LIST_USERNAME_SELECTOR, USER_LIST_EMAIL_SELECTOR);

  console.log(users);
}

spider()