const express = require("express");
const router = express.Router();

const imgsController = require("./image.controller");

router.get("/detail/:idProduct", imgsController.detail);

module.exports = router;
