/**
 * @description: slider model
 * define slider model
 */
const seq = require('../connection/mysql'),
  { String, Integer } = require('../../config/db_type');
// Define model
const Slider = seq.define('slider', {
  cid: {
    comment: 'course ID',
    type: Integer,
  },
  href: {
    comment: 'course detail page link',
    type: String
  },
  imgUrl: {
    comment: 'course image url',
    type: String,
    allowNull: false
  },
  title: {
    comment: 'course name',
    type: String,
  },
  imgKey: {
    comment: 'qiniu image name',
    type: String,
    allowNull: false
  },
  status: {
    comment: 'course status',
    type: Integer,
    allowNull: false,
    defaultValue: 1
  }
});

module.exports = Slider;