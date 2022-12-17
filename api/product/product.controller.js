var product = require("./product.service");
var image = require("../image/image.service");
var fs = require("fs");
module.exports = {
  index: (req, res) => {
    product.getPros(req.params.idCate, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
  },
  indexAdmin: (req, res) => {
    product.getProsAdmin((err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
  },
  detail: async (req, res) => {
    const { idProduct } = req.params;
    let productDetail = await product
      .getProDetail(idProduct)
      .catch((err) => res.status(500).json(err));
    // let arrImgs = await image
    //   .getDetailImgs(idProduct)
    //   .catch((err) => res.status(500).json(err));
    // return res.status(200).json({detail: productDetail[0], imgs: arrImgs});
    // productDetail[0].urlResized = arrImgs;
    return res.status(200).json(productDetail[0]);
  },
  store: (req, res) => {
    // console.log("req", req);
    var data = req.body;
    product
      .createProduct(data)
      .then((insertedId) => {
        // console.log("imgs", req.body.imgsSubmit);
        return res.status(200).json(insertedId);
      })
      .catch((err) => res.status(500).json(err));
  },
  destroy: async (req, res) => {
    const { idProduct } = req.params;
    const imgs = await image
      .getImgsName(idProduct)
      .catch((err) => console.log("48", err));

    Promise.all(
      imgs.map(
        (file) =>
          new Promise((resolve, reject) => {
            try {
              fs.unlinkSync(`./images/products/full_${file.name}`);
              fs.unlink(`./images/products/${file.name}`, (err) => {
                if (err) reject(err);

                // image
                //   .delete(file.name)
                //   .then(resolve())
                //   .catch((err) => reject(err));
              });
            } catch (err) {
              console.error(err);
              reject(err);
            }
          })
      )
    );
    product
      .delete(idProduct)
      .then((result) => res.status(200).json("Đã xóa"))
      .catch((err) => {
        return console.log("ERR", err);
      });
  },
};
