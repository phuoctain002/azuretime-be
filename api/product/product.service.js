const pool = require("../../configMySql");

module.exports = {
  getPros: (idCate, cb) => {
    pool.query(
      `SELECT p.*, i.idImg, i.name, i.urlResized FROM image i , product p WHERE p.idProduct = i.idProduct and p.idCategory = ?`,
      [idCate],
      (error, result) => {
        if (error) {
          return cb(error);
        }
        return cb(null, result);
      }
    );
  },
  getProDetail: async (idProduct) => new Promise ((resolve, reject) => {
    pool.query(
      `SELECT p.*, i.idImg, i.name, i.urlResized, i.urlFull FROM image i , product p WHERE p.idProduct = i.idProduct and p.idProduct = ?`,
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
