const Event = require("../models/event");

const index = (req, res) => {
  Event.find()
    .exec()
    .then((events) => {
      console.log("events", events);
      res.render("events/index", { events });
    });
};

module.exports = {
  index,
};
