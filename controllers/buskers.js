const Busker = require("../models/busker");
const dayjs = require("dayjs");

const index = async (req, res) => {
  try {
    const id = req.params.id;
    const busker = await Busker.find().sort({ buskerName: "asc" }).exec();
    res.render("buskers/index", { busker, id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const newBusker = async (req, res) => {
  try {
    const busker = await Busker.find();
    res.render("buskers/new", { busker });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const create = async (req, res, next) => {
  try {
    const busker = new Busker(req.body);
    const b = await busker.save();
    res.redirect("/buskers/manageprofiles");
  } catch (error) {
    next(error);
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const busker = await Busker.findById(id).exec();
    res.render("buskers/show", { busker, id, dayjs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const del = async (req, res) => {
  try {
    const id = req.params.id;
    await Busker.findByIdAndDelete(id).exec();
    res.redirect("/buskers/manageprofiles");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const profiles = async (req, res) => {
  try {
    const busker = await Busker.find().exec();
    res.render("buskers/profiles", { busker, dayjs });
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const busker = await Busker.findById(id).exec();
    res.render("buskers/edit", { busker, id, dayjs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const opts = { runValidators: true };
    await Busker.findByIdAndUpdate(id, req.body, opts, {
      new: true,
    }).exec();
    res.redirect("/buskers/manageprofiles");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  newBusker,
  create,
  show,
  del,
  profiles,
  edit,
  update,
};
