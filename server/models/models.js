const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: Number,
  label: String,
  done: Boolean,
});

const TodoItem = mongoose.model("todo_tasks", taskSchema);

module.exports = { TodoItem };
