const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: Number,
    required: true,
  },
  created: {
    type: String,
    default: new Date().toISOString(),
  },
  lastActive: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('User', userSchema);
