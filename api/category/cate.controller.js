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

  store: (req, res) => {
    cate.addCate(req.body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json(result.insertId);
      }
    });
  },
  update: (req, res) => {
    cate
      .updateCate(req.body)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => res.status(500).json(err));
  },
  destroy: async (req, res) => {
    const { idCategory } = req.params;

    cate
      .delete(idCategory)
      .then((result) => res.status(200).json("Đã xóa"))
      .catch((err) => {
        return console.log("ERR", err);
      });
  },
};
