const pool = require("../../configMySql");

module.exports = {
  getDetailImgs: async (idProduct) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT i.idImg, i.name, i.urlResized FROM image i WHERE i.idProduct = ? order by i.isAvatar DESC`,
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
