const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({
  name: {
    type: String,
  },
  task: {
    type: String,
  },
  complete: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", Todo);
