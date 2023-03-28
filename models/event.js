const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventName: { type: String, required: true },
    buskerProfile: { type: Schema.Types.ObjectId, ref: "Busker" },
    location: { type: String, required: true },
    eventDate: { type: Date, required: true, min: Date() },
    eventDescription: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
