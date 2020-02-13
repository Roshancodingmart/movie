const conn = require("../db");
const date = require('date-and-time');
const now = new Date();
const time = date.format(now, 'DD/MM/YY h:mm A',true);


const deleteUser = (req, res) => {
    console.log("inside delete function")
  var { mail ,name ,pass } = req.body;
  console.log(mail,name,pass)
  conn.client.query(
    `UPDATE public.new SET deleted=$1 WHERE email=$2`,
    [time, mail],(error, respo) => {
      if(error){
        console.log(error)
      }
      if(respo) {
          console.log(respo);
          res.send("User deleted from the database");
      }
    }
  );
};
module.exports = {
  deleteUser
};
