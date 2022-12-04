var image = require("./image.service");

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
  store: (req, res) => {},
};
