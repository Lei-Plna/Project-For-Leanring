const { nanoid } = require('nanoid'),
  Qiniu = require('qiniu'),
  { qiniu } = require('../config/index');
module.exports = {
  qiniuUpload (options) {
    const mac = new Qiniu.auth.digest.Mac(qiniu.AK, qiniu.SK),
      config = new Qiniu.conf.Config(),
      client = new Qiniu.rs.BucketManager(mac, config),
      key = nanoid() + options.ext;

    return new Promise((resolve, reject) => {
      /**
       * @param {string} url - 上传的文件地址
       * @param {string} bucket - 上传的空间
       * @param {string} key - 上传的文件名
       * @param {function} callback - 回调函数
       */
      client.fetch(options.url, options.bucket, key, (err, ret, info) => {
        if (err) {
          reject(err);
        } else {
          if (info.statusCode === 200) {
            resolve({ key });
          } else {
            reject(info);
          }
        }
      });
    })
  }
}