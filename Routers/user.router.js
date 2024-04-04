const express = require("express")
const { signUp, login, signup } = require("../Controllers/user.controller")
const userRouter = express.Router()

userRouter.post("/signUp", signup);
userRouter.post('/login', login);

module.exports = { userRouter }