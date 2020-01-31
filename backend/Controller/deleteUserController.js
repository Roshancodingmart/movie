const conn = require("../db");

const deleteUser = (req, res) => {
    var {mail}=req.body
    conn.client.query(`DELETE FROM public.new WHERE email=$1`,[mail],(err,resp)=>{
        if(resp){
              res.send("User deleted from the database");
        }
      })
}
module.exports = {
  deleteUser
};