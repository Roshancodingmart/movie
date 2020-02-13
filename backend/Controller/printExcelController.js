const conn = require("../db.js");
var excel = require('excel4node');
const printExcel = (req, res) => {
    
conn.client.query(`SELECT * FROM public.new`,async(err,resp)=>{
    if(err){
        console.log(err)
    }
    console.log(resp.rows[0].name)
    var workbook = new excel.Workbook();
    var worksheet = workbook.addWorksheet('Sheet 1');
    var header = workbook.createStyle({
        font: {
          color: 'blue',
          size: 13
        }
      });
      var body = workbook.createStyle({
        font: {
          color: 'green',
          size: 12
        }
      });
      var del = workbook.createStyle({
        font: {
          color: 'red',
          size: 12
        }
      });
      worksheet.cell(1,1).string("Email").style(header);
      worksheet.cell(1,4).string("name").style(header);
      worksheet.cell(1,7).string("password").style(header);
      worksheet.cell(1,10).string('created at').style(header);
      worksheet.cell(1,12).string('updated at').style(header);
      worksheet.cell(1,14).string('deleted at').style(header);
      for(let i=0;i<resp.rowCount;i++){
          if(resp.rows[i].deleted!=null && resp.rows[i].deleted!="admin"){
              var style=del
          }
          else{
              var style=body
          }
        worksheet.cell(i+2,1).string(resp.rows[i].email).style(style);
        worksheet.cell(i+2,4).string(resp.rows[i].name).style(style);
        worksheet.cell(i+2,5).string(resp.rows[i].password).style(style);
        worksheet.cell(i+2,10).string(resp.rows[i].added).style(style);
        worksheet.cell(i+2,12).string(resp.rows[i].updated).style(style);
        worksheet.cell(i+2,14).string(resp.rows[i].deleted).style(style);
      }
      var name="report.xlsx"
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader("Content-Disposition", "attachment; filename=" + name);
    //   console.log(typeof(res))
      await workbook.write(res)
      res.end();
})


  };
  module.exports = {
    printExcel
  };
  