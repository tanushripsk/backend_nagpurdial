const mongoose = require("mongoose");
const advertiseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Advertise = mongoose.model("Advertise", advertiseSchema);
module.exports = Advertise;
