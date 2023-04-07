const crawler = require('../libs/crawler'),
  { crawler: crawlerConfig } = require('../config/index');

crawler({
  url: crawlerConfig.url.main,
  callback() {
    const $section = document.querySelector('.kc-agency-hd-pc'),
      $logo = $section.querySelector('img'),
      $agencyName = $section.querySelector('.center-block .agency-info-ctn .agency-info .agency-name'),
      $description = $section.querySelector('.agency-desc'),
      $countPanel = $section.querySelector('.kc-agency-hd-count-ctn'),
      $panels = $countPanel.children;

    return {
      logoUrl: $logo.src,
      agencyName: $agencyName.innerText,
      feedbackRate: $panels[0].querySelector('.val').innerText.replace(/[^0-9]/ig, ''),
      studentCount: $panels[1].querySelector('.val').innerText.replace(/[^0-9]/ig, ''),
      courseCount: $panels[2].querySelector('.val').innerText.replace(/[^0-9]/ig, ''),
      description: $description.innerText,
      logoKey: ''
    }
  }
});