const express = require("express")
const { signUp, login } = require("../Controllers/user.controller")
const userRouter = express.Router()

userRouter.post("/signUp", signUp);
userRouter.post('/login', login);

module.exports = { userRouter }