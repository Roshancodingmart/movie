const conn = require("../db");
const otpGenerator = require("otp-generator");
const otp = (req, res) => {
  var { mail } = req.body;
  conn.client.query(`DELETE FROM public.otp`);
  conn.client.query(
    `SELECT * FROM public.new WHERE email=$1`,
    [mail],
    (err, resp) => {
      console.log(resp.rowCount)
      if (resp.rowCount>0) {
        var otp = otpGenerator.generate(4, {
          alphabets: false,
          upperCase: false,
          specialChars: false
        });
        console.log(otp);
        conn.client.query(
          `INSERT INTO public.otp(email,otp) VALUES ($1 , $2)`,
          [mail, otp],
          (err, resp) => {
            console.log(resp);
          }
        );
        var msg = `${otp} is your otp`
        const accountSid = "ACba3da62d5968c6d8a1d55a238890016e";
        const authToken = "505550c48da7f2cad4daf3ca41b99da7";
        const client = require("twilio")(accountSid, authToken);
        client.messages
          .create({
            to: "+916381895223",
            from: "+12015618495",
            body: msg
          })
          .then(message => console.log(message.sid));
          res.send("successful")
      }
      else{
        res.send("unsuccessful")
      }
    }
  )
};
module.exports = {
  otp
};
