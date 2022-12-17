var auth = require("./auth.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const account = await auth
      .login(username)
      .catch((err) => res.status(400).json(err));

    const isSuccess = await bcrypt.compareSync(password, account.password);

    return res
      .status(isSuccess ? 200 : 400)
      .json(isSuccess ? "Đăng nhập thành công" : "Đăng nhập thất bại");
  },
  createUserAdmin: async (req, res) => {
    let password = await bcrypt.hashSync(req.body.password, saltRounds);
    let username = req.body.username;

    await auth
      .createUserAdmin(username, password)
      .catch((err) => res.status(400).json(err));

    return res.status(200).json("Tạo thành công");
  },
  changePassword: (req, res) => {},
};
