const conn = require("../db")

const userTable=(req,res)=>{
    conn.client.query(`SELECT * FROM public.new order by name`,(error,resp)=>{
        if(error){
            console.log(error)
        }
        console.log(resp.rows)
        res.send(resp.rows)
    })
}
module.exports = {
    userTable
  };