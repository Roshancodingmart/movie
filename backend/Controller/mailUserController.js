const conn = require("../db");
var nodemailer = require("nodemailer");

const mailUser =(req,res)=>{
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "roshandd7@gmail.com",
          pass: "hb"
        }
      });
  
      var mailOptions = {
        from: "roshandd7@gmail.com",
        to: "roshandd77@gmail.com",
        subject: "Password Changed",
        text: "Your password has been change successfully. For changing the password again chick on the forget button below signin. If its not you please immediately report to us on roshandd7@gmail.com. For further details see the `About us` in our official web site. "
      };
  
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      })
      res.send("Hi")
}
module.exports = {
    mailUser
  };
