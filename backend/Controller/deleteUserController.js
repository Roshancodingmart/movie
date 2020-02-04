const conn = require("../db");

const deleteUser = (req, res) => {
    console.log("inside delete function")
  var { mail ,name ,pass } = req.body;
  conn.client.query(
    `INSERT INTO public.deleted(email,name,password) VALUES ($1 , $2 , $3) `,[mail,name,pass],(error, respo) => {
      if(respo) {
          console.log(respo);
        conn.client.query(
          `DELETE FROM public.new WHERE email=$1`,
          [mail],
          (err, resp) => {
            if (resp) {
              res.send("User deleted from the database");
            }
          }
        );
      }
    }
  );
};
module.exports = {
  deleteUser
};
