const pool = require("../../configMySql");

module.exports = {
  getCates: (cb) => {
    pool.query(`SELECT * FROM category`, [], (error, result) => {
      if (error) {
        return cb(error);
      }
      return cb(null, result);
    });
  },
};
