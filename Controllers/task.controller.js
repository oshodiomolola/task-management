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

// async function taskStatus(status) {
//   switch (status) {
//     case1("in-progress"): {
//       return 
//     }
//   }
// }

module.exports = { createTask }