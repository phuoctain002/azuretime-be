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

  store: (req, res) => {},
};
