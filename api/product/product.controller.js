var product = require("./product.service");
var image = require("../image/image.service");

module.exports = {
  index: (req, res) => {
    product.getPros(req.params.idCate, (err, result) => {
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
    let arrImgs = await image
      .getDetailImgs(idProduct)
      .catch((err) => res.status(500).json(err));
    // return res.status(200).json({detail: productDetail[0], imgs: arrImgs});
    productDetail[0].urlResized = arrImgs;
    return res.status(200).json(productDetail[0]);
  },
  store: (req, res) => {},
};
