const { qiniuUpload } = require("../libs/qiniu-upload");
const { startProcess } = require("../libs/subprocess");
const { qiniu } = require('../config');
const SliderService = require('../service/Slider');

class Crawler {
  crawlSliderData() {
    startProcess({
      path: "../crawlers/slider",
      async message(data) {
        data.forEach(async item => {
          if (item.imgUrl && !item.imgKey) {
            try {
              const imgData = await qiniuUpload({
                url: item.imgUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.png'
              });
              if (imgData.key) {
                item.imgKey = imgData.key;
                const result = await SliderService.addSliderData(item);
                if (result) {
                  console.log("add slider data success");
                } else {
                  console.log("add slider data failed");
                }
              }
            } catch (error) {
              console.log("error:", error);
            }
          }
        });
      },
      async exit(code) {
        console.log('code: ', code);
      },
      async error(err) {
        console.log('error: ', err);
      }
    });
  }

  crawlAgencyInfo() {
    startProcess({
      path: '../crawler/agencyInfo',
      async message(data) {
        try {
          const logoData = await qiniuUpload({
            url: 'item.logoUrl',
            bucket: qiniu.bucket.tximg.bucket_name,
            ext: '.png'
          });

        } catch (error) {
          console.log()
       }
      },
      async exit(code) {
        console.log('code: ', code);
      },
      async error(err) {
        console.log('error: ', err);
      }
    })
  }
}

module.exports = new Crawler();