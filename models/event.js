const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventName: String,
    buskerName: String,
    location: String,
    eventDetails: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
