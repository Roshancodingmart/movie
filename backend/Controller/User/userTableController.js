const conn = require("../db")

const userTable=(req,res)=>{
    conn.client.query(`SELECT * FROM public.new WHERE deleted IS null`,(error,resp)=>{
        res.send(resp.rows)
    })
}
module.exports = {
    userTable
  };