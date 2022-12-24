var brand = require("./brand.service");

module.exports = {
  index: (req, res) => {
    // brand.getBrands((err, result) => {
    //   if (err) {
    //     return res.status(500).json(err);
    //   }
    //   return res.status(200).json(result);
    // });
    brand
      .getBrands()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => res.status(500).json(err));
  },

  store: (req, res) => {
    brand.addBrand(req.body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json(result.insertId);
      }
    });
  },
  update: (req, res) => {
    brand
      .updateBrand(req.body)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => res.status(500).json(err));
  },
  destroy: async (req, res) => {
    const { idBrand } = req.params;

    brand
      .delete(idBrand)
      .then((result) => res.status(200).json("Đã xóa"))
      .catch((err) => {
        return console.log("ERR", err);
      });
  },
};
