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
          resolve(result);
        }
      );
    }),
  getUsername: async (username) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM admin WHERE username = ?`,
        [username],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  createUserAdmin: async (username, password, role, token) =>
    new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO admin VALUES (?,?,?,?,?)`,
        [null, username, password, role, token],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  updateRefreshToken: async (username, refreshToken) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE admin SET refreshToken=? WHERE username=?`,
        [refreshToken, username],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result.insertId);
        }
      );
    }),
};
