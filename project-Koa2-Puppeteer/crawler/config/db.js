module.exports = {
  mysql: {
    base: {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    },
    conf: ['tx_course', 'root', 'root']
  }
}
