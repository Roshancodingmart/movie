const conn = require("../db.js");
let length=0;
var a=[]
const page = (req, res) => {
   var {pg_no}=req.body
//    console.log(pg_no)
conn.client.query(`SELECT * FROM public.new`,async(err,resp)=>{
   
    if(resp.rowCount>0){
        console.log(resp.rowCount)
        // console.log(resp.rows[0])
        // console.log(Math.floor(resp.rowCount/pg_no))
        if(resp.rowCount%pg_no==0){
            length=Math.floor(resp.rowCount/pg_no)
            // console.log(length)
        }
        else{
            length=Math.floor(resp.rowCount/pg_no)+1
        }
        let k=0
        a=[]
        // console.log(length)
        for(let i=0;i<length;i++){
            // console.log("hi")
            let b=[]
            for(let j=0;j<pg_no;j++){
                b.push(resp.rows[k])
                // console.log("b",b);
                if(k==resp.rowCount-1){
                    break
                }
                k++
            }
            a.push(b)
            // console.log("a",a)
            if(k==resp.rowCount){
                break
            }
        }
        res.send(a);
    }
})


 };
 module.exports = {
   page
 };
 