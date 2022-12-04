const pool = require("../../configMySql");

module.exports = {
  getBrands: async () =>
    new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM brand`, [], (error, result) => {
        // if (error) {
        //   return cb(error);
        // }
        // return cb(null, result);
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    }),
};
