const express = require("express");
const taskRouter = express.Router();
const { isAuthenticated } = require("../Controllers/authentication");

const {
  taskController,
  createTask,
  taskStatus,
  updateTask,
  deleteTask,
  viewTask,
} = require("../Controllers/task.controller");

taskRouter.post("/createTask", isAuthenticated, createTask);
taskRouter.post("/taskStatus", isAuthenticated, taskStatus);
taskRouter.get("/viewTask", isAuthenticated, viewTask)
taskRouter.put("/updateTask:id", isAuthenticated, updateTask)
taskRouter.delete("/deleteTask:id", isAuthenticated, deleteTask)

module.exports = { taskRouter };
