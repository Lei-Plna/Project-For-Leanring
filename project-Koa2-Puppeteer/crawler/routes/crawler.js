const router = require('koa-router')();
const Crawler = require('../controller/Crawler');
  

router.prefix('/crawler');

router.get('/', Crawler.crawlSliderData);

module.exports = router;
