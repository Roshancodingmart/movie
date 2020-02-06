const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3005;

const createUserRoute = require("./Route/createUserRoute");
const signinUserRoute = require("./Route/signinUserRoute");
const userTableRoute = require("./Route/userTableRoute");
const deleteUserRoute = require("./Route/deleteUserRoute");
const mailUserRoute = require("./Route/mailUserRoute");
const smsUserRoute = require("./Route/smsUserRoute");
const otpRoute = require("./Route/otpRoute")
const verifyOtpRoute = require("./Route/verifyOtpRoute");
const changePassRoute = require("./Route/changePassRoute");
const getUserRoute = require("./Route/getUserRoute");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );
  next();
});
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.use("/createUser", createUserRoute);
app.use("/signinUser",signinUserRoute);
app.use("/userTable",userTableRoute);
app.use("/deleteUser",deleteUserRoute);
app.use("/mailUser",mailUserRoute);
app.use("/smsUser",smsUserRoute);
app.use("/otp",otpRoute);
app.use("/verifyOtp",verifyOtpRoute);
app.use("/changePassword",changePassRoute);
app.use("/getUser",getUserRoute);