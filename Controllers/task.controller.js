const { Task } = require("../Models/task")
const mongoose = require("mongoose")
const { AppError } = require("../utils/errorHandler")

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

async function updateStatus(req, res, next) {
  try {
    const findTask = await Task.findById(req.params.id)
console.log(req.query)
    if(!findTask) {
      return next(new AppError("update task status", 404))
    }
    
findTask.status = req.query.status
await findTask.save()
res.status(200).json({result: "success", message: "Task status updated", findTask})


  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
}

async function viewTask(req, res, next) {
  try {
    const userTasks = await Task.find({user:req.user._id})

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

    const updatedTask = await Task.findById(req.params.id);

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
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return next(new AppError('Task not found', 404));
    }

    res.status(200).json({ result: "SUCCESS", message: 'Task has been deleted', task: deletedTask });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
}


module.exports = { createTask, updateStatus, viewTask, updateTask, deleteTask }