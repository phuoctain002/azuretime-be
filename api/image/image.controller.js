var image = require("./image.service");
var fs = require("fs");

module.exports = {
  // Cách 1: async, await
  // detail: async (req, res) => {
  //   const imgs = await image
  //     .getDetailImgs(req.params.idProduct)
  //     .catch((err) => res.status(500).json(err));
  //   return res.status(200).json(imgs);
  // },
  // Cách 2:
  detail: (req, res) => {
    image
      .getDetailImgs(req.params.idProduct)
      .then((imgs) => res.status(200).json(imgs))
      .catch((err) => res.status(500).json(err));
  },
  listName: (req, res) => {
    image
      .getImgsName(req.params.idProduct)
      .then((imgs) => res.status(200).json(imgs))
      .catch((err) => res.status(500).json(err));
  },
  upload: (req, res) => {
    return res.status(200).json("thanh cong");
  },
  store: (req, res) => {
    // const fileImgs = req.files.map((item) => item.filename);
    // // console.log("fileImgs", req);
    // if (!fileImgs) {
    //   return res.status(200).json("ko có file");
    // }
    // return res.status(200).json(fileImgs);

    Promise.all(
      req.body.imgsSubmit.map(async (item) => {
        await image
          .createImg(item, req.body.idProduct)
          .catch((err) => console.log(err));
      })
    );
    return res.status(200).json("thanh cong");
  },
  destroy: (req, res) => {
    console.log(req.body);
    Promise.all(
      req.body.fileImgs.map(
        (file) =>
          new Promise((resolve, reject) => {
            try {
              fs.unlink(`./images/products/${file}`, (err) => {
                if (err) reject(err);

                image
                  .delete(file)
                  .then(resolve())
                  .catch((err) => reject(err));
              });
            } catch (err) {
              console.error(err);
              reject(err);
            }
          })
      )
    )
      .then((result) => res.status(200).json("xoa thanh cong"))
      .catch((err) => res.status(400).json(err));
  },
};
