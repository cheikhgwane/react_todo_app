let todo_model = require("./model");

function adaptator(todos) {
  let data = [];
  for (let todo of todos) {
    let { date, description, completed } = todo;
    let _date = new Date(date);
    date = _date.getDay() + "/" + _date.getMonth() + "/" + _date.getFullYear();
    data.push({
      date,
      description,
      completed
    });
  }
  return data;
}

function getAllToDo() {
  return new Promise((resolve, reject) => {
    todo_model.find({}, (err, result) => {
      if (!err) {
        /*  let r = adaptator(result); */
        resolve(result);
      }
      reject(err);
    });
  });
}

function addToDo(todo) {
  return new Promise((resolve, reject) => {
    let _todo = new todo_model({
      date: todo.date,
      description: todo.description,
      completed: todo.completed
    });
    _todo.save();
    resolve(200);
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    todo_model.findById(id, (err, res) => {
      if (!err) {
        resolve(res);
      }
      reject(err);
    });
  });
}

function editTodo(id, field) {
  return new Promise((resolve, reject) => {});
}
function deleteById(id) {
  return new Promise((resolve, reject) => {
    todo_model.deleteOne({ _id: id }, err => {
      if (!err) {
        resolve(1);
      }
      reject(err);
    });
  });
}

module.exports = { getAllToDo, addToDo, getById, deleteById };
