const { Client } = require('pg');

module.exports = new Client({
  host: 'junglescout.c4nqtxxmppqq.us-west-1.rds.amazonaws.com',
  user: 'junglescout',
  password: '<password>',
  database: 'junglescout',
  port: 5432,
});
