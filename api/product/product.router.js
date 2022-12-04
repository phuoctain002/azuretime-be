const express = require("express");
const router = express.Router();

const prosController = require("./product.controller");

router.get("/products/:idCate", prosController.index);
router.get("/detail/:idProduct", prosController.detail);

module.exports = router;
