const conn = require("../db.js");
const bcrypt = require("bcrypt");
const date = require('date-and-time');

const now = new Date();
const time = date.format(now, 'DD/MM/YY h:mm A',true)
const createUser = (req, res) => {
  const { mail, name, pass } = req.body;
  const no="null";
  bcrypt.hash(pass, 10, function(err, hash) {
    conn.client.query(
      `SELECT * FROM public.new WHERE email=$1`,
      [mail],
      (err, resp) => {
        console.log(resp.rowCount);
        if (resp.rowCount <= 0) {
          conn.client.query(
            `INSERT INTO public.new(email,name,password ,added,updated,deleted) VALUES ($1 , $2 , $3 , $4 , $5 , $6)`,
            [mail, name, hash, time, time, no],
            (error, respo) => {
              if (error) {
                throw error;
              }

              res.send("User added to database");
            }
          );
        } else {

          res.send("user already exists!");
        }
      }
    );
  });
};
module.exports = {
  createUser
};
