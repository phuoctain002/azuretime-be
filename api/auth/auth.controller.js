var auth = require("./auth.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const account = await auth
      .login(username)
      .catch((err) => res.status(400).json(err));
    bcrypt.compare(password, account[0].password, function (err, result) {
      const response = { result, account: account[0] };
      console.log("result", result);
      if (err) {
        console.log("Đăng nhập thất bại");
        return res.status(400).json(err);
      } else {
        console.log("Đăng nhập thành công");
        return res.status(200).json(response);
      }
    });
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
