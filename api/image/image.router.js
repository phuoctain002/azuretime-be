const express = require("express");
const router = express.Router();

const imgsController = require("./image.controller");

const multer = require("multer");

const storageFull = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/products/");
  },
  filename: function (req, file, cb) {
    cb(null, "full" + "_" + req.params.time + "_" + file.originalname);
  },
});
const storageResized = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/products/");
  },
  filename: function (req, file, cb) {
    cb(null, req.params.time + "_" + file.originalname);
  },
});

const destFull = multer({ storage: storageFull });
const destResized = multer({ storage: storageResized });
// function fileUpload(req, res, next) {
//   dest.array("files")(req, res, next);
//   next();
// }

router.get("/detail/:idProduct", imgsController.detail);
router.get("/listName/:idProduct", imgsController.listName);
router.post(
  "/upload-full/:time",
  destFull.array("files[]"),
  imgsController.upload
);
router.post(
  "/upload-resized/:time",
  destResized.array("files[]"),
  imgsController.upload
);
router.post("/", imgsController.store);
router.put("/", imgsController.update);
router.delete("/:name", imgsController.destroyImg);
router.delete("/", imgsController.destroyImgs);
module.exports = router;
