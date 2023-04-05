const pt = require('puppeteer');

module.exports = async function (options) {
  const browser = await pt.launch({ headless: false }),
    pg = await browser.newPage(),
    url = options.url;
  
  await pg.goto(url, {
    waitUntil: 'networkidle2'
  });

  const result = await pg.evaluate(options.callback);

  await browser.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1000);
}