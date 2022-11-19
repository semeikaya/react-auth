const { Router } = require("express");
const router = Router();
const { todoController } = require("../controllers/todos.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, todoController.getTodos);
router.post("/", authMiddleware, todoController.addTodo);
router.delete("/:id", authMiddleware, todoController.removeTodo);
router.patch("/:id", authMiddleware, todoController.updateTodo);

module.exports = router;
