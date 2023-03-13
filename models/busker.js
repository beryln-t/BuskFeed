const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buskerSchema = new Schema(
  { buskerName: String },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Busker", buskerSchema);
