const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const adminSchem = new mongoose.Schema({
  uname: {
    type: String,
    require: true,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error("User name is not valide");
      }
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valide");
      }
    },
  },
  pass: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
adminSchem.pre("save", async function (next) {
  if (this.isModified) {
    this.pass = await bcrypt.hash(this.pass, 12);
    next();
  }
});

const Admin = mongoose.model("Admin", adminSchem);

module.exports = Admin;
