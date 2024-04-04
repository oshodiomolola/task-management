const { User } = require("../Models/user");
const { jwtToken } = require("../utils/jwt");
const { AppError } = require("../utils/errorHandler");
const { sign } = require("jsonwebtoken");

async function signUp(req, res, next) {
  try {
    const signupDetials = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    };
    if (!signupDetials) {
      return next(new AppError("Please fill signup detials"));
    }
    const newUser = await User.create(signupDetials);
    if (!newUser) {
      return next(new AppError("Please fill in correct detials", 400));
    }

    res
      .status(201)
      .json({ result: "SUCCESS", Message: "You have succesfully signed Up" });
  } catch (err) {
    next(new AppError(err, 500));
  }
}

async function login(req, res, next) {
  try {
    const loginDetails = {
      email: req.body.email,
      password: req.body.password,
    };

    const isValidUser = await User.findOne({ email: loginDetails.email });
    if (!isValidUser) {
      return next(new AppError("this user is not found. kindly sign up", 404));
    }
    console.log(loginDetails.password, isValidUser.password)
    // compare user password
    const isValidPassowrd = await isValidUser.isValidPassword(
      loginDetails.password,
      isValidUser.password
    );

    if (!isValidPassowrd) {
      return next(new AppError("invalid password or email", 401));
    }
    // generate a token for use
    const token = await jwtToken(isValidUser._id);

    res.cookie("jwt", token, { httpOnly: true });
    // console.log(req.cookie)
    res
      .status(200)
      .json({
        result: "SUCCESS",
        Message: "You are logged in now",
        token,
        user: { email: isValidUser.email, username: isValidUser.username },
      });
  } catch (err) {
    next(new AppError(err, 500));
  }
}

module.exports = { signUp, login };
