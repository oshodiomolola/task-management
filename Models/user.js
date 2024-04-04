const mongoose = require("mongoose")
const shortid = require("shortid")
const validator = require('validator');
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema
const UserSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
    autoIncrement: true,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlenght: 6,
    unique: true,
    trim: true
  },
  passwordConfirm: {
type: String,
required: [true, 'Please confirm your password'],
trim: true
  }
})

UserSchema.pre("save", async function(next){
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next
})

UserSchema.methods.isValidPassword = async function(password, hashPassword) {
  const user = this
  const compare = await bcrypt.compare(password, hashPassword)
  return compare
}

const  User = mongoose.model("User", UserSchema)

module.exports = { User }