/**
 * @description: slider model
 * define slider model
 */
const seq = require('../connection/mysql'),
  { String, Integer } = require('../../config/db_type');
// Define model
const AgencyInfo = seq.define('agency_info', {
  logoUrl: {
    comment: 'agency logo url',
    type: String,
    allowNull: false
  },
  agencyName: {
    comment: 'agency name',
    type: String,
    allowNull: false
  },
  feedbackRate: {
    comment: 'agency feedback rate',
    type: Integer,
    allowNull: false
  },
  studentCount: {
    comment: 'agency student count',
    type: Integer,
    allowNull: false
  },
  courseCount: {
    comment: 'agency course count',
    type: Integer,
    allowNull: false
  },
  description: {
    comment: 'agency description',
    type: String,
    allowNull: false
  },
  logoKey: {
    comment: 'qiniu image name',
    type: String,
    allowNull: false
  },
  status: {
    comment: 'agency status',
    type: Integer,
    allowNull: false,
    defaultValue: 1
  }
});

module.exports = AgencyInfo;