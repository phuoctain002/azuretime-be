const pool = require("../../configMySql");

module.exports = {
  getDetailImgs: async (idProduct) =>
    new Promise((resolve, reject) => {
      pool.query(
        // `SELECT i.idImg, i.name FROM image i WHERE i.idProduct = ? order by i.isAvatar DESC`,
        `SELECT i.idImg as 'key', i.name, i.isAvatar, i.idProduct FROM image i WHERE i.idProduct = ? order by i.isAvatar DESC`,
        [idProduct],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    }),
  getImgsName: async (idProduct) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT i.name FROM image i WHERE i.idProduct = ?`,
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
        [data.idImg, data.name, data.isAvatar, idProduct],
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
        [name],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    }),
  updateAvaImg: async (data) =>
    new Promise((resolve, reject) => {
      if (data.case === 2) {
        //trường họp 2: đổi ava hình cũ
        pool.query(
          `UPDATE image SET isAvatar=0 WHERE idImg=?`,
          [data.oldId],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          }
        );
        pool.query(
          `UPDATE image SET isAvatar=1 WHERE idImg=?`,
          [data.newId],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          }
        );
      } else if (data.case === 3) {
        // trường họp 3: đổi ava hình mới
        pool.query(
          `UPDATE image SET isAvatar=0 WHERE idImg=?`,
          [data.oldId],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          }
        );
      }
    }),
};
