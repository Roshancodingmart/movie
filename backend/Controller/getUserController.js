const conn = require("../db");


const getUser = (req, res) => {
  conn.client.query(`SELECT email FROM public.otp`,(error,resp)=>{
      res.send(resp.rows[0].email)
  })
};
module.exports = {
  getUser
};
