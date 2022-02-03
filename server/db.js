const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  connectionString: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
});

module.exports = pool;