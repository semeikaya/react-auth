const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: true },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
