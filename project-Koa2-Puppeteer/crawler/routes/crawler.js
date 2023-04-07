const router = require('koa-router')();
const Crawler = require('../controller/Crawler');
  

router.prefix('/crawler');

router.get('/crawl_slider_data', Crawler.crawlSliderData);
router.get('/crawl_agency_info', Crawler.crawlAgencyInfo);
router.get('/crawl_recommend_course', Crawler.crawlRecommendCourse);

module.exports = router;
