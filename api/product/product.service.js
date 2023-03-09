const pool = require("../../configMySql");

module.exports = {
  // hiện trên trang user

  getPros: (idCate, cb) => {
    pool.query(
      `SELECT p.*, i.idImg, i.name FROM image i , product p WHERE p.idProduct = i.idProduct and i.isAvatar = 1 and p.idCategory = ? order by p.idProduct`,
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
        `INSERT INTO product values(?, ?, ?,?,?,?,?,?,?,?)`,
        [
          null,
          data.code,
          data.nameProduct,
          data.price,
          data.descriptionVi,
          data.descriptionEn,
          data.urlVideo,
          data.gender,
          data.idCategory,
          data.idMenu,
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
  updateProduct: async (data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE product SET code=?, nameProduct=?,
        descriptionVi=?,
        descriptionEn=?,
        price=?,
        urlVideo=?,
        gender=?,
        idCategory=? WHERE idProduct=?`,
        [
          data.code,
          data.nameProduct,
          data.descriptionVi,
          data.descriptionEn,
          data.price,
          data.urlVideo,
          data.gender,
          data.idCategory,
          data.idProduct,
        ],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result.insertId);
        }
      );
    }),
  search: (searchInput, cb) => {
    pool.query(
      "SELECT * FROM product p, image i WHERE p.idProduct = i.idProduct and i.isAvatar = 1 and (p.code LIKE '%" +
        searchInput +
        "%' or p.descriptionVi LIKE '%" +
        searchInput +
        "%' or p.descriptionEn LIKE '%" +
        searchInput +
        "%' or p.nameProduct LIKE '%" +
        searchInput +
        "%')",
      (error, result) => {
        if (error) {
          return cb(error);
        }
        return cb(null, result);
      }
    );
  },
};
