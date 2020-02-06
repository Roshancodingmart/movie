const conn = require("../db");

const verifyOtp = (req,res) =>{
    var {otp} = req.body
    conn.client.query(`SELECT * FROM public.otp WHERE otp=$1`,[otp],(error,resp)=>{
        if(resp.rowCount>0)
        {
            
            res.send("successful")
            
        }
        else{
            res.send("unsuccessful")
        }
        
    })

}
module.exports = {
    verifyOtp
  };