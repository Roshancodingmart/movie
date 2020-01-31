const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3005;

const createUserRoute = require("./Route/createUserRoute");
const signinUserRoute = require("./Route/signinUserRoute");
const userTableRoute = require("./Route/userTableRoute");
const deleteUserRoute = require("./Route/deleteUserRoute");

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