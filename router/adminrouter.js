const express = require("express");
const a_router = express.Router();
const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
a_router.get("/", (req, res) => {
  res.render("admin");
});

a_router.post("/aregister", async (req, res) => {
  try {
    const admin = await Admin(req.body);
    await admin.save();
    res.send(admin);
  } catch (error) {
    res.send(error);
  }
});
a_router.get("/admindata", async (req, res) => {
  try {
    const admindata = await Admin.find();
    res.send(admindata);
  } catch (error) {
    res.send(error);
  }
});
a_router.post("/adminlogin", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  try {
    const admindata = await Admin.findOne({ email: email });
    const isverify = await bcrypt.compare(pass, admindata.pass);
    const Token = await jwt.sign({ _id: admindata._id }, process.env.SKEY);
    if (isverify) {
      res.send("Welcome :" + admindata.uname + "Token :" + Token);
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = a_router;
