const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  color: {
    type: String,
    default: "#FFFF",
  },
});

module.exports = mongoose.model("Note", noteSchema);
