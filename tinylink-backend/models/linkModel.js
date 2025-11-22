const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "please enter the shortUrl code"],
    unique: true,
    match: /^[A-Za-z0-9]{6,8}$/,
  },
  target: {
    type: String,
    required: [true, "please enter the target code"],
  },
  totalClicks: {
    type: Number,
    default: 0,
  },
  lastClicked: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Link", linkSchema);
