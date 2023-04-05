const pt = require('puppeteer');

(async () => {
  // launch是一个异步的过程
  const browser = await pt.launch(),
    baseUrl = 'https://msiwei.ke.qq.com/?activeTab=head_recommend',
    page = await browser.newPage();
  await page.goto(baseUrl, {
    timeout: 30 * 1000,
    /*  waitUntil <string|Array<string>> 满足什么条件认为页面跳转完成，默认是 load 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
       load - 页面的load事件触发时
       domcontentloaded - 页面的 DOMContentLoaded 事件触发时
       networkidle0 - 不再有网络连接时触发（至少500毫秒后）
       networkidle2 - 只有2个网络连接时触发（至少500毫秒后） */
    waitUntil: 'networkidle2',
  });
  const result = await page.evaluate(() => {
    const result = [];
    const $items = document.querySelectorAll('.swiper-wrapper .w-banner-item');

    $items.forEach((item, index) => {
      const $elLink = item.querySelector('.js-report-link'),
        $img = $elLink.querySelector('img');

      const dataItem = {
        imgUrl: $img.getAttribute('src'),
      };

      result.push(dataItem);
    });
    return result;
  });
  await browser.close();
  
  // 通过process.send()方法向父进程发送消息
  process.send(result);

  setTimeout(() => {
    // 退出子进程
    process.exit(0);
  }, 1000);
})();
