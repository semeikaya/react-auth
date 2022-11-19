const { Router } = require("express");
const router = Router();
const { userController } = require("../controllers/users.controller");

router.get("/", userController.getAllUsers);
router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
