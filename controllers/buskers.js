const Busker = require("../models/busker");
const dayjs = require("dayjs");

const index = async (req, res) => {
  try {
    const id = req.params.id;
    const buskers = await Busker.find().exec();
    res.render("buskers/index", { buskers, id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
module.exports = {
  index,
};
