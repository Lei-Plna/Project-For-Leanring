const crawler = require('../libs/crawler'),
  { crawler } = require('../config/index');

crawler({
  url: crawler.url.main,
  callback() {
    const result = [];
    const $items = document.querySelectorAll('.swiper-wrapper .w-banner-item');

    $items.forEach((item) => {
      const $elLink = item.querySelector('.js-report-link'),
        $img = $elLink.querySelector('img');

      const dataItem = {
        imgUrl: $img.src,
        imgKey: ''
      };

      result.push(dataItem);
    });
    return result;
  },
});
