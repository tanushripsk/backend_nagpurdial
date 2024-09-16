const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  number: { type: String }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
