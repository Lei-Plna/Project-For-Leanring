const { Sequelize } = require('sequelize');
const { mysql } = require('../../config/db');

const seq = new Sequelize(...mysql.conf, mysql.base);

module.exports = seq;