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
  addBrand: async (brand) => {
    new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO brand VALUES(?,?,?)`,
        [null, brand.nameBrand, brand.urlBrand ? brand.urlBrand : ""],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  updateBrand: async (brand) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE brand SET nameBrand = ? WHERE idBrand = ?`,
        [brand.nameBrand, brand.idBrand],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  delete: async (idBrand) =>
    new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM brand WHERE idBrand = ?`,
        [idBrand],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    }),
};
