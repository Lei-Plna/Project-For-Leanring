/**
 * @description: slider model
 * define slider model
 */
const seq = require('../connection/mysql'),
  { String, Integer } = require('../../config/db_type');
// Define model
const RecommendCourse = seq.define('recommend_course', {
  cid: {
    type: Integer,
    comment: "course's id",
    allowNull: false,
    unique: true
  },
  href: {
    type: String,
    comment: "course's href",
    allowNull: false
  },
  title: {
    type: String,
    comment: "course's title",
    allowNull: false
  },
  posterUrl: {
    type: String,
    comment: "course's poster url",
    allowNull: false
  },
  studentCount: {
    type: Integer,
    comment: "course's student count",
    allowNull: false
  },
  price: {
    type: String,
    comment: "course's price",
    allowNull: false
  },
  posterKey: {
    type: String,
    comment: "course's poster key",
    allowNull: false
  },
  status: {
    comment: 'agency status',
    type: Integer,
    allowNull: false,
    defaultValue: 1
  }
});

module.exports = RecommendCourse;