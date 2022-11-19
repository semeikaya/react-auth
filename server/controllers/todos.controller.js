const Todo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");

module.exports.todoController = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.json(error.message);
    }
  },

  addTodo: async (req, res) => {
    const { title } = req.body;
    try {
      const todo = await Todo.create({
        user: req.user.id,
        title,
      });
      return res.json(todo);
    } catch (e) {
      return res.status(401).json("Неверный токен");
    }
  },

  removeTodo: async (req, res) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findById(id);
      if (todo.user.toString() === req.user.id) {
        const user = await Todo.findByIdAndRemove(id);
        return res.json(id);
      }
      return res.json({ error: "Отказано в доступе" });
    } catch (e) {
      return res.status(401).json("Ошибка " + e.toString());
    }
  },

  updateTodo: async (req, res) => {
    const { completed } = req.body;
    try {
      const todo = await Todo.findById(req.params.id);
      if (todo.user.toString() === req.user.id) {
        const result = await Todo.findByIdAndUpdate(req.params.id, {
          completed,
        });
        return res.json(todo);
      }
      return res.json({ error: "Отказано в доступе" });
    } catch (e) {
      return res.status(401).json("Ошибка " + e.toString());
    }
  },
};
