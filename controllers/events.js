const Event = require("../models/event");
const dayjs = require("dayjs");

const index = async (req, res) => {
  try {
    const id = req.params.id;
    const events = await Event.find().exec();
    res.render("events/index", { id, events, dayjs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const myEvents = async (req, res) => {
  try {
    const id = req.params.id;
    const events = await Event.find().exec();
    res.render("events/myevents", { events, id, dayjs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id).exec();
    res.render("events/show", { event, id, dayjs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const newEvent = async (req, res) => {
  try {
    const events = await Event.find();
    res.render("events/new", { events });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const create = async (req, res) => {
  try {
    const event = new Event(req.body);
    const e = await event.save();
    res.redirect("/events/myevents");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const del = async (req, res) => {
  try {
    const id = req.params.id;
    const events = await Event.findByIdAndDelete(id).exec();
    res.redirect("/events/myevents");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id).exec();
    res.render("events/edit", { event, id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    res.redirect("/events/myevents");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  index,
  myEvents,
  show,
  newEvent,
  create,
  del,
  edit,
  update,
};
