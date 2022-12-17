const pool = require("../../configMySql");

module.exports = {
  login: async (username) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM admin WHERE username = ?`,
        [username],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result[0]);
        }
      );
    }),
  createUserAdmin: async (username, password) =>
    new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO admin VALUES (?,?,?)`,
        [null, username, password],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};
