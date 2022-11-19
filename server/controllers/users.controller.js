const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userController = {
  getAllUsers: async (req, res) => {
    const users = User.find();

    res.json(users);
  },

  registerUser: async (req, res) => {
    const { login, password } = req.body;

    const result = await User.findOne({ login });
    

    if (result) {
      return res
        .status(401)
        .json({ error: "Пользователь с таким именем уже существует" });
    }

    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_R));

    const user = await User.create({ login, password: hash });

    res.json(user);
  },

  loginUser: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });

    if (login === "") {
      return res.status(401).json({ error: "Вы не ввели имя" });
    }
    if (!candidate) {
      return res.status(401).json({ error: "Неверный логин" });
    }

    const valid = await bcrypt.compare(password, candidate.password);
    if (password === "") {
      return res.status(401).json({ error: "Вы не ввели пароль" });
    }
    if (!valid) {
      return res.status(401).json({ error: "Неверный пароль" });
    }
    const payload = {
      id: candidate._id,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });
    return res.json(token);
  },
};
