require('dotenv').config();

module.exports = {
  'port': process.env.DB_PORT,
  'password': process.env.DB_PASS,
  'host': process.env.DB_HOST,
};
