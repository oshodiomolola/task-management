const express = require("express");
require("dotenv").config();
const { connectToDataBase } = require("./config");
const { userRouter } = require("./Routers/user.router");
const { taskRouter } = require("./Routers/task.router");

const PORT = process.env.PORT;

const app = express();
connectToDataBase();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  console.log("this is the home page");
});

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
