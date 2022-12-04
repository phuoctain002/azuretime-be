var cate = require("./cate.service");

module.exports = {
  index: (req, res) => {
    cate.getCates((err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
  },

  store: (req, res) => {},
};
