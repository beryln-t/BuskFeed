const Event = require("../models/event");
const Busker = require("../models/busker");
const dayjs = require("dayjs");

const index = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.find().populate("buskerName").exec();
    res.render("events/index", { id, event, dayjs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const manage = async (req, res) => {
  try {
    const event = await Event.find().populate("buskerName").exec();
    res.render("events/myevents", { event, dayjs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id).exec();
    res.render("events/show", { event, id, dayjs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const newEvent = async (req, res) => {
  try {
    const event = await Event.find().exec();
    const busker = await Busker.find().exec();
    res.render("events/new", { event, busker });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const create = async (req, res, next) => {
  try {
    const event = new Event(req.body);
    const e = await event.save();
    res.redirect("/events/manageevents");
  } catch (error) {
    next(error);
  }
};

const del = async (req, res) => {
  try {
    const id = req.params.id;
    await Event.findByIdAndDelete(id).exec();
    res.redirect("/events/manageevents");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id).exec();
    res.render("events/edit", { event, id, dayjs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const opts = { runValidators: true };
    await Event.findByIdAndUpdate(id, req.body, opts, {
      new: true,
    }).exec();
    res.redirect("/events/manageevents");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  manage,
  show,
  newEvent,
  create,
  del,
  edit,
  update,
};
