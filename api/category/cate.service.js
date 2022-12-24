const pool = require("../../configMySql");

module.exports = {
  getCates: (cb) => {
    pool.query(
      `SELECT *, b.idBrand, b.nameBrand FROM category c, brand b where c.idBrand = b.idBrand`,
      [],
      (error, result) => {
        if (error) {
          return cb(error);
        }
        return cb(null, result);
      }
    );
  },
  addCate: (cate, cb) => {
    pool.query(
      `INSERT INTO category VALUES(?,?,?,?)`,
      [null, cate.nameCategory, 0, cate.idBrand],
      (error, result) => {
        if (error) {
          cb(error);
        }
        cb(null, result);
      }
    );
  },
  updateCate: async (cate) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE category SET nameCategory = ? WHERE idCategory = ?`,
        [cate.nameCategory, cate.idCategory],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  delete: async (idCategory) =>
    new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM category WHERE idCategory = ?`,
        [idCategory],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    }),
};
