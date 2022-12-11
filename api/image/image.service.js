const pool = require("../../configMySql");

module.exports = {
  getDetailImgs: async (idProduct) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT i.idImg, i.name FROM image i WHERE i.idProduct = ? order by i.isAvatar DESC`,
        [idProduct],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    }),
  createImg: async (data, idProduct) =>
    new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO image values(?, ?, ?,?)`,
        [
          null,
          data.name,
          data.isAvatar,
          idProduct,
        ],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result.insertId);
        }
      );
    }),
  delete: async (name) =>
  new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM image WHERE name = ?`,
      [
        name
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  }),
};
