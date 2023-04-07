const pt = require('puppeteer');
function autoScroll(page) {
  return page.evaluate(() => {
    return new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      // 每200毫秒让页面下滑100像素的距离
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}
module.exports = async function (options) {
  const browser = await pt.launch({ headless: false }),
    pg = await browser.newPage(),
    url = options.url;

  await pg.goto(url, {
    waitUntil: 'networkidle2',
  });
  
  await autoScroll(pg);
  const result = await pg.evaluate(options.callback);

  await browser.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1000);
};
