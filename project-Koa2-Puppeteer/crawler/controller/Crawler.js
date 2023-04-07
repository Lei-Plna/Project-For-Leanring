const { qiniuUpload } = require("../libs/qiniu-upload");
const { startProcess } = require("../libs/subprocess");
const { qiniu } = require('../config');
const SliderService = require('../service/Slider');
const AgencyService = require('../service/AgencyInfo');
const recommendService = require('../service/RecommendCourse');
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
      path: '../crawlers/agencyInfo',
      async message(data) {
        if (!data.logoUrl || data.logoKey) {
          return;
        }
        try {
          const logoData = await qiniuUpload({
            url: data.logoUrl,
            bucket: qiniu.bucket.tximg.bucket_name,
            ext: '.png'
          });
          if (logoData.key) {
            data.logoKey = logoData.key;
            const result = await AgencyService.addAgencyInfo(data);
            if (result) {
              console.log('add agency info success');
            } else {
              console.log('add agency info failed');
            }
          }
        } catch (error) {
          console.log('error: ', error);
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

  crawlRecommendCourse() {
    startProcess({
      path: '../crawlers/recommendCourse',
      async message(data) {
        try {
          data.map(async item => {
            if (!item.posterUrl || item.posterKey) {
              return;
            }
            const posterData = await qiniuUpload({
              url: item.posterUrl,
              bucket: qiniu.bucket.tximg.bucket_name,
              ext: '.png'
            });
            if (posterData.key) {
              item.posterKey = posterData.key;
            }
            const result = await recommendService.addRecommendCourse(item);
            if (result) {
              console.log('add recommend course success');
            } else {
              console.log('add recommend course failed');
            }
          });
        } catch (error) {
          console.log('error: ', error);
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