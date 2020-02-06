const conn = require("../db");
const bcrypt = require("bcrypt");

const changePassword = (req, res) => {
//   console.log("inside change password");
  var { password } = req.body;
  bcrypt.hash(password, 10, function(err, hash) {

    conn.client.query(`SELECT * FROM public.otp`,(er,re)=>{
        var mail = re.rows[0].email
        conn.client.query(
            `UPDATE public.new SET password=$1 WHERE email=$2`,
            [hash, mail],
            (error, resp) => {
              if (resp.rowCount>0) {
                console.log(resp);
                console.log("Password changed successfully");
                conn.client.query(`DELETE FROM public.otp`);
                res.send("successful");
              }
            }
          );
    })
    
  });
};
module.exports = {
  changePassword
};
