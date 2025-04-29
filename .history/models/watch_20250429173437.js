const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
  brand: String,
  type: String,
  manufacturer: String,
  price: Number,
});

module.exports = mongoose.model('Watch', watchSchema);
