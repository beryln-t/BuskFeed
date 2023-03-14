const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buskerSchema = new Schema(
  {
    buskerName: { type: String, required: true },
    buskingAct: { type: String, required: true },
    loeNumber: { type: String, required: true, minLength: 8, maxLength: 8 },
    validityFrom: { type: Date, required: true, min: Date() },
    validityTo: { type: Date, required: true, min: Date() },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Busker", buskerSchema);
