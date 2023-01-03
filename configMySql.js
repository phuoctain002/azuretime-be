const { createPool } = require("mysql");

const pool = createPool({
  // Deploy & dev
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST || "s1001.genhosting.vn",
  user: process.env.DB_USER || "natjy6u8_root",
  password: process.env.DB_PASS || "_.k,?1kg1Dd_",
  database: process.env.DB || "natjy6u8_azuretime",

  connectionLimit: 100,
});

module.exports = pool;
