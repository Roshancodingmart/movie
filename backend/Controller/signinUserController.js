const conn = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = "happynewyeartoeveryone";
// var token;
const signinUser = (req, res) => {
  const { mail, pass } = req.body;

  conn.client.query(
    `SELECT password FROM public.new WHERE email=$1`,
    [mail],
    (err, resp) => {
      bcrypt.compare(pass, resp.rows[0].password, function(error, respo) {
        if (respo) {
          conn.client.query(
            `SELECT * FROM public.new WHERE email=$1`,
            [mail],
            (erro, respon) => {
              var token = jwt.sign(
                {
                  email: respon.rows[0].email,
                  name: respon.rows[0].name,
                  password: respon.rows[0].password
                },
                key
              );
              res.json({ msg: "Login Successful", token: token });
            }
          );
        }
      });
    }
  );
};

module.exports = {
  signinUser
};
