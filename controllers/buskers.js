const Busker = require("../models/busker");

const index = (req, res) => {
  Busker.find()
    .exec()
    .then((buskers) => {
      console.log("buskers", buskers);
      res.render("buskers/index", { buskers });
    });
};

module.exports = {
  index,
};
