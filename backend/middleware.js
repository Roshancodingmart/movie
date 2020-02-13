let jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

var appDir = path.dirname(require.main.filename);
// console.log(appDir);
// /home/roshan/Documents/movie/backend/key/public.key
var publicKey = fs.readFileSync(`${appDir}/key/jwtRS256.key.pub`, "utf8");
let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
    // console.log("middleware",token)
  }
  if (token) {

  jwt.verify(token, publicKey,{ algorithms: ['RS256'] }, (err, resp)=> {
    // console.log(decoded.foo,err) 
    if(err){
      console.log(err)
      res.send({
        message: "Token is not valid"
      })  
    } 
    else{next()}
  });

  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};
module.exports = {
  checkToken: checkToken
};
