const crawler = require('../libs/crawler'),
  { crawler: crawlerConfig } = require('../config/index');

crawler({
  url: crawlerConfig.url.main,
  callback() {
    const data = [];
    const $section = document.querySelector('.agency-recommend-container-pc>.gems-section-pc>.gems-section-content>div'),
      $items = $section.querySelectorAll(':scope>div');
    $items.forEach(item => {
      const $itemLink = item.querySelector('a.js-report-link'),
        $img = $itemLink.querySelector('[class^="kc-course-card-img"] img'),
        $title = item.querySelector('[class^="kc-course-card-name"]'),
        $footer = item.querySelector('[class^="kc-course-card-footer-info"]'),
        $studentCount = $footer.lastElementChild,
        $price = $footer.querySelector('[class^="kc-course-card-price-current"]').lastElementChild;

      const dataItem = {
        cid: parseInt($itemLink.getAttribute('href').match(/\/([0-9]+)$/)[1]),
        href: $itemLink.getAttribute('href'),
        title: $title.innerText,
        posterUrl: $img.src,
        studentCount: $studentCount.innerText.replace(/[^0-9]/ig, ""),
        price: $price.innerText,
        posterKey: ''
      }

      data.push(dataItem);
    });
    return data;
  }
});