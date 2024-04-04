const { Task } = require("../Models/task")
const mongoose = require("mongoose")
const { AppError } = require("../utils/errorHandler")
// const newObjectId = new objectId();


async function createTask(req, res, next) {
  try {
    const taskDetail = {
      title: req.body.title,
      description: req.body.description,
      user: req.user._id
    }
    if(!taskDetail) {
return next(new AppError("Please input task"))
    }
    const newTask = await Task.create(taskDetail)

    if (!newTask) {
      return next(new AppError("Error creating a new task", 400));
    }

    res
      .status(201)
      .json({ result: "SUCCESS", Message: "You have succesfully created a task", task: newTask  });
  } catch(err) {
    console.log("error", (err))
  }
}

async function taskStatus(req, res, next) {
  try {
    const { status } = req.body;

    switch (status) {
      case "pending":
        console.log("Task is pending");
        throw new AppError("Task is pending", 400);
      case "in-progress":
        console.log("Task is in progress");
        throw new AppError("Task is in progress", 400);
      case "completed":
        console.log("Task is completed");
        throw new AppError("Task is completed", 400);
      default:
        console.log("Unknown task status");
        throw new AppError("Task status is unknown", 400);
        res.status(200).json({result: "Success"})
    } 
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
}

async function viewTask(req, res, next) {
  try {
    const userId = req.user._id;

    const userTasks = await Task.find({ user: userId });

    if (!userTasks || userTasks.length === 0) {
      return next(new AppError('No tasks found for this user', 404));
    }

    res.status(200).json({ result: "SUCCESS", size: userTasks.length, userTasks });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
}


async function updateTask(req, res, next) {
  try {
    const taskDetail = {
      title: req.body.title,
      description: req.body.description,
      user: req.user._id
    }

    if (!taskDetail.title || !taskDetail.description) {
      return next(new AppError("Please provide title and description for the task", 400));
    }

    const updatedTask = await Task.findById(req.params.taskId);

    if (!updatedTask) {
      return next(new AppError('Task not found', 404));
    }

    updatedTask.title = taskDetail.title;
    updatedTask.description = taskDetail.description;
    updatedTask.status = 'completed';

    await updatedTask.save();

    res.status(200).json({ result: "SUCCESS", message: 'Task has been updated', task: updatedTask });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
}

async function deleteTask(req, res, next) {
  try {
    const taskDetail = {
      title: req.body.title,
      description: req.body.description,
      user: req.user._id
    }

    if (!taskDetail.title || !taskDetail.description) {
      return next(new AppError("Please provide title and description for the task", 400));
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);

    if (!deletedTask) {
      return next(new AppError('Task not found', 404));
    }

    res.status(200).json({ result: "SUCCESS", message: 'Task has been deleted', task: deletedTask });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
}


module.exports = { createTask, taskStatus, viewTask, updateTask, deleteTask }