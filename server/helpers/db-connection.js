const { Client } = require('pg');

module.exports = new Client({
  host: '<host>',
  user: 'junglescout',
  password: '<password>',
  database: 'junglescout',
  port: 5432,
});
