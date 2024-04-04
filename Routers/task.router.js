const express = require ("express")
const taskRouter = express.Router()
const { isAuthenticated } = require("../Controllers/authentication")

const { taskController, createTask } = require("../Controllers/task.controller")

taskRouter.post("/createTask", isAuthenticated, createTask)


module.exports = { taskRouter }