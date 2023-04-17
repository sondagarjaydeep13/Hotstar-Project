//**********Require************* */
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const app = express();
const hbs = require("hbs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userrouter = require("../router/userrouter");
const a_router = require("../router/adminrouter");
const port = process.env.port;
const dburl = process.env.dburl;
//***************Path************* */
const viewpath = path.join(__dirname, "../templetes/view");
const partialpath = path.join(__dirname, "../templetes/partial");

const publicpath = path.join(__dirname, "../public");
//***********Use****************** */

app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);
app.use(express.static(publicpath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

//*************port & database************** */
app.listen(port, () => {
  console.log("Port Number running :" + " " + port);
});
mongoose
  .connect(dburl)
  .then((result) => {
    console.log("Hostar-data DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", userrouter);
app.use("/", a_router);
