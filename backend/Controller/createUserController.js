const conn = require("../db");
const bcrypt = require("bcrypt");
const createUser = (req, res) => {
  const { mail, name, pass } = req.body;
  
  bcrypt.hash(pass, 10, function(err, hash) {
    conn.client.query(
      `SELECT * FROM public.new WHERE email=$1`,
      [mail],
      (err, resp) => {
        console.log(resp.rowCount);
        if (resp.rowCount <= 0) {
          conn.client.query(
            `INSERT INTO public.new(email,name,password) VALUES ($1 , $2 , $3)`,
            [mail, name, hash],
            (error, respo) => {
              if (error) {
                throw error;
              }
              console.log(respo);
              console.log("User added to database");
              res.send("User added to database");
            }
          );
        } else {
          console.log("User already exists");
          res.send("user already exists!");
        }
      }
    );
  });
};
module.exports = {
  createUser
};
