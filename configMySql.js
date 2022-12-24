const { createPool} = require("mysql");

const pool = createPool({
  // Deploy & dev
  port: 3306,
  host: "s1001.genhosting.vn",
  user: "natjy6u8_root",
  password: "_.k,?1kg1Dd_",
  database: "natjy6u8_azuretime",

  connectionLimit: 100,
});



module.exports = pool;
