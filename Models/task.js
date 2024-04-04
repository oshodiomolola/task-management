const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;
const TaskSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
      autoIncrement: true,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "A task must have a title"],
      trim: true,
    },
description: {
type: String,
required: true
},
    status: {
      type: String,
      enum: ["pending", "inprogress", "completed"],
      default: "pending",
    },
    user: {
      type: String,
      ref: "user",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

TaskSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "fullname -_id",
  });
  next();
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = { Task };
