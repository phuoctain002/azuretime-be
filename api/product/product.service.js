const pool = require("../../configMySql");

module.exports = {
  // hiện trên trang user
  getPros: (idCate, cb) => {
    pool.query(
      `SELECT p.*, i.idImg, i.name FROM image i , product p WHERE p.idProduct = i.idProduct and i.isAvatar = 1 and p.idCategory = ?`,
      [idCate],
      (error, result) => {
        if (error) {
          return cb(error);
        }
        return cb(null, result);
      }
    );
  },
  getProsAdmin: (cb) => {
    pool.query(
      `SELECT p.*, b.idBrand, b.nameBrand, c.nameCategory FROM product p, brand b, category c WHERE c.idCategory = p.idCategory and b.idBrand = c.idBrand`,
      (error, result) => {
        if (error) {
          return cb(error);
        }
        return cb(null, result);
      }
    );
  },
  getProDetail: async (idProduct) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT p.*, b.idBrand, b.nameBrand, c.nameCategory FROM product p, brand b, category c WHERE c.idCategory = p.idCategory and b.idBrand = c.idBrand and p.idProduct = ?`,
        [idProduct],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    }),
  createProduct: async (data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO product values(?, ?, ?,?,?,?,?,?,?)`,
        [
          null,
          data.code,
          data.nameProduct,
          data.descriptionVi,
          data.descriptionEn,
          data.price,
          data.urlVideo,
          data.gender,
          data.idCategory,
        ],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result.insertId);
        }
      );
    }),
  delete: async (idProduct) =>
    new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM product WHERE idProduct = ?`,
        [idProduct],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    }),
};
