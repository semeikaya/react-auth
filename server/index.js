const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/todos", require("./routes/todos.route"));
app.use("/users", require("./routes/users.route"));

mongoose.connect(
  process.env.MONGO_SERVER,
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Успешно соединились с сервером MongoDB");

    app.listen(4000, () => {
      console.log("Сервер успешно запущен");
    });
  }
);
