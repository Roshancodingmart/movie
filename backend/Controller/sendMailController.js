const conn = require("../db");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

// function decrypt(text) {
//   let iv = Buffer.from(text.iv, "hex");
//   let encryptedText = Buffer.from(text.encryptedData, "hex");
//   let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }

var nodemailer = require("nodemailer");

const sendMail = (req, res) => {
  var { mail } = req.body;
  conn.client.query(
    `SELECT * FROM public.new WHERE email=$1`,
    [mail],
    (err, resp) => {
      if (resp.rowCount > 0) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "roshandd7@gmail.com",
            pass: "9894255827"
          }
        });
        var otp = otpGenerator.generate(6, {
          alphabets: true,
          upperCase: true,
          specialChars: true
        });
        var chiperText = encrypt(mail);
        console.log(chiperText.encryptedData)
        var random = "/" + otp + chiperText.encryptedData;

        console.log(random);
        conn.client.query(
          `INSERT INTO public.mail (email,key) VALUES ($1,$2)`,
          [mail, random]
        );
        var mailOptions = {
          from: "roshandd7@gmail.com",
          to: "roshandd77@gmail.com",
          subject: "Reset Password",
          text: "",
          html:
            "<b>To change your password click the link below. For changing the password again chick on the reset password button below signin. If it is not you please immediately report to us on roshandd7@gmail.com. For further details see the `About us` in our official web site. </b><br><center><center><a href='http://localhost:3000/changePassword" +
            random +
            "'>reset password</a></center>"
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
            res.send("unsuccessful");
          } else {
            console.log("Email sent: " + info.response);
            res.send("sent");
          }
        });
      } else {
        res.send("unsuccessful");
      }
    }
  );
};
module.exports = {
  sendMail
};
