const Busker = require("../models/busker");
const dayjs = require("dayjs");

const index = async (req, res) => {
  try {
    const id = req.params.id;
    const busker = await Busker.find().exec();
    res.render("buskers/index", { busker, id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const newBusker = async (req, res) => {
  try {
    const busker = await Busker.find();
    res.render("buskers/new", { busker });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const create = async (req, res) => {
  try {
    const busker = new Busker(req.body);
    const b = await busker.save();
    res.redirect("/buskers");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const busker = await Busker.findById(id).exec();
    res.render("buskers/show", { busker, id, dayjs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const del = async (req, res) => {
  try {
    const id = req.params.id;
    await Busker.findByIdAndDelete(id).exec();
    res.redirect("/buskers/profiles");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const myProfile = async (req, res) => {
  try {
    const busker = await Busker.find().exec();
    res.render("buskers/myprofile", { busker, dayjs });
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const busker = await Busker.findById(id).exec();
    res.render("buskers/edit", { busker, id, dayjs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    await Busker.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    res.redirect("/buskers/profiles");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  index,
  newBusker,
  create,
  show,
  del,
  myProfile,
  edit,
  update,
};
