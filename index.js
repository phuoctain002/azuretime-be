// Khai báo tỗng
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const http = require("http").createServer(app);
const io = require("socket.io")(http);

//#region ----SocketIO----
var count = 0;
require("dotenv").config();

// COUNTER ONLINE
io.on("connection", function (socket) {
  count++;
  io.emit("userConnected", count);
  socket.on("disconnect", function () {
    count--;
    io.emit("userConnected", count);
  });
});
//#endregion

app.use(cors());
app.use(express.json());

// Send Data: Client <=> Server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Khai báo module
const brandRouter = require("./api/brand/brand.router");
app.use("/api/brand", brandRouter);
const cateRouter = require("./api/category/cate.router");
app.use("/api/cate", cateRouter);
const imageRouter = require("./api/image/image.router");
app.use("/api/image", imageRouter);
const prosRouter = require("./api/product/product.router");
app.use("/api/pros", prosRouter);
// const productRouter = require('./api/Products/product.router');
// app.use('/api/product', productRouter);
app.use("/images", express.static("images"));

app.listen(process.env.PORT || 3003, () => {
  console.log("Server running on http://127.0.0.1:" + 3003 + "...");
});
