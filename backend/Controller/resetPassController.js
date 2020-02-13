const conn = require("../db");
const bcrypt = require("bcrypt");
const date = require('date-and-time');
const now = new Date();
const time = date.format(now, 'DD/MM/YY h:mm A',true);


const resetPassword = (req, res) => {
  var { password ,url} = req.body;
  console.log("url:",url)
  bcrypt.hash(password, 10, function(err, hash) {
    conn.client.query(
      `SELECT * FROM public.temp WHERE key=$1`,
      [url],
      (er, re) => {
        console.log(re)
        if (re.rowCount > 0) {
          var mail = re.rows[0].email;
          conn.client.query(
            `UPDATE public.new SET password=$1 , updated=$2 WHERE email=$3`,
            [hash,time, mail],
            (error, resp) => {
              if (resp.rowCount > 0) {
                // console.log(resp);
                // console.log("Password changed successfully");
                conn.client.query(`DELETE FROM public.temp WHERE key=$1`,[url]);
                res.send("successful");
              }
            }
          );
        }
        else{
            res.send("unsuccessful")
        }
      }
    );
  });
};
module.exports = {
  resetPassword
};
