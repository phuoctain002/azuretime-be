var auth = require("./auth.service");
var authMethod = require("./auth.methods");

const bcrypt = require("bcrypt");
const randToken = require("rand-token");
const saltRounds = 10;

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const account = await auth
      .login(username)
      // catch ở đây là lỗi mà chạy lệnh login() bị fail ko phải lỗi ko tìm thấy username ấy
      .catch((err) => res.status(500).json(err));
    if (account.length === 0)
      return res.status(400).send("Tên người dùng không chính xác.");
    const isPasswordValid = bcrypt.compareSync(password, account[0].password);
    if (!isPasswordValid) {
      return res.status(401).send("Mật khẩu không chính xác.");
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
      username: account[0].username,
    };

    const accessToken = await authMethod.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );

    if (!accessToken) {
      return res
        .status(401)
        .send("Đăng nhập không thành công, vui lòng thử lại.");
    }

    let refreshToken = randToken.generate(50); // tạo 1 refresh token ngẫu nhiên
    if (!account[0].refreshToken) {
      // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
      await auth.updateRefreshToken(account[0].username, refreshToken);
    } else {
      // Nếu user này đã có refresh token thì lấy refresh token đó từ database
      refreshToken = account[0].refreshToken;
    }
    const response = {
      result: isPasswordValid,
      accessToken,
      refreshToken,
      account: account[0],
      msg: "Đăng nhập thành công",
    };
    return res.status(200).json(response);
  },
  refreshToken: async (req, res) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x - authorization;
    if (!accessTokenFromHeader) {
      return res.status(400).send("Không tìm thấy access token.");
    }

    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
      return res.status(400).send("Không tìm thấy refresh token.");
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

    // Decode access token đó
    const decoded = await authMethod.decodeToken(
      accessTokenFromHeader,
      accessTokenSecret
    );
    if (!decoded) {
      return res.status(400).send("Access token không hợp lệ.");
    }

    const username = decoded.payload.username; // Lấy username từ payload

    const user = await auth.getUsername(username);
    if (!user) {
      return res.status(401).send("User không tồn tại.");
    }

    if (refreshTokenFromBody !== user.refreshToken) {
      return res.status(400).send("Refresh token không hợp lệ.");
    }

    // Tạo access token mới
    const dataForAccessToken = {
      username,
    };

    const accessToken = await authMethod.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      return res
        .status(400)
        .send("Tạo access token không thành công, vui lòng thử lại.");
    }
    return res.json({
      accessToken,
    });
  },
  createUserAdmin: async (req, res) => {
    let password = await bcrypt.hashSync(req.body.password, saltRounds);
    let username = req.body.username;
    let role = "Administrator";
    let token = "";

    await auth
      .createUserAdmin(username, password, role, token)
      .catch((err) => res.status(400).json(err));

    return res.status(200).json("Tạo thành công");
  },
  changePassword: (req, res) => {},
};
