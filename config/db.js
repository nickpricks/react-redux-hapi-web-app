module.exports = {
  development: {
    username: 'root',
    password: 'r@0ot',
    database: 'rrh_dev',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: '',
    database: 'rrh_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    host: process.env.DB_HOST || '',
    database: process.env.DB || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PWD || '',
    dialect: 'mysql'
  }
};
