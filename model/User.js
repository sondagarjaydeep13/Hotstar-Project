const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  uname: String,
  email: String,
  pass: String,
  create_on: {
    type: Date,
    default: Date.now(),
  },
  Tokens: [{ token: String }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("pass")) {
    this.pass = await bcrypt.hash(this.pass, 10);
  }
});
userSchema.methods.genrateToken = async function (next) {
  const token = await jwt.sign({ _id: this._id }, process.env.SKEY);
  this.Tokens = await this.Tokens.concat({ token: token });
  await this.save();
  return token;
  next();
};
const User = mongoose.model("User", userSchema);
module.exports = User;
