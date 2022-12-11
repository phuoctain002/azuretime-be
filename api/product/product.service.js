const pool = require("../../configMySql");

module.exports = {
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
  getProDetail: async (idProduct) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT p.* FROM product p WHERE p.idProduct = ?`,
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
          data.gender ? 1 : 0,
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
};
