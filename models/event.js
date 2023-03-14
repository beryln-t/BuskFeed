const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    // eventName: { type: String, required: [true, "username is required"] },
    eventName: { type: String, required: true },
    buskerName: String,
    location: String,
    eventDate: { type: Date, required: true, min: Date() },
    startTime: { type: Date, required: true, min: Date() },
    endTime: { type: Date, required: true, min: Date() },
    eventDescription: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
