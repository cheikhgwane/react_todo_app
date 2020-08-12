let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ToDoSchema = new Schema({
  date: Date,
  description: String,
  completed: Boolean
});

let todo_model = mongoose.model("todomodel", ToDoSchema);
module.exports = todo_model;
