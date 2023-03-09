const express = require("express");
const router = express.Router();

const prosController = require("./product.controller");

router.post("/", prosController.store);
router.put("/", prosController.update);
router.get("/products/:idCate", prosController.index);
router.get("/search/:searchInput", prosController.search);
router.get("/", prosController.indexAdmin);
router.get("/detail/:idProduct", prosController.detail);
router.delete("/:idProduct", prosController.destroy);

module.exports = router;
