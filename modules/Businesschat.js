const mongoose = require("mongoose");
const businesschatSchema = new mongoose.Schema({
  name: {
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

const Businesschat = mongoose.model("Businesschat", businesschatSchema);
module.exports = Businesschat;
